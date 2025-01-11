import React from 'react';
import Link from 'next/link';

const TermsAndConditionsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>

      <div className="space-y-4 mb-8">
        <p>Our Terms and Conditions were last updated on <strong>12/01/2025</strong>.</p>
        <p>Please read these terms and conditions carefully before using Our Service.</p>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Acknowledgment</h2>
        <div className="space-y-4">
          <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between you and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
          <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users, and others who access or use the Service.</p>
          <p>By accessing or using the Service you agree to be bound by these Terms and Conditions. If you disagree with any part of these Terms and Conditions, then you may not access the Service.</p>
          <p>Your access to and use of the Service is also conditioned on your acceptance of and compliance with the Privacy Policy of the Company. Please read Our Privacy Policy carefully before using Our Service.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">User Accounts</h2>
        <div className="space-y-4">
          <p>When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.</p>
          <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with Our Service or a Third-Party Social Media Service.</p>
          <p>You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Copyright Policy</h2>
        <div className="space-y-4">
          <p>You may submit a notification pursuant to the Digital Millennium Copyright Act (DMCA) by providing our Copyright Agent with the following information in writing:</p>
          <ol className="list-decimal pl-8 space-y-2">
            <li>An electronic or physical signature of the person authorized to act on behalf of the copyright&apos;s owner</li>
            <li>Identification of the copyrighted work claimed to have been infringed</li>
            <li>Identification of the material that is claimed to be infringing</li>
            <li>Your contact information</li>
            <li>A statement that you have a good faith belief that use of the material is not authorized</li>
            <li>A statement that the information in the notification is accurate</li>
          </ol>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
        <div className="space-y-4">
          <p>The Service and its original content (excluding Content provided by you or other users), features, and functionality are and will remain the exclusive property of the Company and its licensors.</p>
          <p>The Service is protected by copyright, trademark, and other laws of both the Country and foreign countries.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <div className="space-y-4">
          <p>If you have any questions about these Terms and Conditions, you can contact us:</p>
          <ul className="list-disc pl-8 space-y-2">
            <li>By email: <a href="mailto:team@viewus.in" className="text-blue-600 hover:underline">team@viewus.in</a></li>
            <li>By visiting: <Link href="https://viewus.in" className="text-blue-600 hover:underline">https://viewus.in</Link></li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditionsPage;
