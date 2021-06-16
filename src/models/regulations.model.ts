export type TermsAndConditionsType = {
    version: string;
    showDate: Date | undefined;
    publishDate: Date | undefined;
    title: string;
    text: string;
};

export type CompositeText = {
    phrase: string;
    bold: boolean;
};

export type TextType = {
    marginTop?: number;
    font?: string;
    text: string | CompositeText[];
};

export type RegulationType = {
    version: string;
    header: string;
    title: string;
    paragraph: TextType[];
};

export class AppRegulations {
    constructor(
        public termsAndConditions: TermsAndConditionsType[],
        public regulation: RegulationType,
        public policy: RegulationType,
    ) {
        this.termsAndConditions = termsAndConditions;
        this.regulation = regulation;
        this.policy = policy;
    }
}

export interface AppRegulationsI extends AppRegulations {}
