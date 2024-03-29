import { ShadowDOMUtil } from '../entities/ShadowDOM';
import { FleetProfitCenterExperienceComponent } from './experience/fleet-profit-center/fleet-profit-center.component';
import { UOfMExperienceComponent } from './experience/u-of-m/u-of-m.component';
import { ProfilesComponent } from './profile-component';
import { VarianMedicalSystemComponent } from "./experience/varian-medical-system/varian-medical-system.component";
import { AvatarComponent } from './avatar/avatar-component';

ShadowDOMUtil.registerDOMs([
  AvatarComponent,
  UOfMExperienceComponent,
  FleetProfitCenterExperienceComponent,
  VarianMedicalSystemComponent,
  ProfilesComponent,
]);
