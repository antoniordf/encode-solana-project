use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCodes {
    #[msg("You are not authorised to do this.")]
    Unauthorized,
    #[msg("Not allowed")]
    NotAllowed,
    #[msg("Already entered into competion")]
    AlreadyEntered,
    #[msg("Max number of entries exceeded")]
    MaxEntries
}