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
    - `HTTPS_PROXY_ROUTE = PROXY 10.194.0.4:9443`

## Supporting Files

- `research-contact-center-teams-calling.md`: source references and endpoint research notes.
- `CODEX_PAC_UPDATE_PROMPT.md`: reusable prompt for future Codex-driven PAC maintenance.

## Scope

This repository is intended for maintaining endpoint allow/bypass behavior for the above Microsoft workloads.  
For major scope changes (for example sovereign clouds or non-Microsoft services), update research references before editing `power.pac`.
