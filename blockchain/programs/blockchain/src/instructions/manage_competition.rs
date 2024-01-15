use anchor_lang::prelude::*;

pub mod constant;

use crate::states::CompetitionModel;

#[derive(Accounts)]
#[instruction()]
pub struct ManageCompetition<'info> {
    #[account(
        init,
        seeds=[b"manage-competition", authority.key().as_ref()],
        bump,
        payer=authority,
        space=CompetitionModel::storage_size()
    )]
    pub competition: Box<Account<'info, CompetitionModel>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

/// Handler for Manage Competition calls (add/edit)
pub fn handler(ctx: Context<ManageCompetition>, title: String, description: String) -> Result<()> {
    let competition = &mut ctx.accounts.competition;

    // set defaults
    competition.authority = ctx.accounts.authority.key();
    competition.title = title;
    competition.description = description;
    competition.soldtickets = 0;
    competition.idx = *ctx.bumps.get("manage_competition").unwrap(); // not sure if this is correct

    // calc pool costs
    competition.poolprize = constant::DEFAULT_PRIZE_POOL;
    competition.totaltickets = constant::DEFAULT_TICKET_COUNT;
    competition.maxentries = constant::DEFAULT_PRIZE_POOL;
    competition.entrycost = (competition.poolprize / competition.totaltickets) * constant::PROFIT_RATIO; /// any rounding risk?
    
    /// set times
    let clock = Clock::get()?;
    let current_timestamp = clock.unix_timestamp;
    competition.opendate = current_timestamp;
    competition.closedate = current_timestamp + (5 * 60); // 5 minutes

    Ok(())
}
