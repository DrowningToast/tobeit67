import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
  async findAll(): Promise<User[]> {
    /**
     * TODO
     */
    const user = new User();
    user.id = 1;
    user.firstName = 'first';
    user.lastName = 'last';

    return [user];
  }
}
