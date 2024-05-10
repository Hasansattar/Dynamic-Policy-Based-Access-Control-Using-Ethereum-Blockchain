/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require("@nomiclabs/hardhat-waffle");
 require('@nomiclabs/hardhat-ethers');
 require("@nomiclabs/hardhat-etherscan");
 
const INFURA_URL='https://rinkeby.infura.io/v3/d7e5d20ab0ee444ab604d0ef24a23a59';
const PRIVATE_KEY='b45704f1b10a273c51a0380c5ac1055ef507b357f00cb212f252b9e1d7c3c40b';
 module.exports = {
  solidity: "0.8.0",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
      details: { yul: false },
    },
  },

  networks:{
    hardhat: {
      // chainId: 1337
    },
    ganache: {
      url: "HTTP://127.0.0.1:7545", // Default URL
      chainId: 1337,
      accounts: {
          mnemonic: "perfect idea process large tooth drop century globe cake breeze good payment"
      }
  },
    rinkeby:{
      url:INFURA_URL,
      accounts:[`0x${PRIVATE_KEY}`]
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/5c50926c0b8e476faff993be5c8e39c2", // Replace with your Infura project ID
      chainId: 11155111,
      // accounts: ["0x5f9a140e4976aaf91943854e8d6bf1f7c01869c4c8c87cd14f041355889ec4b3"] // Your wallet private key
      accounts: {
        mnemonic: "window shadow roast shed office number gate tell party guitar know below"  
    }
  }
  },
  //ehtereum API key
  // etherscan: {
  //   apiKey: "ZT7NMAJNR62F53F28IYHFABAFV1WST8U77",
  // }
};
