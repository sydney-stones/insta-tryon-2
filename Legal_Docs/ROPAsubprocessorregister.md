





RENDERED FITS LTD
Record of Processing Activities & Sub-Processor Register

Pursuant to Article 30 of the UK GDPR and EU GDPR



Field	Detail
Document title	Record of Processing Activities (ROPA) & Sub-Processor Register
Organisation	Rendered Fits Ltd (Company No. 16922551)
Document owner	Sydney George Stones, Co-Founder & Director
Version	1.0
Date	February 2026
Classification	INTERNAL
Next review	August 2026 (or upon material change to processing)


Rendered Fits Ltd
50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ
mail@renderedfits.com
 
PART 1: RECORD OF PROCESSING ACTIVITIES
Required under Article 30 of the UK GDPR and EU GDPR

A. Controller / Processor Details

Organisation name	Rendered Fits Ltd
Company number	16922551
VAT number	510026164
Registered address	50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ, United Kingdom
Contact email	mail@renderedfits.com
Directors	Sydney George Stones, Sienna Olivia Stones
ICO registration number	[TO BE OBTAINED PRIOR TO LAUNCH]
Role	Data Controller (for Merchant account data) and Data Processor (for End User data processed on behalf of Merchants)
EU representative (if applicable)	Not applicable at this time. To be appointed if required as the business scales within the EU (Article 27 EU GDPR).
Data Protection Officer	Not appointed. The Company does not meet the thresholds requiring a DPO under Article 37 UK GDPR. This will be reassessed as the business scales.

B. Processing Activities — As Data Controller
These are activities where Rendered Fits determines the purposes and means of processing.

B.1: Merchant Account Management
Processing activity	Managing Merchant accounts, subscriptions, and billing
Purpose of processing	Authenticating Merchants via Shopify OAuth; managing subscription plans and billing via Shopify Billing API; enforcing plan-level usage limits; providing analytics dashboard
Categories of data subjects	Shopify Merchants who install the App (individuals or sole traders whose shop data constitutes personal data)
Categories of personal data	Shop domain, shop ID, subscription plan tier, billing period, usage counts (try-on generations consumed), aggregated analytics (conversion rate, attributed revenue)
Legal basis (Article 6)	Article 6(1)(b) — Performance of a contract (the Merchant Agreement)
Special category data?	No
Recipients / categories of recipients	Shopify Inc. (platform provider, billing processor)
International transfers	Yes — Shopify processes data in Canada and the United States. Transfer mechanism: Shopify DPA with Standard Contractual Clauses; Canada adequacy decision (EU).
Retention period	For the duration of the Merchant’s active subscription. Deleted upon App uninstallation via Shopify’s GDPR shop/redact webhook, within 90 days.
Technical and organisational measures	Shopify OAuth 2.0 authentication; HTTPS/TLS encryption; access restricted to authorised personnel; no separate credentials stored

B.2: GDPR Webhook Compliance
Processing activity	Responding to Shopify’s mandatory GDPR compliance webhooks
Purpose of processing	Fulfilling legal obligations under data protection laws: responding to customer data requests, customer data erasure requests, and shop data erasure requests
Categories of data subjects	Customers of Merchants (via customers/data_request and customers/redact webhooks); Merchants (via shop/redact webhook)
Categories of personal data	Customer identifiers provided by Shopify in the webhook payload; Merchant store data
Legal basis (Article 6)	Article 6(1)(c) — Legal obligation (compliance with UK GDPR / EU GDPR)
Special category data?	No (webhook payloads contain identifiers only, not photographs)
Recipients	None (data is deleted, not shared)
International transfers	No (webhooks are received from Shopify and processed internally)
Retention period	Webhook processing logs retained for 90 days for compliance audit purposes, then deleted
Technical and organisational measures	Webhook signature verification; HTTPS endpoints; automated processing pipeline

 
C. Processing Activities — As Data Processor
These are activities where Rendered Fits processes personal data on behalf of the Merchant (Controller), governed by the Data Processing Agreement.

C.1: Virtual Try-On Image Generation
Processing activity	Collecting and processing customer photographs to generate AI virtual try-on images
Controller	The Merchant whose store the customer visits
Purpose of processing	Generating an AI virtual try-on image showing the customer wearing a product from the Merchant’s store
Categories of data subjects	End Users (customers of the Merchant) who interact with the Virtual Try-On Feature
Categories of personal data	Customer photographs (facial images); IP addresses (for rate limiting)
Special category data?	Potentially. Customer photographs may constitute biometric data (Article 9 UK GDPR) to the extent that the AI Service analyses facial features. Processed under Article 9(2)(a) — explicit consent.
Legal basis (Article 6)	Article 6(1)(a) — Consent of the data subject (obtained via in-widget consent mechanism before photo upload)
Additional legal basis (Article 9)	Article 9(2)(a) — Explicit consent for processing of special category data
Recipients / sub-processors	Google LLC (Gemini API) — receives photographs for AI generation. Google Cloud Platform — temporary file caching.
International transfers	Yes — photographs transmitted to Google Gemini API servers, which may be located outside the UK/EEA (including the United States). Transfer mechanism: EU-U.S. Data Privacy Framework; Google Cloud DPA with SCCs.
Retention period	TRANSIENT. Photographs cached in cloud storage during the active session only. Permanently deleted by automated cleanup function running every 24 hours. No long-term storage. No biometric templates extracted or stored.
Technical and organisational measures	Explicit consent before upload; HTTPS/TLS encryption in transit; GCP IAM access controls; automated daily deletion; no biometric template extraction; session-scoped processing; rate limiting

C.2: Rate Limiting
Processing activity	Recording IP addresses to enforce per-session rate limits on Virtual Try-On generations
Controller	The Merchant
Purpose of processing	Preventing abuse of the Virtual Try-On Feature and protecting system resources
Categories of data subjects	End Users who interact with the Virtual Try-On Feature
Categories of personal data	IP addresses
Special category data?	No
Legal basis (Article 6)	Article 6(1)(f) — Legitimate interests (preventing abuse; protecting system integrity)
Recipients / sub-processors	None (processed internally within the App’s rate-limiting system)
International transfers	Dependent on hosting region of the rate-limiting system (Redis on GCP). [TO BE CONFIRMED with DigitalSuits]
Retention period	Session-scoped. Records expire automatically when the session ends. No long-term storage.
Technical and organisational measures	Session-scoped automatic expiry; no persistent logging of IP addresses beyond rate-limiting purpose

C.3: Conversion Attribution
Processing activity	Matching completed purchases to virtual try-on sessions to enable Merchants to measure ROI
Controller	The Merchant
Purpose of processing	Attributing completed orders to virtual try-on sessions; calculating and displaying conversion metrics on the Merchant’s analytics dashboard
Categories of data subjects	End Users who use the Virtual Try-On Feature and subsequently complete a purchase
Categories of personal data	Session identifiers (stored in browser localStorage); order identifiers (order ID, cart token) received via Shopify webhook; product handles in cart attributes
Special category data?	No
Legal basis (Article 6)	Article 6(1)(f) — Legitimate interests (enabling Merchants to measure the effectiveness and ROI of the Virtual Try-On Feature)
Recipients / sub-processors	Shopify Inc. (delivers order webhooks containing order identifiers)
International transfers	No additional transfers beyond those already described for Shopify
Retention period	Order identifiers and session attribution data retained as aggregated analytics for the duration of the Merchant’s active subscription. Deleted upon App uninstallation via shop/redact webhook.
Technical and organisational measures	Pseudonymous session IDs (no direct personal identifiers); aggregated analytics only; no individual customer profiles created; HTTPS/TLS encryption

 
D. General Information

D.1: Description of Technical and Organisational Security Measures (Article 30(1)(g) / 30(2)(d))
The following measures apply across all processing activities:
•	Encryption in transit: All data transmitted via HTTPS/TLS
•	Authentication: Shopify OAuth 2.0 Token Exchange (no stored credentials)
•	Access controls: GCP IAM policies restricting access to authorised personnel
•	Administrative security: Multi-factor authentication for cloud infrastructure access
•	Transient processing: Customer photographs automatically deleted within 24 hours of session expiry
•	Data minimisation: Only minimum necessary data collected for each purpose
•	No biometric extraction: No facial geometry templates or biometric identifiers created or stored
•	Sub-processor security: Google (ISO 27001, SOC 2 Type II); Shopify (SOC 2 Type II, PCI DSS Level 1)
•	Confidentiality: All personnel with data access bound by confidentiality obligations
•	Incident response: Data Breach Response Plan (to be documented) with 48-hour notification to Controllers and 72-hour notification to ICO

D.2: Data Protection Impact Assessment
A DPIA has been completed for the Virtual Try-On Feature (Activity C.1) in accordance with Article 35 UK GDPR. The DPIA is documented separately and concludes that the processing can proceed with the mitigation measures in place.

D.3: Review Schedule
This ROPA shall be reviewed and updated:
•	At least every six months (next review: August 2026)
•	Whenever a new processing activity is introduced
•	Whenever an existing processing activity is materially changed
•	Whenever a new sub-processor is engaged or an existing sub-processor is replaced
•	Following any Personal Data Breach

 
PART 2: SUB-PROCESSOR REGISTER
Maintained in accordance with the Data Processing Agreement, Clause 5

Current Sub-Processors
The following sub-processors are approved and currently engaged as at the date of this document:

Sub-Processor 1: Google LLC (Gemini API)
Legal entity	Google LLC (subsidiary of Alphabet Inc.)
Registered address	1600 Amphitheatre Parkway, Mountain View, CA 94043, United States
Processing activity	AI image generation: receives customer photographs and product images via the Gemini API; generates composite virtual try-on images; returns generated images to the App backend
Data processed	Customer photographs (facial images); product images. Transient processing — no long-term storage.
Processing location	[TO BE CONFIRMED — Google Cloud region for Gemini API calls]
Data transfer mechanism	EU-U.S. Data Privacy Framework (adequacy); Google Cloud Data Processing Addendum incorporating EU Standard Contractual Clauses (SCCs) and UK International Data Transfer Addendum
Data processing agreement	Google Cloud Data Processing Addendum (automatically applies to Google Cloud and Gemini API paid usage)
Key contractual terms	Paid API: Google does not use prompts or responses for model training. Google processes data as a data processor. Breach notification obligations included. Audit rights via SOC 2 / ISO reports.
Security certifications	ISO 27001, ISO 27017, ISO 27018, SOC 2 Type II, SOC 3, FedRAMP, PCI DSS
Date approved	February 2026 (initial DPA)
Review date	August 2026

Sub-Processor 2: Google Cloud Platform (GCP)
Legal entity	Google LLC (subsidiary of Alphabet Inc.)
Registered address	1600 Amphitheatre Parkway, Mountain View, CA 94043, United States
Processing activity	Cloud infrastructure hosting: temporary file storage (photo cache in Cloud Storage), application hosting (compute), rate-limiting database (Redis / Memorystore)
Data processed	Customer photographs (temporary cache); generated images (temporary cache); IP addresses (rate limiting); session data; Merchant account data
Processing location	[TO BE CONFIRMED — GCP hosting region(s)]
Data transfer mechanism	EU-U.S. Data Privacy Framework; Google Cloud DPA with SCCs and UK IDTA
Data processing agreement	Google Cloud Data Processing Addendum
Key contractual terms	Data processed as a sub-processor. Encryption at rest and in transit. Breach notification obligations. Deletion upon instruction.
Security certifications	ISO 27001, ISO 27017, ISO 27018, SOC 2 Type II, SOC 3, FedRAMP, PCI DSS
Date approved	February 2026 (initial DPA)
Review date	August 2026

Sub-Processor 3: Shopify Inc.
Legal entity	Shopify Inc.
Registered address	151 O’Connor Street, Ground Floor, Ottawa, Ontario, K2P 2L8, Canada
Processing activity	Platform hosting: Merchant authentication via OAuth 2.0; subscription billing via Billing API; webhook delivery (APP_SUBSCRIPTIONS_UPDATE, orders/create, GDPR compliance webhooks); App Store listing and distribution
Data processed	Merchant account data (shop domain, billing plan); order identifiers (order ID, cart token) via webhooks; GDPR webhook payloads (customer identifiers for data requests and erasure)
Processing location	Canada and United States
Data transfer mechanism	Canada: EU adequacy decision. United States: Shopify Data Processing Addendum incorporating Standard Contractual Clauses.
Data processing agreement	Shopify Partner Program Agreement and Shopify API Terms of Use (incorporate data processing terms)
Key contractual terms	Shopify acts as both an independent controller (for its own platform operations) and as a service provider to the App. Mandatory GDPR webhooks. API terms require Merchant Agreement.
Security certifications	SOC 2 Type II, PCI DSS Level 1
Date approved	February 2026 (initial partnership)
Review date	August 2026

Inactive / Development-Phase Sub-Processors
The following entities had access to development or staging environments during the App’s build phase but do not have access to production data or production systems:

DigitalSuits (Development Agency)
Legal entity	DigitalSuits
Location	Ukraine
Role during development	Software development, testing, and deployment of the App in development and staging environments
Production data access	NONE. DigitalSuits does not have access to production data, production databases, production cloud storage, or production API credentials.
Current status	Development phase complete. No ongoing production access. If production access is required for maintenance, the Controller(s) will be notified in accordance with DPA Clause 5.4.
IP assignment	Full intellectual property rights assigned to Rendered Fits Ltd under the development contract

Sub-Processor Change Log
Any changes to the sub-processor register will be recorded below and notified to Merchants in accordance with DPA Clause 5.4:

Date	Change	Sub-Processor	Action	Merchant Notification
February 2026	Initial register	Google LLC, GCP, Shopify Inc.	Approved at DPA inception	Included in DPA Annex 2
[Future date]	[Description of change]	[Name]	[Added / Removed / Replaced]	[Date notified]


Document Sign-Off

Role	Name	Signature	Date
Document Owner / Director	Sydney George Stones	[Signature]	[Date]
Co-Director	Sienna Olivia Stones	[Signature]	[Date]


End of Record of Processing Activities & Sub-Processor Register — Version 1.0 — February 2026
