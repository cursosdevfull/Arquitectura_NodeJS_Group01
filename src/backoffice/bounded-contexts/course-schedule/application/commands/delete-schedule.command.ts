import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

export class DeleteScheduleCommand implements ICommand {
  constructor(public readonly scheduleId: string) {}
}

@CommandHandler(DeleteScheduleCommand)
export class DeleteScheduleCommandHandler
  implements ICommandHandler<DeleteScheduleCommand, any>
{
  execute(command: DeleteScheduleCommand): Promise<any> {
    console.log(command);
    return Promise.resolve();
  }
}
