use anchor_lang::prelude::*;

pub mod constant;
pub mod error;
pub mod instructions;
pub mod states;

pub use error::ErrorCodes;
pub use instructions::*;
pub use states::*;

declare_id!("HgDCYQefJ2eWbi4MKXLhuNTVAYzVyD6pxrWnk79Zqs57");

// Init structs with default values

// Competition CRUD's

// Roll over competion (relaunch with new dates and existing entires??)

// Enter competition (buy tickets)

// Close Competion (close the PDA??)

// Draw Winning Entry ID.

#[program]
pub mod blocktowin {

    use super::*;

    // Create competition owner account
    pub fn init_competitions(
        ctx: Context<InitCompetitionOwner>,
        count: u32
    ) -> Result<Pubkey> {
        instructions::init_competitions::handler(ctx, count)
    }

    /// Add, edit competition
    pub fn manage_competition(
        ctx: Context<ManageCompetition>,
        title: String,
        description: String,
    ) -> Result<()> {
        instructions::manage_competition::handler(ctx, title, description)
    }

    /// Buy Tickets - entry to competition
    pub fn buy_tickets(ctx: Context<BuyTickets>, account: Pubkey, number: u16) -> Result<()> {
        instructions::buy_tickets::handler(ctx, account, number)
    }

    /// Select Winner
    pub fn select_winner(ctx: Context<SelectWinner>) -> Result<Pubkey> {
        instructions::select_winner::handler(ctx)
    }
}
