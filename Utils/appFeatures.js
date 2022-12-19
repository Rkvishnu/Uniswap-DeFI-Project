import { ethers } from "ethers";
import Web3Modal from "web3modal";

import {
  MediTokenAddress,
  mediTokenABI,
  PureTokenAddress,
  pureTokenABI,
  SingleSwapTokenAddress,
  singleSwapTokenABI,
  SwapMultiHopAddress,
  SwapMultiHopABI,
  IWETHAddress,
  IWETHABI,
} from "../Context/constants";

//CHECK IF WALLET IS CONNECT
export const checkIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install MetaMask");
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

//CONNECT WALLET
export const connectWallet = async () => {
  try {
    if (!window.ethereum) return console.log("Install MetaMask");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

//FETCHING CONTRACT------------------------

//MediTOKEN FETCHING
export const fetchMediContract = (signerOrProvider) =>
  new ethers.Contract(MediTokenAddress, mediTokenABI, signerOrProvider);

//CONNECTING With Medi TOKEN CONTRACT
export const connectingWithMediToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchMediContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

//FETCHING CONTRACT------------------------

//Pure TOKEN FETCHING
export const fetchPureContract = (signerOrProvider) =>
  new ethers.Contract(PureTokenAddress, pureTokenABI, signerOrProvider);

//CONNECTING With Pure TOKEN CONTRACT
export const connectingWithPureToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchPureContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

//FETCHING CONTRACT------------------------

//SingleSwapToken TOKEN FETCHING
export const fetchSingleSwapContract = (signerOrProvider) =>
  new ethers.Contract(
    SingleSwapTokenAddress,
    singleSwapTokenABI,
    signerOrProvider
  );

//CONNECTING With SingleSwapToken TOKEN CONTRACT
export const connectingWithSingleSwapToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchSingleSwapContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

//FETCHING CONTRACT------------------------

//IWTH TOKEN FETCHING
export const fetchIWETHContract = (signerOrProvider) =>
  new ethers.Contract(IWETHAddress, IWETHABI, signerOrProvider);

//CONNECTING With SingleSwapToken TOKEN CONTRACT
export const connectingWithIWTHToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchIWETHContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

//FETCHING CONTRACT------------------------

//DAI TOKEN FETCHING
const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
export const fetchDAIContract = (signerOrProvider) =>
  new ethers.Contract(DAIAddress, IWETHABI, signerOrProvider);

//CONNECTING With DAIToken TOKEN CONTRACT
export const connectingWithDAIToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchDAIContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};
