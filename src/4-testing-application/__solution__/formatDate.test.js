import formatDate from "./formatDate";

test("formats date relatively if less than day ago", () => {
  expect(formatDate(new Date().toISOString())).toBe("just now");
  expect(formatDate(new Date(Date.now() - 60 * 1000).toISOString())).toBe(
    "1 minute ago"
  );
  expect(
    formatDate(new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString())
  ).toBe("3 hours ago");
});

test("returns formatted date fallback if more than day ago", () => {
  expect(formatDate(new Date("April 19, 2005").toISOString())).toBe(
    "4/19/2005"
  );
});
