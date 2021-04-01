const { Zilliqa } = require("@zilliqa-js/zilliqa");
//const { toBech32Address, getAddressFromPrivateKey } = require("@zilliqa-js/crypto");

const { BN, Long, bytes } = require("@zilliqa-js/util");

const CHAIN_ID = 333;
const MSG_VERSION = 1;
const VERSION = bytes.pack(CHAIN_ID, MSG_VERSION);

const contractAddress = "0xcb45810cae7690f9ab50d5ad350cc1e62e6cd58a";
export const zilliqa = new Zilliqa("https://dev-api.zilliqa.com");
const myGasPrice = new BN("1000000000");

export const myWallet = async () => {
  const isConnect = await window.zilPay.wallet.connect();
  if (isConnect) {
    const account = window.zilPay.wallet.defaultAccount;
    console.log(`acctx16 = ${account.base16}`);
    console.log(`acct ${account.bech32}`);
    const balance = await zilliqa.blockchain.getBalance(account.base16);
    console.log(
      `Account balance: ${JSON.stringify(
        balance.result.balance / 1000000000000
      )}`
    );
//    console.log(`Account balance: ${JSON.stringify(balance)}`);

    return {
      address: account.base16,
      balance: balance.result.balance / 1000000000000,
    };
  } else {
    throw new Error("user rejected");
  }
};

export const getHouses = async () => {
  const contract = await window.zilPay.contracts.at(contractAddress);
  const state = await contract.getState();
  const houses = [];
  for (let i = 0; i < state.lastHouseID; i++) {
    houses.push({
      id: `${i + 1}`,
      landlord: `${state.houseLandlord[i + 1]}`,
      streetAddress: `${state.houseStreetAddr[i + 1]}`,
      rentAmount: `${state.houseRentAmt[i + 1]}`,
      status: `${state.houseStatus[i + 1]}`,
    });
  }
  return houses;
};

export const registerHouse = async (streetAddr, rentAmt) => {
  console.log(`b4 sc ${streetAddr} ${rentAmt}`);

  // zilliqa.wallet.addByPrivateKey(privateKey);
  // const address = getAddressFromPrivateKey(privateKey);
  // console.log(`My account address is: ${address}`);
  // console.log(`My account bech32 address is: ${toBech32Address(address)}`);
  // const contract = zilliqa.contracts.at(contractAddress);

  const contract = await window.zilPay.contracts.at(contractAddress);
  const result = await contract.call(
    "registerHouse",
    [
      {
        vname: "streetAddr",
        type: "String",
        value: `${streetAddr}`,
      },
       {
         vname: "rentAmt",
         type: "Uint128",
        value: `${rentAmt}`
       },
    ],
    {
      version: VERSION,
      amount: new BN(0),
      gasPrice: myGasPrice,
      gasLimit: Long.fromNumber(50000),
    },
  //   33,
  //   1000,
  //   false,
  );
  return result;
};

export const rentHouse = async (houseId, rentAmt) => {
  const contract = await window.zilPay.contracts.at(contractAddress);
  const result = await contract.call(
    "rentHouse",
    [
      {
        vname: "id",
        type: "Uint32",
        value: `${houseId}`,
      },
    ],
    {
      version: VERSION,
      amount: new BN(rentAmt),
      gasPrice: myGasPrice,
      gasLimit: Long.fromNumber(10000),
    }
  );
  return result;
};
