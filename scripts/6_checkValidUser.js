const { ethers } = require("hardhat");
const DPBCabi = require("../artifacts/contracts/DPBAC.sol/DPBAC.json");
const { contractAddress } = require("./contractAddress");

async function main() {
  const [admin, user1, user2, user3, user4, user5, user6, user7, user8] =
    await ethers.getSigners();
  const DPBAC = await ethers.getContractFactory("DPBAC");
  const dpbac = await DPBAC.attach(contractAddress); // Use the correct deployed address

  console.log("Starting transaction...");
  const startTime = new Date(); // Start timing

  console.log("Checking if the user is valid...");
  const isValid = await dpbac.connect(user1).checkValidUser();
  console.log("Contract Address:", {
    to: contractAddress,
  });
  console.log("User Address:", {
    from: user1.address,
  });


  console.log("Decoded Output:", {
    "0": `bool ${isValid}`,
  });
  console.log("Is the user valid?:", {
    bool: isValid,
  });

  const endTime = new Date(); // End timing

  // Time in seconds
  console.log("Transaction time:", {
    sec: `${(endTime - startTime) / 1000} seconds`,
  });

  // If you need to do something based on the validation result
  if (isValid) {
    console.log("The user is valid.");
  } else {
    console.log("The user is not valid.");
  }
}

main().catch((error) => {
  console.error("Error:", error);
  process.exitCode = 1;
});
