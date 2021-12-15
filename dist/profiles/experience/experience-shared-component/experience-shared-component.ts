import { ShadowDOM, ShadowDOMUtil } from '../../../entities/ShadowDOM';
import { Marked } from '@ts-stack/markdown';

const style = '';
const html = `
    <div id="markdown-wrapper">
    </div>
`;

export class ExperienceSharedComponent extends ShadowDOM {
  static selector = 'experience-shared-component';
  static htmlPath = '';
  static stylePath = '';

  static get observedAttributes() {
    return ['gmif'];
  }

  constructor() {
    super({
      html: html,
      style: style,
    });
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

  afterViewInit() {
    this.renderMarkdown();
  }

  async renderMarkdown() {
    const markdown = await ShadowDOMUtil.loadFile(
      'profiles/experience/fleet-profit-center/FleetProfitCenter.md'
    );
    const markdownHTML = Marked.parse(markdown);
    const dom = this.gmShadowRoot.getElementById('markdown-wrapper');
    if (dom) {
      dom.innerHTML += markdownHTML;
    }
  }
}

// Ref: https://github.com/evilstreak/markdown-js
