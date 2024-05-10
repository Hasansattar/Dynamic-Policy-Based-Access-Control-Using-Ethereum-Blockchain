const { ethers } = require("hardhat");
const { contractAddress } = require("./contractAddress");

async function main() {
  const [admin, user1, user2,user3,user4] = await ethers.getSigners();
  const DPBAC = await ethers.getContractFactory("DPBAC");
  const dpbac = await DPBAC.attach(contractAddress); // Replace with actual deployed address

  console.log("Granting permission...");
  const resourceHash =
    "0x239370cd991f7c4efe7e486c52491abc172bef4e433482624167b587b86d08f6"; // Sample resource hash, replace with actual
  const startTime = Date.now();

  console.log("Checking if user is valid...");
  const isValid = await dpbac.connect(user1).checkValidUser(); // Assume isValidUser is a callable function that returns a boolean
  // Call the grantPermission function

  if (isValid) {
    const transactionResponse = await dpbac
      .connect(user1)
      .grantPermission(resourceHash);
    // const receipt = await transactionResponse.wait(); // Wait for the transaction to be mined
    console.log("User Address:", {
      from: user1.address,
    });
    console.log("Is user is Valide?:", isValid);
    console.log("Decoded Input", {
      resourceHash: `bytes32: ${resourceHash}`,
    });

    console.log("Decoded Output", {
      0: `string: ${transactionResponse}`,
    });

    console.log("Permission Granted:", transactionResponse);
  } else {
    console.log(`User ${userAddress} is not valid. Permission not granted.`);
  }

  const endTime = Date.now(); // End timing after transaction completion

  // Calculate the transaction time in seconds
  console.log("Transaction time:", {
    sec: `${(endTime - startTime) / 1000} seconds`,
  });
}

main().catch((error) => {
  console.error("Error:", error);
  process.exitCode = 1;
});
