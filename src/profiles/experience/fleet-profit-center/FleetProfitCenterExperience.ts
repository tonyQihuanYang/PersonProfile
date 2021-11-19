import { ShadowDOM, ShadowDOMUtil } from '../../../entities/ShadowDOM';
import { Marked } from '@ts-stack/markdown';

const style = `

`;

const html = `
    <div id="markdown-wrapper">
    </div>
`;

export class FleetProfitCenterExperienceComponent extends ShadowDOM {
  static selector = 'fleet-profit-center-experience-component';
  static htmlPath = '';
  static stylePath = '';

  constructor() {
    super({
      html: html,
      style: style,
    });
    console.log("what happen >???");
  }

  afterViewInit() {
    console.log('afterViewInit - fpc');
    this.renderMarkdown();
  };

  async renderMarkdown() {
    const markdown = await ShadowDOMUtil.loadFile('profiles/experience/fleet-profit-center/FleetProfitCenter.md');
    const markdownHTML = Marked.parse(markdown);
    const dom = this.gmShadowRoot.getElementById('markdown-wrapper');
    if (dom) {
      dom.innerHTML += markdownHTML;
    }
  }
}

// Ref: https://github.com/evilstreak/markdown-js