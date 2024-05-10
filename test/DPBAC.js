const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DPBAC", function () {
  let DPBAC, dpbac, owner, addr1, addr2;

  beforeEach(async function () {
    DPBAC = await ethers.getContractFactory("DPBAC");
    dpbac = await DPBAC.deploy();
    await dpbac.deployed();
    //console.log("owner",await dpbac.admin());
    [owner, addr1, addr2, addr3, _] = await ethers.getSigners();
    // console.log("owner",owner.address);
    //console.log("addr1",addr1.address);
    // console.log("addr2",addr2.address);
    // console.log("addr3",addr3.address);
    // console.log("check",await dpbac.users(addr1.address));
  });

  describe("Deployment", () => {
    //7 first group of test

    it("Should set the right owner", async () => {
      //8- set the right owner
      expect(await dpbac.admin()).to.equal(owner.address);
    });

    it("Should set paused state to false", async function () {
      expect(await dpbac.paused()).to.be.false;
    });
  });

  describe("Pausing and Unpausing", function () {
    it("Should pause the contract", async function () {
      await dpbac.pause(true);
      expect(await dpbac.paused()).to.be.true;
    });

    it("Should unpause the contract", async function () {
      await dpbac.pause(true);
      await dpbac.pause(false);
      expect(await dpbac.paused()).to.be.false;
    });

    it("Should revert if not called by the owner", async function () {
      await expect(dpbac.connect(addr1).pause(true)).to.be.revertedWith(
        "You are Not the contract owner"
      );
    });
  });

  //--------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------

  describe("User Management", function () {
    it("Should register a new user", async function () {
      await dpbac.connect(addr1).registerUser("Alice", "Location1", 0);
      //console.log("checking",await dpbac.users(addr1.address));
      //console.log("checking-true",await dpbac.isUser(addr1.address));
      // console.log("only-user",await dpbac.isUser(addr1.address));
      expect(await dpbac.isUser(addr1.address)).to.be.true;
    });

    it("Should update an existing user", async function () {
      // Register a user with the contract owner's account
      await dpbac.connect(addr1).registerUser("Alice", "Location1", 0);
      // Update the user details using a different account
      //console.log("checking",await dpbac.users(addr1.address));

      //console.log("only-user",await dpbac.isUser(addr1.address));
      await dpbac.connect(addr1).updateExistingUser("Bob", "Location2", 1);
      // Check if the user details are updated successfully
      // console.log("checking",await dpbac.users(addr1.address));

      const updatedUser = await dpbac.users(addr1.address);
      // Check if the user details are updated successfully
      expect(updatedUser.userName).to.equal("Bob");
      expect(updatedUser.location).to.equal("Location2");
      expect(updatedUser.role).to.equal(1);
    });

    it("Should remove a user", async function () {
      await dpbac.connect(addr1).registerUser("Alice", "Location1", 0);

      await dpbac.removeUser(addr1.address);
      expect(await dpbac.isUser(addr1.address)).to.be.true;
    });
  });

  //--------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------

  describe("Resource Management", function () {
    it("Should add a new resource", async function () {
      const newBaseURI = "https://example.com/image";
      await dpbac.addResource(newBaseURI, 0, "Location1");
      const resourceList = await dpbac.listOfResources();
      expect(resourceList.length).to.equal(1);
      const resourceDetail = await dpbac.resourcesdetail(resourceList[0]);

      expect(resourceDetail.owner).to.equal(owner.address);
      expect(resourceDetail.link).to.equal(newBaseURI);
      expect(resourceDetail.res_id).to.equal(1);
      expect(resourceDetail.location).to.equal("Location1");
    });

    it("Should update an existing resource", async function () {
      const newBaseURI = "https://example.com/image";
      await dpbac.addResource(newBaseURI, 0, "Location1");
      const resourceList = await dpbac.listOfResources();
      expect(resourceList.length).to.equal(1);
      const resourceDetail1 = await dpbac.resourcesdetail(resourceList[0]);
      const getResourceHash = await dpbac.getSingleResourceHash(
        owner.address,
        resourceList.length
      );
      // console.log("resource detail",resourceDetail1);
      // console.log("get resource Hash",await dpbac.getSingleResourceHash(owner.address,resourceList.length));

      const updatedBaseURI = "https://updated.example.com/image";
      await dpbac.updateResource(
        getResourceHash,
        updatedBaseURI,
        1,
        "Location2"
      );
      const resourceDetail = await dpbac.resourcesdetail(resourceList[0]);

      expect(resourceDetail.owner).to.equal(owner.address);
      expect(resourceDetail.link).to.equal(updatedBaseURI);
      expect(resourceDetail.res_id).to.equal(1);
      expect(resourceDetail.location).to.equal("Location2");
    });

    it("Should retrieve a single resource hash", async function () {
      const newBaseURI = "https://example.com/image";
      await dpbac.addResource(newBaseURI, 0, "Location1");
      const resourceHash = await dpbac.getSingleResourceHash(owner.address, 1);
      expect(resourceHash).to.not.be.null;
    });
  });

  //--------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------

  describe("Policy Management", function () {
    it("Should add a new policy", async function () {
      // Define the parameters for the new policy
      const userAddresses = [addr2.address]; // Array of user addresses
      const startTime = 1630545600; // Example start time (Unix timestamp)
      const endTime = 1630632000; // Example end time (Unix timestamp)
      const location = "Location1";
      const allowed = true;
      const resourceTypes = 0; // Assuming 0 corresponds to ResourceType.IMAGE

      // Add a new policy
      await dpbac.addPolicy(
        userAddresses,
        startTime,
        endTime,
        location,
        allowed,
        resourceTypes
      );

      // Retrieve the list of policies
      const policiesList = await dpbac.listOfPolicy();
      // console.log("policiesList",policiesList[0]);
      const addedPolicy = policiesList[policiesList.length - 1];
      // console.log("addedPolicy",addedPolicy.userAddress.userA);

      // Check if the added policy matches the expected values
      expect(addedPolicy.userAddress.userA).to.deep.equal(userAddresses);
      expect(addedPolicy.condition.startTime).to.equal(startTime);
      expect(addedPolicy.condition.endTime).to.equal(endTime);
      expect(addedPolicy.location).to.equal(location);
      expect(addedPolicy.allowed).to.equal(allowed);
      expect(addedPolicy.resourceType).to.equal(resourceTypes);
    });

    it("Should update an existing policy", async function () {
      // Define the parameters for the new policy
      const userAddresses = [addr1.address]; // Array of user addresses
      const startTime = 1630545600; // Example start time (Unix timestamp)
      const endTime = 1630632000; // Example end time (Unix timestamp)
      const location = "Location1";
      const allowed = true;
      const resourceTypes = 0; // Assuming 0 corresponds to ResourceType.IMAGE

      // Add a new policy
      await dpbac.addPolicy(
        userAddresses,
        startTime,
        endTime,
        location,
        allowed,
        resourceTypes
      );

      const policiesList = await dpbac.listOfPolicy();
      //console.log("policiesList",policiesList.length);
      //console.log("policiesList",policiesList);

      const policyIndex = policiesList.length - 1;

      //console.log("policyIndex",policyIndex);

      const updatedUserAddresses = [addr2.address];
      const IndexPolicy = policyIndex;
      const updatedStartTime = 1730545600; // Updated start time (Unix timestamp)
      const updatedEndTime = 1730632000; // Updated end time (Unix timestamp)
      const updatedLocation = "Location2";
      const UpdatedAllowed = true;
      const updateResourceTypes = 1; // Assuming 1 corresponds to ResourceType.VIDEO

      // Add a new policy
      await dpbac.updatePolicy(
        updatedUserAddresses,
        IndexPolicy,
        updatedStartTime,
        updatedEndTime,
        updatedLocation,
        UpdatedAllowed,
        updateResourceTypes
      );

      // const updatedPolicy = policiesList[policiesList.length - 1];
      const updatedPolicy = await dpbac.policiesList(policiesList.length - 1);

      //console.log("Updated policy", updatedPolicy);

      // Check if the added policy matches the expected values
      expect(updatedPolicy.userAddress.userA).to.deep.equal(
        updatedUserAddresses
      );
      expect(updatedPolicy.condition.startTime).to.equal(updatedStartTime);
      expect(updatedPolicy.condition.endTime).to.equal(updatedEndTime);
      expect(updatedPolicy.location).to.equal(updatedLocation);
      expect(updatedPolicy.allowed).to.equal(UpdatedAllowed);
      expect(updatedPolicy.resourceType).to.equal(updateResourceTypes);
    });
  });

  //--------------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------

  describe("Resource Access", function () {
    it("Should grant access to ADMINISTRATION user for IMAGE resource", async function () {
      /////////////// register a user
      await dpbac.connect(addr1).registerUser("Alice", "Location1", 0);
      
      
      ////////////////// add resource to ADMINISTRATION
      const newBaseURI = "https://example.com/image";
      await dpbac.addResource(newBaseURI, 0, "Location1");
       ////////////////////
      
        //console.log("resourceHash",resourceHash);
      //////////////
      const userAddresses = [addr1.address]; // Array of user addresses
      const startTime = 1630545600; // Example start time (Unix timestamp)
      const endTime = 1730632000; // Example end time (Unix timestamp)
      const location = "Location1";
      const allowed = true;
      const resourceTypes = 0; // Assuming 0 corresponds to ResourceType.IMAGE

      // Add a new policy
      await dpbac.addPolicy(
        userAddresses,
        startTime,
        endTime,
        location,
        allowed,
        resourceTypes
      );
     //const policiesList = await dpbac.listOfPolicy();
     //const policies = policiesList[0];
     //console.log("policies",policies);
     //const resourceHash = await dpbac.getSingleResourceHash(owner.address, 1); // Assuming the first resource is an IMAGE
      

      //await dpbac.connect(addr1).grantPermission(resourceHash);

       //const uswe = await dpbac.isUser(addr1.address);
       //console.log("user", uswe);
      const resourcelink = await dpbac.connect(addr1).getResource(1); // Assuming the first resource ID
      
     // console.log("resourcelink",resourcelink)
     // expect(resourcelink).to.equal("https://example.com/image");
    });

    // it("Should grant access to MANAGER user for VIDEO resource", async function () {
    //     // Assuming the second resource is a VIDEO and the MANAGER user is addr1
    //     const resourceHash = await dpbac.getAResourceHash(owner.address, 1);
    //     await dpbac.grantPermission(resourceHash);

    //     const resource = await dpbac.getResource(1); // Assuming the second resource ID
    //     console.log("resouresourcercelink",resourcelink)
    //     expect(resource).to.equal(dpbac._VideoBaseURI());
    // });

    // it("Should grant access to EMPLOYEE user for AUDIO resource", async function () {
    //     // Assuming the third resource is an AUDIO and the EMPLOYEE user is addr2
    //     const resourceHash = await dpbac.getAResourceHash(owner.address, 2);
    //     await dpbac.grantPermission(resourceHash);

    //     const resource = await dpbac.getResource(2); // Assuming the third resource ID
    //     expect(resource).to.equal(dpbac._AudioBaseURI());
    // });

    // it("Should not grant access to invalid user", async function () {
    //     // Assuming the fourth resource is an IMAGE and the INVALID user is addr3
    //     const resourceHash = await dpbac.getAResourceHash(owner.address, 3);
    //     await expect(dpbac.connect(addr3).getResource(3)).to.be.revertedWith("No matching policy found");
    // });

    // it("Should not grant access to user with mismatched location", async function () {
    //     // Assuming the fifth resource is an IMAGE and the MANAGER user is addr1
    //     const resourceHash = await dpbac.getAResourceHash(owner.address, 4);
    //     await expect(dpbac.connect(addr1).getResource(4)).to.be.revertedWith("User and resource locations do not match");
    // });
  });
});
