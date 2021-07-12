export default {
    wallet: {
        isConnected: false,
        isLocked: true,
        chainId: '',
        address: ''
    },
    /************************************************/
    /* Step 2.3: define contract address and admin  */
    /************************************************/
    contract: {
        // Todo: make this state update automatically
        address: '0xac492bFb17C1dfbcDBb2Eab66819d536dD8Ac574',
        admin: '0xE9cebA328C78a43A492463f72DE80e4e1a2Df04d',
        balance: 0,
        policies: [],
        devices: [],
        holders: [],
        vehicles: [],
        partners: [],
    },
    user: {
        isAdmin: false,
        policies: [],
        penalties: []
    },
    policy: {
        status: false,
        holderId: '',
        vehicleId: '',
        deviceId: '',
        premium: 0,
        lockedFunds: 0,
        fundsUsed: 0,
    },
    penalty: {
    },
    vehicle: {
        brand: '',
        model: '',
        year: '',
    },
    dataPoint: {
        accelerometer: [],
        latitude: '',
        longitude: '',
        timestamp: '',
    },
    device: {
        imei: '',
        hasOrder: false,
        status: 0,
        policyId: '',
    },
    holder: {
        rating: 0,
        multiplier: 0,
        penaltyMultiplier: 0,
        accumulatedKM: 0,
    },
    partner: {
        name: '',
    },
}