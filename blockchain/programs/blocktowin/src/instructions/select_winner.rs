use crate::error::ErrorCodes;
use crate::states::CompetitionModel;
use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction()]
pub struct SelectWinner<'info> {
    // Accounts needed to process selection
    #[account(mut)]
    pub competition: Account<'info, CompetitionModel>,

    #[account(mut)]
    pub authority: Signer<'info>, // TODO admin contract owner check??

    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<SelectWinner>) -> Result<Pubkey> {
    // Logic for handling selection of winner
    // Flatten the entries array into a new vector where each user appears a number of times equal to their number of tickets
    let mut weighted_entries: Vec<&crate::CompetitionUser> = Vec::new();
    for entry_option in ctx.accounts.competition.entries.iter() {
        if let Some(entry) = entry_option {
            for _ in 0..entry.tickets {
                weighted_entries.push(entry);
            }
        }
    }

    // Get the current block's timestamp
    let timestamp: i64 = Clock::get()?.unix_timestamp;

    // Use the timestamp as a seed to generate a pseudo-random number
    let random_number: usize = timestamp as usize % weighted_entries.len();

    // Select the winner
    let winner: Pubkey = weighted_entries[random_number].authority;

    Ok(winner)
}
