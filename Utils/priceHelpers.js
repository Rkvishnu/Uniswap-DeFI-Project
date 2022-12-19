const axios = require("axios");

const ETHERSCAN_API_KEY = "GJ53APKP6921CJ8YP5QG9EMBJ8IJ9I2ARN";

//abi of the address we have used from etherscan
exports.getAbi = async (address) => {

    const url = ``

    const res = await axios.get(url);
    const abi = JSON.parse(res.data.result);

    return abi;
}

exports.getPoolImmutables = async (poolContract) => {

    const [token0, token1, fee] = await Promise.all({

        poolContract.token0(),
        poolContract.token1(),
        poolContract.fee(),
    });


    const immutables={
        token0:token0,
        token1:token1,
        fee:fee,
    };

    return immutables;
}