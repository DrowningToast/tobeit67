import { gql } from "@apollo/client";

export interface fetchUserResponse {
  user: {
    email: string;
    firstname: string;
    lastname: string;
    remainingAttempt: number;
    score: number;
  };
}

export const fetchUser = (email: string) => gql`
 {
    user(user: { email: "${email}" }) {
      remainingAttempt
      firstname
      lastname
      score
    }
  }
`;

export const insertUser = gql`
  mutation InsertUser(
    $email: String!
    $firstname: String!
    $lastname: String!
    $grade: Grade!
    $province: String!
    $phoneNum: String!
  ) {
    insert_user(
      userInput: {
        email: $email
        firstname: $firstname
        lastname: $lastname
        grade: $grade
        province: $province
        phoneNum: $phoneNum
      }
    ) {
      email
      firstname
      lastname
    }
  }
`;

export interface quiz {
  id: number;
  question: string;
  choiceA: string;
  choiceB: string;
  choiceC: string;
  choiceD: string;
  ref: string[];
}

export interface fetchQuizzesResponse {
  quizzes: quiz[];
}

export const fecthQuizzes = gql`
  query {
    quizzes {
      id
      question
      choiceA
      choiceB
      choiceC
      choiceD
      ref
    }
  }
`;

// export const submitQuizzes = gql`
// mutation {

// }

// `;
