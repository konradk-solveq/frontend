export type Consent = {
    id: number;
    name: string;
    short_content?: string | null;
    content: string;
    baseHash: string;
    checked: boolean;
    display_type: number;
    disabled: boolean;
    functionality: string[] | [];
};
