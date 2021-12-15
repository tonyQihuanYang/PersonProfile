import { ShadowDOM, ShadowDOMUtil } from '../../entities/ShadowDOM';
import { Marked } from '@ts-stack/markdown';

const _style = ``;
const _html = `
    <div id="markdown-wrapper">
    </div>
`;

export class SharedExperienceComponent extends ShadowDOM {
  static selector = ' ';
  static htmlPath = '';
  static stylePath = '';

  static get observedAttributes() {
    return ['gmif'];
  }

  markDownPath: string;

  constructor({
    markDownPath,
    html,
    style,
  }: {
    markDownPath: string;
    html?: string;
    style?: string;
  }) {
    super({
      html: html || _html,
      style: style || _style,
    });
    this.markDownPath = markDownPath;
  }

  attributeChangedCallback(attr: string, oldValue: any, newValue: any) {
    if (oldValue === newValue) {
      return;
    }
    if (attr == 'gmif') {
      if (newValue == 'false') {
        this.style.display = 'none';
      } else {
        this.style.display = 'block';
      }
    }
  }

  connectedCallback() {
    this.renderMarkdown();
  }

  async renderMarkdown() {
    if (!this.markDownPath) {
      throw 'Missing Mark Down Path';
    }
    try {
      const markdown = await ShadowDOMUtil.loadFile(this.markDownPath);
      const markdownHTML = Marked.parse(markdown);
      const dom = this.gmShadowRoot.getElementById('markdown-wrapper');
      if (dom) {
        dom.innerHTML += markdownHTML;
      }
    } catch (err) {
      throw err;
    }
  }
}

// Ref: https://github.com/evilstreak/markdown-js
