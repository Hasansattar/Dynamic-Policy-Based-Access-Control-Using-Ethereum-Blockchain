const { ethers } = require("hardhat");
const { contractAddress } = require("./contractAddress");

async function main() {
    const [admin] = await ethers.getSigners();
    const DPBAC = await ethers.getContractFactory("DPBAC");
    const dpbac = await DPBAC.attach(contractAddress); // Adjust with your contract's deployed address

    console.log("Policy Details Retrieved...");
    const startTime = Date.now();  // Start timing

    try {
        const policyId = 0; // Example to fetch details for the first policy
        // Directly receive the return value from the view function
        const policyDetails = await dpbac.connect(admin).policyDetail(policyId);

        const endTime = Date.now();  // End timing
        console.log("Transaction Time:", {
            sec: `${(endTime - startTime) / 1000} seconds`,
          });
    
          console.log("Contract Address:",{
                to:contractAddress,
          });

        console.log("Decoded Input",{
            "policyId":`${policyId}`
        })


        console.log("Decoded Output",{
            "0":`Owner Address: ${policyDetails[0]}`,
            "1":`User Addresses: ${policyDetails[1].map(addr => addr.toString())}`,
            "2":`Conditions: Start Time - ${new Date(policyDetails[2][0] * 1000).toISOString()}, End Time - ${new Date(policyDetails[2][1] * 1000).toISOString()}`,
            "3":`Policy ID: ${policyDetails[3].toString()}`,
            "4":`Location: ${policyDetails[4]}`,
            "5":`Allowed: ${policyDetails[5]}`,
            "6":`Resource Type: ${policyDetails[6]}`
        
        
        })
        // Using the Interface to decode outputs, since we don't need to decode inputs for a direct call
        
        // console.log("Policy Details Retrieved:");
        // console.log(`Owner Address: ${policyDetails[0]}`);
        // console.log(`User Addresses: ${policyDetails[1].map(addr => addr.toString())}`);
        // console.log(`Conditions: Start Time - ${new Date(policyDetails[2][0] * 1000).toISOString()}, End Time - ${new Date(policyDetails[2][1] * 1000).toISOString()}`);
        // console.log(`Policy ID: ${policyDetails[3].toString()}`);
        // console.log(`Location: ${policyDetails[4]}`);
        // console.log(`Allowed: ${policyDetails[5]}`);
        // console.log(`Resource Type: ${policyDetails[6]}`);

    } catch (error) {
        console.error("Error while fetching the policy details:", error);
    }
}

main().catch((error) => {
    console.error("Error in main execution:", error);
    process.exitCode = 1;
});


