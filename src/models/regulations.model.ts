export type ActionType = {
    type: 'internal_uri' | 'external_uri' | 'email'; // action type
    value: string; // value on which the action should be executed (eg email address)
    text: string; // the content to be rendered on the front (inside th text)
    match: string; // the content which should be replaced with the desired action (eg. {{replace_me}} )
};

export type ParagraphType = {
    font: 'bold' | 'normal';
    marginTop: number;
    text: string;
};

export type MessageContentType = {
    text: string;
    title: string;
    header?: string;
};

export type LegalDocumentVersionType = {
    content?: MessageContentType;
    id: number;
};

export type LegalDocumentType = {
    current: LegalDocumentVersionType;
    next?: LegalDocumentVersionType;
};

export type NotificationContentType = {
    language: string;
    id: number;
    data: MessageContentType;
    actions: ActionType[];
};

export type NotificationType = {
    type: string;
    content: NotificationContentType;
};

export type FaqType = {
    question: string;
    answer: string;
};

export type AppVersionType = {
    latest: string;
    current: string;
    forceUpdate: boolean;
};

export class AppRegulations {
    constructor(
        public regulation: LegalDocumentType,
        public policy: LegalDocumentType,
        public notification: string,
    ) {
        this.regulation = regulation;
        this.policy = policy;
        this.notification = notification;
    }
}

export interface AppRegulationsI extends AppRegulations {}
