// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.7.0 < 0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MediToken is ERC20 {
    constructor() ERC20("MT", "Medi") {
        _mint(msg.sender, 10000 * 10 ** decimals());
    }
}
