test("learning jest matchers", () => {
    expect(1 + 1).toBe(2);
    expect(1 + 1).not.toBe(3);
    expect(1 + 1).toBeGreaterThan(1);
    expect(1 + 1).toBeLessThan(3);
    expect(1 + 1).toBeGreaterThanOrEqual(2);
    expect(1 + 1).toBeLessThanOrEqual(2);
    expect(1 + 1).toBeCloseTo(2.1);
});

test.skip("skipping test", () => {
    expect(true).toBeTruthy();
});
