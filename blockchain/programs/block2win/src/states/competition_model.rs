use anchor_lang::prelude::*;


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
    //#[account(init, bump, space = 8 + 32 + 32 + 8 + 8 + 8 + 8 + 8 + 8 + 8 + 8)]

    // Dynamic array for storage of entries - unknown size
    //pub entries: Vec<Account<'info, CompetitionUser>>
}


impl CompetitionModel {

    /// Calculate storage size of or fixed struct plus the dynamic size of entires
    pub fn storage_size() -> u64 {
        //let entry_size = std::mem::size_of::<CompetitionUser>() as u64;
        //let entries_size = self.entries.len() as u64 * entry_size;
        //let fixed_size = std::mem::size_of::<CompetitionModel>() as u64;
        let fixed_size = 128;
        8 + fixed_size
    }
}