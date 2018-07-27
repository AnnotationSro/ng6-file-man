import { SideViewModule } from './side-view.module';

describe('SideViewModule', () => {
  let sideViewModule: SideViewModule;

  beforeEach(() => {
    sideViewModule = new SideViewModule();
  });

  it('should create an instance', () => {
    expect(sideViewModule).toBeTruthy();
  });
});
