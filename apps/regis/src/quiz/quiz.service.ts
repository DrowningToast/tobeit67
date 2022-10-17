import { Injectable } from '@nestjs/common';
import { gql } from 'apollo-server-express';
import { cmsClient } from 'src/cms-gql/cms-gql-client';

@Injectable()
export class QuizService {
  constructor() {}

  async getQuiz() {
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

    const { data } = await cmsClient.query({ query })

    const finalData = data.quizzes.data.map((data) => data.attributes)

    console.log(finalData);
    
    return finalData 
  }
}
