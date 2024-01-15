use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct CompetitionUser {

    /// Competition users public address - 32
    pub authority: Pubkey
}

impl CompetitionUser {
    /// Calculate storage size based on struct defined above
    pub fn storage_size(&self) -> u64 {
        std::mem::size_of::<CompetitionUser>() as u64
    }
}