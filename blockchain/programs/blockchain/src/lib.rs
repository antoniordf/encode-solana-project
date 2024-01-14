use anchor_lang::prelude::*;

pub mod error;
pub mod states;
use crate::{error::*,states::*}

declare_id!("9TN3ZKV1B5ARTUjBgigHAL7iQDZAStYxfGGAjqEtu9XX");

// Init structs with default values

// Competition CRUD's

// Roll over competion (relaunch with new dates and existing entires??)

// Enter competition (buy tickets)

// Close Competion (close the PDA??)

// Draw Winning Entry ID.

#[program]
pub mod block2win {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
