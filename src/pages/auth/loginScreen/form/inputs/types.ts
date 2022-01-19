export interface FCPropsI {
    onChange: (...event: any[]) => void;
    value: any;
    isValid: boolean;
    errMsg: string | undefined;
}

export type FormData = {
    email: string;
    password: string;
};
