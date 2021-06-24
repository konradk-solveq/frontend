import React from 'react';
import Svg, {G, Path, Circle} from 'react-native-svg';

interface Props {
    style: any;
}

const Bike_1: React.FC<Props> = (props: Props) => (
    <Svg style={props.style} viewBox="0 0 254 250">
        <G fill="none" fill-rule="evenodd">
            <Path
                stroke="#313131"
                stroke-linecap="round"
                stroke-width="3"
                d="M194.5 222.5c9.3-.6 10.5 2.8 3.8 10.2-6.7 7.3-13.6 7.6-20.6.8"
            />
            <Path fill="#F67E83" d="M163.8 207.9v21.4h30.7V208z" />
            <Path
                fill="#F0F0F0"
                d="M132.8 64.3v165h30.7v-165zm6-15v15h19v-15z"
            />
            <Path fill="#F0F0F0" d="M123.5 114.3v7h47v-7zm5 112v3h38v-3z" />
            <Path fill="#F67E83" d="M165.8 200.9v3h23v-3zm9 3v5h5v-5z" />
            <Path
                fill="#FCDADB"
                d="M142 24c4-10 7 0 12.5-6.3 5.4-6.3 4.6-15.7 12.3-5.7 3.7 4.9 6.7-13.4 14.3-12 7.6 1.5-1.6 12 7.1 12s8.7-8.2 14.7 1.3c5.9 9.5 3.7 4.4 10.7 4.4 7 0 8.4 2.2 8.4 6.2-74.7 0-65.9.2-80 0zM0 63.7c0-4.4 11.9-1.5 19.6-8 7.8-6.4 7-21.8 18-21.8 15.6 0 1.8 22.2 7.4 22.2 5.5 0-.2-13 7.9-13 6.2 0 11.8 15 15.6 16.9 8.2 4 15.5.7 15.5 3.7-6.3.3-5.4.3-84 0z"
            />
            <G fill="#F67E83" transform="rotate(-9 477.3 -160.6)">
                <Path
                    fill-rule="nonzero"
                    d="M41 49a36 36 0 100 72 36 36 0 000-72zm0 .8a35.2 35.2 0 110 70.4 35.2 35.2 0 010-70.4z"
                />
                <Circle cx="41" cy="84" r="3" />
                <Circle cx="42" cy="100" r="1" />
                <Path
                    fill-rule="nonzero"
                    d="M170 49a36 36 0 100 72 36 36 0 000-72zm0 .8a35.2 35.2 0 110 70.4 35.2 35.2 0 010-70.4z"
                />
                <Circle cx="169" cy="85" r="4" />
                <Path
                    fill-rule="nonzero"
                    d="M75 73.2c.2-.2.4-.3.6-.2l9.8 5.3L93 91.4c.2.2 0 .4-.1.6-.2 0-.4 0-.6-.2l-7.4-13-9.6-5a.4.4 0 01-.2-.6zm20.2 18.9h.5l11.5 14.1h10.4c.2 0 .4.2.4.4s-.2.4-.4.4h-10.8L95 92.6a.4.4 0 010-.5z"
                />
                <Path
                    fill-rule="nonzero"
                    d="M48.6 43.9c8.3 2 15.9 6 21.6 11.8 7 7.1 10.8 16.8 10.8 28.9 0 .2-.2.4-.4.4a.4.4 0 01-.4-.4 39 39 0 00-10.6-28.4c-5.6-5.7-13-9.6-21.2-11.6-14-3.3-31 3.8-39 16.2L7 64.5l-1.8 2.8-2 3-.9 1.4-.5.8-.4.6-.4.6-.2.2v.1c-.2.3-.5.3-.6.2a.4.4 0 01-.1-.6v-.1l.2-.2.2-.3.2-.3.3-.5.4-.6 1-1.4 1.3-2 2.1-3.3 3-4.5a39.2 39.2 0 0139.8-16.5zM141.2 0H142l.2-.1h.7c1.3.1 1.9.5 1.9 1.4 0 .8-.6 1.8-1.8 3l-.2.2-1 1h-.2l-.2.2-.1.1-.3.2-.2.2-.2.2-.3.1-.2.2-.3.2-.2.2-.3.2-.3.2h-.1l-.3.3-.3.2-.3.2-.3.2h-.1l-.4.3-.3.2-.3.2-.3.1 10.3 26.5 2.7 1.8L166 79.4l4 4v.5h-.6l-4-4L148.7 38l-2.8-1.8L135.5 9l.4-.3.3-.2.4-.2.3-.2h.1l.3-.3.3-.2.3-.2.3-.1.3-.2.2-.2.2-.1.2-.2.3-.2.2-.2.3-.1.2-.2.2-.2h.1l.3-.2.2-.2.3-.2.4-.4.1-.1.2-.2.2-.1.1-.2.2-.1c1.1-1.1 1.7-2 1.7-2.6 0-.3-.3-.5-1-.6H141l-.2.1H140.3l-.3.1h-.2l-.2.1h-.5l-.2.1h-.3l-.2.1h-.3l-.4.2h-.3l-.3.1-.4.1h-.3l-.3.1-.4.2h-.4l-.4.2-.5.1h-.4l-.5.2-.3.1-.4.1-.4.1-.7.2-.2.1c-.2 0-.4 0-.5-.3 0-.2 0-.4.3-.5l.6-.1.5-.2.5-.1.6-.2h.3l.5-.2.5-.1.4-.1.4-.1.5-.2h.3l.4-.1.5-.1.2-.1h.3l.3-.1.4-.1h.2l.4-.1h.2l.3-.1h.4l.3-.1h.4l.3-.1h.2zM69.7 14L95 91.8l-.7.2L69 14.2z"
                />
                <Path
                    fill-rule="nonzero"
                    d="M22 37h3.8l12.9 38.8.6-.2 1.7 7.2-.6.2-2.1-6.5-2.2.8L22 37zm3.4.6h-2.6l13.6 39 1.7-.6-12.7-38.4zM94 80a11 11 0 100 22 11 11 0 000-22zm0 .8a10.2 10.2 0 110 20.4 10.2 10.2 0 010-20.4z"
                />
                <Path
                    fill-rule="nonzero"
                    d="M94.1 81v.6l-51.5.8-2.7 6.4 3.2 2v.2c0 3.5-1 7.2-3 11H40h.1c1.7.2 3.7.3 5.9.3h2.8l3 .1H64.5l1.2-.1H68l1.2-.1H72.3l.7-.1h2.6l1.3-.1h1.3l1.4-.1h1.3l1.4-.1 1.4-.1h1.5l1.4-.1h1.5l1.5-.2h2.3l1.5-.1 1.6-.1v.6h-1.6l-1.6.1h-1.6l-1.5.2h-3l-1.5.2h-2.9l-1.4.1h-.7l-1.4.1H75.7l-1.3.1h-2l-1.3.1h-2.5l-1.3.1H65l-1.1.1h-7.6l-1 .1h-1.6c-5.6 0-10.2-.1-13.8-.4H39l.2-.4c2.2-3.8 3.3-7.4 3.3-10.9v-.1L39 89l3-7.1 52-.9zM40.6 37l.4.4-2.2 2.7-1.5 1.8-1.7 2-1.6 2-1.5 1.9-.9 1-1 1.5-1.1 1.3-1 1.2-1 1.2-.8 1-.9 1.1-.6.8-.5.7-.4.4-.3.4-.5.6-.4.6-.3.4-.2.3-.3.4-.2.3-.2.3-.3.2-.1.3-.2.2-.2.3-.1.2-.2.2v.1l-.4.6c-.7 1.3-1 2.8-.7 4 .3 1.3 1.4 2 3 2h.8l.4.1h2.2l.5.1h.8l.4.1h.5l.5.1h.8l.5.1h.6l.4.1h.4l.6.1.6.1h.7l.6.2h.5v.6H34l-.5-.1H33l-.6-.2H31l-.6-.2h-1.2l-.5-.1H28l-.4-.1h-1l-.3-.1h-1.8l-.3-.1H23c-2 0-3.3-1-3.8-2.6a6.4 6.4 0 011-4.9l.2-.1.1-.2.1-.2.2-.3.3-.3.2-.3v-.1l.3-.3.2-.3.2-.3.3-.4.4-.5.3-.4.5-.6.3-.4.7-.9.7-1 .4-.5.7-.7.9-1.2.4-.5.7-1 1-1.2 1.4-1.7 1.4-1.7 1-1.2 1.2-1.5 1.3-1.6 1-1.3 1.8-2.2 1.9-2.2.4-.5zM176 44v.8c-15.9.3-27.2 4-34 11.1-4.6 5-7.6 9.8-9.5 14.8l-.1.3-.1.4-.1.2-.1.3v.2l-.2.4-.1.4-.1.2-.1.3v.3l-.1.2v.2l-.1.2-.1.2v.3l-.1.2v.2l-.1.3-.1.3v.3l-.1.3v.2l-.1.2v.3l-.1.4v.2l-.2.4v.7l-.2.4v.8l-.1.4-.1.5-.1.8-.2 1v.3l-.8-.1.2-1.1v-.7l.1-.5.1-.5v-.4l.2-.6v-.4l.1-.5v-.4l.1-.4.1-.2v-.5l.1-.3v-.2l.1-.3.1-.2v-.2l.1-.3V75l.1-.2.1-.4v-.2l.1-.2v-.2l.1-.3.1-.2v-.2l.1-.2.1-.2v-.3l.1-.2.1-.2v-.2l.2-.4.1-.3V71l.2-.4v-.2c2-5.1 5-10 9.8-15 6.8-7.2 18.2-11 34-11.4h.5z"
                />
                <Path fill-rule="nonzero" d="M51.4 37l.6.1L44 83h-3l2.5-.6z" />
                <Path
                    fill-rule="nonzero"
                    d="M140.2 21L75.6 33 41 83.5 95 91l48-62.5-2.8-7.5zm.3.7l2.1 6-48 62.4L42.4 83 76 33.7l64.4-12zM60 37v.7H20.6V43H20v-6z"
                />
            </G>
            <Path
                fill="#F5D7D7"
                d="M105.4 219.5c-5.9 2.6-8 5.3-6 8.2.1.3 5.5 4.8 5.7 5.2 5.4 7 5.4 7.8 7 8 1.5.2 1.8.6-1.2-11.1-3-11.8 12.3-14.2 12.1-16-.3-3-4.3-4.5-12-4.3l-5.6 10z"
            />
            <Path
                fill="#555"
                d="M105.4 219.5c-5.9 2.6-8 5.3-6 8.2.1.3 5.5 4.8 5.7 5.2 5.4 7 5.4 7.8 7 8 1.5.2 1.8.6-1.2-11.1-.5-2-4.3-2.1-4.8-3.6-1-2.7-1.2-5-.7-6.7z"
            />
            <Path
                fill="#649ECD"
                d="M115.2 115c17.2 22.4 25.8 38.3 25.8 47.7 0 9.4-8 30.5-24.1 63.3l-13.9-9.7c17.9-27 24.4-42.9 19.6-47.8-7.2-7.3 1.4-13.6-4.2-20.6-3.7-4.7-4.7-15.6-3.2-32.9z"
            />
            <G>
                <Path
                    fill="#F5D7D7"
                    d="M108.5 75L106 50.3l13-6.3 2.8 1.3-1.7.9c.8 6.3-1.2 9.9-5.9 10.7.4 3 1 7.8 1.6 14.4l-7.3 3.5z"
                />
                <Path
                    fill="#BFA7A7"
                    d="M108.6 56l5.8 1h-.2l.4 3.3-6-4.3zm-2.7-5.5l15.3-5.3-3.7-1.9z"
                />
                <Path
                    fill="#D8232A"
                    d="M102.2 52.6l19-11.1c-7.5-5.8-14.8-6.3-21.7-1.5-3.5 2.5-2.6 6.7 2.7 12.6z"
                />
                <Path
                    stroke="#D8232A"
                    stroke-linecap="round"
                    stroke-width="2"
                    d="M109 48.4c2.1 6.5 4.5 9.1 7 7.9"
                />
                <Path
                    fill="#FFEECD"
                    d="M111.9 62.8c-9.4-.5-12.6 9.7-9.7 30.4 3 20.8 3.4 34.6 1.4 41.5l19.8-6c8.2-16.7 12.6-29 12.9-36.7.3-7.7-2.7-11.2-9.2-10.3l-15.2-19z"
                />
                <Path
                    fill="#ECD9B6"
                    d="M117 72.4C124 78.6 130.5 85.2 137 92l-.5 4.2a50.6 50.6 0 01-7.4 17.4 88 88 0 01-2.7-3.4 44.3 44.3 0 01-9.3-38z"
                />
                <Path
                    fill="#F5D7D7"
                    d="M149.6 91.5c4.7.2 8.3-1.9 10.7-6.3l5.6-10.7c1-1.5-1.3-1.8-11.5 8.8-4 4.6-6.7 6.7-8.3 6.2l3.5 2z"
                />
                <Path
                    fill="#FCDADB"
                    d="M159.7 82.3c-1.6.8-2.8.8-3.6 0-.9-.8-.9.2 0 3l3.6-3z"
                />
                <Path
                    fill="#F5D7D7"
                    d="M116.3 235.6c-1.7 6.2-.8 9.5 2.6 10 .4 0 7.3-1.4 7.8-1.3 8.9.2 9.5.7 10.7-.4 1.1-1 1.6-1-9.5-6-11-5.1-3.3-18.5-4.9-19.5-2.5-1.7-6.2.5-11 6.6l4.3 10.6z"
                />
                <Path
                    fill="#555"
                    d="M116.3 235.6c-1.7 6.2-.8 9.5 2.6 10 .4 0 7.3-1.4 7.8-1.3 8.9.2 9.5.7 10.7-.4 1.1-1 1.6-1-9.5-6-2-1-4.4 2-5.9 1.5-2.7-1-4.6-2.3-5.7-3.8z"
                />
                <Path
                    fill="#FFEECD"
                    d="M112.5 64.7a561.4 561.4 0 0127.7 21.8c8.1 7 4.5-2.8 22-2.4-9 9.5-17.7 33.5-35 19a41 41 0 01-14.7-38.4z"
                />
                <Path
                    fill="#A3CAEA"
                    d="M104.5 127c-1.4 10.6-2 17.6-2 21.1 0 8.3 3.5 19.3 6 41.5 2.4 21.7 1.2 40.8 3 40.6 2.2-.2 13.9-.7 14.3-3.7.9-6 5.6-16.5 4.6-52.5-.6-24-2.3-39.8-5.1-47.3l-20.8.4z"
                />
            </G>
        </G>
    </Svg>
);

export default Bike_1;
