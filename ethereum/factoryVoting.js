import web from './web3';
import VotingFactory from './build/FactoryVoting.json';

const instance = new web.eth.Contract(
    VotingFactory.abi,
    process.env.NEXT_PUBLIC_ADDRESS_FACTORY
)

export default instance;