import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>
      Now its official!! we are fucking building this platform {firstName}
    </h1>
  </div>
);
//1 create a mail to send a confirmation to user that review is stored, create this for normal
//2 add a email service call here,to send a mail to user notifying them that they have reviews more that 10 now, they need to update
