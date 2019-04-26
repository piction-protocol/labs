pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract IterableMap {

    struct Sale {
        uint256 index;
        uint256 price;
        uint256 maxcap;
        uint256 endTime;
        uint256 pxlRaised;
        mapping (address => uint256) pxlAmount;
    }

    mapping (string => Sale) internal sales;
    string[] internal keyList;

    function setSaleValue(string key, uint256 price, uint256 maxcap, uint256 endTime) external {
        Sale storage sale = sales[key];
        sale.price = price;
        sale.maxcap = maxcap;
        sale.endTime = endTime;

        if(sale.index == 0) {   // key가 list에 없을 경우 추가
            keyList.push(key);
            sale.index = keyList.length;
        }
    }

    function deleteSaleValue(string key) public {
        Sale storage sale = sales[key];
        require(sale.index != 0); 
        require(sale.index <= keyList.length); 
        
        if(sale.index < keyList.length) {
            uint256 keyListIndex = sale.index - 1;
            uint256 keyListLastIndex = keyList.length - 1;
            sales[keyList[keyListLastIndex]].index = keyListIndex + 1;
            keyList[keyListIndex] = keyList[keyListLastIndex];
        }
        keyList.length--;
        delete sales[key];
    }

    function size() public view returns (uint256) {
        return keyList.length;
    }
    
    function contains(string key) public view returns (bool) {
        return (sales[key].index > 0);
    }

    function getSaleByKey(string key) public view returns (uint256 price, uint256 maxcap, uint256 endTime, uint256 pxlRaised) {
        return (sales[key].price, sales[key].maxcap, sales[key].endTime, sales[key].pxlRaised);
    }

    function getSaleByListIndex(uint index) public view returns (uint256 price, uint256 maxcap, uint256 endTime, uint256 pxlRaised) {
        require(index >= 0);
        require(index < keyList.length);
        return (sales[keyList[index]].price, sales[keyList[index]].maxcap, sales[keyList[index]].endTime, sales[keyList[index]].pxlRaised);
    }
}