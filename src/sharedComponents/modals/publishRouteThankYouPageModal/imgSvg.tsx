import React from 'react';
import {View, ViewStyle} from 'react-native';
import Svg, {G, Path, Circle, Ellipse} from 'react-native-svg';
import Animated, {
    useSharedValue,
    useAnimatedProps,
    withTiming,
    withRepeat,
    Easing,
} from 'react-native-reanimated';
import {useEffect} from 'react';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface IProps {
    style?: ViewStyle;
}

const ImgSvg: React.FC<IProps> = ({style}: IProps) => {
    const offset = useSharedValue(0);

    const animatedProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: offset.value,
        };
    });

    useEffect(() => {
        offset.value = withRepeat(
            withTiming(-200, {
                duration: 5000,
                easing: Easing.bezier(0, 0, 1, 1),
            }),
            -1,
            false,
        );
    }, []);

    return (
        <View style={style}>
            <Svg viewBox="0 0 414 368">
                <G fill="none" fill-rule="evenodd">
                    <Path
                        d="M201.1 1.08h11.93c88.5 0 160.26 74.43 160.26 166.23 0 91.8-71.75 166.24-160.26 166.24h-11.95c-88.5 0-160.26-74.44-160.26-166.24 0-91.8 71.76-166.23 160.28-166.23z"
                        opacity=".7"
                        fill="#fdf5f5"
                    />
                    <Path d="M334.86 140.86h14.88v14.89h-14.88z" fill="#555" />
                    <Path
                        d="M342.62 62.7l-20 37.88 8.47.22-22.28 45.02 65.75-.3-21.07-44.94 6.14.22z"
                        fill="#2cba3f"
                    />
                    <Path
                        d="M37.97 85.17c5.43-13.47 9.74 0 17.15-8.4 7.45-8.44 6.4-21.1 17-7.61 5.14 6.52 9.18-18 19.69-16.04 10.5 1.96-2.2 16.04 9.83 16.04 12.04 0 12.04-11.1 20.19 1.72 8.15 12.82 5.16 5.88 14.84 5.88 9.67 0 11.53 2.92 11.53 8.41-102.96.04-90.78.17-110.23 0zm218.3-50.07c0-4.9 13.83-1.72 22.83-8.92 9-7.2 8.14-24.4 21-24.4 18.04 0 1.99 24.76 8.46 24.76 6.48 0-.22-14.46 9.18-14.46 7.32 0 13.8 16.75 18.19 18.83 9.59 4.6 18.04.83 18.04 4.2-7.29.23-6.3.23-97.7 0z"
                        fill="#fcdadb"
                    />
                    <Path d="M95.36 147.88h11.16v8.69H95.36z" fill="#555" />
                    <Path
                        d="M100.6 73.45l-6.48 22.33h3.22l-7.24 27h5.2l-8.63 26.34 27.3-.17-8.26-26.18h5.04l-6.9-26.99h3.91z"
                        fill="#2cba3f"
                    />
                    <G
                        transform="translate(95.54 174.95) scale(1.16213)"
                        fill="#f67e83">
                        <Path
                            d="M42.21 54.72a39.93 39.93 0 00-39.95 39.9 39.93 39.93 0 0039.95 39.91 39.93 39.93 0 0039.95-39.9 39.93 39.93 0 00-39.95-39.9zm0 .87A39.05 39.05 0 0181.3 94.63a39.05 39.05 0 01-39.08 39.03A39.05 39.05 0 013.13 94.63a39.05 39.05 0 0139.08-39.04zm140.16-.87a39.93 39.93 0 00-39.95 39.9 39.93 39.93 0 0039.95 39.91 39.93 39.93 0 0039.95-39.9 39.93 39.93 0 00-39.95-39.9zm0 .87a39.05 39.05 0 0139.07 39.04 39.05 39.05 0 01-39.07 39.03 39.05 39.05 0 01-39.08-39.03 39.05 39.05 0 0139.08-39.04z"
                            fill-rule="nonzero"
                        />
                        <Path
                            d="M20.96 44.9l-1.28.48-.2.08c-.61.23-1.13.45-1.63.67-2.05.94-3.5 1.97-4.28 3.3-1 1.68-.82 3.67.72 5.97a47.8 47.8 0 004.2 5.06l.44.47.7.75.48.52.25.26.52.54.27.28.54.56.56.58.59.6.6.6.62.63.64.65.65.65.68.68.7.69.35.35.72.71.37.36.75.74.77.75.79.77.8.78.84.8.42.4.85.83.87.83.9.86.9.87.94.88.95.9.97.92.98.93 1.52 1.43 1.03.97 1.06.99 1.61 1.5 1.42 1.33L62.3 70.55 79 57.45l-.43-.35c-10-8.13-17.65-12.2-23.02-12.2l-.9-.01h-.66l-.66-.02-1.3-.03-2.76-.07-8.6-.26-1.9-.05-1.23-.03-1.2-.02-1.42-.03-1.1-.02-1.04-.02h-1l-.73-.01H27.2l-.37.02h-.54l-.34.02h-.33l-.33.02-.31.01-.3.02-.3.01-.28.02-.27.02-.26.02h-.12l-.25.03-.23.02-.12.01-.22.02-.2.03-.2.03-.2.02-.17.03-.17.03c-.3.06-.55.12-.74.2zm-.87 1.26l1.12-.42c.22-.09.53-.16.92-.22l.18-.03.18-.02.1-.02.2-.02.1-.01.22-.02.12-.01.23-.02.12-.01.25-.02h.13l.26-.03.42-.02.3-.01.3-.01.32-.02.49-.01.34-.01h.35l.55-.02h.38l.59-.01h3.31l.98.01 1.03.02.8.01 1.1.02 1.16.02 1.19.03 1.86.05 3.76.1 6.22.2 2.15.05 1.66.04 1 .01h1.22c4.95.08 12.12 3.85 21.44 11.32l.45.36-15.9 12.46-15.2 16.68-.77-.72-1.6-1.5-1.06-.99-1.03-.96-1.01-.96-1-.93-.97-.92-.95-.91-.94-.89-.92-.88-.9-.85-.88-.85-.86-.82-.84-.82-.83-.8-.8-.77-.8-.77-.76-.75-.75-.73-.73-.72-.71-.7-.35-.35-.68-.68-.34-.33-.65-.65-.64-.64-.62-.63-.6-.6-.29-.3-.57-.59-.27-.29-.55-.56-.52-.54-.5-.53-.5-.52-.46-.5-.45-.48a49.02 49.02 0 01-4.38-5.24c-1.36-2.03-1.51-3.67-.7-5.04.69-1.13 2-2.08 3.9-2.94l.54-.24.28-.12.45-.18.46-.18z"
                            fill-rule="nonzero"
                        />
                        <Path
                            d="M34.54 44.6l.81.32c-1.87 4.75-1.36 8.63 1.5 11.71l.08.08L56.81 75.2l-.6.64-19.89-18.49-.01-.02c-3.16-3.32-3.77-7.54-1.83-12.57l.06-.15z"
                            fill-rule="nonzero"
                        />
                        <Path
                            d="M.05 78.88c10.59-20.05 25.44-29.46 44.5-28.16 13.01.89 23.42 6.12 30.77 14.35 5.88 6.58 9.33 14.8 9.33 20.83a.44.44 0 01-.88 0c0-5.8-3.36-13.82-9.1-20.25-7.2-8.07-17.4-13.19-30.17-14.06-18.7-1.28-33.24 7.93-43.68 27.7a.44.44 0 01-.77-.4z"
                            fill-rule="nonzero"
                        />
                        <Path
                            d="M76.04 22.25h1.87l.6.02.56.01.38.02h.36l.54.03.35.02.5.02.34.02.33.02.31.03.32.02.3.02.16.02.3.02.29.03.28.03.29.03.27.04.27.03.27.04.26.03.26.04.25.04.12.02-.14.86-.24-.04-.25-.04-.26-.03-.25-.04-.27-.03-.27-.04-.27-.03-.28-.03-.28-.02-.3-.03-.3-.03-.3-.02-.3-.02-.32-.03-.32-.02-.32-.02-.34-.01-.51-.03-.35-.01-.36-.02h-.37l-.37-.02-.57-.01h-.39l-.6-.02h-2.18l-.36.02h-.35l-.34.02-.17.01-.32.02c-4.6.3-6.41 1.51-6.17 3.34a6.2 6.2 0 001.49 2.92l.14.18.64.72.17.18.46.47.19.19.2.19.1.1.2.19.2.2.11.09c1.25 1.14 3.29 1.64 6.12 1.47l.25-.02.26-.02.54-.05.27-.03.28-.04.42-.06.29-.04.29-.05.54-.1 19.38 69.35-3.3-.3-3.47-.3-1.69-.16-2.47-.23-2.41-.22-2.34-.22-2.27-.22-2.2-.2-2.14-.21-1.39-.14-2.02-.2-1.96-.2-2.5-.25-1.21-.12-1.75-.19-1.7-.18-1.08-.11-1.57-.18-1.02-.11-.98-.11-.48-.06-.94-.1-.9-.11-.88-.1-.43-.06L56 98l-.8-.1-.78-.1-.74-.1-.72-.09-.34-.04-.67-.1-.64-.09-.6-.08-.59-.09-.8-.13-.51-.08c-.98-.16-1.78-.31-2.4-.45-5.5-1.24-5.55-4.6-.36-9.5l.16-.16.6.64c-4.92 4.58-4.92 7.1-.2 8.17.66.15 1.53.31 2.62.49l.52.08.54.08.29.05.59.08.62.1.32.04.67.09.7.1.72.09.76.1.78.1.82.1.42.04.86.1 1.35.16 1.41.17.98.1 1.01.12 1.04.11 1.07.12 1.1.12 1.71.18 1.18.12 1.82.19 1.88.2 1.3.12 2 .2 2.06.2 2.14.2 2.2.22 2.26.21 1.55.15 1.58.15 2.43.22 3.34.3 1.71.16 2.63.24 1.16.1-18.83-67.37-.22.03-.3.05c-.48.07-.95.12-1.4.16l-.28.02-.13.01-.27.02c-2.94.15-5.13-.39-6.55-1.65l-.07-.06-.11-.1-.22-.2-.21-.2-.21-.21-.2-.2c-1.85-1.83-3.02-3.47-3.23-5.05-.37-2.84 2.62-4.4 9.51-4.4z"
                            fill-rule="nonzero"
                        />
                        <Path
                            d="M85.96 52.42l.46.74-8 4.96-.47-.74zm71.74-44l.08.86c-6.43.61-9.54 2.36-9.54 5.16 0 .35.1.94.28 1.75l.07.3.07.3.09.34.09.35.1.36.1.39.06.2.11.4.13.43.13.44.13.46.15.48.15.5.15.5.17.52.16.54.18.56.28.86.19.59.2.6.2.63.31.95.33 1 .35 1.01.35 1.06.25.71.37 1.1.39 1.13.4 1.16.27.78.42 1.2.73 2.06.45 1.27.46 1.3.31.87 1.69 4.66.28.78.57 1.56.63 1.72.8 2.18.7 1.85.56 1.52.68 1.8.56 1.49.77 2.03.75 1.97.52 1.37.62 1.59.5 1.28.38.99.38.96.37.93.44 1.1.42 1.06.33.8.23.58.3.73.28.68.07.17c3.7 8.81 8 15.83 12.87 21.05l.16.17-.63.6c-4.97-5.26-9.33-12.33-13.08-21.2l-.26-.63-.23-.53-.3-.75-.41-1-.34-.85-.36-.88-.36-.93-.48-1.2-.39-1-.6-1.56-.63-1.62-.54-1.4-.55-1.43-.67-1.77-.68-1.8-.58-1.54-.81-2.18-.7-1.9-.48-1.26-.7-1.92-.64-1.75c-.77-2.09-1.52-4.17-2.26-6.23l-.47-1.33-.62-1.73-.45-1.26-.43-1.24-.43-1.22-.4-1.18-.54-1.54-.38-1.12-.37-1.08-.24-.71-.24-.7-.23-.68-.33-1-.32-.96-.3-.93-.3-.9-.18-.58-.18-.57-.17-.55-.16-.53-.16-.52-.16-.5-.14-.5-.14-.46-.14-.46-.12-.43-.12-.43-.11-.4-.1-.39-.06-.19-.1-.36-.04-.17-.08-.34-.08-.32c-.23-.98-.35-1.69-.35-2.1 0-3.38 3.44-5.35 10.13-6.01l.2-.02zM52.13 89.98l-.63.09-.57.09-.43.06-.4.07-.28.05-.27.05-.24.04-.23.05-.22.04-.13.03-.18.05-.17.04-.1.03-.1.03-.09.03c-.5.16-.76.32-.66.68.06.22.23.33.56.41l.1.03.06.01.12.02.1.02.15.03.1.01.18.03.13.01.13.02.21.02.3.02.17.02.34.02.28.02.39.03.53.02.33.02.6.02.75.03.55.01.86.02.76.02h.81l.67.02h1.07l.93.01H61c10.08 0 17.56 2.26 22.92 6.03a22.43 22.43 0 013.87 3.42c.64.73 1.05 1.26 1.55 2l.17.25a15.82 15.82 0 004.06 4.38 15.73 15.73 0 009.54 2.9c5.8 0 9.39-3.14 10.69-9.33 1.35-6.2-1.99-10.86-9.92-13.9-7.86-3.02-25.1-2.37-51.76 1.93zm51.53-1.32c7.65 2.93 10.78 7.3 9.51 13.15-1.24 5.9-4.57 8.81-10.05 8.81-3.72 0-6.73-1-9.15-2.77a15.02 15.02 0 01-3.81-4.08l-.18-.26-.17-.26-.09-.12-.16-.23a23.13 23.13 0 00-5.25-5.1c-5.42-3.81-12.94-6.1-23-6.14h-1.85l-1.27-.01-1.2-.01-1.27-.02-.75-.01-.98-.02-.8-.02-.6-.02-.8-.03-.53-.02-.4-.02-.54-.04-.41-.02-.16-.02-.29-.02-.2-.02-.13-.01-.18-.02-.17-.03-.15-.02h-.07l.11-.04.19-.04.13-.03.21-.05.23-.04.25-.05.37-.07.4-.06.42-.07.47-.07.5-.08.39-.05c26.55-4.28 43.71-4.93 51.43-1.97z"
                            fill-rule="nonzero"
                        />
                        <Path
                            d="M81.43 80.66c.1-.2.36-.28.56-.19l.03.02 10.42 5.77 8 14.42a.44.44 0 01-.74.46l-.02-.03L91.8 86.9l-10.2-5.65a.43.43 0 01-.19-.56z"
                            fill-rule="nonzero"
                        />
                        <Path
                            d="M99.8 101.26a.44.44 0 01.6.04l.02.03 12.74 16.2h11.57c.23 0 .42.17.44.4v.03c0 .23-.18.42-.4.43h-12.04l-13-16.52a.44.44 0 01.08-.61z"
                            fill-rule="nonzero"
                        />
                        <Path
                            d="M99.16 93.8c2.6-.37 4.9.45 7.33 2.83a7.1 7.1 0 012.08 3.37c.19.78.2 1.42.09 2.39l-.03.23-.02.15-.03.21-.01.13-.01.11-.01.11v.1l-.01.1v.33l.01.06a.9.9 0 00.14.33l.03.04c.17.22.5.4 1.06.53l.13.02.06.02.14.02.15.03.15.02.16.02.17.01.17.02.19.02h.19l.1.02-.04.65-.2-.01-.11-.01-.2-.02h-.1l-.18-.03-.18-.02-.17-.02c-1.04-.15-1.67-.43-2.01-.87l-.03-.03-.04-.07a1.47 1.47 0 01-.25-.97v-.17l.01-.11v-.06l.02-.13.02-.21.04-.31v-.09a.83.83 0 00.03-.22l.03-.2c.08-.79.06-1.33-.1-1.97a6.47 6.47 0 00-1.9-3.06c-2.28-2.24-4.4-2.99-6.78-2.64-.89.13-1.82.41-2.94.86l-.2.08-.2.09-.2.08-.33.15-.23.1-.25.1-.8.38-.93.42-.47.21-.44.2-.1.04c-3.49 1.52-8.56.8-15.23-2.15l-.2-.09.27-.6c.26.13.52.24.78.35l.39.16.76.31.38.15c5.47 2.12 9.67 2.54 12.59 1.27l.2-.1.33-.14.72-.32 1.36-.62.25-.12.24-.1.34-.15.32-.14.2-.09.21-.08c1.16-.46 2.14-.75 3.09-.9zm29.98-11.13l.35.8-.5.21-.49.21-.49.2-.71.3-.47.2-.47.2-.23.09-.46.18-.45.18-.44.18-.44.17-.43.17-.43.16-.21.08-.42.16-.41.16-.4.15-.4.14-.4.14-.4.14-.37.13-.38.13-.37.12-.37.12-.18.06-.35.12-.18.05-1.04.3-.25.06-.38.09-.27.05-.26.06-.27.05-.28.06-.29.05-.28.05-.3.05-.3.04-.15.02-.3.05-.32.04-.32.04-.32.04-.33.04-.34.04-.17.02-.34.03-.35.04-.36.03-.36.03-.36.03h-.19l-.37.04-.38.02-.58.04-.4.02-.4.02-.4.02-.41.01-.42.02-.42.01-.42.01-.44.01-.43.01-.45.01-.01-.87h.22l.65-.02.64-.01.42-.02.4-.01.42-.02.4-.01.4-.02.58-.03.38-.03.38-.02.37-.03.36-.02.36-.03.36-.03.35-.03.34-.03.34-.04.33-.03.17-.02.32-.04.32-.04.31-.04.16-.02.3-.04.3-.05.3-.04.14-.02.28-.05.28-.05.28-.05.13-.03.27-.05.26-.06.13-.02.25-.06.49-.12.23-.06.12-.03.22-.06.44-.13.34-.11.35-.11.36-.12.36-.12.18-.06.37-.13.37-.13.38-.13.38-.14.4-.14.4-.15.4-.15.4-.15.42-.16.42-.16.42-.17.43-.17.44-.18.44-.17.45-.19.68-.28.47-.2.47-.19.47-.2.48-.2z"
                            fill-rule="nonzero"
                        />
                        <Path
                            d="M154.44 37.4l.2.84c-9.71 2.46-19.96 20.82-23.73 41.42l-.11.62c-2.36 13.4-8.7 21.88-18.98 25.37l-.31.1-.28-.82c10.05-3.29 16.25-11.4 18.64-24.4l.07-.4c3.68-20.94 14.03-39.76 24.19-42.65l.3-.08zm-18.11 56.58c4.23-29.76 21-44.27 50.18-43.4l.88.02-.03.87c-28.98-1.15-45.62 12.73-50.04 41.75l-.13.89zm31.42-91.01c3.93-3 13.45-3.72 28.61-2.2l1.33.13-.71.5c-4.14 2.9-7.24 14.04-9.22 33.31l-.06.6-.03.32-20.05-1.99v-.69l-.01-.48v-.54l-.02-.57-.01-.8-.01-.4c-.05-2.4-.15-4.8-.31-7.04l-.03-.36-.02-.35-.03-.35-.03-.35-.03-.34-.03-.33-.05-.5-.03-.31-.05-.47-.03-.3-.04-.3-.04-.3-.03-.28-.06-.41-.04-.27-.04-.27-.04-.25-.02-.13-.04-.24-.04-.24-.04-.23-.05-.23-.04-.22-.04-.2-.05-.21-.05-.2-.04-.19-.05-.18-.05-.17-.04-.17-.03-.08-.05-.15-.05-.15c-.27-.78-.57-1.2-.88-1.2-1.58 0-3.47-.85-5.68-2.54l-.23-.17-.58-.46-.23-.2c-.24-.2-.48-.4-.72-.62l-.12-.1.44-.5.23.22.24.2.23.2.23.19.11.1.23.18.66.51.22.16.32.23.2.15c1.75 1.2 3.23 1.79 4.45 1.79.78 0 1.37.95 1.83 2.74l.05.22.08.35.05.24.05.24.05.26.04.26.05.27.04.28.05.29.04.3.04.3.04.3.04.32.04.33.03.33.04.34.04.34.03.36.03.36.04.37.04.57.03.38.05.6.01.2c.15 2.1.25 4.33.3 6.58l.02.69.02.8v.59l.01.72v.59l18.82 1.86.03-.27c1.9-18.5 4.81-29.56 8.84-33.24l.01-.01-.11-.01c-14.58-1.43-23.8-.74-27.6 2.02v.01l-1.42 7.82-.64-.12 1.45-8.06.1-.08z"
                            fill-rule="nonzero"
                        />
                        <Path
                            d="M142.72 8.43l13.2-4.21 3.37 5.5-.74.45-3.01-4.91-12.55 4z"
                            fill-rule="nonzero"
                        />
                        <Circle cx="41.88" cy="94.73" r="4.91" />
                        <Ellipse cx="182.26" cy="94.73" rx="3.6" ry="3.49" />
                    </G>
                    <G>
                        <Path
                            d="M217 158.67c5.22 2.72 9.76 1.76 13.66-2.9l.24-.3a28.64 28.64 0 013.45-3.67l.4-.35.39-.3c.38-.29.73-.5 1.04-.7l.33-.18.3-.15.29-.13.14-.06.26-.09.26-.1.23-.05.23-.07.9-.18.18-.05.17-.06.17-.06c.22-.08.41-.2.61-.38l.08-.08.08-.1.07-.09.06-.1.06-.1.03-.12.04-.1v-.06l.02-.12v-.23l-.02-.12a1.08 1.08 0 00-.19-.38l-.09-.1a.63.63 0 00-.05-.05l-.11-.1-.12-.09-.14-.08-.08-.03-.16-.07a2.91 2.91 0 00-.3-.1l-.2-.04-.12-.02-.23-.04-.26-.02h-.75l-.33.02-.35.04-.2.02-.38.07-.42.07-.44.1-.46.1-.48.15-.5.15-.27.08-.55.17-.58.21-.3.12-.62.23-.63.25-.68.3-.7.3-.73.33-.76.35-.4.2-.8.4-.4.21-.86.44-.89.47-.8.48-.78.46-.37.2-.73.41-.7.38-.69.35-.65.33-.61.28-.6.27-.57.23c-2.3.93-4.05 4.53-4.9 3.95H217z"
                            fill="#f5d7d7"
                        />
                        <Path
                            d="M173.02 117l2.74-2.54-3.83 8.89c6.4 9.5 12.43 16.47 18.09 20.91 8.49 6.66 45.95 5.73 49.28 9.1-.93.52-49.98 14.42-58.05 1.54-9.11-14.57-12.34-23.4-8.23-37.92z"
                            fill="#d8232a"
                        />
                        <Path
                            d="M151.83 308.85l-.58.56-.54.56-.26.26-.48.54c-3.7 4.14-4.18 7.24-1.49 9.3l.14.09.26.11.36.16.98.39 5.07 1.97.7.28.53.2.2.11.05.03 1.16.75 2.32 1.53 3.56 2.4.6.38.52.33.33.18.2.12.2.08.17.08.17.06.15.06.17.03.15.02h.14l.15.02h.15l.14-.03.16-.02.6-.14.18-.05.11-.04.07-.04.07-.03.05-.05.04-.06.03-.02.03-.07.03-.07v-.23l-.03-.12-.02-.11-.05-.14-.08-.23-.08-.18-.14-.3-.17-.32-.3-.52-.46-.76-.44-.72-.66-1.03-.95-1.46-2.04-3.04-1.23-1.83c-3.43-5.07 1.74-18.33 8.55-31.77l.92-1.82 1.44-2.74.97-1.82.98-1.8.97-1.78.98-1.77.97-1.74 1.44-2.53 1.4-2.45 2.65-4.6 2.7-4.65 1-1.74.87-1.55.5-.92.46-.82c.82-1.56 1.25-2.55 1.15-2.77-.08-.16-.32-.29-.7-.4l-.24-.05-.28-.05-.33-.03-.34-.04-.6-.03-.45-.01h-1.55l-.9.03-.63.04-.69.03-.71.05-1.14.08-1.22.1-1.3.12-.91.08-1.94.2-2.08.23-1.64.2c-2.84 9.14-6.28 16.87-10.3 23.19-.9.94-1.48 2.93-1.94 5.47l-.12.78-.13.81-.12.82-.11.86-.16 1.32-.65 5.52-.18 1.4-.18 1.39-.14.89-.14.9-.08.43c-.9 5.22-2.9 9.88-5.99 13.95z"
                            fill="#bfa7a7"
                        />
                        <Path
                            d="M151.83 308.85l-.58.56-.53.56-.27.26-.48.54c-3.7 4.14-4.18 7.24-1.49 9.3a1.16 1.16 0 00.14.08l.26.11.36.17.98.39 5.07 1.97.7.28.53.2.2.11.05.03 1.16.75 2.32 1.53 3.56 2.4.6.38.52.33.33.18.2.12.2.08.17.08.17.06.15.06.17.03.15.02h.14l.15.02h.15l.14-.03.16-.02.6-.14.18-.05.11-.04.07-.04.07-.03.05-.05.04-.06.03-.03.03-.06.01-.07.02-.1v-.13l-.03-.12-.02-.11-.05-.14-.08-.23-.08-.18-.14-.3-.17-.32-.3-.52-.46-.76-.44-.72-.66-1.03-.96-1.46-2.03-3.04-1.23-1.83c-.58-.87-1.68-1.1-2.83-1.18l-.58-.04-.84-.03c-1.02-.06-1.93-.17-2.37-.7-2.06-2.57-3.18-4.92-3.32-7.04z"
                            fill="#e1e1e1"
                        />
                        <Path
                            d="M180.56 189.16l1.16-1.13.63 2.33.92 3.42.58 2.24.57 2.2.53 2.16.53 2.12.5 2.08.49 2.06.46 2.01.47 1.98.42 1.93.2.97.4 1.87.38 1.86.36 1.8.35 1.77.31 1.74.3 1.7.3 1.65.26 1.62.12.8.23 1.57.41 3.01.18 1.47.16 1.42c.12 1.16.22 2.3.3 3.39l.1 1.27.09 1.87.04 1.2c.19 7.26-.73 12.4-2.76 15.42-.87-1.4-2.13-1.86-3.78-2.08l-.5-.06-.53-.04-.54-.04-1.79-.1-.31-.03-.65-.05a24 24 0 01-.67-.06l-.7-.1c-2-.26-4.25-.8-6.76-2.04.79-4.7-1.28-10.26-3.87-15.9l-.58-1.22-.86-1.82-1.47-3.02-.86-1.78-.56-1.19c-2.54-5.5-4.4-10.66-3.27-14.66 1.19-4.21 4.18-9.25 9-15.09l.81-.99c.85-.98 1.74-2 2.67-3.03l.96-1.05.99-1.05 1.02-1.08 1.05-1.1 1.1-1.1 1.12-1.12z"
                            fill="#1961b7"
                        />
                        <Path
                            d="M177.61 322.93l-.23.51-.46.97-.45.97-.2.46-.4.92-.18.44-.36.87-.18.43-.32.83-.3.81-.13.38-.26.77c-1.87 5.75-1.5 9.11 1.08 10.07l.15.03.27.03.6.06.8.07 5.85.43.67.06.32.03.22.03.06.02 1.74.49 1.52.45 4.99 1.5.65.18.43.12.38.08.23.04.2.04.2.02.18.03h.34l.15-.03.14-.02.13-.04.14-.04.14-.06.21-.1.35-.19.1-.08.06-.05.04-.03.02-.05.01-.03a.12.12 0 000-.05l-.02-.05-.04-.04-.04-.05-.12-.1-.31-.22-.76-.54-.44-.33-.5-.4-.44-.36-.62-.54-.53-.49-.36-.35-.6-.56-.63-.64-.66-.7-.48-.52-.49-.55-.25-.27-.52-.6-.54-.63-.55-.66-.3-.35c-4.24-5.2-4.62-9.78-3.68-14.54l.15-.7.08-.35.16-.7.1-.35.2-.72.3-1.07.33-1.09 1.04-3.35.35-1.16.23-.76.24-.8.2-.8.21-.81.1-.42 1.87-7.05.8-3.02.57-2.2.36-1.44.54-2.1.5-2.07.3-1.34.3-1.3.29-1.3.25-1.25.13-.62.23-1.2.23-1.2.1-.57.18-1.13c.4-2.6.64-4.92.64-6.94a.97.97 0 01-.08-.19l-.07-.18-.07-.25-.1-.45-.12-.53-.12-.63-.84-4.44-.25-1.29-.27-1.33-.3-1.34-.15-.67-.16-.67-.16-.65-.26-.97-.17-.63-.18-.6-.19-.6-.19-.57c-1.14-3.25-2.55-5.28-4.3-3.74-7.14 6.27-10.98 1.2-13.38-4.52l-.28-.67-.26-.67-.26-.68-.35-1-.45-1.3-.7-2.06-.26-.76-.18-.46-.17-.42c-.6-1.47-1.14-2-1.74-.74a1.8 1.8 0 00-.05.74l.04.42.02.23.07.52.1.58.11.66.12.72.23 1.2.28 1.3.3 1.42.33 1.5.5 2.15.65 2.87 1.29 5.45 2.2 9.2.93 4 .49 2.1.43 1.96.29 1.35.16.83.15.78.2 1.05.11.63.08.56.06.48.04.42c.02.31.02.55 0 .68l-.12 1.38-.12 1.31-.04.63-.08 1.22-.06 1.13-.06 1.08-.04 1.02-.03.97-.01.46-.01.87v1.59l.02 1.08.04.66.03.61.04.58.02.28.06.52.06.5.05.46.1.65.08.4.11.55.12.54.2.8.26 1.05.15.6.1.47.05.32.06.35.05.35.05.37.04.58.02.43.02.45v1.53l-.04.58-.03.62-.05.66-.03.35-.06.72-.1.76v1.98l-.03.92-.03.86-.03.42-.06.78-.05.75-.04.34-.07.68-.04.3-.09.59a9.72 9.72 0 01-.53 2.04z"
                            fill="#f5d7d7"
                        />
                        <Path
                            d="M175.22 329.59c-3.65 6.5-3.64 10.43.03 11.78l.15.03.26.04.37.03 1.33.12 5 .33 1.22.1.34.03.2.04a.46.46 0 01.07 0l2.16.62 2.5.74 3.27.98.88.25.58.15.38.09.23.04.3.04.19.02h.34l.15-.01.15-.04h.07l.15-.05.07-.03.14-.06.14-.07.6-.33.2-.13.09-.08.06-.06.03-.06.04-.05V344l.03-.07v-.15l-.01-.05-.02-.09a.37.37 0 00-.03-.05l-.04-.09-.07-.11-.08-.12-.1-.13-.18-.22-.22-.23-.36-.37-.45-.42-.69-.61-.83-.73-1.45-1.2-1.8-1.5-3.24-2.61c-.91-.73-2.21-.51-3.47-.19l-1.08.28c-.95.23-1.81.38-2.37 0-2.73-1.84-4.47-3.76-5.23-5.76z"
                            fill="#f0f0f0"
                        />
                        <Path
                            d="M170.55 186.26c-6.3 4.18-10.38 8.27-12.25 12.27l-.17.38-.16.39-.15.37-.15.38-.13.37-.13.38-.11.39-.1.4-.1.39-.08.39-.04.2-.06.41-.03.2-.05.43v.2l-.04.44-.01.44v1.16l.03.47.05.5.02.26.06.52.07.52.04.28.1.56.11.58.12.58.14.61.15.64.17.65.19.67.2.7.11.34.2.73.25.76.26.77.26.82.3.82.46 1.3.5 1.36.55 1.42.58 1.5.4 1.04.67 1.62.7 1.69.53 1.3.16.45.63 1.71.58 1.67.67 2.06.64 1.97.7 2.16.72 2.37.6 2.02.62 2.12.47 1.65.3 1.11.47 1.72.47 1.75.46 1.78.31 1.2.3 1.21.45 1.85.42 1.85.28 1.24.27 1.24.25 1.26.26 1.25.24 1.25.23 1.24.24 1.24.09.63.2 1.24.2 1.23.18 1.22.16 1.21.07.6.14 1.2 2.16-.38 1.88-.35 3.07-.59 3.35-.66 1.11-.2.42-.07.81-.13.6-.08.41-.03.62-.06.64-.05.7-.04.73-.03.81-.02h.88l.32-.01-.05-.37-1.08-7.5-11.44-76.95z"
                            fill="#3587ea"
                        />
                        <Path
                            d="M174.03 134.47l13.75-24.74 16.28-5.22c-.7 2.74-.93 4.78-.7 6.15.24 1.37 1.1 2.96 2.6 4.79l-2.18-.35c-3.4 6.5-7.6 8.58-12.6 6.24-1.63 3.08-6.04 13.06-13.27 29.94z"
                            fill="#f5d7d7"
                        />
                        <Path
                            d="M185.75 117l5.43 4.34-1.86 3.73z"
                            fill="#bfa7a7"
                        />
                        <Path
                            d="M186.16 128.29l-.17-.16c-5.03-4.25-7.4-7.36-9.27-12.18-.2-.55-.6-.35-1.1.46l-.18.27-.17.31-.18.35-.18.38-.2.42-.2.46-.2.48-.3.8-.33.86-.22.61-.22.64-.22.67-.23.7-.33 1.1-.35 1.14-.32 1.2-.23.82-.21.85-.23.87-.32 1.32-.2.92-.32 1.39-.2.95-.28 1.44-.19.98-.19.99-.17 1-.16 1-.08.52-.15 1.02-.14 1.02-.14 1.04-.12 1.02-.11 1.04-.12 1.05-.1 1.04-.07 1.05-.13 1.8-.21 2.65-.22 2.58-.23 2.5-.23 2.44-.24 2.38-.17 1.54-.17 1.51-.18 1.47-.28 2.15-.18 1.39-.19 1.38-.2 1.33-.2 1.3-.2 1.28-.2 1.23-.22 1.2-.2 1.19-.23 1.13-.22 1.12-.23 1.07-.23 1.05-.23 1.02-.23.98-.25.97-.24.92-.13.44-.25.87-.12.43-.27.83-.26.8-.27.76-.27.73c-.23.6-.46 1.16-.7 1.7l-.27.6-.3.6 22.59-8.24 4.12-11 4.69-12.58 1.77-4.84 1.31-3.68.27-.75c3.2-2.44 2.5-7.66.36-12.88l-.3-.71-.32-.72-.33-.7-.35-.7-.73-1.4-.37-.67-.2-.35-.4-.65-.19-.33-.4-.64-.4-.63-.4-.61-.42-.58-.4-.58-.42-.55-.4-.52-.4-.5-.2-.23-.39-.46c-.2-.24-.38-.44-.58-.64l-.36-.38-.36-.35-.34-.33z"
                            fill="#f67e83"
                        />
                        <Path
                            d="M185.37 108.71c-3.92-1.66-9.3 1.61-16.12 9.81-10.23 12.3-4.23 22.08-4.5 33.87-.25 11.8-1.85 18.23 7.26 0 9.11-18.21 10.85-33.62 12.94-37.34 1.4-2.46 3.98-6.1 7.78-10.92z"
                            fill="#ffeecd"
                        />
                        <Path
                            d="M183.07 127.61a322.85 322.85 0 0111.54 19.98l-.28 1.31-.11.7a83.24 83.24 0 01-.93 4.34l-.31 1.18-.33 1.23-.35 1.26-.8 2.67-.43 1.39-.46 1.43-.49 1.46-.52 1.5-.54 1.57-.58 1.59-.3.81c-3.52-3.71-6.62-8.79-9.3-15.6-4.72-12-3.32-20.94 4.18-26.82z"
                            fill="#d8232a"
                        />
                        <Path
                            d="M186.08 112.6l17.5-6 1.08-2.53c-8.95 1.98-14.85 3.85-17.73 5.62-1.43 1.09-1.72 2.06-.85 2.9z"
                            fill="#bfa7a7"
                        />
                        <Path
                            d="M220.48 159.83c5.22 2.72 9.76 1.76 13.66-2.9l.24-.3a28.64 28.64 0 013.45-3.67l.4-.35.39-.3c.38-.29.73-.5 1.04-.7l.32-.18.3-.15.3-.13.13-.06.27-.09.26-.1.23-.05.23-.07.9-.18.18-.05.17-.06.16-.06c.22-.08.42-.2.62-.38l.08-.08.08-.1.07-.09.06-.1.06-.1.03-.12.04-.1v-.06l.02-.12v-.23l-.02-.12a1.08 1.08 0 00-.19-.38l-.1-.1a.63.63 0 00-.04-.05l-.11-.1-.12-.09-.14-.08-.08-.03-.16-.07a2.91 2.91 0 00-.3-.1l-.2-.04-.12-.02-.23-.04-.27-.02h-.74l-.33.02-.35.04-.2.02-.38.07-.42.07-.44.1-.46.1-.48.15-.5.15-.28.08-.54.17-.58.21-.3.12-.62.23-.63.25-.68.3-.7.3-.74.33-.75.35-.4.2-.8.4-.41.21-.85.44-.89.47-.8.48-.78.45-.37.21-.73.4-.7.4-.69.34-.65.32-.61.3-.6.26-.58.23c-2.3.93-4.04 4.53-4.89 3.95h3.25z"
                            fill="#f5d7d7"
                        />
                        <Path
                            d="M181.85 124.03l2.02 3.19 1.96 3.07 1.42 2.2 2.28 3.54 1.74 2.67 1.7 2.55 1.21 1.82 1.18 1.74 1.14 1.68 1.46 2.12 1.06 1.51 1.02 1.43.97 1.34.95 1.29.9 1.2.59.77c3.24 4.27 7.95 3.54 12.95 1.9l.78-.25.77-.27 3.13-1.13 1.16-.4.8-.26.77-.23c4.52-1.39 8.86-1.86 12.18 1.5a43.72 43.72 0 00-4.12 2.64l-.87.63-.87.65-.45.33-.9.68-1.37 1.04-3.74 2.91-1.44 1.1-.96.72-.98.72-1.96 1.4-.98.68c-9.7 6.51-19.91 10.03-27.98-2.86-9.12-14.56-11.62-29.1-7.52-43.62z"
                            fill="#f67e83"
                        />
                        <Path
                            d="M185.62 113.21l22.97-10.38c-7.96-7.53-16.18-9.02-24.65-4.44-4.24 2.44-3.67 7.39 1.68 14.82z"
                            fill="#3587ea"
                        />
                        <Path
                            d="M188.2 111.61a.75.75 0 01.59-.88c.4-.1.81.14.9.53.3 1.33.6 2.52.93 3.57l.12.38c1.6 4.88 3.6 6.76 5.89 5.92.4-.14.82.05.96.43s-.08.79-.46.93c-4.12 1.5-7.03-2.32-8.93-10.88z"
                            fill="#3587ea"
                            fill-rule="nonzero"
                        />
                    </G>
                </G>
                <AnimatedPath
                    animatedProps={animatedProps}
                    d="M-56.7 365.31s87.78 1 117.62-.2c29.83-1.2 57.4-4.69 62.63-6.37 4.17-1.56 14.2-3.8 5.66-9.71-4.85-3.74-4.85-6.62 5.86-20.61 9.7-12.7 11-18.56 3.17-23.75-7.84-5.2-26.4-22.36-.64-57.59 21.26-29.08 40.55-42.93 60.35-59.74 19.8-16.81 34.44-27.07 37.12-30.9 2.69-3.83 7.58-9.45 7.62 3.19.05 12.63-6.28 71.03-7.52 104.9-1.25 33.87-.07 62.01 15.29 78.04 14.27 14.9 17.71 23.43 56.69 14.54 22.49-5.13 50.85-5.54 75.26-4.67 24.4.87 86.36 6.98 86.36 6.98"
                    fill="none"
                    stroke="#df0000"
                    strokeWidth="2.4"
                    strokeDasharray="10, 10"
                />
            </Svg>
        </View>
    );
};

export default ImgSvg;
