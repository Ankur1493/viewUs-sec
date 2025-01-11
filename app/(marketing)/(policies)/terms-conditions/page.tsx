import React from 'react';
import Link from 'next/link';

const TermsAndConditionsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>

      <p className="mb-4">Our Terms and Conditions were last updated on <strong>12/01/2025</strong>.</p>

      <p className="mb-8">Please read these terms and conditions carefully before using Our Service.</p>

      <h2 className="text-2xl font-bold mb-4">Acknowledgment</h2>
      <div className="space-y-4 mb-8">
        <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between you and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>

        <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users, and others who access or use the Service.</p>

        <p>By accessing or using the Service you agree to be bound by these Terms and Conditions. If you disagree with any part of these Terms and Conditions, then you may not access the Service. This acknowledgement has been suggested by <Link href="https://dodopayments.com" className="text-blue-600 hover:underline">dodopayments.com</Link>.</p>

        <p>Your access to and use of the Service is also conditioned on your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of your personal information when you use the Application or the Website and tells you about your privacy rights and how the law protects you. Please read Our Privacy Policy carefully before using Our Service.</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">User Accounts</h2>
      <div className="space-y-4 mb-8">
        <p>When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in the immediate termination of your account.</p>

        <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with Our Service or a Third-Party Social Media Service.</p>

        <p>You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>

        <p>You may not use as a username the name of another person or entity that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you without appropriate authorization, or a name that is otherwise offensive, vulgar, or obscene.</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Copyright Policy</h2>
      <div className="space-y-4 mb-8">
        <p className="font-semibold">Intellectual Property Infringement</p>
        <p>All content, features, and functionality of our services, including but not limited to text, graphics, logos, and software, are the exclusive property of <strong>Viewus</strong> and are protected by international copyright, trademark, and other intellectual property laws.</p>

        <p className="font-semibold">DMCA Notice and DMCA Procedure for Copyright Infringement Claims</p>
        <p>You may submit a notification pursuant to the Digital Millennium Copyright Act (DMCA) by providing our Copyright Agent with the following information in writing (see 17 U.S.C 512(c)(3) for further detail):</p>

        <ol className="list-decimal pl-8 space-y-2">
          <li>An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright's interest.</li>
          <li>A description of the copyrighted work that You claim has been infringed, including the URL (i.e., web page address) of the location where the copyrighted work exists or a copy of the copyrighted work.</li>
          <li>Identification of the URL or other specific location on the Service where the material that You claim is infringing is located.</li>
          <li>Your address, telephone number, and email address.</li>
          <li>A statement by You that You have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
          <li>A statement by You, made under penalty of perjury, that the above information in Your notice is accurate and that You are the copyright owner or authorized to act on the copyright owner's behalf.</li>
        </ol>
      </div>

      <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
      <div className="space-y-4 mb-8">
        <p>The Service and its original content (excluding Content provided by you or other users), features, and functionality are and will remain the exclusive property of the Company and its licensors.</p>

        <p>The Service is protected by copyright, trademark, and other laws of both the Country and foreign countries.</p>

        <p>Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of the Company.</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Your Feedback to Us</h2>
      <p className="mb-8">You assign all rights, title, and interest in any Feedback You provide to the Company. If for any reason such assignment is ineffective, You agree to grant the Company a non-exclusive, perpetual, irrevocable, royalty-free, worldwide right, and license to use, reproduce, disclose, sublicense, distribute, modify, and exploit such Feedback without restriction.</p>

      <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
      <div className="space-y-4 mb-8">
        <p>Notwithstanding any damages that you might incur, the entire liability of the Company and any of its suppliers under any provision of these Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by you through the Service or 100 USD if you haven't purchased anything through the Service.</p>

        <p className="font-semibold">"AS IS" and "AS AVAILABLE" Disclaimer</p>
        <p>The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company expressly disclaims all warranties, whether express, implied, statutory or otherwise.</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
      <p className="mb-8">The laws of <strong>India</strong>, excluding its conflicts of law rules, shall govern these Terms and your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.</p>

      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <p className="mb-4">If you have any questions about these Terms and Conditions, You can contact us:</p>
      <ul className="list-disc pl-8 mb-8 space-y-2">
        <li>By visiting our website: <Link href="https://viewus.in" className="text-blue-600 hover:underline">https://viewus.in</Link></li>
        <li>By sending us an email: <a href="mailto:team@viewus.in" className="text-blue-600 hover:underline">team@viewus.in</a></li>
      </ul>
    </div>
  );
};

export default TermsAndConditionsPage;
