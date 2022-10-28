import { gql } from 'apollo-server-express';

export const getReservation = gql`
  query getReservation($email: string) {
    reservations(filters: { email: { eq: $email } }) {
      data {
        attributes {
          firstname
          lastname
          class_slot {
            data {
              attributes {
                callsign
                start
              }
            }
          }
        }
      }
    }
  }
`;

export const getClassSlots = gql`
  query getTimeSlots {
    classSlots(pagination: { pageSize: 1000 }) {
      data {
        id
        attributes {
          callsign
          start
          end
          slotId
          maxStudents
          classNumber
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

export const createReservation = gql`
  mutation create_reservation(
    $email: String!
    $firstname: String!
    $lastname: String!
    $nickname: String!
    $classId: String!
    $team: String!
  ) {
    createReservation(
      data: {
        email: $email
        nickname: $nickname
        firstname: $firstname
        lastname: $lastname
        phoneNum: $phoneNum
        class_slot: $classId
        team: $team
      }
    ) {
      data {
        attributes {
          email
          class_slot {
            data {
              attributes {
                start
                class {
                  data {
                    attributes {
                      title
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
