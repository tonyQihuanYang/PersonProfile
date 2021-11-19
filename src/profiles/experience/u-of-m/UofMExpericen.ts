import { ShadowDOM } from '../../../entities/ShadowDOM';

const style = `
    .red {
        color: red;
    }
`;

const html = `
    <div class="red">
        This is my experience in U of M
    </div>
`;

export class UofMExpericenComponent extends ShadowDOM {
  static selector = 'u-of-m-experience-component';
  static htmlPath = '';
  static stylePath = '';

  constructor() {
    super({
      html: html,
      style: style,
    });
  }
}