export default {
    wallet: {
        address: ''
    },
    contract: {
        address: '',
        admin: '',
        balance: 0,
        policies: [],
        devices: [],
        holders: [],
        vehicles: [],
        partners: [],
    },
    user: {
        // isAdmin: false,
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