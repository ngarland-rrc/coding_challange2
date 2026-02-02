import { Event } from "../models/eventModel";
// import { Attendee } from "../models/attendeeModel";

interface popularityResponse {
    id: number,
    name: string,
    date: string,
    capacity: number,
    registrationCount: number,
    spotsRemaining: number,
    popularityScore: number,
    popularityTier: string,
}

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

// const attendees: Attendee[] = [
//     {
//         id: 1,
//         name: "Jordan Smith",
//         email: "jordan.smith@email.com",
//     },
//     {
//         id: 2,
//         name: "Alex Chen",
//         email: "alex.chen@email.com",
//     },

// ]

/**
 * Retrieves all events from storage 
 * @returns Array of all events 
 */
export const getAllEvents = async (): Promise<Event[]> => {
    // Return a deep clone to avoid direct mutation
    return structuredClone(events);
}

export const createEvent = async (eventData: {
    id: number;
    name: string;
    capacity: number;
}): Promise<Event> => {
    const newEvent: Event = {
        id: eventData.id,
        name: eventData.name,
        date: String(new Date()),
        capacity: eventData.capacity,
        registrationCount: 0,
    };

    events.push(newEvent);
    return structuredClone(newEvent);
};

/**
 * Updates an existing events
 * @param id - The ID of the events to update
 * @param eventData - The fields to update (name and/or description)
 * @returns The updated events
 * @throws Error if events with given ID is not found
 */
export const updateEvent = async (
    id: number,
    // maybe fix with id, we will see.
    eventData: Pick<Event, "name" | "date" | "capacity" | "registrationCount">
): Promise<Event> => {
    const index: number = events.findIndex((events: Event) => events.id === id);

    if (index === -1) {
        throw new Error(`Event with ID ${id} not found`);
    }

    // Update the events with the provided fields
    events[index] = {
        ...events[index],
        ...eventData,
    };

    return structuredClone(events[index]);
};

/**
 * Deletes an events from storage
 * @param id - The ID of the events to delete
 * @throws Error if events with given ID is not found
 */
export const deleteEvent = async (id: number): Promise<void> => {
    const index: number = events.findIndex((events: Event) => events.id === id);

    if (index === -1) {
        throw new Error(`Event with ID ${id} not found`);
    }

    events.splice(index, 1);
};

export const getEventById = async (id: number): Promise<Event> => {
    const index: number = events.findIndex((events: Event) => events.id === id);

    if (index === -1) {
        throw new Error(`Event with ID ${id} not found`);
    }

    return structuredClone(events[index])
}

export const getEventPopularityScore = async (id: number): Promise<popularityResponse> => {
    const index: number = events.findIndex((events: Event) => events.id === id);

    if (index === -1) {
        throw new Error(`Event with ID ${id} not found`);
    }

    const { name, date, capacity, registrationCount } = events[index];
    const spotsRemaining: number = capacity - registrationCount;
    const popularityScore: number = parseFloat(((registrationCount / capacity) * 100).toFixed(1));

    let popularityTier: string = "New";

    switch (true) {
        case popularityScore >= 90:
            popularityTier = "Hot";
            break;
        case popularityScore >= 70:
            popularityTier = "Popular";
            break;
        case popularityScore >= 50:
            popularityTier = "Moderate";
            break;
        case popularityScore >= 25:
            popularityTier = "Building";
    }


    const response: popularityResponse = {
        id: id,
        name: name,
        date: date,
        capacity: capacity,
        registrationCount: registrationCount,
        spotsRemaining: spotsRemaining,
        popularityScore: popularityScore,
        popularityTier: popularityTier
    }

    return response
}