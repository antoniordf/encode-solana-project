use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct CompetitionUser {

    /// Competition users public address - 32
    pub authority: Pubkey,

    /// Number of tickets purchased
    pub tickets: i64
}

impl CompetitionUser {
    /// Calculate storage size based on struct defined above
    pub fn storage_size(&self) -> usize {
        std::mem::size_of::<CompetitionUser>() as usize
    }
}
