use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct CompetitionOwner {

    pub competition_count: u32,

}


impl CompetitionOwner {
    /// Calculate storage size based on struct defined above
    pub fn storage_size() -> usize {
        (8 + std::mem::size_of::<CompetitionOwner>()) as usize
    }
}