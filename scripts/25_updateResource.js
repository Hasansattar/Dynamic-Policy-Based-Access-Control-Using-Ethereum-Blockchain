const { ethers } = require("hardhat");
const DPBCabi = require("../artifacts/contracts/DPBAC.sol/DPBAC.json");
const { contractAddress } = require("./contractAddress");

async function main() {
  const [admin] = await ethers.getSigners();
  const DPBAC = await ethers.getContractFactory("DPBAC");
  const dpbac = await DPBAC.attach(contractAddress); // Use the deployed address

  console.log("Starting transaction to update resource...");
  const startTime = new Date(); // Start timing

  // Assuming updateResource is a function in your smart contract
  // Example: updateResource(bytes32 resourceHash, string newBaseURI, uint8 newResourceType, string location)
  const resourceHash = '0x4090dd2a4191f05a2670362f31eb89335e838d8e7ac5d7298cc9fbc78babe760'; // example hash
  const newBaseURI = "videospLink";
  const newResourceType = 0;
  const location = "fsd";

  // Call the updateResource function
  const tx = await dpbac.connect(admin).updateResource(resourceHash, newBaseURI, newResourceType, location);

 

  console.log("Transaction hash:", {
    hash: `${tx.hash}`,
  });

  console.log("Block hash:", {
    hash: tx.blockHash,
  }); // Block submitted. Hash


  const receipt = await tx.wait(); // Wait for the transaction to be mined
  const endTime = new Date(); // End timing

  console.log("Contract Address:", {
    to: `${receipt.to}`,
  });
  console.log("Resource Admin Address:", {
    from: `${receipt.from}`,
  });

  console.log("Transaction confirmed in block:", {
    blockNumber: `${receipt.blockNumber}`,
  });
  console.log("Transaction time:", {
    sec: `${(endTime - startTime) / 1000} seconds`,
  });
  console.log("Transaction gas cost used (in wei):", {
    gas: `${ethers.utils.formatUnits(receipt.gasUsed, "wei")}`,
  });
  console.log("Transaction status (1=success, 0=fail):", {
    status: `${receipt.status}`,
  });

  // Log the decoded input
  const iface = new ethers.utils.Interface(DPBCabi.abi);
  const decodedInput = iface.decodeFunctionData("updateResource", tx.data);
  console.log("Decoded Input:", {
    "resourceHash":`bytes32: ${decodedInput[0]}`,
    "_newBaseURI":`string: ${decodedInput[1]}`,
    "newResourceType":`uint8: ${decodedInput[2]}`,
    "location":`string: ${decodedInput[3]}`,
  }
  
  
  
  );

  if (receipt.events) {
    receipt.events.forEach(event => {
      console.log(`Event ${event.event} with arguments:`,
      {
        "0":`${event.args[0]}`,
        "1":`${event.args[1]}`,
        "2":`${event.args[2]}`,
        "link":`${event.args["link"]}`,
        "res":`${event.args["res"]}`,
        "location":`${event.args["location"]}`,
      }
      
      
      );
    });
  }
}

main().catch((error) => {
  console.error("Error:", error);
  process.exitCode = 1;
});
