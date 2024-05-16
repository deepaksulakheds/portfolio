export const SEND_MAIL_QUERY = `query SendMail(
    $name: String!
    $email: String!
    $subject: String!
    $message: String!
  ) {
    sendMail(name: $name, email: $email, subject: $subject, message: $message) {
      status
      message
    }
  }`;
