import { getDomainKeysWithReverses } from "@bonfida/spl-name-service";
import { SolanaAgentKit } from "../index";
import { PublicKey } from "@solana/web3.js";

/**
 * Resolves a Solana PublicKey to all owned .sol domain.
 *
 * This function uses the Bonfida SPL Name Service to resolve a given Solana
 * PublicKey to all owned .sol domains.
 * @param agent SolanaAgentKit instance
 * @param owner The Solana PublicKey to resolve
 * @returns A promise that resolves to the corresponding .sol domains
 * @throws Error if the domain resolution fails
 */

export async function resolveOwner(
  agent: SolanaAgentKit,
  owner: PublicKey,
): Promise<{ domain: string | undefined; pubKey: PublicKey }[]> {
  if (!owner || !(owner instanceof PublicKey)) {
    throw new Error("Invalid owner. Expected a PublicKey.");
  }

  try {
    return await getDomainKeysWithReverses(agent.connection, owner);
  } catch (error) {
    throw new Error(`Failed to resolve owner: ${owner.toBase58()}`);
  }
}
