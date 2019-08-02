import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';

@Injectable()
export class HubService {

  constructor(private socket: Socket) {
  }

  public connectionToQueue(queueName): Observable<any> {
    return this.socket
      .fromEvent(queueName)
      .pipe(
        map((data: any) => data)
      );
  }

  public sendMessage(queueName: string, message?: any): void {
    console.log(`Message send to queue : ${queueName}`, message);
    this.socket.emit(queueName, message);
  }
}
