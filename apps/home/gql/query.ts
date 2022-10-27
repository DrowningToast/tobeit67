import { gql } from "@apollo/client";

export interface fetchUserResponse {
  user: {
    email: string;
    firstname: string;
    lastname: string;
    remainingAttempt: number;
    score: number;
    scorePercent: number;
    id: number;
  };
}

export const fetchUser = (email: string) => gql`
 {
    user(user: { email: "${email}" }) {
      remainingAttempt
      firstname
      lastname
      score
      scorePercent
      id
      email
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
  query getQuiz($userId: Int) {
    quizzes(userId: $userId) {
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

export const submitQuizzes = gql`
  mutation SubmitQuiz($email: String!, $answers: [submitAnswer!]) {
    submit_quiz(answer: { email: $email, answer: $answers }) {
      score
      scorePercent
      remainingAttempt
    }
  }
`;

export const getAvailableClasses = gql`
  query getTimeSlots {
    classSlots {
      data {
        attributes {
          callsign
          start
          end
          slotId
          classNumber
          class {
            data {
              attributes {
                title
                description
                teacher
                classId
                thumbnail {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
          maxStudents
          reservations {
            data {
              attributes {
                nickname
              }
            }
          }
        }
      }
    }
  }
`;

export const getSelfReservation = gql`
  query getSelfReservation($email: String) {
    reservations(filters: { email: { eq: $email } }) {
      data {
        attributes {
          class_slot {
            data {
              attributes {
                callsign
                start
                end
                slotId
                classNumber
                reservations {
                  data {
                    attributes {
                      nickname
                    }
                  }
                }
                maxStudents
                class {
                  data {
                    attributes {
                      title
                      description
                      teacher
                      classId
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const getReservation = gql`
  query getReservation($email: String) {
    classSlots {
      data {
        attributes {
          callsign
          start
          end
          slotId
          classNumber
          class {
            data {
              attributes {
                title
                description
                teacher
                classId
                thumbnail {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
          maxStudents
          reservations {
            data {
              attributes {
                nickname
              }
            }
          }
        }
      }
    }
    reservations(filters: { email: { eq: $email } }) {
      data {
        attributes {
          class_slot {
            data {
              attributes {
                callsign
                start
                end
                slotId
                classNumber
                reservations {
                  data {
                    attributes {
                      nickname
                    }
                  }
                }
                maxStudents
                class {
                  data {
                    attributes {
                      title
                      description
                      teacher
                      classId
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
