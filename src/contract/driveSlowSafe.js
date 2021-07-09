import web3 from "./web3";
import { driveSlowSafeAbi } from "./driveSlowSafeAbi";

const address = "0x9c64907C190158c9dd1E0937b4Eb4dC3420227E3"  // ganache


export default new web3.eth.Contract(driveSlowSafeAbi, address);