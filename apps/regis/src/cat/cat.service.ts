import { Injectable } from '@nestjs/common';
import { Cat } from 'src/type/Cat';

@Injectable()
export class CatService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll() {
    return this.cats;
  }
}
