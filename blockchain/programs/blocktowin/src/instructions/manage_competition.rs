use anchor_lang::prelude::*;

use crate::states::CompetitionOwner;
use crate::states::CompetitionModel;

use crate::constant::*;


#[derive(Accounts)]
#[instruction()]
pub struct ManageCompetition<'info> {
    #[account(
        init,
        seeds=[b"manage-competition", owner.key().as_ref(), &[owner.competition_count as u8].as_ref() ],
        bump,
        payer=authority,
        space=CompetitionModel::storage_size(&CompetitionModel::default())
    )]
    pub competition: Box<Account<'info, CompetitionModel>>,

    #[account(mut)]
    pub owner: Box<Account<'info, CompetitionOwner>>,

    #[account(mut)]
    pub authority: Signer<'info>,  // TODO admin contract owner check??

    pub system_program: Program<'info, System>,

    pub clock: Sysvar<'info, Clock>,
}

// Handler for Manage Competition calls (add/edit)
pub fn handler<>(ctx: Context<ManageCompetition>, title: String, description: String) -> Result<()> {

    // PDA account for holding competition
    let competition: &mut Box<Account<'_, CompetitionModel>> = &mut ctx.accounts.competition;

    let owner: &mut Box<Account<'_, CompetitionOwner>> = &mut ctx.accounts.owner;

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


    competition.idx = owner.competition_count;

    owner.competition_count += 1;
    competition.bump = owner.competition_count as u8;

    Ok(())
}
