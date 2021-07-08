import { DeviceList } from "../../components/Device/deviceList";
import { PolicyList } from "../../components/Policy/policyList";
import { HoldersList } from "../../components/User/holdersList";
import { VehiclesList } from "../../components/Vehicle/vehiclesList";
import { DataPointList } from "../../components/DataPoint/dataPointList";
import { ClaimsList } from "../../components/Claim/claimsList";
import { PartnersList } from "../../components/Partner/partnersList";

export const ToolConfig = {
    tools: ['devices', 'policies', 'holders', 'vehicles', 'penalties', 'claims', 'partners'],
    devices: {
        name: 'Devices',
        path: '/devices',
        component: DeviceList,
    },
    policies: {
        name: 'Policies',
        path: '/policies',
        component: PolicyList,
    },
    holders: {
        name: 'Holders',
        path: '/holders',
        component: HoldersList,
    },
    vehicles: {
        name: 'Vehicles',
        path: '/vehicles',
        component: VehiclesList,
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
        component: PartnersList,
    },
}