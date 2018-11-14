pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

import "./IProxy.sol";

contract DataV2 is IProxy {
    using SafeMath for uint256;

    uint256 count;
    string title;

    event Purchased(uint256 _result, uint256 _addCount);
    
    function purchase() public {
        uint256 addCount = 1;

        count = count.add(addCount);

        emit Purchased(count, addCount);
    }

    function newPurchase() public {
        uint256 addCount = 2;

        count = count.add(addCount);

        emit Purchased(count, addCount);
    }

    function getCount() public view returns(uint256) {
        return count;
    }

    function setTitle() public {
        string memory str = "piction network";

        title = str;
    }

    function getTitle() public view returns(string) {
        return title;
    }
}