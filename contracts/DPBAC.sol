// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;


import "./Policies.sol";

contract DPBAC is Policies {
    address public Owner;
    bool public paused = false;

    constructor() {
        Owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == Owner, "You are Not the contract owner");
        _;
    }

     //contract pause or not
    function admin() public view returns(address) {
        return Owner;
    }
    
    //contract pause or not
    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

    function _ImageBaseURI() internal view returns (string memory) {
        return ImagebaseURI;
    }

    // internal
    function _VideoBaseURI() internal view returns (string memory) {
        return VideobaseURI;
    }

    // internal
    function _AudioBaseURI() internal view returns (string memory) {
        return AudiobaseURI;
    }

    //////////////////////////////////// USERS //////////////////////////////////////////////

    function registerUser(
        string memory name,
        string memory location,
        uint8 role
    ) public {
        require( msg.sender != Owner, "Contract owner cannot add users");
        registerAUser(name, location, role);
    }

    function updateExistingUser(
        string memory newName,
        string memory newLocation,
        uint8 newRole
    ) public onlyUser {
        updateAUser(newName, newLocation, newRole);
    }

    function removeUser(address userAddress) public  onlyOwner {
        removeAUser(userAddress);
    }

    //////////////////////////////////// USERS //////////////////////////////////////////////

    //////////////////////////////////// RESOURCES //////////////////////////////////////////////

    //The addResource function allows the owner to add resources to the contract,
    //specifying the name and type of the resource.

    function addResource(
        string memory _newBaseURI,
        uint8 resourceType,
        string memory location
    ) public onlyOwner {
        addAResource(_newBaseURI, resourceType, location);
    }

    // updateResource to allow the owner to update an existing resource:
    function updateResource(
        bytes32 resourceHash,
        string memory _newBaseURI,
        uint8 newResourceType,
        string memory location
    ) public onlyOwner {
        updateAResource(resourceHash, _newBaseURI, newResourceType, location);
    }

    //the resourceList array is used to store the hashes of all resources added by the owner.
    function listOfResources()
        public
        view
        onlyValidUser
        returns (bytes32[] memory)
    {
        return listAOfResources();
    }

    function getSingleResourceHash(address owner_address, uint256 res_index)
        public
        view
        onlyValidUser
        returns (bytes32)
    {
        return getAResourceHash(owner_address, res_index);
    }


         function resourcesDetail(bytes32 resourceHash)
        public
        view
        onlyValidUser
        returns (ResourceDetail memory)
    {
        return checkResourcesExit(resourceHash);
    }
         
  
    //////////////////////////////////// RESOURCES //////////////////////////////////////////////

    //////////////////////////////////// POLICIES //////////////////////////////////////////////
    function addPolicy(
        address[] memory _userAddresses,
        uint256 _startTime,
        uint256 _endTime,
        string memory _location,
        bool _allowed,
        ResourceType _resourceTypes
    ) external onlyOwner {
        addAPolicy(
            _userAddresses,
            _startTime,
            _endTime,
            _location,
            _allowed,
            _resourceTypes
        );
    }

    function updatePolicy(
        address[] memory _userAddresses,
        uint256 policyIndex,
        uint256 _startTime,
        uint256 _endTime,
        string memory _location,
        bool _allowed,
        ResourceType _resourceTypes
    ) external onlyPolicyOwner(policyIndex) {
        updateAPolicy(
            _userAddresses,
            policyIndex,
            _startTime,
            _endTime,
            _location,
            _allowed,
            _resourceTypes
        );
    }

    //////////////////////////////////// POLICIES //////////////////////////////////////////////

    ////////////////////// GETTING RESOURCE AFTER USER VALIDITY AND POLICY PERMISSION //////////////////////////////

    function getResource(uint64 ResourceId)
        public view 
        onlyUser
        returns (string memory)
    {
        bytes32 resourceHash =getResourceHash[Owner][ResourceId];
        grantPermission(resourceHash);

        ResourceType resourceType = resourcesdetail[resourceHash].resourceType;
        //  string memory userlocation = users[msg.sender].location;
        //  string memory rourcelocation = resourcesdetail[getResourceID[Owner][ResourceId]].location;

        // Check if user's location matches the resource's location

        UserRole userRole = userDetail[msg.sender].role;
        //require(grantPermission(getResourceID[Owner][ResourceId]),"You have not permission");

        require(
            keccak256(bytes(userDetail[msg.sender].location)) ==
                keccak256(
                    bytes(
                        resourcesdetail[getResourceHash[Owner][ResourceId]]
                            .location
                    )
                ),
            "User and resource locations do not match"
        );
        
          if (userRole == UserRole.ADMINISTRATION || userRole == UserRole.MANAGER || userRole == UserRole.EMPLOYEE) {
            if (resourceType == ResourceType.IMAGE) {
                return _ImageBaseURI();
            } else if (resourceType == ResourceType.VIDEO) {
                return _VideoBaseURI();
            } else if (resourceType == ResourceType.AUDIO) {
                return _AudioBaseURI();
            }
        }
        return "Invalid user role or resource type";
        
        
    }
}
