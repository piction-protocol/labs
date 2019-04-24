pragma solidity ^0.4.24;

contract DoublyLinkedList {

    mapping(uint256=>PICUser) userList;

    uint256 head = 0;

    struct PICUser {
        uint256 before;
        uint256 user;
        uint256 next;
    }

    function addUser(uint256 user) public {
        if (head == 0) {
            userList[head + 1] = PICUser(0, user, 0);
        } else {
            userList[head + 1] = PICUser(0, user, head);
            userList[head].before = head + 1;
        }

        head = head + 1;
    }

    function removeUser(uint256 user) public {
        uint256 cur = head;

        if (userList[cur].user == user) {
            if (userList[cur].next == 0) {
                head = 0;
            } else {
                head = userList[cur].next;
                userList[head].before = 0;
            }
            delete userList[cur];
        } else {
            while (userList[cur].user != user) {
                cur = userList[cur].next;
            }

            if (userList[cur].user == user) {
                uint256 before = userList[cur].before;
                uint256 next = userList[cur].next;

                userList[before].next = next;
                userList[next].before = before;
                delete userList[cur];
            }
        }
    }

    function removeByKey(uint256 key) public {
        uint256 before = userList[key].before;
        uint256 next = userList[key].next;

        if (next == 0) {
            if (before == 0) {
                head = 0;
            } else {
                userList[before].next = 0;
            }
        } else {
            if (before == 0) {
                head = next;
                userList[head].before = 0;
            } else {
                userList[before].next = next;
                userList[next].before = before;
            }
        }

        delete userList[key];
    }

    function getUserList() public view returns (uint256[] memory keys, uint256[] memory list) {
        uint256 userCount = getListLength();
        list = new uint256[](userCount);
        keys = new uint256[](userCount);

        uint256 cur = head;
        uint256 index = 0;

        while (cur > 0) {
            list[index] = userList[cur].user;
            keys[index] = cur;

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
}