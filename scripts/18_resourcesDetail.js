const { ethers } = require("hardhat");
const { contractAddress } = require("./contractAddress");

async function main() {
    const [admin,user1] = await ethers.getSigners();
    const DPBAC = await ethers.getContractFactory("DPBAC");
    const dpbac = await DPBAC.attach(contractAddress); // Use your contract's deployed address

    console.log("Fetching resource details retrieved...");
    const startTime = Date.now();  // Start timing

    try {
        const resourceHash = '0x239370cd991f7c4efe7e486c52491abc172bef4e433482624167b587b86d08f6'; // Example resource hash
        const resourceDetails = await dpbac.connect(user1).resourcesDetail(resourceHash);
        // console.log("resourceDetails",resourceDetails); //
        const endTime = Date.now();  // End timing
        console.log("Transaction time:" ,{
           "sec" :`${(endTime - startTime) / 1000} seconds`

        }); 
       
        console.log("Address:", {
           "from": admin.address
        });
        console.log("Contract:", {
            "to":dpbac.address
        });
      console.log("Decoded Input:",{
          "bytes32":resourceHash.toString()
      });
         

      console.log("Decoded Output:",{
        "0":`Owner Address: ${resourceDetails.owner}`,
        "1":`Link: ${resourceDetails.link}`,
        "2":`Resource ID: ${resourceDetails.res_id}`,
        "3":`List Time: ${resourceDetails.listingTime.toString()}`,
        "4":`Location: ${resourceDetails.location}`,
        "5":`Is Boolean: ${resourceDetails.isboolen}`,
        "6":`Resource Type: ${resourceDetails.resourceType}`
    });
      


        // // Print formatted resource details
        // console.log("Resource Details Retrieved:");
        // console.log(`Owner Address: ${resourceDetails.owner}`);
        // console.log(`Link: ${resourceDetails.link}`);
        // console.log(`Resource ID: ${resourceDetails.res_id}`);
        // console.log(`List Time: ${resourceDetails.listTime}`);
        // console.log(`Location: ${resourceDetails.location}`);
        // console.log(`Is Boolean: ${resourceDetails.isBoolean}`);
        // console.log(`Resource Type: ${resourceDetails.resourceType}`);
    } catch (error) {
        console.error("Error while fetching resource details:", error);
    }
}

main().catch((error) => {
    console.error("Error in main execution:", error);
    process.exitCode = 1;
});
