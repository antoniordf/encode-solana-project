import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Blocktowin } from "../target/types/blocktowin";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";

describe("blocktowin", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Blocktowin as Program<Blocktowin>;

  const signer = anchor.web3.Keypair.generate();
  console.log("Local signer is: ", signer.publicKey.toBase58());

  const connection = anchor.getProvider().connection;

  let confirmOptions = {
    skipPreflight: true
  };


  /*
  before(async () => {
    console.log(new Date(), "requesting airdrop");
    const airdropTx = await connection.requestAirdrop(
      signer.publicKey,
      2 * anchor.web3.LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(airdropTx);
  });
  */


  it("can fetch all competitions", async () => {
    const comps = await program.account.competitionModel.all();
    console.log("Your Competitions", comps);
  });

  it("Add Competition", async () => {

    console.log( program.methods );
    console.log( program.programId );

    
    let [competition] = findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode("manage-competition"),
        signer.publicKey.toBuffer(),
      ],
      program.programId
    );

    console.log(competition);
    

    // Add your test here.
    const tx = await program.methods.manageCompetition(
      'Test Name',
      'Test Description'
    ).accounts({
      competition: competition,
      authority: signer.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId //program.programId
    })
    .signers([signer])
    .rpc();

    console.log("Your transaction signature", tx);
  });
});
