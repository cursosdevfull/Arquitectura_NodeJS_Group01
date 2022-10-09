import * as AWS from 'aws-sdk';
import { AppService, SQSConfig } from 'src/app.service';

import { IntegrationEvent, IntegrationEventPublisher } from '../../application/events/integration-events';

export class SQSEventPublisher implements IntegrationEventPublisher {
  private readonly config: SQSConfig;
  private readonly sqs: AWS.SQS;

  constructor() {
    this.config = AppService.SQS_EVENT_CONFIG;
    this.sqs = new AWS.SQS({ region: this.config.region });
  }

  async publish(event: IntegrationEvent): Promise<void> {
    const params = {
      QueueUrl: this.config.url,
      MessageBody: JSON.stringify(event.data),
    };

    this.sqs.sendMessage(params).promise();
  }
}
