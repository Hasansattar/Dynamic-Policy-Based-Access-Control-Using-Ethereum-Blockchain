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
  const dpbac = await DPBAC.attach(contractAddress); // Adjust the deployed address

  console.log("Starting transaction...");
  const startTime = new Date(); // Start timing

  // Remove a user
  const tx = await dpbac.connect(admin).removeUser(user3.address);
  // Transaction submitted. Hash

  console.log("Transaction hash:", {
    hash: tx.hash,
  }); // Transaction submitted. Hash

  console.log("Block hash:", {
    hash: tx.blockHash,
  }); // Block submitted. Hash

  const receipt = await tx.wait(); // Wait for the transaction to be mined
  const endTime = new Date(); // End timing

  console.log("Transaction confirmed in block:", {
    blockNumber: `${receipt.blockNumber}`,
  });
  console.log("Transaction time:", {
    sec: `${(endTime - startTime) / 1000} seconds`,
  });
  console.log("Contract Address:", {
    to: `${receipt.to}`,
  });
  console.log("Admin Address:", {
    from: `${receipt.from}`,
  });

  // Detailed receipt information
  console.log("Transaction gas cost used (in wei):", {
    gas: `${ethers.utils.formatUnits(receipt.gasUsed, "wei")}`,
  });
  console.log("Transaction status (1=success, 0=fail):", {
    status: `${receipt.status}`,
  });

  // Assuming you have the ABI for your DPBAC contract
  const { abi } = DPBCabi;
  const iface = new ethers.utils.Interface(abi);
  const decodedInput = iface.decodeFunctionData("removeUser", tx.data);
  console.log("Decoded Input:", {
    address: `userAddress: ${decodedInput}`,
  });

  if (receipt.events) {
    receipt.events.forEach((event) => {
      console.log(`Event "${event.event}" with arguments:`, event.args);
    });
  }
}

main().catch((error) => {
  console.error("Error:", error);
  process.exitCode = 1;
});
