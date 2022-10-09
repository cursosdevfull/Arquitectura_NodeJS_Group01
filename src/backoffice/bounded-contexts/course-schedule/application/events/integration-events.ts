export class IntegrationEvent {
  subject: string;
  data: Record<string, string>;
}

export interface IntegrationEventPublisher {
  publish(event: IntegrationEvent): Promise<void>;
}

export enum IntegrationEventSubject {
  SESSION_CREATED = 'session.created',
}
