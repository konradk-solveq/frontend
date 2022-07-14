import linkify from 'linkify-it';
import {DEEPLINKING_NAMESPACE} from '@env';
import {ActionType} from '@models/regulations.model';
const linking = linkify();

linking.add(`${DEEPLINKING_NAMESPACE}:/`, {
    validate: (text, pos, self) => {
        const tail = text.slice(pos);
        if (!self.re[DEEPLINKING_NAMESPACE]) {
            self.re[DEEPLINKING_NAMESPACE] = new RegExp(/(\/[a-z-]*)+/);
        }
        const output = tail.match(self.re[DEEPLINKING_NAMESPACE]);
        if (output?.length && output.index === 0 && output[0].length > 1) {
            return output[0].length;
        }
        return false;
    },
});

export default linking;

export const addNotificationLinks = (text: string, actions: ActionType[]) => {
    if (!text) {
        return '';
    }
    let result = text;
    if (!actions.length) {
        return result;
    }
    for (let i = 0; i < actions.length; i++) {
        const action = actions[i];
        result = result.split(action.match).join(action.value);
    }
    return result;
};
