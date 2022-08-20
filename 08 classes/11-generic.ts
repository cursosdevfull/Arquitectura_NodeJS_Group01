type Result = {
  success: boolean;
  updateAt: Date;
};

interface IMethod<TypeID, TypeResult> {
  save(): TypeResult;
  delete(id: TypeID): void;
}

/* interface INewMethod {
    save(): void;
    delete(id: string): void
} */

class Teacher implements IMethod<number, Result> {
  save(): Result {
    throw new Error("Method not implemented.");
  }
  delete(id: number): void {
    throw new Error("Method not implemented.");
  }
}
