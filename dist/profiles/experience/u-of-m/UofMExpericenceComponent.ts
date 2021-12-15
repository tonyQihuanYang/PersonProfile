import { SharedExperienceComponent } from '../shared-experience.component';

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

export class UofMExpericenComponent extends SharedExperienceComponent {
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