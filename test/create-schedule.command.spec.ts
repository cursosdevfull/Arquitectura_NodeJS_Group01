import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateScheduleCommand,
  CreateScheduleCommandHandler,
} from 'src/backoffice/bounded-contexts/course-schedule/application/commands/create-schedule.command';
import { ScheduleWordsEnoughException } from 'src/backoffice/bounded-contexts/course-schedule/domain/exceptions/schedule-subject';
import { ScheduleInfrastructure } from 'src/backoffice/bounded-contexts/course-schedule/infrastructure/schedule.infrastructure';
import { DomainExceptionCode } from 'src/core/domain/exceptions/domain.exception';

let moduleRef: TestingModule;
let createScheduleCommandHandler: any;

describe('CreateScheduleCommandHandler', () => {
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [CreateScheduleCommandHandler, ScheduleInfrastructure],
    })
      .overrideProvider(ScheduleInfrastructure)
      .useValue({
        save: jest.fn().mockResolvedValueOnce({
          value: {
            properties: jest.fn().mockReturnValue({
              scheduleId: {
                value: '25093e26-5cb8-46aa-be11-3f3a97fe6a6f',
                courseId: '33dc7d6e-15bb-434f-8c1c-ede5f9898aab',
                subject: 'Curso de NodeJS desde cero',
                status: 'activo',
              },
            }),
          },
          isErr: () => false,
        }),
      })
      .compile();

    createScheduleCommandHandler = moduleRef.get<CreateScheduleCommandHandler>(
      CreateScheduleCommandHandler,
    );
  });

  test('Validaciones correctas', async () => {
    // Arrange
    const command = new CreateScheduleCommand(
      'e176d11f-edbb-41dc-818d-4142344da063',
      'Curso de NodeJS Pro desde cero',
      'Activo',
    );

    // Act
    const result = await createScheduleCommandHandler.execute(command);

    // Assert
    expect(result).toHaveProperty('scheduleId');
    expect(result).toHaveProperty('courseId');
    expect(result).toHaveProperty('subject');
    expect(result).toHaveProperty('status');
  });

  test('Validaciones incorrectas', async () => {
    try {
      // Arrange
      const command = new CreateScheduleCommand(
        'e176d11f-edbb-41dc-818d-4142344da063',
        'Curso de NodeJS Pro',
        'Activo',
      );

      await createScheduleCommandHandler.execute(command);
    } catch (error) {
      const { response } = error;

      expect(error).toBeInstanceOf(BadRequestException);
      expect(response.message).toBe(ScheduleWordsEnoughException.getMessage());
      expect(response.error).toBe(
        DomainExceptionCode.SCHEDULE_WORDS_ENOUGH_EXCEPTION,
      );
      expect(response.statusCode).toBe(400);
    }
  });
});
