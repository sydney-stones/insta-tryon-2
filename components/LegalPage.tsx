/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

interface Section {
  heading?: string;
  subheading?: string;
  body: React.ReactNode;
}

interface LegalDoc {
  slug: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: Section[];
}

const COMPANY = 'Rendered Fits Ltd';
const COMPANY_NUMBER = '16922551';
const VAT = '510026164';
const ADDRESS = '50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ';
const EMAIL = 'mail@renderedfits.com';

const legalDocs: LegalDoc[] = [
  // ─── WEBSITE PRIVACY POLICY ───────────────────────────────────────────────
  {
    slug: 'privacy-policy',
    title: 'Website Privacy Policy',
    subtitle: 'For renderedfits.com — the Company\'s marketing and informational website',
    lastUpdated: 'February 2026',
    sections: [
      {
        body: (
          <p>
            This Privacy Policy explains how {COMPANY} ("we", "us", "our") collects and uses personal information when you
            visit our website at renderedfits.com (the "Website"). This policy applies to the Website only. If you are a
            Shopify merchant using our App, or a customer using the Virtual Try-On Feature, please refer to our{' '}
            <Link to="/legal/app-privacy-policy" className="text-[#444833] underline underline-offset-2">App Privacy Policy</Link>.
          </p>
        ),
      },
      {
        heading: '1. Who We Are',
        body: (
          <>
            <p>{COMPANY}, a company incorporated in England and Wales (company number {COMPANY_NUMBER}). Registered office: {ADDRESS}. Contact: {EMAIL}.</p>
            <p className="mt-2">We are the data controller for personal information collected through this Website.</p>
          </>
        ),
      },
      {
        heading: '2. Information We Collect',
        body: (
          <>
            <p className="font-medium mb-2">2.1 Information You Provide</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Contact form submissions:</strong> If you contact us via a form on the Website, we collect your name, email address, and the content of your message.</li>
              <li><strong>Waitlist sign-ups:</strong> If you join our waitlist, we collect your email address and (optionally) your name and business name.</li>
              <li><strong>Newsletter subscriptions:</strong> If you subscribe to our newsletter or marketing emails, we collect your email address.</li>
            </ul>
            <p className="font-medium mt-4 mb-2">2.2 Information Collected Automatically</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Analytics data:</strong> We may use privacy-respecting analytics tools to collect anonymised or aggregated data about Website usage. We do not use Google Analytics.</li>
              <li><strong>Server logs:</strong> Our hosting provider may automatically collect standard server log data, including IP addresses, browser type, and access times. These are used for security monitoring only.</li>
            </ul>
            <p className="font-medium mt-4 mb-2">2.3 Information We Do NOT Collect</p>
            <p>The Website does not collect: payment information, biometric data, special category data, precise geolocation data, or social media profile data.</p>
          </>
        ),
      },
      {
        heading: '3. How We Use Your Information',
        body: (
          <p>We use the information you provide solely to respond to your enquiries, manage your waitlist or newsletter subscription, and send you updates you have requested. We do not use your information for advertising, profiling, or automated decision-making.</p>
        ),
      },
      {
        heading: '4. Sharing Your Information',
        body: (
          <>
            <p>We do not sell, rent, or trade your personal information. We may share your information with:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Email service providers (e.g., Instantly) for sending marketing emails and waitlist updates, subject to data processing agreements</li>
              <li>Hosting providers for Website infrastructure</li>
              <li>Professional advisers (legal, accounting) where necessary</li>
              <li>Law enforcement or regulatory authorities where required by law</li>
            </ul>
          </>
        ),
      },
      {
        heading: '5. International Transfers',
        body: <p>Some of our service providers may process data outside the UK/EEA. Where this occurs, we ensure appropriate safeguards are in place (Standard Contractual Clauses, adequacy decisions, or equivalent measures).</p>,
      },
      {
        heading: '6. Data Retention',
        body: <p>We retain personal information only for as long as necessary to fulfil the purposes for which it was collected, or as required by law. Contact form submissions are retained for up to 2 years. Newsletter subscriptions are retained until you unsubscribe.</p>,
      },
      {
        heading: '7. Your Rights',
        body: (
          <>
            <p>You have the right to access, rectify, erase, restrict, port, and object to the processing of your personal data. You can withdraw consent at any time. To exercise your rights, contact us at <a href={`mailto:${EMAIL}`} className="text-[#444833] underline underline-offset-2">{EMAIL}</a>.</p>
            <p className="mt-2">You also have the right to complain to the ICO (<a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#444833] underline underline-offset-2">ico.org.uk</a>).</p>
          </>
        ),
      },
      {
        heading: '8. Children',
        body: <p>The Website is not directed at individuals under 16. We do not knowingly collect personal information from children.</p>,
      },
      {
        heading: '9. Changes',
        body: <p>We may update this Privacy Policy from time to time. The "Last Updated" date indicates the most recent revision.</p>,
      },
    ],
  },

  // ─── WEBSITE TERMS OF USE ─────────────────────────────────────────────────
  {
    slug: 'terms-of-use',
    title: 'Website Terms of Use',
    subtitle: 'For renderedfits.com',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: '1. Introduction',
        body: (
          <>
            <p>These Terms of Use govern your access to and use of the Rendered Fits website at renderedfits.com (the "Website"). By accessing the Website, you agree to these Terms. If you do not agree, please do not use the Website.</p>
            <p className="mt-2">The Website is operated by {COMPANY}, a company incorporated in England and Wales (company number {COMPANY_NUMBER}).</p>
          </>
        ),
      },
      {
        heading: '2. Use of the Website',
        body: (
          <>
            <p>The Website is provided for informational purposes, including information about our App, pricing, and resources for Shopify merchants. You may use the Website for lawful purposes only. You must not:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>use the Website in any way that breaches applicable law or regulation;</li>
              <li>use the Website to transmit or distribute any virus, trojan, worm, or other harmful code;</li>
              <li>attempt to gain unauthorised access to the Website, its servers, or any connected systems;</li>
              <li>use automated tools (bots, scrapers, spiders) to access the Website without our prior written consent; or</li>
              <li>use the Website to send unsolicited commercial communications.</li>
            </ul>
          </>
        ),
      },
      {
        heading: '3. Intellectual Property',
        body: (
          <>
            <p>All content on the Website, including text, graphics, logos, images, software, and design, is the property of {COMPANY} (or its licensors) and is protected by copyright, trade mark, and other intellectual property laws.</p>
            <p className="mt-2">You may view, download, and print content from the Website for your personal, non-commercial use, provided you do not modify or remove any copyright or proprietary notices.</p>
            <p className="mt-2">The Rendered Fits name, logo, and associated branding are trade marks of {COMPANY} (trade mark application pending). You may not use them without our prior written consent.</p>
          </>
        ),
      },
      {
        heading: '4. Third-Party Links',
        body: <p>The Website may contain links to third-party websites (e.g., Shopify, Calendly). We are not responsible for the content, privacy practices, or availability of such websites. Accessing third-party links is at your own risk.</p>,
      },
      {
        heading: '5. Blog and Content',
        body: <p>The Website may include blog articles and other content for informational and marketing purposes. Such content is provided "as is" and does not constitute professional advice (legal, financial, technical, or otherwise). You should not rely on Website content as a substitute for professional advice.</p>,
      },
      {
        heading: '6. Disclaimers',
        body: (
          <>
            <p>The Website is provided on an "as is" and "as available" basis. We do not warrant that the Website will be uninterrupted, error-free, or free from viruses or other harmful components.</p>
            <p className="mt-2">To the maximum extent permitted by law, we disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
          </>
        ),
      },
      {
        heading: '7. Limitation of Liability',
        body: (
          <>
            <p>Nothing in these Terms limits or excludes our liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded by law.</p>
            <p className="mt-2">Subject to the above, we shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Website. Our total liability to you in connection with the Website shall not exceed one hundred pounds sterling (£100).</p>
          </>
        ),
      },
      {
        heading: '8. Governing Law',
        body: <p>These Terms are governed by the laws of England and Wales. The courts of England and Wales shall have exclusive jurisdiction over any dispute arising from these Terms.</p>,
      },
      {
        heading: '9. Changes',
        body: <p>We may update these Terms at any time by posting the revised version on the Website. Continued use of the Website after changes constitutes acceptance.</p>,
      },
    ],
  },

  // ─── APP PRIVACY POLICY ───────────────────────────────────────────────────
  {
    slug: 'app-privacy-policy',
    title: 'App Privacy Policy',
    subtitle: 'For the Rendered Fits Virtual Try-On Application',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: '1. Introduction',
        body: (
          <p>
            This Privacy Policy explains how {COMPANY} ("we", "us", "our") collects, uses, stores, shares, and protects personal information in connection with the Rendered Fits virtual try-on application (the "App"). The App is available to Shopify merchants ("Merchants") via the Shopify App Store and provides an AI-powered virtual try-on feature for the Merchant's customers ("End Users" or "Customers").
          </p>
        ),
      },
      {
        heading: '2. Who We Are',
        body: (
          <>
            <p>We act in different roles depending on whose data is being processed:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Data Controller</strong> — for Merchant account data (shop domain, billing information, usage analytics).</li>
              <li><strong>Data Processor</strong> — for End User data processed through the Virtual Try-On Feature (customer photographs, IP addresses, session identifiers). We process this data on behalf of the Merchant, who is the data controller.</li>
            </ul>
            <p className="mt-3"><strong>{COMPANY}</strong> | Company No. {COMPANY_NUMBER} | {ADDRESS} | <a href={`mailto:${EMAIL}`} className="text-[#444833] underline underline-offset-2">{EMAIL}</a></p>
          </>
        ),
      },
      {
        heading: '3. Information We Collect',
        body: (
          <>
            <p className="font-medium mb-2">3.1 Merchant Data (via Shopify APIs)</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Shop domain and shop ID — for App authentication and billing</li>
              <li>Subscription and billing plan data — to manage the Merchant's subscription</li>
              <li>Order identifiers — used solely for conversion attribution</li>
            </ul>
            <p className="font-medium mt-4 mb-2">3.2 End User Data</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Customer photographs</strong> — uploaded to generate virtual try-on images; processed transiently, not stored long-term</li>
              <li><strong>IP address</strong> — temporarily retained for rate limiting; expires at session end</li>
              <li><strong>Session identifier</strong> — stored in browser localStorage for session continuity and conversion attribution; not a cookie</li>
            </ul>
            <p className="font-medium mt-4 mb-2">3.3 What We Do NOT Collect</p>
            <p>We do not collect: customer names, email addresses, payment details, browsing history, biometric identifiers, or facial geometry scans.</p>
          </>
        ),
      },
      {
        heading: '4. How We Use Information',
        body: (
          <>
            <p>All personal information is used exclusively for:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Generating AI virtual try-on images for Customers</li>
              <li>Providing and operating the App for Merchants</li>
              <li>Managing Merchant subscriptions, billing, and plan enforcement</li>
              <li>Attributing conversions to enable Merchants to measure ROI</li>
              <li>Maintaining the security and integrity of the App</li>
            </ul>
            <p className="mt-3">We do not use any collected data for advertising, profiling, selling to third parties, or training AI models.</p>
          </>
        ),
      },
      {
        heading: '5. Consent for Photo Processing',
        body: (
          <p>
            Before any Customer photograph is uploaded, the Customer is presented with a consent notice within the storefront widget. This notice clearly explains the processing, identifies Rendered Fits Ltd as the processor, confirms the photograph is processed transiently, and requires active confirmation before the upload function is enabled.
          </p>
        ),
      },
      {
        heading: '6. Sharing and Sub-Processors',
        body: (
          <>
            <p>We do not sell, rent, or trade personal information. We share it only with:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Google LLC (Gemini API)</strong> — receives Customer photographs to generate try-on images. Bound by Google's Cloud Data Processing Addendum. Does not use photos to train AI models.</li>
              <li><strong>Shopify Inc.</strong> — hosts the Merchant's store and processes order data for conversion attribution.</li>
            </ul>
          </>
        ),
      },
      {
        heading: '7. International Data Transfers',
        body: (
          <p>
            Personal information may be transferred to Google's servers (which may be located in the United States or other jurisdictions) and Shopify servers (Canada and the United States). We ensure appropriate safeguards are in place, including Standard Contractual Clauses, the UK IDTA, and the EU-U.S. Data Privacy Framework.
          </p>
        ),
      },
      {
        heading: '8. Data Retention',
        body: (
          <ul className="list-disc pl-5 space-y-1">
            <li>Customer photographs: deleted automatically when the session expires (cleanup runs every 24 hours)</li>
            <li>Generated try-on images: same temporary lifecycle as photographs</li>
            <li>IP addresses: expire at session end</li>
            <li>Merchant account data: retained for the duration of the Merchant's subscription plus 6 years for legal compliance</li>
          </ul>
        ),
      },
      {
        heading: '9. Your Rights',
        body: (
          <>
            <p>Under UK GDPR, EU GDPR, and other applicable laws, you have the right to access, rectify, erase, restrict, port, and object to the processing of your personal data.</p>
            <p className="mt-2"><strong>Merchants:</strong> Contact us at <a href={`mailto:${EMAIL}`} className="text-[#444833] underline underline-offset-2">{EMAIL}</a>.</p>
            <p className="mt-2"><strong>End Users:</strong> Contact the Merchant whose store you used, or contact us at <a href={`mailto:${EMAIL}`} className="text-[#444833] underline underline-offset-2">{EMAIL}</a>.</p>
            <p className="mt-2">You have the right to complain to the ICO (<a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#444833] underline underline-offset-2">ico.org.uk</a>).</p>
          </>
        ),
      },
      {
        heading: '10. Data Security',
        body: (
          <ul className="list-disc pl-5 space-y-1">
            <li>Encryption of data in transit using TLS/HTTPS</li>
            <li>Transient processing of Customer photographs with automated deletion</li>
            <li>Session-scoped data storage with automatic expiry</li>
            <li>Authentication via Shopify's OAuth 2.0 Token Exchange</li>
            <li>Rate limiting to prevent abuse</li>
            <li>Access controls restricting access to personal data to authorised personnel only</li>
          </ul>
        ),
      },
      {
        heading: '11. AI-Generated Content',
        body: (
          <p>
            Virtual Try-On Images are generated using Google's Gemini API. All images are clearly identified to the Customer as AI-generated within the storefront widget. Virtual Try-On Images are illustrative only and do not constitute photographs or exact representations of real-world products.
          </p>
        ),
      },
      {
        heading: '12. Children',
        body: <p>The Virtual Try-On Feature is intended for individuals aged 16 and over. We do not knowingly collect personal information from children under the applicable minimum age.</p>,
      },
      {
        heading: '13. Contact Us',
        body: (
          <p>
            {COMPANY} | <a href={`mailto:${EMAIL}`} className="text-[#444833] underline underline-offset-2">{EMAIL}</a> | {ADDRESS}
          </p>
        ),
      },
    ],
  },

  // ─── END-USER TERMS (EULA) ────────────────────────────────────────────────
  {
    slug: 'end-user-terms',
    title: 'End-User Terms of Use',
    subtitle: 'Virtual Try-On Feature — Terms, Consent, and Privacy',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: '1. What is the Virtual Try-On Feature?',
        body: (
          <>
            <p>
              The Virtual Try-On feature (the "Feature") is provided by {COMPANY} ("we", "us", or "our") and is embedded in participating online stores. The Feature allows you to upload a photograph of yourself and receive an AI-generated image showing you wearing a product.
            </p>
            <p className="mt-2">
              The Feature is powered by artificial intelligence (currently Google's Gemini AI). The images it produces are AI-generated and are not photographs. They are illustrative only and may not accurately represent how the product will look or fit in real life.
            </p>
          </>
        ),
      },
      {
        heading: '2. How Your Photograph is Processed',
        body: (
          <>
            <p>When you upload a photograph:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Your photograph is sent from your browser to Google's AI service (Gemini API), along with an image of the selected product.</li>
              <li>Google's AI generates a virtual try-on image, which is sent back to your browser.</li>
              <li>Your original photograph is cached temporarily during your active session and automatically deleted when your session expires (our cleanup system runs every 24 hours).</li>
            </ul>
            <p className="font-medium mt-4 mb-2">We do not:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>store your photograph long-term or in any permanent database;</li>
              <li>extract, create, or store any facial geometry scan or biometric identifier from your photograph;</li>
              <li>use your photograph for advertising, marketing, profiling, or any purpose other than generating the virtual try-on image you requested;</li>
              <li>sell, rent, trade, or share your photograph with any third party (other than Google's AI service for generation purposes); or</li>
              <li>use your photograph to train AI models.</li>
            </ul>
          </>
        ),
      },
      {
        heading: '3. AI-Generated Content Disclaimer',
        body: (
          <>
            <p>Virtual try-on images are generated by artificial intelligence. You acknowledge that:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>virtual try-on images are AI-generated interpretations, not photographs or exact representations;</li>
              <li>the AI may not perfectly replicate colours, textures, fit, proportions, or other characteristics;</li>
              <li>you should not rely on virtual try-on images as a guarantee of how a product will look or fit;</li>
              <li>the AI may occasionally produce unexpected, imperfect, or inaccurate results; and</li>
              <li>the AI may slightly modify appearance, including adjustments to lighting, hair positioning, or posture.</li>
            </ul>
          </>
        ),
      },
      {
        heading: '4. Age Restriction',
        body: (
          <p>
            The Virtual Try-On Feature is intended for use by individuals aged 16 and over (13 in the US under COPPA). By using the Feature, you confirm that you meet the applicable minimum age requirement.
          </p>
        ),
      },
      {
        heading: '5. Acceptable Use',
        body: (
          <>
            <p>When using the Feature, you agree that you will:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>only upload photographs of yourself;</li>
              <li>not upload photographs of other individuals, including children, without their explicit consent;</li>
              <li>not upload any image that is illegal, offensive, harmful, defamatory, obscene, or that infringes any third party's rights;</li>
              <li>not attempt to manipulate, reverse engineer, or abuse the Feature in any way; and</li>
              <li>not use the Feature for any unlawful or fraudulent purpose.</li>
            </ul>
          </>
        ),
      },
      {
        heading: '6. Intellectual Property',
        body: (
          <>
            <p>You retain ownership of any photograph you upload. By uploading, you grant us a limited, temporary, non-exclusive licence to process it solely for the purpose of generating your virtual try-on image.</p>
            <p className="mt-2">All intellectual property rights in the Feature itself belong to {COMPANY}.</p>
          </>
        ),
      },
      {
        heading: '7. No Warranties',
        body: (
          <p>
            The Virtual Try-On Feature is provided "as is" and "as available". To the maximum extent permitted by applicable law, we disclaim all warranties, express or implied. Nothing in these Terms affects your statutory rights as a consumer.
          </p>
        ),
      },
      {
        heading: '8. Limitation of Liability',
        body: (
          <>
            <p>Nothing in these Terms limits or excludes our liability for death or personal injury caused by our negligence, fraud, or any other liability that cannot be excluded by law.</p>
            <p className="mt-2">Subject to the above, our total aggregate liability to you shall not exceed one hundred pounds sterling (£100).</p>
          </>
        ),
      },
      {
        heading: '9. Governing Law',
        body: <p>These Terms are governed by the laws of England and Wales. If you are a consumer, you may also benefit from mandatory consumer protection provisions of the laws of your country of residence.</p>,
      },
      {
        heading: '10. Contact Us',
        body: (
          <p>
            {COMPANY} | <a href={`mailto:${EMAIL}`} className="text-[#444833] underline underline-offset-2">{EMAIL}</a> | {ADDRESS}
          </p>
        ),
      },
    ],
  },

  // ─── COOKIE & TRACKING NOTICE ─────────────────────────────────────────────
  {
    slug: 'cookie-policy',
    title: 'Cookie & Tracking Notice',
    subtitle: 'For renderedfits.com and the Rendered Fits App',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: '1. Our Approach to Cookies',
        body: (
          <p>
            {COMPANY} is committed to transparency about tracking technologies. This notice explains what cookies and similar technologies are used on our Website (renderedfits.com) and within our App.
          </p>
        ),
      },
      {
        heading: '2. The Rendered Fits App',
        body: (
          <>
            <p><strong>The App does NOT use cookies.</strong></p>
            <p className="mt-2">The Virtual Try-On widget embedded in Merchant storefronts does not drop any cookies (first-party or third-party) on the Customer's browser.</p>
            <p className="mt-2">The App uses browser localStorage to store a session identifier for the purpose of maintaining session continuity and enabling conversion attribution. This is not a cookie: it is not sent to our servers with every request, it is not accessible by third parties, and it can be cleared by the Customer at any time through their browser settings.</p>
            <p className="mt-2">The App does not use any third-party tracking scripts, advertising pixels, social media trackers, or behavioural analytics tools.</p>
          </>
        ),
      },
      {
        heading: '3. The renderedfits.com Website',
        body: (
          <>
            <p>The Website may use a limited number of cookies and similar technologies:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Strictly necessary cookies</strong> — required for the Website to function. These cannot be switched off.</li>
              <li><strong>Analytics cookies</strong> — we may use privacy-respecting analytics tools to understand how visitors use the Website. These do not identify individual visitors.</li>
            </ul>
          </>
        ),
      },
      {
        heading: '4. Managing Cookies',
        body: (
          <>
            <p>You can manage or delete cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or be notified when a cookie is set.</p>
            <p className="mt-2">For more information about cookies and how to manage them, visit <a href="https://allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-[#444833] underline underline-offset-2">allaboutcookies.org</a>.</p>
          </>
        ),
      },
      {
        heading: '5. Consent',
        body: (
          <p>
            Where non-essential cookies are used on the Website, we will obtain your consent before setting them, in accordance with the Privacy and Electronic Communications Regulations 2003 (PECR) and applicable EU cookie laws. Strictly necessary cookies do not require consent.
          </p>
        ),
      },
    ],
  },

  // ─── ACCEPTABLE USE POLICY ────────────────────────────────────────────────
  {
    slug: 'acceptable-use',
    title: 'Acceptable Use Policy',
    subtitle: 'For the Rendered Fits App and renderedfits.com',
    lastUpdated: 'February 2026',
    sections: [
      {
        heading: '1. Purpose',
        body: (
          <p>
            This Acceptable Use Policy sets out the rules for using the Rendered Fits virtual try-on application (the "App") and the Rendered Fits website at renderedfits.com (the "Website"). This Policy applies to all Merchants, Customers (End Users), and Website visitors.
          </p>
        ),
      },
      {
        heading: '2. Prohibited Uses',
        body: (
          <>
            <p className="font-medium mb-2">2.1 Unlawful Activity</p>
            <p>You must not use the App or the Website for any purpose that is unlawful or fraudulent, or that facilitates unlawful activity including the sale of illegal, counterfeit, or prohibited products or services.</p>

            <p className="font-medium mt-4 mb-2">2.2 Harmful Content</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Do not upload content that is illegal, harmful, threatening, abusive, harassing, defamatory, or obscene.</li>
              <li>Do not upload photographs of other individuals (including children) to the Virtual Try-On Feature without their explicit consent.</li>
              <li>Do not upload content depicting minors (under 18) without parental or guardian consent, and never upload content of individuals under the applicable minimum age (16 in the UK/EU, 13 in the US).</li>
              <li>Do not upload content that infringes the intellectual property rights, privacy rights, or other rights of any third party.</li>
            </ul>

            <p className="font-medium mt-4 mb-2">2.3 Misrepresentation</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Do not misrepresent Virtual Try-On Images as actual photographs or guarantees of product appearance, fit, colour, or quality.</li>
              <li>Do not use the App or its outputs to deceive consumers or create false impressions about any product or service.</li>
            </ul>

            <p className="font-medium mt-4 mb-2">2.4 Technical Abuse</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Do not attempt to reverse engineer, decompile, or extract the source code of the App.</li>
              <li>Do not use automated tools (bots, scrapers) to access the App or Website without prior written consent.</li>
              <li>Do not circumvent rate limits, usage limits, or other technical restrictions.</li>
              <li>Do not interfere with or disrupt the App or Website infrastructure.</li>
              <li>Do not use the App for cryptocurrency mining or any purpose unrelated to the App's intended functionality.</li>
            </ul>
          </>
        ),
      },
      {
        heading: '3. Enforcement',
        body: (
          <>
            <p>If we reasonably believe you have violated this Policy, we may without prior notice:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>issue a warning;</li>
              <li>temporarily or permanently suspend or restrict your access;</li>
              <li>remove any offending content;</li>
              <li>report the matter to law enforcement or regulatory authorities; and/or</li>
              <li>take legal action against you.</li>
            </ul>
          </>
        ),
      },
      {
        heading: '4. Reporting Violations',
        body: (
          <p>
            If you become aware of any violation of this Policy, please report it to us at <a href={`mailto:${EMAIL}`} className="text-[#444833] underline underline-offset-2">{EMAIL}</a>. We take all reports seriously and will investigate promptly.
          </p>
        ),
      },
    ],
  },
];

const docNavItems = [
  { slug: 'privacy-policy', label: 'Website Privacy Policy' },
  { slug: 'terms-of-use', label: 'Terms of Use' },
  { slug: 'app-privacy-policy', label: 'App Privacy Policy' },
  { slug: 'end-user-terms', label: 'End-User Terms' },
  { slug: 'cookie-policy', label: 'Cookie Policy' },
  { slug: 'acceptable-use', label: 'Acceptable Use' },
];

// ─── Legal Hub (index page) ────────────────────────────────────────────────

export const LegalHub: React.FC = () => {
  useEffect(() => {
    document.title = 'Legal | Rendered Fits';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <Link to="/" className="text-lg tracking-[0.05em] font-light text-gray-900">Rendered Fits</Link>
          <span className="text-xs text-gray-400 tracking-wider uppercase">Legal</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-serif italic text-gray-900 mb-3">Legal Documents</h1>
        <p className="text-gray-500 mb-12 text-sm leading-relaxed max-w-2xl">
          Rendered Fits Ltd is committed to transparency and compliance. Find all our legal documentation below.
          For questions, contact us at <a href={`mailto:${EMAIL}`} className="text-[#444833] underline underline-offset-2">{EMAIL}</a>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {docNavItems.map((item) => {
            const doc = legalDocs.find(d => d.slug === item.slug);
            return (
              <Link
                key={item.slug}
                to={`/legal/${item.slug}`}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#444833] hover:shadow-sm transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#444833]/10 flex items-center justify-center mb-4">
                  <svg className="w-4 h-4 text-[#444833]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-[#444833] transition-colors">{item.label}</h2>
                {doc && (
                  <p className="text-xs text-gray-500">Last updated: {doc.lastUpdated}</p>
                )}
                <div className="mt-4 flex items-center gap-1 text-[#444833] text-xs font-medium">
                  <span>Read document</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Company Info */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-400 leading-relaxed">
            {COMPANY} | Company No. {COMPANY_NUMBER} | VAT No. {VAT}<br />
            Registered office: {ADDRESS}<br />
            Version 1.0 — February 2026
          </p>
        </div>
      </main>
    </div>
  );
};

// ─── Individual Legal Document Page ───────────────────────────────────────

const LegalPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const doc = legalDocs.find(d => d.slug === slug);

  useEffect(() => {
    if (doc) {
      document.title = `${doc.title} | Rendered Fits`;
    }
  }, [doc]);

  if (!doc) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Document not found.</p>
          <Link to="/legal" className="text-[#444833] underline underline-offset-2 text-sm">Back to Legal</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="text-base tracking-[0.05em] font-light text-gray-900">Rendered Fits</Link>
          <Link to="/legal" className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Legal Documents
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">

        {/* Sidebar nav */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-[10px] tracking-[0.15em] uppercase font-semibold text-gray-400 mb-4">Documents</p>
            <nav className="space-y-1">
              {docNavItems.map((item) => (
                <Link
                  key={item.slug}
                  to={`/legal/${item.slug}`}
                  className={`block text-xs py-2 px-3 rounded-lg transition-colors ${
                    item.slug === slug
                      ? 'bg-[#444833] text-white font-medium'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-10 pt-6 border-t border-gray-200">
              <p className="text-[10px] text-gray-400 leading-relaxed">
                {COMPANY}<br />
                Co. No. {COMPANY_NUMBER}<br />
                {ADDRESS}
              </p>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0">
          {/* Doc header */}
          <div className="mb-10 pb-8 border-b border-gray-200">
            <p className="text-xs text-[#444833] font-medium tracking-wider uppercase mb-2">Legal</p>
            <h1 className="text-2xl sm:text-3xl font-serif italic text-gray-900 mb-2">{doc.title}</h1>
            <p className="text-sm text-gray-500 mb-4">{doc.subtitle}</p>
            <div className="flex flex-wrap gap-4 text-xs text-gray-400">
              <span>Last Updated: {doc.lastUpdated}</span>
              <span>·</span>
              <span>{COMPANY}</span>
              <span>·</span>
              <span>Co. No. {COMPANY_NUMBER}</span>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {doc.sections.map((section, i) => (
              <section key={i} className="prose prose-sm max-w-none">
                {section.heading && (
                  <h2 className="text-base font-semibold text-gray-900 mb-3 not-prose">{section.heading}</h2>
                )}
                {section.subheading && (
                  <h3 className="text-sm font-medium text-gray-700 mb-2 not-prose">{section.subheading}</h3>
                )}
                <div className="text-sm text-gray-600 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_p+p]:mt-2 [&_strong]:text-gray-800">
                  {section.body}
                </div>
              </section>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-xs text-gray-400">
              Version 1.0 — {doc.lastUpdated} · {COMPANY}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {docNavItems
                .filter(n => n.slug !== slug)
                .map((item) => (
                  <Link
                    key={item.slug}
                    to={`/legal/${item.slug}`}
                    className="text-xs text-[#444833] underline underline-offset-2 hover:text-[#2d3020]"
                  >
                    {item.label}
                  </Link>
                ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LegalPage;
