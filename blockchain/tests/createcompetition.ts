import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Blocktowin } from "../target/types/blocktowin";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";

describe("blocktowin", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Blocktowin as Program<Blocktowin>;

  const owner = anchor.web3.Keypair.generate();
  console.log("Local owner is: ", owner.publicKey.toBase58());

  const signer = anchor.web3.Keypair.generate();
  console.log("Local signer is: ", signer.publicKey.toBase58());

  const connection = anchor.getProvider().connection;
  let ownerkey = '';
  let count = 0;

  it("get current competitions", async () => {
    const comps = await program.account.competitionModel.all();
    count = comps.length;
    console.log("Your Competitions", comps);
  });

  /*
  
  it("can init competition owner", async () => {
    ownerkey = await program.methods.initCompetitions(count).accounts({
      competitionOwner: owner.publicKey
    })
    .signers([owner])
    .rpc();
    console.log("Your Competition Owner:", ownerkey);
  });
  */

  /*
  before(async () => {
    console.log(new Date(), "requesting airdrop");
    const airdropTx = await connection.requestAirdrop(
      signer.publicKey,anchor build

      2 * anchor.web3.LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(airdropTx);
  });
  */

  /*

  it("Add Competitions", async () => {

    console.log( program.methods );
    console.log( program.programId );

    
    let [competition] = findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode("manage-competition"),
        owner.publicKey.toBuffer(),
        Buffer.from([count])
      ],
      program.programId,
    );

    let [competitionb] = findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode("manage-competition"),
        owner.publicKey.toBuffer(),
        Buffer.from([count+1])
      ],
      program.programId
    );

    console.log(competition);
    

    // Add first competition
    const tx = await program.methods.manageCompetition(
      'Test Comp A - ' + count,
      'Test Description A'
    ).accounts({
      competition: competition,
      owner:owner.publicKey
    })
    .rpc();

    console.log("Add Competition 1 tx signature", tx);


    // Add second competition
    const txb = await program.methods.manageCompetition(
      'Test Comp B - ' + count,
      'Test Description B'
    ).accounts({
      competition: competitionb,
      owner:owner.publicKey
    })
    .rpc();
  
    console.log("Add Competition 2 tx signature", txb);

  });
  

  */

  //it("can fetch all competitions", async () => {
  //  const comps = await program.account.competitionModel.all();
  //  console.log("Your Competitions", comps);
  //});




  /*

  it("get current competitions", async () => {
    const comps = await program.account.competitionModel.all();
    console.log("Your Competitions", comps);

    // get first competition - debug some info
    let  mycomp;
    comps.forEach( comp => {
        if(comp.account.idx == 1){
            mycomp = comp;

            console.log(`Pool Prize ${ comp.account.poolprize.toNumber() }` );
            console.log(`Entry costs ${ comp.account.entrycost.toNumber() }` );
            console.log(`Total tickets ${ comp.account.totaltickets.toNumber() }` );
            console.log(`Sold tickets ${ comp.account.soldtickets.toNumber() }` );
            console.log(`Max  entries ${ comp.account.maxentries.toNumber() }` );
            console.log(`Open date ${ new Date( comp.account.opendate.toNumber() ).toISOString() }` );
            console.log(`Close date ${ new Date( comp.account.closedate.toNumber() ).toISOString() }` );

        }
    });

    // call buy tickets
    let txbuy = await program.methods.buyTickets(signer.publicKey, 200).accounts({
       competition: mycomp.publicKey,
    }).rpc();

    console.log("Your Purchase", txbuy);


  });

  */

  
});
