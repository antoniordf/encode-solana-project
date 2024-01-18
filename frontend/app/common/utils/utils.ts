export const lamportsToSol = (lamports: number): number => lamports / 10**8

export const getDateFromTimestamp = (timestamp: number): Date => new Date(timestamp * 1000)
