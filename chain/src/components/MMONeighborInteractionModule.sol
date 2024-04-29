// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IComponent, ComponentSummary} from './interfaces/IComponent.sol';
import {CatchEntity} from '../entities/CatchEntity.sol';
import {MMOSessionEntity} from '../entities/MMOSessionEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {IEntityFactory} from '../interfaces/IEntityFactory.sol';
import {console} from 'forge-std/console.sol';
import {MMOSessionModule} from './MMOSessionModule.sol';
import {GameFuncParams} from '../interfaces/IGame.sol';
import {GameEntity} from '../entities/GameEntity.sol';

contract MMONeighborInteractionModule is IComponent {
  string public displayName = 'Daily Interaction';
  string[] public required = ['players', 'canPlayerThrow'];
  string[] public functions = [
    'throwBall',
    'catchBall',
    'canPlayerCatch',
    'canPlayerThrow',
    'getPlayerCount',
    'getBallCount',
    'getBallHolderIndexes',
    'getPlayerIndex',
    'getCatchableIndexes'
  ];
  string[] public abis = [
    'joinSession(address,address), throwBall(address,address), catchBall(address,address)'
  ];

  function initialize(address game) external {
    IGame(game).createEntity('CatchEntity');
  }

  function getSummary() external view returns (ComponentSummary memory) {
    return
      ComponentSummary(
        address(this),
        functions,
        abis,
        required,
        'Neighbor Interaction'
      );
  }

  // --------------------------------- ACTION FUNCTIONS ---------------------------------

  function joinSession(address executor, address gameAddress) public {
    IGame game = IGame(gameAddress);
    address player;

    GameEntity gameEntity = GameEntity(game.getEntity('playerParams'));
    player = gameEntity.getPlayerAddress(executor, 'player');

    uint256 index = MMOSessionEntity(game.getEntity('playerIndex'))
      .getPlayerIndex(player);

    if (getPlayerCount(game) % 2 == 0) {
      console.log('adding thrower: ', player);
      CatchEntity(game.getEntity('balls')).addNewThrower(player, index);
    } else {
      console.log('adding player: ', player);
      CatchEntity(game.getEntity('balls')).addNewPlayer(player, index);
    }
  }

  function throwBall(address executor, address gameAddress) public {
    // function throwBall(IGame game, address giver, uint256 distance) public {
    IGame game = IGame(gameAddress);
    address giver;
    uint256 distance;

    GameEntity gameEntity = GameEntity(game.getEntity('playerParams'));
    giver = gameEntity.getPlayerAddress(executor, 'player');
    distance = gameEntity.getPlayerUint(executor, 'distance');

    bool canPlayerInteract = CatchEntity(game.getEntity('balls')).canIThrow(
      giver
    );
    if (!canPlayerInteract) revert CannotInteract();

    address[] memory playerInRange = MMOSessionEntity(game.getEntity('players'))
      .getPlayersInRange(giver, distance);

    CatchEntity(game.getEntity('balls')).throwBall(
      giver,
      distance,
      playerInRange
    );
  }

  function catchBall(address executor, address gameAddress) public {
    IGame game = IGame(gameAddress);

    address player;
    GameEntity gameEntity = GameEntity(game.getEntity('playerParams'));
    player = gameEntity.getPlayerAddress(executor, 'player');

    bool canCatch = CatchEntity(game.getEntity('balls')).canICatch(player);
    if (!canCatch) revert CannotIntercept();

    CatchEntity(game.getEntity('balls')).catchBall(player);
  }

  // --------------------------------- PLAYER INFO FUNCTIONS ---------------------------------

  function canPlayerCatch(
    IGame game,
    address player
  ) public view returns (bool) {
    return CatchEntity(game.getEntity('balls')).canICatch(player);
  }

  function canPlayerThrow(
    IGame game,
    address player
  ) public view returns (bool) {
    return CatchEntity(game.getEntity('balls')).canIThrow(player);
  }

  // --------------------------------- VIEW FUNCTIONS ---------------------------------

  function getPlayerCount(IGame game) public view returns (uint256) {
    return MMOSessionEntity(game.getEntity('players')).getPlayerCount();
  }

  function getBallCount(IGame game) public view returns (uint256) {
    return CatchEntity(game.getEntity('balls')).ballCount();
  }

  function getBallHolderIndexes(
    IGame game
  ) public view returns (CatchEntity.Position[] memory) {
    return CatchEntity(game.getEntity('balls')).getBallHolderPositions();
  }

  function getPlayerIndex(
    IGame game,
    address player
  ) public view returns (uint256) {
    return CatchEntity(game.getEntity('balls')).getPlayerPosition(player);
  }

  function getCatchableIndexes(
    IGame game
  ) public view returns (CatchEntity.Position[] memory) {
    return CatchEntity(game.getEntity('balls')).getBallCatcherPositions();
  }

  error CannotInteract();
  error CannotIntercept();
}
