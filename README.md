# PowerPAC

`PowerPAC` contains a Proxy Auto-Configuration (PAC) setup for Microsoft cloud workloads, focused on:

- Dynamics 365 Contact Center
- Microsoft Teams Calling
- Dynamics 365 / Power Platform required services

## Main File

- `power.pac`: PAC file used by clients/browsers.
  - Flat PAC logic (single `FindProxyForURL` with inline loop, no helper functions).
  - Hosts listed in `PROXY_HOST_PATTERNS` are routed via proxy.
  - Non-listed hosts use `DIRECT`.
  - Route variables used by the PAC:
    - `HTTP_PROXY_ROUTE = PROXY 10.194.0.4:9080`
    - `HTTPS_PROXY_ROUTE = PROXY 10.194.0.4:9080`
  - Azure Firewall Explicit Proxy uses the same configured port for HTTP and HTTPS.

## Release URL

- Ready-to-use Blob SAS URL for Azure Firewall Explicit Proxy PAC configuration:
  - <https://powerpac.blob.core.windows.net/release/power.pac?si=public&spr=https&sv=2024-11-04&sr=b&sig=NXS6NkkMx5LoNixKbrK3CWtgvzcqN3DjSza9rcpoSsg%3D>
- Azure Firewall Explicit Proxy documentation:
  - <https://learn.microsoft.com/en-us/azure/firewall/explicit-proxy>

## HTTPS Proxy Port Fix

The PAC previously sent HTTPS, WSS, and CONNECT-style `:443` traffic to
`10.194.0.4:9443`. Network traces showed that address returning an immediate
TCP reset, while direct proxy tests through `10.194.0.4:9080` succeeded for
both HTTP and HTTPS. The PAC now uses port `9080` for both protocols, matching
Azure Firewall Explicit Proxy's single-port behavior.

Non-listed hosts still return `DIRECT`, which explains why ordinary internet
access could continue while listed Microsoft services failed.

This evidence identifies a proxy-port mismatch; it does not establish a
Windows 11 update as the cause of when the issue became visible.

## Validation

Run the dependency-free PAC checks with:

```shell
osascript -l JavaScript test-power-pac.js
```

## Supporting Files

- `research-contact-center-teams-calling.md`: source references and endpoint research notes.
- `CODEX_PAC_UPDATE_PROMPT.md`: reusable prompt for future Codex-driven PAC maintenance.

## Scope

This repository is intended for maintaining endpoint allow/bypass behavior for the above Microsoft workloads.  
For major scope changes (for example sovereign clouds or non-Microsoft services), update research references before editing `power.pac`.
