import {useEffect} from 'react';
import {useForm} from 'react-hook-form';

import {useAppSelector} from './redux';
import {mapOptionsAndTagsSelector} from '../storage/selectors/app';
import {FormData} from '../pages/main/world/editDetails/form/inputs/types';
import {I18n} from '../../I18n/I18n';
import {Map, SelectI} from '../models/map.model';
import {mapDataToFormData} from '../utils/transformData';

type ValueType = string | boolean | SelectI | undefined | string[];

const useFormDataWithMapData = (mapData: Map | undefined) => {
    const trans: any = I18n.t('RoutesDetails.EditScreen');
    const options = useAppSelector(mapOptionsAndTagsSelector);
    const {
        control,
        handleSubmit,
        setValue,
        setError,
        setFocus,
    } = useForm<FormData>();

    useEffect(() => {
        if (mapData) {
            const newMapData = mapDataToFormData(mapData);

            Object.keys(newMapData).forEach(md => {
                const k: any = md;
                let v: ValueType = newMapData[k as keyof FormData];
                if (typeof v === 'object' && !Array.isArray(v)) {
                    v = v?.values;
                }

                setValue(k, v);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {control, handleSubmit, setValue, setError, setFocus, options};
};

export default useFormDataWithMapData;
