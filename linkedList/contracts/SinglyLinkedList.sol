pragma solidity ^0.4.24;

contract SinglyLinkedList {

    mapping(uint256=>PICUser) userList;

    uint256 head = 0;

    struct PICUser {
        uint256 user;
        uint256 next;
    }

    function addUser(uint256 user) public {
        if (head == 0) {
            userList[head + 1] = PICUser(user, 0);
        } else {
            userList[head + 1] = PICUser(user, head);
        }

        head = head + 1;
    }

    function removeUser(uint256 user) public {
        uint256 cur = head;

        if (userList[cur].user == user) {
            head = (userList[cur].next == 0) ? 0 : userList[cur].next;
            delete userList[cur];
        } else {
            uint256 before;
            while (userList[cur].user != user) {
                before = cur;
                cur = userList[cur].next;
            }

            if (userList[cur].user == user) {
                userList[before].next = userList[cur].next;
                delete userList[cur];
            }
        }
    }

    function getUserList() public view returns (uint256[] memory list) {
        uint256 userCount = getListLength();
        list = new uint256[](userCount);

        uint256 cur = head;
        uint256 index = 0;

        while (cur > 0) {
            list[index] = userList[cur].user;
            index = index + 1;
            cur = userList[cur].next;
        }
    }

    function getListLength() public view returns (uint256 length) {
        uint256 cur = head;

        while (cur > 0) {
            length = length + 1;
            cur = userList[cur].next;
        }
    }

    function getUserIndex(uint256 user) public view returns (uint256 index) {
        uint256 cur = head;
        while (userList[cur].user != user) {
            cur = userList[cur].next;
        }

        if (userList[cur].user == user) {
            return cur;
        }
        
        return 0;
    }

    function getUserState(uint256 user) public view returns (uint256[] memory users) {
        users = new uint256[](2);

        uint256 cur = head;
        while (userList[cur].user != user) {
            cur = userList[cur].next;
        }

        users[0] = userList[cur].user;
        users[1] = userList[cur].next;
    }

    function getHead() public view returns(uint256 headInfo) {
        return head;
    }

}