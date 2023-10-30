import { Router } from "express";
import { UserComponent } from "../components";

const router: Router = Router();

router.get("/getUsersAtRisk", UserComponent.getInRiskUserData);
router.get("/getUsersEligibleForLiq", UserComponent.getInLiquidationkUserData);
router.get("/getAllUsers", UserComponent.getAllUsers);


export default router;
