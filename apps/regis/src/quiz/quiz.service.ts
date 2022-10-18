import { Injectable } from '@nestjs/common';
import { gql } from 'apollo-server-express';
// import { cmsClient } from 'src/cms-gql/cms-gql-client';
import { Quiz } from './quiz.model';

class User {
  userId: number
  score: number
}

class Question {
  question: string
  choiceA: string
  choiceB: string
  choiceC: string
  choiceD: string
  correct: 'A' | 'B' | 'C' | 'D'
}

@Injectable()
export class QuizService {
  constructor() { }

  userList: User[] = [
    { userId: 1, score: 0 }
  ]

  quiz = [

  ]

  async getQuiz(): Promise<Quiz[]> {
    const query = gql`
    query {
      quizzes {
       data {
        attributes {
          question
          choiceA
          choiceB
          choiceC
          choiceD
          }
        }
      }
    }
    `

    // const { data } = await cmsClient.query({ query })

    // const finalData = data.quizzes.data.map((data) => data.attributes)

    // console.log(finalData);

    return [
      {
        id: 1,
        "question": "早上好中国，现在我有冰淇淋淇淋。ประโยคนี้ใครเป็นคนพูด",
        "choiceA": "Zhong Xina",
        "choiceB": "John Cena",
        "choiceC": "The Wok",
        "choiceD": "The Rock",
      }
    ]
  }

  async updateScore(userId: number, score: number) {
    const user = this.userList.find((user) => user.userId === userId)

    user.score = score

    this.userList = [
      ...this.userList,
      user
    ]

    return user
  }
}
