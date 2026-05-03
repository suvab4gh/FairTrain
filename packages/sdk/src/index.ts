import { uploadAndRegister, getAuditTrail } from "./storage";
import { writeCreatorTerms } from "./ens";

export class FairTrain {
  wallet: any;
  registry: any;

  constructor(private config: {
    privateKey: string;
    rpcUrl: string;
    ensRpcUrl?: string;
  }) {
      // Setup ethers/viem providers internally
  }

  // Step 1: Upload work + register on-chain + write ENS terms
  async register(opts: {
    filePath: string;
    ensSubdomain: string;
    pricePerKToken: number;
    allowedUses: ("training" | "finetuning" | "eval")[];
  }) {
    const { contentHash, cid } = await uploadAndRegister(opts.filePath, this.config.privateKey);

    // Call Registry Contract (Skipped in mock for generic safety)
    // await this.registry.register(contentHash, `${opts.ensSubdomain}.creator.eth`, opts.pricePerKToken);

    // Write licensing terms to ENS text records
    // await writeCreatorTerms(this.wallet, opts.ensSubdomain, opts.pricePerKToken, opts.allowedUses, cid);

    return { contentHash, cid, ensName: `${opts.ensSubdomain}.creator.eth` };
  }

  // Step 2: Check your earnings dashboard
  async earnings(contentHash: string) {
    const total = 0; // await this.registry.totalEarned(contentHash);
    const log = await getAuditTrail(contentHash);
    return { totalUSDC: Number(total) / 1e6, consumptions: log };
  }

  // Step 3: Pull full audit trail (for legal/regulatory use)
  async auditTrail(contentHash: string) {
    return getAuditTrail(contentHash);
  }
}
