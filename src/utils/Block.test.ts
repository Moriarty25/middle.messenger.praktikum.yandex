/* eslint-disable import/no-extraneous-dependencies */
import { expect } from "chai";
import { it } from "mocha";
import Block from "./Block";
import { render } from "./render";

const sinon = require("sinon");

describe("Block", () => {
  const renderMock = sinon.fake.returns(document.createElement("div"));
  const componentDidMountMock = sinon.fake();

  class ComponentMock extends Block {
    render = renderMock;

    componentDidMount = componentDidMountMock;
  }

  it("should call .render() after .setProps()", () => {
    const childMock = new ComponentMock();

    childMock.setProps({
      message: "test",
    });

    expect(renderMock.callCount).to.eq(1);
  });

  it("should call .componentDidMount() after mount to DOM", () => {
    const childMock = new ComponentMock();

    render("#root", childMock);

    expect(componentDidMountMock.callCount).to.eq(1);
  });
});
