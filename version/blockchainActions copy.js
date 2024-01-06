// constants
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import { fetchData } from "../data/dataActions";
import contracts from '../contracts/config'; // contracts/config.js をインポート

// const PROXY_SERVER_URL = 'http://162.43.48.49:3006';

// Action Types
const CONNECTION_REQUEST = "CONNECTION_REQUEST";
const CONNECTION_SUCCESS = "CONNECTION_SUCCESS";
const CONNECTION_FAILED = "CONNECTION_FAILED";
const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";

// Action Creators
const connectRequest = () => ({
  type: CONNECTION_REQUEST,
});

const connectSuccess = (payload) => ({
  type: CONNECTION_SUCCESS,
  payload,
});

const connectFailed = (error) => ({
  type: CONNECTION_FAILED,
  error,
});

const updateAccountRequest = (account) => ({
  type: UPDATE_ACCOUNT,
  account,
});

export const connectToBlockchain = () => async (dispatch) => {
  dispatch(connectRequest());

  try {
    const { ethereum } = window;

    if (ethereum && ethereum.isMetaMask) {
      Web3EthContract.setProvider(ethereum);
      const web3 = new Web3(ethereum);

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      const networkId = await ethereum.request({ method: "net_version" });

      const contractInstances = [];

      for (const contractInfo of contracts) {
        if (networkId === contractInfo.networkId) {
          const contractInstance = new Web3EthContract(contractInfo.abi, contractInfo.address);
          contractInstances.push(contractInstance);
        }
      }

      dispatch(connectSuccess({
        account: accounts[0],
        smartContracts: contractInstances, // 複数のコントラクトインスタンスを含む
        web3,
      }));

      ethereum.on("accountsChanged", (accounts) => {
        dispatch(updateBlockchainAccount(accounts[0]));
      });

      ethereum.on("chainChanged", () => {
        window.location.reload();
      });

    } else {
      dispatch(connectFailed("Please install Metamask."));
    }
  } catch (error) {
    dispatch(connectFailed("An error occurred while connecting to the blockchain."));
  }
};

export const updateBlockchainAccount = (account) => (dispatch) => {
  dispatch(updateAccountRequest(account));
  dispatch(fetchData(account));
};

// export const fetchDataFromBaseURI = (baseURI) => async (dispatch) => {
//     try {
//       const response = await fetch(`${PROXY_SERVER_URL}/fetch-data`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ baseURI })
//       });
  
//       const data = await response.json();
//       // ここで取得したデータを使用して処理を行います
  
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
// };
