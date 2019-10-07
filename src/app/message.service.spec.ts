import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    const service: MessageService = TestBed.get(MessageService);
    expect(service).toBeTruthy();
  });

  it('should add message', () => {
    const service: MessageService = TestBed.get(MessageService);
    service.add('Sample Message');
    expect(service.messages[0]).toEqual('Sample Message');
  });

  it('should clear messages', () => {
    const service: MessageService = TestBed.get(MessageService);
    service.clear();
    expect(service.messages.length).toEqual(0);
  });
});
