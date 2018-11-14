pragma solidity ^0.4.24;

import "./DataV2.sol";

contract DataV3 is DataV2 {
    
    function modifyVariable() public {
        count = 100;
        title = "maxim comics";
    }

    function getVariable() public view returns(uint256, string) {
        return (count, title);
    }
}