import { createItem, items } from "../src/api/v1/services/itemService";

describe("createItem", () => {
  beforeEach(() => {
    // Clear the in-memory array before each test
    items.length = 0;

    // Freeze time
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-01-01T00:00:00Z"));

    // Mock Date.now
    jest.spyOn(Date, "now").mockReturnValue(123456789);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("creates a new item with expected properties", async () => {
    const itemData = {
      name: "Test Item",
      description: "Test Description",
    };

    const result = await createItem(itemData);

    expect(result).toEqual({
      id: "123456789",
      name: "Test Item",
      description: "Test Description",
      createdAt: new Date("2026-01-01T00:00:00Z"),
      updatedAt: new Date("2026-01-01T00:00:00Z"),
    });
  });

  it("adds the item to the items array", async () => {
    const itemData = {
      name: "Another Item",
      description: "Another Description",
    };

    await createItem(itemData);

    expect(items).toHaveLength(1);
    expect(items[0].name).toBe("Another Item");
    expect(items[0].description).toBe("Another Description");
  });

  it("returns a cloned object (not the same reference)", async () => {
    const itemData = {
      name: "Clone Test",
      description: "Clone Description",
    };

    const result = await createItem(itemData);

    // Mutate the returned object
    result.name = "Changed Name";

    // Original stored item should NOT change
    expect(items[0].name).toBe("Clone Test");
  });
});
