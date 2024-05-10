const { ethers } = require("hardhat");
const { contractAddress } = require("./contractAddress");

async function main() {
    const [admin,user1] = await ethers.getSigners();
    const DPBAC = await ethers.getContractFactory("DPBAC");
    const dpbac = await DPBAC.attach(contractAddress); // Adjust with your contract's deployed address

    console.log("Fetching users count...");
    const startTime = Date.now();  // Start timing

    try {
        // Assuming userCounter is a view function returning the number of users
        const userCount = await dpbac.connect(user1).userCounter();
        console.log("Decoded Output:",{
          "users":` uint8: ${userCount.toString()}` // Display the number of users

        });

        const endTime = Date.now();  // End timing
        console.log("Transaction time:" ,{
          "sec" :`${(endTime - startTime) / 1000} seconds`

       }); 
      
       console.log("Address:", {
          "from": user1.address
       });
       console.log("Contract:", {
           "to":dpbac.address
       });

       
    } catch (error) {
        console.error("Error while fetching user count:", error);
    }
}

main().catch((error) => {
    console.error("Error in main execution:", error);
    process.exitCode = 1;
});
