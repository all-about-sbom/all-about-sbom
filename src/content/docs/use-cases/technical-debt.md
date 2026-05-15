---
title: "SBOM Use-Case: Technical Debt"
description: Get started building your docs site with Starlight.
template: splash
---
During software development requirements for functionality are frequently addressed by adding components that in combination provide the required functionality.
Over the whole liefcycle this can add up.
But, ensuring all these dependencies, as well as their transitive dependencies, are up to date is not only a question of <a href="/use-cases/security">Security Management</a> but also of handling technical debt.
Deprecated dependencies will contain bugs that have been fixed or lack optimizations that are present in newer versions.
Each such instance adds technical debt that will eventually incur fines due to crashes or inefficiencies.
However, SBOMs can help to address this, as the contained list of components with their versions can be compared against the most recent versions indentifying minor and major version changes that can subsequently be used to prioritize updates and catch up on the incurred debt.


##### Example

The software has been developed for years.
Every year new components have been added but due to the development speed there was never a focus on updating components unless required.
An analysis of the SBOM reveals that multiple used components are available in newer versions.
The required updates are prioritized based on the version difference and other components are completely replaced as they are no longer maintained and forks with better features are available.
In the end the software runs faster as the updated components encorporated optimizations not present in the old versions.
