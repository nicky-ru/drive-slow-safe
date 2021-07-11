import web3 from "./web3";
import { driveSlowSafeAbi } from "./driveSlowSafeAbi";

const address = "0xa801e8d1c9D5f7d5fCe1310bFD7d96ad0A6746d8"  // ganache
const iotexTestnet = "0x9E87740bf851f53F63B401FfAE94111Fc2F125Ba"


export default new web3.eth.Contract(driveSlowSafeAbi, iotexTestnet);