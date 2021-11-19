import { ShadowDOM } from '../ShadowDOM';

const style = `
    .red {
        color: red;
    }
`;

const html = `
    <div class="red">
        This is my experience in FPC
    </div>
`;

export class FleetProfitCenterExperience extends ShadowDOM {
  constructor() {
    super({
      html: html,
      style: style,
    });
  }
}
// customElements.define('fleet-profit-center-experience', FleetProfitCenter);

// export class MyCustomShadowDom extends HTMLElement {
//   //   shadow: ShadowRoot;
//   private html: string = '';
//   private css: string = '';

//   constructor() {
//     super();
//     const shadowRoot = this.attachShadow({ mode: 'open' });
//     shadowRoot.innerHTML = html;
//   }

//   static register(): void {
//     customElements.define('fleet-profit-center', MyCustomShadowDom);
//   }

//   //   connectedCallback() {
//   //     // const shadowRoot = this.attachShadow({mode: 'open'});
//   //     // shadowRoot.innerHTML = html;
//   //   }
// }
// MyCustomShadowDom.register();

// customElements.define('fleet-profit-center', MyCustomShadowDom);
