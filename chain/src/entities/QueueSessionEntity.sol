// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import './interfaces/IEntity.sol';
import 'forge-std/console.sol';

contract QueueSessionEntity is IEntity {
  address[] public players;
  mapping(address => uint256) playerIndex;

  function setAvailableKeys(string[] storage keys) internal override {
    keys.push('nextPlayer');
    keys.push('queueSize');
  }

  mapping(uint256 => address) queue;
  uint256 first = 0;
  uint256 last = 0;

  function enqueue(address data) public {
    last += 1;
    queue[last] = data;
  }

  function nextPlayer() public returns (address data) {
    require(last >= first); // non-empty queue

    data = queue[first];

    delete queue[first];
    first += 1;
  }

  function getQueueSize() public view returns (uint256) {
    return last - first;
  }

  // ----------------------------

  function addPlayer(address player) external onlyModule returns (uint256) {
    if (playerIndex[player] != 0) {
      revert PlayerAlreadyInSession();
    }
    players.push(player);
    playerIndex[player] = players.length - 1;
    return playerIndex[player];
  }

  function removePlayer(address player) external onlyModule {
    if (playerIndex[player] == 0) {
      revert PlayerNotInSession();
    }
    uint256 index = playerIndex[player] - 1;
    players[index] = players[players.length - 1];
    playerIndex[players[index]] = index + 1;
    players.pop();
    delete playerIndex[player];
  }

  function getPlayersInRange(
    address from,
    uint256 count
  ) external view returns (address[] memory) {
    uint256 startAt;
    uint256 endAt;
    if (playerIndex[from] < count) {
      startAt = 0;
    } else {
      startAt = playerIndex[from] - count;
    }
    if (playerIndex[from] + count > players.length) {
      endAt = players.length;
    } else {
      endAt = playerIndex[from] + count;
    }

    address[] memory result = new address[](endAt - startAt);

    console.log('start at', startAt);
    console.log('end at', endAt);

    uint256 cur = 0;
    for (uint256 i = startAt; i < endAt; i++) {
      result[cur] = players[i];
      // console.log("player", players[i]);

      cur++;
    }
    return result;
  }

  function getPlayerCount() external view returns (uint256) {
    return players.length;
  }

  function getPlayerIndex(address player) external view returns (uint256) {
    return playerIndex[player];
  }

  error PlayerAlreadyInSession();
  error PlayerNotInSession();
}
