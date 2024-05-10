// const { expect } = require('chai'); //  1-  chai is the library for testing in javascript
// const { ethers } = require('hardhat');  //4-


// describe('Token contract',()=>{        //1-
//      let Token,token,owner,addr1,addr2;   //2- these are custom variable that we use in testing file

//      beforeEach(async()=>{  //  3-  it will run before each test
//        Token=await ethers.getContractFactory('Token'); // 4- it allow to deploy the token smart contract
//        token=await Token.deploy();      // 5- after getcontractfactory we deploy our token  
//        [owner,addr1,addr2,_]= await ethers.getSigners();  //6- asign our address varibale to getsigners plugin
//     });
//        describe('Deployment',()=>{    //7 first group of test

//         it('Should set the right owner',async()=>{    //8- set the right owner
//             expect(await token.owner()).to.equal(owner.address);
//         });

//         it('should assign the total supply of tokens to the owner',async()=>{
//           const ownerBalance=await token.balanceOf(owner.address);    //9- check totalsupply is euqaul or not
//           expect(await token.totalSupply()).to.equal(ownerBalance);
//         });
       
//        });   

//        describe('Transactions',()=>{  //10- second group of testing for using describe
//            it('should transfer tokens between accounts',async()=>{
//             await token.transfer(addr1.address,50);                 //11-tranfer 50 token to addres1
//             const addr1Balance=await token.balanceOf(addr1.address);
//             expect(addr1Balance).to.equal(50);

//             await token.connect(addr1).transfer(addr2.address,50);  //12-send 50 token addres1 t0 addres 2
//             const addr2Balance=await token.balanceOf(addr2.address);
//             expect(addr2Balance).to.equal(50);
//            });

//            it('Should fail if sender doesnot have enough tokens', async()=>{  //13-
         
//             const initialOwnerBalance=await token.balanceOf(owner.address);
//             await expect(token.connect(addr1).transfer(owner.address,1)).to.be.revertedWith('Not enough tokens');
//             expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance);
//            });

//         it('should update balances after transfers',async()=>{   //14
//             const initialOwnerBalance=await token.balanceOf(owner.address);
//               await token.transfer(addr1.address,100);
//               await token.transfer(addr2.address,50);
//               const finalOwnerBalance=await token.balanceOf(owner.address);
//               expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150);

//               const addr1Balance= await token.balanceOf(addr1.address);
//               expect(addr1Balance).to.equal(100);

//               const addr2Balance=await token.balanceOf(addr2.address);
//               expect(addr2Balance).to.equal(50);

//         });


//        });
    

// });

 