import { web3 } from "../components/ButtonWeb3";
import Voting from "../ethereum/build/Voting.json";

const voting = (address) => {
  return new web3.eth.Contract(Voting.abi, address);
};

export default voting;
