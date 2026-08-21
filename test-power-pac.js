ObjC.import("Foundation");

function shExpMatch(value, pattern) {
  var escapedPattern = pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  var expression =
    "^" + escapedPattern.replace(/\*/g, ".*").replace(/\?/g, ".") + "$";
  return new RegExp(expression).test(value);
}

function assertEqual(actual, expected, name) {
  if (actual !== expected) {
    throw new Error(
      name + ": expected " + JSON.stringify(expected) + ", got " + JSON.stringify(actual)
    );
  }
}

var currentDirectory = $.NSFileManager.defaultManager.currentDirectoryPath;
var pacPath = currentDirectory.stringByAppendingPathComponent("power.pac");
var error = Ref();
var pacSource = $.NSString.stringWithContentsOfFileEncodingError(
  pacPath,
  $.NSUTF8StringEncoding,
  error
);

if (!pacSource) {
  throw new Error("Unable to read power.pac");
}

eval(ObjC.unwrap(pacSource));

var proxy = "PROXY 10.194.0.4:9080";
var cases = [
  ["listed HTTP URL", "http://login.microsoftonline.com/", "login.microsoftonline.com", proxy],
  ["listed HTTPS URL", "https://login.microsoftonline.com/", "login.microsoftonline.com", proxy],
  ["listed WSS URL", "wss://service.service.signalr.net/client", "service.service.signalr.net", proxy],
  ["CONNECT-style input", "login.microsoftonline.com:443", "login.microsoftonline.com:443", proxy],
  ["host containing port", "https://teams.microsoft.com/", "teams.microsoft.com:443", proxy],
  ["non-listed host", "https://example.org/", "example.org", "DIRECT"],
];

assertEqual(HTTP_PROXY_ROUTE, proxy, "HTTP proxy route");
assertEqual(HTTPS_PROXY_ROUTE, proxy, "HTTPS proxy route");

for (var i = 0; i < cases.length; i++) {
  assertEqual(
    FindProxyForURL(cases[i][1], cases[i][2]),
    cases[i][3],
    cases[i][0]
  );
}

console.log("Validated " + cases.length + " PAC routing cases.");
