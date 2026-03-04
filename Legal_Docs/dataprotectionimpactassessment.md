





RENDERED FITS LTD
Data Protection Impact Assessment

Pursuant to Article 35 of the UK GDPR



Field	Detail
Document title	Data Protection Impact Assessment — Rendered Fits Virtual Try-On Application
Document owner	Sydney George Stones, Co-Founder & Director
Organisation	Rendered Fits Ltd (Company No. 16922551)
Version	1.0
Date of assessment	February 2026
Status	DRAFT — Pending internal sign-off
Next review date	February 2027 (or earlier if material changes to processing)
Classification	INTERNAL — CONFIDENTIAL


Rendered Fits Ltd
50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ
mail@renderedfits.com
 
1. DPIA Screening
1.1 Why is a DPIA Required?
A DPIA is mandatory under Article 35(1) of the UK GDPR where processing is likely to result in a high risk to the rights and freedoms of natural persons. The ICO’s screening criteria indicate that a DPIA is required where two or more of the following apply:

ICO Screening Criterion	Applicable?	Explanation
Evaluation or scoring	No	The App does not evaluate, score, or profile individuals.
Automated decision-making with legal or significant effect	No	No automated decisions are made. The App generates an image; no legal or similarly significant effects result.
Systematic monitoring	No	The App does not systematically monitor individuals or public spaces.
Sensitive data or data of a highly personal nature	YES	Customer photographs are personal data. To the extent that the AI Service analyses facial features, this may constitute biometric data (special category data under Article 9 UK GDPR).
Data processed on a large scale	YES (potential)	The App will be available to multiple Shopify merchants, each with potentially thousands of customers. Aggregate volume across all merchants may constitute large-scale processing.
Matching or combining datasets	No	No datasets are combined. Each try-on session is independent.
Data concerning vulnerable data subjects	Possible	While the primary user base is adult online shoppers, some users could be 16–17 year olds (the minimum age).
Innovative use of technology	YES	AI-powered virtual try-on using generative AI (Google Gemini) to process facial photographs is a novel application of technology.
Data transfers outside UK/EEA	YES	Customer photographs are transmitted to Google’s AI Service, which may process data outside the UK/EEA.
Processing that prevents data subjects from exercising a right or using a service	No	Customers who decline to use the Feature can still browse and purchase products normally.

SCREENING RESULT
Four criteria are met (sensitive data, potential large scale, innovative technology, international transfers). A DPIA is MANDATORY.

 
2. Description of the Processing
2.1 Overview
Rendered Fits Ltd operates an AI-powered virtual try-on application available to Shopify merchants via the Shopify App Store. The App enables customers visiting a merchant’s online store to upload a photograph of themselves and receive an AI-generated image depicting the customer wearing a product from the store.

2.2 Processing Operations
Processing Operation	Description
Photo collection	Customer uploads a photograph from their device via the storefront widget. The photograph is transmitted from the customer’s browser to the App’s backend via HTTPS.
Temporary caching	The photograph is temporarily cached in Google Cloud Platform (GCP) Cloud Storage. A session reference is created linking the cached photograph to the customer’s session.
AI image generation	The photograph is transmitted to Google’s Gemini API along with a product image. The AI analyses the photograph (including facial features and body shape) and generates a composite virtual try-on image.
Image delivery	The generated image is returned to the App backend and delivered to the customer’s browser for display.
Rate limiting	The customer’s IP address is temporarily recorded in a session-scoped rate-limiting system to prevent abuse.
Conversion attribution	A session ID stored in the customer’s browser localStorage is used to match completed purchases (received via Shopify webhook) to virtual try-on sessions.
Automated deletion	A scheduled cleanup function runs every 24 hours, permanently deleting all cached photographs and generated images for expired sessions.
GDPR webhook handling	The App responds to Shopify’s mandatory GDPR webhooks (customers/data_request, customers/redact, shop/redact).

2.3 Data Processed
Data Category	Data Elements	Data Subjects	Volume
Customer photographs	Facial image uploaded by the customer	Customers of Shopify merchants who use the VTO Feature	Expected: hundreds to low thousands per month across all merchants at launch, scaling with merchant adoption
IP addresses	Customer IP address	Same as above	One per VTO session
Session identifiers	Session ID stored in browser localStorage	Same as above	One per VTO session
Order identifiers	Order ID, cart token, product handles	Customers who complete a purchase after using VTO	Subset of VTO users who convert
Merchant account data	Shop domain, billing plan, subscription status	Shopify merchants who install the App	Expected: 5–50 merchants at launch

2.4 Data Flows
The complete data flow for a virtual try-on session is as follows:
•	Customer’s browser → (HTTPS) → App backend: Customer uploads photograph
•	App backend → (HTTPS) → GCP Cloud Storage: Photograph temporarily cached
•	App backend → (HTTPS) → Google Gemini API: Photograph + product image sent for AI generation
•	Google Gemini API → (HTTPS) → App backend: Generated composite image returned
•	App backend → (HTTPS) → Customer’s browser: Generated image delivered for display
•	Automated cleanup → GCP Cloud Storage: Cached files permanently deleted on session expiry

2.5 Third Parties Involved
Third Party	Role	Data Access
Google LLC (Gemini API)	Sub-processor	Receives customer photographs and product images for AI generation. Transient processing only. Paid API: Google does not use data for model training.
Google Cloud Platform	Sub-processor (infrastructure)	Hosts temporary photo cache and application infrastructure.
Shopify Inc.	Platform provider / Independent controller	Hosts merchant stores, processes authentication and billing, delivers order webhooks.

 
3. Necessity and Proportionality Assessment
3.1 Lawful Basis
Processing	Lawful Basis	Justification
Customer photographs for VTO generation	Article 6(1)(a) Consent + Article 9(2)(a) Explicit consent	Consent is the only appropriate basis for processing photographs through AI for image generation. The processing is not necessary for contract performance (the customer can purchase without using VTO), and there is no overriding legitimate interest that would justify processing facial images without consent.
IP addresses for rate limiting	Article 6(1)(f) Legitimate interests	Rate limiting is necessary to prevent abuse and protect system resources. The data subject’s interest in not having their IP temporarily logged is minimal given the session-scoped retention. No less intrusive alternative is available.
Session IDs for conversion attribution	Article 6(1)(f) Legitimate interests	Merchants have a legitimate interest in measuring the ROI of the VTO Feature. Session IDs are pseudonymous and are not combined with other personal data.

3.2 Necessity
Is the processing necessary for the stated purpose?
•	Photo processing: YES. The core function of the App (generating virtual try-on images) cannot be achieved without processing the customer’s photograph. There is no alternative method to generate a personalised virtual try-on image without a photograph of the customer.
•	Transmission to Gemini API: YES. The AI image generation cannot be performed locally in the browser or on our servers without the third-party AI service. No equivalent on-device solution currently exists that meets quality requirements.
•	IP rate limiting: YES. Without rate limiting, the App would be vulnerable to abuse, which would increase costs for merchants and degrade service for legitimate users.
•	Conversion attribution: YES for merchant purposes. Merchants need to measure ROI to justify the subscription cost. The session-based approach is the minimum necessary.

3.3 Proportionality
Is the processing proportionate to the purpose?
•	Data minimisation: Only the photograph is collected — no name, email, address, or other personal data is required. The photograph is the minimum necessary to generate the try-on image.
•	Storage limitation: Photographs are cached only for the duration of the session (typically minutes) and are permanently deleted within 24 hours of session expiry. No long-term storage.
•	Purpose limitation: Photographs are used solely to generate the requested try-on image. No secondary use, no AI training, no profiling, no advertising.
•	Transparency: Customers receive clear, layered notice (privacy-at-a-glance summary + full privacy notice + terms of use) before any data is collected.
•	Choice: The VTO Feature is entirely optional. Customers who do not wish to upload a photograph can browse and purchase normally.
•	Consent withdrawal: Customers can withdraw consent by simply not using the Feature. Any cached data is automatically deleted.

3.4 Could the Purpose Be Achieved with Less Processing?
Alternative Considered	Feasible?	Outcome
On-device AI processing (no server upload)	Not currently feasible	Browser-based generative AI models of sufficient quality for virtual try-on do not currently exist. This would eliminate the need to transmit photos to a server but is not technically viable today.
Lower-resolution photographs	Partially feasible	Could reduce data transmitted but would significantly degrade image quality and customer experience. Not proportionate.
Pre-defined avatar system (no real photo)	Feasible but defeats purpose	Would not deliver the core value proposition of showing the real customer in the product. This would be a fundamentally different product.
Shorter cache retention	Partially feasible	Could reduce cleanup interval from 24 hours to 1 hour. RECOMMENDATION: Consider reducing cleanup frequency when technically validated.
No conversion attribution	Feasible	Would reduce data processing but would prevent merchants from measuring ROI, which is essential for subscription justification. Session-based approach already minimises data.

PROPORTIONALITY CONCLUSION
The processing is necessary and proportionate. The transient processing model, combined with data minimisation and explicit consent, represents the least intrusive approach to achieving the legitimate purpose.

 
4. Risk Assessment
This section identifies risks to the rights and freedoms of data subjects and assesses their likelihood and severity, both before and after mitigation measures.

4.1 Risk Matrix Key
Likelihood	Severity	Overall Risk
Remote: Could happen but very unlikely	Minimal: Minor inconvenience	LOW: Acceptable risk
Possible: Could happen in some circumstances	Significant: Real impact on individuals	MEDIUM: Manageable with controls
Probable: More likely than not	Severe: Serious harm or distress	HIGH: Requires additional mitigation
Near certain: Expected to happen	Critical: Irreversible or catastrophic harm	CRITICAL: Must be eliminated or avoided

4.2 Risk Register

Risk 1: Unauthorised access to cached customer photographs
Element	Assessment
Description	An attacker gains unauthorised access to the cloud storage bucket containing temporarily cached customer photographs
Harm to data subjects	Exposure of facial images. Potential for identity theft, fraud, deepfake creation, or personal distress.
Likelihood (before mitigation)	Possible
Severity (before mitigation)	Significant
Overall risk (before mitigation)	MEDIUM
Mitigation measures	(1) Transient storage with daily automated deletion minimises the window of exposure. (2) GCP Cloud Storage access restricted by IAM policies. (3) Encryption at rest (GCP default). (4) Encryption in transit (TLS/HTTPS). (5) No public access to storage bucket. (6) Multi-factor authentication for admin access.
Likelihood (after mitigation)	Remote
Severity (after mitigation)	Significant
Overall risk (after mitigation)	LOW

Risk 2: Interception of photographs in transit
Element	Assessment
Description	Customer photographs intercepted during transmission between the customer’s browser and the App backend, or between the App backend and Google Gemini API
Harm to data subjects	Exposure of facial images in transit.
Likelihood (before mitigation)	Possible
Severity (before mitigation)	Significant
Overall risk (before mitigation)	MEDIUM
Mitigation measures	(1) All communications use TLS/HTTPS encryption. (2) API calls to Google Gemini use authenticated HTTPS endpoints. (3) No data transmitted in plaintext.
Likelihood (after mitigation)	Remote
Severity (after mitigation)	Significant
Overall risk (after mitigation)	LOW

Risk 3: Google Gemini API misuse or retention of photographs
Element	Assessment
Description	Google retains or uses customer photographs beyond the scope of the API call, including for AI model training
Harm to data subjects	Loss of control over facial images. Photographs used for purposes not consented to.
Likelihood (before mitigation)	Remote
Severity (before mitigation)	Severe
Overall risk (before mitigation)	MEDIUM
Mitigation measures	(1) Paid API usage: Google’s Cloud Data Processing Addendum explicitly states that prompts and responses are not used for model training. (2) Google is bound by contractual data processing obligations. (3) Google holds ISO 27001/27017/27018 and SOC 2 Type II certifications. (4) Google participates in the EU-U.S. Data Privacy Framework.
Likelihood (after mitigation)	Remote
Severity (after mitigation)	Significant
Overall risk (after mitigation)	LOW

Risk 4: AI generates inappropriate, offensive, or harmful output
Element	Assessment
Description	The AI generates a virtual try-on image that is distorted, offensive, discriminatory, or causes distress to the customer
Harm to data subjects	Emotional distress, potential discriminatory impact (e.g., AI performing worse for certain skin tones or body types), reputational harm to customer.
Likelihood (before mitigation)	Possible
Severity (before mitigation)	Significant
Overall risk (before mitigation)	MEDIUM
Mitigation measures	(1) AI disclaimer clearly states images are AI-generated and may not be perfectly accurate. (2) Consent obtained before processing. (3) Customer can choose not to use the Feature. (4) Google’s Gemini has built-in content safety filters. (5) Merchant Agreement requires merchants not to misrepresent VTO images. (6) Ongoing monitoring of output quality planned.
Likelihood (after mitigation)	Possible
Severity (after mitigation)	Minimal
Overall risk (after mitigation)	LOW

Risk 5: Photographs of children processed without appropriate consent
Element	Assessment
Description	An individual under 16 (UK/EU) or under 13 (US) uses the VTO Feature without parental consent
Harm to data subjects	Processing of a child’s facial image without appropriate safeguards. Potential regulatory enforcement.
Likelihood (before mitigation)	Possible
Severity (before mitigation)	Severe
Overall risk (before mitigation)	HIGH
Mitigation measures	(1) Age restriction (16+) clearly stated in Terms of Use. (2) Consent notice requires affirmation of age. (3) The Feature is embedded in fashion ecommerce stores typically targeting adults. (4) No account creation or persistent profiles are created. (5) Transient processing means any child’s data would be automatically deleted within 24 hours.
Likelihood (after mitigation)	Remote
Severity (after mitigation)	Significant
Overall risk (after mitigation)	LOW

Risk 6: Non-compliance with US biometric privacy laws (BIPA class action risk)
Element	Assessment
Description	A US-based customer or plaintiff’s attorney alleges that the VTO Feature collects biometric data without adequate notice and consent under BIPA or similar state laws, resulting in class action litigation
Harm to data subjects	Violation of biometric privacy rights. For the Company: statutory damages of $1,000–$5,000 per violation under BIPA.
Likelihood (before mitigation)	Probable
Severity (before mitigation)	Critical
Overall risk (before mitigation)	CRITICAL
Mitigation measures	(1) Geo-targeted BIPA-compliant consent for US users. (2) Enhanced notice covering all six BIPA Section 15 requirements. (3) Publicly available Biometric Data Retention and Destruction Policy. (4) Explicit no-sale/no-trade statement. (5) Transient processing (strongest possible retention posture). (6) Consent records retained for audit/litigation defence.
Likelihood (after mitigation)	Possible
Severity (after mitigation)	Significant
Overall risk (after mitigation)	MEDIUM

Risk 7: Inadequate consent or transparency leading to GDPR enforcement
Element	Assessment
Description	The ICO or an EU supervisory authority finds that consent obtained for photo processing is not freely given, specific, informed, or unambiguous, or that the privacy notice is inadequate
Harm to data subjects	Processing without valid legal basis. For the Company: potential ICO enforcement action, fines.
Likelihood (before mitigation)	Possible
Severity (before mitigation)	Severe
Overall risk (before mitigation)	HIGH
Mitigation measures	(1) Layered consent approach: at-a-glance summary + full privacy notice + terms of use. (2) Consent is not bundled with other terms. (3) Consent is optional — customers can shop without using VTO. (4) Clear withdrawal mechanism (simply don’t use the Feature). (5) All GDPR Article 13/14 information provided. (6) Controller/processor roles clearly identified. (7) DPA in place as required by Article 28.
Likelihood (after mitigation)	Remote
Severity (after mitigation)	Significant
Overall risk (after mitigation)	LOW

Risk 8: Data breach at sub-processor (Google)
Element	Assessment
Description	A security breach at Google compromises customer photographs during or after API processing
Harm to data subjects	Large-scale exposure of facial images.
Likelihood (before mitigation)	Remote
Severity (before mitigation)	Critical
Overall risk (before mitigation)	MEDIUM
Mitigation measures	(1) Google maintains industry-leading security certifications (ISO 27001, SOC 2 Type II, etc.). (2) Paid API: data not retained for training. (3) Google’s Data Processing Addendum includes breach notification obligations. (4) Transient processing minimises the volume of data at risk at any point in time. (5) DPA with merchants includes breach notification chain (Google → Rendered Fits → Merchant → ICO).
Likelihood (after mitigation)	Remote
Severity (after mitigation)	Severe
Overall risk (after mitigation)	LOW

4.3 Risk Summary
Risk	Pre-Mitigation	Post-Mitigation	Status
R1: Unauthorised access to cached photos	MEDIUM	LOW	Acceptable
R2: Interception in transit	MEDIUM	LOW	Acceptable
R3: Google Gemini misuse/retention	MEDIUM	LOW	Acceptable
R4: Inappropriate AI output	MEDIUM	LOW	Acceptable
R5: Processing children’s photos	HIGH	LOW	Acceptable
R6: BIPA class action	CRITICAL	MEDIUM	Manageable — monitor ongoing
R7: GDPR consent/transparency failure	HIGH	LOW	Acceptable
R8: Sub-processor data breach	MEDIUM	LOW	Acceptable

RISK ASSESSMENT CONCLUSION
After applying mitigation measures, seven of eight identified risks are rated LOW (acceptable). One risk — BIPA class action (R6) — remains MEDIUM. This residual risk is inherent to any virtual try-on service operating in the US market and cannot be fully eliminated. The comprehensive BIPA consent framework, transient processing model, and publicly available biometric policy represent the strongest available mitigation.
No risks require consultation with the ICO under Article 36 UK GDPR (prior consultation is required only where high risks cannot be mitigated).

 
5. Measures and Safeguards Summary

Category	Measure	Status
Legal	Explicit consent obtained before photo upload (Article 9(2)(a))	Implemented (in EULA consent flow)
Legal	Data Processing Agreement with merchants (Article 28)	Drafted (v1.0)
Legal	Sub-processor agreements (Google Cloud DPA)	In place (Google standard terms)
Legal	BIPA-compliant geo-targeted consent flow for US users	Implemented (in EULA Part D)
Legal	Biometric Data Retention and Destruction Policy (publicly available)	Drafted (v1.0)
Legal	ICO registration	TO DO — Must complete before launch
Transparency	Layered privacy notice (at-a-glance + full notice)	Drafted (in EULA Part B + Privacy Policy)
Transparency	AI-generated content disclosure	Implemented (in EULA + widget UI)
Transparency	Controller/processor roles clearly identified	Implemented (in Privacy Policy + DPA)
Technical	TLS/HTTPS encryption for all data in transit	Implemented
Technical	Transient photo processing with daily automated deletion	Implemented
Technical	Session-scoped rate limiting (IP)	Implemented
Technical	OAuth 2.0 authentication (no stored credentials)	Implemented
Technical	GCP IAM access controls on storage bucket	Implemented
Technical	No biometric template extraction or storage	By design
Technical	Graceful degradation when AI Service unavailable	Implemented
Organisational	DPIA completed (this document)	Drafted (v1.0)
Organisational	Record of Processing Activities (ROPA)	To be drafted
Organisational	Data Breach Response Plan	To be drafted
Organisational	Annual review of DPIA and security measures	Scheduled for February 2027
Organisational	Staff confidentiality obligations	In place

6. Consultation
6.1 Internal Consultation
This DPIA has been prepared by Sydney George Stones (Co-Founder & Director) with reference to the Company’s technical architecture, legal obligations, and business requirements.

6.2 External Consultation
•	Stobbs IP (intellectual property and legal advisers): Consulted on legal framework and compliance strategy.
•	Keith (St Andrews University Entrepreneurship Centre): Consulted on business strategy and risk management.
•	DigitalSuits (development agency): Consulted on technical architecture, data flows, and implementation feasibility.

6.3 Data Subject Consultation
Direct consultation with data subjects (customers) has not been carried out at this stage, as the App has not yet launched. However, the following measures serve as proxies for data subject views:
•	The consent flow is designed to be maximally transparent, giving customers full information before they make a choice.
•	The feature is entirely optional — no customer is required to use it.
•	Merchant feedback from founding brands has informed the design of the consent UX to balance transparency with usability.
•	Post-launch, customer feedback will be monitored and the consent flow will be adjusted if concerns arise.

6.4 ICO Prior Consultation (Article 36)
Based on the risk assessment in Section 4, no risks remain HIGH after mitigation. Prior consultation with the ICO under Article 36 UK GDPR is therefore not required at this time. If the residual risk profile changes materially (for example, if the App scales to very large volumes or if the BIPA regulatory landscape deteriorates), this assessment will be revisited.

7. Recommended Actions

Action	Priority	Owner	Deadline
Complete ICO registration	CRITICAL	Sydney Stones	Before launch
Confirm GCP hosting region with DigitalSuits	HIGH	Sydney Stones / DigitalSuits	Before launch
Confirm Google Gemini API processing region	HIGH	Sydney Stones / DigitalSuits	Before launch
Implement AI-generated content label/badge on VTO images	MEDIUM	DigitalSuits	Before launch (future-proofing for EU AI Act)
Draft Data Breach Response Plan	HIGH	Sydney Stones	Within 30 days of launch
Draft Record of Processing Activities (ROPA)	HIGH	Sydney Stones	Before launch
Monitor BIPA litigation landscape quarterly	ONGOING	Sydney Stones	Quarterly
Annual DPIA review	STANDARD	Sydney Stones	February 2027
Consider annual BIPA consent re-affirmation mechanism	MEDIUM	DigitalSuits	Within 6 months of US market launch

8. Sign-Off

Role	Name	Signature	Date
DPIA Author / Director	Sydney George Stones	[Signature]	[Date]
Co-Director	Sienna Olivia Stones	[Signature]	[Date]

This DPIA should be reviewed and updated whenever there is a material change to the processing operations described herein, or at least annually (next review: February 2027).


End of Data Protection Impact Assessment — Version 1.0 — February 2026
