import { ShadowDOM } from '../entities/ShadowDOM';

export class ProfilesComponent extends ShadowDOM {
  static selector = 'profile-entry';
  static htmlPath = '';
  static stylePath = '';

  private overlayID = 'OVERLAY-ROOT';
  private closeButtonID = 'CLOSE-BUTTON';
  private overlayContentID = 'OVERLAY-CONTENT';
  constructor() {
    super({
      htmlPath: 'profiles/profile-component.html',
      stylePath: 'profiles/profile-component.css',
    });
  }

  afterViewInit(): void {
    console.log('afterViewInit - profile');
    this.initialize();
  }

  disconnectedCallback() {
    console.log('disconnectedCallback');
    this.removeEventListeners();
  }

  static showTemplate(element: HTMLElement, templateName: string): void {
    element.dispatchEvent(
      new CustomEvent('show', { detail: { templateName } })
    );
  }

  private initialize(): void {
    this.initCloseBtnEvent();
    this.initShowEvent();
  }

  private initShowEvent(): void {
    this.addEventListener('show', this._onShow);
  }

  private initCloseBtnEvent(): void {
    this.closeButtonDOM &&
      this.closeButtonDOM.addEventListener('click', () => this._onClose());
  }

  private removeEventListeners(): void {
    // console.log("removeEventListeners ???");
    // this.closeButtonDOM &&
    //   this.closeButtonDOM.removeEventListener('click', this._onClose);
    this.removeEventListener('show', this._onShow);
  }

  private get closeButtonDOM(): HTMLElement | null {
    return this.gmShadowRoot.getElementById(this.closeButtonID);
  }

  private get overlayDOM(): HTMLElement | null {
    return this.gmShadowRoot.getElementById(this.overlayID);
  }

  private _onShow(e: Event): void {
    const templateName = (e as CustomEvent).detail?.templateName || '';
    if (!templateName) {
      return;
    }
    console.log(this);
    this.show(templateName);
  }

  private show(_thing: string): void {
    if (this.overlayDOM) {
      this.overlayDOM.style.width = '100%';
    }
  }

  private _onClose(): void {
    if (this.overlayDOM) {
      this.overlayDOM.style.width = '0%';
    }
  }
}
