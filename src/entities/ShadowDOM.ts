interface DomObject {
  html?: string;
  style?: string;
  htmlPath?: string;
  stylePath?: string;
}

export class ShadowDOM extends HTMLElement {
  private _html: string = '';
  private _style: string = '';
  private _shadowRoot: ShadowRoot;

  constructor({ html, style, htmlPath, stylePath }: DomObject) {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this.render({ html, style, htmlPath, stylePath });
  }

  /** Life cycle */
  afterViewInit(): void {}

  attributeChangedCallback(attrName: string, oldVal: any, newVal: any): void {
    console.log('attributeChangedCallback');
    console.log(attrName);
    console.log(oldVal);
    console.log(newVal);
  }

  get gmShadowRoot(): ShadowRoot {
    return this._shadowRoot;
  }

  private async render({ html, style, htmlPath, stylePath }: DomObject) {
    if (html) {
      this._html = html;
    }

    if (style) {
      this._style = style;
    }

    if (htmlPath) {
      this._html = await ShadowDOMUtil.loadHTML(htmlPath);
    }

    if (stylePath) {
      this._style = await ShadowDOMUtil.loadCSS(stylePath);
    }

    this._shadowRoot.innerHTML = ShadowDOMUtil.concatInnerHTML(
      this._html,
      this._style
    );

    if (this.getAttribute('gmIf') == 'false') {
      this.style.display = 'none';
    }

    this._afterViewInit();
  }

  private async _afterViewInit(): Promise<void> {
    try {
      await this.afterViewInit();
    } catch (errAfterViewInit) {
      console.error('Error in afterViewInit', errAfterViewInit);
    }
  }
}

export class ShadowDOMUtil {
  static concatInnerHTML(html?: string, style?: string): string {
    let innerHTML = html || '';
    if (style) {
      innerHTML = `<style>${style}</style>` + innerHTML;
    }
    return innerHTML;
  }

  static registerDOMs(doms: any[]): void {
    doms.forEach((dom) => {
      if (dom.selector) {
        customElements.define(dom.selector, dom);
      } else {
        console.error('Could not defined DOM', dom as CustomElementConstructor);
      }
    });
  }

  static registerDOM(
    selector: string,
    element: CustomElementConstructor
  ): void {
    if (customElements.get(selector)) {
      console.warn(`Element ${selector} has been defined`);
    }
    customElements.define(selector, element);
  }

  static async addCss(path: string) {
    const style = await ShadowDOMUtil.loadCSS(path);
    if (style) {
      let node = document.createElement('style');
      node.innerHTML = style;
      document.body.appendChild(node);
    }
  }

  static loadCSS(path: string): Promise<string> {
    return ShadowDOMUtil.loadFile(path);
  }

  static loadHTML(path: string): Promise<string> {
    return ShadowDOMUtil.loadFile(path);
  }

  static loadFile(path: string): Promise<string> {
    return fetch(path)
      .then((response) => response.text())
      .catch((error) => {
        console.warn(error);
        return '';
      });
  }
}

// Ref: https://developers.google.com/web/fundamentals/web-components/best-practices
// Ref: https://www.zhangxinxu.com/wordpress/2021/02/web-components-import-css/
// Ref: https://www.hashbangcode.com/article/using-shadow-dom
