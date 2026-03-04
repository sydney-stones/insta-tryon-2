





RENDERED FITS LTD
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
Customer-uploaded photograph	Processed by the AI Service (Google Gemini API) to generate a virtual try-on image. The photo is sent directly from the Customer’s browser to the AI Service.	Transient. Cached temporarily in cloud storage during the active session. Automatically deleted by a cleanup function that runs every 24 hours and removes files for expired sessions.
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
•	States that the photograph will be sent to Google’s AI service (Gemini API) for processing
•	Confirms that the photograph is processed transiently and is not stored long-term
•	Provides a link to this Privacy Policy for full details
•	Requires the Customer to actively confirm their consent before the upload function is enabled

Consent is specific, informed, and unambiguous. Customers may withdraw consent at any time by choosing not to use the Virtual Try-On Feature. Withdrawal of consent does not affect the lawfulness of processing based on consent before its withdrawal.
7. Sharing and Disclosure of Personal Information
We do not sell, rent, lease, trade, or otherwise commercially exploit personal information. We share personal information only in the following limited circumstances:

7.1 Third-Party Service Providers (Sub-Processors)
We use the following third-party service providers who may process personal information on our behalf:

Sub-Processor	Purpose	Data Processed	Location
Google LLC (Gemini API)	AI image generation — processing Customer photographs to generate virtual try-on images	Customer photographs (transient processing)	europe-west2
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

Additional rights for California residents (CCPA/CPRA):
If you are a California resident, you may also have the following additional rights:
•	Right to know what personal information is collected, used, disclosed, and sold
•	Right to delete personal information
•	Right to opt out of the sale or sharing of personal information (note: we do not sell or share personal information)
•	Right to non-discrimination for exercising your privacy rights
•	Right to limit the use and disclosure of sensitive personal information

11. Children’s Privacy
The Virtual Try-On Feature is intended for individuals aged 16 and over. We do not knowingly collect personal information from children under the age of 16 (or under the age of 13 in jurisdictions where that is the applicable minimum age).
If we become aware that we have collected personal information from a child under the applicable minimum age without appropriate consent, we will take steps to delete such information as soon as reasonably practicable.
If you are a parent or guardian and believe your child has provided personal information through the Virtual Try-On Feature, please contact us at mail@renderedfits.com.

12. Data Security
We implement appropriate technical and organisational security measures to protect personal information against unauthorised access, alteration, disclosure, or destruction. These measures include:
•	Encryption of data in transit using TLS/HTTPS
•	Transient processing of Customer photographs with automated deletion
•	Session-scoped data storage with automatic expiry
•	Authentication via Shopify’s OAuth 2.0 Token Exchange (no separate credentials stored)
•	Rate limiting to prevent abuse and protect system resources
•	Access controls restricting access to personal data to authorised personnel only
•	Regular review and monitoring of security measures

While we take reasonable steps to protect personal information, no method of transmission over the internet or method of electronic storage is 100% secure. We cannot guarantee the absolute security of personal information.

13. Cookies and Similar Technologies
The App only uses essential and functional cookies.
The App uses browser localStorage to store a session ID for the purpose of maintaining session continuity and enabling conversion attribution. This session ID is not a cookie and is not shared with any third party. It remains in the Customer’s browser and can be cleared by the Customer at any time through their browser settings.
We do not log browsing behaviour, store navigation data, or use any form of behavioural tracking.

14. AI-Generated Content Transparency
Virtual Try-On Images produced by the App are generated using artificial intelligence (currently Google’s Gemini API). In accordance with emerging AI transparency regulations, including the EU AI Act (Article 50, effective August 2026):
•	All Virtual Try-On Images are clearly identified to the Customer as AI-generated within the storefront widget
•	Virtual Try-On Images are illustrative only and do not constitute photographs or exact representations of real-world products
•	We will implement machine-readable marking of AI-generated content in accordance with applicable legal requirements as they come into effect

15. Changes to This Privacy Policy
We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify Merchants of any material changes by email or in-app notification at least thirty (30) days before such changes take effect.
We encourage you to review this Privacy Policy periodically. The “Last Updated” date at the top of this policy indicates when it was last revised. Continued use of the App after changes take effect constitutes acceptance of the updated Privacy Policy.

16. Complaints
If you have any concerns or complaints about our processing of personal information, we encourage you to contact us first at mail@renderedfits.com so that we can try to resolve the matter.
You also have the right to lodge a complaint with a supervisory authority. In the United Kingdom, this is the Information Commissioner’s Office (ICO):
•	Website: ico.org.uk
•	Telephone: 0303 123 1113
•	Post: Information Commissioner’s Office, Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF

If you are located in the European Economic Area, you may lodge a complaint with the data protection authority in your country of residence.

17. Contact Us
If you have any questions about this Privacy Policy, our data practices, or wish to exercise your data subject rights, please contact us:

Rendered Fits Ltd
Email: mail@renderedfits.com
Post: 50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ, United Kingdom

End of App Privacy Policy — Version 1.0 — February 2026
