import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from './chat.service';
import { MessageType } from '@prisma/client';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private jwtService: JwtService,
    private chatService: ChatService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token || client.handshake.headers.authorization?.split(' ')[1];
      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token);
      client.data.user = payload;
      
      // Join a room specific to this user
      await client.join(`user_${payload.sub}`);
      console.log(`User connected: ${payload.sub} (socket: ${client.id})`);
    } catch (e) {
      console.error('Socket connection error:', e.message);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    if (client.data.user) {
      console.log(`User disconnected: ${client.data.user.sub}`);
    }
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { receiverId: string; message?: string; mediaUrl?: string; type: MessageType },
  ) {
    const senderId = client.data.user.sub;
    try {
      const message = await this.chatService.createMessage({
        senderId,
        ...data,
      });

      // Emit to receiver's room
      this.server.to(`user_${data.receiverId}`).emit('newMessage', message);
      
      // Emit back to sender (for multi-device sync or acknowledgment)
      this.server.to(`user_${senderId}`).emit('messageSent', message);
      
      return { success: true, message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('sendRequest')
  async handleRequest(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { receiverId: string; firstMessage: string },
  ) {
    const senderId = client.data.user.sub;
    try {
      const request = await this.chatService.sendChatRequest(
        senderId,
        data.receiverId,
        data.firstMessage,
      );

      // Notify the teacher/admin
      this.server.to(`user_${data.receiverId}`).emit('newChatRequest', request);
      
      return { success: true, request };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('typing')
  handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { receiverId: string; isTyping: boolean },
  ) {
    const senderId = client.data.user.sub;
    this.server.to(`user_${data.receiverId}`).emit('userTyping', {
      senderId,
      isTyping: data.isTyping,
    });
  }
}
