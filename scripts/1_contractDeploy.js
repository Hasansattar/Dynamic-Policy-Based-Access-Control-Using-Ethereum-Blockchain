// ----------------

const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", {
    account: `string: address  ${deployer.address}`,
  });

  const balance = await deployer.getBalance();
  console.log("Account balance Sepolia:", {
    ether: ` ${ethers.utils.formatEther(balance)} ETH`,
  });

  const ContractFactory = await ethers.getContractFactory("DPBAC");

  console.log("Starting Contract deployment...");
  const startTime = new Date(); // Start timing

  // Here, we make sure to use a properly declared variable for the contract instance
  const deployedContract = await ContractFactory.deploy(); // Deploy the contract
  const receipt = await deployedContract.deployed(); // Wait for the contract to be mined

  //console.log("receipt",receipt);
  //console.log("receipt",receipt.address);

  const endTime = new Date(); // End timing
  console.log("Contract address:", {
    contract: `string: address ${receipt.address}`,
  });

  const deployTime = (endTime - startTime) / 1000; // Time in seconds
  console.log("Transaction time:", {
    sec: `${(endTime - startTime) / 1000} seconds`,
  });

  // Using the correct reference to the deployed contract instance
  console.log("Transaction hash:", {
    hash: `${receipt.deployTransaction.hash}`,
  });

  console.log("Block hash:", {
    hash: tx.blockHash,
  }); // Block submitted. Hash

  //Additional information about the transaction can be logged if needed
  const transactionDetails = await ethers.provider.getTransaction(
    receipt.deployTransaction.hash
  );
  console.log("Transaction confirmed in block:", {
    blockNumber: `${transactionDetails.blockNumber}`,
  });

  console.log("Chain ID:", {
    chainId: `${transactionDetails.chainId}`,
  });
  console.log("Contract Owner:", {
    from: `${transactionDetails.from}`,
  });
  console.log("Nonce:", {
    nonce: `${transactionDetails.nonce}`,
  });
  console.log("Transaction status (1=success, 0=fail):", {
    confirmations: `${transactionDetails.confirmations}`,
  });
  console.log("Transaction gas cost used (in wei):", {
    gas: ethers.utils.formatUnits(transactionDetails.gasLimit, "wei"),
  });
  console.log("Transaction gas cost (in ether):", {
    gas: `${ethers.utils.formatEther(
      transactionDetails.gasPrice.mul(transactionDetails.gasLimit)
    )}`,
  });


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

