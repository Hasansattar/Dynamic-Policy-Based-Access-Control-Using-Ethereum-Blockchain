const { ethers } = require("hardhat");
const { contractAddress } = require("./contractAddress");

async function main() {
    const [admin,user1,user2] = await ethers.getSigners();
    const DPBAC = await ethers.getContractFactory("DPBAC");
    const dpbac = await DPBAC.attach(contractAddress); // Adjust with your contract's deployed address

    console.log("Fetching resource counter...");
    const startTime = Date.now();  // Start timing

    try {
        const resCounter = await dpbac.connect(admin).resCounter();
        
        console.log("Decoded Output:",{
          "0":`uint8: ${resCounter.toString()}`
        }); // Output the number of resources

        const endTime = Date.now();  // End timing
        console.log("Transaction Time:", {
            sec: `${(endTime - startTime) / 1000} seconds`,
          });
    
        
        console.log("Contract Address:",{
            to:contractAddress,
      });

    } catch (error) {
        console.error("Error while fetching resource count:", error);
    }
}

main().catch((error) => {
    console.error("Error in main execution:", error);
    process.exitCode = 1;
});
