import React, { useState, useEffect, use } from 'react'
import { ethers, BigNumber } from 'ethers';
import Web3Modal from 'web3modal'
import { Token, CurrencyAmount, TradeType, Percent } from "@uniswap/sdk-core"


//internal import
import { getPrice } from "../Utils/fetchingPrice";
import { swapUpdatePrice } from "../Utils/swapUpdatePrice";

import { IWETHABI } from './constants'
import ERC20 from "../artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json"
import {
    checkIfWalletConnected,
    connectWallet,
    connectingWithMediToken,
    connectingWithPureToken,
    connectingWithSingleSwapToken,
    connectingWithIWETHToken,
    connectingWithDAIToken,
} from "../Utils/appFeatures";

export const SwapTokenContext = React.createContext();

export const SwapTokenContextProvider = ({ children }) => {
    const [account, setAccount] = useState("");
    const [ether, setEther] = useState("");
    const [networkConnect, setNetworkConnect] = useState("");
    const [weth9, setWeth9] = useState("");
    const [dai, setDai] = useState("");

    //object 
    //the number of tokens the user havein his wallet
    const [tokenData, setTokenData] = useState([]);

    const addToken = [
        // "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        0xD850942eF8811f2A866692A623011bDE52a462C1,
        0xB8c77482e45F1F44dE1745F52C74426C631bDD52,
        0x6B175474E89094C44Da98b954EedeAC495271d0F,
        0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0,
        0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984,
        0x514910771AF9Ca656af840dff83E8264EcF986CA,
        0xc944E90C64B2c07662A292be6244BDf05Cda44a7,
        0x0D8775F648430679A709E98d2b0Cb6250d2887EF,
        0x4d224452801ACEd8B2F0aebE155379bb5D594381,
        0x3845badAde8e6dFF049820680d1F14bD3903a5d0,
    ];

    //fetching data

    const fetchingData = async () => {
        try {
            // 1.first get the user''s account
            const userAccount = await checkIfWalletConnected();
            setAccount(userAccount); // update the state of user account

            //2. creating provider and establishing connection
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);

            //3. Checking balamnce 
            const balance = await provider.getBalance(userAccount);
            const convertBal = BigNumber.from(balance).toString();
            const ethValue = ethers.utils.formatEther(convertBal);
            setEther(ethValue);


            //GET NETWORK
            const network = await provider.getNetwork();
            setNetworkConnect(network.name);

            //ALL TOKEN BALANCE AND DATA
            addToken.map(async (el, i) => {
                //GETTING CONTRACT
                const contract = new ethers.Contract(el, ERC20.abi, provider);
                //GETTING BALANCE OF TOKEN
                const userBalance = await contract.balanceOf(userAccount);
                const tokenLeft = BigNumber.from(userBalance).toString();
                const convertTokenBal = ethers.utils.formatEther(tokenLeft);
                //GET NAME AND SYMBOL

                const symbol = await contract.symbol();
                const name = await contract.name();

                tokenData.push({
                    name: name,
                    symbol: symbol,
                    tokenBalance: convertTokenBal,
                    tokenAddress:el,
                });
            });

            //4/
            //WETH Balance
            const wethContract = await connectingWithIWETHToken();
            const wethBal = await wethContract.balanceOf(userAccount);
            const wethToken = BigNumber.from(wethBal).toString();
            const convertwethTokenBal = ethers.utils.formatEther(wethToken);
            setWeth9(convertwethTokenBal);



            //DAI Balance
            const daiContract = await connectingWithDAIToken();
            const daiBal = await daiContract.balanceOf(userAccount);
            const daiToken = BigNumber.from(daiBal).toString();
            const convertdaiTokenBal = ethers.utils.formatEther(daiToken);
            setDai(convertdaiTokenBal);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchingData();
    }, []);


    //SINGLe SWAP TOKEN
    const singleSwapToken = async ({ token1, token2, swapAmount }) => {
        console.log(
            token1.tokenAddress.tokenAddress,
            token2.tokenAddress.tokenAddress,
            swapAmount);

        try {
            let singleSwapToken;
            let weth;
            let dai;

            singleSwapToken = await connectingWithSingleSwapToken(); // taking instance of singleSwap Token
            weth = await connectingWithIWETHToken(); // takjing instance of weth token
            dai = await connectingWithDAIToken();// taking instance of dai token

            // const amountIn = 10n ** 18n;

            const decimals0 = 18;
            const inputAmount = swapAmount;
            const amountIn = ethers.utils.parseUnits(
                inputAmount.toString(),
                decimals0
            )

            console.log(amountIn);

            await weth.deposit({ value: amountIn });
            await weth.approve(singleSwapToken.address, amountIn);


            //SWAP
            const transaction = await singleSwapToken.swapExactInputSingle( token1.tokenAddress.tokenAddress,
                token2.tokenAddress.tokenAddress,amountIn, {
                gasLimit: 300000,
            });

            await transaction.wait();
            console.log(transaction);


            const balance = await dai.balanceOf(account);
            const transferAmount = BigNumber.from(balance).toString();
            const ethValue = ethers.utils.formatEther(transferAmount);
            setDai(ethValue);
            console.log("DAI balance:", ethValue);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <SwapTokenContext.Provider
            value={{
                singleSwapToken,
                connectWallet,
                account,
                weth9,
                dai,
                networkConnect,
                ether,
                tokenData,
            }}
        >
            {children}
        </SwapTokenContext.Provider>
    );
}


