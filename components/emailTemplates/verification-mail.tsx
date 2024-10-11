import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  email: string;
  token: string;
}

export const VerificationEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  token,
  email,
  firstName,
}) => (
  <div>
    <h1>
      token - {token}
      email - {email}
      firstName - {firstName}
    </h1>
  </div>
);

