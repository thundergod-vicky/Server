import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

interface RequestWithUser {
  user: {
    userId?: string;
    id?: string;
    sub?: string;
    role?: string;
  };
}

@ApiTags('Chat')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('messages/:contactId')
  @ApiOperation({ summary: 'Get messages between two users' })
  async getMessages(
    @Request() req: RequestWithUser,
    @Param('contactId') contactId: string,
  ) {
    const userId = req.user.userId || req.user.id || req.user.sub || '';
    return this.chatService.getMessages(userId, contactId);
  }

  @Get('contacts')
  @ApiOperation({ summary: 'Get list of active chat contacts' })
  async getChatList(@Request() req: RequestWithUser) {
    const userId = req.user.userId || req.user.id || req.user.sub || '';
    return this.chatService.getChatList(userId);
  }

  @Get('requests')
  @ApiOperation({ summary: 'Get pending message requests (Teachers only)' })
  async getPendingRequests(@Request() req: RequestWithUser) {
    const userId = req.user.userId || req.user.id || req.user.sub || '';
    return this.chatService.getPendingRequests(userId);
  }

  @Get('sent-requests')
  @ApiOperation({ summary: 'Get sent message requests' })
  async getSentRequests(@Request() req: RequestWithUser) {
    const userId = req.user.userId || req.user.id || req.user.sub || '';
    return this.chatService.getSentRequests(userId);
  }

  @Post('request/:id/handle')
  @ApiOperation({ summary: 'Approve or Reject a message request' })
  async handleRequest(
    @Param('id') requestId: string,
    @Body() body: { status: 'APPROVED' | 'REJECTED' },
  ) {
    return this.chatService.handleRequest(requestId, body.status);
  }
}
