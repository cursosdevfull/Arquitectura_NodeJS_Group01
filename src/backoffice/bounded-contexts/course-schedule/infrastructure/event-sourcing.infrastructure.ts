import { EventSourcing } from '../domain/entities/event-sourcing';
import { EventSourcingRepository } from '../domain/repositories/event-sourcing.repository';
import { EventSourcingModel } from './models/event-sourcing';

export class EventSourcingInfrastructure implements EventSourcingRepository {
  async list(): Promise<any[]> {
    return await EventSourcingModel.find(
      { timestamp: { $gt: 1665272684056 } },
      null,
      {
        sort: { timestamp: 1 },
      },
    );
  }
  async save(event: EventSourcing): Promise<void> {
    await EventSourcingModel.create(event);
  }
}
