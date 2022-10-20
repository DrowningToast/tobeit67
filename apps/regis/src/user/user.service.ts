import { Injectable } from '@nestjs/common';
import { prismaClient } from 'src/main';
import { User, UserDelete, UserEdit, UserInput } from './user.model';

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

  async findOne(user: Partial<User>): Promise<User> {
    const queryUser = await prismaClient.user.findFirst({
      where: {
        ...user,
      },
    });

    return queryUser;
  }

  async findByFilter(user: Partial<User>): Promise<User[]> {
    const queryUsers = await prismaClient.user.findMany({
      where: {
        ...user,
      },
    });

    return queryUsers;
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

  async edit(user: Partial<User>, update: Partial<User>): Promise<User> {
    const queryUser = await prismaClient.user.update({
      where: {
        ...user,
      },
      data: {
        ...update,
      },
    });

    return queryUser;
  }

  async remove(user: Partial<UserDelete>): Promise<User> {
    const queryUser = await prismaClient.user.delete({
      where: {
        ...user,
      },
    });

    return queryUser;
  }
}
