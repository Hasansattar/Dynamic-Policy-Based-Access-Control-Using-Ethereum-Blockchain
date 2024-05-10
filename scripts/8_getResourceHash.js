const { ethers } = require("hardhat");
const { contractAddress } = require("./contractAddress");

async function main() {
  const [admin, user1, user2, user3, user4,user5,user6,user7,user8,user9,user10] = await ethers.getSigners();
    const DPBAC = await ethers.getContractFactory("DPBAC");
    const dpbac = await DPBAC.attach(contractAddress);  // Use the actual deployed address

    // Define the parameters for getSingleResourceHash
    const ownerAddress = admin.address;  // Example owner address, replace with actual
    const resourceIndex = 1;  // Example resource index, adjust as needed

    console.log("Fetching resource hash...");
    const startTime = Date.now();  // Start timing before the transaction
    const txResponse = await dpbac.connect(user1).getSingleResourceHash(ownerAddress, resourceIndex);
    const resourceHash = txResponse; // Wait for the transaction to be mined if it changes state
      
    const endTime = Date.now();  // End timing after transaction completion

    // Calculate the transaction time in seconds
   
    console.log("Transaction time:", {
      sec: `${(endTime - startTime) / 1000} seconds`,
    });
  
    
    console.log("Decoded Input:", {
        owner_address: `address: ${ownerAddress}`,
        res_index: `uint256: ${resourceIndex}`
    });

    // Output is fetched directly and assumed to be the return value from the view function
     console.log("Resource Hash:", resourceHash);

    console.log("Decoded Output:",{
      "0":`bytes32: ${resourceHash}`
    } );
}

main().catch((error) => {
    console.error("Error:", error);
    process.exitCode = 1;
});
