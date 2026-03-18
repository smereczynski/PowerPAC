# Dynamics 365 Contact Center + Teams Calling URL Research

Date: 2026-03-18

## Sources

1. Dynamics 365 Contact Center system requirements  
   https://learn.microsoft.com/en-us/dynamics365/contact-center/implement/system-requirements-contact-center
2. Microsoft 365 endpoint web service (worldwide)  
   https://endpoints.office.com/endpoints/worldwide?clientrequestid=\<GUID\>
3. Power Platform URLs and IP address ranges  
   https://learn.microsoft.com/en-us/power-platform/admin/online-requirements
4. Power Apps required services  
   https://learn.microsoft.com/en-us/power-apps/limits-and-config#required-services
5. Power Automate required services  
   https://learn.microsoft.com/en-us/power-automate/ip-address-configuration#required-services
6. Power Pages required services  
   https://learn.microsoft.com/en-us/power-pages/system-requirements#required-services
7. Copilot Studio required services  
   https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-quotas#required-services

## URL groups included in PAC

- Contact Center / Omnichannel URLs from source 1 (`Allow access to websites` section).
- Teams Calling URLs from source 2 where `serviceArea=Skype` and `required=true`:
  - ID 12 (`Allow`): `*.teams.microsoft.com`, `teams.microsoft.com`, `*.teams.cloud.microsoft`, `teams.cloud.microsoft`, `*.lync.com`
  - ID 16 (`Default`): `*.keydelivery.mediaservices.windows.net`, `*.streaming.mediaservices.windows.net`
  - ID 17 (`Default`): `aka.ms`
  - ID 27 (`Default`): `join.secure.skypeassets.com`, `mlccdnprod.azureedge.net`
  - ID 127 (`Default`): `*.skype.com`
- Dynamics 365 / Power Platform URLs from sources 3-7 including:
  - consolidated Microsoft domains (`*.cloud.microsoft`, `*.static.microsoft`, `*.usercontent.microsoft`)
  - Dynamics 365 environments (`*.crm*.dynamics.com`)
  - Power Platform API domains (`*.api.powerplatform.com`, `*.powerplatform.com`, `*.api.powerplatformusercontent.com`, `*.powerplatformusercontent.com`)
  - product-specific required services for Power Apps, Power Automate, Power Pages, and Copilot Studio.

## Output

- PAC file: `power.pac`

## Current PAC behavior

- Hosts matching `PROXY_HOST_PATTERNS` are sent to proxy routes.
- Non-listed hosts return `DIRECT`.
- PAC is intentionally flat/simple:
  - no helper functions for host checks
  - single `FindProxyForURL` loop with `shExpMatch`
