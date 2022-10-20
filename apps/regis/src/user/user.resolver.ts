import { ConflictException, Inject, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { User, UserDelete, UserEdit, UserInput } from './user.model';
import { UserService } from './user.service';

@Resolver((of) => User)
@UseGuards(AuthGuard)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => User, { nullable: true })
  user(
    @Args({ name: 'user', type: () => UserInput, nullable: true }) user: User,
  ): Promise<User> {
    return this.userService.findOne(user);
  }

  @Query((returns) => [User], { nullable: true })
  async users(
    @Args({ name: 'user', type: () => User, nullable: true })
    user: User,
  ): Promise<User[]> {
    if (user) {
      return this.userService.findByFilter(user);
    } else {
      return await this.userService.findAll();
    }
  }

  @Mutation((returns) => User)
  async insert_user(
    @Args({ name: 'userInput', type: () => UserInput })
    userInput: UserInput,
  ): Promise<User> {
    const user = await this.userService.findOne({ email: userInput.email })

    if (user) {
      throw new ConflictException(`User with email: ${user.email} already exist.`)
    }

    return await this.userService.create(userInput);
  }

  @Mutation((returns) => User)
  async edit_user(
    @Args({ name: 'target', type: () => User }) target: Partial<User>,
    @Args({ name: 'update', type: () => UserEdit }) update: Partial<UserEdit>,
  ): Promise<User> {
    return await this.userService.edit(target, update);
  }

  @Mutation((returns) => User, {
    description: 'Require at least one of the args',
  })
  async remove_user(
    @Args({
      name: 'user',
      type: () => UserDelete,
    })
    user: Partial<UserDelete>,
  ): Promise<User> {
    return await this.userService.remove(user);
  }
}
