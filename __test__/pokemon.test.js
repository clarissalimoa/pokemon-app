test("randoming number for catch probability", () => {
  var value = Math.floor(Math.random() * 2);
  expect(value).toBeGreaterThan(-1);
  expect(value).toBeLessThan(2);
});
