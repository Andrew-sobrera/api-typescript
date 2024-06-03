// app.listener.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class TaskListener {
    constructor(private httpService: HttpService) {}

 @OnEvent('create.task')
  async handleEvent(payload: any) {
    try {
      const response = await this.httpService.post('http://localhost:3000', payload).toPromise();
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  }
}
