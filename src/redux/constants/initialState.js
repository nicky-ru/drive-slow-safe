export default {
    wallet: {
        isConnected: false,
        isLocked: true,
        chainId: '',
        address: ''
    },
    contract: {
        address: '0x311388275Ffe79Fd576b93f5431397A838604F5D',
        admin: '0xF26a43cb8FF1fa90b603152B845A3E2de9c5Ba6F',
        balance: 0
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
    },
    penalty: {

    },
    vehicle: {
        brand: '',
        model: '',
        year: '',
    },
    dataPoint: {
        speed: 0,
    },
    device: {
        imei: '',
        hasOrder: false,
        status: 0,
        policyId: '',
    }
}