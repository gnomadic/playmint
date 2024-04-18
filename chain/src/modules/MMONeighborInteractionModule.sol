// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IModule, ModuleSummary} from './interfaces/IModule.sol';
// import {MMONeighborInteractionEntity} from '../entities/MMONeighborInteractionEntity.sol';
import {CatchEntity} from '../entities/CatchEntity.sol';
import {MMOSessionEntity} from '../entities/MMOSessionEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';
import {console} from 'forge-std/console.sol';

contract MMONeighborInteractionModule is IModule {
  string public displayName = 'Daily Interaction';
  string[] public required = ['players', 'canInteract'];
  string[] public functions = ['getPlayerCount'];

  function initialize(address game) external {
    address catchEntity = IEntityFactory(IGame(game).getEntityFactory())
      .createEntity(game, 'CatchEntity');

    IGame(game).addEntity(catchEntity);

    // TODO this sets a precendence I'm not sure we want to set
    // multiple entities created by one module..
    // so is it one entity per module, or composition?  How can we be confident
    // that a given entity does exist for any module that needs it?
    //  the easiest way to have that confidence is to have the module create the entity it needs
    // and if that is the case, then there should be just one entity per module
    // which doesn't really encourage composability.
    // so anyways, let's see how this plays out.
    address mmoEntity = IEntityFactory(IGame(game).getEntityFactory())
      .createEntity(game, 'MMOSessionEntity');

    IGame(game).addEntity(mmoEntity);
  }

  function getSummary() external view returns (ModuleSummary memory) {
    return ModuleSummary(address(this), functions, required, 'Catch');
  }

  // --------------------------------- ACTION FUNCTIONS ---------------------------------

  function joinSession(IGame game, address player) public {
    uint256 index = MMOSessionEntity(game.getEntity('players')).addPlayer(
      player
    );
    if (getPlayerCount(game) % 2 == 0) {
      CatchEntity(game.getEntity('balls'))
        .addNewThrower(player, index);

    }else{
      CatchEntity(game.getEntity('balls'))
        .addNewPlayer(player, index);
    }
  }

  function createInteraction(
    IGame game,
    address giver,
    uint256 distance
  ) public {
    bool canPlayerInteract = CatchEntity(
      game.getEntity('balls')
    ).canIThrow(giver);
    if (!canPlayerInteract) revert CannotInteract();

    address[] memory playerInRange = MMOSessionEntity(game.getEntity('players'))
      .getPlayersInRange(giver, distance);

      for(uint i = 0; i < playerInRange.length; i++){
        console.log("in range", playerInRange[i]);
      }

    //TODO this is a limitation of multiple entities per module.
    //the MMOSessionEntity is already iterating over distance, now we have to do it again
    // as the neighbor interaction entity doesn't have access to the session entity
    // for (uint i = 0; i < playerInRange.length; i++) {
    //   CatchEntity(game.getEntity('balls'))
    //     .addBallCatcher(i);
    // }

    CatchEntity(game.getEntity('balls'))
      .throwBall(giver, distance, playerInRange);
  }

  function interceptInteraction(IGame game, address player) public {
    bool canCatch = CatchEntity(
      game.getEntity('balls')
    ).canICatch(player);
    if (!canCatch) revert CannotIntercept();

    CatchEntity(game.getEntity('balls'))
      .catchBall(player);
  }

  // --------------------------------- PLAYER INFO FUNCTIONS ---------------------------------

  function canIntercept(IGame game, address player) public view returns (bool) {
    return
CatchEntity(
      game.getEntity('balls')
    ).canICatch(player);
  }

  function canInteract(IGame game, address player) public view returns (bool) {
    return
 CatchEntity(
      game.getEntity('balls')
    ).canIThrow(player);
  }

  // --------------------------------- VIEW FUNCTIONS ---------------------------------

  function getPlayerCount(IGame game) public view returns (uint256) {
    return MMOSessionEntity(game.getEntity('players')).getPlayerCount();
  }

  function getInteractionCount(IGame game) public view returns (uint256) {
    return
      CatchEntity(game.getEntity('balls'))
        .ballCount();
  }

  function getBallHolderIndexes(
    IGame game
  ) public view returns (CatchEntity.Position[] memory) {
    return
      CatchEntity(game.getEntity('balls'))
        .getBallHolderPositions();
  }

  function getCatchableIndexes(
    IGame game
  ) public view returns (CatchEntity.Position[] memory) {
    return
      CatchEntity(game.getEntity('balls'))
        .getBallCatcherPositions();
  }







  error CannotInteract();
  error CannotIntercept();
}