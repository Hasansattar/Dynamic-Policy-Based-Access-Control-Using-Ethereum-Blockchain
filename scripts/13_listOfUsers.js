const { ethers } = require("hardhat");
const { contractAddress } = require("./contractAddress");

async function main() {
    const [admin, user1, user2, user3, user4,user5,user6,user7,user8,user9,user10] = await ethers.getSigners();
    const DPBAC = await ethers.getContractFactory("DPBAC");
    const { contractAddress } = require("./contractAddress");
    const dpbac = await DPBAC.attach(contractAddress); // Use the deployed address

    console.log("Fetching list of users...");
    const startTime = Date.now();  // Start timing

    try {
        // Assuming listOfUsers is a view function returning an array of addresses
        const users = await dpbac.connect(admin).listOfUsers();
        console.log("Raw user data:", users); // Debug print to inspect raw output

        const endTime = Date.now();  // End timing
        console.log("Transaction time:", {
            sec: `${(endTime - startTime) / 1000} seconds`,
          });
    
          console.log("Contract Address:",{
                to:contractAddress,
          });
    

        // Process and print each user
        console.log("Users Retrieved:");
        users.forEach((user, index) => {
            console.log(`User ${index}: Address - ${user}`);
        });
    } catch (error) {
        console.error("Error while fetching users:", error);
    }
}

main().catch((error) => {
    console.error("Error in main execution:", error);
    process.exitCode = 1;
});
