const { capitalize, double, filterEven, sum, average } = require('./index');

describe("index", () => {
    describe("capitalize", () => {
        test("capitalizes the first letter of a string", () => {
            expect(capitalize("hello")).toBe("Hello");
            expect(capitalize("world")).toBe("World");
        });

        test("returns an empty string if input is empty", () => {
            expect(capitalize("")).toBe("");
        });
    });

    describe("double", () => {
        test("doubles each number in an array", () => {
            expect(double([1, 2, 3, 4, 5])).toEqual([2, 4, 6, 8, 10]);
        });

        test("returns an empty array if input is empty", () => {
            expect(double([])).toEqual([]);
        });
    });

    describe("filterEven", () => {
        test("filters out even numbers from an array", () => {
            expect(filterEven([1, 2, 3, 4, 5])).toEqual([2, 4]);
        });

        test("returns an empty array if no even numbers are found", () => {
            expect(filterEven([1, 3, 5, 7, 9])).toEqual([]);
        });
    });

    describe("sum", () => {
        test("calculates the sum of numbers in an array", () => {
            expect(sum([1, 2, 3, 4, 5])).toBe(15);
        });

        test("returns 0 for an empty array", () => {
            expect(sum([])).toBe(0);
        });
    });

    describe("average", () => {
        test("calculates the average of numbers in an array", () => {
            expect(average([1, 2, 3, 4, 5])).toBe(3);
        });

        test("returns NaN for an empty array", () => {
            expect(average([])).toBeNaN();
        });
    });
})