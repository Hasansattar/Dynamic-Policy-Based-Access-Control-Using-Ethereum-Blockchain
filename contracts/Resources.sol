// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;


contract Resources {

     uint8 public  resCounter;       //number of resource register
     string internal  ImagebaseURI; // image resource variable
     string internal  VideobaseURI; // video resource variable
     string internal  AudiobaseURI; // audio resource variable
      

     // Resource attributes Detail for each resource  
     mapping(bytes32 => ResourceDetail) internal resourcesdetail;
     // Get ID for specific resource
     mapping(address => mapping(uint256 => bytes32)) internal  getResourceHash;
     // New array to store resource hashes
     bytes32[] public resourceIndex;  
     
     //Event for add new resource
     event NewResource(string link,ResourceType res,uint256  res_id,string location);
     //Event for update existing resource
     event UpdateResource(string link,ResourceType res,string location);



         // Enum List of Resource 
         enum ResourceType{
          IMAGE,
          VIDEO,
          AUDIO
          }
        
         //Resource Detail
         struct ResourceDetail{
           address owner;
           string link;
           uint256  res_id;
           uint256 listingTime;
           string location;
           bool   isboolen;
           ResourceType resourceType;
     
          }

          function _validateResourceType(uint8 resourceType) internal pure returns (ResourceType) {
         require(resourceType <= 2, "Invalid resource type");
         return ResourceType(resourceType);
    } 

 
       // Add Resource to allow the owner to  resource:
      function addAResource(string memory _newBaseURI, uint8 resourceType,string memory location) internal   {
        bytes32 resourceHash = keccak256(abi.encodePacked(resourceType, block.timestamp));
         
        require(resourcesdetail[resourceHash].listingTime == 0, "Resource with the same name already exists");

        //ResourceType rType;
         ResourceType rType = _validateResourceType(resourceType);
        
        resCounter=resCounter+1;

        resourcesdetail[resourceHash] = ResourceDetail({
            owner: msg.sender,
            link: _newBaseURI,
            res_id: resCounter,
            location:location,
            listingTime: block.timestamp,
            isboolen:true,
            resourceType: rType
        });

         getResourceHash[msg.sender][resCounter]=resourceHash;


      

        if (resourceType == 0) {
            ImagebaseURI = _newBaseURI;
        } else if (resourceType == 1) {
            VideobaseURI = _newBaseURI;
        } else if (resourceType == 2) {
            AudiobaseURI = _newBaseURI;
        } else {
            revert("Not Found");
        }
         resourceIndex.push(resourceHash);  // Add resource hash to the list
        emit NewResource(_newBaseURI,rType,resCounter,location);
     }

      // Update Resource to allow the owner to update an existing resource:
      function updateAResource(bytes32 resourceHash, string memory _newBaseURI, uint8 newResourceType,string memory location) internal     {
        require(resourcesdetail[resourceHash].listingTime != 0, "Resource does not exist");

        
         ResourceType rType = _validateResourceType(newResourceType);

        resourcesdetail[resourceHash].link = _newBaseURI;
        resourcesdetail[resourceHash].resourceType = rType;
        resourcesdetail[resourceHash].location = location;

        emit UpdateResource(_newBaseURI,rType,location);
      }

       // Check Resource Exit or not
      function checkResourcesExit(bytes32 resourceHash) internal   view returns (ResourceDetail memory) {
        return  resourcesdetail[resourceHash] ;

      }


      //the resourceList array is used to store the hashes of all resources added by the owner.
      function listAOfResources() internal view returns (bytes32[] memory) {
        return resourceIndex;

      }
  
       function getAResourceHash(address addr, uint256 index) internal   view returns (bytes32) {
       return getResourceHash[addr][index];
  }


}