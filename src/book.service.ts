import { BadRequestException, NotFoundException } from '@nestjs/common';
import { BookCreateDto } from './dtos/book-create.dto';
import { DatabaseEntityManager } from './database-manager';
import { BookEntity } from './entities/book.entity';

const dataBooks: BookCreateDto[] = [
  { title: 'Ciudad y Los Perros', author: 'Mario Vargas Llosa' },
  { title: 'El Señor de Los Anillos', author: 'J.R.R. Tolkien' },
  { title: 'El Principito', author: 'Antoine de Saint-Exupéry' },
];

export class BookService extends DatabaseEntityManager {
  async getBooks(): Promise<BookEntity[]> {
    return await this.manager.getRepository(BookEntity).find();
  }

  getBookById(id: number) {
    if (id >= dataBooks.length) {
      throw new NotFoundException('Book not found');
    }
    // dataBooks.splice(id, 1);
    return dataBooks[id];
  }

  async insertBook(book: BookCreateDto) {
    await this.manager.getRepository(BookEntity).save(book);
    //dataBooks.push(book);
    return book;
  }

  async deleteBook(id: number) {
    const book = await this.manager
      .getRepository(BookEntity)
      .findOne({ where: { id } });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    await this.manager.getRepository(BookEntity).delete({ id });

    return book;
  }
}
