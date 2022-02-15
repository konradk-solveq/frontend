export type languagesListT = {
    code: string;
    name: string;
    icon: string;
}[];

export type translationsT = {
    [key: string]: {
        backend: any;
    }[];
};
