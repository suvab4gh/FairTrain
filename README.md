# FairTrain Protocol

The protocol that turns AI training data into a royalty-generating asset for creators — automatically.

## Core Tech Stack
- **0G Storage & Compute**: Immutable content registry and provenance.
- **Ethereum Name Service (ENS)**: Machine-readable licencing marketplace and creator identity via text records.
- **KeeperHub**: Autonomous royalty execution engine triggered by consumption events.
- **Smart Contracts**: Solidity (Registry & Royalty Stream) deployed to 0G testnet.
- **Frontend**: React + Tailwind + Motion with full Interactive Demo.

## Environment Variables
Create a `.env` file based on `.env.example`:
- `PRIVATE_KEY`: Your wallet private key for deployment and mock identity.
- `ETH_RPC_URL`: Mainnet/Testnet RPC for ENS resolution.
- `REGISTRY_ADDRESS`: The deployed `FairTrainRegistry` contract address.
- `USDC_ADDRESS`: Testnet USDC address.

## Running the Protocol

1. **Start the Interactive Pitch & Demo App:**
   ```bash
   npm run dev
   ```

2. **Deploy Contracts (0G Testnet):**
   ```bash
   npx hardhat run scripts/deploy.ts --network zerog-testnet
   ```

3. **Set up ENS Subdomains:**
   ```bash
   npx tsx scripts/ens-setup.ts
   ```

4. **Run the Full Mock E2E Flow:**
   ```bash
   npx tsx scripts/test-flow.ts
   ```

5. **Seed the real-time Demo:**
   ```bash
   npx tsx scripts/demo-seed.ts
   ```

## Repository Structure

- `/contracts/`: The Solidity smart contracts driving the protocol.
- `/packages/sdk/`: Creator-facing TypeScript SDK (identity, upload, terms).
- `/packages/pipeline/`: AI Company SDK (1-line script to comply and pay).
- `/src/`: Interactive React dashboard and pipeline simulation UI.
- `/keeperhub/`: The KeeperHub trigger payload and job configuration.
- `/scripts/`: CLI pipelines for deployments and test setups.
