import { TestBed, inject } from '@angular/core/testing';

import { NodeClickedService } from './node-clicked.service';

describe('NodeClickedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodeClickedService]
    });
  });

  it('should be created', inject([NodeClickedService], (service: NodeClickedService) => {
    expect(service).toBeTruthy();
  }));
});
