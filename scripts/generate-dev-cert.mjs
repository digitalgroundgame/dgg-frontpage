import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { isIP } from "node:net";
import { resolve } from "node:path";

const certificateDirectory = resolve("certificates");
const keyPath = resolve(certificateDirectory, "localhost-key.pem");
const certificatePath = resolve(certificateDirectory, "localhost.pem");

if (existsSync(keyPath) && existsSync(certificatePath)) {
  process.exit(0);
}

mkdirSync(certificateDirectory, { recursive: true });

const subjectAlternativeNames = new Set([
  "DNS:localhost",
  "IP:127.0.0.1",
  "IP:::1",
]);

for (const value of [process.env.DEV_HOSTNAME, process.env.DEV_TAILSCALE_IP]) {
  const hostname = value?.trim();

  if (!hostname) {
    continue;
  }

  subjectAlternativeNames.add(
    `${isIP(hostname) ? "IP" : "DNS"}:${hostname}`,
  );
}

execFileSync(
  "openssl",
  [
    "req",
    "-x509",
    "-newkey",
    "rsa:2048",
    "-nodes",
    "-days",
    "365",
    "-keyout",
    keyPath,
    "-out",
    certificatePath,
    "-subj",
    "/CN=localhost",
    "-addext",
    `subjectAltName=${[...subjectAlternativeNames].join(",")}`,
  ],
  { stdio: "inherit" },
);

console.log(`Generated ${certificatePath}`);
