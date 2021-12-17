import { SharedExperienceComponent } from '../shared-experience.component';

export class VarianMedicalSystemComponent extends SharedExperienceComponent {
    static selector = 'varian-medical-system-experience-component';
    static htmlPath = '';
    static stylePath = '';

    constructor() {
        super({
            markDownPath:
                'profiles/experience/varian-medical-system/varianMedicalSystem.md'
        });
    }
}
