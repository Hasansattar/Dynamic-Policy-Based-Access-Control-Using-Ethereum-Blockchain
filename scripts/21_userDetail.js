const { ethers } = require("hardhat");
const { contractAddress } = require("./contractAddress");

async function main() {
    const [admin,user1,user2] = await ethers.getSigners();
    const DPBAC = await ethers.getContractFactory("DPBAC");
    const dpbac = await DPBAC.attach(contractAddress); // Replace with your contract's deployed address

    console.log("Fetching user details...");
    const userAddress = user1.address; // Use the user address from the screenshot or another you wish to query
    const startTime = Date.now();  // Start timing

    try {
        const userDetails = await dpbac.connect(user1).userDetail(userAddress);
       
       
        console.log("Decoded Input:",{
          "address":` address: ${userDetails[0]}`

        });

        console.log("Decoded Output:",{
          "0":`address: userAddress ${userDetails[0]}`,
          "1":`string: userName ${userDetails[1]}`,
          "2":`uint256: userIndex ${userDetails[2]}`,
          "3":`string:  location ${userDetails[3]}`,
          "4":`uint8:  role ${userDetails[4]}`
        });
       
       
        // console.log(`User Details for ${userAddress}:`);
        // console.log(`  Address: ${userDetails[0]}`);
        // console.log(`  Name: ${userDetails[1]}`);
        // console.log(`  Index: ${userDetails[2]}`);
        // console.log(`  Location: ${userDetails[3]}`);
        // console.log(`  Role: ${userDetails[4]}`);

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
        console.error("Error while fetching user details:", error);
    }
}

main().catch((error) => {
    console.error("Error in main execution:", error);
    process.exitCode = 1;
});
