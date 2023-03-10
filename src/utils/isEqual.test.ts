import { expect } from "chai";
import { describe, it } from "mocha";
import isEqual from "./isEqual";

describe("isEqual", () => {
  const user1 = {
    avatar: "png",
    name: "Robin",
  };
  const user2 = {
    avatar: "png",
    name: "Robin",
  };
  const user3 = {
    avatar: "png",
    name: "Dave",
    id: 5,
  };

  it("should return true, if objects is equal", () => {
    expect(isEqual(user1, user2)).eq(true);
  });
  it("should return false, if objects is not equal", () => {
    expect(isEqual(user3, user2)).eq(false);
  });
});
