import { Inject, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { User, UserDelete, UserEdit, UserInput } from './user.model';
import { UserService } from './user.service';

@Resolver((of) => User)
@UseGuards(AuthGuard)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => [User], { nullable: true })
  users(
    @Args({ name: 'user', type: () => User, nullable: true })
    user: User,
  ): Promise<User | User[]> {
    if (user) {
      return this.userService.findOne(user);
    } else {
      return this.userService.findAll();
    }
  }

  @Mutation((returns) => User)
  insert_user(
    @Args({ name: 'userInput', type: () => UserInput })
    userInput: UserInput,
  ): Promise<User> {
    return this.userService.create(userInput);
  }

  @Mutation((returns) => User)
  edit_user(
    @Args({ name: 'target', type: () => User }) target: Partial<User>,
    @Args({ name: 'update', type: () => UserEdit }) update: Partial<UserEdit>,
  ): Promise<User> {
    return this.userService.edit(target, update);
  }

  @Mutation((returns) => User, {
    description: 'Require at least one of the args',
  })
  remove_user(
    @Args({
      name: 'user',
      type: () => UserDelete,
    })
    user: Partial<UserDelete>,
  ): Promise<User> {
    return this.userService.remove(user);
  }
}
