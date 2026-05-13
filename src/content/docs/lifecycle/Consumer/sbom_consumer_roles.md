---
title: SBOM Companion artifacts: VEX, VDR, attestations, HBOM, SaaSBOM, AI/ML-BOM, CBOM
description: Article describes the artifacts related to SBOM that enhance the SBOM usability.
template: splash
---

# Organizational Roles, Governance, and Program Design

Tools and standards do not run an SBOM program. People do. Most writing about SBOM receiving assumes a software-producing organization: one with developers, a security team, a procurement function, and a legal department that can be assigned distinct roles. That assumption is wrong for the majority of organizations that will actually receive SBOMs.

A four-person accounting practice in a small town receives software from its tax research vendor, from the firm that hosts its website, from its cloud file storage provider, and from the manufacturer of the connected printer in the back office. Each of those vendors has, or could have, an SBOM. None of the people in that practice will ever open a CycloneDX file. The artifact still matters — but the consumer's job is structured very differently than it would be at a Fortune 500 with a dedicated product security team.

This document the full spectrum of consumers: who they are, how the work scales to their actual structure, and where the enterprise-development-organization model fits in as one case among many.

## The spectrum of consumers

It is useful to think of SBOM consumers in terms of archetypes, not just organization sizes. The differences that matter are not headcount — they are operational model, regulatory exposure, and whether anyone in the organization has a dedicated security or IT function at all.

### Archetype A — The solo operator or freelancer

A freelance designer, consultant, accountant, or therapist in solo practice. They use a small stack of SaaS tools — a project management app, invoicing software, a scheduling platform, cloud file storage, and perhaps a website hosted by a third party. They have no IT staff. The term "SBOM" has almost certainly never appeared in their day-to-day work.

**What receiving means for them:** Practically nothing, in the direct sense. They will never request a raw SBOM. What matters is whether their SaaS vendors maintain their own software responsibly — and the instruments available to evaluate that responsibility are vendor security questionnaires, SOC 2 Type II reports, and the security disclosures those vendors make publicly. SBOM practice at the vendor tier eventually benefits this archetype by improving the quality of the software they depend on, but the solo operator is at the far end of an indirect chain.

**If they are subject to regulation:** A solo practitioner handling health information is a HIPAA covered entity. A solo attorney may be subject to state bar data security rules. In those cases, the question is not "do we have SBOMs from our vendors?" but "can we demonstrate that the vendors handling our sensitive data maintain their software responsibly?" That demonstration runs through vendor security documentation, not directly through SBOM artifacts.

### Archetype B — The small business (2–20 employees, no IT function)

A restaurant chain, a specialty retailer, a small law firm, a dental practice, a nonprofit community organization. They use a mix of commercial packaged software (point-of-sale, practice management, HR) and SaaS platforms. They may have a managed service provider (MSP) handling their IT. Internally, no one owns "cybersecurity" as a role — it belongs to the office manager, the owner, or whoever is willing to deal with it.

**What receiving means for them:** Almost certainly no direct SBOM engagement. Their exposure to SBOM-related risk shows up in two ways. First, when a vendor they use patches a vulnerability — or fails to — in software their business depends on. Second, when a cyber insurance application asks about their vendor security practices, which is an increasingly common vector through which SBOM-adjacent concepts reach small businesses. The questionnaire language rarely uses the word "SBOM," but questions about software inventory, patch currency, and vendor risk programs are rooted in the same discipline.

**The cyber insurance gateway:** For many small businesses, the practical forcing function for thinking about vendor software quality is not regulation — it is cyber insurance. Insurers have steadily expanded their application questionnaires and are increasingly asking about third-party software risk management. Answering those questions accurately, and improving the practices they audit, is where SBOM-adjacent work shows up for this archetype. See [the compliance and insurance crosswalk](#compliance-and-insurance-crosswalk) below.

### Archetype C — The SaaS-only mid-market organization

A 50–500 person organization — a management consulting firm, a staffing company, a marketing agency, a regional healthcare system — that runs no internal servers and buys all of its software as SaaS. IT is either a small internal team or an MSP. There may be a security officer, often part-time or fractional.

**What receiving means for them:** This is the archetype where SBOM concepts are most likely to become operationally visible without the organization ever directly receiving an SBOM. Several specific scenarios drive this.

- **Incident response.** When a high-profile vulnerability surfaces in a widely used component — Log4Shell and XZ Utils are the landmark examples — this organization needs to answer the question "are any of our SaaS vendors affected?" Historically this meant waiting for vendor communications. Vendors with good SBOM programs answer faster and more precisely; vendors without them produce vague, delayed disclosures. The receiving organization starts to care about SBOM quality indirectly, through the quality of incident communications it gets.

- **FedRAMP customers.** Organizations that buy cloud services from FedRAMP-authorized vendors can, under OMB M-26-05, request SBOM data for the runtime production environment. Most organizations in this tier are unaware of that right. It exists and can be exercised when a specific security question requires it. <sup>[<a href="#ref-omb-m2605" target="_blank" rel="noopener noreferrer">1</a>]</sup>

- **Vendor due diligence.** Organizations in this tier frequently run vendor security questionnaires — either their own or through platforms like OneTrust, Whistic, or SecurityScorecard — as part of onboarding critical SaaS vendors. A forward-looking questionnaire will begin asking about SBOM availability and SBOM practice quality. The receiving organization does not necessarily process the SBOM itself; it uses SBOM availability as a signal of supply chain maturity.

### Archetype D — The regulated small entity

A medical practice, a community bank, a credit union, a small broker-dealer, a regional utility. These organizations are small in staff terms but operate under regulatory regimes — HIPAA, Gramm-Leach-Bliley, SEC cybersecurity rules, NERC CIP, state-level privacy laws — that impose specific software security obligations. They typically have a compliance officer but may not have a dedicated security role.

**What receiving means for them:** Regulation is the entry point. A medical practice covered by HIPAA is required to have a risk analysis that accounts for the security of systems that handle protected health information. A bank subject to the FTC Safeguards Rule must maintain an information security program with controls over service provider arrangements. <sup>[<a href="#ref-ftc-safeguards" target="_blank" rel="noopener noreferrer">2</a>]</sup> Neither regulation uses the word SBOM, but both require the organization to understand and manage the security posture of software vendors. Demonstrating that understanding — in an exam, an audit, or a breach investigation — is where SBOM-adjacent documentation becomes valuable.

Medical device manufacturers selling into the U.S. market have a direct SBOM mandate under FDA Section 524B, which applies to any "cyber device" submitted for premarket approval after March 29, 2023. <sup>[<a href="#ref-fda-524b" target="_blank" rel="noopener noreferrer">3</a>]</sup> Small device manufacturers are not exempt. They must both produce SBOMs for their own devices and engage with the SBOM practices of the component suppliers feeding their own supply chain.

### Archetype E — The organization with internal development

A software company, a technology-forward enterprise, a financial institution with an in-house engineering team, a startup. This organization both produces and receives SBOMs. It has — or can build — dedicated roles for security, engineering, and compliance.

**What receiving means for them:** This is the archetype the rest of SBOM literature addresses. The full RACI, the phased program model, and the tooling landscape discussion below are written primarily for this archetype. It is included here because it is one case, not the default case.

---

## What most organizations should actually do

Before getting to the full enterprise program model, it is worth being direct about what most organizations in Archetypes A through D should focus on. The answer is not "implement Dependency-Track." It is a shorter list.

### For organizations that run no internal development and no on-premises servers

**1. Know what you're running.** Maintain a list of every SaaS platform, every commercial application, and every connected device your organization uses. This does not have to be an SBOM. It has to be a list. It is the prerequisite to every other step.

**2. Ask vendors the right questions.** When onboarding a new vendor or renewing a critical contract, ask:
- Do you have a published security advisory or vulnerability disclosure process?
- Do you publish CVSSv3 or CVSSv4 scores for vulnerabilities in your product?
- Is a software bill of materials available upon request?
- Do you hold a SOC 2 Type II report covering security, availability, and confidentiality?
- What is your patch turnaround for critical vulnerabilities?

You do not need to process an SBOM to benefit from a vendor who has good SBOM practices. The presence of a mature SBOM program is a signal that the vendor knows what is in their software — which means they patch faster and communicate clearer.

**3. Include security language in contracts.** Even a one-sentence addition to a vendor services agreement — "Vendor will notify Customer within 72 hours of becoming aware of a security incident or disclosed vulnerability materially affecting the services" — provides a meaningful contractual basis for conversations that otherwise depend entirely on the vendor's goodwill.

**4. Know where to go when something breaks.** When a major vulnerability is announced, you need a way to quickly determine whether any of your vendors are affected. The vendor's security advisory page, their status page, and their support channel are your first line of inquiry. If a vendor cannot tell you within a reasonable time whether they are affected by a named, public vulnerability, that is a vendor risk signal that should affect your next renewal decision.

**5. Review your cyber insurance application honestly.** Insurance questionnaires are increasingly granular about vendor risk management. Answering them accurately, identifying gaps, and closing those gaps over the policy year is the most practical risk-reduction pathway available to small organizations without a security function.

---

## The MSP and MSSP as proxy consumer

The majority of small and mid-market organizations outsource their IT management to a managed service provider (MSP) or, for security specifically, a managed security service provider (MSSP). When those organizations receive vendor-issued SBOMs — or should be requesting them — the actual intake function sits in the MSP's environment, not the customer's.

This creates a specific gap that is almost entirely unaddressed in current SBOM guidance: **the contractual and operational question of who owns SBOM practice in a managed-services arrangement.**

A customer who asks their EHR vendor for an SBOM and receives one has accomplished nothing useful unless someone is actually reading it. If the MSP is doing vulnerability management on the customer's behalf, the SBOM needs to land in the MSP's tooling. If the MSP is not doing SBOM-aware vulnerability management, the artifact is orphaned.

**What customers should ask their MSP or MSSP:**

- Do you ingest SBOMs from the software vendors in my environment?
- When a vulnerability like Log4Shell or XZ Utils is announced, how do you determine whether any software in my environment is affected, and how quickly?
- Do you use any software composition analysis tooling that checks my vendor software against known vulnerability feeds?
- Will you flag it to me if a vendor in my environment cannot answer basic questions about their software components?

**What MSPs and MSSPs should be building toward:**

SBOM-aware security operations are increasingly a differentiator and, in regulated sectors, a requirement. An MSP serving healthcare customers is supporting HIPAA compliance obligations that include software risk management. An MSP serving financial services customers may be touching FTC Safeguards or GLBA obligations. The expectation that an MSP tracks vendor software vulnerabilities at the component level, rather than only at the patch level, will become table stakes in MSP procurement questionnaires within the near term.

The reference framework for MSPs developing this capability is CISA's published guidance on SBOM management for operational use. <sup>[<a href="#ref-cisa-framing" target="_blank" rel="noopener noreferrer">4</a>]</sup> The NIST Cybersecurity Framework's "Identify" and "Respond" function areas map directly to the capability being described. <sup>[<a href="#ref-nist-csf" target="_blank" rel="noopener noreferrer">5</a>]</sup>

---

## Compliance and insurance crosswalk

For organizations that lack a dedicated security program, the most actionable entry point into SBOM-adjacent practice is usually a regulatory or insurance obligation. The table below maps the most common frameworks to what they actually require and how SBOM practice supports compliance.

| Framework | Who it covers | What it requires relevant to SBOM | How SBOM practice helps |
|---|---|---|---|
| **FTC Safeguards Rule (GLBA)** | Financial institutions, including auto dealers, tax preparers, mortgage brokers | Written information security program; service provider oversight requiring contracts that require appropriate safeguards | Vendor security contracts; knowing what software vendors are running; faster breach scoping |
| **HIPAA Security Rule** | Covered entities and business associates handling PHI | Risk analysis; technical safeguards; business associate agreements | Software inventory underpins risk analysis; BAAs should require vendor security transparency |
| **FDA Section 524B** | Manufacturers of "cyber devices" submitted for premarket clearance/approval | SBOM in premarket submission; post-market vulnerability monitoring | Direct SBOM production mandate; receiving obligation for component suppliers |
| **PCI DSS v4.0** | Any entity storing, processing, or transmitting cardholder data | Req. 6.3: security of externally developed software; Req. 12.8: third-party service provider management | Software composition analysis; vendor risk management documentation |
| **NIST CSF 2.0** | Voluntary, but referenced by many regulations and insurers | "Identify" function: asset management, risk assessment; "Respond": incident response | SBOM is the artifact that operationalizes software asset management and improves incident response speed |
| **CIS Controls v8 IG1** | Baseline controls appropriate for small organizations | Control 2: Inventory and control of software assets; Control 16: Application security practices | A software inventory at any level of rigor; vendor communication about vulnerabilities |
| **SEC Cybersecurity Rules** | Public companies | Annual disclosure of cybersecurity risk management; material incident disclosure | Vendor software risk management is part of documented risk management; SBOM practice improves disclosure quality |
| **EU Cyber Resilience Act** | Manufacturers placing products with digital elements on the EU market | SBOM obligation for products in scope; vulnerability reporting; 10-year retention | Direct mandate; see Part II for full CRA discussion |
| **Cyber insurance** | Any insured organization | Questionnaires increasingly cover software inventory, patch management, vendor risk management, and incident response procedures | SBOM practice improves answers to all four categories; vendors with SBOM programs are easier to vet; incident response is faster |

References: FTC Safeguards Rule <sup>[<a href="#ref-ftc-safeguards" target="_blank" rel="noopener noreferrer">2</a>]</sup>; HIPAA Security Rule <sup>[<a href="#ref-hipaa" target="_blank" rel="noopener noreferrer">6</a>]</sup>; PCI DSS v4.0 <sup>[<a href="#ref-pci-dss" target="_blank" rel="noopener noreferrer">7</a>]</sup>; NIST CSF 2.0 <sup>[<a href="#ref-nist-csf" target="_blank" rel="noopener noreferrer">5</a>]</sup>; CIS Controls v8 <sup>[<a href="#ref-cis-controls" target="_blank" rel="noopener noreferrer">8</a>]</sup>; SEC Cybersecurity Rules <sup>[<a href="#ref-sec-cyber" target="_blank" rel="noopener noreferrer">9</a>]</sup>.

---

## Roles when they collapse onto one or two people

In organizations up to roughly 50 people without a dedicated security team, the roles that a large enterprise distributes across multiple departments are carried by one or two people — often the office manager, the owner, the most technical employee, or an outsourced resource like a fractional CISO or a bookkeeper who ended up handling "the computer stuff."

The RACI below is written for this reality. It assumes a staff of one handling IT and security. Every cell in a traditional RACI that would read "Legal" reads "your attorney." Every cell that would read "Procurement" reads "whoever signs vendor contracts." The goal is not to make the work feel enterprise-scaled — it is to identify the minimum non-deferrable responsibilities and give them a home.

### Collapsed RACI — small organization, single IT/security owner

| Activity | Who owns it | Minimum action |
|---|---|---|
| Know what software is in use | IT/security owner | Maintain a spreadsheet. Update it when a new tool is added or removed. |
| Vendor security evaluation at onboarding | IT/security owner + whoever signs contracts | Run through a short checklist: SOC 2? Security advisory page? Breach notification clause? |
| Contract security language | Attorney or contract reviewer | At minimum: breach notification, right to audit, data handling obligations. |
| Monitoring vendor security advisories | IT/security owner | Subscribe to vendor security advisories by email. Bookmark status pages. |
| Responding to a disclosed vulnerability | IT/security owner | Contact vendor support. Ask directly: "Are we affected? What is the patch timeline?" Document the response. |
| Cyber insurance application accuracy | Owner + IT/security owner | Review the questionnaire together annually. Identify the gaps. Close the ones that matter most before renewal. |
| Evidence for audits or exams | Owner + IT/security owner | Keep a folder with vendor security documentation, SOC 2 reports, and any security-related correspondence. |

### Collapsed RACI — SMB with a small internal team (5–20 people, MSP managing IT)

| Activity | Who owns it | Minimum action |
|---|---|---|
| Know what software is in use | MSP (maintains asset inventory) | Confirm with MSP that their inventory is current and that you can access it. |
| Vendor security evaluation at onboarding | Business owner + fractional CISO or MSP security lead | Use a vendor questionnaire template (CAIQ or equivalent). File the response. |
| Contract security language | Attorney | Ensure MSP agreement includes security obligations; ensure key vendor contracts have breach notification clauses. |
| Monitoring vendor security advisories | MSP | Ask MSP explicitly: "What is your process when a vulnerability like Log4Shell is announced?" Get the answer in writing. |
| Responding to a disclosed vulnerability | MSP + business owner | MSP should be first line; business owner should have an escalation path when MSP response is insufficient. |
| Cyber insurance | Business owner + fractional CISO | Complete questionnaire accurately. Share with MSP for input on technical questions. |
| Regulatory compliance documentation | Compliance officer or fractional CISO | Maintain evidence file; include vendor security documentation as part of risk analysis. |

---

## Roles and responsibilities — the development organization

For organizations that produce as well as consume software, cross-functional reach is the defining challenge. Procurement, ITAM, security, legal, engineering, privacy, and product all have legitimate stakes in SBOM receiving, and the most common failure is assigning the program to a single team that cannot deliver it alone.

The breakdown below covers the major activities and their primary owners for a development-producing organization.

### RACI — development-producing organization

| Activity | Primary owner | Contributing roles |
|---|---|---|
| Define SBOM policy and standards | Security / AppSec leadership | Legal, OSPO, Procurement, Privacy |
| Vendor onboarding and SBOM clauses in contracts | Procurement / Vendor management | Security, Legal, ITAM |
| Day-to-day SBOM ingestion and validation | Security tools / DevSecOps platform team | ITAM, Engineering |
| Vulnerability triage from SBOM data | Vulnerability management / SecOps | Engineering, Product Security |
| VEX intake and analysis | Vulnerability management / Product Security | Engineering |
| License and OSS compliance | Open Source Program Office or Legal | Engineering, Procurement |
| ITAM record linkage | ITAM / SAM team | Security tools team |
| Audit and regulator-facing evidence | Risk / GRC / Compliance | All of the above |
| Customer-facing SBOM communications (PSIRT) | Product Security | Customer Success, Legal, Engineering |

**Two structural patterns deserve specific attention.**

The SBOM ingestion infrastructure should sit with the team that runs the rest of the security tooling — the AppSec or DevSecOps platform team — not with procurement. Procurement runs the request side and feeds metadata into the system, but the operating infrastructure belongs in security.

Policy ownership should be senior enough to mediate between competing department interests. Putting policy ownership in security alone tends to under-weight legal concerns; putting it in legal tends to under-weight operational realities. A cross-functional steering group, meeting quarterly with clear authority, is a common solution.

---

## The consumer's role distinction: SBOM Author vs. Software Producer

CISA's 2025 draft makes the long-overdue distinction between the SBOM Author (who wrote the SBOM document) and the Software Producer (who built the software). <sup>[<a href="#ref-cisa-2025" target="_blank" rel="noopener noreferrer">10</a>]</sup> For consumers, this matters in two scenarios.

**The producer ships an SBOM authored by a third-party tool.** The Tool Name field captures this. The SBOM Author may be "Sonatype Lifecycle" or "Anchore Syft" running in the producer's pipeline. The producer is still responsible for the SBOM's contents, but the consumer has useful information about how it was generated.

**The consumer generates its own SBOM for software the producer did not provide one for.** Now the consumer is the SBOM Author. The producer remains the Software Producer. The consumer should track this distinction internally so that analyzed SBOMs — generated by running Syft or Trivy against a binary or container — are not later confused with producer-issued build SBOMs.

Internal SBOMs generated by the consumer for third-party software are legitimate and useful, but they are a different artifact from a producer-issued build SBOM. Tagging them clearly, with generation method and date, avoids confusion during audits and incident response.

---

## A phased program design model

Most organizations cannot stand up a full SBOM receiving program at once. The progression below is calibrated to the archetype. "Enterprise" means Archetype E (development organization). "Small org" means Archetypes B, C, and D.

### Phase 1 — Foundation

**Enterprise:**
- Establish policy: accepted formats, minimum required fields aligned to CISA 2025 draft, vendor tier definitions, retention rules.
- Stand up an open source receiving stack: Dependency-Track for ingestion, Syft for first-party generation, Grype for scanning. Ingest first-party SBOMs first.
- Identify the top 10–20 critical (Tier 1) vendors and begin outreach. Do not bring in the long tail yet.
- Build asset-record linkage minimally: SKU-level for now, instance-level for Tier 1.

**Small org:**
- Build the software inventory list. Every SaaS platform, every application, every connected device. One spreadsheet or asset management tool. Update it when something changes.
- Identify the five to ten vendors that are most critical to operations or that handle the most sensitive data. These are your equivalent of Tier 1.
- Pull or request current security documentation from each: SOC 2 Type II, ISO 27001 certification, or equivalent attestation. File it.
- Review vendor contracts for breach notification language. Note which contracts are silent on security.

### Phase 2 — Operationalize

**Enterprise:**
- Onboard Tier 1 and Tier 2 vendors. Capture SBOMs across at least one full release cycle.
- Wire inventory into vulnerability management. KEV-first triage. Begin VEX intake from vendors who provide it.
- Engage the OSPO / legal team. Surface license-compliance issues. Build the working relationship for ongoing review.
- Connect ITAM/SAM. Ensure SBOM linkages match procurement records.

**Small org:**
- Establish a monitoring routine for your Tier 1 vendors: subscribe to security advisory emails, bookmark status pages.
- Develop a short vendor questionnaire to run at next renewal for each critical vendor. Include questions about vulnerability disclosure process, patch timelines, and SBOM availability.
- Add a security clause to the template you use for vendor contracts. Your attorney or a template from SANS, NCSC, or CISA's resources page can provide starting language.
- Set a calendar reminder to revisit the software inventory quarterly.

### Phase 3 — Scale

**Enterprise:**
- Onboard Tier 3 vendors. Use questionnaires and tier-appropriate clauses; do not over-spec for low-criticality suppliers.
- Generate analyzed SBOMs for vendors that cannot or will not produce them.
- Add VEX-based suppression to triage. Begin tracking quality scores per vendor.
- Evaluate commercial platforms against what the open source stack does and does not do for you.

**Small org:**
- Extend the questionnaire process to all vendors handling sensitive data, not just your top five.
- Add SBOM availability as a question in vendor onboarding. You do not need to process the SBOM — asking signals maturity expectations and is a useful vendor-quality signal.
- If you have an MSP, schedule an annual security review that includes asking how they handle vendor software vulnerabilities across your environment.
- Consider a fractional CISO engagement if regulatory exposure is significant.

### Phase 4 — Mature

**Enterprise:**
- Adopt the Transparency Exchange API (TEA) for vendors who publish through it. Automate discovery and retrieval. <sup>[<a href="#ref-tea" target="_blank" rel="noopener noreferrer">11</a>]</sup>
- Treat SBOM quality as a vendor scorecard input affecting renewal and tier decisions.
- Integrate signing and provenance verification into ingestion. Preserve cryptographic evidence.
- Extend the program to non-software BOMs as appropriate: HBOM for hardware, AI/ML-BOM for models, CBOM for cryptographic inventories.

**Small org:**
- Establish a vendor security scorecard — even a simple one: current SOC 2, breach notification clause in contract, responsive to security inquiries, advisory channel exists. A vendor who fails all four should prompt a conversation at next renewal.
- Align cyber insurance coverage to actual risk exposure based on the software inventory and vendor landscape.
- If you operate in a regulated sector, confirm with your compliance advisor that your vendor security documentation satisfies current examination expectations.

> **A realistic timeline:** For an enterprise development organization, the full progression typically takes two to three years. Programs that compress it tend to over-buy tooling and under-build process. For a small organization, Phase 1 through Phase 2 is achievable in a quarter if someone owns it. The critical factor in both cases is actually assigning an owner.

---

## Metrics at the right scale

### Enterprise metrics

These are appropriate for organizations with a development team and a formal security program.

| Metric | What it measures |
|---|---|
| **Coverage** | Percentage of in-scope third-party software with at least one current SBOM in the repository |
| **Freshness** | Median age of the latest SBOM per deployed product version |
| **Quality score** | Aggregate quality score across received SBOMs (see Part VI) |
| **VEX coverage** | Percentage of vendor SBOMs accompanied by at least one VEX statement |
| **Vulnerable-component lead time** | Time from public CVE disclosure to internal identification of all affected products |
| **KEV coverage** | Time from KEV listing to verified mitigation across affected products |
| **Vendor responsiveness** | Median time from SBOM request to receipt of updated artifact |
| **Audit readiness** | Time to produce an inventory snapshot for a given date and product set |

These should not all be reported every month. Pick three or four that align with the program's current phase and report them with enough trend data to support decisions. More metrics than you can act on usually obscures rather than informs.

### Small-organization metrics

For organizations without a security team, the metrics that matter are simpler and more action-oriented.

| Metric | What it measures |
|---|---|
| **Vendor security documentation coverage** | Percentage of critical vendors with a current SOC 2, ISO 27001, or equivalent on file |
| **Contract coverage** | Percentage of critical vendor contracts with a breach notification clause |
| **Advisory channel coverage** | Percentage of critical vendors for which you have subscribed to security advisories |
| **Response time to disclosed vulnerabilities** | How quickly can you determine whether a named public vulnerability affects any vendor in your environment? Track this after each major disclosure |
| **Insurance questionnaire gap count** | Number of gaps identified in last cyber insurance application; reduction over time |

---

## Escalation paths by organization type

### Development organization with a PSIRT

A product security incident response team (PSIRT) provides a defined escalation path. The standard four-step model applies:

1. **Direct technical conversation.** Most SBOM problems come from misunderstanding, not refusal — the producer's tool does not generate the field you expected, the vendor's distribution channel is not what their sales team described. A short call with the producer's product security team resolves most issues.
2. **Documented commitment.** Agreement to deliver the artifact within a defined timeframe. Capture it in email as the basis for either resolution or escalation.
3. **Account-level escalation.** If the producer does not deliver, escalate to the account team and the producer's executive sponsor. Make clear the issue is operational.
4. **Procurement consequences.** As a last resort, the SBOM gap becomes a contract matter: a non-renewal threat, a clause invocation, a tier downgrade. This step is rarely needed if the prior three are conducted in good faith.

On the consumer's side, equivalent good faith means not weaponizing minor SBOM imperfections, not demanding artifacts the producer cannot reasonably provide, and not treating routine consumer-side processing issues as producer failures.

### Organization with an MSP as security operator

When something goes wrong — a major vulnerability is announced, a vendor breach is disclosed, a vendor cannot answer a basic question about their software — the escalation path runs through the MSP, not an internal team.

The customer's responsibility is to have established in advance what the MSP's obligations are in these scenarios. If the managed services agreement does not describe what the MSP will do when a critical vulnerability affecting your vendor environment is disclosed, that gap needs to close at the next contract review. The customer should expect:
- Notification within a defined timeframe when a vulnerability potentially affecting the customer's environment is publicly disclosed.
- A determination of actual impact within a defined follow-up window.
- A documented recommendation for remediation or mitigation.

If the MSP cannot deliver on any of these, that is a service quality conversation. If they will not, it is a procurement decision.

### Small organization with no IT function

The escalation path is simpler and often runs through the cyber insurance carrier's incident response resources. Most commercial cyber insurance policies include access to a breach response hotline and may include pre-approved IR vendors. Knowing that number and having it accessible before an incident is one of the highest-value, lowest-cost preparations available to this archetype.

Beyond the insurance carrier:
- The vendor's support channel is the first contact for a suspected vulnerability affecting their software.
- State-level resources: CISA regional advisors offer free assistance to small businesses and critical infrastructure operators. <sup>[<a href="#ref-cisa-regions" target="_blank" rel="noopener noreferrer">12</a>]</sup>
- Sector-specific ISACs (Information Sharing and Analysis Centers) provide threat intelligence and incident guidance for their covered sectors, often including small members. <sup>[<a href="#ref-isac" target="_blank" rel="noopener noreferrer">13</a>]</sup>
- The SBA and SCORE offer cybersecurity resources specifically calibrated for small businesses, though these tend to lag behind current standards by a year or more.

---

## A note on AI-generated code and the individual developer

One receiving context that cuts across archetypes — the individual developer who uses AI coding assistants — deserves explicit mention. Tools like GitHub Copilot, Cursor, and similar assistants increasingly suggest package imports and dependency additions as part of code generation. The developer accepts a suggestion, the package is added to the project, and there is no procurement workflow, no vendor questionnaire, and no contract. The SBOM for the resulting software may include packages the developer did not consciously choose.

This is not a hypothetical risk. The XZ Utils backdoor, disclosed in March 2024, exploited a package that had been recommended and adopted through exactly the kind of casual, frictionless channel that AI assistants accelerate. <sup>[<a href="#ref-xz-utils" target="_blank" rel="noopener noreferrer">14</a>]</sup>

The practical response for individual developers and small teams:
- Use lockfiles and pin dependencies. Know what version of what package is in the project.
- Run a software composition analysis tool — `pip audit`, `npm audit`, `trivy fs`, or `osv-scanner` — as part of a pre-commit hook or CI step. These tools are free and take minutes to set up.
- Review AI-suggested package additions before accepting them. Check that the suggested package name matches the package you actually need — package name confusion attacks are well-documented.
- When a project's SBOM matters (open source projects; projects delivered to enterprise or government customers), generate it with Syft or CycloneDX CLI at build time.

---

## References

<ol>
  <li id="ref-omb-m2605"><a href="https://www.whitehouse.gov/wp-content/uploads/2026/01/M-26-05.pdf" target="_blank" rel="noopener noreferrer">OMB M-26-05, "Strengthening and Streamlining Federal Cybersecurity Procurement Requirements," Office of Management and Budget (January 23, 2026)</a></li>
  <li id="ref-ftc-safeguards"><a href="https://www.ftc.gov/business-guidance/resources/ftc-safeguards-rule-what-your-business-needs-know" target="_blank" rel="noopener noreferrer">FTC Safeguards Rule — What Your Business Needs to Know, Federal Trade Commission</a></li>
  <li id="ref-fda-524b"><a href="https://www.fda.gov/regulatory-information/search-fda-guidance-documents/cybersecurity-medical-devices-quality-system-considerations-and-content-premarket-submissions" target="_blank" rel="noopener noreferrer">FDA, "Cybersecurity in Medical Devices: Quality System Considerations and Content of Premarket Submissions," U.S. Food and Drug Administration</a></li>
  <li id="ref-cisa-framing"><a href="https://www.cisa.gov/resources-tools/resources/framing-software-component-transparency-establishing-common-software-bill-materials" target="_blank" rel="noopener noreferrer">CISA, "Framing Software Component Transparency: Establishing a Common Software Bill of Materials" (October 2024)</a></li>
  <li id="ref-nist-csf"><a href="https://www.nist.gov/cyberframework" target="_blank" rel="noopener noreferrer">NIST Cybersecurity Framework 2.0, National Institute of Standards and Technology (2024)</a></li>
  <li id="ref-hipaa"><a href="https://www.hhs.gov/hipaa/for-professionals/security/index.html" target="_blank" rel="noopener noreferrer">HIPAA Security Rule, U.S. Department of Health and Human Services</a></li>
  <li id="ref-pci-dss"><a href="https://www.pcisecuritystandards.org/document_library/" target="_blank" rel="noopener noreferrer">PCI DSS v4.0, PCI Security Standards Council</a></li>
  <li id="ref-cis-controls"><a href="https://www.cisecurity.org/controls/v8" target="_blank" rel="noopener noreferrer">CIS Controls v8, Center for Internet Security</a></li>
  <li id="ref-sec-cyber"><a href="https://www.sec.gov/rules/final/2023/33-11216.pdf" target="_blank" rel="noopener noreferrer">SEC, "Cybersecurity Risk Management, Strategy, Governance, and Incident Disclosure," Securities and Exchange Commission (2023)</a></li>
  <li id="ref-cisa-2025"><a href="https://www.cisa.gov/resources-tools/resources/sbom-minimum-elements" target="_blank" rel="noopener noreferrer">CISA, "2025 Minimum Elements for a Software Bill of Materials," Cybersecurity and Infrastructure Security Agency (draft, August 2025)</a></li>
  <li id="ref-tea"><a href="https://www.ecma-international.org/publications-and-standards/standards/ecma-424/" target="_blank" rel="noopener noreferrer">ECMA TC54 Transparency Exchange API (TEA), ECMA International</a></li>
  <li id="ref-cisa-regions"><a href="https://www.cisa.gov/about/regions" target="_blank" rel="noopener noreferrer">CISA Regional Offices, Cybersecurity and Infrastructure Security Agency</a></li>
  <li id="ref-isac"><a href="https://www.nationalisacs.org/member-isacs-3" target="_blank" rel="noopener noreferrer">National Council of ISACs — Member ISACs Directory</a></li>
  <li id="ref-xz-utils"><a href="https://www.openwall.com/lists/oss-security/2024/03/29/4" target="_blank" rel="noopener noreferrer">Andres Freund, "backdoor in upstream xz/liblzma leading to ssh server compromise," oss-security mailing list (March 29, 2024)</a></li>
</ol>

---