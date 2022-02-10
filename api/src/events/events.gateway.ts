import { UseGuards } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';



@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  
  handleDisconnect(client: any) {

    console.log( "disconnect from " , client.id );
   

  //  throw new Error('Method not implemented.');
  }

  @WebSocketServer()
  server: Server;

  /*
  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    console.log( "evenets ")
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }*/

  @SubscribeMessage('message')
  message(@MessageBody() data: string ):  Observable<WsResponse<any>> | any  {
    console.log( "in message " , data )
    this.server.emit("message" , "valeur du serveur ");
   
  }
   

  handleConnection(client: any, ...args: any[]) {
    console.log( "connection.....", client.id );
    this.server.to(client.id).emit('message', "message to " +  client.id  );
  }


}