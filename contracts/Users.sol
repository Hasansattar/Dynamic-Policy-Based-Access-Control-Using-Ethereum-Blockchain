// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Users {
    uint8 public userCounter = 0; //list of number of users register
    mapping(address => userDetailed) public userDetail; //check single user attributes detail
    mapping(address => bool) public isUser; // check user is active or not
    address[] public userIndex; // Separate array to keep track of user addresses

    event NewUser(address addr, string name, UserRole role); // Event to add new user
    event UpdateUser(address userAddress,string newName,string newLocation,uint8 newRole);  // Event to update properties of existing user
    event RemoveUser(address addr); // Event to remove existing user

    //Enum for UserRole that will attach with each separate user
    enum UserRole {
        ADMINISTRATION,
        MANAGER,
        EMPLOYEE
    }

    //User Detail Structure
    struct userDetailed {
        address userAddress;
        string userName;
        uint256 userIndex;
        string location;
        UserRole role;
    }

      // modifer check user exist or not 
    modifier onlyUser() {
        require(isUser[msg.sender], "Not a registered user,You cannot see");
        _;
    }
     // This function check the role of user 
    function _validateRole(uint8 role) internal pure returns (UserRole) {
        require(role <= 2, "Invalid user role");
        return UserRole(role);
    }

    // The registerUser function add new user 
    function registerAUser(
        string memory name,
        string memory location,
        uint8 role
    ) internal {
        require(isUser[msg.sender] == false, "User already registered");
        require(
            userDetail[msg.sender].userAddress == address(0),
            "User already registered"
        );

        UserRole userRole = _validateRole(role);

        userDetail[msg.sender] = userDetailed({
            userAddress: msg.sender,
            userName: name,
            location: location,
            role: userRole,
            userIndex: userCounter
        });
        userCounter++;
        userIndex.push(msg.sender); // Add user address to the list
        isUser[msg.sender] = true;

        emit NewUser(msg.sender, location, userRole);
    }
     // function to update existing user properties 
    function updateAUser(
        string memory newName,
        string memory newLocation,
        uint8 newRole
    ) internal {
        require(
            userDetail[msg.sender].userAddress != address(0),
            "User does not exist"
        );

        UserRole newUserRole = _validateRole(newRole);

        userDetail[msg.sender].userName = newName;
        userDetail[msg.sender].location = newLocation;
        userDetail[msg.sender].role = newUserRole;

        emit UpdateUser(msg.sender, newName, newLocation, newRole);
    }

     // function to remove user in the list of users
    function removeAUser(address userAddress) internal {
        require(
            userDetail[userAddress].userAddress != address(0),
            "User does not exist"
        );

        delete userDetail[userAddress];

        // Remove the user address from the list
        for (uint256 i = 0; i < userIndex.length; i++) {
            if (userIndex[i] == userAddress) {
                if (i != userIndex.length - 1) {
                    userIndex[i] = userIndex[userIndex.length - 1];
                }
                userIndex.pop();
                break;
            }
        }

        emit RemoveUser(userAddress);
    }

    //check user is valid or not
    function checkValidUser() public view returns (bool) {
        return isUser[msg.sender] == true;
    }

    // Function to get a list of all users
    function listOfUsers() public view returns (address[] memory) {
        return userIndex;
    }
}
