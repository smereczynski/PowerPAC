# PowerPAC

`PowerPAC` contains a Proxy Auto-Configuration (PAC) setup for Microsoft cloud workloads, focused on:
- Dynamics 365 Contact Center
- Microsoft Teams Calling
- Dynamics 365 / Power Platform required services

## Main File

- `power.pac`: PAC file used by clients/browsers.
  - Returns `DIRECT` for required Microsoft endpoints used by the supported scenario.
  - Returns `DIRECT` for non-listed endpoints as well (proxy currently bypassed globally).
  - Proxy routes are still defined in file for easy future re-enable:
    - HTTP: `PROXY 10.194.0.4:9080; DIRECT`
    - HTTPS: `HTTPS 10.194.0.4:9443; PROXY 10.194.0.4:9080; DIRECT`

## Supporting Files

- `research-contact-center-teams-calling.md`: source references and endpoint research notes.
- `CODEX_PAC_UPDATE_PROMPT.md`: reusable prompt for future Codex-driven PAC maintenance.

## Scope

This repository is intended for maintaining endpoint allow/bypass behavior for the above Microsoft workloads.  
For major scope changes (for example sovereign clouds or non-Microsoft services), update research references before editing `power.pac`.
