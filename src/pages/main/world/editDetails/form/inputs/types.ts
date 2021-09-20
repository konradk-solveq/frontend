export interface FCPropsI {
    onChange: (...event: any[]) => void;
    value: any;
    isValid: boolean;
    errMsg: string | undefined;
}

export type FormData = {
    id: string;
    name: string;
    publishWithName: boolean;
    description?: string;
    difficulty?: string[];
    surface?: string[];
    tags?: string[];
};
