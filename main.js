const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("https://babel-api.testnet.iotex.io"));
/************************************************/
/*  Step 3.1: define contract address and admin */
/************************************************/
const contract_address = "0x9E87740bf851f53F63B401FfAE94111Fc2F125Ba"  // iotex testnet
const contract_admin = "0xE9cebA328C78a43A492463f72DE80e4e1a2Df04d"  // address which will pay gas
/************************************************/
/*       Step 3.2: define contract Abi          */
/************************************************/
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
const smartContract = new web3.eth.Contract(driveSlowSafeAbi, contract_address);  // instantiate the DriveSlowSafe contract
// Libraries for interacting with AWS S3
const { CognitoIdentityClient } = require('@aws-sdk/client-cognito-identity');
const { fromCognitoIdentityPool } = require("@aws-sdk/credential-provider-cognito-identity");
const { S3Client, ListObjectsCommand } = require("@aws-sdk/client-s3");

const nodeFetch = require("node-fetch");
const BlueBird = require("bluebird");
nodeFetch.Promise = BlueBird;

/************************************************/
/* Step 3.3: set path to the admin private key  */
/************************************************/
const fs = require('fs');
const privateKey = fs.readFileSync("./.secret").toString().trim();

/************************************************/
/* Step 3.4: set AWS Region, id pool and bucket */
/************************************************/
const REGION = "us-west-2";
const bucketName = "vactracker";
const s3 = new S3Client({
    region: REGION,
    credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({region: REGION}),
        identityPoolId: "us-west-2:813672e7-30d6-4da4-8503-1ce38bbd5b80",
    }),
});

/************************************************/
/*      Step 3.5: set the required params       */
/************************************************/
const time = 30;  // time to calculate speed between to gps points
// Todo: get maxVelocity value from the contract
const maxVelocity = 80;  // km per hour. Speed limit
const checkInterval = 5000;  // interval to pull messages from s3 bucket

const datapoints = {};  // {objKey: {processed: bool}}
const devices = {};  // devices IMEI

// Haversine formula to calculate distance between two gps points
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

function countDigitsBeforePoint(num) {
    if (num.abs() < 10) {
        return 1;
    } else if (num.abs() < 100) {
        return 2;
    } else if (num.abs() < 200) {
        return 3;
    }
    return 0;  // Todo: return error
}

// Builds, signs and sends transaction to the smart contract
async function sendDataToContract(objJson) {
    let acc1 = objJson.message.accelerometer[0].toString();
    let acc2 = objJson.message.accelerometer[1].toString();
    let acc3 = objJson.message.accelerometer[2].toString();
    let rand = objJson.message.random;
    let timestamp = objJson.message.timestamp;
    let r = "0x" + objJson.signature.r;
    let s = "0x" + objJson.signature.s;

    // leading zeroes are being truncated, but we need to keep the same precision as in
    // the original message, otherwise the resulting hash of the message will be different.
    // We need to keep 9 digits after the point, e.g., 51.332628000
    /** *******Todo: Better solution TO TEST***********
    * let lat = objJson.message.latitude;
    * lat = lat.toPrecision(countDigitsBeforePoint(lat) + 9).toString();
    * let lon = objJson.message.longitude;
    * lon = lon.toPrecision(countDigitsBeforePoint(lon) + 9).toString();
    ******************************************* */
    let lat = objJson.message.latitude.toPrecision(11).toString();
    let lon = objJson.message.longitude;
    if (lon < 10) lon = lon.toPrecision(10).toString();
    else lon = lon.toPrecision(11).toString();

    let tx_builder = smartContract.methods.receiveMessage(acc1, acc2, acc3, lat, lon, rand, timestamp, r, s);

    let encoded_tx = tx_builder.encodeABI();
    let transaction_obj = {
        gas: 3000000,
        data: encoded_tx,
        from: contract_admin,
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

// filtrate meaningful data points, if meaningful, invoke sendDataToContract()
async function handleNewDataPoints() {
    for (let datapoint in datapoints) {
        // check for new data points
        if (!datapoints[datapoint].processed) {
            const deviceId = datapoint.split("/")[1];  // parse device IMEI
            const lastObjKey = devices[deviceId];  // choose the last data point that was being stored for this device
            devices[deviceId] = datapoint;  // update latest data point for current device
            datapoints[datapoint].processed = true;  // mark new data point as processed
            // get previous and last data points json
            const objJson = await viewObject(datapoint);
            const objJsonPrev = await viewObject(lastObjKey);

            try {
                lat1 = objJson.message.latitude;
                lon1 = objJson.message.longitude;
                lat2 = objJsonPrev.message.latitude;
                lon2 = objJsonPrev.message.longitude;
                console.log(lat1, lon1, lat1, lon2);

                const dist = calcDistance(lat1, lat2, lon1, lon2);
                /** ********* BUG **********/
                const velocity = dist * time;  // km per hour
                /** ************************/
                /** *********Todo:TO TEST **********/
                /** const velocity = dist / time;  // km per hour */
                /** ***************************************/

                console.log("Distance: ", dist, "Velocity: ", velocity);
                // check if speed exceeds the limit, if yes, send message to contract to register the message
                if (velocity > maxVelocity) {
                    sendDataToContract(objJson);
                }
            } catch (e) {}
        }
    }
}

// lists IMEI of all devices from S3 bucket
async function listDevices() {
    try {
        const data = await s3.send(
            new ListObjectsCommand({Prefix: "device/", Delimiter: "/", Bucket: bucketName})
        );
        await data.CommonPrefixes.map(async function (object) {
            const deviceId = object.Prefix.split("/")[1];  // retrieve IMEI
            // add device IMEI to the devices dictionary
            if (!devices[deviceId]) {
                devices[deviceId] = "";
            }
            // list data points from the device folder
            let prefix = object.Prefix + 'data/';
            const _obj =  await s3.send(
                new ListObjectsCommand({Prefix: prefix, Delimiter: "/", Bucket: bucketName})
            );
            // add new data points to the data points dictionary
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

// get json of data point
async function viewObject (objectKey) {
    try {
        let href = "https://s3." + REGION + ".amazonaws.com/";
        let bucketUrl = href + bucketName + "/";
        let objectUrl = bucketUrl + encodeURIComponent(objectKey);

        const objectJson = await nodeFetch(objectUrl).then((response) => response.json())
        return objectJson;
    } catch (e) {
        return console.log("There was an error viewing your objects: " + e.message);
    }
}

// retrieve and handle data points with intervals
(async() => {
    setInterval(listDevices, checkInterval);
    setInterval(handleNewDataPoints, checkInterval);
})();
