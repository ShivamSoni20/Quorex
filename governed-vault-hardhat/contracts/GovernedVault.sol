// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract GovernedVault is ERC4626, AccessControl, Pausable {
    bytes32 public constant TIMELOCK_ROLE = keccak256("TIMELOCK_ROLE");
    bytes32 public constant GUARDIAN_ROLE = keccak256("GUARDIAN_ROLE");

    address public strategy;

    event StrategyChanged(address indexed oldStrategy, address indexed newStrategy);

    constructor(
        IERC20 _asset,
        address _timelock,
        address _guardian,
        address _initialStrategy
    ) ERC4626(_asset) ERC20("GovernedVault Shares", "gvTOKEN") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(TIMELOCK_ROLE, _timelock);
        _grantRole(GUARDIAN_ROLE, _guardian);
        
        strategy = _initialStrategy;
    }

    function setStrategy(address _newStrategy) external onlyRole(TIMELOCK_ROLE) {
        address oldStrategy = strategy;
        strategy = _newStrategy;
        emit StrategyChanged(oldStrategy, _newStrategy);
    }

    function pause() external onlyRole(GUARDIAN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    function _deposit(address caller, address receiver, uint256 assets, uint256 shares) internal override whenNotPaused {
        super._deposit(caller, receiver, assets, shares);
    }
}
