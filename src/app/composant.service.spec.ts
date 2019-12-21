import { TestBed } from '@angular/core/testing';

import { ComposantService } from './composant.service';

describe('ComposantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComposantService = TestBed.get(ComposantService);
    expect(service).toBeTruthy();
  });
});
