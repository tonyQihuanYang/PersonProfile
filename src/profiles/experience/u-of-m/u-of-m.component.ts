import { SharedExperienceComponent } from '../shared-experience.component';

export class UOfMExperienceComponent extends SharedExperienceComponent {
  static selector = 'u-of-m-experience-component';
  static htmlPath = '';
  static stylePath = '';

  constructor() {
    super({
      markDownPath: 'profiles/experience/u-of-m/UofM.md',
    });
  }
}
