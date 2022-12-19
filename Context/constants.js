import pureToken from "../artifacts/contracts/PureToken.sol/PureToken.json"
import mediToken from "../artifacts/contracts/MediToken.sol/MediToken.json";
import singleSwapToken from "../artifacts/contracts/SingleSwapToken.sol/SingleSwapToken.json"
import swapMultiHop from "../artifacts/contracts/SwapMultiHop.sol/SwapMultiHop.json"
import iweth from "../artifacts/contracts/interfaces/IWETH.sol/IWETH.json"

export const pureTokenAddress= "0x2538a10b7fFb1B78c890c870FC152b10be121f04"
export const PureTokenABI=pureToken.abi;

export const mediTokenAddress= "0x707531c9999AaeF9232C8FEfBA31FBa4cB78d84a"
export const MediTokenABI = mediToken.abi;

export const singleSwapTokenAddress= "0x24432a08869578aAf4d1eadA12e1e78f171b1a2b"
export const SingleSwapTokenABI= singleSwapToken.abi;

export const swapMultiHopAddress="0xdB05A386810c809aD5a77422eb189D36c7f24402"
export const SwapMultiHopABI = swapMultiHop.abi;

export const IWETHAddress= "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
export const IWETHABI= iweth.abi;
