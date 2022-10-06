import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller.js';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CatModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: process.env.NODE_ENV === 'development',
      playground: process.env.NODE_ENV === 'development',
      autoSchemaFile: true,
      sortSchema: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
