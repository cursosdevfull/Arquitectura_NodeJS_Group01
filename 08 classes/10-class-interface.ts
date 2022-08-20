interface IRoot {
  //update(id: number, name: string): void;
  update: (id: number, name: string) => void;
  delete: (id: number) => void;
}

interface AggregateRoot {
  comit(): void;
}

class SoccerMatch implements IRoot, AggregateRoot {
  update(id: number, name: string) {
    console.log("Update match", id, name);
  }

  delete(id: number) {
    console.log("Delete match", id);
  }

  comit() {
    console.log("Commit match");
  }
}
