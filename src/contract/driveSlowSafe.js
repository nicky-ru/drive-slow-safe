import web3 from "./web3";
import { driveSlowSafeAbi } from "./driveSlowSafeAbi";

const address = "0xdA6dAa03BD51986062AF0ff1886c98B2DA5C24d5"  // ganache


export default new web3.eth.Contract(driveSlowSafeAbi, address);