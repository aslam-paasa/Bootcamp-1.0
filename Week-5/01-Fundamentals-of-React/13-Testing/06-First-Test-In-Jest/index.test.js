const { add } = require('./index');

test("it should add two numbers", () => {
    const sum = add(3, 2);
    expect(sum).toBe(5);
  });

