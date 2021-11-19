import { ShadowDOM } from '../../entities/ShadowDOM';
const style = `
.avatar {
    vertical-align: middle;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
`;

const html = `
    <img src="https://www.w3schools.com/w3images/avatar2.png" alt="Avatar" class="avatar">
`;

export class AvatarComponent extends ShadowDOM {
  static selector = 'avatar-component';
  static htmlPath = '';
  static stylePath = '';

  constructor() {
    super({
      html: html,
      style: style,
    });
  }
}
