import { Event } from "../models/eventModel";
import { Attendee } from "../models/attendeeModel";

const events: Event[] = [
    {
        id: 1,
        name: "Tech Conference 2025",
        date: String(new Date("2025-03-15T09:00:00.000Z")),
        capacity: 200,
        registrationCount: 185,
    },
    {
        id: 2,
        name: "Startup Pitch Night",
        date: String(new Date("2025-02-20T18:00:00.000Z")),
        capacity: 50,
        registrationCount: 12,
    },
    {
        id: 3,
        name: "Web Dev Workshop",
        date: String(new Date("2025-02-10T10:00:00.000Z")),
        capacity: 30,
        registrationCount: 30,
    },

]

/**
 * Retrieves all events from storage 
 * @returns Array of all events 
 */
export const getAllEvents = async (): Promise<Event[]> => {
    // Return a deep clone to avoid direct mutation
    return structuredClone(events);
}

export const createEvent = async (itemData: {
    name: string;
    description: string;
}): Promise<Event> => {
    const newItem: Event = {
        id: Date.now().toString(),
        name: itemData.name,
        description: itemData.description,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    events.push(newItem);
    return structuredClone(newItem);
};

/**
 * Updates an existing item
 * @param id - The ID of the item to update
 * @param itemData - The fields to update (name and/or description)
 * @returns The updated item
 * @throws Error if item with given ID is not found
 */
export const updateEvent = async (
    id: string,
    itemData: Pick<Event, "name" | "description">
): Promise<Event> => {
    const index: number = events.findIndex((item: Event) => item.id === id);

    if (index === -1) {
        throw new Error(`Event with ID ${id} not found`);
    }

    // Update the item with the provided fields
    events[index] = {
        ...events[index],
        ...itemData,
        updatedAt: new Date(),
    };

    return structuredClone(events[index]);
};

/**
 * Deletes an item from storage
 * @param id - The ID of the item to delete
 * @throws Error if item with given ID is not found
 */
export const deleteEvent = async (id: string): Promise<void> => {
    const index: number = events.findIndex((item: Event) => item.id === id);

    if (index === -1) {
        throw new Error(`Event with ID ${id} not found`);
    }

    events.splice(index, 1);
};