import { TestBed } from '@angular/core/testing';

import { ScoreTransService } from './score-trans.service';

describe('ScoreTransService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScoreTransService = TestBed.get(ScoreTransService);
    expect(service).toBeTruthy();
  });
});
