// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from 'solady/utils/Initializable.sol';

import {IModule, ModuleSummary} from './interfaces/IModule.sol';
import {INumberEntity} from '../entities/interfaces/INumberEntity.sol';
import {IGame} from '../interfaces/IGame.sol';
import {HostedRolesEntity} from '../entities/HostedRolesEntity.sol';

contract HostedVoteModule is IModule, Initializable {
  // ok so this contract will
  // 1. basically be a stateless game?

  string public displayName = 'Multiplayer Hosted Roles';
  string[] public required = ['dailyAction', 'lastActionAt'];
  string[] public functions = ['dailyInteraction'];

  // function getRequiredStrings() public view returns (string[] memory) {
  //     return required;
  // }

  function initialize(address game) external override {
    
  }
  function getSummary() external view override returns (ModuleSummary memory) {
    return ModuleSummary(address(this), functions, required, displayName);
  }

  function vote(address host, address target) external {
  }


  function createSession(IGame game) external{}

  // players call this to opt in to a game
  function joinSession(address host) external {}

  // once all players have joined, the host calls this to start the game
  function assignRoles() external {}

  function dailyInteraction(IGame game, uint256 tokenId) public {
    //TODO don't use msg.sender but I don't want other to play on someone else's behalf..
    uint256 lastActionAt = INumberEntity(game.getEntity('lastActionAt'))
      .getNumber(tokenId, 'lastActionAt');
    // uint256 lastActionAt = game.getOwnedNumber(msg.sender, tokenId, "lastActionAt");
    if (block.timestamp - lastActionAt < 14 hours) revert NotEnoughTimePassed();
    uint256 dailyActions = INumberEntity(game.getEntity('dailyActions'))
      .getNumber(tokenId, 'dailyActions');

    INumberEntity(game.getEntity('dailyActions')).updateNumber(
      tokenId,
      'dailyActions',
      dailyActions + 1
    );

    INumberEntity(game.getEntity('lastActionAt')).updateNumber(
      tokenId,
      'lastActionAt',
      block.timestamp
    );
  }

  // function getProvidedFunctions() external view returns (string[] memory){
  //     return functions;
  // }

  error NotEnoughTimePassed();
}
