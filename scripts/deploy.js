
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  //1.
  // const MediToken = await ethers.getContractFactory("MediToken");
  // const mediToken = await MediToken.deploy();
  // await mediToken.deployed();
  // console.log("Meditoken is deployed to", mediToken.address);

  //2.
  // const PureToken = await ethers.getContractFactory("PureToken");
  // const pureToken = await PureToken.deploy();
  // await pureToken.deployed();
  // console.log("pureToken is deployed to", pureToken.address);

  // //3.
  const SingleSwapToken = await ethers.getContractFactory("SingleSwapToken");
  const singleSwapToken = await SingleSwapToken.deploy();
  await singleSwapToken.deployed();
  console.log("singleSwapToken is deployed to", singleSwapToken.address);

//4.
  // const SwapMultiHop = await ethers.getContractFactory("SwapMultiHop");
  // const swapMultiHop = await SwapMultiHop.deploy();
  // await swapMultiHop.deployed();
  // console.log("swapMultiHop is deployed to", swapMultiHop.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
