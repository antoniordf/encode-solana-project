import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Block2win } from "../target/types/block2win";

describe("block2win", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Block2win as Program<Block2win>;

  it("Is initialized!", async () => {

    console.log( program.methods );

    // Add your test here.
    const tx = await program.methods.manageCompetition(
      'Name',
      'Description'
    ).rpc();
    console.log("Your transaction signature", tx);
  });
});
