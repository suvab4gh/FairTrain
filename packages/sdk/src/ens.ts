import { encodeFunctionData } from "viem";
import { namehash } from "viem/ens";

export const PUBLIC_RESOLVER_ADDRESS = "0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41";
export const REGISTRY_ADDRESS = process.env.REGISTRY_ADDRESS || "0x0";

export const publicResolverABI = [
  {
    inputs: [
      { internalType: "bytes32", name: "node", type: "bytes32" },
      { internalType: "string", name: "key", type: "string" },
      { internalType: "string", name: "value", type: "string" }
    ],
    name: "setText",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes[]", name: "data", type: "bytes[]" }
    ],
    name: "multicall",
    outputs: [{ internalType: "bytes[]", name: "results", type: "bytes[]" }],
    stateMutability: "nonpayable",
    type: "function"
  }
];

export async function writeCreatorTerms(
  walletClient: any,
  subdomain: string,
  pricePerKToken: number,
  allowedUses: string[],
  vaultCid: string
) {
  const name = `${subdomain}.creator.eth`;
  const node = namehash(name);
  const resolver = PUBLIC_RESOLVER_ADDRESS;

  // Batch all setText calls in one multicall
  const calls = [
    ["fairtrain.price", String(pricePerKToken)],
    ["fairtrain.allowed-uses", allowedUses.join(",")],
    ["fairtrain.content-vault", vaultCid],
    ["fairtrain.registry", REGISTRY_ADDRESS],
  ].map(([key, value]) =>
    encodeFunctionData({
      abi: publicResolverABI,
      functionName: "setText",
      args: [node as any, key as string, value as string],
    })
  );

  await walletClient.writeContract({
    address: resolver,
    abi: publicResolverABI,
    functionName: "multicall",
    args: [calls],
  });
}
