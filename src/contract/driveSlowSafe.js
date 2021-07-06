import web3 from "./web3";
import { driveSlowSafeAbi } from "./driveSlowSafeAbi";

const address = "0x311388275Ffe79Fd576b93f5431397A838604F5D"  // ganache


export default new web3.eth.Contract(driveSlowSafeAbi, address);