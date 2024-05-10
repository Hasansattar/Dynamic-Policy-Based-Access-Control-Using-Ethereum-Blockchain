const { ethers } = require("hardhat");
const { contractAddress } = require("./contractAddress");

async function main() {
  const [admin, user1, user2, user3, user4,user5,user6,user7,user8,user9,user10] = await ethers.getSigners();
      const DPBAC = await ethers.getContractFactory("DPBAC");
      const dpbac = await DPBAC.attach(contractAddress); // Use the actual deployed address
  

    console.log("Fetching policy list...");
    const startTime = Date.now();  // Start timing

    // Call the listOfPolicy function which is assumed to be a view function
    const policies = await dpbac.connect(user1).listOfPolicy();
    const endTime = Date.now();  // End timing
    // Calculate the transaction time in seconds
    console.log("Transaction time:", {
        sec: `${(endTime - startTime) / 1000} seconds`,
      });

    // console.log("Policies Retrieved:", policies);
    console.log("Policies Retrieved:");
    //"2":`Start Time - ${new Date(policy["condition"]["startTime"] * 1000).toISOString()}, End Time - ${new Date(policy["condition"]["endTime"] * 1000).toISOString()}`,
    
    // If decoding of the policies is needed and they are returned directly
    // Assuming policies is an array or a complex object directly returned
    if (Array.isArray(policies)) {
        policies.forEach((policy, index) => {
            console.log(`Policy ${index}:`, {
             "owner" :policy["owner"], 
             "userAddress" :policy["userAddress"]["userA"],
            // "conditionStartTime" :policy["condition"]["startTime"].toString(),
             //"conditionEndTime" :policy["condition"]["endTime"].toString(),
             "condition" :`Start Time - ${new Date(policy[2][0] * 1000).toISOString()}, End Time - ${new Date(policy[2][1] * 1000).toISOString()}`,
             //"condition" :`Start Time - ${new Date(policy["condition"]["startTime"] * 1000).toISOString()}, End Time - ${new Date(policy["condition"]["endTime"] * 1000).toISOString()}`,
             "policyID" :policy["policyID"].toString(),
             "location":policy["location"],
             "allowed":policy["allowed"],
             "resourceType":policy["resourceType"],
            
            
            });
            // Further decoding or processing can go here if the policy structure is complex
        });
    } else {
        console.log("Decoded Output:", policies);
    }
}

main().catch((error) => {
    console.error("Error:", error);
    process.exitCode = 1;
});


