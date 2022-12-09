import { TestBed } from '@angular/core/testing';

import { HistoryUniquesService } from './uniques.service';

describe('HistoryUniquesService', () => {
  let service: HistoryUniquesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryUniquesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
