export interface FCPropsI {
    onChange: (...event: any[]) => void;
    value: any;
    isValid: boolean;
    errMsg: string | undefined;
}

export type FormData = {[x: string]: string | undefined};
