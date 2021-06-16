import {PickedFilters} from '../../interfaces/form';

export const checkIfContainsFitlers = (filters?: PickedFilters): boolean => {
    if (!filters) {
        return false;
    }

    if (Object.keys(filters)?.length === 0 || !Object.keys(filters)?.length) {
        return true;
    }

    let isValid = false;
    Object.keys(filters).forEach(f => {
        if (filters?.[f]?.length) {
            isValid = true;
        }
    });

    return isValid;
};

export const getFiltersParam = (filters?: PickedFilters) => {
    if (!filters || !Object.keys(filters)?.length) {
        return {};
    }

    let newFilters = {};
    Object.keys(filters).forEach(f => {
        if (filters?.[f]?.length) {
            /* TODO: remove replacement after fix on API */
            const cKeyD = f === 'difficulties' ? 'difficulty' : '';
            const cKeyS = f === 'surfaces' ? 'surface' : '';
            const cKeyT = f === 'tags' ? 'tag' : '';
            const key = cKeyD || cKeyS || cKeyT || f;
            /* array values */
            newFilters = {
                ...newFilters,
                [key]: filters[f],
            };
            /* string values */
            if (f === 'order') {
                newFilters = {
                    ...newFilters,
                    sortBy: 'created',
                    order: filters[f]?.[0],
                };
            }
        }
    });

    return newFilters;
};
