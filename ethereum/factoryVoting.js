import { web3 } from '../components/ButtonWeb3';
import VotingFactory from './build/FactoryVoting.json';

const instance = new web3.eth.Contract(
    VotingFactory.abi,
    process.env.NEXT_PUBLIC_ADDRESS_FACTORY
)

export default instance;