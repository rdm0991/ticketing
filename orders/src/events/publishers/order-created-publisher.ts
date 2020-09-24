import { Publisher, OrderCreatedEvent, Subjects } from '@mgptickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
