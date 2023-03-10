import { expect } from "chai";
import { it } from "mocha";
import Sinon from "sinon";
import Block from "../utils/Block";
import Router from "./router";

class MockPage extends Block {
  render() {
    return new DocumentFragment();
  }
}

const routerMock = new Router("#root");

describe("Router", () => {
  beforeEach(() => {
    window.history.forward = Sinon.fake();
    window.history.back = Sinon.fake();
  });

  it("should return Router instance", () => {
    const result = routerMock.use("/test", "Title", MockPage);
    expect(result).equal(routerMock);
  });

  it("should go to page along the path", () => {
    routerMock
      .use("/", "title", MockPage)
      .use("/authPage", "title auth", MockPage);
    routerMock.go("/");
    expect(window.location.pathname).equal("/");
  });

  it("should call .back()", () => {
    routerMock.back();
    expect((window.history.back as Record<string, any>).callCount).to.eq(1);
  });

  it("should call .forward()", () => {
    routerMock.forward();
    expect((window.history.forward as Record<string, any>).callCount).to.eq(1);
  });
});
