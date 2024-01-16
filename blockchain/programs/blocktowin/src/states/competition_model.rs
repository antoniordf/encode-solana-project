use anchor_lang::prelude::*;

use crate::states::CompetitionUser;

#[account]
#[derive(Default)]
pub struct CompetitionModel {
    
    /// Owner Account - 32
    pub authority: Pubkey,

    /// Competition ID - 4
    pub idx: u32,

    /// Competition Title - 32
    pub title: String,

    /// Competition Description - 32
    pub description: String,

    /// Pool Prize value in Lamports (1 Billion Lamports = 1 Sol) - 8
    pub poolprize: u64,

    /// Ticket Cost in Lamports (1 Billion Lamports = 1 Sol) - 8
    pub entrycost: u64,

    /// Total Tickets available in competition - 8
    pub totaltickets: u64,

    /// Tracker for current tickets sold so far - 8
    pub soldtickets: u64,

    /// Max number of entries/tickets per user - 8
    pub maxentries: u64,

    /// Timestamp for open date tickets can be bought from - 8
    pub opendate: i64,

    /// Timestamp for closing date of competition - 8
    pub closedate: i64,

    /// Bump var for PDA
    pub bump: u8,

    // Dynamic array for storage of entries
    pub entries: [Option<CompetitionUser>; 10]
}


impl CompetitionModel {

    /// Calculate storage size of or fixed struct plus the dynamic size of entires
    pub fn storage_size(_instance: &CompetitionModel) -> usize {
        //let entry_size = std::mem::size_of::<CompetitionUser>();
        //let entries_size = instance.entries.len() * entry_size;
        let fixed_size: usize = std::mem::size_of::<CompetitionModel>();
        8 + fixed_size
    }
}