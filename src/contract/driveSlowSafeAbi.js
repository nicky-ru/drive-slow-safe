export const driveSlowSafeAbi = [
    {
        "inputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "administrator",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "balance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "dataPoints",
        "outputs": [
            {
                "internalType": "string",
                "name": "latitude",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "longitude",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "random",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "timestamp",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "devices",
        "outputs": [
            {
                "internalType": "string",
                "name": "imei",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "hasOrder",
                "type": "bool"
            },
            {
                "internalType": "enum DriveSlowSafe.Status",
                "name": "status",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "policy",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "holders",
        "outputs": [
            {
                "internalType": "bool",
                "name": "isActive",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "rating",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "multiplier",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "penaltyMultiplier",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "partners",
        "outputs": [
            {
                "internalType": "bool",
                "name": "registered",
                "type": "bool"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "policies",
        "outputs": [
            {
                "internalType": "bool",
                "name": "isActive",
                "type": "bool"
            },
            {
                "internalType": "address",
                "name": "policyHolder",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "vehicle",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "device",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "premium",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "locked",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "fundsUsed",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "vehicles",
        "outputs": [
            {
                "internalType": "bool",
                "name": "registered",
                "type": "bool"
            },
            {
                "internalType": "string",
                "name": "brand",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "model",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "year",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "_walletAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_imei",
                "type": "string"
            }
        ],
        "name": "approveDevice",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "_partner",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "name": "registerPartner",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "kill",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "_brand",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_model",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_year",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_device",
                "type": "address"
            }
        ],
        "name": "signPolicy",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address payable",
                "name": "_partner",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "_policy",
                "type": "bytes32"
            }
        ],
        "name": "payRepair",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "_accel1",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_accel2",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_accel3",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_latitude",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_longitude",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_random",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_timestamp",
                "type": "string"
            },
            {
                "internalType": "bytes32",
                "name": "_r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "_s",
                "type": "bytes32"
            }
        ],
        "name": "receiveMessage",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_policy",
                "type": "bytes32"
            }
        ],
        "name": "cancelPolicy",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "showMyPenalties",
        "outputs": [
            {
                "internalType": "bytes32[]",
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "showMyPolicies",
        "outputs": [
            {
                "internalType": "bytes32[]",
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getHoldersIds",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getVehicleIds",
        "outputs": [
            {
                "internalType": "bytes32[]",
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getDeviceIds",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getPolicyIds",
        "outputs": [
            {
                "internalType": "bytes32[]",
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getPartnerIds",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]