export class TaskService {
  private prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  getTasks(): any[] {
    return [
      { id: 1, title: `${this.prefix}_task_1` },
      { id: 2, title: `${this.prefix}_task_2` },
      { id: 3, title: `${this.prefix}_task_3` },
    ];
  }
}

//const taskService = new TaskService('app-poc')
