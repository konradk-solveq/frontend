import {useEffect} from 'react';
import {useForm, FieldValues, Control} from 'react-hook-form';
import {Map} from '../models/map.model';
import {mapDataToFormData} from '../utils/transformData';
import {FormData} from '@type/editDetailsForm';

type ValueType = string | boolean | undefined | string[];
export type FormControlT = Control<FieldValues>;

const useFormDataWithMapData = (mapData: Map | undefined, publish: boolean) => {
    const {
        control,
        handleSubmit,
        setValue,
        setError,
        setFocus,
        getValues,
    } = useForm<FieldValues>();

    useEffect(() => {
        if (mapData) {
            const newMapData = mapDataToFormData(mapData);

            Object.keys(newMapData).forEach(md => {
                const k: any = md;
                let v: ValueType = newMapData[k as keyof FormData];

                setValue(k, v);
            });
        }
        if (publish) {
            setValue('publishWithName', true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        control,
        handleSubmit,
        setValue,
        setError,
        setFocus,
        getValues,
    };
};

export default useFormDataWithMapData;
