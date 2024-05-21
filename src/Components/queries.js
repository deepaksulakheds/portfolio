export const SEND_MAIL_QUERY = `query SendMail(
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
