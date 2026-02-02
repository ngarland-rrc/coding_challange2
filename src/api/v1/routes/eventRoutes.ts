import express, { Router } from "express";
import * as eventController from "../controllers/eventController";

const router: Router = express.Router();

router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.get("/:id/popularity", eventController.getEventPopularityScore);
router.post("/", eventController.createEvent);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

export default router;