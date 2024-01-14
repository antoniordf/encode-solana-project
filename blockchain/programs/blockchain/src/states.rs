use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct CompetionUser {
    pub authority: PubKey
}

#[account]
#[derive(Default)]
pub struct CompetionModel {
    pub authority: PubKey,
    pub idx: u8,
    pub title: String,
    pub description: String,
    pub poolprize: i64,
    pub entrycost: f64,
    pub totaltickets: i64,
    pub soldtickets: i64,
    pub maxentries: i64,
    pub opendate: i64,
    pub closedate: i64,
    pub entries: Vec<T>
}