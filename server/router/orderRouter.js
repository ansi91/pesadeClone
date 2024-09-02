import express from "express";
import * as controller from "../controller/orderController.js";

const router = express.Router();

router.post("/create", controller.createOrder);
router.post("/orderdetail", controller.orderDetail);
router.get("/info/:userId", controller.getUserInfo);
router.post("/list", controller.list);
router.get("/order-detail/:oid", controller.detail);
router.delete("/delete", controller.deleteOrder);
router.post("/cancle",controller.orderCancle)
router.post("/canclelist",controller.orderCancleList)
export default router;
