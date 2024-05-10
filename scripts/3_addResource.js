const { ethers } = require("hardhat");
const DPBCabi = require("../artifacts/contracts/DPBAC.sol/DPBAC.json");
const { contractAddress } = require("./contractAddress");

async function main() {
  const [
    admin,
    user,
    user1,
    user2,
    user3,
    user4,
    user5,
    user6,
    user7,
    user8,
    user9,
    user10,
  ] = await ethers.getSigners();
  const DPBAC = await ethers.getContractFactory("DPBAC");
  const dpbac = await DPBAC.attach(contractAddress); // Use the deployed address

  console.log("Starting transaction...");
  const startTime = new Date(); // Start timing

  // Register a new user
  const tx = await dpbac
    .connect(admin)
    .addResource("https://www.videos.com/", 1, "New York");
  console.log("Transaction hash:", {
    hash: tx.hash,
  }); // Transaction submitted. Hash

  console.log("Block hash:", {
    hash: tx.blockHash,
  }); // Block submitted. Hash

  const receipt = await tx.wait(); // Wait for the transaction to be mined
  // console.log("receipt",receipt);
  const endTime = new Date(); // End timing

  console.log("Transaction confirmed in block:", {
    blockNumber: receipt.blockNumber,
  });

  console.log("Transaction time:", {
    sec: `${(endTime - startTime) / 1000} seconds`,
  });
  console.log("Contract Address:", {
    to: receipt.to,
  });
  console.log("Owner Address:", {
    from: receipt.from,
  });
  // Detailed receipt information
  console.log("Transaction gas cost used (in wei):", {
    gas: ethers.utils.formatUnits(receipt.gasUsed, "wei"),
  });
  // console.log("Cumulative gas used:", ethers.utils.formatUnits(receipt.cumulativeGasUsed, "wei"));
  console.log("Transaction status (1=success, 0=fail):", {
    status: receipt.status,
  });

  // Assuming you have the ABI for your DPBAC contract
  const { abi } = DPBCabi;

  // Decoding the input data using the ABI
  const iface = new ethers.utils.Interface(abi);
  //console.log("iface",iface);
  const decodedInput = iface.decodeFunctionData("addResource", tx.data);
  console.log("Decoded Input:", {
    _newBaseURI: decodedInput[0],
    resourceType: decodedInput[1],
    location: decodedInput[2],
  });

  if (receipt.events) {
    receipt.events.forEach((event) => {
      console.log(`Event "${event.event}" with arguments:`, {
        0: event.args[0],
        1: event.args[1],
        2: event.args[2].toString(),
        3: event.args[3],
        link: event.args["link"],
        res: event.args["res"],
        res_id: event.args["res_id"].toString(),
        location: event.args["location"],
      });
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
