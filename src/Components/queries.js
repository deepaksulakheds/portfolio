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
      status
      message
      response {
        id
        note
        createdAt
      }
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation DeleteNote($deleteNoteId: String!) {
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

export const DELETE_MULTIPLE_NOTES = gql`
  mutation DeleteMultipleNotes($ids: [String!]!) {
    deleteMultipleNotes(ids: $ids) {
      status
      message
    }
  }
`;

export const EDIT_NOTE = gql`
  mutation UpdateNote($id: String!, $note: String!) {
    updateNote(id: $id, note: $note) {
      status
      message
    }
  }
`;
