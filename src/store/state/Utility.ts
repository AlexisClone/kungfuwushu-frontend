import { Model } from "./Helpers";

export interface IUtility {
    drawerOpen: boolean;
}

const UtilityModel = Model<IUtility>({
    drawerOpen: false
});

export class Utility extends UtilityModel {}
