import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketUpdatedEvent } from '@mgptickets/common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    const ticket = await Ticket.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    const { title, price, version } = data;
    const supplyVersion = data.version - 1;
    ticket.set({ title, price, supplyVersion });
    await ticket.save();

    msg.ack();
  }
}
