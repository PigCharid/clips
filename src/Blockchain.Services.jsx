import Web3 from "web3";
import { parseUnits } from "ethers/lib/utils.js";
import { erc20, Clips, CLIPS_ADDRESS } from "./contracts";
import { setAlert } from "./store";

const { ethereum } = window;
window.web3 = new Web3(ethereum);
window.web3 = new Web3(window.web3.currentProvider);

const getClips = async () => {
  const web3 = window.web3;
  const contract = new web3.eth.Contract(Clips, CLIPS_ADDRESS);
  return contract;
};

const getClipsTokenBalance = async (address) => {
  try {
    if (address === undefined) {
      return 0;
    }
    const contract = await getClips();
    return await contract.methods.balanceOf(address).call();
  } catch (error) {
  }
};
const getADFee = async (address) => {
  try {
    if (address === undefined) {
      return 0;
    }
    const contract = await getClips();
    return await contract.methods.popCost().call();
  } catch (error) {
    
  }
};
const getLastMintTime = async (address) => {
  try {
    if (address === undefined) {
      return 0;
    }
    const contract = await getClips();
    return await contract.methods.lastMintTime(address).call();
  } catch (error) {
    
  }
};
const getPop = async () => {
  try {
    const contract = await getClips();
    return await contract.methods.pop().call();
  } catch (error) {
    
  }
};

const getlastPopUpdate = async () => {
  try {
    const contract = await getClips();
    return await contract.methods.lastPopUpdate().call();
  } catch (error) {
    
  }
};
const getpopOwner = async () => {
  try {
    const contract = await getClips();
    return await contract.methods.popOwner().call();
  } catch (error) {
   
    
  }
};
const getAllowance = async (address) => {
  try {
    if (address === undefined) {
      return 0;
    }
    const contract = await getClips();
    return await contract.methods.allowance(address,CLIPS_ADDRESS).call();
  } catch (error) {
    
  }
};

const MintClips = async (address) => {
  try {
    const contract = await getClips();
    await contract.methods.mintPops().send({ from: address,gas:3000000,gasPrice:"100000000" });
  } catch (error) {
    console.log(error)
    reportError(error);
  }
};
const Approve = async (address,amount) => {
  try {
    const contract = await getClips();
    await contract.methods.approve(CLIPS_ADDRESS,amount).send({ from: address,gas:3000000,gasPrice:"100000000"});
  } catch (error) {
    reportError(error);
  }
};
const setPop = async (address,message) => {
  try {
    const contract = await getClips();
    await contract.methods.setPop(message).send({ from: address,gas:5000000,gasPrice:"100000000"});
  } catch (error) {
  
    reportError(error);
  }
};



const reportError = (error) => {
  setAlert(JSON.stringify(error), "red");
  throw new Error("No ethereum object.");
};

export {
  getClipsTokenBalance,
  MintClips,
  getADFee,
  getLastMintTime,
  getPop,
  getlastPopUpdate,
  getpopOwner,
  getAllowance,
  Approve,
  setPop
};
