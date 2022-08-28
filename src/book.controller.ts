import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Type } from 'class-transformer';
import { BookService } from './book.service';
import { BookCreateDto } from './dtos/book-create.dto';
import { BookGetOneDto } from './dtos/book-getone.dto';

@Controller('book')
//@UsePipes(new ValidationPipe())
export class BookController {
  private bookService: BookService;

  constructor(bookService: BookService) {
    this.bookService = bookService;
  }

  @Get('list')
  async getBooks() {
    //const bookService = new BookService();
    return await this.bookService.getBooks();
  }

  @Get(':identificador')
  getBookById(@Param() values: BookGetOneDto) {
    console.log('getBookById', values.identificador);
    //const bookService = new BookService();
    return this.bookService.getBookById(values.identificador);
  }

  @Post()
  //createBook(@Body('title') title: string, @Body('author') author: string) {
  async createBook(@Body() book: BookCreateDto) {
    /*  const { title, author } = book;
    return { title, author }; */
    return await this.bookService.insertBook(book);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: number) {
    return this.bookService.deleteBook(id);
  }
}
