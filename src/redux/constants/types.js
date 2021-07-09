export const wallet = {
    CONNECT: 'dss/wallet/connect',
    LOCK: 'dss/wallet/lock',
    UNLOCK: 'dss/wallet/unlock',
    UPDATE_ADDRESS: 'dss/wallet/changeAddress',
    UPDATE_CHAIN: 'dss/wallet/changeChain',
}

export const contract = {
    UPDATE: 'dss/contract/update',
    SET_POLICIES: 'dss/contract/setPolicies',
    SET_DEVICES: 'dss/contract/setDevices',
    SET_HOLDERS: 'dss/contract/setHolders',
    SET_VEHICLES: 'dss/contract/setVehicles',
    SET_PARTNERS: 'dss/contract/setPartners',
}

export const user = {
    UPDATE: 'dss/user/update',
    IS_ADMIN: 'dss/user/isAdmin',
    SET_POLICIES: 'dss/user/setPolicies',
    SET_PENALTIES: 'dss/user/setPenalties',
}

export const holder = {
    GET: 'dss/holder/get',
}

export const policy = {
    ADD: 'dss/policy/add',
    GET: 'dss/policy/get',
}

export const penalty = {
    ADD: 'dss/penalty/add',
}

export const vehicle = {
    GET: 'dss/vehicle/get',
}

export const device = {
    GET: 'dss/device/get',
}