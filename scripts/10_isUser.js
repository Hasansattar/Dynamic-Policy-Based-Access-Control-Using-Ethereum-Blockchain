const { ethers } = require("hardhat");
const { contractAddress } = require("./contractAddress");

async function main() {
  const [admin, user1, user2, user3, user4] = await ethers.getSigners(); // Assuming admin can check user validity
  const DPBAC = await ethers.getContractFactory("DPBAC");
  const dpbac = await DPBAC.attach(contractAddress); // Use the actual deployed address

  //const userAddress = "0x7c7861eCe699544F386e70A5a2df2262E5BD9995"; // User address to check for validity

  const user = user4.address;

  console.log("Checking if the user is valid...");
  const startTime = Date.now(); // Start timing
  const isValid = await dpbac.isUser(user); // Directly get the boolean result from the view function
  const endTime = Date.now(); // End timing
  if (isValid) {
    console.log("User Address:", {
      from: user,
    });
    console.log("Contract Address:", {
      to: contractAddress,
    });
    // Calculate the transaction time in seconds
    console.log("Transaction time:", {
      sec: `${(endTime - startTime) / 1000} seconds`,
    });
    console.log(`Decoded Input:`, {
      address: user,
    });

    console.log("Decoded Output:", {
      0: `bool: ${isValid}`,
    });

    console.log("User is valid:", {
      bool: isValid,
    });
  } else {
    console.log("User Address:", {
      from: user,
    });
    console.log("User is not valid:", {
      bool: isValid,
    });
  }

  // Additional operations based on validity check can go here.
  // No need for receipt and waiting as it's a view function.
}

main().catch((error) => {
  console.error("Error:", error);
  process.exitCode = 1;
});
