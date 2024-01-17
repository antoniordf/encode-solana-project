use crate::error::ErrorCodes;
use crate::states::CompetitionModel;
use crate::CompetitionUser;
use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction()]
pub struct BuyTickets<'info> {
    // Accounts needed to buy tickets
    #[account(mut)]
    pub buyer: Signer<'info>,

    #[account(mut)]
    pub competition: Account<'info, CompetitionModel>,

    pub system_program: Program<'info, System>,

    //#[account(mut)]
    //pub user_competition_tickets: Account<'info, CompetitionUser>,
}

// Why is number u16 here and u64 in the state?
pub fn handler(ctx: Context<BuyTickets>, account: Pubkey, number: u16) -> Result<()> {
    // Logic for handling purchase of tickets
    let competition = &mut ctx.accounts.competition;

    let clock: Clock = Clock::get()?;
    let current_timestamp: i64 = clock.unix_timestamp;

    if current_timestamp > competition.closedate || current_timestamp < competition.opendate {
        return Err(ErrorCodes::NotAllowed.into());
    }

    if competition.soldtickets + number as u64 > competition.totaltickets {
        return Err(ErrorCodes::MaxEntries.into());
    }

    // Do we need to create a PDA for this buyer/competition if one doesnt exist?

    // Check if user already has entries
    //let user_competition_tickets: &mut Account<'_, CompetitionUser> =
    //    &mut ctx.accounts.user_competition_tickets;
    // TODO check if this is correct
    //if user_competition_tickets.tickets > competition.maxentries as i64 {
    //    return Err(ErrorCodes::AlreadyEntered.into());
    //}

    // TODO check if user has enough funds

    Ok(())
}
