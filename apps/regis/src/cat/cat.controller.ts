import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Cat, CreateCatDto } from 'src/type/Cat';
import { CatService } from './cat.service';

@Controller('cat')
export class CatController {
  constructor(private catService: CatService) {}

  @Get()
  async findAll(): Promise<Cat[] | string> {
    return 'hello';
    // return this.catService.findAll();
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    this.catService.create(createCatDto);
    return 'New cat is created';
  }
}
