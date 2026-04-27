---
title: SBOM Basics
description: Get started building your docs site with Starlight.
template: splash
---

This page covers the technical fundamentals of Software Bills of Materials (SBOMs). 

While the concept of an SBOM, a comprehensive inventory of a project’s software components, is straightforward, implementing it across an entire software supply chain requires standardized, machine-readable formats. Without these standards, automated tools like vulnerability scanners, build pipelines, and compliance monitors would not be able to parse or share the data effectively.

This guide introduces the core technical concepts you need to know, including the major data formats, the different lifecycle types of SBOMs, and the broader, expanding ecosystem of xBOMs.


## BOM Formats
The term SBOM refers to a concept: the idea of listing a project’s software components in a structured manner. To implement this concept, two standards have emerged that describe what this list should look like.

### SPDX
SPDX (Software Package Data Exchange) is an open standard for software bills of materials, announced by the Linux Foundation in 2010. It was initially designed with a strong focus on open-source license compliance and intellectual property tracking, making it a natural choice for legal and procurement teams. Over time, SPDX has expanded its scope to cover security, provenance, and other use cases as well.

#### Standardization and Formats
SPDX 2.2.1 is officially recognized as an international standard under [ISO/IEC 5962:2021](https://www.iso.org/standard/81870.html). The specification supports a wide range of file formats, including JSON, YAML, XML, RDF, the human-readable tag-value format (.spdx), and xls spreadsheets. Further information about the standard can be found on the official [SPDX Website](https://spdx.dev/).

With version 3.0.1, SPDX has introduced several major changes and expanded its scope. While SPDX 2.x mainly focused on software packages, SPDX 3.x broadens the model to describe systems as a whole and to support additional domains such as security, AI, datasets, and build provenance. To reflect this broader scope, the name was reinterpreted from *Software Package Data Exchange* to *System Package Data Exchange*.

A major architectural change is the shift from a document-centric model in SPDX 2.x to an element-centric model in SPDX 3.x. SPDX 2.x described information in one overall document structure, whereas SPDX 3.x represents individual elements separately and links them together using a linked-data approach. This makes processing more sophisticated, but it also improves modularity, reuse, and interoperability.

| Feature | SPDX 2.X | SPDX 3.X |
| ------- | -------- | -------- |
| Format  | JSON, YAML, XML, RDF, tag-value, xls spreadsheets| JSON-LD, Turtle, N-Triples, RDF/XML |
| Data model | Document-centric | Element-centric |
| ISO/IEC standard | 5962:2021 | In progress |

#### Core Document Structure
The structure differs fundamentally between SPDX 2.X and 3.X.

With SPDX 2.X, the standard used one unified document structure instead of the profile architecture introduced later in SPDX 3.0.1. Rather than combining separate profiles for different domains, SPDX 2.X described software inventory, licensing, files, snippets, and relationships within a single overall schema.
While a small set of document creation fields was required, the remaining information was typically organized into sections:
1. **Document Creation Information:** Contains metadata about the SPDX document itself, such as the SPDX version, document identifier, creator, creation time, and document-level license information.
2. **Package Information:** Describes each software package listed in the SBOM, including details such as its name, version, supplier, download location, checksums, and licensing data.
3. **File Information:** Lists individual files that belong to a package and can include their names, types, checksums, detected licenses, and copyright notices.
4. **Snippet Information:** Describes specific portions of a file, usually to assign licensing or copyright information to a smaller code fragment rather than the whole file.
5. **Other Licensing Information:** Contains custom or extracted license information that is not covered by a standard SPDX license identifier.
6. **Relationships:** Defines how the documented elements are connected, for example which package depends on another or which file belongs to a package.
7. **Annotations:** Stores additional comments or notes added by a person or tool to provide context about a specific SPDX element.
8. **Review Information:** Records review metadata, such as who reviewed the SPDX document, when the review happened, and any related remarks.

With SPDX 3.0.1, the Profile Architecture was introduced. Instead of one massive standard that tries to cover everything, SPDX is now modular. Profiles introduce specific data fields (classes) tailored for different use cases.

This allows producers to create SPDX documents that contain only the information relevant to their use case, while still having the option to extend them later with additional profiles. While the Core Profile provides the common foundation, specialized information can be added through one or more of the following profiles:
1. **Software Profile:** Describes software artifacts such as packages, files, versions, identifiers, and the relationships between them.
2. **Security Profile:** Adds security-related information, such as vulnerabilities, exploitability details, advisories, and other security metadata.
3. **Licensing Profile:** Captures license information, including license expressions, exceptions, and other legal or compliance-related metadata.
4. **Dataset Profile:** Describes datasets and their metadata, such as origin, availability, and characteristics, especially when they are relevant to other documented artifacts.
5. **AI Profile:** Describes AI models and related metadata, including information about how the model is identified, characterized, and used.
6. **Build Profile:** Records how an artifact was built, including provenance, build environment, tools, and other build-related metadata.
7. **Lite Profile:** Provides a simplified subset of SPDX concepts for lightweight use cases and easier adoption.
8. **Extension Profile:** Allows organizations to add custom data when their use case is not fully covered by the standard profiles.


### CycloneDX
CycloneDX is an open-source Bill of Materials standard created by the OWASP Foundation in 2018. It is designed with a strong focus on software security, vulnerability identification, and component analysis. While heavily adopted for cybersecurity, it also effectively handles other use cases like open-source license compliance and provenance tracking. Further information about the standard can be found on the official [CycloneDX Website](https://cyclonedx.org/).

#### Standardization and Formats
CycloneDX has also been standardized through Ecma International under [ECMA-424](https://ecma-international.org/publications-and-standards/standards/ecma-424/). For practical use, the format is available in JSON, XML, and Protocol Buffers encodings, which all represent the same underlying information model.


#### Core Document Structure
A CycloneDX document usually contains a few document-level fields and then optional sections such as metadata, components, services, dependencies, compositions, vulnerabilities, and extensions. Only a small core is mandatory, while most other parts are optional. Regardless of the format used, the payload within a CycloneDX SBOM is roughly organized in 13 different sections, which are described in detail on the [Standardization Website](https://cyclonedx.org/specification/overview/). However, only the some general metadata is required. All other sections may be included, but are not required.

0. **General Metadata:** Contains information about the bom format, cyclonedx version used, serial number of the bom and the version of the bom.
1. **BOM Metadata:** Contains additional metadata about the generation of the SBOM, such as which project the SBOM describes, which tool was used to create it, or at which stage of the lifecycle the SBOM was generated.
2. **Components:** This section describes the components of the system (Direct and transitive). Each component must specify a ComponentType (e.g., library, container, firmware, file, cryptographic-asset). These distinctions, among others, make it possible to standardize different types of BOMs within a single file.
3. **Services:** External services, such as APIs or microservices.
4. **Dependencies:** This section describes the relationships between the components so that a dependency tree can be constructed.
5. **Compositions:** This section describes the completeness of an SBOM’s constituent parts (such as components, services, and vulnerabilities), allowing consumers to understand how comprehensive the data is and identify potential blind spots.
6. **Vulnerabilities:** This section lists known vulnerabilities.
7. **Formulation:** This section describes how objects are created, assembled, deployed, tested, certified, or otherwise brought into their current form.
8. **Annotations:** This section contains comments that provide additional context for the objects.
9. **Definitions:** Contains references to standards, requirements, levels, and all supporting documentation that may be in relation to the SBOM content.
10. **Declarations:** Describes how the system complies with the referenced standards. Includes, for example, evidence. 
11. **Citations:** Indicates who contributed to a specific part of the SBOM, thereby enabling traceability of where the information originated.
12. **Extensions:** Contains data of custom extensions.


## Types of Software Bill of Materials
The components that an SBOM can and should describe depends heavily on the scope it covers and the phase of the product lifecycle in which it is generated. An SBOM generated based on the source code can list the components that are specified there, such as managed dependencies. However, some components are not clearly specified within the source code, like dynamically liked components. In this example the exact version used depends on the target system. The same application executed on two different systems can depend on different dynamic components.

It is therefore important to understand at which stage an SBOM was generated in order to determine which components can actually be reliably identified.
To address this, [Cybersecurity and Infrastructure Security Agency](https://www.cisa.gov/sites/default/files/2023-04/sbom-types-document-508c.pdf) (CISA) and the [German Federal Office for Information Security](https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/TechGuidelines/TR03183/BSI-TR-03183-2_v2_1_0.pdf) (BSI), have defined six different types of SBOMs:


1. **Design SBOM:** SBOM of intended, planned software project or product with included components (some of which may not yet exist) for a new software artifact.
2. **Source SBOM:** SBOM created directly from the development environment, source files, and included dependencies used to build an product artifact. 
3. **Build SBOM:** SBOM generated as part of the process of building the software to create a releasable artifact (e.g., executable or package) from data such as source files, dependencies, built components, build process ephemeral data, and other SBOMs. 
4. **Analysed SBOM:** SBOM generated through analysis of artifacts (e.g.,  executables, packages, containers, and virtual machine images) after its build. Such analysis generally requires a variety of heuristics. In some contexts, this may also be referred to as a “3rd party” SBOM. 
5. **Deployed SBOM:** SBOM provides an inventory of software that is present on a system. This may be an assembly of other SBOMs that combines analysis of configuration options, and examination of execution behavior in a (potentially simulated) deployment environment. 
6. **Runtime SBOM:** SBOM generated through instrumenting the system running the software, to capture only components present in the system, as well as external call-outs or dynamically loaded components. In some contexts, this may also be referred to as an “Instrumented” or “Dynamic” SBOM. 

An important aspect here is that the scope of what is described shifts across the various phases. A source SBOM describes which components are directly included via the source code and is therefore identical for different instances of a software product. A runtime SBOM, on the other hand, also includes system components. As a result, the SBOM no longer universally describes a software product, but rather a software product running on a specific system. A runtime SBOM can therefore look different for the same software running on two different systems.

The current versions of SPDX and CycloneDX allow users to indicate the phase in which the SBOM was generated. SPDX distinguishes between the phases defined by CISA/BSI, while CycloneDX uses its own, but conceptually similar, “lifecycle phases.”

## Related Bill of Materials and xBOMs
SPDX and CycloneDX are often referred to simply as SBOM formats. While this is not incorrect, it doesn't tell the whole story. Today, both standards offer significantly more capabilities than just documenting software components. For example, CycloneDX also allows for the documentation of cryptographic algorithms or hardware parts. The nature of a component is determined simply by its assigned `type` attribute. SPDX offers a similar concept through its modular profile architecture.

Whether the generated document should be referred to as a Software Bill of Materials (SBOM), a Cryptographic Bill of Materials (CBOM), a Hardware Bill of Materials (HBOM), or a combination thereof depends solely on the components being documented. In all cases, the same underlying standard is used. This concept can be expanded as needed; CycloneDX, for instance, currently listes over a dozen different capabilities which are officially supported.

Strictly speaking, these two formats are not purely SBOM standards, but rather **xBOM** (Extended or Everything Bill of Materials) standards. Taken together, such a bill of materials allows for the standardized listing of all components within a system, enabling organizations to map their entire hardware and software supply chain in a single, unified format.