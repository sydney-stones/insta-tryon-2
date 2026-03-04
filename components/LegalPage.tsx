/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

interface LegalDoc {
  slug: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  content: React.ReactNode;
}

const COMPANY = 'Rendered Fits Ltd';
const COMPANY_NUMBER = '16922551';
const VAT = '510026164';
const ADDRESS = '50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ';
const EMAIL = 'mail@renderedfits.com';

// ─── Shared components ────────────────────────────────────────────────────────

const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-base font-semibold text-gray-900 mt-8 mb-3">{children}</h2>
);
const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-sm font-semibold text-gray-800 mt-5 mb-2">{children}</h3>
);
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <p className={`text-sm text-gray-600 leading-relaxed mb-3 ${className ?? ''}`}>{children}</p>
);
const UL: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 mb-3">{children}</ul>
);
const Table: React.FC<{ headers: string[]; rows: string[][] }> = ({ headers, rows }) => (
  <div className="overflow-x-auto mb-4">
    <table className="w-full text-xs border-collapse">
      <thead>
        <tr className="bg-gray-100">
          {headers.map((h, i) => (
            <th key={i} className="text-left px-3 py-2 font-semibold text-gray-700 border border-gray-200 whitespace-nowrap">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            {row.map((cell, j) => (
              <td key={j} className="px-3 py-2 text-gray-600 border border-gray-200 align-top">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
const ELink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#444833] underline underline-offset-2 hover:text-[#2d3020]">{children}</a>
);
const ILink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link to={to} className="text-[#444833] underline underline-offset-2 hover:text-[#2d3020]">{children}</Link>
);
const KeyStatement: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-[#444833]/5 border border-[#444833]/20 rounded-lg p-4 mb-6 text-sm text-gray-700 font-medium leading-relaxed">{children}</div>
);

// ─── Document content ──────────────────────────────────────────────────────────

const legalDocs: LegalDoc[] = [

  // ── 1. WEBSITE PRIVACY POLICY ───────────────────────────────────────────────
  {
    slug: 'privacy-policy',
    title: 'Website Privacy Policy',
    subtitle: 'For renderedfits.com — the Company\'s marketing and informational website',
    lastUpdated: 'February 2026',
    content: (
      <>
        <P>This Privacy Policy explains how {COMPANY} ("we", "us", "our") collects and uses personal information when you visit our website at renderedfits.com (the "Website"). This policy applies to the Website only. If you are a Shopify merchant using our App, or a customer using the Virtual Try-On Feature, please refer to our <ILink to="/legal/app-privacy-policy">App Privacy Policy</ILink>.</P>

        <H2>1. Who We Are</H2>
        <P>{COMPANY}, a company incorporated in England and Wales (company number {COMPANY_NUMBER}). Registered office: {ADDRESS}. Contact: <ELink href={`mailto:${EMAIL}`}>{EMAIL}</ELink>.</P>
        <P>We are the data controller for personal information collected through this Website.</P>

        <H2>2. Information We Collect</H2>
        <H3>2.1 Information You Provide</H3>
        <UL>
          <li><strong>Contact form submissions:</strong> If you contact us via a form on the Website, we collect your name, email address, and the content of your message.</li>
          <li><strong>Waitlist sign-ups:</strong> If you join our waitlist, we collect your email address and (optionally) your name and business name.</li>
          <li><strong>Newsletter subscriptions:</strong> If you subscribe to our newsletter or marketing emails, we collect your email address.</li>
        </UL>
        <H3>2.2 Information Collected Automatically</H3>
        <UL>
          <li><strong>Analytics data:</strong> We may use privacy-respecting analytics tools to collect anonymised or aggregated data about Website usage, including pages visited, time on site, referral sources, and device/browser type. We do not use Google Analytics.</li>
          <li><strong>Server logs:</strong> Our hosting provider may automatically collect standard server log data, including IP addresses, browser type, and access times. These logs are used for security monitoring and are not used to identify individual visitors.</li>
        </UL>
        <H3>2.3 Information We Do NOT Collect</H3>
        <P>The Website does not collect: payment information, biometric data, special category data, precise geolocation data, or social media profile data.</P>

        <H2>3. How We Use Your Information</H2>
        <Table
          headers={['Purpose', 'Legal Basis (Article 6 UK GDPR)']}
          rows={[
            ['Responding to your enquiries and contact form submissions', 'Article 6(1)(b) — Steps taken at your request; or Article 6(1)(f) — Legitimate interests'],
            ['Managing waitlist sign-ups and sending waitlist updates', 'Article 6(1)(a) — Consent'],
            ['Sending marketing emails and newsletters', 'Article 6(1)(a) — Consent (you can unsubscribe at any time)'],
            ['Website analytics (anonymised/aggregated)', 'Article 6(1)(f) — Legitimate interests (understanding Website usage to improve our content and services)'],
            ['Security monitoring and abuse prevention', 'Article 6(1)(f) — Legitimate interests (protecting our Website and systems)'],
          ]}
        />

        <H2>4. Sharing Your Information</H2>
        <P>We do not sell, rent, or trade your personal information. We may share your information with:</P>
        <UL>
          <li>Email service providers (e.g., Instantly) for sending marketing emails and waitlist updates, subject to data processing agreements</li>
          <li>Hosting providers for Website infrastructure</li>
          <li>Professional advisers (legal, accounting) where necessary</li>
          <li>Law enforcement or regulatory authorities where required by law</li>
        </UL>

        <H2>5. International Transfers</H2>
        <P>Some of our service providers may process data outside the UK/EEA. Where this occurs, we ensure appropriate safeguards are in place (Standard Contractual Clauses, adequacy decisions, or equivalent measures).</P>

        <H2>6. Data Retention</H2>
        <Table
          headers={['Data', 'Retention Period']}
          rows={[
            ['Contact form submissions', '12 months, then deleted unless an ongoing relationship exists'],
            ['Waitlist sign-ups', 'Until the waitlist is closed or you unsubscribe, plus 30 days for processing'],
            ['Marketing email subscribers', 'Until you unsubscribe, plus 30 days for processing'],
            ['Server logs', '90 days'],
          ]}
        />

        <H2>7. Your Rights</H2>
        <P>You have the right to access, rectify, erase, restrict, port, and object to the processing of your personal data. You can withdraw consent at any time. To exercise your rights, contact us at <ELink href={`mailto:${EMAIL}`}>{EMAIL}</ELink>. You also have the right to complain to the ICO (<ELink href="https://ico.org.uk">ico.org.uk</ELink>).</P>

        <H2>8. Children</H2>
        <P>The Website is not directed at individuals under 16. We do not knowingly collect personal information from children.</P>

        <H2>9. Changes</H2>
        <P>We may update this Privacy Policy from time to time. The "Last Updated" date indicates the most recent revision.</P>
      </>
    ),
  },

  // ── 2. WEBSITE TERMS OF USE ──────────────────────────────────────────────────
  {
    slug: 'terms-of-use',
    title: 'Website Terms of Use',
    subtitle: 'For renderedfits.com',
    lastUpdated: 'February 2026',
    content: (
      <>
        <H2>1. Introduction</H2>
        <P>These Terms of Use govern your access to and use of the Rendered Fits website at renderedfits.com (the "Website"). By accessing the Website, you agree to these Terms. If you do not agree, please do not use the Website.</P>
        <P>The Website is operated by {COMPANY}, a company incorporated in England and Wales (company number {COMPANY_NUMBER}).</P>

        <H2>2. Use of the Website</H2>
        <P>2.1 The Website is provided for informational purposes, including information about our App, pricing, and resources for Shopify merchants.</P>
        <P>2.2 You may use the Website for lawful purposes only. You must not:</P>
        <UL>
          <li>use the Website in any way that breaches applicable law or regulation;</li>
          <li>use the Website to transmit or distribute any virus, trojan, worm, or other harmful code;</li>
          <li>attempt to gain unauthorised access to the Website, its servers, or any connected systems;</li>
          <li>use automated tools (bots, scrapers, spiders) to access the Website without our prior written consent; or</li>
          <li>use the Website to send unsolicited commercial communications.</li>
        </UL>

        <H2>3. Intellectual Property</H2>
        <P>3.1 All content on the Website, including text, graphics, logos, images, software, and design, is the property of {COMPANY} (or its licensors) and is protected by copyright, trade mark, and other intellectual property laws.</P>
        <P>3.2 You may view, download, and print content from the Website for your personal, non-commercial use, provided you do not modify or remove any copyright or proprietary notices.</P>
        <P>3.3 The Rendered Fits name, logo, and associated branding are trade marks of {COMPANY} (trade mark application pending). You may not use them without our prior written consent.</P>

        <H2>4. Third-Party Links</H2>
        <P>The Website may contain links to third-party websites (e.g., Shopify, Calendly). We are not responsible for the content, privacy practices, or availability of such websites. Accessing third-party links is at your own risk.</P>

        <H2>5. Blog and Content</H2>
        <P>The Website may include blog articles and other content for informational and marketing purposes. Such content is provided "as is" and does not constitute professional advice (legal, financial, technical, or otherwise). You should not rely on Website content as a substitute for professional advice.</P>

        <H2>6. Disclaimers</H2>
        <P>6.1 The Website is provided on an "as is" and "as available" basis. We do not warrant that the Website will be uninterrupted, error-free, or free from viruses or other harmful components.</P>
        <P>6.2 To the maximum extent permitted by law, we disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement.</P>

        <H2>7. Limitation of Liability</H2>
        <P>7.1 Nothing in these Terms limits or excludes our liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded by law.</P>
        <P>7.2 Subject to the above, we shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Website.</P>
        <P>7.3 Our total liability to you in connection with the Website shall not exceed one hundred pounds sterling (£100).</P>

        <H2>8. Governing Law</H2>
        <P>These Terms are governed by the laws of England and Wales. The courts of England and Wales shall have exclusive jurisdiction over any dispute arising from these Terms.</P>

        <H2>9. Changes</H2>
        <P>We may update these Terms at any time by posting the revised version on the Website. Continued use of the Website after changes constitutes acceptance.</P>
      </>
    ),
  },

  // ── 3. COOKIE & TRACKING NOTICE ─────────────────────────────────────────────
  {
    slug: 'cookie-policy',
    title: 'Cookie & Tracking Notice',
    subtitle: 'For renderedfits.com and the Rendered Fits App',
    lastUpdated: 'February 2026',
    content: (
      <>
        <H2>1. Our Approach to Cookies</H2>
        <P>{COMPANY} is committed to transparency about tracking technologies. This notice explains what cookies and similar technologies are used on our Website (renderedfits.com) and within our App.</P>

        <H2>2. The Rendered Fits App (Shopify Storefront Widget)</H2>
        <P><strong>The App does NOT use cookies.</strong></P>
        <P>The Virtual Try-On widget embedded in Merchant storefronts does not drop any cookies (first-party or third-party) on the Customer's browser.</P>
        <P>The App uses browser localStorage to store a session identifier for the purpose of maintaining session continuity and enabling conversion attribution. This is not a cookie: it is not sent to our servers with every request, it is not accessible by third parties, and it can be cleared by the Customer at any time through their browser settings.</P>
        <P>The App does not use any third-party tracking scripts, advertising pixels, social media trackers, or behavioural analytics tools.</P>

        <H2>3. The renderedfits.com Website</H2>
        <P>The Website may use a limited number of cookies and similar technologies:</P>
        <Table
          headers={['Cookie / Technology', 'Type', 'Purpose', 'Duration', 'Provider']}
          rows={[
            ['Essential website cookies', 'Strictly necessary', 'Required for basic website functionality (e.g., session management, security)', 'Session or up to 12 months', 'Hosting provider'],
            ['Analytics (if implemented)', 'Performance', 'Anonymised/aggregated website usage data. We do not use Google Analytics. If analytics are implemented, we will use a privacy-respecting alternative.', 'Up to 12 months', 'TBD (e.g., Plausible, Fathom, or similar)'],
            ['Calendly embed', 'Third-party / Functional', 'If a Calendly booking widget is embedded, Calendly may set its own cookies, governed by Calendly\'s own cookie policy.', "See Calendly's policy", 'Calendly'],
            ['Instantly tracking pixel', 'Marketing', 'If marketing emails link to the Website, Instantly may track email open rates and link clicks. This does not drop cookies on the Website itself.', 'N/A (email-based)', 'Instantly'],
          ]}
        />

        <H2>4. Managing Cookies</H2>
        <P>You can manage or delete cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or be notified when a cookie is set. Please note that disabling essential cookies may affect the functionality of the Website.</P>
        <P>For more information about cookies and how to manage them, visit <ELink href="https://allaboutcookies.org">allaboutcookies.org</ELink>.</P>

        <H2>5. Consent</H2>
        <P>Where non-essential cookies are used on the Website, we will obtain your consent before setting them, in accordance with the Privacy and Electronic Communications Regulations 2003 (PECR) and applicable EU cookie laws. Strictly necessary cookies do not require consent.</P>

        <H2>6. Updates</H2>
        <P>We will update this notice if we change the cookies or tracking technologies used on the Website or in the App. The "Last Updated" date at the top of this notice indicates the most recent revision.</P>
      </>
    ),
  },

  // ── 4. ACCEPTABLE USE POLICY ─────────────────────────────────────────────────
  {
    slug: 'acceptable-use',
    title: 'Acceptable Use Policy',
    subtitle: 'For the Rendered Fits App and renderedfits.com',
    lastUpdated: 'February 2026',
    content: (
      <>
        <H2>1. Purpose</H2>
        <P>This Acceptable Use Policy sets out the rules for using the Rendered Fits virtual try-on application (the "App") and the Rendered Fits website at renderedfits.com (the "Website"). This Policy applies to all Merchants, Customers (End Users), and Website visitors.</P>

        <H2>2. Prohibited Uses</H2>
        <P>You must not use the App or the Website:</P>

        <H3>2.1 Unlawful Activity</H3>
        <UL>
          <li>For any purpose that is unlawful or fraudulent, or that facilitates unlawful or fraudulent activity</li>
          <li>To violate any applicable law, regulation, or code of practice, including data protection laws, consumer protection laws, and intellectual property laws</li>
          <li>In connection with the sale of illegal, counterfeit, or prohibited products or services</li>
        </UL>

        <H3>2.2 Harmful Content</H3>
        <UL>
          <li>To upload, transmit, or display any content that is illegal, harmful, threatening, abusive, harassing, defamatory, obscene, or otherwise objectionable</li>
          <li>To upload photographs of other individuals (including children) to the Virtual Try-On Feature without their explicit consent</li>
          <li>To upload any content depicting minors (individuals under 18) to the Virtual Try-On Feature without the consent of a parent or legal guardian, and in no circumstances to upload content depicting individuals under the applicable minimum age (16 in the UK/EU, 13 in the US)</li>
          <li>To upload any content that infringes the intellectual property rights, privacy rights, or other rights of any third party</li>
        </UL>

        <H3>2.3 Misrepresentation</H3>
        <UL>
          <li>To misrepresent Virtual Try-On Images as actual photographs, exact representations, or guarantees of product appearance, fit, colour, or quality</li>
          <li>To use the App or its outputs to deceive consumers or create false impressions about any product or service</li>
          <li>To impersonate any person or entity, or falsely state or misrepresent your affiliation with any person or entity</li>
        </UL>

        <H3>2.4 Technical Abuse</H3>
        <UL>
          <li>To attempt to reverse engineer, decompile, disassemble, or otherwise extract the source code of the App</li>
          <li>To use automated tools (bots, scrapers, crawlers) to access or interact with the App or the Website without our prior written consent</li>
          <li>To circumvent or attempt to circumvent rate limits, usage limits, or other technical restrictions</li>
          <li>To interfere with or disrupt the App, the Website, or their underlying infrastructure</li>
          <li>To access or attempt to access accounts, data, or systems that you are not authorised to access</li>
          <li>To use the App for cryptocurrency mining, distributed computing, or any purpose unrelated to the App's intended functionality</li>
        </UL>

        <H3>2.5 Data Misuse</H3>
        <UL>
          <li>To collect, harvest, or store personal information of other users without their consent and without a lawful basis</li>
          <li>To use any data obtained through the App for advertising, marketing, profiling, or automated decision-making purposes not expressly permitted by these Terms</li>
          <li>To sell, lease, trade, or otherwise commercially exploit any data obtained through the App or the Website</li>
        </UL>

        <H2>3. Enforcement</H2>
        <P>If we reasonably believe that you have violated this Acceptable Use Policy, we may take any or all of the following actions without prior notice:</P>
        <UL>
          <li>issue a warning;</li>
          <li>temporarily or permanently suspend or restrict your access to the App and/or the Website;</li>
          <li>remove any offending content;</li>
          <li>report the matter to relevant law enforcement or regulatory authorities; and/or</li>
          <li>take legal action against you, including seeking injunctive relief and/or damages.</li>
        </UL>
        <P>We are not obligated to monitor compliance with this Policy, but we reserve the right to do so.</P>

        <H2>4. Reporting Violations</H2>
        <P>If you become aware of any violation of this Acceptable Use Policy, please report it to us at <ELink href={`mailto:${EMAIL}`}>{EMAIL}</ELink>. We take all reports seriously and will investigate promptly.</P>

        <H2>5. Relationship to Other Terms</H2>
        <P>This Acceptable Use Policy supplements (and does not replace) the Merchant Terms and Conditions, the End-User Terms of Use, and the Website Terms of Use. In the event of any conflict, the more restrictive provision shall apply.</P>
      </>
    ),
  },

  // ── 5. APP PRIVACY POLICY ────────────────────────────────────────────────────
  {
    slug: 'app-privacy-policy',
    title: 'App Privacy Policy',
    subtitle: 'For the Rendered Fits Virtual Try-On Application',
    lastUpdated: 'February 2026',
    content: (
      <>
        <H2>1. Introduction</H2>
        <P>This Privacy Policy explains how {COMPANY} ("we", "us", "our") collects, uses, stores, shares, and protects personal information in connection with the Rendered Fits virtual try-on application (the "App"). The App is available to Shopify merchants ("Merchants") via the Shopify App Store and provides an AI-powered virtual try-on feature for the Merchant's customers ("End Users" or "Customers").</P>
        <P>We process personal data in accordance with the UK GDPR, the Data Protection Act 2018, the EU GDPR, the CCPA/CPRA, and all other applicable data protection and privacy laws.</P>

        <H2>2. Who We Are</H2>
        <P>The role we play depends on whose data is being processed:</P>
        <UL>
          <li><strong>Data Controller</strong> — for Merchant account data (shop domain, billing information, usage analytics).</li>
          <li><strong>Data Processor</strong> — for End User data processed through the Virtual Try-On Feature. We process this data on behalf of the Merchant, who is the data controller. Our processing is governed by our <ILink to="/legal/data-processing-agreement">Data Processing Agreement</ILink> with the Merchant.</li>
        </UL>
        <P><strong>{COMPANY}</strong> | Co. No. {COMPANY_NUMBER} | {ADDRESS} | <ELink href={`mailto:${EMAIL}`}>{EMAIL}</ELink></P>

        <H2>3. Information We Collect</H2>
        <H3>3.1 Merchant Data (via Shopify APIs)</H3>
        <UL>
          <li><strong>Shop domain and shop ID</strong> — for App authentication, billing, and account identification.</li>
          <li><strong>Subscription and billing plan data</strong> — including plan tier, usage limits, and billing period.</li>
          <li><strong>App subscription status</strong> — received via the APP_SUBSCRIPTIONS_UPDATE webhook for billing cycle management.</li>
          <li><strong>Order identifiers</strong> — order ID, cart token, and product handles, used solely for conversion attribution.</li>
        </UL>
        <H3>3.2 End User Data</H3>
        <Table
          headers={['Data Type', 'Purpose', 'Retention']}
          rows={[
            ['Customer-uploaded photograph', 'Processed by Google Gemini API to generate a virtual try-on image', 'Transient. Cached temporarily during the active session. Automatically deleted when session expires (cleanup runs every 24 hours).'],
            ['IP address', 'Used solely for rate limiting to prevent abuse', 'Session-scoped. Expires automatically when the session ends.'],
            ['Session ID', 'Stored in browser localStorage for session continuity and conversion attribution', 'Persists in browser until cleared by the Customer or session expires.'],
            ['Order-related identifiers', 'Received via Shopify webhooks for conversion attribution', 'Retained as aggregated analytics for the duration of the Merchant\'s active subscription.'],
          ]}
        />
        <H3>3.3 Information We Do NOT Collect</H3>
        <UL>
          <li>Customer names, email addresses, postal addresses, or payment details</li>
          <li>Persistent, non-essential cookies or browsing history</li>
          <li>Biometric identifiers or biometric templates — we do not extract, store, or create facial geometry scans, fingerprints, voiceprints, or any biometric template from Customer photographs</li>
        </UL>

        <H2>4. How We Use Information</H2>
        <P>All personal information is used exclusively for:</P>
        <UL>
          <li>Generating AI virtual try-on images for Customers</li>
          <li>Providing and operating the App for Merchants</li>
          <li>Managing Merchant subscriptions, billing, and plan enforcement</li>
          <li>Enforcing rate limits to prevent abuse</li>
          <li>Attributing conversions to enable Merchants to measure the ROI of the Virtual Try-On Feature</li>
          <li>Displaying analytics and usage data on the Merchant's dashboard</li>
          <li>Complying with Shopify's mandatory GDPR webhooks</li>
          <li>Maintaining the security and integrity of the App</li>
        </UL>
        <P>We do not use any collected data for advertising, profiling, selling to third parties, or training AI models.</P>

        <H2>5. Legal Basis for Processing</H2>
        <Table
          headers={['Processing Activity', 'Legal Basis (Article 6 UK GDPR)', 'Additional Basis']}
          rows={[
            ['Processing Merchant account data', 'Article 6(1)(b) — Performance of a contract', 'N/A'],
            ['Processing Merchant usage analytics', 'Article 6(1)(f) — Legitimate interests', 'N/A'],
            ['Processing End User photographs for try-on generation', 'Article 6(1)(a) — Consent', 'Article 9(2)(a) — Explicit consent (to extent processing involves biometric data)'],
            ['Processing End User IP addresses for rate limiting', 'Article 6(1)(f) — Legitimate interests', 'N/A'],
            ['Processing End User session IDs for conversion attribution', 'Article 6(1)(f) — Legitimate interests', 'N/A'],
            ['Responding to GDPR compliance webhooks', 'Article 6(1)(c) — Legal obligation', 'N/A'],
          ]}
        />

        <H2>6. Consent for End User Photo Processing</H2>
        <P>Before any Customer photograph is uploaded, the Customer is presented with a consent notice within the storefront widget. This consent notice:</P>
        <UL>
          <li>Clearly explains that the photograph will be processed using AI technology to generate a virtual try-on image</li>
          <li>Identifies Rendered Fits Ltd as the processor and the Merchant as the controller</li>
          <li>States that the photograph will be sent to Google's AI service (Gemini API) for processing</li>
          <li>Confirms that the photograph is processed transiently and is not stored long-term</li>
          <li>Provides a link to this Privacy Policy for full details</li>
          <li>Requires the Customer to actively confirm their consent before the upload function is enabled</li>
        </UL>

        <H2>7. Sharing and Sub-Processors</H2>
        <P>We do not sell, rent, lease, trade, or otherwise commercially exploit personal information. We use the following sub-processors:</P>
        <Table
          headers={['Sub-Processor', 'Purpose', 'Data Processed', 'Location']}
          rows={[
            ['Google LLC (Gemini API)', 'AI image generation — processing Customer photographs', 'Customer photographs (transient)', 'europe-west2'],
            ['Google Cloud Platform', 'Cloud infrastructure hosting and temporary file storage', 'Temporary photo cache, application data', 'europe-west2'],
            ['Shopify Inc.', 'Platform hosting, authentication, billing, webhooks', 'Merchant account data, order identifiers', 'Canada / United States'],
          ]}
        />

        <H2>8. International Data Transfers</H2>
        <P>Personal information may be transferred to Google's servers (which may be located in the United States or other jurisdictions) and Shopify servers (Canada and the United States). We ensure appropriate safeguards are in place, including:</P>
        <UL>
          <li>The UK International Data Transfer Agreement (UK IDTA) or the UK Addendum to the EU Standard Contractual Clauses</li>
          <li>The European Commission's Standard Contractual Clauses (SCCs)</li>
          <li>The EU-U.S. Data Privacy Framework (Google LLC)</li>
        </UL>

        <H2>9. Data Retention</H2>
        <Table
          headers={['Data Type', 'Retention Period', 'Deletion Method']}
          rows={[
            ['Customer photographs and generated images', 'Transient. Automatically deleted within 24 hours of session expiry.', 'Automated deletion via scheduled cleanup function'],
            ['IP-based rate-limit records', 'Session-scoped. Expire automatically.', 'Automatic expiry'],
            ['Session IDs (browser localStorage)', 'Until cleared by the Customer or session expiry', 'Customer-controlled (browser data)'],
            ['Merchant billing and subscription data', 'Duration of Merchant\'s active subscription', 'Deleted upon app uninstall (Shopify shop/redact webhook)'],
            ['Merchant aggregated analytics data', 'Duration of Merchant\'s active subscription', 'Deleted upon app uninstall (Shopify shop/redact webhook)'],
          ]}
        />

        <H2>10. Your Rights</H2>
        <Table
          headers={['Right', 'Description']}
          rows={[
            ['Right of access', 'Request a copy of the personal information we hold about you.'],
            ['Right to rectification', 'Request that we correct any inaccurate or incomplete personal information.'],
            ['Right to erasure', 'Request that we delete your personal information, subject to certain legal exceptions.'],
            ['Right to restriction', 'Request that we restrict the processing of your personal information in certain circumstances.'],
            ['Right to data portability', 'Receive your personal information in a structured, machine-readable format.'],
            ['Right to object', 'Object to processing based on legitimate interests.'],
            ['Right to withdraw consent', 'Withdraw consent at any time without affecting the lawfulness of prior processing.'],
          ]}
        />
        <P><strong>Merchants:</strong> Contact us at <ELink href={`mailto:${EMAIL}`}>{EMAIL}</ELink>.</P>
        <P><strong>End Users:</strong> In the first instance, contact the Merchant whose store you used. You may also contact us at <ELink href={`mailto:${EMAIL}`}>{EMAIL}</ELink>.</P>
        <P>You have the right to complain to the ICO (<ELink href="https://ico.org.uk">ico.org.uk</ELink>, Tel: 0303 123 1113, Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF).</P>

        <H2>11. Children's Privacy</H2>
        <P>The Virtual Try-On Feature is intended for individuals aged 16 and over (13 in jurisdictions where that is the applicable minimum age). We do not knowingly collect personal information from children under the applicable minimum age.</P>

        <H2>12. Data Security</H2>
        <UL>
          <li>Encryption of data in transit using TLS/HTTPS</li>
          <li>Transient processing of Customer photographs with automated deletion</li>
          <li>Session-scoped data storage with automatic expiry</li>
          <li>Authentication via Shopify's OAuth 2.0 Token Exchange (no separate credentials stored)</li>
          <li>Rate limiting to prevent abuse and protect system resources</li>
          <li>Access controls restricting access to personal data to authorised personnel only</li>
          <li>Regular review and monitoring of security measures</li>
        </UL>

        <H2>13. AI-Generated Content Transparency</H2>
        <P>Virtual Try-On Images are generated using Google's Gemini API. In accordance with emerging AI transparency regulations, including the EU AI Act (Article 50, effective August 2026):</P>
        <UL>
          <li>All Virtual Try-On Images are clearly identified to the Customer as AI-generated within the storefront widget</li>
          <li>Virtual Try-On Images are illustrative only and do not constitute photographs or exact representations of real-world products</li>
          <li>We will implement machine-readable marking of AI-generated content in accordance with applicable legal requirements</li>
        </UL>

        <H2>14. Contact Us</H2>
        <P>{COMPANY} | <ELink href={`mailto:${EMAIL}`}>{EMAIL}</ELink> | {ADDRESS}</P>
      </>
    ),
  },

  // ── 6. END-USER TERMS (EULA) ─────────────────────────────────────────────────
  {
    slug: 'end-user-terms',
    title: 'End-User Terms of Use',
    subtitle: 'Virtual Try-On Feature — Terms, Consent, and Privacy',
    lastUpdated: 'February 2026',
    content: (
      <>
        <KeyStatement>
          IMPORTANT — PLEASE READ BEFORE USING THE VIRTUAL TRY-ON FEATURE. By clicking "I Agree" or by uploading a photograph to the Virtual Try-On feature, you agree to these Terms of Use and to the processing of your photograph as described below. If you do not agree, please do not use the Virtual Try-On feature.
        </KeyStatement>

        <div className="text-xs font-semibold text-[#444833] tracking-wider uppercase mb-4">Part A: End-User Terms of Use</div>

        <H2>1. What is the Virtual Try-On Feature?</H2>
        <P>1.1 The Virtual Try-On feature (the "Feature") is provided by {COMPANY} ("we", "us", or "our") and is embedded in participating online stores (operated by the "Merchant"). The Feature allows you to upload a photograph of yourself and receive an AI-generated image showing you wearing a product from the store.</P>
        <P>1.2 The Feature is powered by artificial intelligence (currently Google's Gemini AI). The images it produces are AI-generated and are not photographs. They are illustrative only and may not accurately represent how the product will look or fit in real life.</P>

        <H2>2. How Your Photograph is Processed</H2>
        <P>2.1 When you upload a photograph:</P>
        <UL>
          <li>Your photograph is sent from your browser to Google's AI service (Gemini API), along with an image of the product you selected.</li>
          <li>Google's AI combines these to generate a virtual try-on image, which is sent back to your browser.</li>
          <li>Your original photograph is cached temporarily on our cloud servers during your active session. It is automatically and permanently deleted when your session expires (our cleanup system runs every 24 hours).</li>
          <li>The generated try-on image follows the same temporary lifecycle and is also automatically deleted.</li>
        </UL>
        <P>2.2 We do not:</P>
        <UL>
          <li>store your photograph long-term or in any permanent database;</li>
          <li>extract, create, or store any facial geometry scan, biometric template, or biometric identifier from your photograph;</li>
          <li>use your photograph for advertising, marketing, profiling, or any purpose other than generating the virtual try-on image you requested;</li>
          <li>sell, rent, trade, or share your photograph or any data derived from it with any third party (other than Google's AI service for the purpose of generating your try-on image); or</li>
          <li>use your photograph to train AI models.</li>
        </UL>

        <H2>3. AI-Generated Content Disclaimer</H2>
        <P>Virtual try-on images are generated by artificial intelligence. You acknowledge and agree that:</P>
        <UL>
          <li>virtual try-on images are AI-generated interpretations, not photographs or exact representations;</li>
          <li>the AI may not perfectly replicate colours, textures, fit, proportions, or other characteristics;</li>
          <li>you should not rely on virtual try-on images as a guarantee of how a product will look or fit;</li>
          <li>the AI may occasionally produce unexpected, imperfect, or inaccurate results; and</li>
          <li>the AI may slightly modify the appearance of customers, including adjustments to lighting, hair positioning, or posture.</li>
        </UL>

        <H2>4. Age Restriction</H2>
        <P>4.1 The Virtual Try-On Feature is intended for use by individuals aged 16 and over. If you are under 16, you must not use this Feature. In jurisdictions where the applicable minimum age is lower (such as 13 in the United States under COPPA), the minimum age of that jurisdiction applies.</P>
        <P>4.2 By using the Feature, you confirm that you meet the applicable minimum age requirement.</P>

        <H2>5. Acceptable Use</H2>
        <P>5.1 When using the Virtual Try-On Feature, you agree that you will:</P>
        <UL>
          <li>only upload photographs of yourself;</li>
          <li>not upload photographs of other individuals, including children, without their explicit consent;</li>
          <li>not upload any image that is illegal, offensive, harmful, defamatory, obscene, or that infringes any third party's rights;</li>
          <li>not attempt to manipulate, reverse engineer, or abuse the Feature in any way; and</li>
          <li>not use the Feature for any unlawful or fraudulent purpose.</li>
        </UL>
        <P>5.2 We reserve the right to refuse or disable access to the Feature if we reasonably believe these Acceptable Use rules have been violated.</P>

        <H2>6. Rate Limiting and Session Data</H2>
        <P>6.1 To prevent abuse, we temporarily record your IP address for rate limiting purposes. This record expires automatically when your session ends.</P>
        <P>6.2 A session identifier is stored in your browser's local storage to maintain session continuity. This is not a cookie and is not shared with third parties. You can clear it at any time through your browser settings.</P>
        <P>6.3 If you complete a purchase after using the Feature, an anonymous session identifier may be used to attribute the purchase to the try-on session. No personally identifiable information is used for this purpose.</P>

        <H2>7. Intellectual Property</H2>
        <P>7.1 You retain ownership of any photograph you upload to the Feature. By uploading a photograph, you grant us a limited, temporary, non-exclusive licence to process it solely for the purpose of generating your virtual try-on image.</P>
        <P>7.2 The virtual try-on images generated by the Feature are AI-generated content. The Merchant is granted a licence to use the generated images in connection with their store. You may save and use the generated images for your personal, non-commercial use.</P>
        <P>7.3 All intellectual property rights in the Feature itself belong to {COMPANY}.</P>

        <H2>8. No Warranties</H2>
        <P>8.1 The Virtual Try-On Feature is provided "as is" and "as available". To the maximum extent permitted by applicable law, we disclaim all warranties, express or implied.</P>
        <P>8.2 We do not guarantee that the Feature will be available at all times. The Feature may be temporarily unavailable due to maintenance, technical issues, or the unavailability of our AI service provider.</P>
        <P>8.3 Nothing in these Terms affects your statutory rights as a consumer under applicable law.</P>

        <H2>9. Limitation of Liability</H2>
        <P>9.1 Nothing in these Terms limits or excludes our liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be limited or excluded by applicable law.</P>
        <P>9.2 Subject to the above, to the maximum extent permitted by applicable law, we shall not be liable to you for any indirect, incidental, special, consequential, or punitive damages.</P>
        <P>9.3 Our total aggregate liability to you in connection with the Feature shall not exceed one hundred pounds sterling (£100).</P>

        <H2>10. Governing Law</H2>
        <P>These Terms are governed by the laws of England and Wales. If you are a consumer, you may also benefit from any mandatory consumer protection provisions of the laws of the country in which you are resident.</P>

        <div className="text-xs font-semibold text-[#444833] tracking-wider uppercase mt-10 mb-4">Part B: End-User Privacy Notice</div>

        <KeyStatement>
          <strong>Privacy at a Glance</strong>
          <ul className="mt-2 space-y-1 font-normal">
            <li>• Your photo is processed by AI to generate a try-on image — it is NOT stored permanently</li>
            <li>• Your photo is automatically deleted when your session expires (within 24 hours)</li>
            <li>• We do NOT collect your name, email, address, or payment details</li>
            <li>• We do NOT create or store any biometric templates or facial scans</li>
            <li>• We do NOT sell, share, or use your photo for advertising or AI training</li>
            <li>• Your photo is sent to Google's Gemini AI solely to generate your try-on image</li>
          </ul>
        </KeyStatement>

        <H3>Who is responsible for your data?</H3>
        <P><strong>Data Controller:</strong> The Merchant whose store you are visiting is the data controller.</P>
        <P><strong>Data Processor:</strong> {COMPANY} processes your data on behalf of the Merchant. We provide the Virtual Try-On technology.</P>

        <H3>What data is collected?</H3>
        <Table
          headers={['Data', 'Why', 'How Long']}
          rows={[
            ['Your photograph', 'To generate the virtual try-on image', 'Temporary only — deleted automatically when your session expires (cleanup runs daily)'],
            ['Your IP address', 'To enforce rate limits and prevent abuse', 'Session-scoped — expires automatically'],
            ['Session ID (in your browser)', 'To maintain session continuity and enable conversion tracking', 'Until you clear your browser data'],
          ]}
        />

        <H3>What data is NOT collected?</H3>
        <P>We do not collect: your name, email address, postal address, phone number, payment details, browsing history, or any biometric identifiers or facial geometry data.</P>

        <H3>Who processes your data?</H3>
        <UL>
          <li><strong>Google LLC (Gemini API)</strong> — receives your photograph to generate the try-on image. Google is bound by its Cloud Data Processing Addendum and does not use your photo to train AI models.</li>
          <li><strong>Shopify Inc.</strong> — hosts the Merchant's store and processes order data for conversion attribution.</li>
        </UL>

        <H3>Your legal basis (UK/EU)</H3>
        <P><strong>Consent</strong> (Article 6(1)(a) and Article 9(2)(a) UK GDPR/EU GDPR): We process your photograph based on your explicit consent, which you provide by clicking "I Agree" before uploading.</P>
        <P><strong>Legitimate interests</strong> (Article 6(1)(f)): We process your IP address for rate limiting and your session ID for conversion attribution.</P>

        <H3>Your rights</H3>
        <P>Under applicable data protection laws, you have the right to access, rectify, erase, restrict, port, and object to the processing of your personal data. You can withdraw consent at any time by not using the Feature.</P>
        <P>To exercise your rights, contact the Merchant whose store you used, or email us at <ELink href={`mailto:${EMAIL}`}>{EMAIL}</ELink>. You also have the right to complain to a supervisory authority (in the UK: the Information Commissioner's Office at <ELink href="https://ico.org.uk">ico.org.uk</ELink>).</P>
        <P>For our full privacy policy, visit: <ILink to="/legal/app-privacy-policy">renderedfits.com/legal/app-privacy-policy</ILink></P>
      </>
    ),
  },

  // ── 7. BIOMETRIC DATA POLICY ─────────────────────────────────────────────────
  {
    slug: 'biometric-policy',
    title: 'Biometric Data Retention & Destruction Policy',
    subtitle: 'Required under Illinois BIPA Section 15(a) — Publicly Available',
    lastUpdated: 'February 2026',
    content: (
      <>
        <KeyStatement>
          <strong>Key Statement:</strong> Rendered Fits Ltd does not permanently store biometric data. Customer photographs are processed transiently and are permanently destroyed within 24 hours of session expiry. No biometric identifiers or biometric templates are extracted, created, or retained at any point.
        </KeyStatement>

        <H2>1. Purpose and Scope</H2>
        <P>This Biometric Data Retention and Destruction Policy ("Policy") is published by {COMPANY} in compliance with the Illinois Biometric Information Privacy Act (740 ILCS 14), Section 15(a), which requires a private entity in possession of biometric identifiers or biometric information to develop and make available to the public a written policy establishing a retention schedule and guidelines for permanently destroying biometric identifiers and biometric information.</P>
        <P>This Policy also addresses the requirements of the Texas Capture or Use of Biometric Identifier Act (Tex. Bus. & Com. Code § 503.001), the Washington Biometric Privacy Protection Act (RCW 19.375), and other applicable US state biometric privacy laws.</P>

        <H2>2. Definitions</H2>
        <UL>
          <li><strong>"Biometric identifier"</strong> means a retina or iris scan, fingerprint, voiceprint, or scan of hand or face geometry (BIPA Section 10).</li>
          <li><strong>"Biometric information"</strong> means any information based on an individual's biometric identifier used to identify an individual (BIPA Section 10).</li>
          <li><strong>"Customer photograph"</strong> means a photograph uploaded by an end user to the App's Virtual Try-On Feature.</li>
          <li><strong>"Session"</strong> means the period during which an end user actively interacts with the Virtual Try-On Feature.</li>
          <li><strong>"AI Service"</strong> means the third-party artificial intelligence service used by the App (currently Google's Gemini API).</li>
        </UL>

        <H2>3. What Biometric Data We Process</H2>
        <Table
          headers={['Data Type', 'Description', 'Biometric Classification']}
          rows={[
            ['Customer photograph (facial image)', 'A photograph uploaded by the end user, containing the end user\'s face and body', 'May constitute a biometric identifier to the extent that facial geometry is analysed by the AI Service during image generation'],
            ['AI processing of facial features', 'The AI Service analyses the photograph to map the end user\'s appearance onto product imagery', 'May constitute biometric information derived from the biometric identifier (facial geometry)'],
            ['Generated virtual try-on image', 'The AI-generated composite image showing the end user wearing a product', 'Contains a representation of the end user\'s likeness but is an AI-generated image, not a biometric template'],
          ]}
        />
        <P className="font-semibold">What We Do NOT Process or Store:</P>
        <UL>
          <li>We do NOT extract, create, compute, or store any facial geometry template, faceprint, or biometric template from customer photographs at any point.</li>
          <li>We do NOT create or maintain any database of biometric identifiers or biometric information.</li>
          <li>We do NOT use facial recognition technology to identify or verify the identity of any individual.</li>
          <li>We do NOT compare customer photographs against any database of images or biometric records.</li>
          <li>We do NOT use customer photographs or derived data for profiling, automated decision-making, or any purpose other than generating the requested virtual try-on image.</li>
        </UL>

        <H2>4. Retention Schedule</H2>
        <Table
          headers={['Data Type', 'Retention Period', 'Maximum Retention', 'Trigger for Destruction']}
          rows={[
            ['Customer photograph (original upload)', 'Transient. Cached temporarily in cloud storage during the active session only.', 'No more than the duration of the active session plus 24 hours (the automated cleanup cycle)', 'Session expiry triggers automated cleanup'],
            ['AI-processed data (facial feature analysis within Google Gemini API)', 'Transient. Processed in real-time within the API call. Google\'s paid API does not retain prompts or responses for model training.', 'Duration of the API call (seconds)', 'Completion of the API response'],
            ['Generated virtual try-on image', 'Transient. Cached temporarily in cloud storage during the active session only.', 'No more than the duration of the active session plus 24 hours', 'Session expiry triggers automated cleanup'],
            ['Session identifier', 'Stored in the end user\'s browser localStorage', 'Until cleared by the end user or browser data expiry', 'End user action (clearing browser data)'],
            ['Consent records (timestamp, session ID)', 'Retained for the duration of the Merchant\'s active subscription for compliance audit purposes', 'Duration of Merchant\'s subscription plus 90 days', 'Merchant uninstalls the App (triggers Shopify shop/redact webhook)'],
          ]}
        />
        <P>Under no circumstances shall biometric data be retained for longer than three (3) years from the date of the individual's last interaction with the Virtual Try-On Feature, the maximum retention period permitted under BIPA Section 15(a). In practice, our actual retention period is typically less than twenty-four (24) hours.</P>

        <H2>5. Guidelines for Permanent Destruction</H2>
        <H3>5.1 Automated Session Cleanup</H3>
        <P>A scheduled cleanup function runs every 24 hours. This function:</P>
        <UL>
          <li>identifies all session data associated with expired sessions;</li>
          <li>permanently deletes all cached customer photographs from cloud storage;</li>
          <li>permanently deletes all cached generated virtual try-on images from cloud storage; and</li>
          <li>logs the deletion event (without logging the content of the deleted data) for internal audit purposes.</li>
        </UL>
        <H3>5.2 AI Service Processing</H3>
        <P>Customer photographs transmitted to the AI Service (Google Gemini API) are processed in real-time. Under Google's Cloud Data Processing Addendum for paid API usage: Google does not use prompts or responses to train AI models; processing is transient and occurs within the duration of the API call.</P>
        <H3>5.3 App Uninstallation</H3>
        <P>When a Merchant uninstalls the App, Shopify triggers a mandatory GDPR shop/redact webhook. The App deletes all data associated with the Merchant within ninety (90) days of receiving the webhook.</P>
        <H3>5.4 Manual Deletion Requests</H3>
        <P>Any individual may request deletion by contacting us at <ELink href={`mailto:${EMAIL}`}>{EMAIL}</ELink>. Given the transient nature of our processing, in most cases the data will already have been automatically destroyed before the request is received.</P>
        <H3>5.5 Destruction Standard</H3>
        <UL>
          <li>Cloud storage objects are permanently deleted using the cloud provider's standard deletion API, which marks storage blocks for overwriting and prevents recovery.</li>
          <li>Session-scoped data stored in the rate-limiting system expires automatically and is overwritten in the normal course of system operation.</li>
          <li>No backup, archive, or shadow copy of customer photographs or generated images is created or retained.</li>
        </UL>

        <H2>6. Consent and Notice</H2>
        <P>Before any customer photograph is collected or processed, the end user is provided with written notice within the Virtual Try-On widget explaining: the purpose of processing; the retention period; that biometric data will not be sold, leased, or traded; and a link to this Policy. Explicit written consent is required before the photograph upload function is enabled.</P>

        <H2>7. Prohibition on Sale, Lease, Trade, and Disclosure</H2>
        <P>The Company shall not sell, lease, trade, or otherwise profit from any individual's biometric identifiers or biometric information. We shall not disclose biometric data to any third party, except to Google LLC (via the Gemini API) solely for the purpose of generating the requested virtual try-on image, with the individual's written consent.</P>

        <H2>8. Security Measures</H2>
        <UL>
          <li>Encryption of all data in transit using TLS/HTTPS</li>
          <li>Transient processing with automated deletion (the primary security measure)</li>
          <li>Access controls restricting access to cloud infrastructure to authorised personnel only</li>
          <li>Multi-factor authentication for administrative access</li>
          <li>Use of Google Cloud Platform with ISO 27001, ISO 27017, ISO 27018, and SOC 2 Type II certifications</li>
          <li>Contractual data protection obligations imposed on all sub-processors</li>
        </UL>

        <H2>9. Data Flow Summary</H2>
        <Table
          headers={['Step', 'Action', 'Data Location', 'Duration']}
          rows={[
            ['1', 'End user views widget and is presented with the consent notice', 'End user\'s browser only', 'Until user action'],
            ['2', 'End user selects and uploads a photograph', 'Transmitted from browser to App backend via HTTPS', 'Seconds'],
            ['3', 'Photograph is temporarily cached in cloud storage', 'GCP Cloud Storage (temporary cache)', 'Duration of session + max 24 hours'],
            ['4', 'Photograph is transmitted to Google Gemini API', 'Google Gemini API servers (transient processing)', 'Seconds (duration of API call)'],
            ['5', 'Gemini API generates the virtual try-on image and returns it', 'Google Gemini API servers → App backend', 'Seconds'],
            ['6', 'Generated image is delivered to the end user\'s browser', 'End user\'s browser + temporary cloud cache', 'Duration of session + max 24 hours'],
            ['7', 'Session expires', 'N/A', 'N/A'],
            ['8', 'Automated cleanup permanently deletes all cached photographs and generated images', 'Deletion from GCP Cloud Storage', 'Automated, within 24 hours of session expiry'],
            ['9', 'No biometric data remains in any Company system', 'None', 'Permanent'],
          ]}
        />

        <H2>10. Applicable Biometric Privacy Laws</H2>
        <Table
          headers={['Law', 'Jurisdiction', 'Key Requirements Addressed']}
          rows={[
            ['Illinois Biometric Information Privacy Act (BIPA), 740 ILCS 14', 'Illinois', 'Section 15(a): Written retention/destruction policy. Section 15(b): Written notice and written consent before collection. Section 15(c): Prohibition on sale/trade/profit. Section 15(d): Prohibition on disclosure without consent. Section 15(e): Reasonable security.'],
            ['Texas Capture or Use of Biometric Identifier Act (CUBI), Tex. Bus. & Com. Code § 503.001', 'Texas', 'Notice and consent before capture. Prohibition on sale/disclosure. Destruction within reasonable time. Storage with reasonable care.'],
            ['Washington Biometric Privacy Protection Act (BPPA), RCW 19.375', 'Washington', 'Notice of collection. Consent before collection. Restrictions on commercial purpose. Security measures.'],
            ['California Consumer Privacy Act / California Privacy Rights Act (CCPA/CPRA)', 'California', 'Biometric information classified as sensitive personal information. Right to know, delete, and limit use. No sale of sensitive personal information.'],
            ['Colorado AI Act (effective Feb 2026)', 'Colorado', 'Disclosure requirements for high-risk AI systems using biometric data. Risk management obligations.'],
          ]}
        />

        <H2>11. Contact Information</H2>
        <P>If you have any questions about this Policy, or wish to exercise your rights in relation to biometric data, please contact:</P>
        <P>{COMPANY} | <ELink href={`mailto:${EMAIL}`}>{EMAIL}</ELink> | {ADDRESS}</P>
        <P>You may also contact the Merchant whose store you used the Virtual Try-On Feature on, as the Merchant is the data controller for your data.</P>
      </>
    ),
  },

  // ── 8. MERCHANT TERMS & CONDITIONS ──────────────────────────────────────────
  {
    slug: 'merchant-terms',
    title: 'Merchant Terms & Conditions',
    subtitle: 'For the Rendered Fits Virtual Try-On Application',
    lastUpdated: 'February 2026',
    content: (
      <>
        <KeyStatement>
          IMPORTANT: Please read these Terms carefully before installing or using the Rendered Fits App. By installing, accessing, or using the App, you agree to be bound by these Terms.
        </KeyStatement>

        <P>These Terms constitute a legally binding agreement between you (the Merchant) and {COMPANY} (the Company) governing your installation and use of the Rendered Fits virtual try-on application (the App) on your Shopify store. Shopify Inc. is not a party to these Terms and has no responsibility or liability in connection with the App.</P>

        <H2>1. Definitions and Interpretation</H2>
        <UL>
          <li><strong>"App"</strong> — the Rendered Fits virtual try-on application, including all software, code, interfaces, widgets, and associated documentation.</li>
          <li><strong>"AI Service"</strong> — the third-party AI image generation service (currently Google Gemini API) used by the App.</li>
          <li><strong>"Company"</strong> — {COMPANY}, company number {COMPANY_NUMBER}, registered at {ADDRESS}.</li>
          <li><strong>"Customer"</strong> — any individual who visits or transacts via the Merchant Store, including any end user who interacts with the Virtual Try-On Feature.</li>
          <li><strong>"Subscription Plan"</strong> — the pricing tier selected by the Merchant, determining the monthly allocation of Virtual Try-On generations and available features.</li>
          <li><strong>"Virtual Try-On Feature"</strong> — the functionality enabling Customers to upload a photograph and receive an AI-generated image depicting them wearing a product from the Merchant Store.</li>
        </UL>

        <H2>2. Licence Grant and Restrictions</H2>
        <P>2.1 Subject to compliance with these Terms, the Company grants the Merchant a worldwide, non-exclusive, non-transferable, non-sublicensable, revocable and limited licence to install and use the App solely on the Merchant's own Merchant Store(s).</P>
        <P>2.2 The Merchant shall not:</P>
        <UL>
          <li>resell, sublicense, assign, distribute, lease, rent, or otherwise commercially exploit the App;</li>
          <li>copy, modify, adapt, translate, reverse engineer, decompile, or create derivative works based on the App;</li>
          <li>use the App on any store or platform other than the Merchant's own Merchant Store hosted on the Shopify Platform;</li>
          <li>remove, alter, or obscure any proprietary notices or marks on the App;</li>
          <li>use the App for any unlawful purpose or in any manner that could damage or impair the App;</li>
          <li>use the App to develop a competing product or service; or</li>
          <li>use automated means to access or use the App except as permitted by its intended functionality.</li>
        </UL>

        <H2>3. App Description and AI Service</H2>
        <P>3.1 The App provides an AI-powered virtual try-on feature powered by the AI Service. The Merchant acknowledges that:</P>
        <UL>
          <li>Virtual Try-On Images are AI-generated interpretations and are not exact replicas or photographs. The Company does not guarantee 100% visual accuracy, colour fidelity, likeness, or fit.</li>
          <li>Virtual Try-On Images are illustrative only and should not be relied upon as definitive representations of how a product will appear or fit in reality.</li>
          <li>AI-generated outputs may occasionally produce unexpected, inaccurate, or undesirable results, and the Company shall not be liable for any such outputs.</li>
        </UL>
        <P>3.2 The Merchant shall not represent or imply to its Customers that Virtual Try-On Images are actual photographs, exact representations, or guarantees of product appearance, fit, colour, or quality.</P>

        <H2>4. AI Service Availability and Graceful Degradation</H2>
        <P>4.1 In the event that the AI Service is unavailable, the Virtual Try-On button will be automatically disabled or hidden on the Merchant's storefront. This behaviour is intentional and is designed to prevent broken functionality or a poor Customer experience. Such temporary disabling does not constitute a defect in or breach of these Terms.</P>

        <H2>5. Subscription Plans, Billing and Payment</H2>
        <P>5.1 The App is offered on a subscription basis. Each Subscription Plan includes a fixed monthly allocation of Virtual Try-On image generations. When the Merchant reaches the allocation limit, the Virtual Try-On Feature will be disabled until the next billing period or the Merchant upgrades.</P>
        <P>5.2 All billing is processed through the Shopify Billing API. All fees are exclusive of VAT. The Merchant may upgrade or downgrade their plan at any time through the App settings within the Shopify Admin.</P>
        <Table
          headers={['Subscription Plan', 'Monthly Fee (excl. VAT)', 'Virtual Try-On Generations / Month']}
          rows={[
            ['Starter', '£249', '700'],
            ['Growth', '£449', '1,400'],
            ['Scale', '£749', '2,600'],
            ['Professional', '£1,249', '5,000'],
          ]}
        />
        <P>Annual billing is available at a discounted rate. Annual pricing details are displayed within the App at the time of plan selection.</P>

        <H2>6. Pricing Changes</H2>
        <P>The Company reserves the right to change fees for any Subscription Plan and shall provide the Merchant with at least thirty (30) days' advance written notice before any price increase takes effect. If the Merchant does not agree to a price increase, the Merchant may cancel their Subscription Plan and uninstall the App before the new pricing takes effect.</P>

        <H2>7. Merchant Data Ownership and Security</H2>
        <P>7.1 As between the Company and the Merchant, the Merchant retains all rights, title, and interest in and to the Merchant Data, including all product data, product images, and Customer Data.</P>
        <P>7.2 The Company does not take ownership of, reuse, or commercially exploit Merchant Data, and shall not use Merchant Data for the development or training of artificial intelligence or machine learning systems.</P>
        <P>7.3 Where the Company processes Personal Information on behalf of the Merchant, the <ILink to="/legal/data-processing-agreement">Data Processing Agreement</ILink> shall apply and is incorporated into these Terms by reference.</P>

        <H2>8. Merchant Obligations</H2>
        <P>The Merchant represents, warrants and undertakes that:</P>
        <UL>
          <li>it has full power and authority to enter into these Terms;</li>
          <li>it shall comply with all applicable laws, including Data Protection Laws and consumer protection laws;</li>
          <li>it shall not use Virtual Try-On Images in a manner that is misleading, deceptive, or likely to create a false impression;</li>
          <li>it shall ensure that its Customer-facing privacy notices adequately disclose the use of the Virtual Try-On Feature and any required consents are obtained;</li>
          <li>it shall ensure that the end-user consent mechanism provided by the Company is implemented on its Merchant Store; and</li>
          <li>it shall promptly notify the Company of any suspected security breach, unauthorised access, or misuse of the App.</li>
        </UL>

        <H2>9. Intellectual Property</H2>
        <P>9.1 All Intellectual Property Rights in and to the App are and shall remain the exclusive property of the Company (or its licensors). Nothing in these Terms transfers or assigns any Intellectual Property Rights in the App to the Merchant.</P>
        <P>9.2 The Merchant retains all Intellectual Property Rights in its own product data, product images, branding, and Customer Data.</P>

        <H2>10. Suspension and Termination</H2>
        <P>10.1 The Company may suspend or restrict the Merchant's access immediately if the Merchant fails to pay subscription fees, breaches any material provision of these Terms, uses the App unlawfully, or becomes subject to insolvency proceedings.</P>
        <P>10.2 The Merchant may terminate at any time by uninstalling the App from the Shopify Admin. The Company may terminate by providing at least thirty (30) days' written notice.</P>

        <H2>11. Limitation of Liability</H2>
        <P>11.1 Nothing in these Terms limits or excludes either party's liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded by law.</P>
        <P>11.2 Subject to the above, the Company shall not be liable for loss of profits, revenue, business, anticipated savings, loss of data, indirect, special, incidental, consequential, or punitive damages.</P>
        <P>11.3 The Company's total aggregate liability shall not exceed the total fees paid by the Merchant to the Company in the twelve (12) month period immediately preceding the date on which the first claim arose (or £100 if no fees were paid).</P>

        <H2>12. Indemnification</H2>
        <P>The Merchant shall indemnify and hold harmless the Company from and against any losses, damages, liabilities, claims, actions, and expenses arising out of or in connection with: the Merchant's breach of these Terms; the Merchant's violation of any applicable law; claims by a third party arising from the Merchant's use of the App or any Virtual Try-On Image; or the Merchant's misrepresentation of Virtual Try-On Images.</P>

        <H2>13. Confidentiality</H2>
        <P>Each party shall keep confidential any Confidential Information disclosed to it by the other party and shall not use it for any purpose other than the performance of its obligations under these Terms.</P>

        <H2>14. Governing Law and Dispute Resolution</H2>
        <P>These Terms and any dispute arising out of or in connection with them shall be governed by and construed in accordance with the laws of England and Wales. The courts of England and Wales shall have exclusive jurisdiction.</P>

        <H2>15. Changes to these Terms</H2>
        <P>The Company reserves the right to amend these Terms at any time and shall provide the Merchant with at least thirty (30) days' advance written notice of any material changes.</P>

        <H2>16. Contact</H2>
        <P>{COMPANY} | <ELink href={`mailto:${EMAIL}`}>{EMAIL}</ELink> | {ADDRESS}</P>
        <P>Directors: Sydney George Stones, Sienna Olivia Stones</P>
      </>
    ),
  },

  // ── 9. DATA PROCESSING AGREEMENT ────────────────────────────────────────────
  {
    slug: 'data-processing-agreement',
    title: 'Data Processing Agreement',
    subtitle: 'Pursuant to Article 28 of the UK GDPR and EU GDPR',
    lastUpdated: 'February 2026',
    content: (
      <>
        <P>This Data Processing Agreement ("DPA") is between the Merchant (as identified in the Shopify App installation) ("Controller") and {COMPANY} ("Processor"). This DPA is incorporated into and forms part of the Merchant Terms and Conditions (the "Principal Agreement").</P>

        <H2>Background</H2>
        <P>The Controller is a Shopify merchant who has installed the Rendered Fits virtual try-on application (the "App"). The Processor provides the App, which enables the Controller's End Users to upload photographs and receive AI-generated virtual try-on images. In providing the App, the Processor processes Personal Data on behalf of the Controller.</P>

        <H2>1. Scope, Nature and Purpose of Processing</H2>
        <P>1.1 The Processor shall process Personal Data on behalf of the Controller only to the extent necessary to provide the App and the Virtual Try-On Feature, and only in accordance with this DPA and the Controller's documented instructions.</P>
        <Table
          headers={['Element', 'Detail']}
          rows={[
            ['Subject matter', 'Provision of the Rendered Fits virtual try-on application'],
            ['Nature of processing', 'Collection, temporary storage, transmission to sub-processor (Google Gemini API), AI image generation, conversion attribution, and automated deletion'],
            ['Purpose of processing', 'Generating virtual try-on images for End Users; enforcing rate limits; attributing conversions; and providing analytics to the Controller'],
            ['Duration of processing', 'For the term of the Principal Agreement, plus any period necessary to complete deletion obligations'],
            ['Categories of Data Subjects', 'End Users (customers of the Controller who interact with the Virtual Try-On Feature)'],
            ['Types of Personal Data', 'End User photographs (facial images); IP addresses; session identifiers; order identifiers; product handles in cart attributes'],
            ['Special Category Data', 'To the extent that End User photographs constitute biometric data, processed transiently based on explicit consent (Article 9(2)(a) UK GDPR/EU GDPR)'],
          ]}
        />

        <H2>2. Controller Obligations</H2>
        <P>The Controller shall:</P>
        <UL>
          <li>ensure it has all necessary rights, consents, and legal bases to provide the Personal Data to the Processor;</li>
          <li>ensure its privacy notices to End Users adequately disclose the Processing carried out by the Processor;</li>
          <li>ensure that the end-user consent mechanism provided by the Processor is implemented on the Controller's Merchant Store; and</li>
          <li>promptly notify the Processor of any circumstances that could affect the Processor's ability to comply with this DPA.</li>
        </UL>

        <H2>3. Processor Obligations</H2>
        <P>The Processor shall:</P>
        <UL>
          <li>process Personal Data only on the documented instructions of the Controller;</li>
          <li>ensure that all persons authorised to process Personal Data are subject to binding obligations of confidentiality;</li>
          <li>implement and maintain appropriate technical and organisational measures to protect Personal Data;</li>
          <li>assist the Controller in responding to Data Subject rights requests;</li>
          <li>make available all information necessary to demonstrate compliance with Article 28 of the UK GDPR and EU GDPR; and</li>
          <li>not process Personal Data for any purpose other than providing the App and the Virtual Try-On Feature.</li>
        </UL>

        <H2>4. Sub-Processors</H2>
        <P>The Controller provides general written authorisation for the Processor to engage the following sub-processors:</P>
        <Table
          headers={['Sub-Processor', 'Processing Activity', 'Data Processed', 'Location', 'Transfer Mechanism']}
          rows={[
            ['Google LLC (Gemini API)', 'AI image generation: receives End User photographs and product images', 'End User photographs, product images (transient processing)', 'europe-west2', 'EU-U.S. Data Privacy Framework; Google Cloud Data Processing Addendum with SCCs'],
            ['Google Cloud Platform (GCP)', 'Cloud infrastructure: temporary file storage, application hosting, Redis rate-limiting', 'End User photographs (cached), IP addresses, session data', 'europe-west2', 'EU-U.S. Data Privacy Framework; Google Cloud Data Processing Addendum with SCCs'],
            ['Shopify Inc.', 'Platform hosting: authentication, subscription billing, webhook delivery', 'Merchant store domain, billing data, order identifiers', 'Canada / United States', "Shopify Data Processing Addendum with SCCs; Canada adequacy decision (EU)"],
          ]}
        />
        <P>The Processor shall give the Controller prior written notice of any intended changes to the sub-processors engaged, giving the Controller a reasonable opportunity to object.</P>

        <H2>5. International Data Transfers</H2>
        <P>The Processor shall not transfer Personal Data outside the UK or EEA without appropriate safeguards. All international transfers are subject to the UK IDTA, Standard Contractual Clauses, or adequacy decisions, as set out in the Sub-Processor Register above.</P>

        <H2>6. Data Subject Rights</H2>
        <P>The Processor shall assist the Controller in responding to Data Subject rights requests. If the Processor receives a request directly from a Data Subject, the Processor shall promptly notify the Controller, not respond directly unless authorised, and cooperate in fulfilling the request.</P>

        <H2>7. Personal Data Breach Notification</H2>
        <P>7.1 The Processor shall notify the Controller without undue delay (and in any event within forty-eight (48) hours) upon becoming aware of a Personal Data Breach affecting the Controller's Personal Data.</P>
        <P>7.2 The Processor shall cooperate with the Controller in investigating and remediating the breach, and assisting the Controller in notifying the relevant supervisory authority (within seventy-two (72) hours under Article 33 UK GDPR/EU GDPR) where required.</P>

        <H2>8. Audit Rights</H2>
        <P>The Processor shall make available all information reasonably necessary to demonstrate compliance with this DPA. The Controller may conduct audits with at least thirty (30) days' prior written notice, during normal business hours. The Controller may not conduct more than one (1) audit in any twelve (12) month period, unless required by a supervisory authority or following a Personal Data Breach.</P>

        <H2>9. Technical and Organisational Measures</H2>
        <UL>
          <li><strong>Encryption:</strong> All data in transit is encrypted using TLS/HTTPS. No Personal Data is transmitted in plaintext.</li>
          <li><strong>Transient Processing:</strong> End User photographs are processed transiently, cached temporarily in GCP Cloud Storage during the active session, and automatically deleted within 24 hours of session expiry. No facial geometry templates or biometric identifiers are extracted, created, or stored.</li>
          <li><strong>Access Control:</strong> Merchant authentication is handled entirely through Shopify's OAuth 2.0 Token Exchange. Access to production systems is restricted to authorised Processor personnel. Administrative access requires multi-factor authentication.</li>
          <li><strong>Rate Limiting:</strong> IP-based rate limiting prevents abuse of the Virtual Try-On Feature. Rate-limit records expire automatically.</li>
          <li><strong>Automated Deletion:</strong> A scheduled cleanup function runs every 24 hours to permanently delete expired session data, including cached photographs and generated images.</li>
        </UL>

        <H2>10. Term, Termination and Data Deletion</H2>
        <P>This DPA shall come into effect on the date the Controller installs the App and shall terminate automatically upon termination or expiry of the Principal Agreement (including upon uninstallation). Upon termination, the Processor shall securely delete all of the Controller's Personal Data within ninety (90) days and provide written confirmation of deletion upon the Controller's request.</P>

        <H2>11. Contact</H2>
        <P>{COMPANY} | <ELink href={`mailto:${EMAIL}`}>{EMAIL}</ELink> | {ADDRESS}</P>
      </>
    ),
  },
];

// ─── Nav items ────────────────────────────────────────────────────────────────

const docNavItems = [
  { slug: 'privacy-policy', label: 'Website Privacy Policy' },
  { slug: 'terms-of-use', label: 'Terms of Use' },
  { slug: 'cookie-policy', label: 'Cookie Policy' },
  { slug: 'acceptable-use', label: 'Acceptable Use' },
  { slug: 'app-privacy-policy', label: 'App Privacy Policy' },
  { slug: 'end-user-terms', label: 'End-User Terms' },
  { slug: 'biometric-policy', label: 'Biometric Data Policy' },
  { slug: 'merchant-terms', label: 'Merchant T&Cs' },
  { slug: 'data-processing-agreement', label: 'Data Processing Agreement' },
];

// ─── Legal Hub (index page) ────────────────────────────────────────────────────

export const LegalHub: React.FC = () => {
  useEffect(() => {
    document.title = 'Legal | Rendered Fits';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <Link to="/" className="text-lg tracking-[0.05em] font-light text-gray-900">Rendered Fits</Link>
          <span className="text-xs text-gray-400 tracking-wider uppercase">Legal</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-serif italic text-gray-900 mb-3">Legal Documents</h1>
        <p className="text-gray-500 mb-12 text-sm leading-relaxed max-w-2xl">
          {COMPANY} is committed to transparency and compliance. Find all our legal documentation below. For questions, contact us at <a href={`mailto:${EMAIL}`} className="text-[#444833] underline underline-offset-2">{EMAIL}</a>.
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
                {doc && <p className="text-xs text-gray-500">Last updated: {doc.lastUpdated}</p>}
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

// ─── Individual Legal Document Page ───────────────────────────────────────────

const LegalPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const doc = legalDocs.find(d => d.slug === slug);

  useEffect(() => {
    if (doc) document.title = `${doc.title} | Rendered Fits`;
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
                {COMPANY}<br />Co. No. {COMPANY_NUMBER}<br />{ADDRESS}
              </p>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0">
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

          <div>{doc.content}</div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-xs text-gray-400">Version 1.0 — {doc.lastUpdated} · {COMPANY}</p>
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
