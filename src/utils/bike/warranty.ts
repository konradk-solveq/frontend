const SEASON_KEYWORD = 'season';
const WARRANTY_KEYWORD = 'warranty';
const PERIODIC_KEYWORD = 'periodic';

export const checkSeasonal = (type: string) => type.includes(SEASON_KEYWORD);
export const checkPeriodic = (type: string) => type.includes(PERIODIC_KEYWORD);
export const checkWarranty = (type: string) => type.includes(WARRANTY_KEYWORD);
