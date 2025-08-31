import { ethers } from "hardhat";
import * as hre from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { FhevmType } from "@fhevm/hardhat-plugin";

/**
 * Deploys DataChain and exposes helpers for encrypted inputs and decryption.
 * Requires: @fhevm/hardhat-plugin loaded and running in MOCK (local hardhat).
 */
export async function deployDataChainFixture() {
  const [owner, seller, buyer, buyer2] = await ethers.getSigners();

  const Factory = await ethers.getContractFactory("DataChain");
  const datachain = await Factory.deploy();
  await datachain.waitForDeployment();
  const datachainAddress = await datachain.getAddress();

  /** Create an encrypted euint32 for a specific (contract,user) pair. */
  async function enc32For(user: HardhatEthersSigner, value: number | bigint) {
    const input = hre.fhevm.createEncryptedInput(datachainAddress, user.address);
    input.add32(BigInt(value));
    const { handles, inputProof } = await input.encrypt();
    return { handle: handles[0], inputProof };
  }

  /** Decrypt an euint32 handle for a given user (mock-only helper). */
  async function decryptEuint32(user: HardhatEthersSigner, handle: any) {
    return await hre.fhevm.userDecryptEuint(
      FhevmType.euint32,
      handle,
      datachainAddress,
      user
    );
  }

  return {
    owner,
    seller,
    buyer,
    buyer2,
    datachain,
    datachainAddress,
    enc32For,
    decryptEuint32,
  };
}
