use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction()]
pub struct BuyTickets{

    // Accounts needed to buy tickets

}

pub fn handler(ctx: Context<BuyTickets>, account: Pubkey, number: u16) -> Result<()> {

    // Logic for handling purchase of tickets

    Ok(())
}