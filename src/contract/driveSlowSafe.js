import web3 from "./web3";
import { driveSlowSafeAbi } from "./driveSlowSafeAbi";

const address = "0xa801e8d1c9D5f7d5fCe1310bFD7d96ad0A6746d8"  // ganache
const iotexTestnet = "0xac492bFb17C1dfbcDBb2Eab66819d536dD8Ac574"


export default new web3.eth.Contract(driveSlowSafeAbi, iotexTestnet);