import { TestBed, inject } from '@angular/core/testing';

import { ParsePlainChatService } from './parse-plain-chat.service';

describe('ParsePlainChatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParsePlainChatService]
    });
  });

  it('should be created', inject([ParsePlainChatService], (service: ParsePlainChatService) => {
    expect(service).toBeTruthy();
  }));
});
