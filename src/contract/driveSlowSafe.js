import web3 from "./web3";
import { driveSlowSafeAbi } from "./driveSlowSafeAbi";

const address = "0x597BFf19A0032E328f95E17135a295693B030998"  // ganache


export default new web3.eth.Contract(driveSlowSafeAbi, address);