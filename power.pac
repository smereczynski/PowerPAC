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

var HTTP_PROXY_ROUTE = "PROXY 10.194.0.4:9080; DIRECT";
var HTTPS_PROXY_ROUTE = "HTTPS 10.194.0.4:9443; PROXY 10.194.0.4:9080; DIRECT";

var DIRECT_HOST_PATTERNS = [
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
  "cci-prod-botdesigner.azureedge.net"
];

function hostMatchesPattern(host, pattern) {
  if (pattern.indexOf("*") !== -1) {
    return shExpMatch(host, pattern);
  }
  return host === pattern;
}

function isDirectHost(host) {
  var i;
  for (i = 0; i < DIRECT_HOST_PATTERNS.length; i++) {
    if (hostMatchesPattern(host, DIRECT_HOST_PATTERNS[i])) {
      return true;
    }
  }
  return false;
}

function FindProxyForURL(url, host) {
  var h = host.toLowerCase();
  var u = url.toLowerCase();

  if (isDirectHost(h)) {
    if (shExpMatch(u, "https://*")) {
      return HTTPS_PROXY_ROUTE;
    }
    return HTTP_PROXY_ROUTE;
  }

  // Non-listed hosts bypass proxy.
  return "DIRECT";
}
