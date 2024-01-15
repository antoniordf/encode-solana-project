use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct CompetitionUser {

    /// Competition users public address - 32
    pub authority: PubKey
}

impl CompetitionUser {
    /// Calculate storage size based on struct defined above
    pub fn calculate_size(&self) -> usize {
        std::mem::size_of::<CompetitionUser>()
    }
}