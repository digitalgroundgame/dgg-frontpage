import { spawn, spawnSync } from "node:child_process";
import { createServer, connect } from "node:net";
import { resolve } from "node:path";

const publicPort = 3000;
const nextPort = 3001;
const certificate = spawnSync(
  process.execPath,
  [resolve("scripts/generate-dev-cert.mjs")],
  { stdio: "inherit" },
);

if (certificate.error) {
  throw certificate.error;
}

if (certificate.status !== 0) {
  process.exit(certificate.status ?? 1);
}

const clientSockets = new Set();
let shutdownSignal;
let nextProcess;

function rejectHttpRequest(socket, status, message) {
  socket.end(
    `HTTP/1.1 ${status} ${message}\r\n` +
      "Connection: close\r\n" +
      "Content-Length: 0\r\n\r\n",
  );
}

function redirectHttpRequest(socket, firstChunk) {
  let requestHead = firstChunk;

  function handleRequestHead() {
    const headEnd = requestHead.indexOf("\r\n\r\n");

    if (headEnd === -1) {
      if (requestHead.length > 16_384) {
        rejectHttpRequest(socket, 431, "Request Header Fields Too Large");
        return true;
      }

      return false;
    }

    const lines = requestHead.subarray(0, headEnd).toString("latin1").split("\r\n");
    const requestLine = /^(\S+)\s+(\S+)\s+HTTP\/\d\.\d$/.exec(lines[0]);
    const hostLine = lines.slice(1).find((line) => /^host:/i.test(line));
    const hostHeader = hostLine?.slice(hostLine.indexOf(":") + 1).trim();

    if (!requestLine || !hostHeader) {
      rejectHttpRequest(socket, 400, "Bad Request");
      return true;
    }

    try {
      const destination = new URL(requestLine[2], `http://${hostHeader}`);
      destination.protocol = "https:";
      socket.end(
        `HTTP/1.1 308 Permanent Redirect\r\n` +
          `Location: ${destination.href}\r\n` +
          "Cache-Control: no-store\r\n" +
          "Connection: close\r\n" +
          "Content-Length: 0\r\n\r\n",
      );
    } catch {
      rejectHttpRequest(socket, 400, "Bad Request");
    }

    return true;
  }

  if (handleRequestHead()) {
    return;
  }

  socket.on("data", (chunk) => {
    requestHead = Buffer.concat([requestHead, chunk]);
    if (handleRequestHead()) {
      socket.removeAllListeners("data");
    }
  });
}

const gateway = createServer((client) => {
  clientSockets.add(client);
  client.on("close", () => clientSockets.delete(client));
  client.on("error", () => client.destroy());

  client.once("data", (firstChunk) => {
    client.pause();

    if (firstChunk[0] !== 0x16) {
      redirectHttpRequest(client, firstChunk);
      client.resume();
      return;
    }

    const next = connect(nextPort, "127.0.0.1");
    client.unshift(firstChunk);
    client.once("error", () => next.destroy());
    next.once("error", () => client.destroy());
    next.once("connect", () => {
      client.pipe(next);
      next.pipe(client);
      client.resume();
    });
  });
});

function closeGateway() {
  if (gateway.listening) {
    gateway.close();
  }

  for (const socket of clientSockets) {
    socket.destroy();
  }
}

function stopNextProcess(signal) {
  if (nextProcess && nextProcess.exitCode === null && nextProcess.signalCode === null) {
    nextProcess.kill(signal);
  }
}

function startNextServer() {
  nextProcess = spawn(
    process.execPath,
    [
      resolve("node_modules/next/dist/bin/next"),
      "dev",
      "--hostname",
      "127.0.0.1",
      "--port",
      String(nextPort),
      "--experimental-https",
      "--experimental-https-key",
      "certificates/localhost-key.pem",
      "--experimental-https-cert",
      "certificates/localhost.pem",
    ],
    { stdio: "inherit" },
  );

  nextProcess.on("error", (error) => {
    console.error("Unable to start the Next.js development server:", error);
    process.exitCode = 1;
    closeGateway();
  });

  nextProcess.on("exit", (code, signal) => {
    closeGateway();
    if (!shutdownSignal && (code !== 0 || signal)) {
      console.error(
        `Next.js development server stopped unexpectedly${signal ? ` (${signal})` : ` with exit code ${code}`}.`,
      );
    }
    process.exitCode =
      code ?? (shutdownSignal === "SIGINT" ? 130 : signal ? 1 : 0);
  });
}

gateway.on("error", (error) => {
  console.error(`Unable to start the development gateway on port ${publicPort}:`, error);
  process.exitCode = 1;
  closeGateway();
  stopNextProcess("SIGTERM");
});

gateway.listen(publicPort, () => {
  console.log(`HTTP on port ${publicPort} redirects to HTTPS on the same port.`);
  startNextServer();
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    shutdownSignal = signal;
    closeGateway();
    stopNextProcess(signal);
  });
}

process.on("uncaughtException", (error) => {
  console.error("Development gateway crashed:", error);
  process.exitCode = 1;
  closeGateway();
  stopNextProcess("SIGTERM");
});
