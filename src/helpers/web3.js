import Web3 from 'web3';

export const getWeb3Instance = () => {
  const web3 = new Web3(window.ethereum);
  return web3;
};

export const getContractInstance = (web3, abi, contractAddress) => {
  const contract = new web3.eth.Contract(abi, contractAddress);
  return contract;
};
