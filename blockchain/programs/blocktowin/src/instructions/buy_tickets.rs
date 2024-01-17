use crate::error::ErrorCodes;
use crate::states::{CompetitionModel, CompetitionUser};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct BuyTickets<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,

    #[account(mut)]
    pub competition: Account<'info, CompetitionModel>,

    pub system_program: Program<'info, System>,

    #[account(mut)]
    pub user_competition_tickets: Account<'info, CompetitionUser>,
}

pub fn handler(ctx: Context<BuyTickets>, number: u64) -> Result<()> {
    let competition = &mut ctx.accounts.competition;
    let user_competition_tickets = &mut ctx.accounts.user_competition_tickets;

    let clock: Clock = Clock::get()?;
    let current_timestamp: i64 = clock.unix_timestamp;

    // Check competition open and close dates
    if current_timestamp > competition.closedate || current_timestamp < competition.opendate {
        return Err(ErrorCodes::NotAllowed.into());
    }

    // Check for max ticket limit
    if competition.soldtickets + number > competition.totaltickets {
        return Err(ErrorCodes::MaxEntries.into());
    }

    // Check if user already has entries and enforce max entries per user
    if user_competition_tickets.tickets + number as i64 > competition.maxentries as i64 {
        return Err(ErrorCodes::AlreadyEntered.into());
    }

    // Additional logic to check if user has enough funds (handled in the client)

    // Update tickets
    competition.soldtickets += number;
    user_competition_tickets.tickets += number as i64;

    Ok(())
}
