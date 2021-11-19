import { ShadowDOM } from '../ShadowDOM';

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

export class UofMExpericen extends ShadowDOM {
  constructor() {
    super({
      html: html,
      style: style,
    });
  }
}