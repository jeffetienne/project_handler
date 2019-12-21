import { TestBed } from '@angular/core/testing';

import { FormulaireService } from './formulaire.service';

describe('FormulaireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormulaireService = TestBed.get(FormulaireService);
    expect(service).toBeTruthy();
  });
});
