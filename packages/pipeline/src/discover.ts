// @ts-nocheck
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { getEnsText } from "viem/ens";

export async function discoverTerms(ensName: string) {
  const client = createPublicClient({ chain: mainnet, transport: http() });
  
  const [price, uses, vault, registry] = await Promise.all([
    getEnsText(client, { name: ensName, key: "fairtrain.price" }),
    getEnsText(client, { name: ensName, key: "fairtrain.allowed-uses" }),
    getEnsText(client, { name: ensName, key: "fairtrain.content-vault" }),
    getEnsText(client, { name: ensName, key: "fairtrain.registry" }),
  ]);
  
  return {
    pricePerKToken: Number(price),
    allowedUses: uses?.split(",") ?? [],
    vaultCid: vault,
    registryAddr: registry,
  };
}
