// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VaultToken is ERC20, ERC20Permit, ERC20Votes, Ownable {
    address public vault;

    constructor()
        ERC20("GovernedVault Token", "VAULT")
        ERC20Permit("GovernedVault Token")
        Ownable(msg.sender)
    {}

    function setVault(address _vault) external onlyOwner {
        vault = _vault;
    }

    // Overrides required by Solidity
    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Votes)
    {
        super._update(from, to, value);
    }

    function nonces(address owner)
        public
        view
        override(ERC20Permit, Nonces)
        returns (uint256)
    {
        return super.nonces(owner);
    }
}
