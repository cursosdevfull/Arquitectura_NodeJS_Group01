import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EntityManager } from 'typeorm';

import { AppService } from './app.service';
import { Car } from './unit-of-work/entities/Car.entity';
import { UnitOfWork } from './unit-of-work/entities/uow';
import { User } from './unit-of-work/entities/User.entity';

@Controller()
export class AppController {
  @Get()
  async getHello(): Promise<string> {
    const uow: UnitOfWork = new UnitOfWork(AppService.manager);
    await uow.start();

    const work = async () => {
      const manager: EntityManager = uow.getManager();
      const userRepository = manager.getRepository(User);
      const carRepository = manager.getRepository(Car);

      const user = new User();
      user.name = 'User 2';
      user.lastname = 'User 2';
      user.email = 'user2@correo.com';

      const car = new Car();
      car.brand = 'Mazda';
      car.model = 'Corolla';
      car.year = 2020;
      car.color = 'Red';

      await userRepository.save(user);
      await carRepository.save(car);
    };

    uow.complete(work);

    return 'Hello World!';
  }

  @Get('healthcheck')
  healthcheck(): string {
    return 'OK';
  }

  /*  @Post('uploadfile')
  @UseInterceptors(FilesInterceptor('myphotos'))
  upload(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
  } */

  /*  @Post('uploadfile')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profile', maxCount: 1 },
      { name: 'home', maxCount: 1 },
    ]),
  )
  upload(
    @UploadedFiles()
    files: {
      profile: Express.Multer.File[];
      home: Express.Multer.File[];
    },
  ) {
    console.log(files);
  } */

  @Post('uploadfile')
  @UseInterceptors(FileInterceptor('myphoto'))
  upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /(jpg|png|gif)/g }),
          new MaxFileSizeValidator({ maxSize: 1000 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
  }
}
