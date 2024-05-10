const { ethers } = require("hardhat");
const { contractAddress } = require("./contractAddress");

async function main() {
  const [admin, user1] = await ethers.getSigners();
  const DPBAC = await ethers.getContractFactory("DPBAC");
  const dpbac = await DPBAC.attach(contractAddress); // Adjust with your contract's deployed address

  console.log("Fetching resource list...");
  const startTime = Date.now(); // Start timing

  try {
    // Assuming resourceList is a function returning the hash of the resource at a given index
    const resourceIndex = 0; // Example index
    const resourceHash = await dpbac.connect(user1).resourceIndex(resourceIndex);
    //console.log(`Address form: ${user1.address}`)
    console.log("Contract Address:", {
      to: `${dpbac.address}`,
    });
    console.log("Decoded Input", {
      uint256: `${resourceIndex}`,
    });

    console.log("Decoded Output", {
      0: `btyes32: ${resourceHash}`,
    });

    //console.log(`Resource at index ${resourceIndex}:`, resourceHash);

    const endTime = Date.now(); // End timing
    console.log(`Transaction time: ${(endTime - startTime) / 1000} seconds`);
  } catch (error) {
    console.error("Error while fetching the resource:", error);
  }
}

main().catch((error) => {
  console.error("Error in main execution:", error);
  process.exitCode = 1;
});
