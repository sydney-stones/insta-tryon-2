





RENDERED FITS LTD
Information Security Policy & Data Breach Response Plan



Field	Detail
Document owner	Sydney George Stones, Co-Founder & Director
Organisation	Rendered Fits Ltd (Company No. 16922551)
Version	1.0
Date	February 2026
Classification	INTERNAL — CONFIDENTIAL
Next review	August 2026


mail@renderedfits.com | renderedfits.com
 
PART 1: INFORMATION SECURITY POLICY

1. Purpose
This Information Security Policy establishes the principles, standards, and responsibilities for protecting information assets, personal data, and systems managed by Rendered Fits Ltd (“the Company”). It applies to all directors, employees, contractors, and third-party service providers who access, process, or manage Company information and systems.

2. Scope
This Policy covers all information assets, including:
•	Customer data processed through the Rendered Fits virtual try-on application (the “App”), including customer photographs, session data, and derived analytics
•	Merchant data received via Shopify’s APIs, including shop domains, billing data, and order identifiers
•	Application source code, configuration files, API credentials, and deployment infrastructure
•	Cloud infrastructure (Google Cloud Platform), third-party API integrations (Google Gemini, Shopify), and internal tools
•	Corporate information including business plans, financial records, and communications

3. Information Classification
Classification	Description	Examples	Handling Requirements
CONFIDENTIAL	Highly sensitive. Unauthorised disclosure could cause significant harm.	API keys, OAuth tokens, database credentials, DPIA, financial records, customer photographs (during processing)	Encrypted at rest and in transit. Access restricted to named individuals. Never stored in plaintext. Never shared externally without authorisation.
INTERNAL	For internal use only. Not for public disclosure.	Source code, internal policies, analytics data, merchant account details, development documentation	Access restricted to authorised personnel. Not to be shared externally without approval.
PUBLIC	Intended for or available to the public.	Published privacy policies, terms of use, biometric policy, marketing materials, App Store listing	No access restrictions. Must be accurate and up to date.

4. Access Control
4.1	Access to production systems, cloud infrastructure, and data stores shall be granted on a need-to-know, least-privilege basis.
4.2	All administrative access to Google Cloud Platform requires multi-factor authentication (MFA).
4.3	API credentials (Shopify API keys, Google Gemini API keys) shall be stored in environment variables or secret management services, never in source code, version control, or plaintext configuration files.
4.4	Shopify Merchant authentication is handled entirely through Shopify’s OAuth 2.0 Token Exchange. No separate Merchant credentials are stored by the Company.
4.5	DigitalSuits (development agency) does not have access to production data, production databases, or production API credentials. Development and staging environments use separate credentials and synthetic data.
4.6	Access rights shall be reviewed at least quarterly. Access shall be revoked immediately upon termination of an individual’s engagement with the Company.

5. Encryption
5.1	All data transmitted between systems shall be encrypted using TLS 1.2 or higher (HTTPS).
5.2	Data at rest in Google Cloud Storage shall be encrypted using GCP’s default server-side encryption (AES-256).
5.3	No personal data shall be transmitted in plaintext under any circumstances.

6. Application Security
6.1	The App shall follow secure coding practices aligned with OWASP guidelines, including protection against the OWASP Top 10 vulnerabilities (injection, broken authentication, XSS, etc.).
6.2	Shopify’s Consent Tracking API (Customer Privacy API) shall be integrated as required by Shopify’s API Terms.
6.3	All Shopify webhooks shall be verified using HMAC signature validation before processing.
6.4	Rate limiting shall be implemented to prevent abuse of the Virtual Try-On Feature and API endpoints.
6.5	Dependencies and third-party libraries shall be monitored for known vulnerabilities and updated promptly.

7. Data Minimisation and Transient Processing
7.1	The Company shall collect only the minimum personal data necessary for each processing purpose, in accordance with the data minimisation principle (Article 5(1)(c) UK GDPR).
7.2	Customer photographs shall be processed transiently. They shall be cached only for the duration of the active session and permanently deleted by the automated cleanup function (running every hour).
7.3	No biometric identifiers or biometric templates shall be extracted, created, or stored from customer photographs at any point.
7.4	No backup, archive, or shadow copy of customer photographs or generated images shall be created or retained.

8. Third-Party and Sub-Processor Security
8.1	All sub-processors shall be subject to data processing agreements imposing security obligations no less protective than those in this Policy.
8.2	Sub-processors shall be selected based on their security posture, certifications (ISO 27001, SOC 2, etc.), and contractual commitments.
8.3	The Sub-Processor Register shall be maintained and reviewed at least every six months.

9. Physical Security
The Company does not maintain physical server infrastructure. All production systems are hosted on Google Cloud Platform, which maintains physical security controls certified to ISO 27001, SOC 2 Type II, and other standards. Company directors access systems from secure personal devices with full-disk encryption and screen locks enabled.

10. Incident Management
All security incidents, suspected breaches, and vulnerabilities shall be managed in accordance with the Data Breach Response Plan set out in Part 2 of this document.

11. Training and Awareness
11.1	All individuals with access to personal data or production systems shall be made aware of this Policy and their responsibilities under it.
11.2	The Company shall maintain awareness of evolving security threats, regulatory changes, and best practices relevant to its operations.

12. Policy Review
This Policy shall be reviewed at least every six months or whenever a material change to the Company’s systems, processing activities, or threat landscape occurs. The next scheduled review is August 2026.

 
PART 2: DATA BREACH RESPONSE PLAN

CRITICAL TIMELINES
•  Internal escalation: IMMEDIATELY upon discovery
•  Notify affected Merchant Controllers: Within 48 HOURS
•  ICO notification (if required): Within 72 HOURS
•  Data subject notification (if required): WITHOUT UNDUE DELAY

1. Purpose and Scope
This Data Breach Response Plan establishes procedures for identifying, containing, assessing, reporting, and remediating personal data breaches in accordance with Articles 33 and 34 of the UK GDPR, the DPA with Merchants, and applicable US state breach notification laws.
A “personal data breach” means a breach of security leading to the accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to, personal data transmitted, stored, or otherwise processed.

2. Breach Response Team
Role	Name	Responsibilities
Incident Lead	Sydney George Stones	Overall coordination of breach response. Decision-maker on containment, notification, and escalation. Primary contact for ICO.
Communications Lead	Sienna Olivia Stones	Drafting and issuing notifications to affected Merchants, data subjects (if required), and press/public (if required).
Technical Lead	[DigitalSuits contact / future CTO]	Technical investigation, containment, and remediation. Log analysis, system forensics, and patching.

3. Breach Detection and Reporting
Breaches may be detected through:
•	Automated monitoring and alerting (GCP security alerts, unusual API activity, failed authentication attempts)
•	Manual discovery by Company personnel
•	Reports from Merchants, Customers, or third parties
•	Notification from a sub-processor (Google, Shopify)
•	Notification from a regulatory authority or law enforcement

Any individual who becomes aware of a suspected or confirmed breach must report it immediately to the Incident Lead (Sydney Stones) at mail@renderedfits.com or via the fastest available communication channel.

4. Breach Response Procedure

Phase 1: Containment (0–24 hours)
IMMEDIATE ACTIONS
1.  Assess scope: What data is affected? How many data subjects? Is the breach ongoing?
2.  Contain: Stop the breach. Revoke compromised credentials. Isolate affected systems. Block malicious access.
3.  Preserve evidence: Capture logs, screenshots, and system states before remediation.
4.  Activate Breach Response Team: Notify all team members. Begin breach log.

Phase 2: Assessment (0–48 hours)
The Incident Lead shall assess:
•	Nature of the breach: accidental disclosure, unauthorised access, ransomware, data loss, system compromise, etc.
•	Categories of personal data affected: customer photographs, IP addresses, session data, merchant account data, etc.
•	Number of data subjects affected (or estimated range)
•	Whether special category data (biometric data / photographs) is involved
•	Likely consequences for data subjects: identity theft risk, emotional distress, financial loss, discrimination risk, etc.
•	Whether the breach is likely to result in a risk to the rights and freedoms of data subjects (triggering ICO notification) or a HIGH risk (triggering data subject notification)

Phase 3: Notification (48–72 hours)

A. Notification to Merchant Controllers (within 48 hours)
Where the Company is acting as a data processor, it shall notify the affected Merchant Controller(s) within 48 hours of becoming aware of a breach, in accordance with DPA Clause 8. The notification shall include:
•	Description of the nature of the breach
•	Categories and approximate number of data subjects and records affected
•	Contact details of the Company’s Incident Lead
•	Likely consequences of the breach
•	Measures taken or proposed to address the breach

B. ICO Notification (within 72 hours, if required)
Where the Company is acting as a data controller (e.g., for Merchant account data), or where instructed by the Merchant Controller, the Company shall notify the ICO within 72 hours of becoming aware of the breach, unless the breach is unlikely to result in a risk to the rights and freedoms of data subjects.
ICO breach notification portal: ico.org.uk/make-a-complaint/data-protection-complaints/data-protection-complaints/
The notification shall contain the information required by Article 33(3) UK GDPR.

C. Data Subject Notification (without undue delay, if required)
Where the breach is likely to result in a HIGH risk to the rights and freedoms of data subjects, the Company shall (or shall assist the Merchant Controller to) notify affected data subjects without undue delay. The notification shall be in clear, plain language and shall include:
•	Description of the breach in plain language
•	Contact details for further information
•	Likely consequences
•	Measures taken to mitigate the breach and steps data subjects can take to protect themselves

D. US State Breach Notification
If the breach involves personal information of US residents, applicable state breach notification laws may impose additional requirements. Key considerations:
•	Illinois: BIPA does not have a separate breach notification provision, but the Illinois Personal Information Protection Act (815 ILCS 530) requires notification to residents in the most expedient time possible, without unreasonable delay
•	California: CCPA/CPRA requires notification when unencrypted personal information is compromised; notification within the most expedient time possible
•	Other states: 50 US states have individual breach notification laws with varying timelines (typically 30–60 days). The Company shall comply with the notification requirements of each applicable state.

Phase 4: Remediation and Recovery
•	Implement technical fixes to address the root cause of the breach
•	Rotate all potentially compromised credentials (API keys, OAuth tokens, etc.)
•	Patch vulnerabilities and update affected systems
•	Verify that containment measures are effective and the breach has been fully resolved
•	Restore affected services to normal operation

Phase 5: Post-Incident Review
Within 14 days of the breach being resolved, the Incident Lead shall conduct a post-incident review covering:
•	Root cause analysis: what happened, how, and why
•	Timeline of events: detection, containment, assessment, notification, remediation
•	Effectiveness of the response: what worked well, what could be improved
•	Lessons learned and corrective actions
•	Updates required to this Breach Response Plan, the Information Security Policy, or other documents
•	Whether the DPIA risk assessment needs to be updated

5. Breach Severity Classification
Severity	Description	Example	Notification Required?
CRITICAL	Large-scale exposure of special category data (photographs, biometric data) or data enabling identity theft	Attacker gains access to GCP storage bucket containing cached customer photographs	YES: ICO within 72 hours. Merchant Controllers within 48 hours. Data subjects without undue delay.
HIGH	Exposure of personal data likely to cause significant distress or harm to data subjects	Merchant account data (including billing information) disclosed to unauthorised third party	YES: ICO within 72 hours. Merchant Controllers within 48 hours. Data subjects if high risk.
MEDIUM	Limited exposure of personal data with low likelihood of harm	Temporary logging error exposes IP addresses in application logs accessible to development team	Merchant Controllers within 48 hours. ICO notification assessed on case-by-case basis.
LOW	Technical security incident with no confirmed exposure of personal data	Failed brute-force attack on admin interface; no data accessed	No external notification required. Logged internally. Corrective action taken.

6. Breach Log
All suspected and confirmed breaches shall be recorded in the Breach Log, regardless of severity. The Breach Log shall contain:
•	Date and time of discovery
•	Description of the incident
•	Severity classification
•	Data affected and number of data subjects
•	Containment actions taken
•	Assessment outcome (risk to rights and freedoms)
•	Notification decisions and dates (ICO, Controllers, data subjects)
•	Remediation actions and completion dates
•	Post-incident review findings

The Breach Log shall be maintained securely and made available to the ICO upon request. It shall be retained for a minimum of five (5) years.

7. Mitigating Factor: Transient Processing Model
KEY MITIGATING FACTOR
The Company’s transient processing model significantly reduces the risk and impact of data breaches involving customer photographs. Because photographs are cached only for the duration of the active session and are automatically deleted within one hour of session expiry:
•  The window of vulnerability is extremely narrow (minutes to one hour)
•  The volume of data at risk at any given moment is minimal
•  No permanent database of photographs exists to be compromised
•  No biometric templates exist to be stolen or misused

8. Plan Testing
This Breach Response Plan shall be tested at least annually through a tabletop exercise simulating a data breach scenario. The first test shall be conducted within six months of the App’s launch. Results of the test shall be documented and any improvements incorporated into the Plan.

9. Document Sign-Off

Role	Name	Signature	Date
Incident Lead / Director	Sydney George Stones	[Signature]	[Date]
Communications Lead / Director	Sienna Olivia Stones	[Signature]	[Date]


End of Information Security Policy & Data Breach Response Plan — Version 1.0 — February 2026
