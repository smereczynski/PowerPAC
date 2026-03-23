/*
  PAC for Dynamics 365 Contact Center with Teams Calling.
  Source references (retrieved 2026-03-18):
  1) https://learn.microsoft.com/en-us/dynamics365/contact-center/implement/system-requirements-contact-center
  2) https://endpoints.office.com/endpoints/worldwide?clientrequestid=<GUID> (serviceArea=Skype)
  3) https://learn.microsoft.com/en-us/power-platform/admin/online-requirements
  4) https://learn.microsoft.com/en-us/power-apps/limits-and-config#required-services
  5) https://learn.microsoft.com/en-us/power-automate/ip-address-configuration#required-services
  6) https://learn.microsoft.com/en-us/power-pages/system-requirements#required-services
  7) https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-quotas#required-services
*/

var HTTP_PROXY_ROUTE = "PROXY 10.194.0.4:9080";
var HTTPS_PROXY_ROUTE = "PROXY 10.194.0.4:9443";

var PROXY_HOST_PATTERNS = [
  // Dynamics 365 Contact Center / Omnichannel
  "*.omnichannelengagementhub.com",
  "ccaas-embed-prod.azureedge.net",
  "*.communication.azure.com",
  "ocsdk-prod.azureedge.net",
  "*.service.signalr.net",
  "oc-cdn-ocprod.azureedge.net",
  "cdn.botframework.com",

  // Identity / auth
  "login.microsoft.net",
  "login.microsoftonline.com",
  "login.windows.net",
  "browser.pipe.aria.microsoft.com",

  // Teams core (Contact Center doc + M365 Skype service area)
  "*.teams.microsoft.com",
  "teams.microsoft.com",
  "plat.teams.microsoft.com",
  "authsvc.teams.microsoft.com",
  "*.ng.msg.teams.microsoft.com",
  "*.notifications.teams.microsoft.com",
  "*.trouter.teams.microsoft.com",
  "ecs.office.com",
  "*.teams.cloud.microsoft",
  "teams.cloud.microsoft",
  "*.lync.com",
  "join.secure.skypeassets.com",
  "mlccdnprod.azureedge.net",
  "aka.ms",

  // Teams / Skype signaling and voice dependencies
  "*.skype.com",
  "*.trouter.skype.com",
  "*.edge.skype.com",
  "aad.skypetoken.skype.com",
  "config.edge.skype.com",
  "edge.skype.com",
  "api.aps.skype.com",
  "*.asm.skype.com",
  "*.keydelivery.mediaservices.windows.net",
  "*.streaming.mediaservices.windows.net",

  // Dynamics 365 / Power Platform core (Power Platform URLs and IP address ranges)
  "*.cloud.microsoft",
  "*.static.microsoft",
  "*.usercontent.microsoft",
  "*.microsoftcloud.com",
  "*.ces.microsoftcloud.com",
  "config.centro.core.microsoft",
  "admin.microsoft.com",
  "petrol.office.microsoft.com",
  "oness.microsoft.com",
  "login.microsoft.com",
  "login.microsoftonline-p.com",
  "login.live.com",
  "auth.gfx.ms",
  "*.windows.net",
  "*.passport.net",
  "*.crm*.dynamics.com",
  "*.azureedge.net",
  "*.azurefd.net",
  "*.microsoftonline.com",
  "go.microsoft.com",
  "urs.microsoft.com",
  "crl.microsoft.com",
  "dynamics.microsoft.com",
  "api.powerplatform.com",
  "*.api.powerplatform.com",
  "*.powerplatform.com",
  "api.powerplatformusercontent.com",
  "*.api.powerplatformusercontent.com",
  "*.powerplatformusercontent.com",
  "api.admin.powerplatform.microsoft.com",

  // Power Apps required services
  "api.bap.microsoft.com",
  "*.api.bap.microsoft.com",
  "*.powerapps.com",
  "*.gateway.prod.island.powerapps.com",
  "*.harvest.preview.powerapps.com",
  "*.harvest.powerapps.com",
  "*.flow.microsoft.com",
  "*.powerautomate.com",
  "*.events.data.microsoft.com",
  "augloop.svc.cloud.microsoft",
  "*.augloop.svc.cloud.microsoft",
  "*.ocv.microsoft.com",
  "ris.api.iris.microsoft.com",
  "eudb.ris.api.iris.microsoft.com",

  // Power Automate / Power Pages / Copilot Studio required services
  "graph.microsoft.com",
  "graph.windows.net",
  "*.azure-apim.net",
  "*.azure-apihub.net",
  "*.logic.azure.com",
  "download.microsoft.com",
  "*.safelink.emails.azure.net",
  "api.businessappdiscovery.microsoft.com",
  "management.azure.com",
  "*.powerpages.microsoft.com",
  "*.dynamics.com",
  "pipe.aria.microsoft.com",
  "*.powerva.microsoft.com",
  "bot-framework.azureedge.net",
  "pa-guided.azureedge.net",
  "cci-prod-botdesigner.azureedge.net",

  // Azure Rights Management / Information Protection endpoint
  "*.aadrm.com",

  // Certificate revocation/OCSP endpoint
  "oneocsp.microsoft.com",

  // Device management check-in endpoint
  "*.dm.microsoft.com",

  // Exchange Online Autodiscover endpoint
  "*.outlook.com",

  // Exchange Online endpoint
  "*.office365.com",
  "outlook.office.com",

  // Microsoft 365 substrate/workload orchestration endpoint
  "substrate.office.com",

  // Microsoft 365 web shell/navigation endpoint
  "*.suite.office.com",

  // Microsoft Edge performance/telemetry endpoint
  "*.msedge.net",

  // Microsoft Edge web service endpoint
  "edge.microsoft.com",

  // Microsoft Fluid Relay collaboration backend endpoint
  "*.fluidrelay.azure.com",

  // Microsoft Forms endpoint
  "forms.office.com",

  // Microsoft Intune / Endpoint Manager management endpoint
  "*.manage.microsoft.com",

  // Microsoft Office service metadata/titles endpoint
  "*.mos.microsoft.com",

  // Office 365 resource/static content endpoint
  "*.res.office365.com",

  // Office CDN static/content endpoint
  "*.cdn.office.net",

  // Office client/cloud policy configuration endpoint
  "clients.config.office.net",

  // Office measurement/telemetry upload endpoint
  "*.measure.office.com",

  // Real-time communication signaling/registration (Teams + ACS interop)
  "*.communication.microsoft.com",

  // SharePoint Online static/content delivery endpoint
  "*.sharepointonline.com",

  // SharePoint Online tenant/API endpoint
  "*.sharepoint.com",

  // Windows Delivery Optimization content endpoints
  "*.prod.do.dsp.mp.microsoft.com",

  // Windows Push Notification Services endpoint
  "*.wns.windows.com"
];

function FindProxyForURL(url, host) {
  var h = host.toLowerCase();
  var i;

  for (i = 0; i < PROXY_HOST_PATTERNS.length; i++) {
    if (shExpMatch(h, PROXY_HOST_PATTERNS[i])) {
      if (url.substring(0, 6).toLowerCase() === "https:") {
        return HTTPS_PROXY_ROUTE;
      }
      return HTTP_PROXY_ROUTE;
    }
  }

  // Non-listed hosts bypass proxy.
  return "DIRECT";
}
