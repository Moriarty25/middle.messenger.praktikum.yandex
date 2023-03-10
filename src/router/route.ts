import Block from "../utils/Block";
import { render } from "../utils/render";

export default class Route {
  public _pathname: string;

  public title: string;

  private _block: Block | null;

  private _blockClass: typeof Block;

  private _props: Record<string, any>;

  // eslint-disable-next-line max-len
  constructor(pathname: string, title: string, view: typeof Block, props: Record<string, any>) {
    this._pathname = pathname;

    this._blockClass = view;
    this._block = null;
    this._props = props;
    this.title = title;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      this._block.element!.remove();
      this._block = null;
    }
  }

  match(pathname: string): boolean {
    return pathname === this._pathname;
  }

  render(): void {
    if (!this._block) {
      document.title = this.title;

      this._block = new (this._blockClass as any)();
      render(this._props.rootQuery, this._block!);
      return;
    }

    this._block.show();
  }
}
