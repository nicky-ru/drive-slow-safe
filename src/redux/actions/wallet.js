import * as types from '../constants/types';

export function handleAccountChanged(accounts) {
    if (accounts.length === 0) {
        console.log('Please connect to MetaMask.');
    } else {
        return {
            type: types.wallet.UPDATE_ADDRESS,
            address: accounts[0]
        }
    }
}