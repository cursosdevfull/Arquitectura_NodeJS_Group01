import { ParamsService } from './database/params.service';

export abstract class DatabaseEntityManager {
  get manager() {
    return ParamsService.manager;
  }
}
