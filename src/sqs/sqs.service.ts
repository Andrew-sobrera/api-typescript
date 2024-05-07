import { Injectable } from '@nestjs/common';
import { SQS } from 'aws-sdk';

@Injectable()
export class SqsSenderService {
  private readonly sqs: SQS;

  constructor() {
    this.sqs = new SQS({ region: 'us-east-1' }); // Substitua pela sua região AWS
  }

  async sendMessageToQueue(message: string, delaySeconds: number): Promise<void> {
    const queueUrl = 'https://sqs.us-east-1.amazonaws.com/905418208901/sqsAws'; // Substitua pela URL da sua fila SQS
    const params: SQS.Types.SendMessageRequest = {
      QueueUrl: queueUrl,
      MessageBody: message,
      DelaySeconds: delaySeconds,
    };
    await this.sqs.sendMessage(params).promise();
  }
}
