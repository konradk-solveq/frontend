import {useEffect} from 'react';
import {useForm} from 'react-hook-form';

import {useAppSelector} from './redux';
import {mapOptionsAndTagsSelector} from '../storage/selectors/app';
import {FormData} from '../pages/main/world/editDetails/form/inputs/types';
import {Map} from '../models/map.model';
import {mapDataToFormData} from '../utils/transformData';

type ValueType = string | boolean | undefined | string[];

const useFormDataWithMapData = (mapData: Map | undefined) => {
    const options = useAppSelector(mapOptionsAndTagsSelector);
    const {
        control,
        handleSubmit,
        setValue,
        setError,
        setFocus,
        getValues,
    } = useForm<FormData>();

    useEffect(() => {
        if (mapData) {
            const newMapData = mapDataToFormData(mapData);

            Object.keys(newMapData).forEach(md => {
                const k: any = md;
                let v: ValueType = newMapData[k as keyof FormData];

                setValue(k, v);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        control,
        handleSubmit,
        setValue,
        setError,
        setFocus,
        options,
        getValues,
    };
};

export default useFormDataWithMapData;
