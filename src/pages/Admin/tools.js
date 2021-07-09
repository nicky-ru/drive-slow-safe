import { Devices } from "../Device/devices";
import { Policies } from "../Policy/policies";
import { Holders } from "../Holder/holders";
import { Vehicles } from "../Vehicle/vehicles";
import { DataPointList } from "../../components/DataPoint/dataPointList";
import { ClaimsList } from "../../components/Claim/claimsList";
import { Partners } from "../Partner/partners";

export const ToolConfig = {
    tools: ['devices', 'policies', 'holders', 'vehicles', 'penalties', 'claims', 'partners'],
    devices: {
        name: 'Devices',
        path: '/devices',
        component: Devices,
    },
    policies: {
        name: 'Policies',
        path: '/policies',
        component: Policies,
    },
    holders: {
        name: 'Holders',
        path: '/holders',
        component: Holders,
    },
    vehicles: {
        name: 'Vehicles',
        path: '/vehicles',
        component: Vehicles,
    },
    penalties: {
        name: 'Penalties',
        path: '/penalties',
        component: DataPointList,
    },
    claims: {
        name: 'Claims',
        path: '/claims',
        component: ClaimsList,
    },
    partners: {
        name: 'Partners',
        path: '/partners',
        component: Partners,
    },
}