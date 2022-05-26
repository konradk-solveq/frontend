import {isIOS} from '@src/utils/platform';
import {MykrossIconFont} from '../enums/iconFonts';

export const MYKROSS_ICON_NATIVE_SHARE_ICON = isIOS
    ? MykrossIconFont.MYKROSS_ICON_SHARE
    : MykrossIconFont.MYKROSS_ICON_ALT_SHARE;
