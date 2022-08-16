import linkify from 'linkify-it';
import {DEEPLINKING_NAMESPACE} from '@env';
import {ActionType, NestedParagraphType} from '@models/regulations.model';
import {isIOS} from '@utils/platform';
const linking = linkify();

linking.add(`${DEEPLINKING_NAMESPACE}:/`, {
    validate: (text, pos, self) => {
        const tail = text.slice(pos);
        if (!self.re[DEEPLINKING_NAMESPACE]) {
            self.re[DEEPLINKING_NAMESPACE] = new RegExp(/(\/?[a-z-A-Z]*)+/);
        }
        const output = tail.match(self.re[DEEPLINKING_NAMESPACE]);
        if (output?.length && output.index === 0 && output[0].length > 1) {
            return output[0].length;
        }
        return false;
    },
});

export default linking;

const applyLinks = (value: string, action: ActionType) => {
    if (action.type === 'internal_uri') {
        return value
            .split(action.match)
            .join(
                `${DEEPLINKING_NAMESPACE}:/${isIOS ? '' : '/'}${action.value}`,
            );
    }
    return value.split(action.match).join(action.value);
};

export const compareUrls = (url: string, action: ActionType) => {
    const actionUrl = action.value;
    return (
        url === actionUrl ||
        url === `${DEEPLINKING_NAMESPACE}:/${isIOS ? '' : '/'}${actionUrl}`
    );
};

export const addNotificationLinks = (
    text: string | NestedParagraphType[],
    actions: ActionType[],
) => {
    if (!text) {
        return '';
    }
    let result = text;
    if (!actions.length) {
        return result;
    }
    for (let i = 0; i < actions.length; i++) {
        const action = actions[i];
        if (typeof result === 'string') {
            result = applyLinks(result, action);
        } else {
            result.map(({phrase, bold}) => ({
                bold,
                phrase: applyLinks(phrase, action),
            }));
        }
    }
    return result;
};
