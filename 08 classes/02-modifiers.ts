class Course {
  private id: number;
  public title: string;
  public price: number;
  public active: boolean;

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }
}

const course = new Course();
course.setId(1);
course.title = "TypeScript";
course.price = 30;
course.active = true;

console.log(course);
