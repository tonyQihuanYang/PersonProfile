import { SharedExperienceComponent } from '../shared-experience.component';

export class FleetProfitCenterExperienceComponent extends SharedExperienceComponent {
  static selector = 'fleet-profit-center-experience-component';
  static htmlPath = '';
  static stylePath = '';

  constructor() {
    super({
      markDownPath:
        'profiles/experience/fleet-profit-center/FleetProfitCenter.md',
    });
  }
}
