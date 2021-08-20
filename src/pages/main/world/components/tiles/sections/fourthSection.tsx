import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';

import {MoreIcon} from '../../../../../../sharedComponents/svg/icons';

import styles from '../styles/commonStyles';
import stylesFourthSection from '../styles/stylesFourthSection';

import Like from '../../../../../../sharedComponents/svg/like';
import Comment from '../../../../../../sharedComponents/svg/comment';
import Download from '../../../../../../sharedComponents/svg/download';

interface IProps {
    likeGaved: boolean;
    onLikePress?: (state: boolean) => void;
    likeValue: number;
    commentGaved?: boolean;
    commentValue?: number;
    downloadGaved?: boolean;
    downloadValue?: number;
    onDetails?: () => void | null;
}

const FourthSection: React.FC<IProps> = ({
    likeGaved,
    onLikePress,
    likeValue,
    commentGaved,
    commentValue,
    downloadGaved,
    downloadValue,
    onDetails,
}: IProps) => {
    const [likeState, setLikeState] = useState(likeGaved);
    const [commentState, setCommentState] = useState(commentGaved);
    const [downloadState, setDownloadState] = useState(downloadGaved);

    const heandleLikeOnPress = () => {
        const ls = !likeState;
        if (onLikePress) {
            onLikePress(ls);
        }
        setLikeState(ls);
    };
    const heandleCommentOnPress = () => {
        setCommentState(!commentState);
    };

    const heandleDownloadOnPress = () => {
        setDownloadState(!downloadState);
    };

    return (
        <View style={[styles.sectionContentRow, styles.section]}>
            <View style={stylesFourthSection.firstColumn}>
                <View style={stylesFourthSection.secondColumnItem}>
                    <Like
                        style={stylesFourthSection.secondColumnIcon}
                        gaved={likeState} // określa czy daliśmy lajka
                        onpress={heandleLikeOnPress}
                    />
                    <Text
                        style={styles.secondSectionText}
                        onPress={heandleLikeOnPress}>
                        {likeValue}
                    </Text>
                </View>

                {commentValue && (
                    <View style={stylesFourthSection.secondColumnItem}>
                        <Comment
                            style={stylesFourthSection.secondColumnIcon}
                            gaved={commentState} // określa czy daliśmy komentarz
                            onpress={heandleCommentOnPress}
                        />
                        <Text style={styles.secondSectionText}>
                            {commentValue}
                        </Text>
                    </View>
                )}

                {downloadValue && (
                    <View style={stylesFourthSection.secondColumnItem}>
                        <Download
                            style={stylesFourthSection.secondColumnIcon}
                            gaved={downloadState} // określa czy pobraliśmy
                            onpress={heandleDownloadOnPress}
                        />
                        <Text style={styles.secondSectionText}>
                            {downloadValue}
                        </Text>
                    </View>
                )}
            </View>
            {onDetails && (
                <View style={stylesFourthSection.secondColumn}>
                    <Pressable onPress={onDetails} hitSlop={20}>
                        <MoreIcon />
                    </Pressable>
                </View>
            )}
        </View>
    );
};

export default FourthSection;
