const { ethers } = require("hardhat");
const DPBCabi = require("../artifacts/contracts/DPBAC.sol/DPBAC.json");
const { contractAddress } = require("./contractAddress");

async function main() {
  const [admin, user1, user2, user3] = await ethers.getSigners();
  const DPBAC = await ethers.getContractFactory("DPBAC");
  const dpbac = await DPBAC.attach(contractAddress); // Adjust with your contract's deployed address

  console.log("Starting the transaction...");
  const startTime = Date.now(); // Start timing

  try {
    const newName = "hasansattar";
    const newLocation = "fsd";
    const newRole = 1;

    // Sending the transaction
    const txResponse = await dpbac
      .connect(user1)
      .updateExistingUser(newName, newLocation, newRole);

    console.log("Transaction hash:", {
      hash: `${txResponse.hash}`,
    });

    console.log("Block hash:", {
      hash: txResponse.blockHash,
    }); // Block submitted. Hash

    // Waiting for the transaction to be mined
    const receipt = await txResponse.wait();

    console.log("Transaction time:", {
      sec: `${(endTime - startTime) / 1000} seconds`,
    });
    console.log("Transaction confirmed in block:", {
      blockNumber: `${receipt.blockNumber}`,
    });

    const endTime = Date.now(); // End timing
  
    console.log("Contract Address:", {
      to: `${receipt.to}`,
    });
    console.log("User Address:", {
      from: `${receipt.from}`,
    });

      // Detailed receipt information
  console.log("Transaction gas cost used (in wei):", {
    gas: `${ethers.utils.formatUnits(receipt.gasUsed, "wei")}`,
  });
  console.log("Transaction status (1=success, 0=fail):", {
    status: `${receipt.status}`,
  });

    // Output decoded input and output as recorded
    console.log("Decoded input:", {
      newName: newName,
      newLocation: newLocation,
      newRole: newRole,
    });

    // Logging event details
    // if (receipt.events && receipt.events.length > 0) {
    //   const eventArgs = receipt.events[0].args;
    //   console.log("Event UpdateUser details:", {
    //     userAddress: eventArgs.userAddress,
    //     newName: eventArgs.newName,
    //     newLocation: eventArgs.newLocation,
    //     newRole: eventArgs.newRole,
    //   });
    // }

    if (receipt.events) {
      receipt.events.forEach((event) => {
        console.log(`Event "${event.event}" with arguments:`, {
          0: `${event.args[0]}`,
          1: `${event.args[1]}`,
          2: `${event.args[2]}`,
          3: `${event.args[3]}`,
          userAddress: `${event.args["userAddress"]}`,
          newName: `${event.args["newName"]}`,
          newLocation: `${event.args["newLocation"]}`,
          newRole: `${event.args["newRole"]}`,
        });
      });
    }
  } catch (error) {
    console.error("Error in transaction:", error);
  }
}

main().catch((error) => {
  console.error("Error in main execution:", error);
  process.exitCode = 1;
});
