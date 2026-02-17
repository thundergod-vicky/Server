import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Patch,
  Delete,
} from '@nestjs/common';
import { PracticeTestsService } from './practice-tests.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePracticeTestDto } from './dto/create-practice-test.dto';

@Controller('practice-tests')
export class PracticeTestsController {
  constructor(private readonly practiceTestsService: PracticeTestsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createPracticeTestDto: CreatePracticeTestDto, @Request() req) {
    return this.practiceTestsService.create(
      req.user.id,
      createPracticeTestDto,
    );
  }

  @Get('teacher')
  @UseGuards(JwtAuthGuard)
  findAllByTeacher(@Request() req) {
    return this.practiceTestsService.findAllByTeacher(req.user.id);
  }

  @Get()
  findAll() {
    return this.practiceTestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.practiceTestsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() createPracticeTestDto: CreatePracticeTestDto,
    @Request() req,
  ) {
    return this.practiceTestsService.update(
      id,
      req.user.id,
      createPracticeTestDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.practiceTestsService.remove(id, req.user.id);
  }

  @Post('results')
  @UseGuards(JwtAuthGuard)
  submitResult(@Body() data: any, @Request() req) {
    return this.practiceTestsService.submitResult(
      req.user.id,
      data.testId,
      data,
    );
  }

  @Get('results/student')
  @UseGuards(JwtAuthGuard)
  findResultsByStudent(@Request() req) {
    return this.practiceTestsService.findResultsByStudent(req.user.id);
  }

  @Get('results/check/:testId')
  @UseGuards(JwtAuthGuard)
  checkResult(@Param('testId') testId: string, @Request() req) {
    return this.practiceTestsService.findResultByStudentAndTest(
      req.user.id,
      testId,
    );
  }
}
