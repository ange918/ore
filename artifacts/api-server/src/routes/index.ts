import { Router, type IRouter } from "express";
import healthRouter from "./health";
import notifyAdminRouter from "./notify-admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(notifyAdminRouter);

export default router;
