import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleController } from '../src/backoffice/bounded-contexts/course-schedule/interfaces/http/schedule.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateScheduleCommandHandler } from '../src/backoffice/bounded-contexts/course-schedule/application/commands/create-schedule.command';
import { DeleteScheduleCommandHandler } from 'src/backoffice/bounded-contexts/course-schedule/application/commands/delete-schedule.command';
import { ValidationPipe } from '@nestjs/common';
import { CreateScheduleDTO } from 'src/backoffice/bounded-contexts/course-schedule/interfaces/http/dtos/create-schedule.dto';
import { ScheduleCreateResponse } from '../dist/backoffice/bounded-contexts/course-schedule/application/dtos/schedule-response.dto';
import { ScheduleInfrastructure } from 'src/backoffice/bounded-contexts/course-schedule/infrastructure/schedule.infrastructure';
import { DeleteScheduleDTO } from 'src/backoffice/bounded-contexts/course-schedule/interfaces/http/dtos/delete-schedule.dto';

let controller: ScheduleController;
let moduleRef: TestingModule;
let handler: CreateScheduleCommandHandler;
let handlerInfra: DeleteScheduleCommandHandler;

describe('ScheduleController', () => {
  beforeAll(async () => {
    jest.resetModules();
    jest.resetAllMocks();

    moduleRef = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        CreateScheduleCommandHandler,
        DeleteScheduleCommandHandler,
        {
          provide: ScheduleInfrastructure,
          useValue: {
            save: jest.fn().mockResolvedValueOnce({
              value: {
                properties: jest.fn().mockReturnValue({
                  scheduleId: {
                    value: '4bf6ffb5-ebe0-443e-9f58-9b14162d3e58',
                  },
                  courseId: '23380379-9509-4cbd-b427-bbc5a6ca3e4b',
                  subject: 'Curso de NestJS Pro desde Cero',
                  status: 'Activo',
                }),
              },
              isErr: () => false,
            }),
          },
        },
      ],
      controllers: [ScheduleController],
    }).compile();

    const app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    controller = moduleRef.get<ScheduleController>(ScheduleController);
    handler = moduleRef.get<CreateScheduleCommandHandler>(
      CreateScheduleCommandHandler,
    );
    handlerInfra = moduleRef.get<DeleteScheduleCommandHandler>(
      DeleteScheduleCommandHandler,
    );

    await app.init();
  });

  test('Validaciones correctas', async () => {
    // Arrange
    const bodyParams = new CreateScheduleDTO();
    bodyParams.courseId = '23380379-9509-4cbd-b427-bbc5a6ca3e4b';
    bodyParams.subject = 'Curso de NestJS Pro desde Cero';
    bodyParams.status = 'Activo';

    // Act
    const result = (await controller.create(
      bodyParams,
    )) as ScheduleCreateResponse;

    // Assert
    expect(result.courseId).toBe('23380379-9509-4cbd-b427-bbc5a6ca3e4b');
    expect(result.subject).toBe('Curso de NestJS Pro desde Cero');
    expect(result.status).toBe('Activo');
    expect(result.scheduleId).toBe('4bf6ffb5-ebe0-443e-9f58-9b14162d3e58');
  });

  test('Validaciones incorrectas', async () => {
    jest.spyOn(handlerInfra, 'execute').mockResolvedValueOnce({
      value: {
        properties: jest.fn().mockReturnValue({
          scheduleId: {
            value: '4bf6ffb5-ebe0-443e-9f58-9b14162d3e58',
          },
          courseId: '23380379-9509-4cbd-b427-bbc5a6ca3e4b',
          subject: 'Curso de NestJS Pro desde Cero',
          status: 'Activo',
        }),
      },
      isErr: () => false,
    });

    const params = new DeleteScheduleDTO();
    params.scheduleId = '4bf6ffb5-ebe0-443e-9f58-9b14162d3e58';

    const result = await controller.delete(params);

    expect(result).toBe('ok');
    expect(handlerInfra.execute).toHaveBeenCalled();
  });
});
