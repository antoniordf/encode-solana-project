import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Blocktowin } from "../target/types/blocktowin";
import { PublicKey } from "@solana/web3.js";
// import { CompetitionUser } from "../target/types/blocktowin"; // Import the CompetitionUser class
import { expect } from "chai";

describe("blocktowin", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Blocktowin as Program<Blocktowin>;

  it("Is initialized!", async () => {
    console.log(program.methods);

    // Add your test here.
    const tx = await program.methods
      .manageCompetition("Name", "Description")
      .rpc();
    console.log("Your transaction signature", tx);
  });

  // testing the select winner function
  it("should select a winner", async () => {
    // Create a competition.
    const competition = anchor.web3.Keypair.generate();
    const authority = anchor.web3.Keypair.generate();

    // Create some entries in the competition.
    const entries = [
      { authority: new PublicKey("somePublicKey1"), tickets: 5 },
      { authority: new PublicKey("somePublicKey2"), tickets: 3 },
      { authority: new PublicKey("somePublicKey3"), tickets: 2 },
      // Add more entries as needed
    ];

    // Save the competition to the blockchain.
    await program.methods.manageCompetition(
      "Test Competition",
      "This is a test competition"
    );

    // Buy tickets for each entry.
    // Call the select_winner function.
    const winner = await program.methods.selectWinner();

    // Check that a winner was selected.
    expect(winner).to.be.instanceOf(PublicKey);
  });
});
