import web3 from "./web3";
import { driveSlowSafeAbi } from "./driveSlowSafeAbi";

/************************************************/
/*        Step 2.1: define contract address     */
/************************************************/
const iotexTestnet = "0x9E87740bf851f53F63B401FfAE94111Fc2F125Ba"


export default new web3.eth.Contract(driveSlowSafeAbi, iotexTestnet);