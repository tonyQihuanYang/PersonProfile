import { ShadowDOM } from '../entities/ShadowDOM';

export enum TemplateNames {
  University = 'UOFM',
  FleetProfitCenter = 'FPC',
  Varian = 'VARIAN',
}

export class ProfilesComponent extends ShadowDOM {
  static selector = 'profile-entry';
  static htmlPath = '';
  static stylePath = '';

  private overlayID = 'OVERLAY-ROOT';
  private closeButtonID = 'CLOSE-BUTTON';
  private overlayContentID = 'OVERLAY-CONTENT';

  private readonly TemplateComponents = {
    [TemplateNames.University]: 'u-of-m-experience-component',
    [TemplateNames.FleetProfitCenter]:
      'fleet-profit-center-experience-component',
    [TemplateNames.Varian]: 'u-of-m-experience-component',
  };

  constructor() {
    super({
      htmlPath: 'profiles/profile-component.html',
      stylePath: 'profiles/profile-component.css',
    });
  }

  afterViewInit(): void {
    this.initialize();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  static showTemplate(element: HTMLElement, templateName: TemplateNames): void {
    element.dispatchEvent(
      new CustomEvent('show', { detail: { templateName } })
    );
  }

  private initialize(): void {
    this.initCloseBtnEvent();
    this.initShowEvent();
  }

  private initShowEvent(): void {
    this.addEventListener('show', this._showTemplate);
  }

  private initCloseBtnEvent(): void {
    this.closeButtonDOM &&
      this.closeButtonDOM.addEventListener('click', () => this._onClose());
  }

  private removeEventListeners(): void {
    // console.log("removeEventListeners ???");
    // this.closeButtonDOM &&
    //   this.closeButtonDOM.removeEventListener('click', this._onClose);
    this.removeEventListener('show', this._showTemplate);
  }

  private get closeButtonDOM(): HTMLElement | null {
    return this.gmShadowRoot.getElementById(this.closeButtonID);
  }

  private get overlayDOM(): HTMLElement | null {
    return this.gmShadowRoot.getElementById(this.overlayID);
  }

  private _showTemplate(e: Event): void {
    const templateName = (e as CustomEvent).detail?.templateName;
    if (this.overlayDOM) {
      this.overlayDOM.style.width = '100%';
      this.toggleTemplate(templateName);
    }
  }

  private toggleTemplate(template: TemplateNames): void {
    const dom =
      this.TemplateComponents[template] &&
      this.shadowRoot?.querySelector(this.TemplateComponents[template]);
    dom && dom.setAttribute('gmIf', 'true');
  }

  private _onClose(): void {
    if (this.overlayDOM) {
      this.overlayDOM.style.width = '0%';
      this.hideAllTemplates();
    }
  }

  private hideAllTemplates(): void {
    for (let [_, templateName] of Object.entries(this.TemplateComponents)) {
      this.shadowRoot
        ?.querySelector(templateName)
        ?.setAttribute('gmIf', 'false');
    }
  }
}
