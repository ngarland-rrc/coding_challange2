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
        const events: Event[] = await eventServices.getAllEvents();
        res.status(HTTP_STATUS.OK).json({
            message: "Events retrieved",
            count: events.length,
            data: events,
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
        if (!req.body.id) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Event id is required",
            });
        }
        else if (!req.body.name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Event name is required",
            });
        } else if (!req.body.capacity) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Event capacity is required",
            });
        } else {
            // Extract only the fields we need
            const { id, name, capacity } = req.body;
            const eventData = { id, name, capacity };

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

        console.log(req.body)

        if (!req.body.name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Event name is required",
            });
        }
        else if (!req.body.date) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Event date is required",
            });
        }
        else if (!req.body.registrationCount) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Event registration count is required",
            });
        } else if (!req.body.capacity) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Event capacity is required",
            });
        } else {

            const { id } = req.params;

            // Extract update fields
            const { name, date, capacity, registrationCount } = req.body;

            // Create update data object with only the fields that can be updated
            const updateData = { name, date, capacity, registrationCount };

            const updatedEvent: Event = await eventServices.updateEvent(Number(id as string), updateData);
            res.status(HTTP_STATUS.OK).json({
                message: "Event updated successfully",
                data: updatedEvent,
            });
        }
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

export const getEventById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const event: Event = await eventServices.getEventById(Number(id));
        res.status(HTTP_STATUS.OK).json({
            message: "Event retrieved successfully",
            data: event,
        });
    } catch (error) {
        next(error);
    }
};

export const getEventPopularityScore = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const event: Event = await eventServices.getEventPopularityScore(Number(id));
        res.status(HTTP_STATUS.OK).json({
            message: "Event retrieved successfully",
            data: event,
        });
    } catch (error) {
        next(error);
    }
};