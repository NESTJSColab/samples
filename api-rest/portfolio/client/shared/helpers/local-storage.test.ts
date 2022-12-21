import localStorageHelper from "./local-storage";

describe("Local Storage Helper Test", () => {
  it("Should throw and error due to key does not exists", () => {
    expect(() => {
      localStorageHelper.instance().getKey(null);
    }).toThrow();
  });

  it("Should set/get a value successfully", () => {
    interface data {
      value: string;
    }

    localStorageHelper.instance().setKey<data>("foo", { value: "foo" });

    const value = localStorageHelper.instance().getKey<data>("foo");

    expect(value).toStrictEqual({ value: "foo" } as data);
  });
});
