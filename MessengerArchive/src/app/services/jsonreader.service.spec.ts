import { TestBed, inject } from '@angular/core/testing';

import { JSONReaderService } from './jsonreader.service';

describe('JSONReaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JSONReaderService]
    });
  });

  it('should be created', inject([JSONReaderService], (service: JSONReaderService) => {
    expect(service).toBeTruthy();
  }));
});
