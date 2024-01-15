use anchor_lang::prelude::*;

use crate::constant::*;
use crate::states::CompetitionModel;

#[derive(Accounts)]
#[instruction(title: String, description: String)]
pub struct ManageCompetition<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,  /// TODO admin contract owner check??

    #[account(
        init,
        seeds=[b"manage-competition", authority.key().as_ref()],
        bump,
        payer=authority,
        space=states::CompetitionModel::storage_size()
    )]
    pub competition: Box<Account<'info, CompetitionModel>>,

    pub system_program: Program<'info, System>,

    pub clock: Sysvar<'info, Clock>,
}

/// Handler for Manage Competition calls (add/edit)
pub fn handler(ctx: Context<ManageCompetition>, title: String, description: String) -> Result<()> {

    /// PDA account for holding competition
    let competition: &mut Box<Account<'_, CompetitionModel<_>>> = &mut ctx.accounts.competition;

    /// Setup competition vars
    competition.authority = ctx.accounts.authority.key(); /// need to enforce is admin
    competition.title = title;
    competition.description = description;
    competition.poolprize = constant::DEFAULT_PRIZE_POOL;
    competition.totaltickets = constant::DEFAULT_TICKET_COUNT;
    competition.maxentries = constant::DEFAULT_PRIZE_POOL;
    competition.entrycost = (competition.poolprize / competition.totaltickets) * constant::PROFIT_RATIO; /// any rounding risk?
    
    competition.soldtickets = 0;
    
    let clock = Clock::get()?;
    let current_timestamp = clock.unix_timestamp;

    competition.opendate = current_timestamp;
    competition.closedate = current_timestamp + (5 * 60); // 5 minutes

    competition.idx = *ctx.bumps.get("manage_competition").unwrap();

    //competion.bump = *ctx.bumps.get("manage_competition").unwrap(); // not sure if we need bump yet to prevent duplication

    Ok(())
}
