const { ethers } = require("hardhat");
const DPBCabi = require("../artifacts/contracts/DPBAC.sol/DPBAC.json");
const { contractAddress } = require("./contractAddress");

async function main() {
  const [admin,user1,user2,user3] = await ethers.getSigners();
  const DPBAC = await ethers.getContractFactory("DPBAC");
  const dpbac = await DPBAC.attach(contractAddress);

  // Assume updatePolicy takes an array of addresses, several uint256 values, a string, a boolean, and a uint8 as inputs
  console.log("Starting transaction to update a policy...");
  const startTime = new Date();

  const userAddresses = [user1.address];
  const policyIndex = 0;
  const startTimeEpoch = 1715102699;
  const endTimeEpoch = 1715275499;
  const location = "Canada";
  const isAllowed = true;
  const resourceType = 0;

  // Creating a transaction
  const tx = await dpbac.connect(admin).updatePolicy(
    userAddresses, 
    policyIndex, 
    startTimeEpoch, 
    endTimeEpoch, 
    location, 
    isAllowed, 
    resourceType
  );

  const receipt = await tx.wait(); // Wait for the transaction to be mined
  const endTime = new Date();

  console.log("Transaction confirmed in block:", {
    blockNumber: `${receipt.blockNumber}`,
  });
  console.log("Transaction time:", {
    sec: `${(endTime - startTime) / 1000} seconds`,
  });
  
  console.log("Contract Address:", {
    to: `${receipt.to}`,
  });
  console.log("Policy Admin Address:", {
    from: `${receipt.from}`,
  });
  
  console.log("Transaction hash:", {
    hash: `${tx.hash}`,
  });

  console.log("Block hash:", {
    hash: tx.blockHash,
  }); // Block submitted. Hash

  

  console.log("Transaction gas cost used (in wei):", {
    gas: `${ethers.utils.formatUnits(receipt.gasUsed, "wei")}`,
  });
  console.log("Transaction status (1=success, 0=fail):", {
    status: `${receipt.status}`,
  });

  // Decoding input to human-readable format
  const iface = new ethers.utils.Interface(DPBCabi.abi);
  const decodedInput = iface.decodeFunctionData("updatePolicy", tx.data);

  console.log("Decoded Input:", {
    userAddresses: `address[]: ${decodedInput[0]}`,
    policyIndex: `uint256: ${decodedInput[1].toString()}`,
    startTime:`uint256: ${decodedInput[2].toString()}`,
    endTime: `uint256: ${decodedInput[3].toString()}`,
    location: `string: ${decodedInput[4]}`,
    allowed: `bool: ${decodedInput[5]}`,
    resourceType: `uint8: ${decodedInput[6]}`
  });

  // Handling event logs
  if (receipt.events) {
    receipt.events.forEach(event => {
      console.log(`Event "${event.event}" with arguments:`,{
        "0":`${event.args[0]}`,
        "policyIndex":`${event.args["policyIndex"]}`
         
      }
      
      
      );
    });
  }
}

main().catch((error) => {
  console.error("Error:", error);
  process.exitCode = 1;
});
