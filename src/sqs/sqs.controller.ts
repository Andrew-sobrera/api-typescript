import { Controller, Post, Body } from '@nestjs/common';
import { SqsSenderService } from './sqs.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly sqsSenderService: SqsSenderService) {}

  @Post()
  async sendMessageToQueue(@Body() body: { message: string }): Promise<void> {
    const { message } = body;
    console.log(message)
    await this.sqsSenderService.sendMessageToQueue(message, 120);
  }
}
