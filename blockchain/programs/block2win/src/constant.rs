use anchor_lang::prelude::*;

#[constant]
pub const DEFAULT_PRIZE_POOL: u16 = 1_000_000;

#[constant]
pub const DEFAULT_TICKET_COUNT: u16 = 10;

#[constant]
pub const DEFAULT_MAX_ENTRIES: u16 = 5;

#[constant]
pub const PROFIT_RATIO: u16 = 2;

//#[constant]
//pub const DEFAULT_ENTRY_COST: u16 = 1000_000_000 / (1_000_000 / 10); /// 0.001 SOL