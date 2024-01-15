use anchor_lang::prelude::*;

use crate::states::CompetitionModel;

use crate::constant::*;


#[derive(Accounts)]
#[instruction()]
pub struct ManageCompetition<'info> {
    #[account(
        init,
        seeds=[b"manage-competition", authority.key().as_ref()],
        bump,
        payer=authority,
        space=CompetitionModel::storage_size(&CompetitionModel::default())
    )]
    pub competition: Account<'info, CompetitionModel>,

    #[account(mut)]
    pub authority: Signer<'info>,  // TODO admin contract owner check??

    pub system_program: Program<'info, System>,

    pub clock: Sysvar<'info, Clock>,
}

// Handler for Manage Competition calls (add/edit)
pub fn handler<>(ctx: Context<ManageCompetition>, title: String, description: String) -> Result<()> {

    // PDA account for holding competition
    let competition: &mut Account<'_, CompetitionModel> = &mut ctx.accounts.competition;

    // Setup competition vars
    competition.authority = ctx.accounts.authority.key(); // need to enforce is admin
    competition.title = title;
    competition.description = description;
    competition.poolprize = DEFAULT_PRIZE_POOL;
    competition.totaltickets = DEFAULT_TICKET_COUNT;
    competition.maxentries = DEFAULT_PRIZE_POOL;
    competition.entrycost = (competition.poolprize / competition.totaltickets) * PROFIT_RATIO; // any rounding risk?
    
    competition.soldtickets = 0;
    
    let clock = Clock::get()?;
    let current_timestamp = clock.unix_timestamp;

    competition.opendate = current_timestamp;
    competition.closedate = current_timestamp + (5 * 60); // 5 minutes

    competition.bump = ctx.bumps.competition; //get("competition").unwrap();

    Ok(())
}
