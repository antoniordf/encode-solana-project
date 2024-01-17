use anchor_lang::prelude::*;

use crate::states::CompetitionOwner;


#[derive(Accounts)]
#[instruction()]
pub struct InitCompetitionOwner<'info> {
    #[account(
        init,
        payer=authority,
        space=CompetitionOwner::storage_size()
    )]
    pub competition_owner: Box<Account<'info, CompetitionOwner>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

// Handler for Manage Competition calls (add/edit)
pub fn handler<>(ctx: Context<InitCompetitionOwner>, count: u32) -> Result<Pubkey> {

    // Account for holding competition owner and related vars
    let owner: &mut Box<Account<'_, CompetitionOwner>> = &mut ctx.accounts.competition_owner;
    owner.competition_count = count | 0;

    Ok( owner.key() )
}
