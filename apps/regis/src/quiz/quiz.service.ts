import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { gql } from 'apollo-server-express';
import { cmsClient } from 'src/cms-gql/cms-gql-client';
import { UserService } from 'src/user/user.service';
import { Answer, QuizResult } from './quiz.model';

const updateScoreQuery = gql`
  query {
    quizzes {
      meta {
        pagination {
          total
        }
      }
    }
  }
`;

class Quiz {
  id: number;
  question: string;
  choiceA: string;
  choiceB: string;
  choiceC: string;
  choiceD: string;
  correct: 'A' | 'B' | 'C' | 'D';
  ref: string[];
}

@Injectable()
export class QuizService {
  constructor(private readonly userService: UserService) {}

  async getQuiz(getAnswer: boolean = false): Promise<Quiz[]> {
    const query = gql`
    query {
      quizzes {
       data {
        id
        attributes {
          question
          choiceA
          choiceB
          choiceC
          choiceD
          ${getAnswer ? 'correct' : ''}
          ref {
            data {
              attributes {
                url
              }
            }
          }
        }
        
      }
    }}
    `;

    const { data } = await cmsClient.query({ query });

    const finalData = data.quizzes.data.map((data) => {
      return {
        question: data.attributes.question,
        choiceA: data.attributes.choiceA,
        choiceB: data.attributes.choiceB,
        choiceC: data.attributes.choiceC,
        choiceD: data.attributes.choiceD,
        ref: data.attributes.ref.data.map((content) => content.attributes.url),
        id: Number(data.id),
        correct: getAnswer ? data.attributes.correct : undefined,
      };
    });

    return finalData;
  }

  async startQuiz(userId: number) {
    const user = await this.userService.findOne({ id: userId });

    if (!user) {
      throw new NotFoundException(`User with userId:${userId} not found.`);
    }

    if (user.remainingAttempt == 0) {
      throw new ForbiddenException('You have no attempt left.');
    }

    return await this.getQuiz();
  }

  async checkAnswer(answer: Answer[]) {
    const questions: Quiz[] = await this.getQuiz(true);

    let totalScore = 0;

    answer.forEach((answer) => {
      const question = questions.find((quiz) => answer.id === quiz.id);

      if (!question) {
        return;
      }

      switch (question.correct) {
        case 'A':
          if (answer.answer == question.choiceA) {
            totalScore += 1;
          }
          break;
        case 'B':
          if (answer.answer == question.choiceB) {
            totalScore += 1;
          }
          break;
        case 'C':
          if (answer.answer == question.choiceC) {
            totalScore += 1;
          }
          break;
        case 'D':
          if (answer.answer == question.choiceD) {
            totalScore += 1;
          }
          break;
      }
    });

    return totalScore;
  }

  async updateScore(userId: number, score: number): Promise<QuizResult> {
    const user = await this.userService.findOne({ id: userId });

    const { data } = await cmsClient.query({ query: updateScoreQuery });

    const totalQuestions = data.quizzes.meta.pagination.total as number;

    if (!user) {
      throw new NotFoundException(`User with userId:${userId} not found.`);
    }

    if (user.remainingAttempt == 0) {
      throw new ForbiddenException('You have no attempt left.');
    }

    let scorePercent = score / totalQuestions;

    if (user.score > score) {
      scorePercent = user.score / totalQuestions;
      score = user.score;
    }

    const updatedUser = await this.userService.edit(
      { id: user.id },
      {
        score,
        scorePercent,
        remainingAttempt: user.remainingAttempt - 1,
      },
    );

    return {
      userId: updatedUser.id,
      score: updatedUser.score,
      scorePercent,
      remainingAttempt: updatedUser.remainingAttempt,
    };
  }
}
