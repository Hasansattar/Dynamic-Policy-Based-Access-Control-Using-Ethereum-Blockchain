const { ethers } = require("hardhat");
const { contractAddress } = require("./contractAddress");

async function main() {
    const [admin,user1,user2] = await ethers.getSigners();
    const DPBAC = await ethers.getContractFactory("DPBAC");
    const dpbac = await DPBAC.attach(contractAddress); // Adjust with your contract's deployed address

    console.log("Fetching policy counter...");
    const startTime = Date.now();  // Start timing

    try {
        // Assuming policyCounter is a view function returning a uint8
        const count = await dpbac.connect(admin).policyCounter();
        console.log("Policy Count:", count);
        console.log("Decoded Output:",{
        "0":`uint8: ${count} `
        });

        const endTime = Date.now();  // End timing
        console.log("Transaction time:", {
            sec: `${(endTime - startTime) / 1000} seconds`,
          });
    
          console.log("Contract Address:",{
                to:contractAddress,
          });
    } catch (error) {
        console.error("Error while fetching the policy count:", error);
    }
}

main().catch((error) => {
    console.error("Error in main execution:", error);
    process.exitCode = 1;
});
