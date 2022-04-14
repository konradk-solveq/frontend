const STANDARD_HTML_ENTITIES: {
    [key: string]: string;
} = {
    nbsp: String.fromCharCode(160),
    amp: '&',
    quot: '"',
    lt: '<',
    gt: '>',
};

export const decodeSvg = (plainTextString: string) => {
    return plainTextString
        .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
        .replace(
            /&(nbsp|amp|quot|lt|gt);/g,
            (a, b) => STANDARD_HTML_ENTITIES[b],
        );
};
