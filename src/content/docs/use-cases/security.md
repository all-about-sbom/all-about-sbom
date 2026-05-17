---
title: "SBOM Use-Case: Security"
description: Get started building your docs site with Starlight.
template: splash
---
It is vital to ensure that the software to be deployed on a system does not carry any known vulnerabilities as otherwise a security incident is only a question of when and not if.
While the main focus is on the security and known vulnerabilities of the application itself, its components also need to be considered.
Each component that is added to a software expands its attack surface and any component that has a known security issue increases the risk to the surrounding software.
This might be due to a known bypass for a used input sanitizer or an observed exploit leveraging an included component.

Consequently, SBOMs become a vital tool in any arsenal to secure our software by providing an overview over all components.
This list of components can be automatically crosschecked against threat intelligence feeds, e.g., the National Vulnerability Database, such that <b>identifiying vulnerable components</b> becomes a routine part of the development process.
But also, in case of a security incident, after having identified the attack vector, the SBOM can help with the <b>incident management</b>, by allowing a fast indexing of all software that includes the exploited components and consequently pinpoint the potentially compromised systems.

### Identifying Vulnerable Components

Modern software is not a monolith written from scratch but rather a conglomeration of individual components that each provide part of the required functionality.
Furthermore, components are dynamically added and removed during the development process with components adding additional transitive components.
Manual due dilligence on all these directly and indirectly added components becomes unrealistic.
However, each added component and its functionalities may also provide attack vectors if they contain vulnerabilities.
Having an SBOM that lists all included components allows for an automated crosscheck of components against threat intelligence feeds of known vulnerabilities, for example in the CI/CD pipline, allowing the development team to identify potentially vulnerable components early and update or mitigate them.


##### Example

During the development of a Java software project multiple dependencies are added, including a component that itself depends on <tt>log4j</tt>.
The development happend in the first half of 2021 and the development team did their due dilligence and no known vulnerability existed in any of the added components.
Half a year later log4shell hits. 
Other software vendors, without SBOMs, are scrambling to identify software products that include <tt>log4j</tt> with the vulnerable version, whereas any vendor that maintained their SBOMs can simply search the machine readable SBOMs for any mention of <tt>log4j</tt> to identify exposed products that need attention.

### Incident Management

Even with the best security practices a security incident might still happen and after understanding how the attacker breached a system it is essential to identify all systems that also might be affected.
This does not only include systems exposed by the exploited system but also all systems that can be exploited with the same attack.
SBOMs assist with this search, as after having identifyied the attack and the involved software and software components, the SBOMs of each system's software can subsequently be crosschecked against this information and any dangerous similarities to the breached system handled.

##### Example

The incident response team identified a breach in one of the public facing websites.
The attacked used an SQL injection vulnerability to manipulate the database.
It is revealed that the injection vulnerability is due to a faulty sanitization function provided by a component depended on by the exploited software.
Now, to identify all other potentially exposed systems, the response team can not only identify all systems that run the exploited software but also point out any other software that uses the component providing the faulty sanitizer and might thus have been exploited as well, by just scanning the SBOMs of any deployed software.
