import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, UserDelete, UserEdit, UserInput } from './user.model';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => User, { nullable: true })
  user(
    @Args({ name: 'user', type: () => UserInput, nullable: true }) user: User,
  ): Promise<User> {
    return this.userService.findOne(user);
  }

  @Query((returns) => [User], { nullable: true })
  users(
    @Args({ name: 'user', type: () => User, nullable: true })
    user: User,
  ): Promise<User[]> {
    if (user) {
      return this.userService.findByFilter(user);
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
