/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

interface LegalDoc {
  slug: string;
  title: string;
  filename: string;
  lastUpdated: string;
  text: string;
}

// ─── Verbatim content from Legal_Docs/*.md files ──────────────────────────────
// Internal/confidential files (ROPA, DPIA, InfoSec, IP Assignment) are excluded.

const websiteLegalDocuments = `RENDERED FITS LTD
Website Legal Documents

For renderedfits.com



This document contains:
Part 1: Website Privacy Policy
Part 2: Website Terms of Use
Part 3: Cookie and Tracking Notice
Part 4: Acceptable Use Policy


Version 1.0 — February 2026

Rendered Fits Ltd
Company No. 16922551 | VAT No. 510026164
50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ
mail@renderedfits.com

PART 1: WEBSITE PRIVACY POLICY
For renderedfits.com — the Company's marketing and informational website
Last Updated: February 2026

This Privacy Policy explains how Rendered Fits Ltd ("we", "us", "our") collects and uses personal information when you visit our website at renderedfits.com (the "Website"). This policy applies to the Website only. If you are a Shopify merchant using our App, or a customer using the Virtual Try-On Feature, please refer to our App Privacy Policy.

1. Who We Are
Rendered Fits Ltd, a company incorporated in England and Wales (company number 16922551). Registered office: 50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ. Contact: mail@renderedfits.com.
We are the data controller for personal information collected through this Website.

2. Information We Collect
2.1 Information You Provide
•  Contact form submissions: If you contact us via a form on the Website, we collect your name, email address, and the content of your message.
•  Newsletter subscriptions: If you subscribe to our newsletter or marketing emails, we collect your email address.

2.2 Information Collected Automatically
•  Analytics data: We may use privacy-respecting analytics tools to collect anonymised or aggregated data about Website usage, including pages visited, time on site, referral sources, and device/browser type. We do not use Google Analytics.
•  Server logs: Our hosting provider may automatically collect standard server log data, including IP addresses, browser type, and access times. These logs are used for security monitoring and are not used to identify individual visitors.

2.3 Information We Do NOT Collect
The Website does not collect: payment information, biometric data, special category data, precise geolocation data, or social media profile data.

3. How We Use Your Information

Purpose | Legal Basis (Article 6 UK GDPR)
Responding to your enquiries and contact form submissions | Article 6(1)(b) — Steps taken at your request prior to entering into a contract; or Article 6(1)(f) — Legitimate interests (responding to enquiries)
Sending marketing emails and newsletters | Article 6(1)(a) — Consent (you can unsubscribe at any time via the link in each email)
Website analytics (anonymised/aggregated) | Article 6(1)(f) — Legitimate interests (understanding Website usage to improve our content and services)
Security monitoring and abuse prevention | Article 6(1)(f) — Legitimate interests (protecting our Website and systems)

4. Sharing Your Information
We do not sell, rent, or trade your personal information. We may share your information with:
•  Email service providers (e.g., Instantly) for sending marketing emails, subject to data processing agreements
•  Hosting providers for Website infrastructure
•  Professional advisers (legal, accounting) where necessary
•  Law enforcement or regulatory authorities where required by law

5. International Transfers
Some of our service providers may process data outside the UK/EEA. Where this occurs, we ensure appropriate safeguards are in place (Standard Contractual Clauses, adequacy decisions, or equivalent measures).

6. Data Retention

Data | Retention Period
Contact form submissions | 12 months, then deleted unless an ongoing relationship exists
Marketing email subscribers | Until you unsubscribe, plus 30 days for processing
Server logs | 90 days

7. Your Rights
You have the right to access, rectify, erase, restrict, port, and object to the processing of your personal data. You can withdraw consent at any time. To exercise your rights, contact us at mail@renderedfits.com. You also have the right to complain to the ICO (ico.org.uk).

8. Children
The Website is not directed at individuals under 16. We do not knowingly collect personal information from children.

9. Changes
We may update this Privacy Policy from time to time. The "Last Updated" date indicates the most recent revision.


PART 2: WEBSITE TERMS OF USE
For renderedfits.com
Last Updated: February 2026

1. Introduction
These Terms of Use govern your access to and use of the Rendered Fits website at renderedfits.com (the "Website"). By accessing the Website, you agree to these Terms. If you do not agree, please do not use the Website.
The Website is operated by Rendered Fits Ltd, a company incorporated in England and Wales (company number 16922551).

2. Use of the Website
2.1  The Website is provided for informational purposes, including information about our App, pricing, and resources for Shopify merchants.
2.2  You may use the Website for lawful purposes only. You must not:
(a)  use the Website in any way that breaches applicable law or regulation;
(b)  use the Website to transmit or distribute any virus, trojan, worm, or other harmful code;
(c)  attempt to gain unauthorised access to the Website, its servers, or any connected systems;
(d)  use automated tools (bots, scrapers, spiders) to access the Website without our prior written consent; or
(e)  use the Website to send unsolicited commercial communications.

3. Intellectual Property
3.1  All content on the Website, including text, graphics, logos, images, software, and design, is the property of Rendered Fits Ltd (or its licensors) and is protected by copyright, trade mark, and other intellectual property laws.
3.2  You may view, download, and print content from the Website for your personal, non-commercial use, provided you do not modify or remove any copyright or proprietary notices.
3.3  The Rendered Fits name, logo, and associated branding are trade marks of Rendered Fits Ltd (trade mark application pending). You may not use them without our prior written consent.

4. Third-Party Links
The Website may contain links to third-party websites (e.g., Shopify, Calendly). We are not responsible for the content, privacy practices, or availability of such websites. Accessing third-party links is at your own risk.

5. Blog and Content
The Website may include blog articles and other content for informational and marketing purposes. Such content is provided "as is" and does not constitute professional advice (legal, financial, technical, or otherwise). You should not rely on Website content as a substitute for professional advice.

6. Disclaimers
6.1  The Website is provided on an "as is" and "as available" basis. We do not warrant that the Website will be uninterrupted, error-free, or free from viruses or other harmful components.
6.2  To the maximum extent permitted by law, we disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement.

7. Limitation of Liability
7.1  Nothing in these Terms limits or excludes our liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded by law.
7.2  Subject to the above, we shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Website.
7.3  Our total liability to you in connection with the Website shall not exceed one hundred pounds sterling (£100).

8. Governing Law
These Terms are governed by the laws of England and Wales. The courts of England and Wales shall have exclusive jurisdiction over any dispute arising from these Terms.

9. Changes
We may update these Terms at any time by posting the revised version on the Website. Continued use of the Website after changes constitutes acceptance.


PART 3: COOKIE AND TRACKING NOTICE
For renderedfits.com and the Rendered Fits App
Last Updated: February 2026

1. Our Approach to Cookies
Rendered Fits Ltd is committed to transparency about tracking technologies. This notice explains what cookies and similar technologies are used on our Website (renderedfits.com) and within our App.

2. The Rendered Fits App (Shopify Storefront Widget)
The App does NOT use cookies.
The Virtual Try-On widget embedded in Merchant storefronts does not drop any cookies (first-party or third-party) on the Customer's browser.
The App uses browser localStorage to store a session identifier for the purpose of maintaining session continuity and enabling conversion attribution. This is not a cookie: it is not sent to our servers with every request, it is not accessible by third parties, and it can be cleared by the Customer at any time through their browser settings.
The App does not use any third-party tracking scripts, advertising pixels, social media trackers, or behavioural analytics tools.

3. The renderedfits.com Website
The Website may use a limited number of cookies and similar technologies:

Cookie / Technology | Type | Purpose | Duration | Provider
Essential website cookies | Strictly necessary | Required for basic website functionality (e.g., session management, security) | Session or up to 12 months | Hosting provider
Analytics (if implemented) | Performance | Anonymised/aggregated website usage data to help us improve the Website. We do not use Google Analytics. If analytics are implemented, we will use a privacy-respecting alternative. | Up to 12 months | TBD (e.g., Plausible, Fathom, or similar)
Calendly embed | Third-party / Functional | If a Calendly booking widget is embedded on the Website, Calendly may set its own cookies. These are governed by Calendly's own cookie policy. | See Calendly's policy | Calendly
Instantly tracking pixel | Marketing | If marketing emails link to the Website, Instantly may track email open rates and link clicks. This does not drop cookies on the Website itself but may track referral data. | N/A (email-based) | Instantly

4. Managing Cookies
You can manage or delete cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or be notified when a cookie is set. Please note that disabling essential cookies may affect the functionality of the Website.
For more information about cookies and how to manage them, visit allaboutcookies.org.

5. Consent
Where non-essential cookies are used on the Website, we will obtain your consent before setting them, in accordance with the Privacy and Electronic Communications Regulations 2003 (PECR) and applicable EU cookie laws.
Strictly necessary cookies do not require consent.

6. Updates
We will update this notice if we change the cookies or tracking technologies used on the Website or in the App. The "Last Updated" date at the top of this notice indicates the most recent revision.


PART 4: ACCEPTABLE USE POLICY
For the Rendered Fits App and renderedfits.com
Last Updated: February 2026

1. Purpose
This Acceptable Use Policy sets out the rules for using the Rendered Fits virtual try-on application (the "App") and the Rendered Fits website at renderedfits.com (the "Website"). This Policy applies to all Merchants, Customers (End Users), and Website visitors.

2. Prohibited Uses
You must not use the App or the Website:

2.1 Unlawful Activity
•  For any purpose that is unlawful or fraudulent, or that facilitates unlawful or fraudulent activity
•  To violate any applicable law, regulation, or code of practice, including data protection laws, consumer protection laws, and intellectual property laws
•  In connection with the sale of illegal, counterfeit, or prohibited products or services

2.2 Harmful Content
•  To upload, transmit, or display any content that is illegal, harmful, threatening, abusive, harassing, defamatory, obscene, or otherwise objectionable
•  To upload photographs of other individuals (including children) to the Virtual Try-On Feature without their explicit consent
•  To upload any content depicting minors (individuals under 18) to the Virtual Try-On Feature without the consent of a parent or legal guardian, and in no circumstances to upload content depicting individuals under the applicable minimum age (16 in the UK/EU, 13 in the US)
•  To upload any content that infringes the intellectual property rights, privacy rights, or other rights of any third party

2.3 Misrepresentation
•  To misrepresent Virtual Try-On Images as actual photographs, exact representations, or guarantees of product appearance, fit, colour, or quality
•  To use the App or its outputs to deceive consumers or create false impressions about any product or service
•  To impersonate any person or entity, or falsely state or misrepresent your affiliation with any person or entity

2.4 Technical Abuse
•  To attempt to reverse engineer, decompile, disassemble, or otherwise extract the source code of the App
•  To use automated tools (bots, scrapers, crawlers) to access or interact with the App or the Website without our prior written consent
•  To circumvent or attempt to circumvent rate limits, usage limits, or other technical restrictions
•  To interfere with or disrupt the App, the Website, or their underlying infrastructure, including by introducing viruses, trojans, worms, denial-of-service attacks, or other harmful code
•  To access or attempt to access accounts, data, or systems that you are not authorised to access
•  To use the App for cryptocurrency mining, distributed computing, or any purpose unrelated to the App's intended functionality

2.5 Data Misuse
•  To collect, harvest, or store personal information of other users without their consent and without a lawful basis
•  To use any data obtained through the App for advertising, marketing, profiling, or automated decision-making purposes not expressly permitted by these Terms
•  To sell, lease, trade, or otherwise commercially exploit any data obtained through the App or the Website

3. Enforcement
19.1  If we reasonably believe that you have violated this Acceptable Use Policy, we may take any or all of the following actions without prior notice:
(a)  issue a warning;
(b)  temporarily or permanently suspend or restrict your access to the App and/or the Website;
(c)  remove any offending content;
(d)  report the matter to relevant law enforcement or regulatory authorities; and/or
(e)  take legal action against you, including seeking injunctive relief and/or damages.
19.2  We are not obligated to monitor compliance with this Policy, but we reserve the right to do so.

4. Reporting Violations
If you become aware of any violation of this Acceptable Use Policy, please report it to us at mail@renderedfits.com. We take all reports seriously and will investigate promptly.

5. Relationship to Other Terms
This Acceptable Use Policy supplements (and does not replace) the Merchant Terms and Conditions, the End-User Terms of Use, and the Website Terms of Use. In the event of any conflict, the more restrictive provision shall apply.


End of Website Legal Documents — Version 1.0 — February 2026`;

const appPrivacyPolicy = `RENDERED FITS LTD
App Privacy Policy

For the Rendered Fits Virtual Try-On Application




Version 1.0
Last Updated: February 2026



Rendered Fits Ltd
Company No. 16922551 | VAT No. 510026164
50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ
mail@renderedfits.com | renderedfits.com
 
Privacy Policy

Effective Date: February 2026
Last Updated: February 2026

1. Introduction
This Privacy Policy explains how Rendered Fits Ltd (“we”, “us”, “our”, or the “Company”) collects, uses, stores, shares, and protects personal information in connection with the Rendered Fits virtual try-on application (the “App”). The App is available to Shopify merchants (“Merchants”) via the Shopify App Store and provides an AI-powered virtual try-on feature for the Merchant’s customers (“End Users” or “Customers”).
This Privacy Policy applies to all personal information we process in connection with the App, including information relating to Merchants and their Customers. This Privacy Policy should be read in conjunction with our Merchant Terms and Conditions and our Data Processing Agreement.
We are committed to protecting the privacy and security of personal information. We process personal data in accordance with the UK General Data Protection Regulation (“UK GDPR”), the Data Protection Act 2018, the EU General Data Protection Regulation (“EU GDPR”), the California Consumer Privacy Act/California Privacy Rights Act (“CCPA/CPRA”), and all other applicable data protection and privacy laws.

2. Who We Are
Data Controller and Data Processor
The role we play in relation to personal data depends on whose data is being processed:
•	For Merchant account data (shop domain, billing information, usage analytics): We act as a data controller, meaning we determine the purposes and means of processing this data.
•	For End User data processed through the Virtual Try-On Feature (customer photographs, IP addresses, session identifiers): We act as a data processor on behalf of the Merchant, who is the data controller. Our processing of End User data is governed by our Data Processing Agreement with the Merchant.

Our details:
Rendered Fits Ltd
Company Registration Number: 16922551
Registered Office: 50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ, United Kingdom
Email: mail@renderedfits.com
ICO Registration Number: [TO BE OBTAINED PRIOR TO LAUNCH]

3. Information We Collect
We collect and process the following categories of personal information:

3.1 Information Collected Through Shopify’s APIs (Merchant Data)
When a Merchant installs the App, we collect the following information through Shopify’s APIs:
•	Shop domain and shop ID — used for App authentication, billing, and account identification. Where a sole trader operates the store, this may constitute personal data.
•	Subscription and billing plan data — collected via the Shopify Billing API, including plan tier, usage limits, and billing period. Used to manage the Merchant’s subscription and enforce plan limits.
•	App subscription status — received via the APP_SUBSCRIPTIONS_UPDATE webhook. Used to manage billing cycle resets and usage limit enforcement.
•	Order identifiers — received via the orders/create webhook, including order ID, cart token, and product handles. Used solely for the purpose of attributing completed purchases to virtual try-on sessions (conversion tracking).
We also handle Shopify’s mandatory GDPR compliance webhooks: customers/data_request, customers/redact, and shop/redact.

3.2 Information Collected Directly from Merchants
We do not ask Merchants for separate contact details or registration information. Authentication is handled entirely through Shopify’s OAuth 2.0 Token Exchange, and Merchants access the App directly from their Shopify Admin.
The App generates automated usage logs related to the Merchant’s use of the App:
•	Number of AI image generations consumed against the Merchant’s plan limit
•	Aggregated analytics data, including virtual try-on conversion rate, attributed revenue, and conversion comparison metrics
These logs are used solely to display the Merchant’s analytics dashboard and enforce billing plan limits.

3.3 Information Collected from End Users (Customers)
When a Customer uses the Virtual Try-On Feature on a Merchant’s store, we collect the following:

Data Type	Purpose	Retention
Customer-uploaded photograph	Processed by the AI Service to generate a virtual try-on image. The photo is sent directly from the Customer’s browser to the AI Service.	Transient. Cached temporarily in cloud storage during the active session. Automatically deleted by a cleanup function that runs every 24 hours and removes files for expired sessions.
IP address	Used solely for rate limiting (e.g., maximum generations per IP per day) to prevent abuse and protect system resources.	Session-scoped. Stored temporarily in the application’s rate-limiting system and expires automatically when the session ends.
Session ID	Stored in the Customer’s browser localStorage to maintain session continuity and enable conversion attribution.	Persists in the Customer’s browser until cleared by the Customer or until the session expires.
Order-related identifiers (order ID, cart token)	Received via Shopify webhooks for the limited purpose of attributing completed purchases to virtual try-on sessions, enabling Merchants to measure ROI.	Retained as aggregated analytics for the duration of the Merchant’s active subscription. Individual identifiers are not retained beyond the attribution window.
Product handles in Shopify cart attributes	Stored to enable conversion tracking between virtual try-on sessions and completed purchases.	Session-scoped, managed through Shopify’s cart attribute system.

3.4 Information We Do NOT Collect
We want to be clear about the data we do not collect or process:
•	Customer names
•	Customer email addresses
•	Customer postal addresses
•	Customer payment or financial details
•	Persistent, non-essential cookies
•	Browsing history or navigation data
•	Behavioural tracking data
•	Biometric identifiers or biometric templates (we do not extract, store, or create facial geometry scans, fingerprints, voiceprints, or any biometric template from Customer photographs)

4. How We Use Information
All personal information we collect is used exclusively for the following purposes:
•	Generating AI virtual try-on images for Customers
•	Providing and operating the App for Merchants
•	Managing Merchant subscriptions, billing, and plan enforcement
•	Enforcing rate limits to prevent abuse
•	Attributing conversions to enable Merchants to measure the ROI of the Virtual Try-On Feature
•	Displaying analytics and usage data on the Merchant’s dashboard
•	Complying with Shopify’s mandatory GDPR webhooks (customer data request, customer data erasure, shop data erasure)
•	Maintaining the security and integrity of the App

We do not use any collected data for:
•	Advertising or ad targeting
•	Marketing or promotional purposes
•	Profiling or automated decision-making
•	Selling, renting, leasing, or trading to third parties
•	Training artificial intelligence or machine learning models (other than the real-time generation of the requested virtual try-on image)

5. Legal Basis for Processing
Under the UK GDPR and EU GDPR, we must have a valid legal basis for processing personal data. The legal bases we rely on for each category of processing are set out below:

Processing Activity	Legal Basis (Article 6 UK GDPR)	Additional Basis (if applicable)
Processing Merchant account data (shop domain, billing, subscription)	Article 6(1)(b) — Performance of a contract (the Merchant Agreement)	N/A
Processing Merchant usage analytics	Article 6(1)(f) — Legitimate interests (providing dashboard analytics and enforcing plan limits)	N/A
Processing End User photographs for virtual try-on image generation	Article 6(1)(a) — Consent (obtained via the in-widget consent mechanism before photo upload)	To the extent that photo processing involves special category data (biometric data), we rely on Article 9(2)(a) — Explicit consent
Processing End User IP addresses for rate limiting	Article 6(1)(f) — Legitimate interests (preventing abuse and protecting system resources)	N/A
Processing End User session IDs for conversion attribution	Article 6(1)(f) — Legitimate interests (enabling Merchants to measure ROI)	N/A
Processing order identifiers for conversion attribution	Article 6(1)(f) — Legitimate interests (enabling Merchants to measure ROI)	N/A
Responding to GDPR compliance webhooks	Article 6(1)(c) — Legal obligation (compliance with data protection laws)	N/A

Where we rely on legitimate interests as a legal basis, we have conducted a balancing assessment to ensure that our interests do not override the rights and freedoms of the individuals concerned. Details of these assessments are available upon request.

6. Consent for End User Photo Processing
Before any Customer photograph is uploaded or processed through the Virtual Try-On Feature, the Customer is presented with a consent notice within the storefront widget. This consent notice:
•	Clearly explains that the Customer’s photograph will be processed using AI technology to generate a virtual try-on image
•	Identifies Rendered Fits Ltd as the processor and the Merchant as the controller
•	States that the photograph will be sent to the AI service for processing
•	Confirms that the photograph is processed transiently and is not stored long-term
•	Provides a link to this Privacy Policy for full details
•	Requires the Customer to actively confirm their consent before the upload function is enabled

Consent is specific, informed, and unambiguous. Customers may withdraw consent at any time by choosing not to use the Virtual Try-On Feature. Withdrawal of consent does not affect the lawfulness of processing based on consent before its withdrawal.
7. Sharing and Disclosure of Personal Information
We do not sell, rent, lease, trade, or otherwise commercially exploit personal information. We share personal information only in the following limited circumstances:

7.1 Third-Party Service Providers (Sub-Processors)
We use the following third-party service providers who may process personal information on our behalf:

Sub-Processor	Purpose	Data Processed	Location
AI image generation service — processing Customer photographs to generate virtual try-on images	Customer photographs (transient processing)	europe-west2
Google Cloud Platform	Cloud infrastructure hosting and temporary file storage	Temporary photo cache, application data	europe-west2
Shopify Inc.	Platform hosting, authentication, billing, webhooks	Merchant account data, order identifiers	Canada / United States

All sub-processors are bound by contractual obligations to process personal information only in accordance with our instructions and applicable data protection laws. We maintain an up-to-date sub-processor register which is available upon request.

7.2 Other Disclosures
We may also disclose personal information where:
•	Required by law, regulation, court order, or governmental or regulatory authority
•	Necessary to protect our rights, property, or safety, or the rights, property, or safety of others
•	In connection with a merger, acquisition, reorganisation, or sale of all or substantially all of our assets, in which case the acquiring entity will be bound by this Privacy Policy

8. International Data Transfers
Personal information processed through the App may be transferred to and processed in countries outside the United Kingdom and the European Economic Area (“EEA”), including to:
•	Google servers (for AI image generation and cloud hosting) — which may be located in the United States or other jurisdictions
•	Shopify servers — located in Canada and the United States

Where personal data is transferred outside the UK or EEA, we ensure that adequate safeguards are in place in accordance with applicable data protection laws. These safeguards include:
•	The UK International Data Transfer Agreement (UK IDTA) or the UK Addendum to the EU Standard Contractual Clauses, where applicable
•	The European Commission’s Standard Contractual Clauses (SCCs) for transfers from the EEA
•	Adequacy decisions, where the destination country has been recognised as providing an adequate level of data protection
•	Additional technical and organisational measures, including encryption in transit and at rest, and transient-only processing of sensitive data

Google LLC participates in the EU-U.S. Data Privacy Framework, which has been recognised as providing adequate protection by the European Commission. Further details on our international transfer safeguards are available upon request.

9. Data Retention
We retain personal information only for as long as necessary to fulfil the purposes for which it was collected, or as required by law:

Data Type	Retention Period	Deletion Method
Customer photographs and generated images	Transient. Cached temporarily in cloud storage during the active session. Automatically deleted by a cleanup function that runs every 24 hous and removes all files for expired sessions.	Automated deletion via scheduled cleanup function
IP-based rate-limit records	Session-scoped. Stored in the application’s rate-limiting system and expire automatically.	Automatic expiry
Session IDs (in Customer’s browser localStorage)	Persists until cleared by the Customer or session expiry	Customer-controlled (browser data)
Merchant billing and subscription data	Retained for the duration of the Merchant’s active subscription	Deleted upon app uninstall in accordance with Shopify’s GDPR webhook requirements (shop/redact)
Merchant aggregated analytics data	Retained for the duration of the Merchant’s active subscription	Deleted upon app uninstall in accordance with Shopify’s GDPR webhook requirements (shop/redact)

10. Your Rights
Under applicable data protection laws, individuals have the following rights in relation to their personal information:

Right	Description
Right of access	You have the right to request a copy of the personal information we hold about you.
Right to rectification	You have the right to request that we correct any inaccurate or incomplete personal information.
Right to erasure	You have the right to request that we delete your personal information, subject to certain legal exceptions.
Right to restriction of processing	You have the right to request that we restrict the processing of your personal information in certain circumstances.
Right to data portability	You have the right to receive your personal information in a structured, commonly used, and machine-readable format, and to transmit it to another controller.
Right to object	You have the right to object to processing based on legitimate interests. We will cease processing unless we can demonstrate compelling legitimate grounds.
Right to withdraw consent	Where processing is based on consent, you have the right to withdraw consent at any time without affecting the lawfulness of processing based on consent before withdrawal.
Right not to be subject to automated decision-making	You have the right not to be subject to decisions based solely on automated processing that produce legal or similarly significant effects. We do not make such decisions.

How to exercise your rights:
•	Merchants: Contact us at mail@renderedfits.com with your request.
•	End Users (Customers): In the first instance, please contact the Merchant whose store you used the Virtual Try-On Feature on, as the Merchant is the data controller for your data. You may also contact us directly at mail@renderedfits.com and we will assist in facilitating your request.

We will respond to all data subject requests within one (1) month of receipt, or within the timeframe required by applicable law. In complex cases, we may extend this period by up to two (2) additional months, and we will inform you of any such extension and the reasons for it.

11. Additional Information for US Residents
11.1 Biometric Information Notice (All US States)
This section provides additional information for residents of the United States regarding the processing of biometric data through the Virtual Try-On Feature.
When you upload a photograph to the Virtual Try-On Feature, our AI technology analyses the facial features and body shape in your photograph to generate a virtual try-on image. To the extent that this processing may involve biometric identifiers or biometric information as defined under applicable state law, the following applies:
a)	What is collected. Your photograph, which contains your facial image, is transmitted to the AI service for processing. The AI analyses the visual content of your photograph, including your facial features, to generate the composite try-on image.
b)	What is NOT collected. We do not extract, compute, create, or store any biometric identifier or biometric template from your photograph. No facial geometry scan, faceprint, iris scan, fingerprint, voiceprint, or other biometric template is created or retained at any point during processing.
c)	Purpose. Your photograph is processed solely for the purpose of generating the virtual try-on image you requested. It is not used for identification, verification, surveillance, profiling, advertising, or any other purpose.
d)	Retention and destruction. Your photograph is cached temporarily for the duration of your active session (maximum 24 hours) and is permanently and automatically destroyed when the session expires. We do not maintain any permanent database of photographs or biometric data. Our full retention schedule and destruction procedures are set out in our Biometric Data Retention and Destruction Policy, available at: renderedfits.com/legal/biometric-policy
e)	No sale or disclosure. We do not sell, lease, trade, or otherwise profit from your photograph or any data derived from it. We do not disclose your photograph to any third party other than the AI service for the sole purpose of generating your try-on image.
f)	Consent. By uploading your photograph to the Virtual Try-On Feature, you acknowledge that you have received this notice and you provide your informed, written consent and release for your photograph to be processed as described above, including the analysis of your facial features for the sole purpose of generating a virtual try-on image.
g)	Applicable laws. This notice is provided in compliance with the Illinois Biometric Information Privacy Act (740 ILCS 14) (BIPA), the Texas Capture or Use of Biometric Identifier Act (Tex. Bus. & Com. Code § 503.001), the Washington Biometric Privacy Protection Act (RCW 19.375), and other applicable US state biometric privacy laws.
11.2 California Privacy Rights (CCPA/CPRA)
If you are a California resident, the following additional rights and disclosures apply under the California Consumer Privacy Act, as amended by the California Privacy Rights Act:
a)	Categories of personal information collected. Photographs (which may constitute biometric information and are classified as sensitive personal information under the CPRA), IP addresses (internet or other electronic network activity information), and session identifiers (unique personal identifiers).
b)	Purpose of collection. As set out in Section 4 of this Privacy Policy. We do not use or disclose sensitive personal information for purposes other than those permitted under CPRA Section 1798.121.
c)	Sale and sharing. We do not sell personal information. We do not share personal information for cross-context behavioural advertising.
d)	Right to know. You have the right to request that we disclose the categories and specific pieces of personal information we have collected about you.
e)	Right to delete. You have the right to request deletion of personal information we have collected. Given our transient processing model, your photograph will typically have been automatically deleted before any such request is received.
f)	Right to limit use of sensitive personal information. You have the right to limit the use and disclosure of your sensitive personal information. We already limit use to the purposes disclosed in this Privacy Policy.
g)	Non-discrimination. We will not discriminate against you for exercising any of your CCPA/CPRA rights.
To exercise your California privacy rights, contact us at: mail@renderedfits.com. We will verify your identity before processing your request.
11.3 Other US State Privacy Laws
Residents of other US states with applicable consumer privacy or biometric privacy laws (including but not limited to Colorado, Connecticut, Virginia, Utah, Montana, Oregon, and New Jersey) may have additional rights regarding their personal information. To the extent required by applicable state law, we will honour requests to access, correct, delete, or opt out of the processing of your personal data. To exercise any such rights, please contact us at: mail@renderedfits.com
For full details of our biometric data retention and destruction practices, please refer to our Biometric Data Retention and Destruction Policy at: renderedfits.com/legal/biometric-policy

12. Children’s Privacy
The Virtual Try-On Feature is intended for individuals aged 16 and over. We do not knowingly collect personal information from children under the age of 16 (or under the age of 13 in jurisdictions where that is the applicable minimum age).
If we become aware that we have collected personal information from a child under the applicable minimum age without appropriate consent, we will take steps to delete such information as soon as reasonably practicable.
If you are a parent or guardian and believe your child has provided personal information through the Virtual Try-On Feature, please contact us at mail@renderedfits.com.

13. Data Security
We implement appropriate technical and organisational security measures to protect personal information against unauthorised access, alteration, disclosure, or destruction. These measures include:
•	Encryption of data in transit using TLS/HTTPS
•	Transient processing of Customer photographs with automated deletion
•	Session-scoped data storage with automatic expiry
•	Authentication via Shopify’s OAuth 2.0 Token Exchange (no separate credentials stored)
•	Rate limiting to prevent abuse and protect system resources
•	Access controls restricting access to personal data to authorised personnel only
•	Regular review and monitoring of security measures

While we take reasonable steps to protect personal information, no method of transmission over the internet or method of electronic storage is 100% secure. We cannot guarantee the absolute security of personal information.

14. Cookies and Similar Technologies
The App only uses essential and functional cookies.
The App uses browser localStorage to store a session ID for the purpose of maintaining session continuity and enabling conversion attribution. This session ID is not a cookie and is not shared with any third party. It remains in the Customer’s browser and can be cleared by the Customer at any time through their browser settings.
We do not log browsing behaviour, store navigation data, or use any form of behavioural tracking.

15. AI-Generated Content Transparency
Virtual Try-On Images produced by the App are generated using artificial intelligence. In accordance with emerging AI transparency regulations, including the EU AI Act (Article 50, effective August 2026):
•	All Virtual Try-On Images are clearly identified to the Customer as AI-generated within the storefront widget
•	Virtual Try-On Images are illustrative only and do not constitute photographs or exact representations of real-world products
•	We will implement machine-readable marking of AI-generated content in accordance with applicable legal requirements as they come into effect

16. Changes to This Privacy Policy
We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify Merchants of any material changes by email or in-app notification at least thirty (30) days before such changes take effect.
We encourage you to review this Privacy Policy periodically. The “Last Updated” date at the top of this policy indicates when it was last revised. Continued use of the App after changes take effect constitutes acceptance of the updated Privacy Policy.

17. Complaints
If you have any concerns or complaints about our processing of personal information, we encourage you to contact us first at mail@renderedfits.com so that we can try to resolve the matter.
You also have the right to lodge a complaint with a supervisory authority. In the United Kingdom, this is the Information Commissioner’s Office (ICO):
•	Website: ico.org.uk
•	Telephone: 0303 123 1113
•	Post: Information Commissioner’s Office, Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF

If you are located in the European Economic Area, you may lodge a complaint with the data protection authority in your country of residence.

18. Contact Us
If you have any questions about this Privacy Policy, our data practices, or wish to exercise your data subject rights, please contact us:

Rendered Fits Ltd
Email: mail@renderedfits.com
Post: 50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ, United Kingdom

End of App Privacy Policy — Version 1.0 — February 2026`;

const endUserTerms = `RENDERED FITS LTD
End-User Terms of Use

Virtual Try-On Feature — Terms, Consent, and Privacy




Version 1.0
Last Updated: February 2026



Rendered Fits Ltd
Company No. 16922551
50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ
mail@renderedfits.com | renderedfits.com



This document contains: (A) the End-User Terms of Use; (B) the End-User Privacy Notice; (C) the Standard Consent Flow (UK/EU/ROW); and (D) the Enhanced US Consent Flow (BIPA-compliant).
 
PART A: END-USER TERMS OF USE
Virtual Try-On Feature

IMPORTANT — PLEASE READ BEFORE USING THE VIRTUAL TRY-ON FEATURE
By clicking “I Agree” or by uploading a photograph to the Virtual Try-On feature, you agree to these Terms of Use and to the processing of your photograph as described below. If you do not agree, please do not use the Virtual Try-On feature.

1. What is the Virtual Try-On Feature?
1.1	The Virtual Try-On feature (the “Feature”) is provided by Rendered Fits Ltd (“we”, “us”, or “our”) and is embedded in this online store (operated by the “Merchant”). The Feature allows you to upload a photograph of yourself and receive an AI-generated image showing you wearing a product from this store.
1.2	The Feature is powered by artificial intelligence. The images it produces are AI-generated and are not photographs. They are illustrative only and may not accurately represent how the product will look or fit in real life.

2. How Your Photograph is Processed
2.1	When you upload a photograph:
(a)	Your photograph is sent from your browser to the AI service, along with an image of the product you selected.
(b)	The AI combines these to generate a virtual try-on image, which is sent back to your browser.
(c)	Your original photograph is cached temporarily on our cloud servers during your active session. It is automatically and permanently deleted when your session expires (our cleanup system runs every 24 hours).
(d)	The generated try-on image follows the same temporary lifecycle and is also automatically deleted.
2.2	We do not:
(a)	store your photograph long-term or in any permanent database;
(b)	extract, create, or store any facial geometry scan, biometric template, or biometric identifier from your photograph;
(c)	use your photograph for advertising, marketing, profiling, or any purpose other than generating the virtual try-on image you requested;
(d)	sell, rent, trade, or share your photograph or any data derived from it with any third party; or
(e)	use your photograph to train AI models.

3. AI-Generated Content Disclaimer
3.1	Virtual try-on images are generated by artificial intelligence. You acknowledge and agree that:
(a)	virtual try-on images are AI-generated interpretations, not photographs or exact representations;
(b)	the AI may not perfectly replicate colours, textures, fit, proportions, or other characteristics of the actual product;
(c)	you should not rely on virtual try-on images as a guarantee of how a product will look or fit;
(d)	the AI may occasionally produce unexpected, imperfect, or inaccurate results; and
(e)	virtual try-on images are digitally marked as AI-generated content.
(f)	the AI may slightly modify the appearance of customers, including adjustments to lighting, hair positioning, or posture
4. Notice Regarding Facial Features and Biometric Data
4.1	In the course of generating your virtual try-on image, our AI technology analyses the facial features and body shape contained in the photograph you upload. We want you to understand the following before you proceed:

(a)	Purpose. Your facial features are analysed solely for the purpose of generating a virtual try-on image showing you wearing the selected product. This is the only purpose for which your photograph is processed.

(b)	No biometric data stored. We do not extract, create, or store any biometric identifier or biometric template (such as a facial geometry scan, faceprint, or voiceprint) from your photograph. The AI processes your photograph as a whole image to generate the try-on output — it does not isolate or record your facial measurements.

(c)	No sale or disclosure. Your photograph and any data relating to your facial features will not be sold, leased, traded, or otherwise disclosed to any third party, except to the AI service solely for the purpose of generating your virtual try-on image.
(d)	Automatic deletion. Your photograph is cached temporarily during your active session and is permanently and automatically destroyed when your session expires. Sessions last a maximum of 24 hours. No photographs are retained beyond this period.

(e)	Retention and destruction policy. We maintain a publicly available Biometric Data Retention and Destruction Policy, which sets out our full retention schedule and destruction procedures. This policy is available at: renderedfits.com/legal/biometric-policy

4.2 	By uploading your photograph, you acknowledge that you have read and understood this notice. You consent to and release Rendered Fits Ltd to process your photograph as described in these Terms, including the analysis of your facial features for the sole purpose of generating a virtual try-on image.

4.3	You may withdraw your consent at any time by choosing not to use the Virtual Try-On Feature. Any photographs already cached will be automatically deleted when the session expires.

5. Age Restriction
5.1	The Virtual Try-On Feature is intended for use by individuals aged 16 and over. If you are under 16, you must not use this Feature. In jurisdictions where the applicable minimum age is lower (such as 13 in the United States under COPPA), the minimum age of that jurisdiction applies.
5.2	By using the Feature, you confirm that you meet the applicable minimum age requirement.

6. Acceptable Use
6.1	When using the Virtual Try-On Feature, you agree that you will:
(a)	only upload photographs of yourself;
(b)	not upload photographs of other individuals, including children, without their explicit consent;
(c)	not upload any image that is illegal, offensive, harmful, defamatory, obscene, or that infringes any third party’s rights;
(d)	not attempt to manipulate, reverse engineer, or abuse the Feature in any way; and
(e)	not use the Feature for any unlawful or fraudulent purpose.
6.2	We reserve the right to refuse or disable access to the Feature if we reasonably believe these Acceptable Use rules have been violated.

7. Rate Limiting and Session Data
7.1	To prevent abuse, we temporarily record your IP address for the purpose of rate limiting (for example, limiting the number of virtual try-on images that can be generated per hour). This record expires automatically when your session ends.
7.2	A session identifier is stored in your browser’s local storage to maintain session continuity. This is not a cookie and is not shared with third parties. You can clear it at any time through your browser settings.
7.3	If you complete a purchase after using the Feature, an anonymous session identifier may be used to attribute the purchase to the try-on session. This allows the Merchant to measure the effectiveness of the Feature. No personally identifiable information is used for this purpose.

8. Intellectual Property
8.1	You retain ownership of any photograph you upload to the Feature. By uploading a photograph, you grant us a limited, temporary, non-exclusive licence to process it solely for the purpose of generating your virtual try-on image.
8.2	The virtual try-on images generated by the Feature are AI-generated content. The copyright status of AI-generated images may be uncertain under applicable law. The Merchant is granted a licence to use the generated images in connection with the operation of their store. You may save and use the generated images for your personal, non-commercial use.
8.3	All intellectual property rights in the Feature itself (including its software, design, and underlying technology) belong to Rendered Fits Ltd.

9. No Warranties
9.1	The Virtual Try-On Feature is provided “as is” and “as available”. To the maximum extent permitted by applicable law, we disclaim all warranties, express or implied, including warranties of accuracy, merchantability, fitness for a particular purpose, and non-infringement.
9.2	We do not guarantee that the Feature will be available at all times. The Feature may be temporarily unavailable due to maintenance, technical issues, or the unavailability of our AI service provider.
9.3	Nothing in these Terms affects your statutory rights as a consumer under applicable law.

10. Limitation of Liability
10.1	Nothing in these Terms limits or excludes our liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be limited or excluded by applicable law.
10.2	Subject to the above, to the maximum extent permitted by applicable law, we shall not be liable to you for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, revenue, data, or goodwill arising from your use of the Feature, including any losses arising from inaccurate or unexpected AI-generated outputs.
10.3	Our total aggregate liability to you in connection with the Feature shall not exceed one hundred pounds sterling (£100).

11. Governing Law
11.1	These Terms are governed by the laws of England and Wales. If you are a consumer, you may also benefit from any mandatory consumer protection provisions of the laws of the country in which you are resident.

 
PART B: END-USER PRIVACY NOTICE
Virtual Try-On Feature — Privacy Information

PRIVACY AT A GLANCE
•  Your photo is processed by AI to generate a try-on image — it is NOT stored permanently
•  Your photo is automatically deleted when your session expires (within 24 hours)
•  We do NOT collect your name, email, address, or payment details
•  We do NOT create or store any biometric templates or facial scans
•  We do NOT sell, share, or use your photo for advertising or AI training
•  Your photo is sent to the AI service solely to generate your try-on image

Who is responsible for your data?
Data Controller: The Merchant whose store you are visiting (the shop owner) is the data controller — they determine why and how your data is used in connection with their store.
Data Processor: Rendered Fits Ltd processes your data on behalf of the Merchant. We provide the Virtual Try-On technology.

What data is collected?
Data	Why	How Long
Your photograph	To generate the virtual try-on image	Temporary only — deleted automatically when your session expires (cleanup runs daily)
Your IP address	To enforce rate limits and prevent abuse	Session-scoped — expires automatically
Session ID (in your browser)	To maintain session continuity and enable conversion tracking	Until you clear your browser data

What data is NOT collected?
We do not collect: your name, email address, postal address, phone number, payment details, browsing history, or any biometric identifiers or facial geometry data.

Who processes your data?
•	Google LLC  — receives your photograph to generate the try-on image. Google is bound by its Cloud Data Processing Addendum and does not use your photo to train AI models.
•	Shopify Inc. — hosts the Merchant’s store and processes order data for conversion attribution.

International transfers
Your photograph may be transferred to Google’s servers, which may be located outside the UK/EU (including in the United States). Appropriate safeguards are in place, including Standard Contractual Clauses and the EU-U.S. Data Privacy Framework.

Your legal basis (UK/EU)
Consent (Article 6(1)(a) and Article 9(2)(a) UK GDPR/EU GDPR): We process your photograph based on your explicit consent, which you provide by clicking “I Agree” before uploading.
Legitimate interests (Article 6(1)(f)): We process your IP address for rate limiting (preventing abuse) and your session ID for conversion attribution.

Your rights
Under applicable data protection laws, you have the right to access, rectify, erase, restrict, port, and object to the processing of your personal data. You can withdraw consent at any time by not using the Feature.
To exercise your rights, contact the Merchant whose store you used, or email us at mail@renderedfits.com. You also have the right to complain to a supervisory authority (in the UK, this is the Information Commissioner’s Office at ico.org.uk).

For our full privacy policy, visit: renderedfits.com/privacy

End of End-User Terms of Use — Version 1.0 — February 2026`;

const merchantTerms = `RENDERED FITS LTD
Merchant Terms and Conditions

For the Rendered Fits Virtual Try-On Application




Version 1.0
Effective Date: [DATE OF FIRST INSTALLATION]
Last Updated: February 2026



Rendered Fits Ltd
Company No. 16922551 | VAT No. 510026164
50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ
mail@renderedfits.com | renderedfits.com

MERCHANT TERMS AND CONDITIONS

IMPORTANT: Please read these Terms carefully before installing or using the Rendered Fits App. By installing, accessing, or using the App, you agree to be bound by these Terms. If you do not agree to these Terms, you must not install or use the App.

These Terms constitute a legally binding agreement between you (the Merchant) and Rendered Fits Ltd (the Company) governing your installation and use of the Rendered Fits virtual try-on application (the App) on your Shopify store.
The App is developed and operated by the Company. Shopify Inc. is not a party to these Terms and has no responsibility or liability in connection with the App. By agreeing to these Terms, the Merchant acknowledges and agrees that:
•  the Company is solely responsible for the App and its functionality;
•  Shopify is not liable for any fault in the App or any harm that may result from its installation or use;
•  except where expressly stated by Shopify, Shopify cannot provide assistance with the installation or use of the App; and
•  the Company is solely responsible for any liability which may arise from the Merchant's access to or use of the App, including: (A) the development, use, marketing or distribution of or access to the App, including support of the App; or (B) the Company's access, use, distribution or storage of Merchant Data.

1. Definitions and Interpretation
1.1  In these Terms, unless the context otherwise requires, the following definitions apply:

"App" means the Rendered Fits virtual try-on application, including all software, code, interfaces, widgets, and associated documentation made available by the Company to the Merchant via the Shopify App Store or otherwise.
"AI Service" means the third-party artificial intelligence image generation service used by the App to generate Virtual Try-On Images.
"Company" means Rendered Fits Ltd, a company incorporated in England and Wales (company number 16922551), whose registered office is at 50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ, United Kingdom.
"Customer" means any individual who visits or transacts via the Merchant Store, including any end user who interacts with the Virtual Try-On Feature.
"Customer Data" means information (including Personal Information) relating to a Customer, including order information, payment information, account information, photographs uploaded to the Virtual Try-On Feature, and any data derived from Customer interactions with the App.
"Data Protection Laws" means all applicable data protection and privacy legislation, including (as applicable) the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018, the EU General Data Protection Regulation (EU GDPR, Regulation 2016/679), the California Consumer Privacy Act (CCPA/CPRA), the Illinois Biometric Information Privacy Act (BIPA), and any other applicable data protection or privacy laws in any relevant jurisdiction.
"Effective Date" means the date on which the Merchant first installs the App on the Merchant Store.
"Generated Image" means any image produced by the App using the AI Service, including Virtual Try-On Images.
"Intellectual Property Rights" means all patents, rights to inventions, utility models, copyright and related rights, trade marks, service marks, trade names, domain names, rights in get-up and trade dress, rights in goodwill, rights to sue for passing off, design rights, database rights, rights in confidential information (including know-how and trade secrets), and any other intellectual property rights, in each case whether registered or unregistered and including all applications and rights to apply for and be granted renewals or extensions of, and rights to claim priority from, such rights and all similar or equivalent rights or forms of protection in any part of the world.
"Merchant" means the individual or business entity that installs the App on its Merchant Store and agrees to these Terms.
"Merchant Data" means information (including Personal Information) relating to the Merchant or Merchant Store, including business, financial, and product information, and any Customer Data.
"Merchant Store" means the Merchant's commerce presence hosted by Shopify, including its online store and Point of Sale (POS).
"Personal Information" means any information relating to an identified or identifiable natural person, as defined under applicable Data Protection Laws.
"Privacy Policy" means the Company's privacy policy as published on the App Store listing and at renderedfits.com, as updated from time to time.
"Shopify" means Shopify Inc. and its affiliates.
"Shopify Platform" means the Shopify hosted commerce platform available via www.shopify.com and any associated websites, products, or services offered by Shopify, including the Shopify App Store, Shopify APIs, and Shopify Billing API.
"Subscription Plan" means the pricing tier selected by the Merchant, as set out in Schedule 1 (Pricing) or as displayed within the App, which determines the Merchant's monthly allocation of Virtual Try-On generations and available features.
"Terms" means these Merchant Terms and Conditions, including any Schedules, as amended from time to time in accordance with Clause 18.
"Virtual Try-On Feature" means the functionality of the App that enables Customers to upload a photograph of themselves and receive an AI-generated image depicting the Customer wearing a product from the Merchant Store.
"Virtual Try-On Image" means an AI-generated image produced by the Virtual Try-On Feature depicting a Customer wearing a product from the Merchant Store.

1.2  In these Terms, unless the context otherwise requires: (a) references to clauses and Schedules are to clauses of and Schedules to these Terms; (b) headings are for convenience only and do not affect the interpretation of these Terms; (c) words in the singular include the plural and vice versa; (d) a reference to a statute or statutory provision is a reference to it as amended, extended or re-enacted from time to time; and (e) a reference to writing or written includes email.

2. Licence Grant and Restrictions
2.1  Subject to the Merchant's compliance with these Terms, the Company grants the Merchant a worldwide, non-exclusive, non-transferable, non-sublicensable, revocable and limited licence to install and use the App solely on the Merchant's own Merchant Store(s) and solely for the purpose of enabling the Virtual Try-On Feature for the Merchant's Customers, subject to the Merchant's Subscription Plan.
2.2  The Merchant shall not, and shall not permit any third party to:
(a)  resell, sublicense, assign, distribute, lease, rent, lend or otherwise commercially exploit the App or any part of it to any third party;
(b)  copy, modify, adapt, translate, reverse engineer, decompile, disassemble or create derivative works based on the App or any part of it, except to the extent that such restriction is expressly prohibited by applicable law;
(c)  use the App on any store, platform or website other than the Merchant's own Merchant Store(s) hosted on the Shopify Platform;
(d)  remove, alter or obscure any proprietary notices, labels or marks on the App;
(e)  use the App for any unlawful purpose or in any manner that could damage, disable, overburden or impair the App or the Shopify Platform;
(f)  use the App to develop a competing product or service; or
(g)  use any automated means (including bots, scrapers or similar technology) to access or use the App except as expressly permitted by the App's intended functionality.
2.3  The licence granted under Clause 2.1 is personal to the Merchant and may not be transferred or assigned without the Company's prior written consent.

3. App Description and AI Service
3.1  The App provides an AI-powered virtual try-on feature that enables Customers visiting the Merchant Store to upload a photograph of themselves and receive an AI-generated image depicting the Customer wearing a product from the Merchant Store.
3.2  The Virtual Try-On Feature is powered by the AI Service. The Merchant acknowledges and agrees that:
(a)  Virtual Try-On Images are AI-generated interpretations and are not exact replicas or photographs. The Company does not guarantee 100% visual accuracy, colour fidelity, likeness, or fit between Generated Images and real-world garments or products.
(b)  Virtual Try-On Images are illustrative only and should not be relied upon by the Merchant or its Customers as definitive representations of how a product will appear or fit in reality.
(c)  the quality, accuracy and availability of the AI Service may vary and is dependent on third-party technology providers. The Company shall use reasonable endeavours to maintain the quality and availability of the AI Service but does not guarantee any particular level of accuracy or uptime.
(d)  AI-generated outputs may occasionally produce unexpected, inaccurate or undesirable results, and the Company shall not be liable for any such outputs.
3.3  The Merchant shall not represent or imply to its Customers that Virtual Try-On Images are actual photographs, exact representations, or guarantees of product appearance, fit, colour, or quality.

4. AI Service Availability and Graceful Degradation
4.1  The App incorporates a graceful degradation pattern. In the event that the AI Service is unavailable, experiences downtime, or is otherwise non-operational:
(a)  the Virtual Try-On button will be automatically disabled or hidden on the Merchant's storefront;
(b)  this behaviour is intentional and is designed to prevent broken functionality or a poor Customer experience;
(c)  the rest of the Merchant's store functionality, checkout process, and core Shopify operations shall not be affected; and
(d)  the Merchant acknowledges that such temporary disabling of the Virtual Try-On Feature does not constitute a defect in, or breach of contract relating to, the App.
4.2  The Company shall use reasonable endeavours to restore the Virtual Try-On Feature as soon as reasonably practicable following any period of AI Service unavailability.

5. Third-Party Service Providers
5.1  The Merchant acknowledges that the App relies on third-party service providers, including but not limited to:
(a)  AI service for AI image generation;
(b)  Shopify for platform hosting, billing, authentication, and API access; and
(c)  cloud infrastructure providers for hosting and data processing.
5.2  Where any downtime, delay, degradation, failure, error, inaccuracy, or interruption of the App or the Virtual Try-On Feature arises from the acts or omissions of a third-party service provider, the Company shall not be responsible or liable for such downtime, delay, degradation, failure, error, inaccuracy, or interruption, provided that the Company has used reasonable endeavours in its selection of and contractual arrangements with such third-party provider.
5.3  The Company reserves the right to change, replace, or update the third-party service providers used in connection with the App at any time without prior notice to the Merchant, provided that such change does not materially diminish the core functionality of the App.

6. Subscription Plans, Billing and Payment
6.1  The App is offered on a subscription basis. The Merchant shall select a Subscription Plan upon installation of the App. The current Subscription Plans and their associated fees and usage limits are set out in Schedule 1 (Pricing) and as displayed within the App.
6.2  Each Subscription Plan includes a fixed monthly allocation of Virtual Try-On image generations. When the Merchant reaches the allocation limit for the current billing period, the Virtual Try-On Feature will be disabled until the next billing period commences or the Merchant upgrades to a higher Subscription Plan.
6.3  All billing is processed through the Shopify Billing API. The Merchant authorises the Company to charge the applicable subscription fees to the Merchant's Shopify account in accordance with Shopify's standard billing procedures.
6.4  The Merchant may upgrade or downgrade their Subscription Plan at any time through the App settings within the Shopify Admin, without the need to contact the Company's support team or reinstall the App. Upgrades take effect immediately; downgrades take effect at the start of the next billing period.
6.5  All fees are exclusive of VAT (or equivalent sales tax). VAT will be charged where applicable, based on the Merchant's location and tax status, in accordance with applicable law.
6.6  In the event of late or failed payment:
(a)  the Company may rely on Shopify's automatic retry mechanism for failed charges;
(b)  if payment remains outstanding after Shopify's retry attempts, the Company reserves the right to suspend or restrict the Merchant's access to the App and the Virtual Try-On Feature; and
(c)  the Company shall provide reasonable notice to the Merchant before any suspension for non-payment takes effect, except where suspension is required to prevent ongoing unauthorised use.
6.7  The Company may offer a free trial period at its discretion. The terms and duration of any free trial will be communicated to the Merchant at the time of installation. At the conclusion of the free trial, the Merchant will be required to select a paid Subscription Plan to continue using the App, unless the Merchant uninstalls the App before the trial expires.

7. Pricing Changes
7.1  The Company reserves the right to change the fees for any Subscription Plan at any time. Pricing changes may be necessitated by, among other things, increases in third-party AI service costs, infrastructure costs, or changes to the App's features.
7.2  The Company shall provide the Merchant with at least thirty (30) days' advance written notice (via email or in-app notification) before any price increase takes effect.
7.3  If the Merchant does not agree to a price increase, the Merchant may cancel their Subscription Plan and uninstall the App before the new pricing takes effect. Continued use of the App after a price increase takes effect constitutes the Merchant's acceptance of the new pricing.

8. Merchant Data Ownership and Security
8.1  As between the Company and the Merchant, the Merchant retains all rights, title, and interest in and to the Merchant Data, including all product data, product images, and Customer Data.
8.2  The Company does not take ownership of, reuse, or commercially exploit the Merchant's own data, including product data, product images, or Customer information, except as strictly necessary to provide the App's services as described in these Terms and the Privacy Policy.
8.3  The Company shall not use Merchant Data (including any anonymous, aggregate, or derived data) for the development or training of artificial intelligence or machine learning systems, except as strictly necessary to provide the App's services to the Merchant.
8.4  The Company processes Merchant Data (including Customer Data) in accordance with its Privacy Policy and applicable Data Protection Laws. Where the Company processes Personal Information on behalf of the Merchant, the Data Processing Agreement shall apply and is incorporated into these Terms by reference.
8.5  The Merchant is responsible for ensuring that it has obtained all necessary consents, authorisations, and legal bases for the collection and processing of Customer Data through the Merchant Store, including in connection with the Virtual Try-On Feature.

9. Security Breaches
9.1  In the event of a security breach:
(a)  the Company shall only accept responsibility for breaches arising directly from its own systems, infrastructure, and operations;
(b)  the Company shall not be responsible or liable for security breaches arising from or relating to: the Merchant's own systems; the Shopify Platform; third-party services, integrations, or applications used by the Merchant; or any data environment controlled by the Merchant; and
(c)  the Company shall notify the Merchant without undue delay upon becoming aware of a security breach affecting the Merchant's data, and shall cooperate with the Merchant and any applicable regulatory authority in accordance with its obligations under applicable Data Protection Laws.

10. Merchant Obligations
10.1  The Merchant represents, warrants and undertakes that:
(a)  it has full power and authority to enter into these Terms and to perform its obligations hereunder;
(b)  it shall comply with all applicable laws, regulations and codes of practice in connection with its use of the App, including all applicable Data Protection Laws, consumer protection laws, and advertising standards;
(c)  it shall not use Virtual Try-On Images in a manner that is misleading, deceptive or likely to create a false impression as to the nature, quality, appearance, or fit of any product;
(d)  it shall ensure that its Customer-facing privacy notices adequately disclose the use of the Virtual Try-On Feature, the processing of Customer photographs, and the involvement of third-party AI processing, and that any required consents are obtained;
(e)  it shall ensure that the Virtual Try-On Feature on its Merchant Store includes the end-user consent mechanism provided by the Company (or an equivalent mechanism approved by the Company), and that such consent is obtained from each Customer before any photograph is uploaded or processed;
(f)  it shall not upload, or permit the upload of, any illegal, harmful, offensive, defamatory, or infringing content to the App;
(g)  it shall not use the App in connection with any products or services that are illegal, fraudulent, or in violation of the Shopify Acceptable Use Policy; and
(h)  it shall promptly notify the Company of any suspected security breach, unauthorised access, or misuse of the App.

11. Intellectual Property
11.1  All Intellectual Property Rights in and to the App, including its source code, object code, design, user interface, documentation, algorithms, and all modifications, enhancements and derivative works thereof, are and shall remain the exclusive property of the Company (or its licensors). Nothing in these Terms transfers or assigns any Intellectual Property Rights in the App to the Merchant.
11.2  The Merchant retains all Intellectual Property Rights in its own product data, product images, branding, and Customer Data.
11.3  With respect to Virtual Try-On Images:
(a)  the Merchant shall not use Virtual Try-On Images for any purpose unrelated to the Merchant Store or the products depicted therein; and
(b)  the Merchant acknowledges that Virtual Try-On Images are AI-generated and that the copyright status of AI-generated images may be uncertain under applicable law. The Company makes no representation or warranty as to the copyrightability of Virtual Try-On Images.

12. Suspension and Termination
12.1  The Company may suspend or restrict the Merchant's access to the App immediately upon written notice if the Merchant:
(a)  fails to pay any subscription fees when due, and such failure continues for more than fourteen (14) days after notification;
(b)  breaches any material provision of these Terms;
(c)  uses the App in a manner that is unlawful, fraudulent, or in violation of the Shopify Acceptable Use Policy;
(d)  engages in conduct that, in the Company's reasonable opinion, may bring the Company, the App, or the Shopify Platform into disrepute; or
(e)  becomes the subject of insolvency, bankruptcy, liquidation, administration, or similar proceedings.
12.2  The Merchant may terminate these Terms at any time by uninstalling the App from the Merchant Store through the Shopify Admin.
12.3  The Company may terminate these Terms by providing the Merchant with at least thirty (30) days' written notice.
12.4  Upon termination of these Terms for any reason:
(a)  the licence granted under Clause 2.1 shall immediately terminate;
(b)  the Merchant's access to the App and all associated features shall cease;
(c)  the Company shall handle Merchant Data in accordance with its obligations under these Terms, the Privacy Policy, the Data Processing Agreement, and applicable Data Protection Laws, including compliance with Shopify's mandatory GDPR webhooks (shop/redact); and
(d)  any outstanding fees owed by the Merchant to the Company shall remain payable.
12.5  Clauses 1 (Definitions), 8 (Merchant Data), 9 (Security Breaches), 11 (Intellectual Property), 13 (Limitation of Liability), 14 (Indemnification), 15 (Confidentiality), 17 (Governing Law and Dispute Resolution) and this Clause 12.5 shall survive termination of these Terms.

13. Limitation of Liability
13.1  Nothing in these Terms shall limit or exclude either party's liability for:
(a)  death or personal injury caused by its negligence;
(b)  fraud or fraudulent misrepresentation; or
(c)  any other liability which cannot be limited or excluded by applicable law.
13.2  Subject to Clause 13.1, the Company shall not be liable to the Merchant, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, for any:
(a)  loss of profits, revenue, business, anticipated savings, or goodwill;
(b)  loss of data or corruption of data (except to the extent arising from the Company's breach of its data protection obligations);
(c)  indirect, special, incidental, consequential, or punitive damages; or
(d)  losses arising from the Merchant's reliance on Virtual Try-On Images, including any losses arising from inaccurate, misleading, or unexpected AI-generated outputs,
in each case, whether or not the Company has been advised of the possibility of such losses.
13.3  Subject to Clause 13.1, the Company's total aggregate liability to the Merchant in respect of all claims arising under or in connection with these Terms, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, shall not exceed the total fees paid by the Merchant to the Company under these Terms in the twelve (12) month period immediately preceding the date on which the first such claim arose.
13.4  If the Merchant has not paid any fees to the Company during such twelve (12) month period, the Company's total aggregate liability shall not exceed one hundred pounds sterling (£100).
13.5  The Merchant acknowledges that the App is provided as a tool to assist with Customer engagement and product visualisation, and that the Company does not guarantee any particular increase in sales, reduction in returns, or other commercial outcome.

14. Indemnification
14.1  The Merchant shall indemnify, defend and hold harmless the Company, its directors, officers, employees, and agents from and against any and all losses, damages, liabilities, claims, actions, judgments, settlements, penalties, fines, costs and expenses (including reasonable legal fees) arising out of or in connection with:
(a)  the Merchant's breach of these Terms;
(b)  the Merchant's violation of any applicable law or regulation;
(c)  any claim by a third party (including any Customer) arising from the Merchant's use of the App, the Virtual Try-On Feature, or any Virtual Try-On Image;
(d)  the Merchant's failure to obtain required consents or provide required notices to Customers in connection with the Virtual Try-On Feature;
(e)  any claim that the Merchant's product images, product data, or other content uploaded to or used with the App infringes the Intellectual Property Rights of any third party; and
(f)  the Merchant's misrepresentation of Virtual Try-On Images as actual photographs, exact representations, or guarantees of product appearance, fit, colour, or quality.

15. Confidentiality
15.1  Each party shall keep confidential any and all information of a confidential nature (including trade secrets and information of commercial value) disclosed to it by the other party in connection with these Terms ("Confidential Information").
15.2  Neither party shall use the other party's Confidential Information for any purpose other than the performance of its obligations under these Terms, nor shall it disclose such Confidential Information to any third party, except: (a) to its professional advisers, employees, officers, contractors, or agents who need to know such information for the purposes of these Terms and who are bound by obligations of confidentiality no less onerous than those set out in this Clause; or (b) as required by law, regulation, court order, or any governmental or regulatory authority.

16. Disclaimers
16.1  The App is provided on an "as is" and "as available" basis. To the maximum extent permitted by applicable law, the Company disclaims all warranties, whether express, implied, statutory, or otherwise, including any warranties of merchantability, fitness for a particular purpose, satisfactory quality, non-infringement, and any warranties arising out of course of dealing or usage of trade.
16.2  Without limiting the foregoing, the Company does not warrant that:
(a)  the App will be uninterrupted, timely, secure, or error-free;
(b)  the Virtual Try-On Feature or any Generated Images will be accurate, complete, reliable, or suitable for any particular purpose;
(c)  the App will be compatible with all Shopify themes, browsers, devices, or operating systems; or
(d)  any defects in the App will be corrected within any particular timeframe.
16.3  Nothing in this Clause 16 shall affect the Merchant's statutory rights under the Consumer Rights Act 2015 (to the extent applicable) or any other mandatory consumer protection legislation.

17. Governing Law and Dispute Resolution
17.1  These Terms and any dispute or claim (including non-contractual disputes or claims) arising out of or in connection with them or their subject matter or formation shall be governed by and construed in accordance with the laws of England and Wales.
17.2  Each party irrevocably agrees that the courts of England and Wales shall have exclusive jurisdiction to settle any dispute or claim (including non-contractual disputes or claims) arising out of or in connection with these Terms or their subject matter or formation.

18. Changes to these Terms
18.1  The Company reserves the right to amend these Terms at any time. The Company shall provide the Merchant with at least thirty (30) days' advance written notice (via email or in-app notification) of any material changes to these Terms.
18.2  The Merchant's continued use of the App following the effective date of any amendments constitutes the Merchant's acceptance of the amended Terms. If the Merchant does not agree to any amendment, the Merchant may terminate these Terms by uninstalling the App before the amendment takes effect.

19. Force Majeure
19.1  Neither party shall be liable for any failure or delay in performing its obligations under these Terms to the extent that such failure or delay results from circumstances beyond the reasonable control of that party, including but not limited to: acts of God, fire, flood, earthquake, epidemic, pandemic, war, terrorism, riots, governmental action, power failure, internet or telecommunications failure, denial-of-service attacks, or the failure of third-party service providers (including the AI Service, Shopify, or cloud infrastructure providers).
19.2  The affected party shall use reasonable endeavours to mitigate the effects of the force majeure event and shall promptly notify the other party of the nature and expected duration of such event.

20. General Provisions
20.1  Entire Agreement. These Terms, together with the Privacy Policy, the Data Processing Agreement, and any Schedules, constitute the entire agreement between the parties in relation to the subject matter hereof and supersede all previous agreements, understandings, and arrangements between the parties, whether written or oral, relating to such subject matter.
20.2  Severability. If any provision of these Terms is held to be invalid, illegal, or unenforceable by any court or tribunal of competent jurisdiction, such provision shall be severed from these Terms and the remaining provisions shall continue in full force and effect.
20.3  Waiver. No failure or delay by a party to exercise any right or remedy provided under these Terms or by law shall constitute a waiver of that or any other right or remedy, nor shall it prevent or restrict the further exercise of that or any other right or remedy.
20.4  Third Party Rights. A person who is not a party to these Terms shall not have any rights under the Contracts (Rights of Third Parties) Act 1999 to enforce any provision of these Terms, except that Shopify Inc. and its affiliates may enforce the provisions of the preamble to these Terms (Shopify protection clauses) as if they were a party to these Terms.
20.5  Assignment. The Company may assign or transfer these Terms or any of its rights or obligations hereunder without the Merchant's prior consent. The Merchant may not assign or transfer these Terms or any of its rights or obligations hereunder without the Company's prior written consent.
20.6  Notices. Any notice required to be given under these Terms shall be in writing and shall be deemed duly given when sent by email to: (a) the Company, at mail@renderedfits.com; or (b) the Merchant, at the email address associated with the Merchant's Shopify account.
20.7  Independent Contractors. The parties are independent contractors. Nothing in these Terms shall be construed to create a partnership, joint venture, agency, or employment relationship between the parties.

Schedule 1: Subscription Plans and Pricing

The following Subscription Plans are available as at the date of these Terms. The Company reserves the right to amend pricing in accordance with Clause 7.

Subscription Plan | Monthly Fee (excl. VAT) | Virtual Try-On Generations / Month
Starter | £249 | 1,000
Growth | £449 | 2,00
Scale | £749 | 3,500
Professional | £1,249 | 7,000

Annual billing is available at a discounted rate. Annual pricing details are displayed within the App at the time of plan selection.
Upon reaching the monthly generation limit, the Virtual Try-On Feature will be disabled for the remainder of the billing period. The Merchant may upgrade to a higher plan at any time to increase the allocation.
Free trial terms (if applicable): The Company may, at its discretion, offer a seven (7) day free trial with a limited number of Virtual Try-On generations. The free trial terms, including any generation limits, will be communicated to the Merchant at the time of App installation.


Schedule 2: Company Contact Details

Rendered Fits Ltd
Company Registration Number: 16922551
VAT Registration Number: 510026164
Registered Office: 50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ, United Kingdom
Email: mail@renderedfits.com
Website: renderedfits.com
Directors: Sydney George Stones, Sienna Olivia Stones

End of Merchant Terms and Conditions — Version 1.0 — February 2026`;

const dataProcessingAgreement = `RENDERED FITS LTD
Data Processing Agreement

Pursuant to Article 28 of the UK GDPR and EU GDPR




Version 1.0
Effective Date: [DATE OF APP INSTALLATION]
Last Updated: February 2026


Between:
The Merchant (as identified in the Shopify App installation)
("Controller")

and

Rendered Fits Ltd
Company No. 16922551 | VAT No. 510026164
50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ
("Processor")

Each a "Party" and together the "Parties"

DATA PROCESSING AGREEMENT

Background
1.1  The Controller is a Shopify merchant who has installed the Rendered Fits virtual try-on application (the "App") on its Merchant Store.
1.2  The Processor provides the App, which enables the Controller's customers ("End Users") to upload photographs and receive AI-generated virtual try-on images depicting the End User wearing products from the Controller's store.
1.3  In providing the App, the Processor processes Personal Data on behalf of the Controller. This Data Processing Agreement ("DPA") sets out the terms on which the Processor processes Personal Data on behalf of the Controller, in compliance with Article 28 of the UK General Data Protection Regulation ("UK GDPR") and the EU General Data Protection Regulation ("EU GDPR").
1.4  This DPA is incorporated into and forms part of the Merchant Terms and Conditions (the "Principal Agreement") between the Parties. In the event of any conflict between this DPA and the Principal Agreement, this DPA shall prevail in respect of matters relating to data protection.
1.5  Capitalised terms used but not defined in this DPA shall have the meanings given to them in the Principal Agreement. Terms such as "Personal Data", "Special Category Data", "Processing", "Controller", "Processor", "Sub-processor", "Data Subject", and "Personal Data Breach" shall have the meanings given to them in the UK GDPR and EU GDPR (as applicable).

2. Scope, Nature and Purpose of Processing
2.1  The Processor shall process Personal Data on behalf of the Controller only to the extent necessary to provide the App and the Virtual Try-On Feature, and only in accordance with this DPA and the Controller's documented instructions.
2.2  The details of the processing are set out in Annex 1 (Processing Details), which forms part of this DPA. In summary:
(a)  Subject matter: Provision of the Rendered Fits virtual try-on application
(b)  Nature of processing: Collection, temporary storage, transmission to sub-processor, AI image generation, conversion attribution, and automated deletion
(c)  Purpose of processing: Generating virtual try-on images for the Controller's End Users; enforcing rate limits; attributing conversions; and providing analytics to the Controller
(d)  Duration of processing: For the term of the Principal Agreement (i.e., for as long as the App remains installed on the Controller's Merchant Store), plus any period necessary to complete deletion obligations

3. Controller Obligations
3.1  The Controller shall:
(a)  ensure that it has all necessary rights, consents, and legal bases to provide the Personal Data to the Processor for Processing in accordance with this DPA, the Principal Agreement, and applicable Data Protection Laws;
(b)  provide the Processor with documented instructions for Processing, and not instruct the Processor to process Personal Data in a manner that would violate applicable Data Protection Laws;
(c)  ensure that its privacy notices to End Users adequately disclose the Processing carried out by the Processor, including the involvement of the AI Service and the sub-processors identified in Annex 2;
(d)  ensure that the end-user consent mechanism provided by the Processor (or an equivalent mechanism approved by the Processor) is implemented on the Controller's Merchant Store and that consent is obtained from each End User before any photograph is uploaded or processed;
(e)  be responsible for assessing the adequacy, reliability and fitness of the Processing, and for determining the lawfulness of Processing under applicable Data Protection Laws; and
(f)  promptly notify the Processor if it becomes aware of any circumstances that could affect the Processor's ability to comply with this DPA.

4. Processor Obligations
4.1  The Processor shall:
(a)  process Personal Data only on the documented instructions of the Controller (including the instructions set out in this DPA and the Principal Agreement), unless required to do so by applicable law, in which case the Processor shall (to the extent permitted by law) inform the Controller of such legal requirement before carrying out the Processing;
(b)  immediately inform the Controller if, in the Processor's opinion, an instruction from the Controller infringes applicable Data Protection Laws;
(c)  ensure that all persons authorised to process Personal Data under this DPA are subject to binding obligations of confidentiality;
(d)  implement and maintain appropriate technical and organisational measures to protect Personal Data against unauthorised or unlawful Processing and against accidental loss, destruction, or damage, as further described in Annex 3 (Technical and Organisational Measures);
(e)  taking into account the nature of the Processing, assist the Controller by implementing appropriate technical and organisational measures, insofar as this is possible, for the fulfilment of the Controller's obligation to respond to requests from Data Subjects exercising their rights under applicable Data Protection Laws;
(f)  assist the Controller in ensuring compliance with its obligations under Articles 32 to 36 of the UK GDPR and EU GDPR (as applicable), taking into account the nature of the Processing and the information available to the Processor;
(g)  at the Controller's choice, delete or return all Personal Data to the Controller after the end of the provision of the App, and delete existing copies unless applicable law requires storage of the Personal Data;
(h)  make available to the Controller all information necessary to demonstrate compliance with the obligations laid down in Article 28 of the UK GDPR and EU GDPR, and allow for and contribute to audits, including inspections, conducted by the Controller or another auditor mandated by the Controller, subject to the audit provisions in Clause 9; and
(i)  not process Personal Data for any purpose other than providing the App and the Virtual Try-On Feature, and shall not use Personal Data for advertising, marketing, profiling, automated decision-making, or the training of artificial intelligence or machine learning models.

5. Sub-Processors
5.1  The Controller provides general written authorisation for the Processor to engage sub-processors to carry out specific Processing activities on behalf of the Controller, subject to the conditions set out in this Clause 5.
5.2  The Processor's current sub-processors as at the date of this DPA are listed in Annex 2 (Sub-Processor Register). By entering into this DPA, the Controller approves the engagement of the sub-processors listed in Annex 2.
5.3  The Processor shall:
(a)  enter into a written agreement with each sub-processor that imposes data protection obligations no less protective than those set out in this DPA;
(b)  remain fully liable to the Controller for the performance of each sub-processor's obligations; and
(c)  ensure that each sub-processor processes Personal Data only in accordance with the Controller's documented instructions and applicable Data Protection Laws.
5.4  The Processor shall give the Controller prior written notice (by email or in-app notification) of any intended changes to the sub-processors engaged in the Processing of Personal Data, including the addition or replacement of sub-processors, giving the Controller a reasonable opportunity to object to such changes.
5.5  If the Controller objects to a new or replacement sub-processor on reasonable data protection grounds:
(a)  the Processor shall use reasonable efforts to make available an alternative solution that avoids the use of the objected-to sub-processor;
(b)  if no alternative solution is reasonably available, the Controller may terminate the Principal Agreement (and this DPA) by uninstalling the App, in which case the Processor shall facilitate the orderly transition and deletion of Personal Data in accordance with Clause 10.

6. International Data Transfers
6.1  The Processor shall not transfer Personal Data to a country outside the United Kingdom or the European Economic Area ("EEA") unless:
(a)  the transfer is to a country that has been recognised by the relevant authority (the UK Secretary of State, the European Commission, or relevant supervisory authority) as providing an adequate level of data protection;
(b)  appropriate safeguards are in place in accordance with Article 46 of the UK GDPR or EU GDPR, including the UK International Data Transfer Agreement ("UK IDTA"), the UK Addendum to the EU Standard Contractual Clauses, or the European Commission's Standard Contractual Clauses ("SCCs"); or
(c)  a derogation applies under Article 49 of the UK GDPR or EU GDPR.
6.2  As at the date of this DPA, the following international transfers take place in connection with the Processing:
(a)  Customer photographs are transmitted to the AI service for AI image generation. Google LLC participates in the EU-U.S. Data Privacy Framework and is bound by Google's Cloud Data Processing Addendum, which incorporates the European Commission's Standard Contractual Clauses.
(b)  Merchant account data (shop domain, billing data) is processed by Shopify Inc. in Canada and the United States. Shopify's data processing terms incorporate Standard Contractual Clauses.
6.3  The Processor shall ensure that any sub-processor engaged in international transfers of Personal Data has entered into appropriate transfer mechanisms and that the overall level of protection for Personal Data is not undermined.
6.4  Details of the transfer mechanisms in place for each sub-processor are set out in Annex 2 (Sub-Processor Register).

7. Data Subject Rights
7.1  The Processor shall, taking into account the nature of the Processing, assist the Controller by appropriate technical and organisational measures, insofar as this is possible, in responding to requests from Data Subjects to exercise their rights under applicable Data Protection Laws, including rights of access, rectification, erasure, restriction of processing, data portability, and objection.
7.2  If the Processor receives a request directly from a Data Subject, the Processor shall:
(a)  promptly notify the Controller of the request;
(b)  not respond to the request directly unless authorised to do so by the Controller or required to do so by applicable law; and
(c)  cooperate with and assist the Controller in fulfilling the request within the timeframes required by applicable Data Protection Laws.
7.3  The Processor shall implement and maintain the Shopify mandatory GDPR compliance webhooks (customers/data_request, customers/redact, and shop/redact) and shall respond to such webhooks in accordance with Shopify's requirements and applicable Data Protection Laws.

8. Personal Data Breach Notification
8.1  The Processor shall notify the Controller without undue delay (and in any event within forty-eight (48) hours) upon becoming aware of a Personal Data Breach affecting the Controller's Personal Data.
8.2  The notification shall include, to the extent available:
(a)  a description of the nature of the Personal Data Breach, including where possible the categories and approximate number of Data Subjects and Personal Data records concerned;
(b)  the name and contact details of the Processor's point of contact for further information;
(c)  a description of the likely consequences of the Personal Data Breach; and
(d)  a description of the measures taken or proposed to be taken to address the Personal Data Breach, including measures to mitigate its possible adverse effects.
8.3  The Processor shall cooperate with the Controller and take reasonable steps to assist the Controller in:
(a)  investigating and remediating the Personal Data Breach;
(b)  fulfilling the Controller's obligation to notify the relevant supervisory authority (within seventy-two (72) hours under Article 33 of the UK GDPR/EU GDPR) and affected Data Subjects (under Article 34) where required; and
(c)  complying with any other applicable breach notification requirements under applicable Data Protection Laws.
8.4  The Processor's notification obligations under this Clause 8 are limited to Personal Data Breaches arising from or relating to the Processor's own systems, infrastructure, and operations, and the operations of its sub-processors. The Processor shall not be responsible for notifying breaches arising from the Controller's systems, the Shopify Platform (where the breach is not attributable to the Processor), or other third-party services engaged by the Controller.

9. Audit Rights
9.1  The Processor shall make available to the Controller, on request, all information reasonably necessary to demonstrate the Processor's compliance with its obligations under this DPA and Article 28 of the UK GDPR and EU GDPR.
9.2  The Controller (or its appointed third-party auditor, subject to reasonable confidentiality obligations) may conduct audits or inspections of the Processor's data processing activities and facilities, subject to the following conditions:
(a)  the Controller shall provide the Processor with at least thirty (30) days' prior written notice of any intended audit;
(b)  audits shall be conducted during normal business hours, with reasonable regard for minimising disruption to the Processor's operations;
(c)  the Controller shall bear the costs of any audit, unless the audit reveals a material breach of this DPA by the Processor, in which case the Processor shall bear the reasonable costs of that audit;
(d)  the scope of any audit shall be limited to matters relevant to the Processor's compliance with this DPA and applicable Data Protection Laws; and
(e)  the Controller shall not be entitled to conduct more than one (1) audit in any twelve (12) month period, unless required by a supervisory authority or following a Personal Data Breach.
9.3  Where the Processor holds valid and current certifications or audit reports (such as SOC 2 or ISO 27001) relevant to its obligations under this DPA, the Processor may provide such certifications or reports (or relevant extracts thereof) to the Controller in lieu of a physical audit, provided that the Controller may still exercise its audit rights under Clause 9.2 if it reasonably determines that the certifications or reports do not adequately address its concerns.

10. Term, Termination and Data Deletion
10.1  This DPA shall come into effect on the date the Controller installs the App (the Effective Date) and shall remain in force for so long as the Processor processes Personal Data on behalf of the Controller.
10.2  This DPA shall terminate automatically upon termination or expiry of the Principal Agreement, including upon uninstallation of the App by the Controller.
10.3  Upon termination of this DPA, the Processor shall:
(a)  cease all Processing of the Controller's Personal Data, except as necessary to comply with applicable law or to complete deletion obligations;
(b)  at the Controller's written request (to be made within thirty (30) days of termination), return the Controller's Personal Data in a commonly used, machine-readable format, to the extent technically feasible; and
(c)  unless applicable law requires continued storage, securely delete all of the Controller's Personal Data (including all copies, backups, and archived data) within ninety (90) days of termination, and provide written confirmation of deletion upon the Controller's request.
10.4  The Processor shall comply with Shopify's mandatory GDPR shop/redact webhook upon termination, deleting all Merchant Data and Customer Data associated with the Controller's store in accordance with Shopify's requirements.
10.5  Clauses 4 (Processor Obligations, to the extent necessary for deletion), 6 (International Transfers), 8 (Personal Data Breach), 9 (Audit Rights), 11 (Liability), and this Clause 10 shall survive termination of this DPA.

11. Liability
11.1  Each Party's liability arising out of or in connection with this DPA shall be subject to the limitations and exclusions of liability set out in the Principal Agreement.
11.2  Nothing in this DPA shall limit or exclude either Party's liability for:
(a)  death or personal injury caused by its negligence;
(b)  fraud or fraudulent misrepresentation; or
(c)  any other liability which cannot be limited or excluded by applicable law.

12. General Provisions
12.1  This DPA, together with its Annexes, constitutes the entire agreement between the Parties in relation to the processing of Personal Data in connection with the App, and supersedes all prior agreements, representations, and understandings on such matters.
12.2  This DPA shall be governed by and construed in accordance with the laws of England and Wales, and the Parties submit to the exclusive jurisdiction of the courts of England and Wales, without prejudice to any Data Subject's rights under applicable Data Protection Laws to bring claims in another jurisdiction.
12.3  If any provision of this DPA is held to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
12.4  The Processor may amend this DPA from time to time to reflect changes in applicable Data Protection Laws, guidance from supervisory authorities, or changes to the Processing. The Processor shall provide the Controller with at least thirty (30) days' written notice of any material changes.


Annex 1: Processing Details

This Annex 1 forms part of the DPA and sets out the details of the Processing in accordance with Article 28(3) of the UK GDPR and EU GDPR.

Element | Detail
Subject matter of Processing | Provision of the Rendered Fits virtual try-on application, enabling End Users to upload photographs and receive AI-generated virtual try-on images
Nature of Processing | Collection, temporary caching, transmission to AI sub-processor, AI-assisted image generation and compositing, session-scoped rate limiting, conversion attribution, aggregated analytics computation, and automated deletion
Purpose of Processing | Generating virtual try-on images for End Users at the Controller's direction; enforcing per-session rate limits to prevent abuse; attributing completed purchases to virtual try-on sessions to enable the Controller to measure ROI; providing usage analytics to the Controller; and complying with Shopify's GDPR webhooks
Duration of Processing | For the term of the Principal Agreement (from installation to uninstallation of the App), plus any period necessary to complete deletion obligations under this DPA. End User photographs are processed transiently within the active session only.
Categories of Data Subjects | End Users (customers of the Controller who interact with the Virtual Try-On Feature on the Controller's Merchant Store)
Types of Personal Data | End User photographs (facial images); IP addresses; session identifiers; order identifiers (order ID, cart token); product handles in cart attributes
Special Category Data | To the extent that End User photographs constitute biometric data or data revealing racial or ethnic origin, such data is processed transiently and solely for the purpose of generating the virtual try-on image. Processing of Special Category Data is based on the explicit consent of the Data Subject (Article 9(2)(a) UK GDPR/EU GDPR), obtained via the in-widget consent mechanism.


Annex 2: Sub-Processor Register

This Annex 2 forms part of the DPA and lists the sub-processors approved by the Controller as at the date of this DPA.

Sub-Processor | Processing Activity | Data Processed | Location | Transfer Mechanism
AI Service | AI image generation: receives End User photographs and product images, generates composite virtual try-on images | End User photographs, product images (transient processing) | europe-west2 | EU-U.S. Data Privacy Framework; Google Cloud Data Processing Addendum with SCCs
Google Cloud Platform (GCP) | Cloud infrastructure: temporary file storage (photo cache), application hosting, Redis rate-limiting database | End User photographs (cached), IP addresses, session data | europe-west2 | EU-U.S. Data Privacy Framework; Google Cloud Data Processing Addendum with SCCs
Shopify Inc. | Platform hosting: authentication via OAuth 2.0, subscription billing via Billing API, webhook delivery (orders, GDPR compliance) | Merchant store domain, billing data, order identifiers | Canada / United States | Shopify Data Processing Addendum with SCCs; Canada adequacy decision (EU)


Annex 3: Technical and Organisational Measures

This Annex 3 forms part of the DPA and describes the technical and organisational security measures implemented by the Processor in accordance with Article 32 of the UK GDPR and EU GDPR.

A. Encryption and Data Protection in Transit
•  All data transmitted between the End User's browser and the App's backend, and between the App's backend and sub-processors, is encrypted using TLS (Transport Layer Security) / HTTPS
•  API communications with the AI service API and Shopify APIs are conducted over encrypted HTTPS connections
•  No Personal Data is transmitted in plaintext

B. Transient Data Processing and Minimisation
•  End User photographs are processed transiently. Photographs are cached temporarily in GCP Cloud Storage during the active session and are automatically deleted by a scheduled cleanup function that runs every 24 hours and removes all files for expired sessions
•  Generated virtual try-on images follow the same transient lifecycle
•  No facial geometry templates, biometric identifiers, or biometric data are extracted, created, or stored at any point during Processing
•  The App collects only the minimum data necessary for its operation (data minimisation principle)

C. Access Control
•  Merchant authentication is handled entirely through Shopify's OAuth 2.0 Token Exchange — no separate credentials are stored by the Processor
•  Access to the App's production systems, databases, and cloud infrastructure is restricted to authorised personnel of the Processor on a need-to-know basis
•  The development agency (DigitalSuits) does not have access to production data or production systems
•  Administrative access to cloud infrastructure requires multi-factor authentication

D. Rate Limiting and Abuse Prevention
•  IP-based rate limiting is implemented to prevent abuse of the Virtual Try-On Feature (e.g., maximum generations per IP per hour)
•  Rate-limit records are stored in the application's session-scoped rate-limiting system and expire automatically

E. Automated Deletion
•  A scheduled cleanup function runs every 24 hours to identify and permanently delete expired session data, including cached photographs and generated images
•  Upon App uninstallation, all Merchant Data and associated Customer Data is deleted in response to Shopify's mandatory GDPR shop/redact webhook

F. Sub-Processor Security
•  Google: Subject to Google's Cloud Data Processing Addendum, ISO 27001/27017/27018 certified, SOC 2 Type II audited
•  Shopify: SOC 2 Type II audited, PCI DSS Level 1 certified
•  All sub-processors are bound by contractual data protection obligations no less protective than those in this DPA

G. Incident Response
•  The Processor maintains a Data Breach Response Plan setting out procedures for identifying, containing, assessing, and reporting Personal Data Breaches
•  The Processor shall notify the Controller of any Personal Data Breach within forty-eight (48) hours, in accordance with Clause 8 of this DPA

H. Organisational Measures
•  All personnel of the Processor with access to Personal Data are subject to binding obligations of confidentiality
•  The Processor conducts periodic reviews of its security measures to ensure they remain appropriate to the nature, scope, and risks of the Processing
•  The Processor maintains a Record of Processing Activities (ROPA) in accordance with Article 30 of the UK GDPR and EU GDPR


Annex 4: Controller's Documented Instructions

This Annex 4 forms part of the DPA and sets out the Controller's documented instructions to the Processor regarding the Processing of Personal Data.

By installing the App and entering into the Principal Agreement and this DPA, the Controller instructs the Processor to process Personal Data as follows:

Instruction | Detail
Process End User photographs | Receive photographs uploaded by End Users through the storefront widget; transmit photographs to the AI service API for virtual try-on image generation; cache photographs temporarily in cloud storage during the active session; permanently delete photographs upon session expiry via the automated cleanup function
Generate virtual try-on images | Use the AI service to generate composite images depicting the End User wearing products from the Controller's store; deliver generated images to the End User's browser; cache generated images temporarily; permanently delete upon session expiry
Enforce rate limits | Record IP addresses in the session-scoped rate-limiting system to enforce per-session generation limits; allow records to expire automatically upon session end
Attribute conversions | Store session identifiers in the End User's browser localStorage; receive order webhooks from Shopify; match completed orders to virtual try-on sessions using cart attributes and product handles; present attributed conversion data to the Controller via the analytics dashboard
Manage subscriptions and billing | Receive billing plan data and subscription status via Shopify's Billing API and APP_SUBSCRIPTIONS_UPDATE webhook; enforce plan-level generation limits; present usage data to the Controller via the App dashboard
Respond to GDPR webhooks | Handle Shopify's mandatory GDPR compliance webhooks (customers/data_request, customers/redact, shop/redact); delete all associated data upon receipt of redact webhooks
Provide analytics | Aggregate virtual try-on usage data, conversion rates, and attributed revenue; present aggregated analytics to the Controller via the App dashboard; delete analytics data upon App uninstallation

The Controller may issue additional documented instructions from time to time by written notice to the Processor at mail@renderedfits.com. Any additional instructions that require material changes to the Processing or to the Processor's systems shall be subject to mutual agreement and may be subject to additional fees.


End of Data Processing Agreement — Version 1.0 — February 2026`;

const biometricPolicy = `RENDERED FITS LTD
Biometric Data Retention and Destruction Policy

Required under Illinois BIPA Section 15(a) — Publicly Available




Version 1.0
Last Updated: February 2026
Publication URL: renderedfits.com/legal/biometric-policy



Rendered Fits Ltd
Company No. 16922551
50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ, United Kingdom
mail@renderedfits.com | renderedfits.com

BIOMETRIC DATA RETENTION AND DESTRUCTION POLICY

Effective Date: February 2026
Last Updated: February 2026
Published at: renderedfits.com/legal/biometric-policy

KEY STATEMENT
Rendered Fits Ltd does not permanently store biometric data. Customer photographs are processed transiently and are permanently destroyed within 24 hours of session expiry. No biometric identifiers or biometric templates are extracted, created, or retained at any point.

1. Purpose and Scope
1.1  This Biometric Data Retention and Destruction Policy ("Policy") is published by Rendered Fits Ltd ("we", "us", "our", or the "Company") in compliance with the Illinois Biometric Information Privacy Act (740 ILCS 14), Section 15(a), which requires a private entity in possession of biometric identifiers or biometric information to develop and make available to the public a written policy establishing a retention schedule and guidelines for permanently destroying biometric identifiers and biometric information.
1.2  This Policy also addresses the requirements of the Texas Capture or Use of Biometric Identifier Act (Tex. Bus. & Com. Code § 503.001), the Washington Biometric Privacy Protection Act (RCW 19.375), and other applicable US state biometric privacy laws.
1.3  This Policy applies to all biometric data that may be processed in connection with the Rendered Fits virtual try-on application (the "App"), which is available to Shopify merchants via the Shopify App Store.

2. Definitions
2.1  For the purposes of this Policy:
(a)  "Biometric identifier" means a retina or iris scan, fingerprint, voiceprint, or scan of hand or face geometry, as defined under BIPA Section 10.
(b)  "Biometric information" means any information, regardless of how it is captured, converted, stored, or shared, based on an individual's biometric identifier used to identify an individual, as defined under BIPA Section 10.
(c)  "Customer photograph" means a photograph uploaded by an end user (a customer of a Shopify merchant) to the App's Virtual Try-On Feature.
(d)  "Virtual Try-On Feature" means the functionality of the App that enables end users to upload a photograph of themselves and receive an AI-generated image depicting the end user wearing a product from the merchant's store.
(e)  "Session" means the period during which an end user actively interacts with the Virtual Try-On Feature, as tracked by a session identifier stored in the end user's browser.
(f)  "AI Service" means the third-party artificial intelligence service used by the App to generate virtual try-on images.

3. What Biometric Data We Process
3.1  The App processes customer photographs through the Virtual Try-On Feature. In the course of generating a virtual try-on image, the AI Service may analyse the facial features contained in the customer's photograph. To the extent that such processing constitutes the collection of biometric identifiers or biometric information under applicable law, the following applies:

Data Type | Description | Biometric Classification
Customer photograph (facial image) | A photograph uploaded by the end user, containing the end user's face and body | May constitute a biometric identifier to the extent that facial geometry is analysed by the AI Service during image generation
AI processing of facial features | The AI Service analyses the photograph to map the end user's appearance onto product imagery | May constitute biometric information derived from the biometric identifier (facial geometry)
Generated virtual try-on image | The AI-generated composite image showing the end user wearing a product | Contains a representation of the end user's likeness but is an AI-generated image, not a biometric template

What We Do NOT Process or Store
We wish to be unequivocally clear about the following:
•  We do NOT extract, create, compute, or store any facial geometry template, faceprint, or biometric template from customer photographs at any point during processing.
•  We do NOT create or maintain any database of biometric identifiers or biometric information.
•  We do NOT use facial recognition technology to identify or verify the identity of any individual.
•  We do NOT compare customer photographs against any database of images or biometric records.
•  We do NOT use customer photographs or derived data for profiling, automated decision-making, or any purpose other than generating the requested virtual try-on image.

4. Retention Schedule
4.1  The following retention schedule applies to all biometric data and related data processed in connection with the Virtual Try-On Feature:

Data Type | Retention Period | Maximum Retention | Trigger for Destruction
Customer photograph (original upload) | Transient. Cached temporarily in cloud storage during the active session only. | No more than the duration of the active session plus twenty four (24) hours (the interval of the automated cleanup cycle) | Session expiry triggers automated cleanup
AI-processed data | Transient. Processed in real-time within the API call. Google's paid API does not retain prompts or responses for model training. | Duration of the API call (seconds) | Completion of the API response
Generated virtual try-on image | Transient. Cached temporarily in cloud storage during the active session only. | No more than the duration of the active session plus twenty four (24) hours | Session expiry triggers automated cleanup
Session identifier | Stored in the end user's browser localStorage | Until cleared by the end user or browser data expiry | End user action (clearing browser data)
Consent records (timestamp, session ID) | Retained for the duration of the Merchant's active subscription for compliance audit purposes | Duration of Merchant's subscription plus ninety (90) days for deletion processing | Merchant uninstalls the App (triggers Shopify shop/redact webhook)

4.2  Under no circumstances shall biometric identifiers or biometric information (being customer photographs and any data derived from the AI Service's analysis of facial features) be retained for longer than three (3) years from the date of the individual's last interaction with the Virtual Try-On Feature, which is the maximum retention period permitted under BIPA Section 15(a). In practice, our actual retention period is vastly shorter — typically less than twenty four (24) hours.
4.3  In the event that the initial purpose for collecting or obtaining biometric data has been satisfied (i.e., the virtual try-on image has been generated and delivered to the end user's browser), the biometric data shall be destroyed in accordance with the destruction guidelines set out in Section 5 below, regardless of whether the maximum retention period has elapsed.

5. Guidelines for Permanent Destruction

5.1 Automated Session Cleanup
A scheduled cleanup function runs on the App's cloud infrastructure at a frequency of every twenty four (24) hours. This function:
(a)  identifies all session data associated with expired sessions;
(b)  permanently deletes all cached customer photographs associated with expired sessions from cloud storage;
(c)  permanently deletes all cached generated virtual try-on images associated with expired sessions from cloud storage; and
(d)  logs the deletion event (without logging the content of the deleted data) for internal audit purposes.

5.2 AI Service Processing
Customer photographs transmitted to the AI Service are processed in real-time. Under Google's Cloud Data Processing Addendum for paid API usage:
(a)  Google does not use prompts (including customer photographs) or responses (including generated images) to train, improve, or develop its AI models;
(b)  processing is transient and occurs within the duration of the API call; and
(c)  Google's data processing terms prohibit the retention of prompt data beyond the time necessary to deliver the API response, subject to limited exceptions for abuse monitoring and legal compliance.

5.3 App Uninstallation
When a Merchant uninstalls the App from their Shopify store:
(a)  Shopify triggers a mandatory GDPR shop/redact webhook;
(b)  the App receives and processes this webhook, deleting all data associated with the Merchant, including any residual session data, consent records, and analytics data; and
(c)  deletion is completed within ninety (90) days of receiving the webhook.

5.4 Manual Deletion Requests
Any individual may request the deletion of their data by contacting the Company at mail@renderedfits.com. Given the transient nature of our processing, in most cases the data will already have been automatically destroyed before the request is received. Where data has not yet been destroyed, the Company shall process the request without undue delay and confirm deletion in writing.

5.5 Destruction Standard
All destruction of biometric data is carried out using methods that render the data permanently irrecoverable. Specifically:
(a)  cloud storage objects are permanently deleted using the cloud provider's standard deletion API, which marks the storage blocks for overwriting and prevents recovery;
(b)  session-scoped data stored in the rate-limiting system expires automatically and is overwritten in the normal course of system operation; and
(c)  no backup, archive, or shadow copy of customer photographs or generated images is created or retained.

6. Consent and Notice
6.1  Before any customer photograph is collected or processed through the Virtual Try-On Feature, the end user is provided with:
(a)  written notice (displayed within the Virtual Try-On widget) that facial features contained in their photograph may be analysed in the course of generating the virtual try-on image;
(b)  written notice of the specific purpose of such analysis (solely to generate a virtual try-on image);
(c)  written notice of the retention period (transient, with automatic destruction upon session expiry);
(d)  written notice that biometric data will not be sold, leased, traded, or otherwise disclosed to third parties (except to Google's AI service for the sole purpose of generating the try-on image);
(e)  a link to this Policy; and
(f)  a requirement to provide explicit written consent before the photograph upload function is enabled.
6.2  Consent is obtained separately from general terms acceptance through a disclaimer that reads: "By uploading your photo, you agree to our Terms & Conditions and Privacy Policy. Your image is processed securely and is never permanently stored."
6.3  The Company does not collect, capture, or otherwise obtain biometric identifiers or biometric information without first providing written notice and obtaining written consent as described above.

7. Prohibition on Sale, Lease, Trade, and Disclosure
7.1  The Company shall not sell, lease, trade, or otherwise profit from any individual's biometric identifiers or biometric information.
7.2  The Company shall not disclose, redisclose, or otherwise disseminate any individual's biometric identifier or biometric information to any third party, except:
(a)  to Google LLC solely for the purpose of generating the requested virtual try-on image, with the individual's written consent; or
(b)  as required by law, court order, or valid legal process, provided that the Company shall use reasonable efforts to notify the affected individual before making such disclosure (unless prohibited from doing so by law).

8. Security Measures
8.1  The Company protects biometric data using a standard of care that is the same as or more protective than the standard applied to other confidential and sensitive information, including:
(a)  encryption of all data in transit using TLS/HTTPS;
(b)  transient processing with automated deletion (the primary security measure — data that does not exist cannot be breached);
(c)  access controls restricting access to cloud infrastructure to authorised personnel only;
(d)  multi-factor authentication for administrative access;
(e)  use of reputable, audited cloud infrastructure providers (Google Cloud Platform) with ISO 27001, ISO 27017, ISO 27018, and SOC 2 Type II certifications; and
(f)  contractual data protection obligations imposed on all sub-processors.

9. Data Flow Summary
The following describes the complete lifecycle of a customer photograph through the Virtual Try-On Feature:

Step | Action | Data Location | Duration
1 | End user views the Virtual Try-On widget and is presented with the consent notice | End user's browser only | Until user action
2 | End user selects and uploads a photograph from their device | Transmitted from browser to App backend via HTTPS | Seconds
3 | Photograph is temporarily cached in cloud storage (GCP) and a session reference is created | GCP Cloud Storage (temporary cache) | Duration of session + max 24 hours
4 | Photograph is transmitted to AI service along with the selected product image | AI service servers (transient processing) | Seconds (duration of API call)
5 | AI service generates the virtual try-on composite image and returns it | AI service servers → App backend | Seconds
6 | Generated image is delivered to the end user's browser for display | End user's browser + temporary cloud cache | Duration of session + max 24 hours
7 | Session expires | N/A | N/A
8 | Automated cleanup function runs (daily) and permanently deletes all cached photographs and generated images for expired sessions | Deletion from GCP Cloud Storage | Automated, within 24 hours of session expiry
9 | No biometric data remains in any Company system | None | Permanent

10. Applicable Biometric Privacy Laws
This Policy is designed to comply with the following US state biometric privacy laws (among others):

Law | Jurisdiction | Key Requirements Addressed
Illinois Biometric Information Privacy Act (BIPA), 740 ILCS 14 | Illinois | Section 15(a): Written retention/destruction policy (this Policy). Section 15(b): Written notice and written consent before collection. Section 15(c): Prohibition on sale/trade/profit. Section 15(d): Prohibition on disclosure without consent. Section 15(e): Reasonable security.
Texas Capture or Use of Biometric Identifier Act (CUBI), Tex. Bus. & Com. Code § 503.001 | Texas | Notice and consent before capture. Prohibition on sale/disclosure. Destruction within reasonable time (our transient processing satisfies this). Storage with reasonable care.
Washington Biometric Privacy Protection Act (BPPA), RCW 19.375 | Washington | Notice of collection. Consent before collection. Restrictions on commercial purpose. Security measures.
California Consumer Privacy Act / California Privacy Rights Act (CCPA/CPRA) | California | Biometric information classified as sensitive personal information. Right to know, delete, and limit use. No sale of sensitive personal information.
Colorado AI Act (effective Feb 2026) | Colorado | Disclosure requirements for high-risk AI systems using biometric data. Risk management obligations.

This list is not exhaustive. The Company monitors developments in US state biometric privacy legislation and will update this Policy as necessary to maintain compliance with new and amended laws.

11. Policy Review and Updates
11.1  This Policy shall be reviewed at least annually by the Company's management to ensure it remains accurate, complete, and compliant with applicable laws.
11.2  This Policy may be updated from time to time. Material updates will be reflected in the "Last Updated" date at the top of this Policy. The Company shall notify Merchants of material changes through in-app notifications or email.
11.3  This Policy is published at renderedfits.com/legal/biometric-policy and is freely accessible to the public at all times, as required by BIPA Section 15(a).

12. Contact Information
If you have any questions about this Policy, or wish to exercise your rights in relation to biometric data, please contact:

Rendered Fits Ltd
Email: mail@renderedfits.com
Post: 50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ, United Kingdom

You may also contact the Merchant whose store you used the Virtual Try-On Feature on, as the Merchant is the data controller for your data.


End of Biometric Data Retention and Destruction Policy — Version 1.0 — February 2026`;

const merchantPrivacyPolicy = `RENDERED FITS LTD

Merchant Terms and Conditions & App Privacy Policy

For the Rendered Fits Virtual Try-On Application

This document contains:

Part 1: Merchant Terms and Conditions (Clauses 1-20 + Schedules)

Part 2: App Privacy Policy (Sections 1-17)

Version 1.0

Effective Date: Date of First Installation

Last Updated: February 2026

Rendered Fits Ltd
Company No. 16922551 | VAT No. 510026164
50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ
mail@renderedfits.com | renderedfits.com


PART 1: MERCHANT TERMS AND CONDITIONS

IMPORTANT

Please read these Terms carefully before installing or using the Rendered Fits App. By installing, accessing, or using the App, you agree to be bound by these Terms and the App Privacy Policy set out in Part 2 of this document.

These Terms constitute a legally binding agreement between you (the Merchant) and Rendered Fits Ltd (the Company) governing your installation and use of the App on the Shopify Platform.

The App is developed and operated by the Company. Shopify Inc. is not a party to these Terms and has no responsibility or liability in connection with the App. In accordance with Shopify's API Terms of Service, the Merchant acknowledges and agrees that:

- the Company is solely responsible for the App and its functionality;
- Shopify is not liable for any fault in the App or any harm that may result from its installation or use;
- except where expressly stated by Shopify, Shopify cannot provide assistance with the installation or use of the App; and
- the Company is solely responsible for any liability which may arise from the Merchant's access to or use of the App, including: (A) the development, use or maintenance of the App; (B) any product, content or service made available through the App; and (C) the processing of any data collected or received by the App.

1. Definitions and Interpretation

"App" means the Rendered Fits virtual try-on application, including all software, code, interfaces, widgets, and associated documentation made available by the Company through the Shopify App Store.

"AI Service" means the third-party artificial intelligence image generation service used by the App to generate Virtual Try-On Images.

"Company" means Rendered Fits Ltd, a company incorporated in England and Wales (company number 16922551), whose registered office is at 50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ.

"Customer" means any individual who visits or transacts via the Merchant Store, including any end user who interacts with the Virtual Try-On Feature.

"Customer Data" means information (including Personal Information) relating to a Customer, including order information, payment information, account information, and any data submitted by or relating to a Customer in connection with the Virtual Try-On Feature.

"Data Protection Laws" means all applicable data protection and privacy legislation, including (as applicable) the UK General Data Protection Regulation (UK GDPR), the EU General Data Protection Regulation (EU GDPR), the Data Protection Act 2018, the Privacy and Electronic Communications Regulations 2003 (PECR), the California Consumer Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA), the Illinois Biometric Information Privacy Act (BIPA), and any other applicable data protection or privacy laws.

"Effective Date" means the date on which the Merchant first installs the App on the Merchant Store.

"Generated Image" means any image produced by the App using the AI Service, including Virtual Try-On Images.

"Intellectual Property Rights" means all patents, rights to inventions, utility models, copyright and related rights, trade marks, service marks, trade names, domain names, rights in get-up and trade dress, rights in goodwill, rights in designs, database rights, rights in computer software, rights in confidential information (including know-how and trade secrets) and any other intellectual property rights, in each case whether registered or unregistered and including all applications and rights to apply for and be granted, renewals or extensions of, and rights to claim priority from, such rights and all similar or equivalent rights or forms of protection in any part of the world.

"Merchant" means the individual or business entity that installs the App on its Merchant Store and agrees to these Terms.

"Merchant Data" means information (including Personal Information) relating to the Merchant or Merchant Store, including business, financial, and product-related data.

"Merchant Store" means the Merchant's commerce presence hosted by Shopify, including its online store and Point of Sale (POS).

"Personal Information" means any information relating to an identified or identifiable natural person, as defined under applicable Data Protection Laws.

"Privacy Policy" means the App Privacy Policy as set out in Part 2 of this document, as updated from time to time.

"Shopify" means Shopify Inc. and its affiliates.

"Shopify Platform" means the Shopify hosted commerce platform available via www.shopify.com and any associated websites, products, or services offered by Shopify.

"Subscription Plan" means the pricing tier selected by the Merchant, as set out in Schedule 1 (Pricing) or as displayed within the App, which determines the monthly allocation of Virtual Try-On image generations and the applicable subscription fee.

"Terms" means these Merchant Terms and Conditions, including the Privacy Policy set out in Part 2, any Schedules, and any Data Processing Agreement, as amended from time to time in accordance with Clause 18.

"Virtual Try-On Feature" means the functionality of the App that enables Customers to upload a photograph of themselves and receive an AI-generated image depicting the Customer wearing a product from the Merchant Store.

"Virtual Try-On Image" means an AI-generated image produced by the Virtual Try-On Feature depicting a Customer wearing a product from the Merchant Store.


2. Licence Grant and Restrictions

2.1  Subject to the Merchant's compliance with these Terms, the Company grants the Merchant a worldwide, non-exclusive, non-transferable, non-sublicensable, revocable licence to install and use the App on the Merchant Store for the duration of the Merchant's active Subscription Plan.

2.2  The Merchant shall not, and shall not permit any third party to:
•  resell, sublicense, assign, distribute, lease, rent, lend or otherwise commercially exploit the App or any part of it to any third party;
•  copy, modify, adapt, translate, reverse engineer, decompile, disassemble or create derivative works based on the App or any part of it, except to the extent permitted by applicable law;
•  use the App on any store, platform or website other than the Merchant's own Merchant Store(s) hosted on the Shopify Platform;
•  remove, alter or obscure any proprietary notices, labels or marks on the App;
•  use the App for any unlawful purpose or in any manner that could damage, disable, overburden or impair the App or the Shopify Platform;
•  use the App to develop a competing product or service; or
•  use any automated means (including bots, scrapers or similar technology) to access or use the App except as expressly permitted by the App's intended functionality.

2.3  The licence granted under Clause 2.1 is personal to the Merchant and may not be transferred or assigned without the Company's prior written consent.


3. App Description and AI Service

3.1  The App provides an AI-powered virtual try-on feature that enables Customers visiting the Merchant Store to upload a photograph of themselves and receive an AI-generated image depicting the Customer wearing a product from the Merchant's store.

3.2  The Virtual Try-On Feature is powered by the AI Service. The Merchant acknowledges and agrees that:
•  Virtual Try-On Images are AI-generated interpretations and are not exact replicas or photographs. The Company does not guarantee 100% visual accuracy, colour fidelity, size accuracy, or likeness;
•  Virtual Try-On Images are illustrative only and should not be relied upon by the Merchant or its Customers as definitive representations of how a product will look or fit;
•  the quality, accuracy and availability of the AI Service may vary and is dependent on third-party technology providers. The Company shall use reasonable endeavours to select and maintain high-quality AI service providers;
•  AI-generated outputs may occasionally produce unexpected, inaccurate or undesirable results, and the Company shall not be liable for any such outputs.

3.3  The Merchant shall not represent or imply to its Customers that Virtual Try-On Images are actual photographs, exact representations, or guarantees of how a product will look or fit.


4. AI Service Availability and Graceful Degradation

4.1  The App incorporates a graceful degradation pattern. In the event that the AI Service is unavailable, experiences downtime, or is otherwise non-operational:
•  the Virtual Try-On button will be automatically disabled or hidden on the Merchant's storefront;
•  this behaviour is intentional and is designed to prevent broken functionality or a poor Customer experience;
•  the rest of the Merchant's store functionality, checkout process, and core Shopify operations shall not be affected; and
•  the Merchant acknowledges that such temporary disabling of the Virtual Try-On Feature does not constitute a defect in, or breach of contract relating to, the App.

4.2  The Company shall use reasonable endeavours to restore the Virtual Try-On Feature as soon as reasonably practicable following any period of AI Service unavailability.


5. Third-Party Service Providers

5.1  The Merchant acknowledges that the App relies on third-party service providers, including but not limited to:
•  AI service for AI image generation;
•  Shopify for platform hosting, billing, authentication, and API access; and
•  cloud infrastructure providers for hosting and data processing.

5.2  Where any downtime, delay, degradation, failure, error, inaccuracy, or interruption of the App or the Virtual Try-On Feature arises from the acts or omissions of a third-party service provider, the Company shall not be liable for such downtime, delay, degradation, failure, error, inaccuracy, or interruption, provided that the Company has exercised reasonable care in the selection and management of such provider.

5.3  The Company reserves the right to change, replace, or update the third-party service providers used in connection with the App at any time without prior notice to the Merchant, provided that such change does not materially reduce the functionality of the App.


6. Subscription Plans, Billing and Payment

6.1  The App is offered on a subscription basis. The Merchant shall select a Subscription Plan upon installation of the App. The current Subscription Plans and pricing are set out in Schedule 1.

6.2  Each Subscription Plan includes a fixed monthly allocation of Virtual Try-On image generations. When the Merchant reaches the allocation limit for their current billing period, the Virtual Try-On Feature will be disabled until the next billing cycle or until the Merchant upgrades to a higher-tier plan.

6.3  All billing is processed through the Shopify Billing API. The Merchant authorises the Company to charge the applicable subscription fees to the Merchant's Shopify account.

6.4  The Merchant may upgrade or downgrade their Subscription Plan at any time through the App settings within the Shopify Admin, without the need to contact the Company directly.

6.5  All fees are exclusive of VAT (or equivalent sales tax). VAT will be charged where applicable, based on the Merchant's location and tax status, in accordance with applicable tax legislation.

6.6  In the event of late or failed payment:
•  the Company may rely on Shopify's automatic retry mechanism for failed charges;
•  if payment remains outstanding after Shopify's retry attempts, the Company reserves the right to suspend or restrict the Merchant's access to the App until the outstanding amount is paid; and
•  the Company shall provide reasonable notice to the Merchant before any suspension for non-payment takes effect, except where suspension is required to prevent further losses.

6.7  The Company may offer a free trial period at its discretion. The terms and duration of any free trial will be communicated to the Merchant at the time of installation.


7. Pricing Changes

7.1  The Company reserves the right to change the fees for any Subscription Plan at any time. Pricing changes may be necessitated by, among other things, increases in third-party AI service costs, infrastructure costs, or changes in the scope or features of the App.

7.2  The Company shall provide the Merchant with at least thirty (30) days' advance written notice (via email or in-app notification) before any price increase takes effect.

7.3  If the Merchant does not agree to a price increase, the Merchant may cancel their Subscription Plan and uninstall the App before the new pricing takes effect. Continued use of the App after the effective date of the price increase shall constitute acceptance of the new pricing.


8. Merchant Data Ownership and Security

8.1  As between the Company and the Merchant, the Merchant retains all rights, title, and interest in and to the Merchant Data, including all product data, product images, Customer Data, and any other content or data provided by the Merchant to the App.

8.2  The Company does not take ownership of, reuse, or commercially exploit the Merchant's own data, including product data, product images, or Customer information, for any purpose other than providing the App's services to the Merchant.

8.3  The Company shall not use Merchant Data (including any anonymous, aggregate, or derived data) for the development or training of artificial intelligence or machine learning models.

8.4  The Company processes Merchant Data (including Customer Data) in accordance with the Privacy Policy set out in Part 2 of this document and applicable Data Protection Laws. Where the Company processes Customer Data on behalf of the Merchant, the Company acts as a data processor and the Merchant acts as a data controller. The terms of such processing are set out in the Data Processing Agreement, available at renderedfits.com/legal/dpa.

8.5  The Merchant is responsible for ensuring that it has obtained all necessary consents, authorisations, and legal bases for the collection and processing of Customer Data through its Merchant Store, in accordance with applicable Data Protection Laws.


9. Security Breaches

9.1  In the event of a security breach:
•  the Company shall only accept responsibility for breaches arising directly from its own systems, infrastructure, and operations;
•  the Company shall not be responsible or liable for security breaches arising from or relating to: the Merchant's own systems; the Shopify Platform; third-party services not operated by the Company; or the actions or omissions of the Merchant, its employees, or its agents; and
•  the Company shall notify the Merchant without undue delay upon becoming aware of a security breach affecting the Merchant's data, and shall cooperate reasonably with the Merchant in investigating and remediating any such breach.


10. Merchant Obligations

10.1  The Merchant represents, warrants and undertakes that:
•  it has full power and authority to enter into these Terms and to perform its obligations hereunder;
•  it shall comply with all applicable laws, regulations and codes of practice in connection with its use of the App, including all applicable Data Protection Laws;
•  it shall not use Virtual Try-On Images in a manner that is misleading, deceptive or likely to create a false impression as to the nature, quality, appearance, fit, colour or size of any product;
•  it shall ensure that its Customer-facing privacy notices adequately disclose the use of the Virtual Try-On Feature, the processing of Customer photographs by AI technology, and the involvement of third-party service providers;
•  it shall ensure that the Virtual Try-On Feature on its Merchant Store includes the end-user consent mechanism provided by the Company (or an equivalent mechanism that obtains informed, specific and unambiguous consent from Customers before any photograph is uploaded), and shall not disable, bypass, or modify the consent mechanism without the Company's prior written approval;
•  it shall not upload, or permit the upload of, any illegal, harmful, offensive, defamatory, or infringing content to the App;
•  it shall not use the App in connection with any products or services that are illegal, fraudulent, or in violation of the Shopify Acceptable Use Policy; and
•  it shall promptly notify the Company of any suspected security breach, unauthorised access, or misuse of the App.


11. Intellectual Property

11.1  All Intellectual Property Rights in and to the App, including its source code, object code, design, user interface, documentation, algorithms, and all updates, modifications, and enhancements thereto, are and shall remain the exclusive property of the Company. Nothing in these Terms grants the Merchant any ownership rights in the App.

11.2  The Merchant retains all Intellectual Property Rights in its own product data, product images, branding, and Customer Data.

11.3  With respect to Virtual Try-On Images:
•  the Merchant shall not use Virtual Try-On Images for any purpose unrelated to the Merchant Store or the products depicted therein; and
•  the Merchant acknowledges that Virtual Try-On Images are AI-generated and that the copyright status of AI-generated images may be uncertain under applicable law. The Company makes no representations or warranties as to the copyright ownership of Virtual Try-On Images.


12. Suspension and Termination

12.1  The Company may suspend or restrict the Merchant's access to the App immediately upon written notice if the Merchant:
•  fails to pay any subscription fees when due, and such failure continues for more than fourteen (14) days after notification;
•  breaches any material provision of these Terms;
•  uses the App in a manner that is unlawful, fraudulent, or in violation of the Shopify Acceptable Use Policy;
•  engages in conduct that, in the Company's reasonable opinion, may bring the Company, the App, or the Shopify Platform into disrepute; or
•  becomes the subject of insolvency, bankruptcy, liquidation, administration, or similar proceedings.

12.2  The Merchant may terminate these Terms at any time by uninstalling the App from the Merchant Store through the Shopify Admin.

12.3  The Company may terminate these Terms by providing the Merchant with at least thirty (30) days' written notice.

12.4  Upon termination of these Terms for any reason:
•  the licence granted under Clause 2.1 shall immediately terminate;
•  the Merchant's access to the App and all associated features shall cease;
•  the Company shall handle Merchant Data in accordance with its obligations under these Terms, the Privacy Policy, the Data Processing Agreement, and applicable Data Protection Laws; and
•  any outstanding fees owed by the Merchant to the Company shall remain payable.

12.5  Clauses 1 (Definitions), 8 (Merchant Data), 9 (Security Breaches), 11 (Intellectual Property), 13 (Limitation of Liability), 14 (Indemnification), 15 (Confidentiality), 16 (Disclaimers), 17 (Governing Law), and 20 (General Provisions) shall survive termination or expiry of these Terms.


13. Limitation of Liability

13.1  Nothing in these Terms shall limit or exclude either party's liability for:
•  death or personal injury caused by its negligence;
•  fraud or fraudulent misrepresentation; or
•  any other liability which cannot be limited or excluded by applicable law.

13.2  Subject to Clause 13.1, the Company shall not be liable to the Merchant, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, for any:
•  loss of profits, revenue, business, anticipated savings, or goodwill;
•  loss of data or corruption of data (except to the extent arising from the Company's breach of its data protection obligations);
•  indirect, special, incidental, consequential, or punitive damages; or
•  losses arising from the Merchant's reliance on Virtual Try-On Images, including any losses arising from inaccurate, misleading, or unexpected AI-generated outputs;
in each case, whether or not the Company has been advised of the possibility of such losses.

13.3  Subject to Clause 13.1, the Company's total aggregate liability to the Merchant in respect of all claims arising under or in connection with these Terms, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, shall not exceed the total fees paid by the Merchant to the Company under these Terms during the twelve (12) month period immediately preceding the event giving rise to the claim.

13.4  If the Merchant has not paid any fees to the Company during such twelve (12) month period, the Company's total aggregate liability shall not exceed one hundred pounds sterling (£100).

13.5  The Merchant acknowledges that the App is provided as a tool to assist with Customer engagement and product visualisation, and that the Company does not guarantee any specific level of sales uplift, conversion rate improvement, or commercial outcome from the use of the App.


14. Indemnification

14.1  The Merchant shall indemnify, defend and hold harmless the Company, its directors, officers, employees, and agents from and against any and all losses, damages, liabilities, costs and expenses (including reasonable legal fees) arising out of or in connection with:
•  the Merchant's breach of these Terms;
•  the Merchant's violation of any applicable law or regulation;
•  any claim by a third party (including any Customer) arising from the Merchant's use of the App, the Virtual Try-On Feature, or any Virtual Try-On Image;
•  the Merchant's failure to obtain required consents or provide required notices to Customers in connection with the Virtual Try-On Feature;
•  any claim that the Merchant's product images, product data, or other content uploaded to or used with the App infringes the Intellectual Property Rights or other rights of any third party; or
•  the Merchant's misrepresentation of Virtual Try-On Images as actual photographs, exact representations, or guarantees of product appearance, fit, colour or size.


15. Confidentiality

15.1  Each party shall keep confidential any and all information of a confidential nature (including trade secrets and information of commercial value) disclosed to it by the other party in connection with these Terms ("Confidential Information"), and shall not make the other party's Confidential Information available to any third party, or use the other party's Confidential Information for any purpose other than the performance of its obligations under these Terms, without the prior written consent of the disclosing party.

15.2  Neither party shall use the other party's Confidential Information for any purpose other than the performance of its obligations under these Terms, nor disclose such information to any person other than its employees, directors, agents, or professional advisors who need to know such information for the purpose of carrying out the party's obligations under these Terms.


16. Disclaimers

16.1  The App is provided on an "as is" and "as available" basis. To the maximum extent permitted by applicable law, the Company disclaims all warranties, whether express, implied, statutory or otherwise, including any implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement.

16.2  Without limiting the foregoing, the Company does not warrant that:
•  the App will be uninterrupted, timely, secure, or error-free;
•  the Virtual Try-On Feature or any Generated Images will be accurate, complete, reliable, or suitable for any particular purpose;
•  the App will be compatible with all Shopify themes, browsers, devices, or operating systems; or
•  any defects in the App will be corrected within any particular timeframe.

16.3  Nothing in this Clause 16 shall affect the Merchant's statutory rights under the Consumer Rights Act 2015 (to the extent applicable) or any other mandatory statutory consumer protections.


17. Governing Law and Dispute Resolution

17.1  These Terms and any dispute or claim (including non-contractual disputes or claims) arising out of or in connection with them or their subject matter or formation shall be governed by and construed in accordance with the laws of England and Wales.

17.2  Each party irrevocably agrees that the courts of England and Wales shall have exclusive jurisdiction to settle any dispute or claim (including non-contractual disputes or claims) arising out of or in connection with these Terms or their subject matter or formation.


18. Changes to these Terms

18.1  The Company reserves the right to amend these Terms at any time. The Company shall provide the Merchant with at least thirty (30) days' advance written notice of any material changes to these Terms, via email or in-app notification.

18.2  The Merchant's continued use of the App following the effective date of any amendments constitutes the Merchant's acceptance of the amended Terms. If the Merchant does not agree to the amended Terms, the Merchant's sole remedy is to uninstall the App before the amendments take effect.


19. Force Majeure

19.1  Neither party shall be liable for any failure or delay in performing its obligations under these Terms to the extent that such failure or delay results from circumstances beyond the reasonable control of that party, including but not limited to: acts of God, natural disasters, epidemics or pandemics, war, terrorism, civil unrest, government actions or sanctions, power failures, internet or telecommunications failures, cyberattacks, failures of third-party service providers (including Shopify and AI service providers), and any other events beyond the reasonable control of the affected party.

19.2  The affected party shall use reasonable endeavours to mitigate the effects of the force majeure event and shall promptly notify the other party of the nature and expected duration of the event.


20. General Provisions

20.1  Entire Agreement. These Terms, together with the Privacy Policy set out in Part 2, the Data Processing Agreement, and any Schedules, constitute the entire agreement between the parties and supersede all prior agreements, representations, and understandings between the parties relating to the subject matter hereof.

20.2  Severability. If any provision of these Terms is held to be invalid, illegal, or unenforceable by any court or tribunal of competent jurisdiction, such provision shall be severed from these Terms and the remaining provisions shall continue in full force and effect.

20.3  Waiver. No failure or delay by a party to exercise any right or remedy provided under these Terms or by law shall constitute a waiver of that or any other right or remedy, nor shall it prevent or restrict the further exercise of that or any other right or remedy.

20.4  Third Party Rights. A person who is not a party to these Terms shall not have any rights under the Contracts (Rights of Third Parties) Act 1999 to enforce any term of these Terms, except that Shopify Inc. may enforce the Shopify-protective statements in the preamble to these Terms.

20.5  Assignment. The Company may assign or transfer these Terms or any of its rights or obligations hereunder without the Merchant's prior consent. The Merchant may not assign or transfer these Terms without the Company's prior written consent.

20.6  Notices. Any notice required to be given under these Terms shall be in writing and shall be deemed duly given when sent by email to: (a) the Company, at mail@renderedfits.com; and (b) the Merchant, at the email address associated with the Merchant's Shopify account.

20.7  Independent Contractors. The parties are independent contractors. Nothing in these Terms shall be construed to create a partnership, joint venture, agency, or employment relationship between the parties.


Schedule 1: Subscription Plans and Pricing

Plan          | Monthly Fee | Monthly Generations
Starter       | £249        | 1,000
Growth        | £449        | 2,000
Scale         | £749        | 3,500
Professional  | £1,249      | 6,000

Annual billing is available at a discounted rate. Annual pricing details are displayed within the App at the time of plan selection.

Upon reaching the monthly generation limit, the Virtual Try-On Feature will be disabled for the remainder of the billing period. The Merchant may upgrade to a higher-tier plan at any time to increase their allocation.

Free trial terms (if applicable): The Company may, at its discretion, offer a seven (7) day free trial with a limited number of Virtual Try-On generations. At the end of the trial, the Merchant must select a paid Subscription Plan to continue using the App. If the Merchant does not select a plan, access to the Virtual Try-On Feature will be suspended.


Schedule 2: Company Contact Details

Rendered Fits Ltd
Company Registration Number: 16922551
VAT Registration Number: 510026164
Registered Office: 50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ, United Kingdom
Email: mail@renderedfits.com
Website: renderedfits.com
Directors: Sydney George Stones, Sienna Olivia Stones


PART 2: APP PRIVACY POLICY

Effective Date: February 2026
Last Updated: February 2026

1. Introduction

This Privacy Policy explains how Rendered Fits Ltd ("we", "us", "our", or the "Company") collects, uses, stores, shares, and protects personal information in connection with the Rendered Fits virtual try-on application (the "App"), which is available to Shopify merchants via the Shopify App Store.

This Privacy Policy applies to all personal information we process in connection with the App, including information relating to Merchants who install the App and Customers (End Users) who interact with the Virtual Try-On Feature on Merchant stores.

We are committed to protecting the privacy and security of personal information. We process personal data in accordance with the UK General Data Protection Regulation (UK GDPR), the EU General Data Protection Regulation (EU GDPR), the Data Protection Act 2018, and other applicable Data Protection Laws worldwide.

2. Who We Are

Data Controller and Data Processor

The role we play in relation to personal data depends on whose data is being processed:

•  For Merchant account data (shop domain, billing information, usage analytics): We act as a data controller, meaning we determine the purposes and means of processing.
•  For End User data processed through the Virtual Try-On Feature (customer photographs, IP addresses, session identifiers): We act as a data processor on behalf of the Merchant, who is the data controller. The terms of this processing relationship are set out in the Data Processing Agreement, available at renderedfits.com/legal/dpa.

Our details:

Rendered Fits Ltd
Company Registration Number: 16922551
Registered Office: 50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ, United Kingdom
Email: mail@renderedfits.com
ICO Registration Number: [TO BE OBTAINED PRIOR TO LAUNCH]

3. Information We Collect

We collect and process the following categories of personal information:

3.1 Information Collected Through Shopify's APIs (Merchant Data)

When a Merchant installs the App, we collect the following information through Shopify's APIs:

•  Shop domain and shop ID - used for App authentication, billing, and account identification.
•  Subscription and billing plan data - collected via the Shopify Billing API, including plan tier, usage limits, and billing period.
•  App subscription status - received via the APP_SUBSCRIPTIONS_UPDATE webhook. Used to manage billing cycle resets and usage limit enforcement.
•  Order identifiers - received via the orders/create webhook, including order ID, cart token, and product handles. Used solely for the purpose of attributing conversions to virtual try-on sessions.

We also handle Shopify's mandatory GDPR compliance webhooks: customers/data_request, customers/redact, and shop/redact.

3.2 Information Collected Directly from Merchants

We do not ask Merchants for separate contact details or registration information. Authentication is handled entirely through Shopify's OAuth 2.0 Token Exchange, so no separate Merchant credentials are stored by the Company.

The App generates automated usage logs related to the Merchant's use of the App:

•  Number of AI image generations consumed against the Merchant's plan limit
•  Aggregated analytics data, including virtual try-on conversion rate, attributed revenue, and conversion comparison metrics

These logs are used solely to display the Merchant's analytics dashboard and enforce billing plan limits.

3.3 Information Collected from End Users (Customers)

When a Customer uses the Virtual Try-On Feature on a Merchant's store, we collect the following:

Data: Customer photograph
Purpose: Processed by AI to generate the virtual try-on image
Retention: Temporary - cached during active session (max 24 hours), then automatically and permanently deleted

Data: IP address
Purpose: Rate limiting to prevent abuse
Retention: Session-scoped - expires automatically when the session ends

Data: Session identifier
Purpose: Stored in browser localStorage for session continuity and conversion attribution
Retention: Until the Customer clears their browser data

Data: Functional cookies
Purpose: Session management and cart functionality
Retention: Session-scoped

3.4 Information We Do NOT Collect

We want to be clear about the data we do not collect or process:

•  Customer names
•  Customer email addresses
•  Customer postal addresses
•  Customer payment or financial details
•  Browsing history or navigation data
•  Behavioural tracking data
•  Biometric identifiers or biometric templates (we do not extract, store, or create facial geometry scans, fingerprints, voiceprints, or similar biometric identifiers)

4. How We Use Information

All personal information we collect is used exclusively for the following purposes:

•  Generating AI virtual try-on images for Customers
•  Providing and operating the App for Merchants
•  Managing Merchant subscriptions, billing, and plan enforcement
•  Enforcing rate limits to prevent abuse
•  Attributing conversions to enable Merchants to measure the ROI of the Virtual Try-On Feature
•  Displaying analytics and usage data on the Merchant's dashboard
•  Complying with Shopify's mandatory GDPR webhooks (customer data request, customer data erasure, shop data erasure)
•  Maintaining the security and integrity of the App

We do not use any collected data for:

•  Advertising or ad targeting
•  Marketing or promotional purposes
•  Profiling or automated decision-making
•  Selling, renting, leasing, or trading to third parties
•  Training artificial intelligence or machine learning models (other than the real-time generation of the requested virtual try-on image)

5. Legal Basis for Processing

Under the UK GDPR and EU GDPR, we must have a valid legal basis for processing personal data:

Processing Activity: Customer photographs for VTO generation
Legal Basis: Article 6(1)(a) Consent + Article 9(2)(a) Explicit consent
Justification: Consent is obtained before any photograph is uploaded. The upload action, combined with agreement to the End-User Terms of Use, constitutes informed consent.

Processing Activity: IP addresses for rate limiting
Legal Basis: Article 6(1)(f) Legitimate interests
Justification: Preventing abuse and protecting system resources. Minimal impact on data subjects given session-scoped retention.

Processing Activity: Session IDs for conversion attribution
Legal Basis: Article 6(1)(f) Legitimate interests
Justification: Enabling Merchants to measure ROI. Pseudonymous identifiers only.

Processing Activity: Merchant account data for billing and operations
Legal Basis: Article 6(1)(b) Contract performance
Justification: Necessary for the performance of the Merchant Agreement.

Processing Activity: GDPR webhook compliance
Legal Basis: Article 6(1)(c) Legal obligation
Justification: Required by UK GDPR / EU GDPR.

Where we rely on legitimate interests as a legal basis, we have conducted a balancing assessment to ensure that our interests do not override the rights and freedoms of the data subjects concerned.

6. Consent for End User Photo Processing

Before any Customer photograph is uploaded or processed through the Virtual Try-On Feature, the Customer is presented with a consent notice within the storefront widget that:

•  Clearly explains that the Customer's photograph will be processed using AI technology to generate a virtual try-on image
•  Identifies Rendered Fits Ltd as the processor and the Merchant as the controller
•  States that the photograph will be sent to Google's AI service (Gemini API) for processing
•  Confirms that the photograph is processed temporarily and is not stored permanently
•  Provides links to the End-User Terms of Use and this Privacy Policy for full details

Consent is specific, informed, and unambiguous. Customers may withdraw consent at any time by choosing not to use the Virtual Try-On Feature. Any photographs already cached will be automatically deleted when the session expires.

7. Sharing and Disclosure of Personal Information

We do not sell, rent, lease, trade, or otherwise commercially exploit personal information. We share personal information only in the limited circumstances described below.

7.1 Third-Party Service Providers (Sub-Processors)

Provider: Google LLC (Gemini API)
Processing Activity: AI image generation
Data Processed: Customer photographs, product images (transient processing)
Location: europe-west2 (London, UK)

Provider: Google Cloud Platform
Processing Activity: Cloud infrastructure, temporary file storage
Data Processed: Customer photographs (cached), IP addresses, session data
Location: europe-west2 (London, UK)

Provider: Shopify Inc.
Processing Activity: Platform hosting, OAuth authentication, billing, webhooks
Data Processed: Merchant store domain, billing data, order identifiers
Location: Canada / United States

All sub-processors are bound by contractual obligations to process personal information only in accordance with our instructions and applicable Data Protection Laws.

7.2 Other Disclosures

We may also disclose personal information where:

•  Required by law, regulation, court order, or governmental or regulatory authority
•  Necessary to protect our rights, property, or safety, or the rights, property, or safety of others
•  In connection with a merger, acquisition, reorganisation, or sale of all or substantially all of our assets, in which case the acquiring entity will be bound by the terms of this Privacy Policy

8. International Data Transfers

Personal information processed through the App may be transferred to and processed in countries outside the United Kingdom and the European Economic Area. Specifically:

•  Google servers (for AI image generation and cloud hosting) - routed through europe-west2 (London, UK)
•  Shopify servers - located in Canada and the United States

Where personal data is transferred outside the UK or EEA, we ensure that adequate safeguards are in place in accordance with applicable Data Protection Laws, including:

•  The UK International Data Transfer Agreement (UK IDTA) or the UK Addendum to the EU Standard Contractual Clauses, where applicable
•  The European Commission's Standard Contractual Clauses (SCCs) for transfers from the EEA
•  Adequacy decisions, where the destination country has been recognised as providing an adequate level of data protection
•  Additional technical and organisational measures, including encryption in transit and at rest, and transient-only processing of sensitive data

Google LLC participates in the EU-U.S. Data Privacy Framework, which has been recognised as providing adequate protection by the European Commission.

9. Data Retention

We retain personal information only for as long as necessary to fulfil the purposes for which it was collected, or as required by applicable law:

Data: Customer photographs
Retention: Temporary only - cached during the active session (maximum 24 hours), then permanently and automatically deleted

Data: Generated virtual try-on images
Retention: Same as customer photographs - maximum 24 hours

Data: IP addresses (rate limiting)
Retention: Session-scoped - expires automatically

Data: Session identifiers
Retention: Stored in Customer's browser until cleared

Data: Merchant account data
Retention: Duration of active subscription, plus 90 days for deletion processing following uninstall

Data: Conversion attribution data
Retention: Duration of active subscription, deleted on uninstall via shop/redact webhook

10. Your Rights

Under applicable data protection laws, individuals have the following rights in relation to their personal information:

Right: Access — Request a copy of the personal information we hold about you
Right: Rectification — Request correction of inaccurate or incomplete personal information
Right: Erasure — Request deletion of your personal information (subject to legal obligations)
Right: Restriction — Request restriction of processing in certain circumstances
Right: Portability — Receive your personal information in a structured, machine-readable format
Right: Objection — Object to processing based on legitimate interests
Right: Withdraw consent — Withdraw consent at any time where processing is based on consent

How to exercise your rights:

•  Merchants: Contact us at mail@renderedfits.com with your request.
•  End Users (Customers): In the first instance, please contact the Merchant whose store you used the Virtual Try-On Feature on, as the Merchant is the data controller for your data. You may also contact us directly at mail@renderedfits.com and we will assist.

We will respond to all data subject requests within one (1) month of receipt, or within the timeframe required by applicable law. In complex cases, we may extend this period by a further two (2) months, in which case we will notify you of the extension and the reasons for it.

11. Additional Information for US Residents

11.1 Biometric Information Notice (All US States)

This section provides additional information for residents of the United States regarding the processing of biometric data through the Virtual Try-On Feature.

When you upload a photograph to the Virtual Try-On Feature, our AI technology (provided by Google's Gemini API) analyses the facial features and body shape in your photograph to generate a virtual try-on image. To the extent that this processing may involve biometric identifiers or biometric information as defined under applicable state law, the following applies:

(a) What is collected. Your photograph, which contains your facial image, is transmitted to Google's Gemini AI service for processing. The AI analyses the visual content of your photograph, including your facial features, to generate the composite try-on image.

(b) What is NOT collected. We do not extract, compute, create, or store any biometric identifier or biometric template from your photograph. No facial geometry scan, faceprint, iris scan, fingerprint, voiceprint, or other biometric template is created or retained at any point during processing.

(c) Purpose. Your photograph is processed solely for the purpose of generating the virtual try-on image you requested. It is not used for identification, verification, surveillance, profiling, advertising, or any other purpose.

(d) Retention and destruction. Your photograph is cached temporarily for the duration of your active session (maximum 24 hours) and is permanently and automatically destroyed when the session expires. We do not maintain any permanent database of photographs or biometric data. Our full retention schedule and destruction procedures are set out in our Biometric Data Retention and Destruction Policy, available at: renderedfits.com/legal/biometric-policy

(e) No sale or disclosure. We do not sell, lease, trade, or otherwise profit from your photograph or any data derived from it. We do not disclose your photograph to any third party other than Google's Gemini AI service for the sole purpose of generating your try-on image.

(f) Consent. By uploading your photograph to the Virtual Try-On Feature, you acknowledge that you have received this notice and you provide your informed, written consent and release for your photograph to be processed as described above, including the analysis of your facial features for the sole purpose of generating a virtual try-on image.

(g) Applicable laws. This notice is provided in compliance with the Illinois Biometric Information Privacy Act (740 ILCS 14) (BIPA), the Texas Capture or Use of Biometric Identifier Act (Tex. Bus. & Com. Code § 503.001), the Washington Biometric Privacy Protection Act (RCW 19.375), and other applicable US state biometric privacy laws.

11.2 California Privacy Rights (CCPA/CPRA)

If you are a California resident, the following additional rights and disclosures apply under the California Consumer Privacy Act, as amended by the California Privacy Rights Act:

(a) Categories of personal information collected. Photographs (which may constitute biometric information and are classified as sensitive personal information under the CPRA), IP addresses (internet or other electronic network activity information), and session identifiers (unique personal identifiers).

(b) Purpose of collection. As set out in Section 4 of this Privacy Policy. We do not use or disclose sensitive personal information for purposes other than those permitted under CPRA Section 1798.121.

(c) Sale and sharing. We do not sell personal information. We do not share personal information for cross-context behavioural advertising.

(d) Right to know. You have the right to request that we disclose the categories and specific pieces of personal information we have collected about you.

(e) Right to delete. You have the right to request deletion of personal information we have collected. Given our transient processing model, your photograph will typically have been automatically deleted before any such request is received.

(f) Right to limit use of sensitive personal information. You have the right to limit the use and disclosure of your sensitive personal information. We already limit use to the purposes disclosed in this Privacy Policy.

(g) Non-discrimination. We will not discriminate against you for exercising any of your CCPA/CPRA rights.

To exercise your California privacy rights, contact us at: mail@renderedfits.com. We will verify your identity before processing your request.

11.3 Other US State Privacy Laws

Residents of other US states with applicable consumer privacy or biometric privacy laws (including but not limited to Colorado, Connecticut, Virginia, Utah, Montana, Oregon, and New Jersey) may have additional rights regarding their personal information. To the extent required by applicable state law, we will honour requests to access, correct, delete, or opt out of the processing of your personal data. To exercise any such rights, please contact us at: mail@renderedfits.com

For full details of our biometric data retention and destruction practices, please refer to our Biometric Data Retention and Destruction Policy at: renderedfits.com/legal/biometric-policy

12. Children's Privacy

The Virtual Try-On Feature is intended for individuals aged 16 and over. We do not knowingly collect personal information from children under the age of 16 (or under the age of 13 in jurisdictions where that is the applicable minimum, such as the United States under COPPA).

If we become aware that we have collected personal information from a child under the applicable minimum age without appropriate consent, we will take immediate steps to delete that information.

If you are a parent or guardian and believe your child has provided personal information through the Virtual Try-On Feature, please contact us at mail@renderedfits.com.

13. Data Security

We implement appropriate technical and organisational security measures to protect personal information against unauthorised access, alteration, disclosure, or destruction. These measures include:

•  Encryption of data in transit using TLS/HTTPS
•  Transient processing of Customer photographs with automated deletion within 24 hours
•  Session-scoped data storage with automatic expiry
•  Authentication via Shopify's OAuth 2.0 Token Exchange (no separate credentials stored)
•  Rate limiting to prevent abuse and protect system resources
•  Access controls restricting access to personal data to authorised personnel only
•  Regular review and monitoring of security measures

While we take reasonable steps to protect personal information, no method of transmission over the internet or method of electronic storage is 100% secure. We cannot guarantee absolute security.

14. Cookies and Similar Technologies

The App uses functional cookies and Shopify cart attributes strictly for session management and cart functionality. These are necessary for the App to operate and do not constitute behavioural tracking. No advertising, analytics, or third-party tracking cookies are used by the App.

The App also uses browser localStorage to store a session ID for the purpose of maintaining session continuity and enabling conversion attribution. This can be cleared by the Customer at any time through their browser settings.

We do not log browsing behaviour, store navigation data, or use any form of behavioural tracking.

15. AI-Generated Content Transparency

Virtual Try-On Images produced by the App are generated using artificial intelligence (currently Google's Gemini API). In accordance with the EU AI Act (Regulation (EU) 2024/1689), Article 50, and in the interests of transparency:

•  All Virtual Try-On Images are clearly identified to the Customer as AI-generated within the storefront widget
•  Virtual Try-On Images are illustrative only and do not constitute photographs or exact representations of real-world products
•  We will implement machine-readable marking of AI-generated content in accordance with applicable legal requirements as they come into force

16. Changes to This Privacy Policy

We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. Material changes will be notified to Merchants via email or in-app notification at least thirty (30) days in advance.

We encourage you to review this Privacy Policy periodically. The "Last Updated" date at the top of this policy indicates when it was last revised.

17. Complaints

If you have any concerns or complaints about our processing of personal information, we encourage you to contact us first at mail@renderedfits.com so that we can attempt to resolve the matter.

You also have the right to lodge a complaint with a supervisory authority. In the United Kingdom, this is the Information Commissioner's Office:

•  Website: ico.org.uk
•  Telephone: 0303 123 1113
•  Post: Information Commissioner's Office, Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF

If you are located in the European Economic Area, you may lodge a complaint with the data protection authority in your country of residence.

18. Contact Us

If you have any questions about this Privacy Policy, our data practices, or wish to exercise your data subject rights, please contact us at:

Rendered Fits Ltd
Email: mail@renderedfits.com
Post: 50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ, United Kingdom


End of Merchant Terms and Conditions & App Privacy Policy — Version 1.0 — February 2026`;

// ─── Document registry ─────────────────────────────────────────────────────────

const legalDocs: LegalDoc[] = [
  {
    slug: 'website-legal-documents',
    title: 'Website Legal Documents',
    filename: 'websitelegaldocuments.md',
    lastUpdated: 'February 2026',
    text: websiteLegalDocuments,
  },
  {
    slug: 'app-privacy-policy',
    title: 'App Privacy Policy',
    filename: 'privacypolicy.md',
    lastUpdated: 'February 2026',
    text: appPrivacyPolicy,
  },
  {
    slug: 'end-user-terms',
    title: 'End-User Terms of Use',
    filename: 'enduserlicenseagreement.md',
    lastUpdated: 'February 2026',
    text: endUserTerms,
  },
  {
    slug: 'merchant-terms',
    title: 'Merchant Terms and Conditions',
    filename: 'merchanttermsandconditions.md',
    lastUpdated: 'February 2026',
    text: merchantTerms,
  },
  {
    slug: 'data-processing-agreement',
    title: 'Data Processing Agreement',
    filename: 'dataprocessingagreement.md',
    lastUpdated: 'February 2026',
    text: dataProcessingAgreement,
  },
  {
    slug: 'biometric-policy',
    title: 'Biometric Data Retention and Destruction Policy',
    filename: 'biometricdatapolicy.md',
    lastUpdated: 'February 2026',
    text: biometricPolicy,
  },
  {
    slug: 'merchantPrivacyPolicy',
    title: 'Merchant Terms of Conditions & Privacy Policy',
    filename: 'biometricdatapolicy.md',
    lastUpdated: 'March 2026',
    text: merchantPrivacyPolicy,
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Legal</h1>
          <p className="text-gray-500 text-sm">Rendered Fits Ltd · Company No. 16922551 · VAT No. 510026164</p>
          <p className="text-gray-400 text-xs mt-1">50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ · mail@renderedfits.com</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {legalDocs.map(doc => (
            <Link
              key={doc.slug}
              to={`/legal/${doc.slug}`}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:border-[#444833]/40 hover:shadow-sm transition-all group"
            >
              <div className="text-xs text-gray-400 mb-2">Last updated {doc.lastUpdated}</div>
              <div className="font-semibold text-gray-900 group-hover:text-[#444833] transition-colors text-sm leading-snug">{doc.title}</div>
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
          <div className="mb-6 pb-6 border-b border-gray-100">
            <p className="text-xs text-gray-400 mb-1">Last updated: {doc.lastUpdated}</p>
            <h1 className="text-xl font-bold text-gray-900">{doc.title}</h1>
          </div>
          <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 leading-relaxed">
            {doc.text}
          </pre>
        </div>
        <div className="mt-8 text-center text-xs text-gray-400">
          <Link to="/legal" className="hover:text-gray-600">← All Legal Documents</Link>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
