const { convertTimestampToDate, createRef } = require("../db/seeds/utils");

describe("convertTimestampToDate", () => {
  test("returns a new object", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result).not.toBe(input);
    expect(result).toBeObject();
  });
  test("converts a created_at property to a date", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result.created_at).toBeDate();
    expect(result.created_at).toEqual(new Date(timestamp));
  });
  test("does not mutate the input", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    convertTimestampToDate(input);
    const control = { created_at: timestamp };
    expect(input).toEqual(control);
  });
  test("ignores includes any other key-value-pairs in returned object", () => {
    const input = { created_at: 0, key1: true, key2: 1 };
    const result = convertTimestampToDate(input);
    expect(result.key1).toBe(true);
    expect(result.key2).toBe(1);
  });
  test("returns unchanged object if no created_at property", () => {
    const input = { key: "value" };
    const result = convertTimestampToDate(input);
    const expected = { key: "value" };
    expect(result).toEqual(expected);
  });
});

describe("createRef", () => {
  test("function returns an object", () => {
    //arrange
    const testArray = [];
    const testKey1 = "";
    const testKey2 = "";
    //act
    const testResult = createRef(testArray, testKey1, testKey2);
    //assert
    expect(typeof testResult).toEqual("object");
    expect(Array.isArray(testResult)).toBe(false);
  });

  test("function returns an empty object when an empty array is passed", () => {
    //arrange
    const testArray = [];
    const testKey1 = "";
    const testKey2 = "";
    //act
    const testResult = createRef(testArray, testKey1, testKey2);
    //assert
    expect(testResult).toEqual({});
  });

  test("function converts input keys to a key-value pair when an array containing one object", () => {
    //arrange
    const testArray = [{ number: 1, colour: "green" }];
    const testKey1 = "number";
    const testKey2 = "colour";
    //act
    const testResult = createRef(testArray, testKey1, testKey2);
    //assert
    expect(testResult).toEqual({ 1: "green" });
  });

  test("function converts input keys to multiple key-value pair when an array contains multiple objects", () => {
    //arrange
    const testArray = [
      { number: 1, colour: "green" },
      { number: 2, colour: "blue" },
      { number: 3, colour: "black" },
    ];
    const testKey1 = "number";
    const testKey2 = "colour";
    //act
    const testResult = createRef(testArray, testKey1, testKey2);
    //assert
    expect(testResult).toEqual({ 1: "green", 2: "blue", 3: "black" });
  });

  test("function does not mutate input", () => {
    //arrange
    const testArray = [];
    const testKey1 = "";
    const testKey2 = "";
    const control = []
    //act
    createRef(testArray, testKey1, testKey2);
    //assert
    expect(testArray).toEqual(control);
  });
});
