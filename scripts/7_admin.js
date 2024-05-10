const { ethers } = require("hardhat");
const DPBCabi = require("../artifacts/contracts/DPBAC.sol/DPBAC.json");
const { contractAddress } = require("./contractAddress");

async function main() {
  const [admin, user1, user2, user3, user4,user5,user6,user7,user8,user9,user10] = await ethers.getSigners();
    const DPBAC = await ethers.getContractFactory("DPBAC");
    const dpbac = await DPBAC.attach(contractAddress); // Replace with actual deployed address

    console.log("Fetching admin address...");
    const startTime = new Date(); // Start timing
    const adminAddress = await dpbac.connect(admin).admin();
    const endTime = new Date(); // End timing

    // Time in seconds
    console.log("Transaction time:", {
      sec: `${(endTime - startTime) / 1000} seconds`,
    });
    console.log("Admin Address:",{
      "address":adminAddress
    } );
}

main().catch((error) => {
    console.error("Error:", error);
    process.exitCode = 1;
});
