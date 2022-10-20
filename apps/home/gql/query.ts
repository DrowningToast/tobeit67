import { gql } from "@apollo/client";

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
