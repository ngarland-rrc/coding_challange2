import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as eventServices from "../services/eventServices";
import type { Event } from "../models/eventModel";

export const getAllEvents = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const items: Event[] = await eventServices.getAllEvents();
        res.status(HTTP_STATUS.OK).json({
            message: "Items retrieved successfully",
            data: items,
        });
    } catch (error) {
        next(error);
    }
};

export const createEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Basic validation - check for required fields
        if (!req.body.name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Event name is required",
            });
        } else if (!req.body.description) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Event description is required",
            });
        } else {
            // Extract only the fields we need
            const { id, name, date, capacity, registrationCount } = req.body;
            const eventData = { id, name, date, capacity, registrationCount };

            const newItem: Event = await eventServices.createEvent(eventData);
            res.status(HTTP_STATUS.CREATED).json({
                message: "Event created successfully",
                data: newItem,
            });
        }
    } catch (error) {
        next(error);
    }
};

export const updateEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;

        // Extract update fields
        const { name, date, capacity, registrationCount } = req.body;

        // Create update data object with only the fields that can be updated
        const updateData = { name, date, capacity, registrationCount };

        const updatedItem: Event = await eventServices.updateEvent(Number(id as string), updateData);
        res.status(HTTP_STATUS.OK).json({
            message: "Event updated successfully",
            data: updatedItem,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        await eventServices.deleteEvent(Number(id as string));
        res.status(HTTP_STATUS.OK).json({
            message: "Event deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};