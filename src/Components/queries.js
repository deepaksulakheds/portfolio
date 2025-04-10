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

export const GET_NOTES = gql`
  query GetAllNotes {
    getAllNotes {
      id
      note
      createdAt
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation DeleteNote($deleteNoteId: Int!) {
    deleteNote(id: $deleteNoteId) {
      status
      message
    }
  }
`;
export const ADD_NOTE = gql`
  mutation AddNote($note: String!) {
    addNote(note: $note) {
      status
      message
    }
  }
`;
