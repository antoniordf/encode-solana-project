use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct CompetitionModel<T> {
    
    /// Owner Account - 32
    pub authority: PubKey,

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
    pub opendate: u64,

    /// Timestamp for closing date of competition - 8
    pub closedate: u64,

    /// Dynamic array for storage of entries - unknown size
    pub entries: Vec<T>
}


impl<T> CompetitionModel<T> {

    /// Calculate storage size of or fixed struct plus the dynamic size of entires
    pub fn storage_size(&self) -> usize {
        let entry_size = std::mem::size_of::<T>();
        let entries_size = self.entries.len() * entry_size;
        let fixed_size = std::mem::size_of::<CompetitionModel<T>>();
        8 + fixed_size + entries_size
    }
}