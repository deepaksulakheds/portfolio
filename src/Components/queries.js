import { gql } from "@apollo/client";

export const SEND_MAIL_QUERY = gql`
  mutation SendMail(
    $name: String!
    $email: String!
    $subject: String!
    $message: String!
    $isSecretAlert: Boolean!
  ) {
    sendMail(
      name: $name
      email: $email
      subject: $subject
      message: $message
      isSecretAlert: $isSecretAlert
    ) {
      status
      message
    }
  }
`;

export const HELLO_QUERY = gql`
  query Query {
    queryHello
  }
`;
