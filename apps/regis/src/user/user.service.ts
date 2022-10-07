import { Injectable } from '@nestjs/common';
import { prismaClient } from 'src/main';
import { User, UserInput } from './user.model';

@Injectable()
export class UserService {
  async findById(id: number): Promise<User> {
    const queryUser = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    return queryUser;
  }

  async findAll(): Promise<User[]> {
    const queryUser = await prismaClient.user.findMany();
    return queryUser;
  }

  async create(userInput: UserInput): Promise<User> {
    const user = await prismaClient.user.create({
      data: {
        email: userInput.email,
        firstname: userInput.firstname,
        lastname: userInput.lastname,
        phoneNum: userInput.phoneNum,
        province: userInput.province,
        grade: userInput.grade,
      },
    });

    return user;
  }
}
