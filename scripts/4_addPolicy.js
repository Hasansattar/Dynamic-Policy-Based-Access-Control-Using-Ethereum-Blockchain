const { ethers } = require("hardhat");
const DPBCabi = require("../artifacts/contracts/DPBAC.sol/DPBAC.json");
const { contractAddress } = require("./contractAddress");

async function main() {
  const [admin, user1, user2, user3, user4, user5, user6, user7, user8] =
    await ethers.getSigners();
  const DPBAC = await ethers.getContractFactory("DPBAC");
  const dpbac = await DPBAC.attach(contractAddress); // Use the deployed address

  // console.log(`User address: ${user1.address}`);

  console.log("Starting transaction...");
  const startTime = new Date(); // Start timing

  // Register a new user
  const tx = await dpbac
    .connect(admin)
    .addPolicy([user1.address,user2.address,user3.address], 1714919600, 1715074400, "New York", true, 1);

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
  // Time in seconds
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
  const decodedInput = iface.decodeFunctionData("addPolicy", tx.data);
  console.log("Decoded Input:", {
    _userAddresses: decodedInput[0],
    _startTime: new Date(decodedInput[1] * 1000).toISOString(), // Convert UNIX timestamp to ISO date
    _endTime: new Date(decodedInput[2] * 1000).toISOString(), // Convert UNIX timestamp to ISO date
    _location: decodedInput[3],
    _allowed: decodedInput[4],
    _resourceType: decodedInput[5],
  });

  if (receipt.events) {
    receipt.events.forEach((event) => {
      console.log(`Event "${event.event}" with arguments:`, {
        0: event.args[0].toString(),
        policyIndex: event.args["policyIndex"].toString(),
      });
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

