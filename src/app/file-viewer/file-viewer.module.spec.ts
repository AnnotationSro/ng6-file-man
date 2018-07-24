import { FileViewerModule } from './file-viewer.module';

describe('FileViewerModule', () => {
  let fileViewerModule: FileViewerModule;

  beforeEach(() => {
    fileViewerModule = new FileViewerModule();
  });

  it('should create an instance', () => {
    expect(fileViewerModule).toBeTruthy();
  });
});
