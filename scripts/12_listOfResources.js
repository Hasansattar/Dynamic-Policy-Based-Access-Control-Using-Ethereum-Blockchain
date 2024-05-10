const { ethers } = require("hardhat");
const DPBCabi = require("../artifacts/contracts/DPBAC.sol/DPBAC.json");
const { contractAddress } = require("./contractAddress");


async function main() {
  const [admin, user1, user2, user3, user4,user5,user6,user7,user8,user9,user10] = await ethers.getSigners();
    const DPBAC = await ethers.getContractFactory("DPBAC");
    const dpbac = await DPBAC.attach(contractAddress); // Adjust with your contract's deployed address

    console.log("Fetching list of resources...");
    const startTime = Date.now();  // Start timing

    try {
        // Assuming listOfResources is a view function returning an array of bytes32 hashes
        const resources = await dpbac.connect(user1).listOfResources();
        console.log("Raw resources data:", resources); // Debug print to inspect raw output

        const endTime = Date.now();  // End timing
         // Calculate the transaction time in seconds

     console.log("Transaction time:", {
        sec: `${(endTime - startTime) / 1000} seconds`,
      });

      console.log("Contract Address:",{
            to:contractAddress,
      });

      
        // Process and print each resource
        console.log("Decoded Output:");
     let r =   resources.forEach((hash, index) => {
            console.log(`Resource ${index}:`,{
               bytes32:hash
            }
            
            );
        });
        console.log("Resources Retrieved");
       
    } catch (error) {
        console.error("Error while fetching resources:", error);
    }
}

main().catch((error) => {
    console.error("Error in main execution:", error);
    process.exitCode = 1;
});




