import React from "react";
import Svg, { G, Path, Circle } from 'react-native-svg';

const ImgKross = () => (
    <Svg viewBox="0 0 334 268">
        <G fill="none" fillRule="evenodd">
            <Path fill="#F0F0F0" d="M162.186 0h9.628C243.162 0 301 59.994 301 134s-57.838 134-129.186 134h-9.628C90.838 268 33 208.006 33 134S90.838 0 162.186 0z" opacity=".5" transform="translate(-40 -209) translate(40 209)" />
            <G transform="translate(-40 -209) translate(40 209) translate(0 31.045)">
                <Path fill="#F67E83" fillRule="nonzero" d="M67.098 77.5c-32.665 0-59.146 26.48-59.146 59.146 0 32.665 26.48 59.145 59.146 59.145s59.146-26.48 59.146-59.145c0-32.666-26.48-59.146-59.146-59.146zm0 1.293c31.952 0 57.853 25.901 57.853 57.853 0 31.95-25.901 57.853-57.853 57.853-31.951 0-57.853-25.902-57.853-57.853 0-31.952 25.902-57.853 57.853-57.853z" />
                <Circle cx="67.595" cy="136.149" r="4.97" fill="#F67E83" />
                <Circle cx="68.092" cy="164.479" r="2.485" fill="#F67E83" />
                <Path fill="#F67E83" fillRule="nonzero" d="M274.854 78.494c-32.665 0-59.146 26.48-59.146 59.146 0 32.665 26.48 59.145 59.146 59.145S334 170.305 334 137.64c0-32.666-26.48-59.146-59.146-59.146zm0 1.293c31.952 0 57.853 25.901 57.853 57.853 0 31.951-25.901 57.853-57.853 57.853-31.951 0-57.853-25.902-57.853-57.853 0-31.952 25.902-57.853 57.853-57.853z" />
                <Circle cx="274.854" cy="137.64" r="6.461" fill="#F67E83" />
                <Path fill="#F67E83" fillRule="nonzero" d="M126.324 118.587c.162-.296.52-.412.82-.273l.044.022 15.163 8.507 11.647 21.273c.17.31.059.702-.248.874-.292.164-.657.07-.838-.207l-.026-.043-11.47-20.95-14.845-8.329c-.292-.164-.406-.527-.27-.829l.023-.045z" />
                <Path fill="#F67E83" fillRule="nonzero" d="M153.33 148.217c.267-.212.647-.178.873.07l.034.04 18.844 24.287h17.13c.34 0 .62.267.644.605l.002.05c0 .344-.263.627-.598.652l-.048.001h-17.758l-19.232-24.786c-.22-.285-.171-.696.11-.92zM79.312 70.946c13.504 3.263 25.942 9.738 35.273 19.332 11.351 11.67 17.623 27.37 17.623 47.21 0 .358-.288.649-.645.649-.356 0-.644-.291-.644-.65 0-19.502-6.142-34.875-17.255-46.3-9.149-9.406-21.37-15.77-34.653-18.979-22.797-5.51-50.466 6.163-63.646 26.468l-3.91 6.016-2.906 4.463-3.18 4.863-1.558 2.366-.844 1.274-.69 1.033-.644.952-.271.39-.133.185-.052.07-.022.03c-.218.283-.623.335-.905.115-.281-.219-.333-.627-.115-.91l.131-.179.192-.273.311-.454.4-.591.486-.728.678-1.022 1.575-2.389 2.153-3.286 3.464-5.31 4.76-7.325c13.473-20.757 41.69-32.66 65.027-27.02zM136.34 17.884c.34-.098.703.077.809.391.106.315-.083.65-.424.748-.275.08-.549.158-.822.235l-.817.229c-.407.113-.812.224-1.215.332l-.803.213c-2.4.632-4.725 1.18-6.976 1.649l-.748.153c-2.979.6-5.826 1.06-8.545 1.385l-.677.078c-.45.05-.895.098-1.337.14l-.661.062c-2.414.217-4.72.322-6.92.322-6.487 0-11.705-.909-15.77-2.43-1.435-.536-2.624-1.113-3.582-1.693l-.101-.062-.19-.12-.175-.112-.08-.054-.15-.102-.068-.048-.125-.091-.057-.043-.1-.078-.086-.07-.037-.032c-.258-.227-.269-.605-.023-.843.233-.227.612-.247.87-.056l.12.097.1.077.043.031c.206.152.461.323.767.508.889.538 2.003 1.08 3.359 1.586 3.908 1.462 8.962 2.342 15.285 2.342 3.836 0 8.006-.327 12.52-1.012l.698-.108c3.733-.593 7.7-1.427 11.905-2.521l.791-.209c.53-.14 1.063-.285 1.6-.434l.808-.227c.27-.077.542-.154.814-.233zM229.073 1.079l.286-.029.28-.024.272-.021.267-.017.26-.014.127-.005.249-.007c.123-.004.244-.004.362-.004l.232.003.226.006.219.01.211.016c1.945.156 2.98.85 2.98 2.2 0 1.395-.987 3.066-2.966 5.045l-.258.254c-.483.469-1.02.955-1.612 1.458l-.328.276-.34.28-.173.141-.355.285-.366.288-.377.292-.387.295-.399.3-.409.301-.42.306-.43.31-.442.313-.225.158-.458.318-.469.322-.48.326-.49.329-.249.166-.506.335-.518.338-.528.342-.382.245 16.458 43.246 4.397 2.87 26.445 68.367 6.384 6.339c.24.238.253.616.038.87l-.038.04c-.24.238-.62.25-.875.038l-.041-.038-6.579-6.532-26.395-68.237-4.4-2.872-16.978-44.612.71-.45.524-.337.515-.333.503-.33.248-.163.487-.324.477-.32.466-.317.456-.313.445-.31.434-.305c.072-.05.143-.1.213-.151l.418-.3.408-.296.397-.292.386-.289.375-.285.365-.28.178-.14.35-.275.337-.271.165-.135.322-.265c.211-.176.415-.35.612-.52l.29-.254.28-.25.268-.246.258-.242.247-.238c1.812-1.77 2.721-3.203 2.721-4.271 0-.448-.465-.767-1.465-.893l-.167-.019-.087-.008-.181-.013c-.062-.004-.126-.008-.191-.01l-.2-.007-.21-.002h-.11l-.224.003-.235.007-.244.01-.255.015-.264.018-.275.023-.285.027-.146.015-.305.034-.314.038-.322.042-.332.047-.34.05-.35.056-.358.06-.367.064-.376.068-.385.073-.394.076-.403.082-.411.085-.42.09-.648.143-.442.1-.452.106-.694.165-.473.116-.483.12-.74.188-.505.131-.773.205-.794.214-.54.148-.826.23-.563.16-.57.162-.58.168-1.186.348-.302.09c-.343.102-.704-.091-.807-.432-.103-.34.091-.699.434-.801l.909-.269.889-.259.869-.249.849-.24.555-.153.816-.223.796-.214.52-.136.763-.197.743-.188.484-.119.71-.17.691-.162.45-.102.44-.098.432-.093.63-.132.41-.082.599-.116.387-.071.38-.067.37-.063.361-.059.353-.054.344-.05.335-.045.164-.021.322-.04.314-.034z" />
                <Path fill="#F67E83" fillRule="nonzero" d="M112.546 22.827L154.077 149.658 152.864 150.065 111.333 23.234zM35.786 60.6h6.363l21.526 61.991 1.03-.333 2.89 11.628-.938.274-3.594-10.35-3.699 1.2L35.786 60.6zm5.664.972h-4.267l22.778 62.224 2.783-.903L41.45 61.572z" />
                <Path fill="#F67E83" fillRule="nonzero" d="M154.077 130.184c-9.88 0-17.892 8.01-17.892 17.893 0 9.883 8.012 17.893 17.892 17.893 9.881 0 17.893-8.01 17.893-17.893 0-9.883-8.012-17.893-17.893-17.893zm0 1.302c9.171 0 16.604 7.43 16.604 16.591 0 9.162-7.433 16.592-16.604 16.592-9.17 0-16.603-7.43-16.603-16.592 0-9.162 7.432-16.591 16.603-16.591z" />
                <Path fill="#F67E83" fillRule="nonzero" d="M153.663 131.178l.017.956-84.237 1.45-4.43 10.63 5.228 3.425.006.25c.133 5.91-1.514 12-4.933 18.263l-.11.201.252.019c2.806.198 5.986.35 9.538.455l1.27.035 1.3.032.662.014 1.347.025c1.59.027 3.242.047 4.958.058l1.486.008.755.002 1.532.002h.778l1.58-.004c.797-.003 1.606-.008 2.427-.014l1.656-.013 1.688-.018 1.719-.021 1.75-.026 1.78-.029 1.812-.033 1.842-.037 1.874-.041 1.904-.045 1.936-.049 1.966-.053 1.998-.056 1.01-.03 2.044-.063 1.034-.032 2.09-.069 2.121-.072 2.153-.076 2.183-.08 2.214-.084 2.246-.088 2.276-.091 2.307-.096 2.338-.1 2.37-.103 2.4-.107 2.43-.112 2.463-.115 1.242-.059 2.509-.12 2.579-.128.048.954-2.62.13-2.587.124-2.555.12-2.521.117-2.49.112-2.455.109-2.423.104-2.39.1-2.356.095-2.325.092-1.15.044-2.274.085-1.125.041-2.225.08-2.192.074-1.084.036-2.143.069-2.11.064-2.077.06-2.045.057-2.011.052-1.978.048-1.946.044-1.912.04-1.88.035-.928.016-1.83.029-1.797.025-1.765.02-.87.01-1.715.014c-.566.005-1.127.008-1.682.011l-1.65.006-.812.002h-1.6c-9.236-.011-16.794-.235-22.673-.67l-.5-.038-.756-.059.372-.652c3.554-6.233 5.316-12.265 5.293-18.1l-.003-.281-5.467-3.581 4.973-11.938 84.876-1.46zM66.854 60.595l.741.619-3.746 4.484-2.38 2.853-2.84 3.412-2.692 3.243-2.543 3.071-1.455 1.76-1.857 2.253-1.76 2.143-1.667 2.033-1.57 1.924-1.476 1.814-1.38 1.704-.973 1.207-.918 1.144-.583.729-.559.701-.793 1-.74.94-.463.59-.44.564-.415.537-.392.509-.367.48-.344.455-.32.426-.295.399-.272.37-.248.344-.224.316-.2.289c-.251.366-.438.659-.56.878-1.182 2.106-1.647 4.638-1.135 6.56.57 2.142 2.265 3.394 5.17 3.433l.562.002.214.002.436.005.671.014.46.012.708.023.484.02.494.021.504.025.513.027.523.03.803.05.547.036.839.06.572.044.875.07.897.076.61.055.621.057.948.09.97.097.66.068.668.07 1.022.112 1.043.117 1.065.123 1.087.13.737.089-.118.958-.734-.09-.723-.086-1.068-.125-1.046-.118-1.023-.113-1.002-.106-.98-.1-.958-.095-.936-.088-.915-.082-.597-.052-.588-.048-.577-.046-.569-.043-.558-.04-.548-.039-.54-.035-.528-.032-.52-.03-.51-.027-.5-.024-.49-.022-.48-.019-.47-.016-.461-.014-.451-.01-.442-.009-.431-.005-.422-.003h-.207c-3.418 0-5.549-1.54-6.245-4.15-.582-2.186-.07-4.97 1.225-7.28.111-.198.27-.451.478-.76l.19-.279.214-.306.238-.333.261-.36.14-.19.297-.402.321-.43.17-.224.357-.47.38-.497.405-.524.428-.552.687-.88.488-.62.776-.982.548-.69 1.167-1.46 1.262-1.57.667-.826 1.045-1.29 1.478-1.817.775-.95 1.206-1.476 1.693-2.065 2.251-2.736 2.4-2.907 1.513-1.827 2.1-2.533 2.196-2.643 1.71-2.055 2.971-3.563 3.12-3.735.643-.768zM284.272 71.535l.026 1.286c-25.549.509-43.71 6.481-54.514 17.875-7.485 7.894-12.345 15.613-15.364 23.694l-.204.553-.197.545-.127.358-.185.534-.119.352-.174.525-.056.175-.165.521-.107.347-.156.52-.101.347-.1.348-.096.349-.095.35-.092.352-.091.355-.09.357-.087.36-.129.546-.084.37-.123.562-.081.38-.08.386-.08.392-.078.397-.116.608-.076.415-.114.635-.076.433-.113.665-.113.685-.075.469-.113.72-.114.745-.115.769-.195 1.339-.2 1.417-.082.59-1.271-.177.245-1.746.158-1.1.118-.794.115-.769.115-.744.153-.957.114-.693.114-.673.115-.655.116-.637.078-.416.079-.41.08-.402.08-.397.08-.391.083-.386.083-.381.085-.377.086-.372.087-.37.09-.365.136-.543.094-.359.095-.357.098-.355.099-.354.102-.354.104-.352.106-.353.11-.353.11-.354.115-.355.117-.356.12-.358.186-.54.193-.548.066-.184.203-.558.14-.377c3.08-8.244 8.033-16.11 15.636-24.13 10.966-11.564 29.19-17.637 54.645-18.256l.773-.018z" />
                <Path fill="#F67E83" fillRule="nonzero" d="M82.559 61.595L83.5 61.758 71.216 135.154 66.601 135.154 70.41 134.183z" />
                <Path fill="#F67E83" fillRule="nonzero" d="M228.18 35.06L122.961 54.59l-56.36 82.308 87.807 12.173 78.33-101.786-4.558-12.225zm.474 1.17l3.492 9.704-78.304 101.751-84.992-11.782 54.873-80.138L228.654 36.23zM97.417 60.601L97.417 61.574 33.769 61.574 33.769 69.547 32.804 69.547 32.804 60.601z" />
                <G>
                    <Path fill="#D8232A" d="M46.208.955h2.084c15.44 0 27.958 12.983 27.958 29 0 16.016-12.517 29-27.958 29h-2.084c-15.44 0-27.958-12.984-27.958-29 0-16.017 12.517-29 27.958-29z" transform="translate(158.75 160)" />
                    <Path fill="#FFF" fillRule="nonzero" d="M41.906 36v-4.158c0-.696-.039-1.416-.117-2.16-.078-.744-.147-1.44-.207-2.088h.072l1.152 2.556 3.06 5.85h2.718V24.264h-2.52v4.14c0 .696.039 1.428.117 2.196.078.768.147 1.464.207 2.088h-.072l-1.152-2.592-3.06-5.832h-2.718V36h2.52zm11.63 0v-5.184c.24-.612.543-1.038.909-1.278s.717-.36 1.053-.36c.192 0 .36.012.504.036.144.024.3.06.468.108l.432-2.286c-.132-.06-.279-.105-.441-.135-.162-.03-.369-.045-.621-.045-.456 0-.912.144-1.368.432-.456.288-.846.738-1.17 1.35h-.072l-.18-1.566h-2.16V36h2.646z" transform="translate(158.75 160)" />
                    <Path fill="#D8232A" d="M.321 6.97l34.929 5.952-9.09 20.033L.322 6.97z" transform="translate(158.75 160)" />
                </G>
            </G>
        </G>
    </Svg>
)

export default ImgKross;