use anchor_lang::prelude::*;

declare_id!("9TN3ZKV1B5ARTUjBgigHAL7iQDZAStYxfGGAjqEtu9XX");

#[program]
pub mod blockchain {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
