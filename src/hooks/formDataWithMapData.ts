import {useEffect} from 'react';
import {useForm} from 'react-hook-form';

import {
    FormData,
    OptionType,
} from '../pages/main/world/editDetails/form/inputs/types';
import {I18n} from '../../I18n/I18n';
import {Map} from '../models/map.model';
import {mapDataToFormData} from '../utils/transformData';

const useFormDataWithMapData = (mapData: Map | undefined) => {
    const trans: any = I18n.t('RoutesDetails.EditScreen');
    const {control, handleSubmit, setValue} = useForm<FormData>();

    useEffect(() => {
        if (mapData) {
            const newMapData = mapDataToFormData(
                mapData,
                trans.attributes.level.options,
                trans.attributes.pavement.options,
                trans.attributes.tags.options,
            );

            Object.keys(newMapData).forEach(md => {
                const k: any = md;
                const v: string | boolean | OptionType[] =
                    newMapData[k as keyof FormData];
                setValue(k, v);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {control, handleSubmit, setValue};
};

export default useFormDataWithMapData;
