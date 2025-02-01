import React from 'react';
import Link from 'next/link';

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="space-y-4 mb-8">
        <p>Our Privacy Policy was last updated on <strong>12/01/2024</strong>.</p>
        <p>At <strong>Viewus</strong>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by <strong>Viewus</strong> and how we use it.</p>
        <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <a href="mailto:team@viewus.in" className="text-blue-600 hover:underline">team@viewus.in</a>.</p>
        <p>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collected on <Link href="https://www.viewus.in/" className="text-blue-600 hover:underline">https://www.viewus.in/</Link>. This policy is not applicable to any information collected offline or via channels other than this website.</p>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Consent</h2>
        <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
        <div className="space-y-4">
          <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
          <p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
          <p>When you register for an account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
        <p className="mb-4">We use the information we collect in various ways, including to:</p>
        <ul className="list-disc pl-8 space-y-2">
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>Communicate with you for customer service, updates, and marketing purposes</li>
          <li>Send you emails</li>
          <li>Find and prevent fraud</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Log Files</h2>
        <div className="space-y-4">
          <p><strong>Viewus</strong> follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services&apos; analytics.</p>
          <p>The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any personally identifiable information. The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">CCPA Privacy Rights</h2>
        <p className="mb-4">Under the CCPA, California consumers have the right to:</p>
        <ul className="list-disc pl-8 space-y-2">
          <li>Request that a business that collects a consumer&apos;s personal data disclose the categories and specific pieces of personal data collected</li>
          <li>Request that a business delete any personal data collected</li>
          <li>Request that a business not sell the consumer&apos;s personal data</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">GDPR Data Protection Rights</h2>
        <ul className="list-disc pl-8 space-y-2">
          <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
          <li><strong>The right to rectification:</strong> You have the right to request that we correct any inaccurate information.</li>
          <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data.</li>
          <li><strong>The right to restrict processing:</strong> You have the right to request restricted processing of your personal data.</li>
          <li><strong>The right to data portability:</strong> You have the right to request the transfer of your data.</li>
        </ul>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
