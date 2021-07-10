const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
const driveSlowSafeAbi = [
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
            },
            {
                "internalType": "uint256",
                "name": "accumulatedKM",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
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
    }
]
const contract_address = "0x597BFf19A0032E328f95E17135a295693B030998"  // ganache
const smartContract = new web3.eth.Contract(driveSlowSafeAbi, contract_address);

const { CognitoIdentityClient } = require('@aws-sdk/client-cognito-identity');
const { fromCognitoIdentityPool } = require("@aws-sdk/credential-provider-cognito-identity");
const { S3Client, ListObjectsCommand } = require("@aws-sdk/client-s3");

const nodeFetch = require("node-fetch");
const BlueBird = require("bluebird");

const fs = require('fs');
const privateKey = fs.readFileSync("./.secret").toString().trim();

nodeFetch.Promise = BlueBird;

const REGION = "us-west-2";
const s3 = new S3Client({
    region: REGION,
    credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({region: REGION}),
        identityPoolId: "us-west-2:813672e7-30d6-4da4-8503-1ce38bbd5b80",
    }),
});

const bucketName = "vactracker";

const datapoints = {};

async function sendDataToSC() {
    for (let datapoint in datapoints) {
        if (!datapoints[datapoint].processed) {
            datapoints[datapoint].processed = true;
            console.log(datapoint, datapoints[datapoint]);

            const objJson = await viewObject(datapoint);

            let r = "0x" + objJson.signature.r;
            let s = "0x" + objJson.signature.s;

            let tx_builder = smartContract.methods.receiveMessage(
                objJson.message.accelerometer[0].toString(),
                objJson.message.accelerometer[1].toString(),
                objJson.message.accelerometer[2].toString(),
                objJson.message.latitude.toString(),
                objJson.message.longitude.toString(),
                objJson.message.random,
                objJson.message.timestamp,
                r,
                s
            )

            let encoded_tx = tx_builder.encodeABI();
            let transaction_obj = {
                gas: 1000000,
                data: encoded_tx,
                from: "0xF26a43cb8FF1fa90b603152B845A3E2de9c5Ba6F",
                to: contract_address
            }

            try {
                await web3.eth.accounts.signTransaction(transaction_obj, privateKey, function (error, signedTransaction) {
                    if (error) {
                        console.log(error);
                    } else {
                        web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
                            .on('receipt', function (receipt) {
                                console.log(receipt);
                            })
                            .on("error", function (error) {
                                console.log(error);
                            })
                    }
                });
            } catch (e) {
                console.log("error while sending a transaction: ", e);
            }
        }
    }
}

async function listDevices() {
    try {
        const data = await s3.send(
            new ListObjectsCommand({Prefix: "device/", Delimiter: "/", Bucket: bucketName})
        );
        await data.CommonPrefixes.map(async function (object) {
            let prefix = object.Prefix + 'data/';
            const _obj =  await s3.send(
                new ListObjectsCommand({Prefix: prefix, Delimiter: "/", Bucket: bucketName})
            );
            _obj.Contents.map(async function (obj) {
                let objKey = obj.Key;
                if (!datapoints[objKey]) {
                    datapoints[objKey] = {processed: false};
                }
            })
        });

    } catch (e) {
        return console.log("There was an error listing your objects: " + e.message);
    }
}

async function viewObject (objectKey) {
    try {
        let href = "https://s3." + REGION + ".amazonaws.com/";
        let bucketUrl = href + bucketName + "/";
        let objectUrl = bucketUrl + encodeURIComponent(objectKey);
        // console.log(objectUrl);

        const objectJson = await nodeFetch(objectUrl).then((response) => response.json())
        return objectJson;
    } catch (e) {
        return console.log("There was an error viewing your objects: " + e.message);
    }
}

function showDP() {
    console.log(datapoints);
    console.log("___BREAK___");
}

(async() => {
    setInterval(listDevices, 10000);
    setInterval(sendDataToSC, 15000);
    // setInterval(showDP, 5000);
})();
