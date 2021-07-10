const Web3 = require("web3");
// const Big = require('big.js');
// const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
const web3 = new Web3(new Web3.providers.HttpProvider("https://babel-api.testnet.iotex.io"));
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
// const contract_address = "0xa801e8d1c9D5f7d5fCe1310bFD7d96ad0A6746d8"  // ganache
const contract_address = "0x9E87740bf851f53F63B401FfAE94111Fc2F125Ba"  // ganache
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

const time = 30;
const maxVelocity = 80;  // km per hour
const checkInterval = 5000;
const datapoints = {};
const devices = {};

function calcDistance(lat1, lat2, lon1, lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2-lat1);
    let dLon = deg2rad(lon2-lon1);
    let a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

let count = 0;

async function sendDataToContract(objJson) {
    let r = "0x" + objJson.signature.r;
    let s = "0x" + objJson.signature.s;

    let acc1 = objJson.message.accelerometer[0].toString();
    let acc2 = objJson.message.accelerometer[1].toString();
    let acc3 = objJson.message.accelerometer[2].toString();

    let lat = objJson.message.latitude.toPrecision(11).toString();
    let lon = objJson.message.longitude;
    if (lon < 10) lon = lon.toPrecision(10).toString();
    else lon = lon.toPrecision(11).toString();
    let rand = objJson.message.random;
    let timestamp = objJson.message.timestamp;

    console.log(acc1, acc2, acc3, lat, lon, rand, timestamp, r, s);

    let tx_builder = smartContract.methods.receiveMessage(acc1, acc2, acc3, lat, lon, rand, timestamp, r, s);

    let encoded_tx = tx_builder.encodeABI();
    let transaction_obj = {
        gas: 3000000,
        data: encoded_tx,
        from: "0xE9cebA328C78a43A492463f72DE80e4e1a2Df04d",
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
        console.log("error while signing a transaction: ", e);
    }
}

async function handleNewDataPoints() {
    for (let datapoint in datapoints) {
        if (!datapoints[datapoint].processed) {
            const deviceId = datapoint.split("/")[1];
            const lastObjKey = devices[deviceId];

            devices[deviceId] = datapoint;
            datapoints[datapoint].processed = true;

            const objJson = await viewObject(datapoint);
            const objJsonPrev = await viewObject(lastObjKey);

            try {
                lat1 = objJson.message.latitude;
                lon1 = objJson.message.longitude;
                lat2 = objJsonPrev.message.latitude;
                lon2 = objJsonPrev.message.longitude;
                console.log(lat1, lon1, lat1, lon2);

                const dist = calcDistance(lat1, lat2, lon1, lon2);

                const velocity = dist * time;  // km per hour
                console.log("Distance: ", dist, "Velocity: ", velocity);

                if (velocity > maxVelocity) {
                    sendDataToContract(objJson);
                }
                // if (count === 0) {
                //     sendDataToContract(objJson);
                //     count++;
                // }

            } catch (e) {}
        }
    }
}

async function listDevices() {
    try {
        const data = await s3.send(
            new ListObjectsCommand({Prefix: "device/", Delimiter: "/", Bucket: bucketName})
        );
        await data.CommonPrefixes.map(async function (object) {
            const deviceId = object.Prefix.split("/")[1];
            if (!devices[deviceId]) {
                devices[deviceId] = "";
            }
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

function showDevices() {
    console.log(devices);
}

(async() => {
    setInterval(listDevices, checkInterval);
    setInterval(handleNewDataPoints, checkInterval);
    // setInterval(showDevices, 5000);
    // setInterval(showDP, 5000);
})();