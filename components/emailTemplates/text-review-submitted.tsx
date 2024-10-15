import * as React from "react";

interface ReviewSubmittedEmailTemplateProps {
  firstName: string;
  reviewCount: number;
  spaceTitle: string;
}

export const EmailTemplate: React.FC<Readonly<ReviewSubmittedEmailTemplateProps>> = ({
  firstName,
  reviewCount,
  spaceTitle
}) => (
  <div>
    <h1>
      hey {" " + firstName + " "}, you have recieved a text review, for the {spaceTitle}.
      <p className="block">You have total of {reviewCount} text reviews, we would love it if you can upgrade</p>
    </h1>
  </div>
);
//1 create a mail to send a confirmation to user that review is stored, create this for normal
//2 add a email service call here,to send a mail to user notifying them that they have reviews more that 10 now, they need to update
