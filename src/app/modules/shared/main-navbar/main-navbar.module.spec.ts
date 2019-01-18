import { MainNavbarModule } from './main-navbar.module';

describe('MainNavbarModule', () => {
  let mainNavbarModule: MainNavbarModule;

  beforeEach(() => {
    mainNavbarModule = new MainNavbarModule();
  });

  it('should create an instance', () => {
    expect(mainNavbarModule).toBeTruthy();
  });
});
