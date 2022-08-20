interface OperationsCommons<TypeID> {
  update(id: TypeID, name: string): void;
}

class Infrastructure<TypeID, Repository extends OperationsCommons<TypeID>> {
  repository: Repository;

  constructor(repository: Repository) {
    this.repository = repository;
  }

  updateItem(id: TypeID, name: string) {
    this.repository.update(id, name);
  }
}

class OperationCourse implements OperationsCommons<string> {
  update(id: string, name: string): void {
    console.log("Update course", id, name);
  }
}

class OperationSchedule implements OperationsCommons<number> {
  update(id: number, name: string): void {
    console.log("Update schedule", id, name);
  }
}

const operationCourse = new OperationCourse();
const infra = new Infrastructure<string, OperationCourse>(operationCourse);
infra.updateItem("2cbc83ec-44c7-4def-a267-0466fda0dd1f", "TypeScript");

const operationSchedule = new OperationSchedule();
const infra2 = new Infrastructure<number, OperationSchedule>(operationSchedule);
infra2.updateItem(1, "DDD");
