const { ethers } = require("hardhat");
const { contractAddress } = require("./contractAddress");

async function main() {
    const [admin,user1] = await ethers.getSigners();
    const DPBAC = await ethers.getContractFactory("DPBAC");
    const dpbac = await DPBAC.attach(contractAddress); // Replace with your contract's deployed address

    console.log("Fetching user by index...");
    const index = 1; // Specify the index of the user you want to fetch
    const startTime = Date.now();  // Start timing

    try {
        // Assuming userList is a view function that returns the address of a user by index
        const userAddress = await dpbac.connect(user1).userIndex(index);
        console.log(`user at index: ${index}`);
        console.log("Decoded Input:" , {
          "uint256"  :`index: ${index}`
   });

        console.log("Decoded Output:" , {
               "0":  `address: ${userAddress}`
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
        console.error("Error while fetching user by index:", error);
    }
}

main().catch((error) => {
    console.error("Error in main execution:", error);
    process.exitCode = 1;
});
