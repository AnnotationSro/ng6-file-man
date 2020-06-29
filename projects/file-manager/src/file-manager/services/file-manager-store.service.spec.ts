import {TestBed} from '@angular/core/testing';

import {FileManagerStoreService} from './file-manager-store.service';

describe('FileManagerStoreService', () => {
  let service: FileManagerStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileManagerStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
