import { FileManagerModule } from './file-manager.module';

describe('FileManagerModule', () => {
  let fileManagerModule: FileManagerModule;

  beforeEach(() => {
    fileManagerModule = new FileManagerModule();
  });

  it('should create an instance', () => {
    expect(fileManagerModule).toBeTruthy();
  });
});
