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
const OL: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-600 mb-3">{children}</ol>
);
const LI: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="leading-relaxed">{children}</li>
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

// ─── Legal Documents ──────────────────────────────────────────────────────────

const legalDocs: LegalDoc[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // 1. Website Legal Documents
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'website-legal-documents',
    title: 'Website Legal Documents',
    subtitle: 'For renderedfits.com',
    lastUpdated: 'February 2026',
    content: (
      <>
        {/* PART 1 */}
        <H2>PART 1: WEBSITE PRIVACY POLICY</H2>
        <P>This Privacy Policy explains how Rendered Fits Ltd ("we", "us", "our") collects and uses personal information when you visit our website at renderedfits.com (the "Website"). This policy applies to the Website only. If you are a Shopify merchant using our App, or a customer using the Virtual Try-On Feature, please refer to our <ILink to="/legal/app-privacy-policy">App Privacy Policy</ILink>.</P>

        <H2>1. Who We Are</H2>
        <P>Rendered Fits Ltd, a company incorporated in England and Wales (company number 16922551). Registered office: 50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ. Contact: <ELink href="mailto:mail@renderedfits.com">mail@renderedfits.com</ELink>. We are the data controller for personal information collected through this Website.</P>

        <H2>2. Information We Collect</H2>
        <H3>2.1 Information You Provide</H3>
        <UL>
          <LI>Contact form submissions (name, email, content)</LI>
          <LI>Waitlist sign-ups (email, optionally name/business)</LI>
          <LI>Newsletter subscriptions (email)</LI>
        </UL>
        <H3>2.2 Information Collected Automatically</H3>
        <UL>
          <LI>Analytics data (privacy-respecting, anonymised, no Google Analytics)</LI>
          <LI>Server logs (IP, browser type, access times, 90-day retention)</LI>
        </UL>
        <H3>2.3 Information We Do NOT Collect</H3>
        <UL>
          <LI>Payment information</LI>
          <LI>Biometric data</LI>
          <LI>Special category data</LI>
          <LI>Precise geolocation</LI>
          <LI>Social media profile data</LI>
        </UL>

        <H2>3. How We Use Your Information</H2>
        <Table
          headers={['Purpose', 'Legal Basis (Article 6 UK GDPR)']}
          rows={[
            ['Responding to your enquiries and contact form submissions', 'Article 6(1)(b) — Steps taken at your request prior to entering into a contract; or Article 6(1)(f) — Legitimate interests (responding to enquiries)'],
            ['Managing waitlist sign-ups and sending waitlist updates', 'Article 6(1)(a) — Consent'],
            ['Sending marketing emails and newsletters', 'Article 6(1)(a) — Consent (you can unsubscribe at any time via the link in each email)'],
            ['Website analytics (anonymised/aggregated)', 'Article 6(1)(f) — Legitimate interests (understanding Website usage to improve our content and services)'],
            ['Security monitoring and abuse prevention', 'Article 6(1)(f) — Legitimate interests (protecting our Website and systems)'],
          ]}
        />

        <H2>4. Sharing Your Information</H2>
        <P>We do not sell, rent, or trade your personal information. We may share your information with:</P>
        <UL>
          <LI>Email service providers (e.g., Instantly)</LI>
          <LI>Hosting providers</LI>
          <LI>Professional advisers</LI>
          <LI>Law enforcement</LI>
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
        <P>You have the right to access, rectify, erase, restrict, port, and object to the processing of your personal data. You can withdraw consent at any time. To exercise your rights, contact us at <ELink href="mailto:mail@renderedfits.com">mail@renderedfits.com</ELink>. You also have the right to complain to the ICO (<ELink href="https://ico.org.uk">ico.org.uk</ELink>).</P>

        <H2>8. Children</H2>
        <P>The Website is not directed at individuals under 16. We do not knowingly collect personal information from children.</P>

        <H2>9. Changes</H2>
        <P>We may update this Privacy Policy from time to time. The 'Last Updated' date indicates the most recent revision.</P>

        {/* PART 2 */}
        <H2>PART 2: WEBSITE TERMS OF USE</H2>

        <H2>1. Introduction</H2>
        <P>These Terms of Use govern your access to and use of the Rendered Fits website at renderedfits.com (the 'Website'). By accessing the Website, you agree to these Terms. If you do not agree, please do not use the Website. The Website is operated by Rendered Fits Ltd, a company incorporated in England and Wales (company number 16922551).</P>

        <H2>2. Use of the Website</H2>
        <H3>2.1</H3>
        <P>The Website is provided for informational purposes, including information about our App, pricing, and resources for Shopify merchants.</P>
        <H3>2.2</H3>
        <P>You may use the Website for lawful purposes only. You must not:</P>
        <UL>
          <LI>(a) use in breach of law</LI>
          <LI>(b) transmit viruses</LI>
          <LI>(c) gain unauthorised access</LI>
          <LI>(d) use automated tools without consent</LI>
          <LI>(e) send unsolicited commercial communications</LI>
        </UL>

        <H2>3. Intellectual Property</H2>
        <H3>3.1</H3>
        <P>All content is property of Rendered Fits Ltd (or licensors), protected by intellectual property laws.</P>
        <H3>3.2</H3>
        <P>You may view, download, and print content for personal non-commercial use, without modifying any notices.</P>
        <H3>3.3</H3>
        <P>The Rendered Fits name and logo are trade marks (application pending). No use without consent.</P>

        <H2>4. Third-Party Links</H2>
        <P>The Website may contain links to third-party websites (e.g., Shopify, Calendly). We are not responsible for the content, privacy practices, or availability of such websites. Accessing third-party links is at your own risk.</P>

        <H2>5. Blog and Content</H2>
        <P>The Website may include blog articles and other content for informational and marketing purposes. Such content is provided 'as is' and does not constitute professional advice (legal, financial, technical, or otherwise). You should not rely on Website content as a substitute for professional advice.</P>

        <H2>6. Disclaimers</H2>
        <H3>6.1</H3>
        <P>The Website is provided "as is" and "as available". We make no warranty that the Website will be uninterrupted or error-free.</P>
        <H3>6.2</H3>
        <P>To the maximum extent permitted by law, we disclaim all warranties, including merchantability and fitness for a particular purpose.</P>

        <H2>7. Limitation of Liability</H2>
        <H3>7.1</H3>
        <P>Nothing in these Terms limits our liability for death or personal injury caused by negligence, fraud, or other non-excludable liability.</P>
        <H3>7.2</H3>
        <P>We are not liable for indirect, incidental, special, or consequential damages arising from use of the Website.</P>
        <H3>7.3</H3>
        <P>Our total liability to you shall not exceed £100.</P>

        <H2>8. Governing Law</H2>
        <P>These Terms are governed by the laws of England and Wales. The courts of England and Wales shall have exclusive jurisdiction over any dispute arising from these Terms.</P>

        <H2>9. Changes</H2>
        <P>We may update these Terms at any time by posting the revised version on the Website. Continued use of the Website after changes constitutes acceptance.</P>

        {/* PART 3 */}
        <H2>PART 3: COOKIE AND TRACKING NOTICE</H2>

        <H2>1. Our Approach to Cookies</H2>
        <P>Rendered Fits Ltd is committed to transparency about tracking technologies. This notice explains what cookies and similar technologies are used on our Website (renderedfits.com) and within our App.</P>

        <H2>2. The Rendered Fits App (Shopify Storefront Widget)</H2>
        <P>The App does NOT use cookies. The Virtual Try-On widget embedded in Merchant storefronts does not drop any cookies (first-party or third-party) on the Customer's browser. The App uses browser localStorage to store a session identifier for the purpose of maintaining session continuity and enabling conversion attribution. This is not a cookie: it is not sent to our servers with every request, it is not accessible by third parties, and it can be cleared by the Customer at any time through their browser settings. The App does not use any third-party tracking scripts, advertising pixels, social media trackers, or behavioural analytics tools.</P>

        <H2>3. The renderedfits.com Website</H2>
        <P>The Website may use a limited number of cookies and similar technologies:</P>
        <Table
          headers={['Cookie / Technology', 'Type', 'Purpose', 'Duration', 'Provider']}
          rows={[
            ['Essential website cookies', 'Strictly necessary', 'Required for basic website functionality (e.g., session management, security)', 'Session or up to 12 months', 'Hosting provider'],
            ['Analytics (if implemented)', 'Performance', 'Anonymised/aggregated website usage data to help us improve the Website. We do not use Google Analytics. If analytics are implemented, we will use a privacy-respecting alternative.', 'Up to 12 months', 'TBD (e.g., Plausible, Fathom, or similar)'],
            ['Calendly embed', 'Third-party / Functional', "If a Calendly booking widget is embedded on the Website, Calendly may set its own cookies. These are governed by Calendly's own cookie policy.", "See Calendly's policy", 'Calendly'],
            ['Instantly tracking pixel', 'Marketing', 'If marketing emails link to the Website, Instantly may track email open rates and link clicks. This does not drop cookies on the Website itself but may track referral data.', 'N/A (email-based)', 'Instantly'],
          ]}
        />

        <H2>4. Managing Cookies</H2>
        <P>You can manage or delete cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or be notified when a cookie is set. Please note that disabling essential cookies may affect the functionality of the Website. For more information about cookies and how to manage them, visit <ELink href="https://allaboutcookies.org">allaboutcookies.org</ELink>.</P>

        <H2>5. Consent</H2>
        <P>Where non-essential cookies are used on the Website, we will obtain your consent before setting them, in accordance with the Privacy and Electronic Communications Regulations 2003 (PECR) and applicable EU cookie laws. Strictly necessary cookies do not require consent.</P>

        <H2>6. Updates</H2>
        <P>We will update this notice if we change the cookies or tracking technologies used on the Website or in the App. The 'Last Updated' date at the top of this notice indicates the most recent revision.</P>

        {/* PART 4 */}
        <H2>PART 4: ACCEPTABLE USE POLICY</H2>

        <H2>1. Purpose</H2>
        <P>This Acceptable Use Policy sets out the rules for using the Rendered Fits virtual try-on application (the 'App') and the Rendered Fits website at renderedfits.com (the 'Website'). This Policy applies to all Merchants, Customers (End Users), and Website visitors.</P>

        <H2>2. Prohibited Uses</H2>
        <P>You must not use the App or the Website:</P>

        <H3>2.1 Unlawful Activity</H3>
        <UL>
          <LI>In any way that violates any applicable local, national, or international law or regulation</LI>
          <LI>For any fraudulent purpose or in connection with any criminal activity</LI>
          <LI>To infringe the rights (including intellectual property rights, privacy rights, or publicity rights) of any third party</LI>
        </UL>

        <H3>2.2 Harmful Content</H3>
        <UL>
          <LI>To transmit or upload any material that contains viruses, Trojan horses, worms, or other malicious code</LI>
          <LI>To upload, post, or transmit any content that is defamatory, obscene, offensive, hateful, or inflammatory</LI>
          <LI>To generate, display, or distribute content that sexualises minors or depicts non-consensual acts</LI>
          <LI>To upload photographs of third parties without their knowledge and consent</LI>
          <LI>To use the Virtual Try-On Feature to produce or disseminate deepfakes or other misleading AI-generated content intended to deceive</LI>
        </UL>

        <H3>2.3 Misrepresentation</H3>
        <UL>
          <LI>To misrepresent your identity, affiliation, or the source of any content</LI>
          <LI>To falsely imply that content is endorsed or approved by Rendered Fits Ltd</LI>
          <LI>To use the App or Website to deceive consumers about the nature, quality, or characteristics of products</LI>
        </UL>

        <H3>2.4 Technical Abuse</H3>
        <UL>
          <LI>To attempt to gain unauthorised access to any part of the App or Website, or to any server, computer, or database connected to it</LI>
          <LI>To attack the App or Website via a denial-of-service attack or a distributed denial-of-service attack</LI>
          <LI>To use automated tools (bots, scrapers, crawlers) to interact with the App or Website without our prior written consent</LI>
          <LI>To attempt to reverse-engineer, decompile, disassemble, or derive the source code of the App</LI>
          <LI>To circumvent any rate-limiting, access controls, or other technical measures implemented in the App or Website</LI>
          <LI>To use the App or Website in a way that could damage, overburden, or impair its infrastructure</LI>
        </UL>

        <H3>2.5 Data Misuse</H3>
        <UL>
          <LI>To collect, harvest, or store personal data about other users without their explicit consent</LI>
          <LI>To use the App to process personal data of End Users in violation of applicable data protection laws</LI>
          <LI>To use outputs of the App (including Generated Images) to create biometric profiles or surveillance databases</LI>
        </UL>

        <H2>3. Enforcement</H2>
        <P>If we reasonably believe that you have violated this Acceptable Use Policy, we may take any or all of the following actions without prior notice:</P>
        <UL>
          <LI>(a) issue a warning</LI>
          <LI>(b) temporarily or permanently suspend or restrict access</LI>
          <LI>(c) remove offending content</LI>
          <LI>(d) report to law enforcement</LI>
          <LI>(e) take legal action</LI>
        </UL>
        <P>We are not obligated to monitor compliance with this Policy, but we reserve the right to do so.</P>

        <H2>4. Reporting Violations</H2>
        <P>If you become aware of any violation of this Acceptable Use Policy, please report it to us at <ELink href="mailto:mail@renderedfits.com">mail@renderedfits.com</ELink>. We take all reports seriously and will investigate promptly.</P>

        <H2>5. Relationship to Other Terms</H2>
        <P>This Acceptable Use Policy supplements (and does not replace) the Merchant Terms and Conditions, the End-User Terms of Use, and the Website Terms of Use. In the event of any conflict, the more restrictive provision shall apply.</P>
      </>
    ),
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 2. App Privacy Policy
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'app-privacy-policy',
    title: 'App Privacy Policy',
    subtitle: 'For the Rendered Fits Virtual Try-On Application',
    lastUpdated: 'February 2026',
    content: (
      <>
        <H2>1. Introduction</H2>
        <P>This Privacy Policy ("Policy") explains how Rendered Fits Ltd ("Company", "we", "us", "our") collects, uses, shares, and protects personal information in connection with the Rendered Fits Virtual Try-On application (the "App"), which is distributed via the Shopify App Store and integrated into Shopify merchants' storefronts.</P>
        <P>This Policy applies to:</P>
        <UL>
          <LI><strong>Merchants</strong> — Shopify store owners and their staff who install and manage the App</LI>
          <LI><strong>End Users (Customers)</strong> — individuals who use the Virtual Try-On feature on a Merchant's storefront</LI>
        </UL>
        <P>This Policy is designed to comply with the following legal frameworks:</P>
        <UL>
          <LI><strong>UK General Data Protection Regulation (UK GDPR)</strong> and the Data Protection Act 2018</LI>
          <LI><strong>EU General Data Protection Regulation (EU GDPR)</strong> (Regulation 2016/679) where applicable</LI>
          <LI><strong>California Consumer Privacy Act (CCPA) / California Privacy Rights Act (CPRA)</strong> where applicable</LI>
          <LI>Shopify's Partner Program Agreement and API Terms of Service</LI>
        </UL>
        <P>By installing the App or using the Virtual Try-On feature, you acknowledge that you have read this Policy.</P>

        <H2>2. Who We Are</H2>
        <P>Rendered Fits Ltd is a company incorporated in England and Wales (company number 16922551), with a registered office at 50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ, United Kingdom.</P>
        <P>For the purposes of UK GDPR and EU GDPR:</P>
        <UL>
          <LI>With respect to <strong>Merchant Data</strong>: Rendered Fits Ltd is the <strong>data controller</strong>.</LI>
          <LI>With respect to <strong>End User (Customer) Data</strong> collected via the Virtual Try-On feature on a Merchant's storefront: the <strong>Merchant is the data controller</strong> and Rendered Fits Ltd acts as a <strong>data processor</strong> on the Merchant's behalf. Our obligations as a processor are set out in our <ILink to="/legal/data-processing-agreement">Data Processing Agreement</ILink>.</LI>
        </UL>
        <P>We are registered with the Information Commissioner's Office (ICO) in the United Kingdom. Contact: <ELink href="mailto:mail@renderedfits.com">mail@renderedfits.com</ELink>.</P>

        <H2>3. Information We Collect</H2>

        <H3>3.1 Information Collected Through Shopify's APIs (Merchant Data)</H3>
        <P>When a Merchant installs the App via the Shopify App Store, we receive the following information through Shopify's OAuth and API systems:</P>
        <UL>
          <LI>Shop domain and shop ID</LI>
          <LI>Subscription and billing plan data (managed through Shopify's Billing API)</LI>
          <LI>App subscription status (active, trial, cancelled)</LI>
          <LI>Order identifiers (order ID, cart token) — received via Shopify webhooks for the limited purpose of conversion attribution</LI>
          <LI>GDPR-related webhooks (customers/data_request, customers/redact, shop/redact) in compliance with Shopify's mandatory GDPR webhook requirements</LI>
        </UL>
        <P>We do not access Merchant store inventory, customer lists, product pricing, or any other Shopify data beyond what is listed above.</P>

        <H3>3.2 Information Collected Directly from Merchants</H3>
        <UL>
          <LI>We do not separately collect contact details from Merchants beyond what Shopify provides via OAuth authentication</LI>
          <LI>Authentication tokens (OAuth access tokens) are stored securely and used solely to authenticate API calls on behalf of the Merchant</LI>
          <LI>Usage logs — aggregated, non-identifiable analytics about App usage (e.g., number of AI generations per subscription period), used solely for billing verification and product improvement</LI>
        </UL>

        <H3>3.3 Information Collected from End Users (Customers)</H3>
        <Table
          headers={['Data Type', 'Purpose', 'Retention']}
          rows={[
            ['Customer-uploaded photograph', "Processed by the AI Service (Google Gemini API) to generate a virtual try-on image. The photo is sent directly from the Customer's browser to the AI Service.", 'Transient. Cached temporarily in cloud storage during the active session. Automatically deleted by a cleanup function that runs every 24 hours and removes files for expired sessions.'],
            ['IP address', 'Used solely for rate limiting (e.g., maximum generations per IP per day) to prevent abuse and protect system resources.', "Session-scoped. Stored temporarily in the application's rate-limiting system and expires automatically when the session ends."],
            ['Session ID', "Stored in the Customer's browser localStorage to maintain session continuity and enable conversion attribution.", "Persists in the Customer's browser until cleared by the Customer or until the session expires."],
            ['Order-related identifiers (order ID, cart token)', "Received via Shopify webhooks for the limited purpose of attributing completed purchases to virtual try-on sessions, enabling Merchants to measure ROI.", "Retained as aggregated analytics for the duration of the Merchant's active subscription. Individual identifiers are not retained beyond the attribution window."],
            ['Product handles in Shopify cart attributes', 'Stored to enable conversion tracking between virtual try-on sessions and completed purchases.', "Session-scoped, managed through Shopify's cart attribute system."],
          ]}
        />

        <H3>3.4 Information We Do NOT Collect</H3>
        <P>We do not collect the following from End Users:</P>
        <UL>
          <LI>Customer names, email addresses, postal addresses, or phone numbers</LI>
          <LI>Payment details or financial information</LI>
          <LI>Persistent cookies or cross-site tracking identifiers</LI>
          <LI>Browsing history or behavioural tracking data beyond the current session</LI>
          <LI>Social media profile data</LI>
          <LI>Precise geolocation data</LI>
          <LI>Biometric identifiers or biometric templates (the photograph is processed transiently; no facial geometry, faceprint, or biometric template is extracted or stored)</LI>
          <LI>Device fingerprints</LI>
          <LI>Any data from minors under the age of 16 (or 13 in the United States)</LI>
        </UL>

        <H2>4. How We Use Information</H2>
        <P>We use the information we collect to:</P>
        <UL>
          <LI>Provide the Virtual Try-On functionality — generating AI try-on images in response to Customer requests</LI>
          <LI>Authenticate Merchants and manage their subscriptions via Shopify's systems</LI>
          <LI>Enforce usage limits (rate limiting per IP address and per subscription plan)</LI>
          <LI>Enable conversion attribution — connecting virtual try-on sessions to completed purchases for Merchant analytics</LI>
          <LI>Monitor App performance and availability</LI>
          <LI>Comply with legal obligations, including Shopify's mandatory GDPR webhooks</LI>
          <LI>Investigate and respond to reports of abuse, security incidents, or policy violations</LI>
          <LI>Improve the App's functionality and user experience (using aggregated, non-identifiable data only)</LI>
        </UL>
        <P>We do not use any collected data for:</P>
        <UL>
          <LI>Advertising, marketing, or retargeting End Users</LI>
          <LI>Training or improving AI models (Customer photographs are not used for AI training)</LI>
          <LI>Creating profiles of End User behaviour across multiple sessions or websites</LI>
          <LI>Selling, renting, or trading personal information to third parties</LI>
          <LI>Any purpose incompatible with the purposes described in this Policy</LI>
        </UL>

        <H2>5. Legal Basis for Processing</H2>
        <Table
          headers={['Processing Activity', 'Legal Basis (Article 6 UK GDPR)', 'Additional Basis (if applicable)']}
          rows={[
            ['Processing Customer photographs to generate try-on images', 'Article 6(1)(a) — Consent (obtained via the in-widget consent notice before photo upload)', 'Article 9(2)(a) — Explicit consent for potentially biometric data processing'],
            ['Rate limiting via IP address', 'Article 6(1)(f) — Legitimate interests (protecting system integrity and preventing abuse)', ''],
            ['Session continuity via localStorage session ID', 'Article 6(1)(f) — Legitimate interests (providing a functional and continuous user experience)', ''],
            ['Conversion attribution via order identifiers', "Article 6(1)(f) — Legitimate interests (enabling Merchants to measure ROI; data minimised and session-scoped)", ''],
            ['Merchant authentication and subscription management', 'Article 6(1)(b) — Performance of a contract (the App subscription agreement with the Merchant)', ''],
            ['Responding to GDPR webhooks and data subject requests', 'Article 6(1)(c) — Legal obligation', ''],
            ['App security monitoring and incident response', 'Article 6(1)(f) — Legitimate interests (protecting the App and its users)', ''],
          ]}
        />

        <H2>6. Consent for End User Photo Processing</H2>
        <P>Before a Customer uploads a photograph through the Virtual Try-On widget, they are presented with a consent notice that:</P>
        <UL>
          <LI>Clearly explains that their photograph will be processed by Google's Gemini AI to generate a virtual try-on image</LI>
          <LI>States that the photograph is stored temporarily and deleted automatically when the session expires</LI>
          <LI>States that the photograph will not be used for advertising, profiling, or AI training</LI>
          <LI>Identifies Rendered Fits Ltd as the processor and the Merchant as the controller</LI>
          <LI>Provides a link to this Privacy Policy and the relevant End-User Terms of Use</LI>
          <LI>Requires an affirmative action (clicking "I Agree" or equivalent) before photo upload is enabled</LI>
        </UL>
        <P>Consent may be withdrawn at any time by closing the widget or contacting the Merchant. Withdrawal of consent does not affect the lawfulness of processing carried out prior to withdrawal.</P>

        <H2>7. Sharing and Disclosure</H2>

        <H3>7.1 Third-Party Service Providers</H3>
        <P>We share personal data with the following sub-processors, strictly for the purposes described:</P>
        <Table
          headers={['Sub-Processor', 'Purpose', 'Data Processed', 'Location']}
          rows={[
            ['Google LLC (Gemini API)', 'AI image generation — processing Customer photographs to generate virtual try-on images', 'Customer photographs (transient processing)', 'europe-west2'],
            ['Google Cloud Platform', 'Cloud infrastructure hosting and temporary file storage', 'Temporary photo cache, application data', 'europe-west2'],
            ['Shopify Inc.', 'Platform hosting, authentication, billing, webhooks', 'Merchant account data, order identifiers', 'Canada / United States'],
          ]}
        />

        <H3>7.2 Other Disclosures</H3>
        <UL>
          <LI><strong>Legal compliance</strong>: We may disclose personal data where required by law, court order, or to cooperate with law enforcement or regulatory authorities</LI>
          <LI><strong>Business transfers</strong>: In the event of a merger, acquisition, or sale of all or part of our business, personal data may be transferred as part of that transaction, subject to the same protections as described in this Policy</LI>
          <LI><strong>Protection of rights</strong>: We may disclose personal data to protect the rights, property, or safety of Rendered Fits Ltd, our Merchants, End Users, or others</LI>
        </UL>

        <H2>8. International Data Transfers</H2>
        <P>Some of our sub-processors are located outside the UK and EEA. Where personal data is transferred internationally, we ensure appropriate safeguards are in place:</P>
        <UL>
          <LI>Google LLC participates in the <strong>EU-U.S. Data Privacy Framework</strong> and Google's Cloud Data Processing Addendum incorporates Standard Contractual Clauses (SCCs) approved by the European Commission and the UK ICO</LI>
          <LI>Shopify's Data Processing Addendum incorporates SCCs for transfers from the EU/EEA, and Canada benefits from an EU adequacy decision for commercial transfers</LI>
          <LI>All Customer photograph processing by the Gemini API is routed through Google's <strong>europe-west2</strong> (London) region where technically feasible</LI>
        </UL>

        <H2>9. Data Retention</H2>
        <Table
          headers={['Data Type', 'Retention Period', 'Deletion Method']}
          rows={[
            ['Customer photographs (uploaded)', 'Transient — retained only for the active session duration. Automatically deleted by a scheduled cleanup function running every 24 hours.', 'Automated deletion via cloud storage lifecycle policy and cleanup function'],
            ['Generated try-on images', 'Same lifecycle as uploaded photographs — deleted within 24 hours of session expiry', 'Automated deletion via cloud storage lifecycle policy'],
            ['IP addresses (rate limiting)', 'Session-scoped — expires automatically when the session ends', 'Automatic expiry via rate-limiting system TTL'],
            ["Session IDs", "Stored in the Customer's browser localStorage; expires or is cleared by the Customer", 'Not stored on our servers beyond session duration'],
            ['Order identifiers (conversion attribution)', "Duration of Merchant's active subscription. Deleted within 30 days of subscription termination.", 'Automated deletion on subscription termination'],
            ['Merchant authentication tokens', "Duration of Merchant's active subscription. Deleted within 30 days of App uninstallation.", 'Automated deletion triggered by Shopify uninstall webhook'],
            ['Aggregated usage analytics', 'Up to 24 months, in anonymised/aggregated form only', 'Periodic review and deletion'],
          ]}
        />

        <H2>10. Your Rights</H2>
        <Table
          headers={['Right', 'Description']}
          rows={[
            ['Right of access (Article 15)', 'You have the right to obtain confirmation of whether we process your personal data, and to receive a copy of that data.'],
            ['Right to rectification (Article 16)', 'You have the right to have inaccurate personal data corrected.'],
            ['Right to erasure (Article 17)', "You have the right to request deletion of your personal data ('right to be forgotten'), subject to certain exceptions."],
            ['Right to restriction (Article 18)', 'You have the right to request that we restrict processing of your personal data in certain circumstances.'],
            ['Right to data portability (Article 20)', 'You have the right to receive your personal data in a structured, commonly used, machine-readable format.'],
            ['Right to object (Article 21)', 'You have the right to object to processing based on legitimate interests.'],
            ['Right to withdraw consent', 'Where processing is based on consent, you may withdraw consent at any time without affecting the lawfulness of prior processing.'],
            ['Right to lodge a complaint', 'You have the right to complain to a supervisory authority (e.g., the ICO in the UK).'],
          ]}
        />
        <P><strong>How to exercise your rights:</strong></P>
        <UL>
          <LI><strong>Merchants</strong>: Contact us at <ELink href="mailto:mail@renderedfits.com">mail@renderedfits.com</ELink>. We will respond within 30 days.</LI>
          <LI><strong>End Users (Customers)</strong>: Contact either the Merchant (as data controller) or contact us directly at <ELink href="mailto:mail@renderedfits.com">mail@renderedfits.com</ELink>. Note that because we do not retain photographs beyond the active session, many rights (e.g., access, erasure) may be automatically satisfied by our retention practices.</LI>
        </UL>

        <H2>11. Children's Privacy</H2>
        <P>The App is not directed at children under the age of 16 (or 13 in the United States). We do not knowingly collect personal data from children. Merchants are responsible for ensuring that their storefronts include appropriate age restrictions where required. If we become aware that we have inadvertently collected personal data from a child under the applicable minimum age, we will promptly delete such data.</P>

        <H2>12. Data Security</H2>
        <P>We implement appropriate technical and organisational measures to protect personal data against unauthorised access, accidental loss, destruction, or alteration. These measures include:</P>
        <UL>
          <LI>All data transmitted between the widget, our servers, and the AI Service is encrypted in transit using TLS 1.2 or higher</LI>
          <LI>Temporary photo storage uses server-side encryption at rest</LI>
          <LI>Access to production systems is restricted to authorised personnel only, with multi-factor authentication</LI>
          <LI>Customer photographs are stored in isolated, session-specific locations and are not accessible to other users</LI>
          <LI>OAuth tokens are stored using encrypted secrets management</LI>
          <LI>Rate limiting and session scoping limit the blast radius of any potential security incident</LI>
          <LI>Regular security reviews of infrastructure and code</LI>
        </UL>

        <H2>13. Cookies and Similar Technologies</H2>
        <P>The App widget does not use cookies. We use browser <strong>localStorage</strong> to store a session identifier solely for session continuity and conversion attribution purposes. This is not a cookie, is not transmitted to our servers with every request, and can be cleared by the Customer through their browser settings at any time. The App does not deploy any third-party tracking scripts, advertising pixels, or behavioural analytics tools.</P>

        <H2>14. AI-Generated Content Transparency</H2>
        <P>In compliance with the EU AI Act and applicable AI transparency requirements:</P>
        <UL>
          <LI>The Virtual Try-On feature uses an AI system to generate composite images; Customers are clearly informed of this before use</LI>
          <LI>Generated images are digitally marked or watermarked as AI-generated content where technically feasible</LI>
          <LI>Customer photographs are not used to train, fine-tune, or improve any AI model, including Google's Gemini AI</LI>
        </UL>

        <H2>15. Changes to This Privacy Policy</H2>
        <P>We may update this Privacy Policy from time to time. For material changes, we will provide at least 30 days' notice to Merchants via email or in-App notification before the changes take effect. The 'Last Updated' date at the top of this Policy indicates the most recent revision. Continued use of the App after the effective date of any changes constitutes acceptance of the updated Policy.</P>

        <H2>16. Complaints</H2>
        <P>If you have concerns about how we handle your personal data, please contact us first at <ELink href="mailto:mail@renderedfits.com">mail@renderedfits.com</ELink>. If you remain dissatisfied, you have the right to lodge a complaint with the Information Commissioner's Office (ICO):</P>
        <UL>
          <LI>Website: <ELink href="https://ico.org.uk">ico.org.uk</ELink></LI>
          <LI>Telephone: 0303 123 1113</LI>
          <LI>Address: Information Commissioner's Office, Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF</LI>
        </UL>

        <H2>17. Contact Us</H2>
        <P>For any questions about this Privacy Policy or our data practices, please contact:</P>
        <UL>
          <LI><strong>Rendered Fits Ltd</strong></LI>
          <LI>50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ, United Kingdom</LI>
          <LI>Email: <ELink href="mailto:mail@renderedfits.com">mail@renderedfits.com</ELink></LI>
          <LI>Website: <ELink href="https://renderedfits.com">renderedfits.com</ELink></LI>
          <LI>Company number: 16922551</LI>
        </UL>
      </>
    ),
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 3. End-User Terms of Use
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'end-user-terms',
    title: 'End-User Terms of Use',
    subtitle: 'Virtual Try-On Feature — Terms, Consent, and Privacy',
    lastUpdated: 'February 2026',
    content: (
      <>
        <H2>PART A: END-USER TERMS OF USE</H2>

        <KeyStatement>
          By clicking 'I Agree' or by uploading a photograph to the Virtual Try-On feature, you agree to these Terms of Use and to the processing of your photograph as described below. If you do not agree, please do not use the Virtual Try-On feature.
        </KeyStatement>

        <H2>1. What is the Virtual Try-On Feature?</H2>
        <H3>1.1</H3>
        <P>The Virtual Try-On feature is provided by Rendered Fits Ltd ("we", "us", "our"), a company incorporated in England and Wales (company number 16922551). The feature is embedded in an online store operated by a third-party Shopify merchant (the "Merchant"). It allows you to upload a photograph of yourself and receive an AI-generated image showing how products may look on you.</P>
        <H3>1.2</H3>
        <P>The feature is powered by artificial intelligence — currently Google's Gemini AI. The images generated are AI-created interpretations and are not photographs. They are provided for illustrative purposes only.</P>

        <H2>2. How Your Photograph is Processed</H2>
        <H3>2.1</H3>
        <P>When you upload a photograph:</P>
        <UL>
          <LI>(a) it is sent to Google's Gemini API, together with an image of the product you are viewing, to generate a composite virtual try-on image</LI>
          <LI>(b) Google generates the composite image and returns it to your browser</LI>
          <LI>(c) your photograph is cached temporarily in cloud storage during your active session and is deleted automatically when your session expires — a cleanup function runs every 24 hours and removes files for expired sessions</LI>
          <LI>(d) the generated try-on image has the same lifecycle as your uploaded photograph and is also deleted automatically</LI>
        </UL>
        <H3>2.2</H3>
        <P>We do not:</P>
        <UL>
          <LI>(a) store your photograph beyond your active session</LI>
          <LI>(b) extract biometric templates, facial geometry, or any biometric identifier from your photograph</LI>
          <LI>(c) use your photograph for advertising, marketing, or profiling purposes</LI>
          <LI>(d) sell, rent, or share your photograph with any third party except Google LLC (for the sole purpose of generating the try-on image)</LI>
          <LI>(e) use your photograph to train, fine-tune, or improve any AI model</LI>
        </UL>

        <H2>3. AI-Generated Content Disclaimer</H2>
        <H3>3.1</H3>
        <P>By using the Virtual Try-On feature, you acknowledge that:</P>
        <UL>
          <LI>(a) the generated images are AI-created interpretations and not actual photographs of you wearing the product</LI>
          <LI>(b) the AI may not accurately replicate the exact colours, textures, or fit of the product</LI>
          <LI>(c) the generated image does not constitute a guarantee that the product will look the same on you in person</LI>
          <LI>(d) the AI may produce unexpected or imperfect results</LI>
          <LI>(e) generated images may be digitally marked as AI-generated content</LI>
          <LI>(f) the AI may slightly modify your appearance in the generated image as part of the image composition process</LI>
        </UL>

        <H2>4. Age Restriction</H2>
        <P>The Virtual Try-On feature is intended for users aged 16 and over (13 and over in the United States, in compliance with COPPA). By using the feature, you confirm that you meet the minimum age requirement applicable in your jurisdiction. If you are a parent or guardian and believe your child has used this feature, please contact us at <ELink href="mailto:mail@renderedfits.com">mail@renderedfits.com</ELink>.</P>

        <H2>5. Acceptable Use</H2>
        <P>You may only use the Virtual Try-On feature for its intended purpose. You must not:</P>
        <UL>
          <LI>Upload photographs of other people without their knowledge and explicit consent</LI>
          <LI>Upload content that is illegal, offensive, or infringes the rights of others</LI>
          <LI>Attempt to manipulate or reverse-engineer the AI system</LI>
          <LI>Use the feature for any unlawful purpose</LI>
        </UL>
        <P>We reserve the right to disable the Virtual Try-On feature for any user who violates these Terms.</P>

        <H2>6. Rate Limiting and Session Data</H2>
        <P>To prevent abuse, the Virtual Try-On feature is subject to rate limits (e.g., a maximum number of generations per day). Your IP address is used for rate-limiting purposes only; it expires automatically at the end of your session. A session identifier is stored in your browser's localStorage (not a cookie) to maintain session continuity and to enable anonymous conversion tracking (connecting try-on sessions to completed purchases). This session ID is not linked to your identity.</P>

        <H2>7. Intellectual Property</H2>
        <P>You retain ownership of the photograph you upload. By uploading a photograph, you grant Rendered Fits Ltd and the relevant Merchant a limited, non-exclusive, royalty-free licence to process your photograph for the sole purpose of generating your virtual try-on image.</P>
        <P>The copyright status of AI-generated images is uncertain under current law. To the extent any rights exist in the generated try-on image, the Merchant is granted a licence to use the image for their legitimate commercial purposes. You are granted a personal, non-commercial licence to view and save your generated try-on image for your own use.</P>

        <H2>8. No Warranties</H2>
        <P>The Virtual Try-On feature is provided "as is" and "as available". We make no warranty that it will be uninterrupted, error-free, or produce results of any particular quality. We disclaim all warranties to the fullest extent permitted by law. Nothing in these Terms affects your statutory rights as a consumer.</P>

        <H2>9. Limitation of Liability</H2>
        <P>Nothing in these Terms excludes or limits our liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded by law. Subject to the foregoing, we are not liable for any indirect, incidental, special, or consequential loss or damage arising from your use of the Virtual Try-On feature. Our total aggregate liability to you shall not exceed £100.</P>

        <H2>10. Governing Law</H2>
        <P>These Terms are governed by the laws of England and Wales. Nothing in these Terms affects your rights as a consumer under the mandatory laws of the country in which you are resident.</P>

        {/* PART B */}
        <H2>PART B: END-USER PRIVACY NOTICE</H2>

        <KeyStatement>
          <strong>PRIVACY AT A GLANCE</strong>
          <br /><br />
          <UL>
            <LI>Your photo is processed by AI to generate a try-on image — it is NOT stored permanently</LI>
            <LI>Your photo is automatically deleted when your session expires (within 24 hours)</LI>
            <LI>We do NOT collect your name, email, address, or payment details</LI>
            <LI>We do NOT create or store any biometric templates or facial scans</LI>
            <LI>We do NOT sell, share, or use your photo for advertising or AI training</LI>
            <LI>Your photo is sent to Google's Gemini AI solely to generate your try-on image</LI>
          </UL>
        </KeyStatement>

        <H3>Who is responsible for your data?</H3>
        <P><strong>Data Controller</strong>: The Merchant (the Shopify store you are shopping with) is the data controller for your personal data collected via the Virtual Try-On feature. <strong>Data Processor</strong>: Rendered Fits Ltd processes your data on behalf of the Merchant.</P>

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
          <LI><strong>Google LLC (Gemini API)</strong> — receives your photograph (transiently) to generate the try-on image. Google's processing is governed by its own privacy policy and its Data Processing Addendum with Rendered Fits Ltd.</LI>
          <LI><strong>Shopify Inc.</strong> — provides the platform infrastructure. Order identifiers used for conversion attribution flow through Shopify's webhook system.</LI>
        </UL>

        <H3>International transfers</H3>
        <P>Your photograph may be transferred to Google's servers, which may be located in the United States. This transfer is protected by Standard Contractual Clauses and Google's participation in the EU-U.S. Data Privacy Framework. We route processing through Google's europe-west2 (London) region where technically feasible.</P>

        <H3>Your legal basis (UK/EU)</H3>
        <P>Photo processing: <strong>Consent</strong> (Article 6(1)(a) and Article 9(2)(a) UK/EU GDPR). Rate limiting and session management: <strong>Legitimate interests</strong> (Article 6(1)(f) UK/EU GDPR).</P>

        <H3>Your rights</H3>
        <P>You have the right to access, rectify, erase, restrict, port, and object to the processing of your personal data. To exercise your rights, contact the Merchant directly or contact Rendered Fits Ltd at <ELink href="mailto:mail@renderedfits.com">mail@renderedfits.com</ELink>. You may also lodge a complaint with the ICO at <ELink href="https://ico.org.uk">ico.org.uk</ELink>.</P>
      </>
    ),
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 4. Merchant Terms and Conditions
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'merchant-terms',
    title: 'Merchant Terms and Conditions',
    subtitle: 'For the Rendered Fits Virtual Try-On Application',
    lastUpdated: 'February 2026',
    content: (
      <>
        <KeyStatement>
          By installing, accessing, or using the App, you agree to be bound by these Terms. If you do not agree to these Terms, you must not install or use the App.
        </KeyStatement>

        <P>These Merchant Terms and Conditions ("Terms") constitute a legally binding agreement between Rendered Fits Ltd ("Company", "we", "us", "our") and the Shopify merchant ("Merchant", "you") who installs, accesses, or uses the Rendered Fits virtual try-on application (the "App") via the Shopify App Store.</P>
        <P>These Terms are entered into between the Company and the Merchant only. Shopify is not a party to these Terms and shall have no obligations or liability under these Terms. The Company is solely responsible for the App and its content.</P>

        <H2>1. Definitions and Interpretation</H2>
        <H3>1.1 Definitions</H3>
        <P>In these Terms, the following definitions apply:</P>
        <UL>
          <LI><strong>"App"</strong> means the Rendered Fits virtual try-on application distributed via the Shopify App Store, including all updates, modifications, and new versions.</LI>
          <LI><strong>"AI Service"</strong> means the third-party artificial intelligence service used to generate Virtual Try-On Images, currently Google's Gemini API.</LI>
          <LI><strong>"Company"</strong> means Rendered Fits Ltd, a company incorporated in England and Wales (company number 16922551), with a registered office at 50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ.</LI>
          <LI><strong>"Customer"</strong> means an individual end user who uses the Virtual Try-On Feature on the Merchant's storefront.</LI>
          <LI><strong>"Customer Data"</strong> means any personal data relating to Customers that is processed through the App, including photographs uploaded by Customers.</LI>
          <LI><strong>"Data Protection Laws"</strong> means all applicable laws and regulations relating to the processing of personal data and privacy, including the UK GDPR, the Data Protection Act 2018, the EU GDPR (where applicable), and any implementing legislation or successor legislation.</LI>
          <LI><strong>"Effective Date"</strong> means the date on which the Merchant installs the App.</LI>
          <LI><strong>"Generated Image"</strong> means an AI-generated composite image produced by the App at a Customer's request, showing the Customer wearing or using a product from the Merchant's store.</LI>
          <LI><strong>"Intellectual Property Rights"</strong> means all patents, trade marks, service marks, trade names, registered designs, design rights, database rights, copyright and related rights, know-how, trade secrets, and all other intellectual property rights, whether registered or unregistered, anywhere in the world.</LI>
          <LI><strong>"Merchant"</strong> means the Shopify store owner or operator who installs and uses the App.</LI>
          <LI><strong>"Merchant Data"</strong> means any data relating to the Merchant (including shop domain, subscription data, and usage analytics) that is processed by the Company in connection with providing the App.</LI>
          <LI><strong>"Merchant Store"</strong> means the Merchant's online store hosted on the Shopify Platform.</LI>
          <LI><strong>"Personal Information"</strong> has the meaning given to it under applicable Data Protection Laws.</LI>
          <LI><strong>"Privacy Policy"</strong> means the Company's App Privacy Policy, available at <ILink to="/legal/app-privacy-policy">renderedfits.com/legal/app-privacy-policy</ILink>.</LI>
          <LI><strong>"Shopify"</strong> means Shopify Inc. and its affiliates.</LI>
          <LI><strong>"Shopify Platform"</strong> means the e-commerce platform operated by Shopify on which the Merchant's store is hosted.</LI>
          <LI><strong>"Subscription Plan"</strong> means the pricing tier selected by the Merchant, as set out in Schedule 1.</LI>
          <LI><strong>"Terms"</strong> means these Merchant Terms and Conditions, together with any schedules or annexes.</LI>
          <LI><strong>"Virtual Try-On Feature"</strong> means the feature of the App that allows Customers to upload a photograph and receive a Generated Image.</LI>
          <LI><strong>"Virtual Try-On Image"</strong> means a Generated Image produced by the Virtual Try-On Feature.</LI>
        </UL>
        <H3>1.2 Interpretation</H3>
        <P>In these Terms, references to a statute or statutory provision include any subordinate legislation and any modification, extension, or re-enactment; the singular includes the plural and vice versa; and headings are for convenience only and do not affect interpretation.</P>

        <H2>2. Licence Grant</H2>
        <H3>2.1</H3>
        <P>Subject to the Merchant's compliance with these Terms and payment of applicable fees, the Company grants the Merchant a limited, non-exclusive, non-transferable, non-sublicensable licence to access and use the App solely for the purpose of enabling the Virtual Try-On Feature on the Merchant Store.</P>
        <H3>2.2</H3>
        <P>The Merchant may not: (a) sublicence, sell, resell, transfer, or assign the App or any access thereto; (b) modify, translate, adapt, or create derivative works of the App; (c) reverse engineer, decompile, disassemble, or attempt to derive the source code of the App; (d) use the App for any purpose other than as expressly permitted under these Terms.</P>

        <H2>3. App Description and Functionality</H2>
        <H3>3.1</H3>
        <P>The App provides a Virtual Try-On Feature that Merchants can embed in their Shopify storefronts. The feature allows Customers to upload a photograph of themselves and receive an AI-generated image showing how the Merchant's products may look on them.</P>
        <H3>3.2</H3>
        <P>The Merchant acknowledges that: (a) Virtual Try-On Images are AI-generated and may not accurately represent the actual appearance of products; (b) the App is dependent on the availability of the AI Service and the Shopify Platform; (c) the quality and accuracy of Generated Images may vary.</P>

        <H2>4. AI Service Availability and Limitations</H2>
        <H3>4.1</H3>
        <P>The App relies on the AI Service (currently Google's Gemini API) for image generation. The Company does not control the AI Service and cannot guarantee its continuous availability, accuracy, or performance. The Company shall use reasonable endeavours to maintain the availability of the App, but makes no warranty regarding uptime or the performance of the AI Service.</P>
        <H3>4.2</H3>
        <P>The Company reserves the right to substitute the AI Service for an alternative provider at any time, provided that this does not materially diminish the functionality of the App. The Company shall notify Merchants of any change to the AI Service provider with reasonable notice.</P>

        <H2>5. Third-Party Service Providers</H2>
        <H3>5.1</H3>
        <P>The App uses third-party service providers including Google LLC (Gemini API), Google Cloud Platform, and Shopify. The Merchant acknowledges that the Company's ability to provide the App is contingent on these third-party services.</P>
        <H3>5.2</H3>
        <P>The Company's use of third-party services is governed by the Data Processing Agreement available at <ILink to="/legal/data-processing-agreement">renderedfits.com/legal/data-processing-agreement</ILink>.</P>

        <H2>6. Subscription Plans and Fees</H2>
        <H3>6.1</H3>
        <P>The Merchant must select a Subscription Plan as set out in Schedule 1. Subscription fees are billed monthly or annually in advance through Shopify's Billing API. All fees are exclusive of VAT, which will be added where applicable.</P>
        <H3>6.2</H3>
        <P>The Merchant's subscription will automatically renew at the end of each billing period unless cancelled through the Shopify App Store before the renewal date. Cancellation will take effect at the end of the current billing period; no refunds are provided for partial periods.</P>
        <H3>6.3</H3>
        <P>If a Merchant exceeds the monthly Virtual Try-On Generation allowance for their Subscription Plan, the App will restrict further generation attempts until the next billing cycle or until the Merchant upgrades their plan.</P>
        <H3>6.4</H3>
        <P>The Company offers a free trial period as set out in Schedule 1. The Company reserves the right to modify the trial terms or discontinue free trials at any time.</P>

        <H2>7. Pricing Changes</H2>
        <H3>7.1</H3>
        <P>The Company reserves the right to change its subscription pricing at any time. The Company will provide at least 30 days' written notice of any price increase. If a Merchant does not wish to accept the new pricing, they may cancel their subscription before the new pricing takes effect.</P>

        <H2>8. Merchant Data Ownership and Processing</H2>
        <H3>8.1</H3>
        <P>As between the Company and the Merchant, all Merchant Data remains the property of the Merchant. The Company processes Merchant Data solely for the purposes of providing the App and as described in the Privacy Policy.</P>
        <H3>8.2</H3>
        <P>With respect to Customer Data processed via the Virtual Try-On Feature: (a) the Merchant is the data controller; (b) the Company acts as a data processor on the Merchant's behalf; (c) the processing activities are governed by the Data Processing Agreement.</P>
        <H3>8.3</H3>
        <P>The Merchant represents and warrants that: (a) it has a valid legal basis for enabling the Virtual Try-On Feature on its storefront; (b) it has provided appropriate privacy notices to Customers; (c) it will comply with all applicable Data Protection Laws in connection with its use of the App.</P>

        <H2>9. Security Breaches</H2>
        <H3>9.1</H3>
        <P>In the event of a personal data breach affecting Customer Data processed through the App, the Company will notify the Merchant without undue delay and in any event within 72 hours of becoming aware of the breach, in accordance with the Data Processing Agreement.</P>

        <H2>10. Merchant Obligations</H2>
        <H3>10.1</H3>
        <P>The Merchant shall:</P>
        <UL>
          <LI>(a) use the App only in accordance with these Terms and all applicable laws</LI>
          <LI>(b) ensure that its use of the App complies with Shopify's Partner Program Agreement and Shopify's terms of service</LI>
          <LI>(c) provide accurate and up-to-date information when setting up the App</LI>
          <LI>(d) ensure that its storefronts include appropriate privacy notices informing Customers about the use of the Virtual Try-On Feature and the processing of their photographs</LI>
          <LI>(e) implement and maintain appropriate technical and organisational security measures for any data it controls in connection with the App</LI>
          <LI>(f) notify the Company promptly of any actual or suspected security breach or unauthorised use of the App</LI>
          <LI>(g) comply with the Acceptable Use Policy at <ILink to="/legal/website-legal-documents">renderedfits.com/legal/website-legal-documents</ILink></LI>
        </UL>
        <H3>10.2</H3>
        <P>The Merchant must not use the App to: (a) process data in violation of Data Protection Laws; (b) infringe any third party's Intellectual Property Rights; (c) transmit any harmful code; (d) engage in any activity that is unlawful or harmful.</P>

        <H2>11. Intellectual Property</H2>
        <H3>11.1</H3>
        <P>All Intellectual Property Rights in the App (excluding Merchant Data and Customer Data) are owned by the Company or its licensors. Nothing in these Terms transfers any such rights to the Merchant.</P>
        <H3>11.2</H3>
        <P>The Merchant retains all Intellectual Property Rights in its product images and other content provided to the App. The Merchant grants the Company a limited licence to use such content solely for the purpose of generating Virtual Try-On Images.</P>
        <H3>11.3</H3>
        <P>The Company grants the Merchant a limited licence to use Generated Images on the Merchant's storefront and marketing materials, subject to the Merchant's compliance with these Terms.</P>

        <H2>12. Suspension and Termination</H2>
        <H3>12.1</H3>
        <P>Either party may terminate these Terms by giving written notice if the other party: (a) commits a material breach of these Terms which is not remedied within 14 days of written notice; (b) becomes insolvent or subject to insolvency proceedings.</P>
        <H3>12.2</H3>
        <P>The Company may suspend or terminate the Merchant's access to the App immediately (without prior notice) if: (a) the Merchant fails to pay any fees when due; (b) the Merchant breaches any provision of the Acceptable Use Policy; (c) the Merchant's use of the App poses a risk to the security, integrity, or performance of the App or to other users; (d) required to do so by law or by Shopify.</P>
        <H3>12.3</H3>
        <P>Upon termination: (a) the licence granted under these Terms immediately ceases; (b) the Company will delete Merchant Data within 30 days, subject to any legal retention obligations; (c) accrued payment obligations survive termination.</P>

        <H2>13. Limitation of Liability</H2>
        <H3>13.1</H3>
        <P>Nothing in these Terms limits or excludes either party's liability for: (a) death or personal injury caused by negligence; (b) fraud or fraudulent misrepresentation; (c) any liability that cannot be excluded by applicable law.</P>
        <H3>13.2</H3>
        <P>Subject to clause 13.1, the Company shall not be liable for any: (a) indirect, incidental, special, or consequential loss; (b) loss of profits, revenue, or business; (c) loss of data; (d) loss of goodwill; arising out of or in connection with these Terms, even if advised of the possibility of such loss.</P>
        <H3>13.3</H3>
        <P>Subject to clauses 13.1 and 13.2, the Company's total aggregate liability to the Merchant under or in connection with these Terms shall not exceed the total fees paid or payable by the Merchant in the 12 months preceding the claim.</P>

        <H2>14. Indemnification</H2>
        <H3>14.1</H3>
        <P>The Merchant shall indemnify, defend, and hold harmless the Company and its directors, officers, employees, and agents from and against any claims, losses, damages, costs (including reasonable legal fees), and expenses arising from: (a) the Merchant's breach of these Terms; (b) the Merchant's violation of any applicable law or regulation; (c) the Merchant's use of the App in a manner not permitted by these Terms; (d) any claim by a Customer arising from the Merchant's failure to provide adequate privacy notices or obtain required consents.</P>

        <H2>15. Confidentiality</H2>
        <H3>15.1</H3>
        <P>Each party agrees to keep confidential all non-public information received from the other party in connection with these Terms ("Confidential Information") and to use such information solely for the purposes of these Terms. This obligation does not apply to information that: (a) is or becomes publicly available through no fault of the receiving party; (b) was already known to the receiving party; (c) is required to be disclosed by law or regulatory authority.</P>

        <H2>16. Disclaimers</H2>
        <H3>16.1</H3>
        <P>The App is provided "as is" and "as available". To the maximum extent permitted by law, the Company disclaims all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, non-infringement, and any warranties arising from course of dealing or usage of trade.</P>
        <H3>16.2</H3>
        <P>The Company does not warrant that: (a) the App will meet the Merchant's specific requirements; (b) the App will be uninterrupted, timely, secure, or error-free; (c) Generated Images will be accurate, of any particular quality, or fit for any particular purpose.</P>

        <H2>17. Governing Law and Dispute Resolution</H2>
        <H3>17.1</H3>
        <P>These Terms are governed by the laws of England and Wales. The courts of England and Wales shall have exclusive jurisdiction over any dispute arising from or in connection with these Terms.</P>
        <H3>17.2</H3>
        <P>Before commencing legal proceedings, the parties agree to attempt to resolve any dispute by good-faith negotiation for a period of 30 days.</P>

        <H2>18. Changes to These Terms</H2>
        <H3>18.1</H3>
        <P>The Company may update these Terms at any time. The Company will provide at least 30 days' notice of material changes via email or in-App notification. Continued use of the App after the effective date of any changes constitutes acceptance of the updated Terms.</P>

        <H2>19. Force Majeure</H2>
        <H3>19.1</H3>
        <P>Neither party shall be liable for any delay or failure to perform its obligations under these Terms to the extent such delay or failure results from circumstances beyond its reasonable control, including but not limited to acts of God, government actions, war, pandemic, or failures of third-party infrastructure (including the AI Service or the Shopify Platform).</P>

        <H2>20. General Provisions</H2>
        <H3>20.1</H3>
        <P><strong>Entire agreement</strong>: These Terms (together with the Schedules, the Privacy Policy, and the Data Processing Agreement) constitute the entire agreement between the parties relating to the App and supersede all prior agreements, representations, and understandings.</P>
        <H3>20.2</H3>
        <P><strong>Severability</strong>: If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions shall continue in full force.</P>
        <H3>20.3</H3>
        <P><strong>Waiver</strong>: No failure or delay by either party in exercising any right under these Terms shall constitute a waiver of that right.</P>
        <H3>20.4</H3>
        <P><strong>Assignment</strong>: The Merchant may not assign or transfer any rights or obligations under these Terms without the prior written consent of the Company. The Company may assign these Terms to any successor entity in connection with a merger, acquisition, or sale of all or substantially all of its assets.</P>
        <H3>20.5</H3>
        <P><strong>Third-party rights</strong>: These Terms do not create any rights in favour of any third party (including Shopify) under the Contracts (Rights of Third Parties) Act 1999.</P>
        <H3>20.6</H3>
        <P><strong>Notices</strong>: Any notice required under these Terms shall be in writing and sent to the Company at <ELink href="mailto:mail@renderedfits.com">mail@renderedfits.com</ELink> and to the Merchant at the email address associated with their Shopify account.</P>

        <H2>Schedule 1: Subscription Plans and Pricing</H2>
        <Table
          headers={['Subscription Plan', 'Monthly Fee (excl. VAT)', 'Virtual Try-On Generations / Month']}
          rows={[
            ['Starter', '£249', '700'],
            ['Growth', '£449', '1,400'],
            ['Scale', '£749', '2,600'],
            ['Professional', '£1,249', '5,000'],
          ]}
        />
        <P><strong>Annual billing:</strong> Annual subscriptions are available at a discount equivalent to 2 months free (i.e., 10 months' pricing paid annually). Annual fees are paid in full at the start of the subscription year and are non-refundable except as required by law.</P>
        <P><strong>Generation limit enforcement:</strong> If a Merchant reaches their monthly generation limit, the Virtual Try-On Feature will display an informational message to Customers and will not process further generation requests until the next billing cycle. Unused generations do not roll over to the following month.</P>
        <P><strong>Free trial:</strong> New Merchants are eligible for a free trial period of 7 days on the Starter plan. No payment details are required during the trial period; payment is collected through Shopify's Billing API upon conversion to a paid plan. The Company reserves the right to modify or discontinue the free trial at any time.</P>

        <H2>Schedule 2: Company Contact Details</H2>
        <UL>
          <LI><strong>Company name:</strong> Rendered Fits Ltd</LI>
          <LI><strong>Company number:</strong> 16922551</LI>
          <LI><strong>Registered office:</strong> 50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ, United Kingdom</LI>
          <LI><strong>VAT number:</strong> 510026164</LI>
          <LI><strong>Email:</strong> <ELink href="mailto:mail@renderedfits.com">mail@renderedfits.com</ELink></LI>
          <LI><strong>Website:</strong> <ELink href="https://renderedfits.com">renderedfits.com</ELink></LI>
          <LI><strong>Directors:</strong> Sydney Stones, Thomas Dickens</LI>
        </UL>
      </>
    ),
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 5. Data Processing Agreement
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'data-processing-agreement',
    title: 'Data Processing Agreement',
    subtitle: 'Pursuant to Article 28 of the UK GDPR and EU GDPR',
    lastUpdated: 'February 2026',
    content: (
      <>
        <P>This Data Processing Agreement ("DPA") is entered into between the Merchant (as data controller) and Rendered Fits Ltd (as data processor) and forms part of the Merchant Terms and Conditions for the Rendered Fits Virtual Try-On Application.</P>

        <H2>Background</H2>
        <H3>1.1</H3>
        <P>The Controller operates an online retail store on the Shopify Platform and has installed the Rendered Fits App to provide the Virtual Try-On Feature to its customers.</P>
        <H3>1.2</H3>
        <P>In providing the App and the Virtual Try-On Feature, the Processor will process personal data on behalf of the Controller.</P>
        <H3>1.3</H3>
        <P>The parties wish to set out in this DPA the framework for the processing of personal data by the Processor on behalf of the Controller, in compliance with the requirements of Article 28 UK GDPR / EU GDPR.</P>
        <H3>1.4</H3>
        <P>The details of the processing are set out in Annex 1 to this DPA.</P>
        <H3>1.5</H3>
        <P>This DPA is incorporated by reference into the Merchant Terms and Conditions and takes effect on the Effective Date of those Terms.</P>

        <H2>2. Scope, Nature, and Purpose of Processing</H2>
        <H3>2.1</H3>
        <P>The Processor shall process personal data only to the extent necessary to provide the App and the Virtual Try-On Feature as described in the Merchant Terms and Conditions and in this DPA.</P>
        <H3>2.2</H3>
        <P>The Processor shall not process personal data for any purpose other than the documented instructions of the Controller, except where required to do so by applicable law. Where the Processor is required by law to process personal data beyond the Controller's instructions, the Processor shall inform the Controller of that legal requirement before processing (unless such law prohibits notification on grounds of public interest).</P>

        <H2>3. Controller Obligations</H2>
        <H3>3.1</H3>
        <P>The Controller shall:</P>
        <UL>
          <LI>(a) ensure that it has a valid legal basis for the processing of personal data described in Annex 1</LI>
          <LI>(b) provide Customers with a privacy notice that adequately discloses the use of the Virtual Try-On Feature and the processing of their photographs</LI>
          <LI>(c) ensure that the consent mechanism presented to Customers by the App widget is sufficient for the purposes of applicable Data Protection Laws</LI>
          <LI>(d) respond to data subject rights requests in a timely manner</LI>
          <LI>(e) notify the Processor of any changes to its processing instructions</LI>
        </UL>
        <H3>3.2</H3>
        <P>The Controller's documented instructions for the Processor are set out in Annex 4 to this DPA. The Controller may update these instructions from time to time by written notice to the Processor.</P>

        <H2>4. Processor Obligations</H2>
        <H3>4.1</H3>
        <P>The Processor shall:</P>
        <UL>
          <LI>(a) process personal data only on the documented instructions of the Controller</LI>
          <LI>(b) ensure that persons authorised to process the personal data are bound by appropriate confidentiality obligations</LI>
          <LI>(c) implement and maintain appropriate technical and organisational security measures as set out in Annex 3</LI>
          <LI>(d) assist the Controller in fulfilling its obligations to respond to data subject rights requests</LI>
          <LI>(e) assist the Controller in ensuring compliance with its security, breach notification, data protection impact assessment, and prior consultation obligations</LI>
          <LI>(f) delete or return all personal data to the Controller upon termination of the agreement, and delete existing copies unless retention is required by law</LI>
          <LI>(g) make available to the Controller all information necessary to demonstrate compliance with the obligations laid down in Article 28 UK GDPR/EU GDPR</LI>
        </UL>

        <H2>5. Sub-Processors</H2>
        <H3>5.1</H3>
        <P>The Controller grants the Processor general written authorisation to engage the sub-processors listed in Annex 2. The Processor shall inform the Controller of any intended changes concerning the addition or replacement of sub-processors, giving the Controller the opportunity to object to such changes.</P>
        <H3>5.2</H3>
        <P>Where the Processor engages a sub-processor, it shall impose data protection obligations on that sub-processor equivalent to those set out in this DPA. The Processor shall remain fully liable to the Controller for the performance of the sub-processor's obligations.</P>
        <H3>5.3</H3>
        <P>The Controller may object to a new sub-processor within 14 days of receiving notice. If the Controller objects and the parties cannot resolve the objection within a further 14 days, the Controller may terminate the Merchant Terms and Conditions on written notice.</P>

        <H2>6. International Transfers</H2>
        <H3>6.1</H3>
        <P>The Processor shall not transfer personal data outside the UK or EEA without ensuring that appropriate safeguards are in place as required by Chapter V UK GDPR or Chapter V EU GDPR.</P>
        <H3>6.2</H3>
        <P>The transfer mechanisms used by the Processor and its sub-processors are set out in Annex 2.</P>

        <H2>7. Data Subject Rights</H2>
        <H3>7.1</H3>
        <P>The Processor shall, to the extent legally permitted, promptly notify the Controller if it receives a request from a data subject to exercise their rights under applicable Data Protection Laws.</P>
        <H3>7.2</H3>
        <P>The Processor shall provide the Controller with reasonable assistance and cooperation to enable the Controller to respond to data subject rights requests within the statutory timeframes.</P>
        <H3>7.3</H3>
        <P>The Processor shall not respond directly to data subject rights requests on behalf of the Controller unless expressly authorised to do so by the Controller.</P>

        <H2>8. Personal Data Breach Notification</H2>
        <H3>8.1</H3>
        <P>The Processor shall notify the Controller without undue delay, and in any event within 72 hours, after becoming aware of a personal data breach affecting personal data processed under this DPA.</P>
        <H3>8.2</H3>
        <P>Such notification shall, to the extent available at the time of notification, include:</P>
        <UL>
          <LI>(a) a description of the nature of the breach, including the categories and approximate number of data subjects and records affected</LI>
          <LI>(b) the name and contact details of the data protection contact point at the Processor</LI>
          <LI>(c) a description of the likely consequences of the breach</LI>
          <LI>(d) a description of the measures taken or proposed to address the breach</LI>
        </UL>
        <H3>8.3</H3>
        <P>The Processor shall cooperate with and assist the Controller in meeting its own breach notification obligations to supervisory authorities and affected data subjects.</P>

        <H2>9. Audit Rights</H2>
        <H3>9.1</H3>
        <P>The Processor shall provide the Controller with all information necessary to demonstrate compliance with the obligations set out in this DPA, and shall allow for and contribute to audits and inspections conducted by the Controller or an auditor mandated by the Controller.</P>
        <H3>9.2</H3>
        <P>Any audit shall be conducted on not less than 30 days' written notice, during normal business hours, and in a manner that minimises disruption to the Processor's operations. The costs of any audit shall be borne by the Controller.</P>

        <H2>10. Term, Termination, and Deletion</H2>
        <H3>10.1</H3>
        <P>This DPA shall remain in force for as long as the Processor processes personal data on behalf of the Controller.</P>
        <H3>10.2</H3>
        <P>Upon expiry or termination of the Merchant Terms and Conditions, the Processor shall delete all personal data processed under this DPA within 30 days, except to the extent that retention is required by applicable law.</P>
        <H3>10.3</H3>
        <P>On request, the Processor shall provide written confirmation that all personal data has been deleted.</P>

        <H2>11. Liability</H2>
        <H3>11.1</H3>
        <P>The liability of each party under this DPA is subject to the limitations and exclusions set out in the Merchant Terms and Conditions.</P>
        <H3>11.2</H3>
        <P>Each party shall indemnify the other for any losses, damages, fines, or penalties arising from that party's breach of its obligations under this DPA or applicable Data Protection Laws.</P>

        <H2>12. General Provisions</H2>
        <H3>12.1</H3>
        <P>In the event of any conflict between this DPA and the Merchant Terms and Conditions, this DPA shall take precedence with respect to data protection matters.</P>
        <H3>12.2</H3>
        <P>This DPA is governed by the laws of England and Wales.</P>
        <H3>12.3</H3>
        <P>If any provision of this DPA is held invalid or unenforceable, the remaining provisions shall continue in full force.</P>

        <H2>Annex 1: Processing Details</H2>
        <Table
          headers={['Element', 'Detail']}
          rows={[
            ['Subject matter of processing', "The provision of the Virtual Try-On Feature to Customers of the Controller's Shopify store, and associated conversion attribution analytics"],
            ['Duration of processing', 'For the duration of the Merchant Terms and Conditions and for such period as is necessary to fulfil the purposes described herein, subject to any applicable retention obligations'],
            ['Nature of processing', 'Collection, temporary storage, transmission to AI Service, deletion of Customer photographs; rate limiting via IP addresses; session management; conversion attribution via order identifiers'],
            ['Purpose of processing', 'To generate AI virtual try-on images in response to Customer requests; to prevent abuse via rate limiting; to maintain session continuity; to enable Merchant ROI measurement via conversion attribution'],
            ['Types of personal data', 'Customer photographs (images); IP addresses; session identifiers; order identifiers (order ID, cart token); product handles'],
            ["Categories of data subjects", "Customers (end users) of the Controller's online store who use the Virtual Try-On Feature"],
            ['Special categories of data', "Customer photographs may constitute biometric data under applicable law (e.g., Illinois BIPA). No biometric templates or identifiers are extracted. Processing is transient. Explicit consent is obtained before processing."],
          ]}
        />

        <H2>Annex 2: Sub-Processor Register</H2>
        <Table
          headers={['Sub-Processor', 'Processing Activity', 'Data Processed', 'Location', 'Transfer Mechanism']}
          rows={[
            ['Google LLC (Gemini API)', 'AI image generation: receives End User photographs and product images, generates composite virtual try-on images', 'End User photographs, product images (transient processing)', 'europe-west2', 'EU-U.S. Data Privacy Framework; Google Cloud Data Processing Addendum with SCCs'],
            ['Google Cloud Platform (GCP)', 'Cloud infrastructure: temporary file storage (photo cache), application hosting, Redis rate-limiting database', 'End User photographs (cached), IP addresses, session data', 'europe-west2', 'EU-U.S. Data Privacy Framework; Google Cloud Data Processing Addendum with SCCs'],
            ['Shopify Inc.', 'Platform hosting: authentication via OAuth 2.0, subscription billing via Billing API, webhook delivery (orders, GDPR compliance)', 'Merchant store domain, billing data, order identifiers', 'Canada / United States', 'Shopify Data Processing Addendum with SCCs; Canada adequacy decision (EU)'],
          ]}
        />

        <H2>Annex 3: Technical and Organisational Measures</H2>

        <H3>A. Access Control</H3>
        <UL>
          <LI>Access to production systems is restricted to authorised personnel only</LI>
          <LI>Multi-factor authentication is required for all production system access</LI>
          <LI>Role-based access controls are implemented to enforce the principle of least privilege</LI>
          <LI>Access logs are maintained and reviewed regularly</LI>
        </UL>

        <H3>B. Encryption</H3>
        <UL>
          <LI>All data in transit between the widget, application servers, and sub-processors is encrypted using TLS 1.2 or higher</LI>
          <LI>Customer photographs stored in temporary cloud storage are encrypted at rest using AES-256</LI>
          <LI>OAuth tokens and API keys are stored using encrypted secrets management</LI>
        </UL>

        <H3>C. Data Minimisation and Retention</H3>
        <UL>
          <LI>Only the minimum personal data necessary for each processing purpose is collected and retained</LI>
          <LI>Customer photographs are deleted by automated cleanup processes within 24 hours of session expiry</LI>
          <LI>IP addresses are stored only in the rate-limiting system and expire automatically at session end</LI>
        </UL>

        <H3>D. Availability and Resilience</H3>
        <UL>
          <LI>The App is hosted on Google Cloud Platform infrastructure with high availability configurations</LI>
          <LI>Automated monitoring and alerting is in place for system failures and anomalies</LI>
          <LI>Backup and recovery procedures are maintained for application configuration and Merchant data</LI>
        </UL>

        <H3>E. Pseudonymisation and Anonymisation</H3>
        <UL>
          <LI>Customer photographs are stored under session-specific identifiers, not linked to personal identity</LI>
          <LI>Aggregated analytics data is anonymised before retention beyond the session</LI>
        </UL>

        <H3>F. Incident Response</H3>
        <UL>
          <LI>A documented incident response procedure is maintained and tested regularly</LI>
          <LI>Personnel are trained to identify and escalate potential data breaches</LI>
          <LI>Breach notification procedures comply with the 72-hour notification requirement</LI>
        </UL>

        <H3>G. Supplier Management</H3>
        <UL>
          <LI>Sub-processors are assessed for data protection compliance before engagement</LI>
          <LI>Data Processing Agreements or equivalent are in place with all sub-processors</LI>
        </UL>

        <H3>H. Physical Security</H3>
        <UL>
          <LI>The App is cloud-hosted; physical security of data centres is managed by Google Cloud Platform in accordance with Google's ISO 27001-certified security controls</LI>
        </UL>

        <H2>Annex 4: Controller's Documented Instructions</H2>
        <Table
          headers={['Instruction', 'Detail']}
          rows={[
            ['Process photographs', "Send Customer-uploaded photographs and product images to the AI Service (Google Gemini API) to generate virtual try-on images. Return generated images to the Customer's browser."],
            ['Store photographs temporarily', "Cache Customer photographs in temporary cloud storage for the duration of the active session only. Delete automatically within 24 hours of session expiry."],
            ['Rate limit via IP', 'Use Customer IP addresses solely to enforce per-IP rate limits. Do not retain IP addresses beyond the active session.'],
            ['Session management', 'Issue and validate session identifiers for the purpose of maintaining session continuity. Store session IDs in Customer browser localStorage only.'],
            ['Conversion attribution', "Receive order identifiers via Shopify webhooks. Link order identifiers to session IDs for the purpose of generating Merchant conversion analytics. Retain only in aggregated form; delete individual identifiers at the end of the subscription."],
            ['Deletion on termination', 'Delete all personal data processed under this DPA within 30 days of termination of the Merchant Terms and Conditions.'],
            ['No secondary use', 'Do not use personal data for any purpose other than those listed in this Annex, including advertising, AI training, profiling, or sharing with third parties not listed in Annex 2.'],
          ]}
        />
      </>
    ),
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 6. Biometric Data Retention and Destruction Policy
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'biometric-policy',
    title: 'Biometric Data Retention and Destruction Policy',
    subtitle: 'Required under Illinois BIPA Section 15(a) — Publicly Available',
    lastUpdated: 'February 2026',
    content: (
      <>
        <KeyStatement>
          Rendered Fits Ltd does not permanently store biometric data. Customer photographs are processed transiently and are permanently destroyed within 24 hours of session expiry. No biometric identifiers or biometric templates are extracted, created, or retained at any point.
        </KeyStatement>

        <H2>1. Purpose and Scope</H2>
        <H3>1.1</H3>
        <P>This Biometric Data Retention and Destruction Policy ("Policy") is published by Rendered Fits Ltd ("Company", "we", "us") to satisfy the publicly available written policy requirement of Section 15(a) of the Illinois Biometric Information Privacy Act (740 ILCS 14/) ("BIPA") and to address similar requirements under applicable biometric privacy laws.</P>
        <H3>1.2</H3>
        <P>This Policy applies to the Rendered Fits Virtual Try-On Application (the "App"), which is embedded in Shopify merchants' online stores and used by their customers ("End Users") to generate AI virtual try-on images.</P>
        <H3>1.3</H3>
        <P>This Policy should be read alongside the App Privacy Policy and the End-User Terms of Use, available at <ILink to="/legal/app-privacy-policy">renderedfits.com/legal/app-privacy-policy</ILink> and <ILink to="/legal/end-user-terms">renderedfits.com/legal/end-user-terms</ILink> respectively.</P>

        <H2>2. Definitions</H2>
        <P>In this Policy, the following terms have the meanings set out below:</P>
        <UL>
          <LI><strong>(a) "Biometric Data"</strong> means any data generated from measurements or analysis of human biological characteristics that can be used to identify an individual, including (as defined under BIPA) biometric identifiers and biometric information.</LI>
          <LI><strong>(b) "Biometric Identifier"</strong> has the meaning given under BIPA and includes retina or iris scans, fingerprints, voiceprints, scans of hand or face geometry.</LI>
          <LI><strong>(c) "Biometric Information"</strong> has the meaning given under BIPA and means any information, regardless of how it is captured, converted, stored, or shared, based on an individual's biometric identifier used to identify an individual.</LI>
          <LI><strong>(d) "Photograph"</strong> means a digital image uploaded by an End User to the Virtual Try-On Feature for the purpose of generating a virtual try-on image.</LI>
          <LI><strong>(e) "Session"</strong> means a single, continuous interaction by an End User with the Virtual Try-On Feature, identified by a unique session identifier.</LI>
          <LI><strong>(f) "Virtual Try-On Image"</strong> means the AI-generated composite image produced by the App from an End User's Photograph and a product image.</LI>
        </UL>

        <H2>3. What Biometric Data We Process</H2>
        <P>The App processes End User Photographs solely for the purpose of generating Virtual Try-On Images via the Google Gemini API. The following table summarises the nature of that processing:</P>
        <Table
          headers={['Data', 'Nature of Processing', 'Biometric Template Extracted?', 'Permanent Retention?']}
          rows={[
            ['End User Photograph', "Transmitted to Google Gemini API for AI image generation. Cached temporarily in cloud storage for the duration of the active Session.", 'No', 'No — deleted within 24 hours of Session expiry'],
            ['Virtual Try-On Image', "Generated by the AI Service and returned to the End User's browser. Cached temporarily alongside the Photograph.", 'No', 'No — deleted within 24 hours of Session expiry'],
          ]}
        />

        <H3>What We Do NOT Process or Store</H3>
        <P>The Company does not, at any point, create, extract, store, or use:</P>
        <UL>
          <LI>Facial geometry scans or measurements</LI>
          <LI>Faceprints or facial recognition templates</LI>
          <LI>Retina or iris scans</LI>
          <LI>Fingerprints or voiceprints</LI>
          <LI>Any biometric identifier or biometric information as defined under BIPA or similar laws</LI>
          <LI>Any persistent or re-identifiable biometric profile derived from a Photograph</LI>
        </UL>
        <P>The raw Photograph is transmitted to the AI Service for image generation purposes only. The AI Service (Google Gemini API) does not return or provide to the Company any biometric template or facial geometry data derived from the Photograph.</P>

        <H2>4. Retention Schedule</H2>
        <Table
          headers={['Data Type', 'Retention Period', 'Trigger for Destruction', 'Destruction Method']}
          rows={[
            ['End User Photograph (uploaded)', 'Transient — duration of active Session only', 'Session expiry (automated cleanup runs every 24 hours)', 'Automated deletion via cloud storage lifecycle rule and scheduled cleanup function'],
            ['Virtual Try-On Image (generated)', 'Transient — duration of active Session only', 'Session expiry (automated cleanup runs every 24 hours)', 'Automated deletion via cloud storage lifecycle rule and scheduled cleanup function'],
            ['IP address (rate limiting)', 'Session-scoped', 'Automatic expiry via rate-limiting system TTL at Session end', 'Automatic TTL expiry'],
            ['Session identifier', 'Browser-side only (localStorage)', 'Cleared by End User or browser expiry', 'Not stored on Company servers beyond Session duration'],
          ]}
        />
        <H3>4.2</H3>
        <P>In no event will a Photograph or Virtual Try-On Image be retained beyond the earlier of: (a) the expiry of the Session to which it relates; or (b) three (3) years from the date of collection (to the extent applicable under BIPA's maximum retention provision — though in practice our automated deletion process ensures deletion within 24 hours of session expiry, which is substantially sooner).</P>
        <H3>4.3</H3>
        <P>Notwithstanding clause 4.2, if a Photograph or associated data becomes the subject of a legal hold (e.g., due to litigation, regulatory investigation, or law enforcement request), the data may be retained for the duration of such legal hold. Any such retention will be documented and the data will be destroyed promptly upon release of the legal hold.</P>

        <H2>5. Guidelines for Permanent Destruction</H2>
        <H3>5.1 Automated Deletion</H3>
        <P>The primary mechanism for destruction of Photographs and Virtual Try-On Images is automated deletion via Google Cloud Storage lifecycle rules and a scheduled server-side cleanup function. The cleanup function runs every 24 hours and identifies all files associated with expired sessions, permanently deleting them from cloud storage.</P>
        <H3>5.2 Verification</H3>
        <P>The Company maintains logs of the automated cleanup function's execution to verify that deletion is occurring as intended. These logs record the number of files deleted per cleanup cycle and any errors encountered.</P>
        <H3>5.3 Manual Deletion Requests</H3>
        <P>If an End User requests deletion of their Photograph before the automated cleanup has run, they may contact the Company at <ELink href="mailto:mail@renderedfits.com">mail@renderedfits.com</ELink> or the relevant Merchant. On receipt of a verifiable deletion request, the Company will delete the associated session files within 10 business days.</P>
        <H3>5.4 No Backup Retention</H3>
        <P>Photographs and Virtual Try-On Images are not included in application-level backups. Cloud infrastructure backups (if any) that incidentally capture temporary session data are subject to the same deletion schedules as the primary data.</P>
        <H3>5.5 Sub-Processor Deletion</H3>
        <P>The Company's agreement with Google LLC (Gemini API) includes data processing terms that restrict Google's use and retention of Photographs submitted for AI processing. Google does not retain submitted Photographs for training or other purposes beyond the immediate API call.</P>

        <H2>6. Consent and Notice</H2>
        <H3>6.1</H3>
        <P>Before an End User uploads a Photograph to the Virtual Try-On Feature, they are presented with a consent notice that clearly discloses: (a) the purpose for which the Photograph will be processed; (b) that the Photograph will be sent to Google's Gemini AI for image generation; (c) the retention schedule described in this Policy; (d) a link to this Policy and the App Privacy Policy.</P>
        <H3>6.2</H3>
        <P>Consent is obtained via an affirmative action (e.g., clicking "I Agree") before photo upload is enabled. End Users may withdraw consent at any time by not proceeding with or by closing the Virtual Try-On widget.</P>
        <H3>6.3</H3>
        <P>The Company does not rely on the "photograph exception" under BIPA to avoid consent requirements. We obtain explicit consent regardless of whether the Photograph technically constitutes biometric data under BIPA, as a matter of best practice and to ensure compliance across all applicable jurisdictions.</P>

        <H2>7. Prohibition on Sale, Lease, Trade, and Disclosure</H2>
        <H3>7.1</H3>
        <P>The Company does not, and will not:</P>
        <UL>
          <LI>(a) sell, lease, trade, or otherwise profit from any End User's Photograph or any biometric data derived therefrom</LI>
          <LI>(b) disclose, redisclose, or otherwise disseminate any End User's Photograph or biometric data except: (i) as required to fulfil the Virtual Try-On Feature (i.e., transmission to the AI Service); (ii) as required by law or a valid court order; (iii) with the End User's express written consent</LI>
        </UL>
        <H3>7.2</H3>
        <P>No Photograph or biometric data is shared with third parties for advertising, marketing, profiling, or any purpose unrelated to the Virtual Try-On Feature.</P>

        <H2>8. Security Measures</H2>
        <H3>8.1</H3>
        <P>The Company uses a reasonable standard of care to protect Photographs from the time of collection to the time of destruction. Specific security measures include:</P>
        <UL>
          <LI>(a) All Photographs are transmitted over encrypted connections (TLS 1.2 or higher)</LI>
          <LI>(b) Photographs are stored in session-specific, isolated locations in cloud storage not accessible to other users</LI>
          <LI>(c) Cloud storage is encrypted at rest using AES-256</LI>
          <LI>(d) Access to production storage systems is restricted to authorised personnel with multi-factor authentication</LI>
          <LI>(e) Automated monitoring alerts are in place for anomalous access patterns</LI>
          <LI>(f) Security reviews of infrastructure and code are conducted regularly</LI>
        </UL>

        <H2>9. Data Flow Summary</H2>
        <Table
          headers={['Step', 'Action', 'Data Involved', 'Location']}
          rows={[
            ['1', 'End User views Virtual Try-On widget on Merchant storefront', 'None', "End User's browser"],
            ['2', 'End User reads consent notice and clicks "I Agree"', 'Consent recorded in session', "End User's browser"],
            ['3', 'End User selects and uploads Photograph', 'Photograph (image file)', "End User's browser → Company server"],
            ['4', 'Photograph is cached in temporary cloud storage', 'Photograph', 'Google Cloud Storage, europe-west2'],
            ['5', 'Photograph and product image are sent to AI Service', 'Photograph, product image', 'Google Cloud Storage → Google Gemini API, europe-west2'],
            ['6', 'AI Service generates Virtual Try-On Image', 'Virtual Try-On Image', 'Google Gemini API'],
            ['7', "Virtual Try-On Image is returned to End User's browser", 'Virtual Try-On Image', "Google Cloud Storage → End User's browser"],
            ['8', 'Session expires (End User closes widget or session timeout)', 'Session flagged as expired', 'Application server'],
            ['9', 'Automated cleanup function runs (every 24 hours), deletes Photograph and Virtual Try-On Image', 'Photograph, Virtual Try-On Image — permanently deleted', 'Google Cloud Storage'],
          ]}
        />

        <H2>10. Applicable Biometric Privacy Laws</H2>
        <P>This Policy is designed to address the requirements of, or otherwise reflects best practice under, the following laws:</P>
        <Table
          headers={['Law', 'Jurisdiction', 'Relevance']}
          rows={[
            ['Illinois Biometric Information Privacy Act (BIPA), 740 ILCS 14/', 'Illinois, USA', 'Primary driver of this Policy. Section 15(a) requires a publicly available written policy establishing a retention schedule and guidelines for permanent destruction.'],
            ['Texas Capture or Use of Biometric Identifier Act (CUBI), Tex. Bus. & Com. Code § 503.001', 'Texas, USA', 'Requires consent and destruction within a reasonable time or within 1 year of the purpose for collection being fulfilled.'],
            ['Washington My Health MY Data Act / HB 1155 (biometric provisions)', 'Washington, USA', 'Requires consent and imposes restrictions on collection and use of biometric data.'],
            ['UK General Data Protection Regulation (UK GDPR), Art. 9', 'United Kingdom', 'Photographs may constitute special category data (biometric data for identification purposes) requiring explicit consent.'],
            ['EU General Data Protection Regulation (EU GDPR), Art. 9', 'European Union', 'Same as UK GDPR where applicable.'],
          ]}
        />

        <H2>11. Policy Review and Updates</H2>
        <H3>11.1</H3>
        <P>This Policy will be reviewed at least annually and updated as necessary to reflect changes in the App's data processing practices, applicable law, or guidance from supervisory authorities.</P>
        <H3>11.2</H3>
        <P>Material changes to this Policy will be notified to Merchants via email or in-App notification with at least 30 days' advance notice.</P>
        <H3>11.3</H3>
        <P>The current version of this Policy is always available at <ILink to="/legal/biometric-policy">renderedfits.com/legal/biometric-policy</ILink>. The 'Last Updated' date at the top of this Policy indicates the most recent revision.</P>

        <H2>12. Contact Information</H2>
        <P>Questions or concerns about this Policy or our biometric data practices should be directed to:</P>
        <UL>
          <LI><strong>Rendered Fits Ltd</strong></LI>
          <LI>50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ, United Kingdom</LI>
          <LI>Email: <ELink href="mailto:mail@renderedfits.com">mail@renderedfits.com</ELink></LI>
          <LI>Website: <ELink href="https://renderedfits.com">renderedfits.com</ELink></LI>
          <LI>Company number: 16922551</LI>
        </UL>
        <P>For deletion requests or to exercise your rights, please contact us at the above address. We will respond within 10 business days.</P>
      </>
    ),
  },
];

// ─── LegalHub ─────────────────────────────────────────────────────────────────

export const LegalHub: React.FC = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 mb-6 inline-block">← Back to home</Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Legal</h1>
          <p className="text-gray-500 text-sm">Rendered Fits Ltd · Company No. 16922551 · VAT No. 510026164</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {legalDocs.map(doc => (
            <Link
              key={doc.slug}
              to={`/legal/${doc.slug}`}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:border-[#444833]/40 hover:shadow-sm transition-all group"
            >
              <div className="text-xs text-gray-400 mb-1">Last updated {doc.lastUpdated}</div>
              <div className="font-semibold text-gray-900 group-hover:text-[#444833] transition-colors text-sm leading-snug">{doc.title}</div>
              <div className="text-xs text-gray-500 mt-1 leading-snug">{doc.subtitle}</div>
            </Link>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
          <p>Rendered Fits Ltd · 50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ, United Kingdom</p>
          <p className="mt-1">mail@renderedfits.com · renderedfits.com</p>
        </div>
      </div>
    </div>
  );
};

// ─── LegalPage ────────────────────────────────────────────────────────────────

const LegalPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const doc = legalDocs.find(d => d.slug === slug);
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!doc) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Document not found</h1>
          <Link to="/legal" className="text-[#444833] underline">← Back to Legal</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/legal" className="text-sm text-gray-500 hover:text-gray-700 mb-8 inline-block">← Back to Legal</Link>
        <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-10">
          <div className="mb-8 pb-6 border-b border-gray-100">
            <p className="text-xs text-gray-400 mb-2">Last updated: {doc.lastUpdated}</p>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{doc.title}</h1>
            <p className="text-sm text-gray-500">{doc.subtitle}</p>
            <div className="mt-4 text-xs text-gray-400">
              <p>Rendered Fits Ltd · Company No. 16922551 · VAT No. 510026164</p>
              <p>50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ · mail@renderedfits.com</p>
            </div>
          </div>
          <div className="prose-legal">
            {doc.content}
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-gray-400">
          <Link to="/legal" className="hover:text-gray-600">← All Legal Documents</Link>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
