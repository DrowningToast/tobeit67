import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, UserInput } from './user.model';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => [User], { nullable: true })
  users(
    @Args({ name: 'id', type: () => Int, nullable: true }) id: number,
  ): Promise<User[]> {
    if (id) {
    } else {
      return this.userService.findAll();
    }
  }

  @Mutation((returns) => User)
  create(
    @Args({ name: 'userInput', type: () => UserInput })
    userInput: UserInput,
  ): Promise<User> {
    return this.userService.create(userInput);
  }
}
