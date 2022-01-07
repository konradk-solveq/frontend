export type UserConsentsResponseT = {
    base_hash: string;
    checked: boolean;
    content: string;
    disabled: boolean;
    display_type: number;
    functionality: string[];
    id: number;
    name: string;
    short_content: string;
};

export type UserConsentsErrorT = {
    error: string;
};
