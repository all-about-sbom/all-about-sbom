---
title: "SBOM Use-Case: License Compliance"
description: Get started building your docs site with Starlight.
template: splash
---

Software licencing is complex. legal topic
This is not only because there is vast amount of different licenses with different requirements but also because software must not be considered to have a single license.
Each component that is added to a software may carry its own license implications.
Whereas the MIT licence likely carries no additional implications a software component that uses strict copyleft licencse such as the GNU Affero General Public License (AGPL) has strong implications how the software can be deployed and how any derivatives have to be managed.
Thus it is vital to know all licenses of all components and their transitive components a software uses.
SBOMs can do this as they list all components which can then subsequently be checked for license compatibility.


##### Example

The currently developed software requires a functionality for which a compatible open source project with a seemingly compatible open source license has been identified.
However, an analysis of the corresponding SBOM reveals a transitive dependency that does not allow for usage in a closed-source commercial product and would force the publication of any depending source code.
As this is incompatible with the business model, and could have severe financial implications, usage of this component is abstained and the required functionality self implemented.
