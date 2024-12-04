import * as React from "react";

interface EmailTemplateProps {
  message: string;
  email: string;
  type: string;
}

export const SupportMailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  message,
  email,
  type,
}) => (
  <div>
    <h1>
      email - {email}
      message - {message}
      type - {type}
    </h1>
  </div>
);

