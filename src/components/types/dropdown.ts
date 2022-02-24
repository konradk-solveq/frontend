export type SortByType = 'created' | 'distance';
export type OrderType = 'asc' | 'desc';

export type DropdownItemT = {
    id: string;
    sortBy: SortByType;
    order: OrderType;
    text: string;
    isDefault?: boolean;
    defaultItemSuffix?: string;
};
