import { AggregateRoot } from '@nestjs/cqrs';

export type CourseEssential = {
  readonly id: string;
  readonly name: string;
};

export type CourseOptional = {
  readonly summary: string;
};

export type CourseUpdate = {
  readonly name: string;
  readonly summary: string;
};

export type CourseProperties = Required<CourseEssential> &
  Partial<CourseOptional>;

export class Course extends AggregateRoot {
  private readonly id: string;
  private name: string;
  private active: boolean;
  private readonly createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date;
  private summary: string;

  constructor(properties: CourseProperties) {
    super();
    Object.assign(this, properties);
    this.createdAt = new Date();
    this.active = true;
  }

  properties() {
    return {
      id: this.id,
      name: this.name,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      summary: this.summary,
    };
  }

  update(fields: Partial<CourseUpdate>) {
    Object.assign(this, fields);
    this.updatedAt = new Date();
  }

  delete() {
    this.active = false;
    this.deletedAt = new Date();
  }
}
