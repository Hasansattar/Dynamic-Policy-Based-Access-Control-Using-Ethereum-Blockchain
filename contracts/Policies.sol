
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./Users.sol";
import "./Resources.sol";

contract Policies is Users, Resources  {
      uint8 public policyCounter = 0;

      // condtion 
      struct Condition {
        uint256 startTime;
        uint256 endTime;
     }

      // Array to users who can access policy
     struct userAddresss {
        address[] userA;
      
     }
   
     // Policy Structure Detail
     struct Policy {
        address owner;
        userAddresss userAddress;
        Condition condition;
        uint256 policyID;
        string location;
        bool allowed;
        ResourceType resourceType;
    }
    //   mapping(uint256 => Policy) public policy;
      Policy[] public policyDetail;

    modifier onlyPolicyOwner(uint256 policyIndex) {
        require(msg.sender == policyDetail[policyIndex].owner, "Not the policy owner");
        _;
    }

    modifier onlyValidUser() {
        require(checkValidUser() == true, "Not a registered user");
        _;
    }

    modifier onlyResourceOwner(bytes32 resourceHash) {
        require(msg.sender == checkResourcesExit(resourceHash).owner, "Not the resource owner");
        _;
    }

    event PolicyAdded(uint256 policyIndex);  // Event to add new policy
    event PolicyUpdated(uint256 policyIndex); // Event to update existing policy
    event PermissionGranted(address user, bytes32 resourceHash); // Event to grant resource policy to user

   

    // function to add policy
     function addAPolicy(
        address[] memory _userAddresses,
        uint256 _startTime,
        uint256 _endTime,
        string memory _location,
        bool _allowed,
        ResourceType _resourceTypes
     ) internal  {
        Policy memory newPolicy = Policy({
            owner: msg.sender,
            userAddress: userAddresss({userA:_userAddresses}),
            condition: Condition({ startTime: _startTime, endTime: _endTime }),
            policyID: policyCounter++,
            location: _location,
            allowed: _allowed,
            resourceType: _resourceTypes
        });

        // policy[policyCounter++]=newPolicy;
        

        policyDetail.push(newPolicy);
        emit PolicyAdded(policyDetail.length - 1);
     }
      
    
    
      
      // function to check how many list of policies in the policies list
      function listOfPolicy() public view returns (Policy[] memory ){
        
        return policyDetail;
      }

      
       // function to update attributes of existing policies

     function updateAPolicy(
        address[] memory _userAddresses,
        uint256 policyIndex,
        uint256 _startTime,
        uint256 _endTime,
        string memory _location,
        bool _allowed,
        ResourceType  _resourceTypes
     ) internal   {
        Policy storage policy = policyDetail[policyIndex];
           
        policy.userAddress.userA = _userAddresses;
       
        policy.condition.startTime = _startTime;
        policy.condition.endTime = _endTime;
        policy.location = _location;
        policy.allowed = _allowed;
        policy.resourceType = _resourceTypes;
       

        emit PolicyUpdated(policyIndex);
     }
         
         // function for check how have grant to access the resource
     function grantPermission(bytes32 resourceHash) public view  onlyValidUser returns(string memory) {
        Policy memory policy = findMatchingPolicy(msg.sender,resourceHash);

        require(policy.allowed, "Permission denied"); 
        //emit PermissionGranted(msg.sender, resourceHash);
        return "Successfully Permission Grant";
     }

     function findMatchingPolicy(address user,bytes32 resourceHash) internal view returns (Policy memory) {
        for (uint256 i = 0; i < policyDetail.length; i++) {
            Policy memory policy = policyDetail[i];

            if (
                 isUserInPolicy(user, policy) &&
                 isTimeInPolicy(policy) &&
                 isLocationInPolicy(policy, resourceHash) &&
                 isResourceTypeInPolicy(resourceHash)
            ) {
                return policy;
            }
        }

          revert("No matching policy found");
            //  Policy memory emptyPolicy;
            //   return emptyPolicy;
      
        
     }

     function isUserInPolicy(address user, Policy memory policy) internal   pure returns (bool) {
        for (uint256 i = 0; i < policy.userAddress.userA.length; i++) {
            if (policy.userAddress.userA[i] == user) {
                return true;
            }
        }
        // return false;
        revert("No User match In Policy");
     }

     function isTimeInPolicy(Policy memory policy) internal  view returns (bool) {
        uint256 currentTime = block.timestamp;
        return currentTime >= policy.condition.startTime && currentTime <= policy.condition.endTime;

        
     }

     function isLocationInPolicy(Policy memory policy, bytes32 resourceHash) internal   view returns (bool) {
        return keccak256(bytes(policy.location)) == keccak256(bytes(checkResourcesExit(resourceHash).location));
     }

     function isResourceTypeInPolicy(bytes32 resourceHash) internal  view returns (bool) {
         ResourceType resourceType = resourcesdetail[resourceHash].resourceType;

            for (uint256 i = 0; i < policyDetail.length; i++) {
              Policy memory policy = policyDetail[i];
              if(policy.resourceType == resourceType){
                return true;

              }
              
              
            }
            // return  false;
            revert("Resouces are not match");
            
            
     
     }
}
