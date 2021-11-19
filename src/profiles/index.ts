import { ShadowDOMUtil } from '../entities/ShadowDOM';
import { FleetProfitCenterExperienceComponent } from './experience/fleet-profit-center/FleetProfitCenterExperience';
import { UofMExpericenComponent } from './experience/u-of-m/UofMExpericen';
import { ProfilesComponent } from './profile-component';
import { AvatarComponent } from './avatar/avatar-component';

ShadowDOMUtil.registerDOMs([
  AvatarComponent,
  UofMExpericenComponent,
  FleetProfitCenterExperienceComponent,
  ProfilesComponent,
]);
