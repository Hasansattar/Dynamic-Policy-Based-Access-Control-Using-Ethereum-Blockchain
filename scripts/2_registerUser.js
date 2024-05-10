const { ethers } = require("hardhat");
const DPBCabi = require("../artifacts/contracts/DPBAC.sol/DPBAC.json");
const { contractAddress } = require("./contractAddress");

async function main() {
  const [
    admin,
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

  // console.log(`User address: ${user1.address}`);

  console.log("Starting transaction...");
  const startTime = new Date(); // Start timing

  // Register a new user
  const tx = await dpbac.connect(user3).registerUser("hasan", "faisalabad", 2);
 // console.log("txtxtx",tx);
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
  console.log("User Address:", {
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
  const decodedInput = iface.decodeFunctionData("registerUser", tx.data);
  console.log("Decoded Input:", {
    name: decodedInput[0],
    location: decodedInput[1],
    role: decodedInput[2],
  });

  // Correctly decoding the output using the function name and data
  //  const decodedOutput = iface.decodeFunctionResult("getResource", ethers.utils.defaultAbiCoder.encode(["string"], [tx.data]));
  //  console.log("Decoded Output:", decodedOutput);

  if (receipt.events) {
    receipt.events.forEach((event) => {
      console.log(`Event ${event.event} with arguments:`, {
        0: event.args[0],
        1: event.args[1],
        2: event.args[2],
        addr: event.args["addr"],
        name: event.args["name"],
        role: event.args["role"],
      });
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
