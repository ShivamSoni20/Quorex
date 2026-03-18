// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockStrategyA is ERC20 {
    constructor() ERC20("MockStrategy A", "MSTRATA") {
        _mint(msg.sender, 1000000 * 10**18);
    }

    function apy() external pure returns (uint256) {
        return 520; // 5.2%
    }

    function name() public view override returns (string memory) {
        return "Polkadot Hub Lending A";
    }
}

contract MockStrategyB is ERC20 {
    constructor() ERC20("MockStrategy B", "MSTRATB") {
        _mint(msg.sender, 1000000 * 10**18);
    }

    function apy() external pure returns (uint256) {
        return 810; // 8.1%
    }

    function name() public view override returns (string memory) {
        return "Polkadot Hub Multi-Yield B";
    }
}
