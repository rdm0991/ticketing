import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@mgptickets/common';

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
