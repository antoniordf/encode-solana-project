import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Blocktowin } from "../target/types/blocktowin";
import { PublicKey } from "@solana/web3.js";
import { expect } from "chai";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";

describe("blocktowin", () => {
  // Configure the client to use the local cluster.

  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Blocktowin as Program<Blocktowin>;


  // testing the select winner function
  it("should select a winner", async () => {
    // Create a competition.
    // const competition = anchor.web3.Keypair.generate();

    const signer = anchor.web3.Keypair.generate();
    let [competition] = findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode("manage-competition"),
        signer.publicKey.toBuffer(),
      ],
      program.programId
    );

    // Create some entries in the competition.

    const entries = [
      {
        authority: new PublicKey(
          "3GectP9Hqf3vjnypKqzRVmELR2rGUQ9LZb46qjKkghLL"
        ),
        tickets: 5,
      },
      {
        authority: new PublicKey(
          "8x8jf7ikJwgP9PZMdD4x8NqRi6m9C6iBZ9CqgBfzFvCz"
        ),
        tickets: 3,
      },
      {
        authority: new PublicKey(
          "DqTFLwhuR8ghrN7dYgo3zHtsrzLqH2vXoB9jtFoJZxeU"
        ),
        tickets: 2,
      },
      // Add more entries as needed
    ];

    // Save the competition to the blockchain.

    await program.methods
      .manageCompetition("Test Competition", "This is a test competition")
      .accounts({
        competition: competition,
        authority: signer.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([signer])
      .rpc();

    // Call the select_winner function.
    const winner = await program.methods
      .selectWinner()
      .accounts({
        competition: competition,
        authority: signer.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([signer])
      .rpc();

    // Check that a winner was selected.
    expect(winner).to.be.instanceOf(PublicKey);
  });
});
