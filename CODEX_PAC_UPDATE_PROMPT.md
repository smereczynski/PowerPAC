# Codex Agentic Task Prompt: Maintain `power.pac`

Use this prompt as-is when asking Codex to update the PAC file for Dynamics 365 Contact Center with Teams Calling and Power Platform workloads.

## Prompt

You are maintaining the PAC file in this repository: `power.pac`.

### Objective

Update `power.pac` so that it remains accurate for:
- Dynamics 365 Contact Center
- Microsoft Teams Calling (voice/signaling endpoints)
- Dynamics 365 and Power Platform core services (Dataverse, Power Apps, Power Automate, Power Pages, Copilot Studio where relevant)

The PAC must keep current behavior:
- hosts listed in `PROXY_HOST_PATTERNS` go through proxy
- all other hosts go `DIRECT`

### Proxy Requirements

- `HTTP_PROXY_ROUTE = "PROXY 10.194.0.4:9080"`
- `HTTPS_PROXY_ROUTE = "PROXY 10.194.0.4:9443"`

Do not change these values unless explicitly requested.

### Editing Scope (strict)

Only update:
- entries inside `PROXY_HOST_PATTERNS`
- top-of-file source comments and research markdown if needed

Do not modify:
- `FindProxyForURL` block
- variable names (`HTTP_PROXY_ROUTE`, `HTTPS_PROXY_ROUTE`, `PROXY_HOST_PATTERNS`)
- control-flow structure of the PAC

### Primary Sources (authoritative)

Use current Microsoft documentation and endpoint feeds:

1. Dynamics 365 Contact Center system requirements  
   `https://learn.microsoft.com/en-us/dynamics365/contact-center/implement/system-requirements-contact-center`

2. Microsoft 365 endpoint web service (worldwide), filtered for Teams (`serviceArea=Skype`)  
   `https://endpoints.office.com/endpoints/worldwide?clientrequestid=<GUID>`

3. Power Platform URLs and IP address ranges  
   `https://learn.microsoft.com/en-us/power-platform/admin/online-requirements`

4. Product “required services” pages (as linked from source 3), public cloud:
   - Power Apps
   - Power Automate
   - Power Pages
   - Copilot Studio

### Update Rules

1. Preserve PAC function compatibility with MDN PAC expectations:
   - `FindProxyForURL(url, host)` must return valid PAC directives.
   - Allowed return tokens include `DIRECT` and `PROXY host:port`.
2. Keep matching logic robust for:
   - wildcard suffixes (`*.domain.com`)
   - internal wildcard patterns (for example `*.crm*.dynamics.com`)
3. Keep `PROXY_HOST_PATTERNS` grouped by purpose with concise comments.
4. Deduplicate endpoint entries.
5. Keep broad but intentional coverage for this scenario:
   - do not remove known required endpoints unless replaced by newer official guidance.
6. Do not add sovereign cloud endpoints unless explicitly requested.
7. Keep file ASCII.

### Validation Checklist

After edits, verify:

1. PAC syntax is valid JavaScript (no trailing commas that break PAC engines).
2. `FindProxyForURL` behavior is:
   - proxy for hosts matching `PROXY_HOST_PATTERNS`
   - `DIRECT` for non-listed hosts
3. Wildcard matching works for patterns like `*.crm*.dynamics.com`.
4. No duplicate or obviously malformed hosts.
5. `FindProxyForURL` implementation is unchanged except if user explicitly requested logic changes.

### Deliverables

1. Updated `power.pac`.
2. Updated research/change-log markdown (create or update `research-contact-center-teams-calling.md`) with:
   - date
   - sources used
   - key endpoint additions/removals
   - any assumptions or unresolved items
3. Short summary of:
   - what changed
   - why it changed
   - residual risk (if any)

### Constraints

- Do not rename PAC variables.
- Do not add helper functions unless explicitly requested.
- Avoid speculative endpoints not grounded in official docs.
- Keep changes minimal and maintainable.
