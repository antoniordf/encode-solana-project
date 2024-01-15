use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct CompetitionUser {

    /// Competition users public address - 32
    pub authority: PubKey
}

impl CompetitionUser {
    /// Calculate storage size based on struct defined above
    pub fn storage_size(&self) -> usize {
        8 + std::mem::size_of::<CompetitionUser>()
    }
}