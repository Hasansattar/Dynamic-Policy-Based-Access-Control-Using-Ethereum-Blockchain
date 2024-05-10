const { ethers } = require("hardhat");
const DPBCabi = require("../artifacts/contracts/DPBAC.sol/DPBAC.json");
const { contractAddress } = require("./contractAddress");

async function main() {
    const [admin, user1, user2, user3, user4,user5,user6,user7,user8] = await ethers.getSigners();
    const DPBAC = await ethers.getContractFactory("DPBAC");
    const dpbac = await DPBAC.attach(contractAddress); // Use the correct deployed address

    console.log("Fetching resource...");
    const startTime = new Date(); // Start timing

    // Fetching the resource using getResource which is assumed to be a view function
    const resourceId = 1;  // Resource ID
    const resourceUrl = await dpbac.connect(user2).getResource(resourceId);

    const endTime = new Date(); // End timing
    // console.log("Resource URL fetched:", resourceUrl);
   // Time in seconds
  console.log("Transaction time:", {
    sec: `${(endTime - startTime) / 1000} seconds`,
  });

  
  console.log("Contract Address:", {
    to: contractAddress,
  });
  console.log("User Address:", {
    from: user3.address,
  });

    // Assuming you have the ABI for your DPBAC contract
    const iface = new ethers.utils.Interface(DPBCabi.abi);

    // Decoding the input data to understand what was sent to the blockchain
    // This is normally not necessary for view functions as we know what we passed
    const encodedData = iface.encodeFunctionData("getResource", [resourceId]);
    const decodedInput = iface.decodeFunctionData("getResource", encodedData);
    console.log("Decoded Input:", {
        ResourceId: decodedInput[0].toString()
    });

    // Since the output from a view function is directly returned and handled by ethers,
    // we do not need to decode it unless it's part of a transaction's logs
    console.log("Decoded Output:", resourceUrl); // Display the fetched URL directly
}

main().catch((error) => {
    console.error("Error:", error);
    process.exitCode = 1;
});




// const { ethers } = require("hardhat");

// const DPBCabi = require("../artifacts/contracts/DPBAC.sol/DPBAC.json");
// async function main() {
//     const [admin, user1, user2, user3, user4,user5,user6,user7,user8] = await ethers.getSigners();
//     const DPBAC = await ethers.getContractFactory("DPBAC");
//     const dpbac = await DPBAC.attach('0xd75AB0b99BF200Aebaeb3CFc2c1e8bBECe81C619');

//     console.log("Starting transaction...");
//     const startTime = new Date(); // Start timing

//     // Assuming getResource is a function that requires a uint64 and returns a string
//     const resourceId = 1;  // Example resource ID
//     const txResponse = await dpbac.connect(user1).getResource(resourceId);
//      console.log("txResponse", txResponse);
    
//     const receipt = await txResponse.wait();  // Wait for the transaction to be mined if it changes state
//     console.log("receipt", receipt);
//     const endTime = new Date(); // End timing
//     console.log("Transaction confirmed in block:", receipt.blockNumber);
//     console.log(`Transaction time: ${(endTime - startTime) / 1000} seconds`);
//     console.log("Transaction submitted. Hash:", receipt.transactionHash);
//     console.log("Contract Address:", receipt.to);
//     console.log("User Address:", receipt.from);
//     console.log("Transaction gas cost used (in wei):", ethers.utils.formatUnits(receipt.gasUsed, "wei"));
//     console.log("Transaction status (1=success, 0=fail):", receipt.status === 1 ? 'Success' : 'Fail');



//      // Assuming you have the ABI for your DPBAC contract
//      const {abi} = DPBCabi;
//      const iface = new ethers.utils.Interface(abi);
//     // Decoding the input and output
//     const decodedInput = iface.decodeFunctionData("getResource", txResponse.data);
//     console.log("Decoded Input:", {
//       ResourceId: decodedInput[0].toString()
//       });


      

//       // Correctly decoding the output using the function name and data
//     const decodedOutput = iface.decodeFunctionResult("getResource", ethers.utils.defaultAbiCoder.encode(["string"], [txResponse]));
//     console.log("Decoded Output:", decodedOutput);
//       //encodeFunctionData
//       // const encodeFunctionData = iface.encodeFunctionData("getResource",[resourceId]);
//       // console.log("Decoded Output:", encodeFunctionData);


//     // const decodedResultOutput = iface.decodeFunctionResult("getResource", txResponse.data);
//     // console.log("Decoded Output:", decodedResultOutput);

//     // Logs and events handling
//     if (receipt.events) {
//         receipt.events.forEach(event => {
//             console.log(`Event "${event.event}" with arguments:`, event.args);
//         });
//     }
// }

// main().catch((error) => {
//     console.error("Error:", error);
//     process.exitCode = 1;
// });
