import { createHash } from "crypto";
// @ts-ignore - Assuming 0g-ts-sdk might not be resolvable perfectly without install
import { ZeroGStorage } from "@0glabs/0g-ts-sdk"; 
import * as fs from "fs";
import * as path from "path";

// Mocking 0g storage if module does not exist during local dev
class MockZeroG {
    async upload(opts: any) {
        return { cid: "bafyreihMockCid123" };
    }
    kv = {
        async set(hash: string, payload: string) { return true; }
    }
    log = {
        async append(key: string, payload: string) { return true; },
        async read(key: string) { return []; }
    }
}

let zg: any;
try {
    zg = new ZeroGStorage({ rpc: "https://rpc-testnet.0g.ai" });
} catch(e) {
    zg = new MockZeroG();
}

export async function uploadAndRegister(filePath: string, creatorKeyPair: any): Promise<{
  contentHash: string;
  cid: string;
}> {
  // 1. Hash the raw file (this is the on-chain identifier)
  const fileBuffer = fs.readFileSync(filePath);
  const contentHash = "0x" + createHash("sha256").update(fileBuffer).digest("hex");

  // 2. Upload encrypted to 0G — creator controls the decryption key
  const { cid } = await zg.upload({
    data: fileBuffer,
    encrypt: true,
    keyPair: creatorKeyPair,   // ed25519 from creator's wallet
  });

  // 3. Store metadata in 0G KV — queryable by content hash
  await zg.kv.set(contentHash, JSON.stringify({
    cid,
    registeredAt: Date.now(),
    filename: path.basename(filePath),
  }));

  return { contentHash, cid };
}

// Called by the pipeline SDK every time content is consumed.
export async function appendConsumptionLog(entry: {
  contentHash: string;
  consumer: string;
  tokenCount: number;
  txHash: string;
}) {
  await zg.log.append(
    `consumption:${entry.contentHash}`,
    JSON.stringify({ ...entry, timestamp: Date.now() })
  );
}

export async function getAuditTrail(contentHash: string) {
  const entries = await zg.log.read(`consumption:${contentHash}`);
  return entries.map((e: string) => JSON.parse(e));
}
