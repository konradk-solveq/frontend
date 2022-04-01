import React, {useMemo} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import {useRoute} from '@react-navigation/native';
import {BikeParamsRouteT} from '@type/rootStack';
import GenericScreen from '@pages/template/GenericScreen';
import {Header3, BodyPrimary} from '@components/texts/texts';
import {Parameter} from '@models/bike.model';
import {HorizontalDivider} from '@components/divider';
import {getFVerticalPx, getFHorizontalPx} from '@helpers/appLayoutDimensions';
import colors from '@theme/colors';

interface Props {}

interface CategoryPropsI {
    name: string;
    list: Parameter[];
}

interface ListItemI {
    item: Parameter;
}

const ListItem = ({item}: ListItemI) => (
    <View style={styles.listItem}>
        <View style={styles.itemContent}>
            <BodyPrimary style={styles.itemName}>{item.name}</BodyPrimary>
        </View>
        <View style={styles.itemContent}>
            <BodyPrimary style={styles.itemValue}>{item.value}</BodyPrimary>
        </View>
    </View>
);

const Category = ({name, list}: CategoryPropsI) => {
    return (
        <View style={styles.category}>
            <Header3 style={styles.title}>{name}</Header3>
            {list.length &&
                list.map((item, idx) => (
                    <React.Fragment key={item.name}>
                        <ListItem item={item} />
                        {idx !== list.length - 1 && <HorizontalDivider />}
                    </React.Fragment>
                ))}
        </View>
    );
};

const BikeParams: React.FC<Props> = () => {
    const {t} = useMergedTranslation('MainBikeParams');
    const {params: routeParams} = useRoute<BikeParamsRouteT>();
    const {description, params} = routeParams;

    const descriptionList = useMemo<Parameter[]>(
        () => [
            {
                name: t('color'),
                value: description?.color || t('noData'),
            },
            {
                name: t('size'),
                value: description?.size || t('noData'),
            },
        ],
        [description?.color, description?.size, t],
    );
    return (
        <GenericScreen screenTitle={t('header')} contentBelowHeader>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Category name={t('description')} list={descriptionList} />
                    {params?.length &&
                        params.map(
                            param =>
                                param.list?.length && (
                                    <Category
                                        name={param.name}
                                        list={param.list}
                                        key={param.name}
                                    />
                                ),
                        )}
                </ScrollView>
            </View>
        </GenericScreen>
    );
};

export default BikeParams;

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    category: {
        paddingBottom: getFVerticalPx(16),
        width: '100%',
    },
    title: {
        marginBottom: getFVerticalPx(8),
        marginLeft: getFHorizontalPx(16),
    },
    listItem: {
        paddingVertical: getFVerticalPx(16),
        paddingHorizontal: getFHorizontalPx(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
    itemName: {
        color: colors.darkGrey,
    },
    itemValue: {
        textAlign: 'right',
    },
    itemContent: {
        flex: 1,
    },
});
