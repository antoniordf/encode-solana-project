import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Blocktowin } from "../target/types/blocktowin";

describe("blocktowin", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Blocktowin as Program<Blocktowin>;

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
