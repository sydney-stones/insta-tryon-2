





RENDERED FITS LTD
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
1.1	This Biometric Data Retention and Destruction Policy (“Policy”) is published by Rendered Fits Ltd (“we”, “us”, “our”, or the “Company”) in compliance with the Illinois Biometric Information Privacy Act (740 ILCS 14), Section 15(a), which requires a private entity in possession of biometric identifiers or biometric information to develop and make available to the public a written policy establishing a retention schedule and guidelines for permanently destroying biometric identifiers and biometric information.
1.2	This Policy also addresses the requirements of the Texas Capture or Use of Biometric Identifier Act (Tex. Bus. & Com. Code § 503.001), the Washington Biometric Privacy Protection Act (RCW 19.375), and other applicable US state biometric privacy laws.
1.3	This Policy applies to all biometric data that may be processed in connection with the Rendered Fits virtual try-on application (the “App”), which is available to Shopify merchants via the Shopify App Store.

2. Definitions
2.1	For the purposes of this Policy:
(a)	“Biometric identifier” means a retina or iris scan, fingerprint, voiceprint, or scan of hand or face geometry, as defined under BIPA Section 10.
(b)	“Biometric information” means any information, regardless of how it is captured, converted, stored, or shared, based on an individual’s biometric identifier used to identify an individual, as defined under BIPA Section 10.
(c)	“Customer photograph” means a photograph uploaded by an end user (a customer of a Shopify merchant) to the App’s Virtual Try-On Feature.
(d)	“Virtual Try-On Feature” means the functionality of the App that enables end users to upload a photograph of themselves and receive an AI-generated image depicting the end user wearing a product from the merchant’s store.
(e)	“Session” means the period during which an end user actively interacts with the Virtual Try-On Feature, as tracked by a session identifier stored in the end user’s browser.
(f)	“AI Service” means the third-party artificial intelligence service used by the App to generate virtual try-on images (currently Google’s Gemini API).

3. What Biometric Data We Process
3.1	The App processes customer photographs through the Virtual Try-On Feature. In the course of generating a virtual try-on image, the AI Service may analyse the facial features contained in the customer’s photograph. To the extent that such processing constitutes the collection of biometric identifiers or biometric information under applicable law, the following applies:

Data Type	Description	Biometric Classification
Customer photograph (facial image)	A photograph uploaded by the end user, containing the end user’s face and body	May constitute a biometric identifier to the extent that facial geometry is analysed by the AI Service during image generation
AI processing of facial features	The AI Service analyses the photograph to map the end user’s appearance onto product imagery	May constitute biometric information derived from the biometric identifier (facial geometry)
Generated virtual try-on image	The AI-generated composite image showing the end user wearing a product	Contains a representation of the end user’s likeness but is an AI-generated image, not a biometric template

3.1 What We Do NOT Process or Store
We wish to be unequivocally clear about the following:
•	We do NOT extract, create, compute, or store any facial geometry template, faceprint, or biometric template from customer photographs at any point during processing.
•	We do NOT create or maintain any database of biometric identifiers or biometric information.
•	We do NOT use facial recognition technology to identify or verify the identity of any individual.
•	We do NOT compare customer photographs against any database of images or biometric records.
•	We do NOT use customer photographs or derived data for profiling, automated decision-making, or any purpose other than generating the requested virtual try-on image.

4. Retention Schedule
4.1	The following retention schedule applies to all biometric data and related data processed in connection with the Virtual Try-On Feature:

Data Type	Retention Period	Maximum Retention	Trigger for Destruction
Customer photograph (original upload)	Transient. Cached temporarily in cloud storage during the active session only.	No more than the duration of the active session plus twenty four (24) hours (the interval of the automated cleanup cycle)	Session expiry triggers automated cleanup
AI-processed data (facial feature analysis within Google Gemini API)	Transient. Processed in real-time within the API call. Google’s paid API does not retain prompts or responses for model training.	Duration of the API call (seconds)	Completion of the API response
Generated virtual try-on image	Transient. Cached temporarily in cloud storage during the active session only.	No more than the duration of the active session plus twenty four (24) hours	Session expiry triggers automated cleanup
Session identifier	Stored in the end user’s browser localStorage	Until cleared by the end user or browser data expiry	End user action (clearing browser data)
Consent records (timestamp, session ID)	Retained for the duration of the Merchant’s active subscription for compliance audit purposes	Duration of Merchant’s subscription plus ninety (90) days for deletion processing	Merchant uninstalls the App (triggers Shopify shop/redact webhook)

4.2	Under no circumstances shall biometric identifiers or biometric information (being customer photographs and any data derived from the AI Service’s analysis of facial features) be retained for longer than three (3) years from the date of the individual’s last interaction with the Virtual Try-On Feature, which is the maximum retention period permitted under BIPA Section 15(a). In practice, our actual retention period is vastly shorter — typically less than twenty four (24) hours.
4.3	In the event that the initial purpose for collecting or obtaining biometric data has been satisfied (i.e., the virtual try-on image has been generated and delivered to the end user’s browser), the biometric data shall be destroyed in accordance with the destruction guidelines set out in Section 5 below, regardless of whether the maximum retention period has elapsed.

5. Guidelines for Permanent Destruction
5.1	The Company implements the following measures for the permanent destruction of biometric data:

5.1 Automated Session Cleanup
5.2	A scheduled cleanup function runs on the App’s cloud infrastructure at a frequency of every twenty four (24) hours. This function:
(a)	identifies all session data associated with expired sessions;
(b)	permanently deletes all cached customer photographs associated with expired sessions from cloud storage;
(c)	permanently deletes all cached generated virtual try-on images associated with expired sessions from cloud storage; and
(d)	logs the deletion event (without logging the content of the deleted data) for internal audit purposes.

5.2 AI Service Processing
5.3	Customer photographs transmitted to the AI Service (Google Gemini API) are processed in real-time. Under Google’s Cloud Data Processing Addendum for paid API usage:
(a)	Google does not use prompts (including customer photographs) or responses (including generated images) to train, improve, or develop its AI models;
(b)	processing is transient and occurs within the duration of the API call; and
(c)	Google’s data processing terms prohibit the retention of prompt data beyond the time necessary to deliver the API response, subject to limited exceptions for abuse monitoring and legal compliance.

5.3 App Uninstallation
5.4	When a Merchant uninstalls the App from their Shopify store:
(a)	Shopify triggers a mandatory GDPR shop/redact webhook;
(b)	the App receives and processes this webhook, deleting all data associated with the Merchant, including any residual session data, consent records, and analytics data; and
(c)	deletion is completed within ninety (90) days of receiving the webhook.

5.4 Manual Deletion Requests
5.5	Any individual may request the deletion of their data by contacting the Company at mail@renderedfits.com. Given the transient nature of our processing, in most cases the data will already have been automatically destroyed before the request is received. Where data has not yet been destroyed, the Company shall process the request without undue delay and confirm deletion in writing.

5.5 Destruction Standard
5.6	All destruction of biometric data is carried out using methods that render the data permanently irrecoverable. Specifically:
(a)	cloud storage objects are permanently deleted using the cloud provider’s standard deletion API, which marks the storage blocks for overwriting and prevents recovery;
(b)	session-scoped data stored in the rate-limiting system expires automatically and is overwritten in the normal course of system operation; and
(c)	no backup, archive, or shadow copy of customer photographs or generated images is created or retained.

6. Consent and Notice
6.1	Before any customer photograph is collected or processed through the Virtual Try-On Feature, the end user is provided with:
(a)	written notice (displayed within the Virtual Try-On widget) that facial features contained in their photograph may be analysed in the course of generating the virtual try-on image;
(b)	written notice of the specific purpose of such analysis (solely to generate a virtual try-on image);
(c)	written notice of the retention period (transient, with automatic destruction upon session expiry);
(d)	written notice that biometric data will not be sold, leased, traded, or otherwise disclosed to third parties (except to Google’s AI service for the sole purpose of generating the try-on image);
(e)	a link to this Policy; and
(f)	a requirement to provide explicit written consent before the photograph upload function is enabled.
6.2	Consent is obtained separately from general terms acceptance through a disclaimer that reads: “By uploading your photo, you agree to our Terms & Conditions and Privacy Policy. Your image is processed securely and is never permanently stored.”
6.3	The Company does not collect, capture, or otherwise obtain biometric identifiers or biometric information without first providing written notice and obtaining written consent as described above.

7. Prohibition on Sale, Lease, Trade, and Disclosure
7.1	The Company shall not sell, lease, trade, or otherwise profit from any individual’s biometric identifiers or biometric information.
7.2	The Company shall not disclose, redisclose, or otherwise disseminate any individual’s biometric identifier or biometric information to any third party, except:
(a)	to Google LLC (via the Gemini API) solely for the purpose of generating the requested virtual try-on image, with the individual’s written consent; or
(b)	as required by law, court order, or valid legal process, provided that the Company shall use reasonable efforts to notify the affected individual before making such disclosure (unless prohibited from doing so by law).

8. Security Measures
8.1	The Company protects biometric data using a standard of care that is the same as or more protective than the standard applied to other confidential and sensitive information, including:
(a)	encryption of all data in transit using TLS/HTTPS;
(b)	transient processing with automated deletion (the primary security measure — data that does not exist cannot be breached);
(c)	access controls restricting access to cloud infrastructure to authorised personnel only;
(d)	multi-factor authentication for administrative access;
(e)	use of reputable, audited cloud infrastructure providers (Google Cloud Platform) with ISO 27001, ISO 27017, ISO 27018, and SOC 2 Type II certifications; and
(f)	contractual data protection obligations imposed on all sub-processors.

9. Data Flow Summary
The following describes the complete lifecycle of a customer photograph through the Virtual Try-On Feature:

Step	Action	Data Location	Duration
1	End user views the Virtual Try-On widget and is presented with the consent notice	End user’s browser only	Until user action
2	End user selects and uploads a photograph from their device	Transmitted from browser to App backend via HTTPS	Seconds
3	Photograph is temporarily cached in cloud storage (GCP) and a session reference is created	GCP Cloud Storage (temporary cache)	Duration of session + max 24 hours
4	Photograph is transmitted to Google Gemini API along with the selected product image	Google Gemini API servers (transient processing)	Seconds (duration of API call)
5	Gemini API generates the virtual try-on composite image and returns it	Google Gemini API servers → App backend	Seconds
6	Generated image is delivered to the end user’s browser for display	End user’s browser + temporary cloud cache	Duration of session + max 24 hours
7	Session expires	N/A	N/A
8	Automated cleanup function runs (daily) and permanently deletes all cached photographs and generated images for expired sessions	Deletion from GCP Cloud Storage	Automated, within 24 hours of session expiry
9	No biometric data remains in any Company system	None	Permanent

10. Applicable Biometric Privacy Laws
This Policy is designed to comply with the following US state biometric privacy laws (among others):

Law	Jurisdiction	Key Requirements Addressed
Illinois Biometric Information Privacy Act (BIPA), 740 ILCS 14	Illinois	Section 15(a): Written retention/destruction policy (this Policy). Section 15(b): Written notice and written consent before collection. Section 15(c): Prohibition on sale/trade/profit. Section 15(d): Prohibition on disclosure without consent. Section 15(e): Reasonable security.
Texas Capture or Use of Biometric Identifier Act (CUBI), Tex. Bus. & Com. Code § 503.001	Texas	Notice and consent before capture. Prohibition on sale/disclosure. Destruction within reasonable time (our transient processing satisfies this). Storage with reasonable care.
Washington Biometric Privacy Protection Act (BPPA), RCW 19.375	Washington	Notice of collection. Consent before collection. Restrictions on commercial purpose. Security measures.
California Consumer Privacy Act / California Privacy Rights Act (CCPA/CPRA)	California	Biometric information classified as sensitive personal information. Right to know, delete, and limit use. No sale of sensitive personal information.
Colorado AI Act (effective Feb 2026)	Colorado	Disclosure requirements for high-risk AI systems using biometric data. Risk management obligations.

This list is not exhaustive. The Company monitors developments in US state biometric privacy legislation and will update this Policy as necessary to maintain compliance with new and amended laws.

11. Policy Review and Updates
11.1	This Policy shall be reviewed at least annually by the Company’s management to ensure it remains accurate, complete, and compliant with applicable laws.
11.2	This Policy may be updated from time to time. Material updates will be reflected in the “Last Updated” date at the top of this Policy. The Company shall notify Merchants of material changes through in-app notifications or email.
11.3	This Policy is published at renderedfits.com/legal/biometric-policy and is freely accessible to the public at all times, as required by BIPA Section 15(a).

12. Contact Information
If you have any questions about this Policy, or wish to exercise your rights in relation to biometric data, please contact:

Rendered Fits Ltd
Email: mail@renderedfits.com
Post: 50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ, United Kingdom

You may also contact the Merchant whose store you used the Virtual Try-On Feature on, as the Merchant is the data controller for your data.


End of Biometric Data Retention and Destruction Policy — Version 1.0 — February 2026
