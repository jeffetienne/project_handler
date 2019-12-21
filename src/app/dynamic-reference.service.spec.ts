import { TestBed } from '@angular/core/testing';

import { DynamicReferenceService } from './dynamic-reference.service';

describe('DynamicReferenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DynamicReferenceService = TestBed.get(DynamicReferenceService);
    expect(service).toBeTruthy();
  });
});
