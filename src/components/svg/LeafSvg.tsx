import React from 'react';
import Svg, {Path} from 'react-native-svg';

import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';

const LeafSvg: React.FC = () => {
    return (
        <Svg
            width={getFHorizontalPx(24)}
            height={getFVerticalPx(20)}
            fill="none"
            viewBox="0 0 25 21">
            <Path
                d="M.746094.773175C.628906 1.33568.542969 1.95286.488281 2.62474.441406 3.29661.417969 3.88255.417969 4.38255c0 2.09375.296875 3.99219.890621 5.69535.59375 1.6953 1.44141 3.1523 2.54297 4.3711 1.10938 1.2187 2.4336 2.1562 3.97266 2.8125 1.54687.6562 3.26958.9843 5.16798.9843 1.2422 0 2.3203-.1523 3.2344-.457.914-.3125 1.6836-.6875 2.3086-1.125.625-.4375 1.1171-.8672 1.4765-1.2891.3672-.4218.6133-.7461.7383-.9726l-1.5352-.0703c.5079.5234.9258 1.0625 1.254 1.6172.3281.5468.6171 1.1367.8671 1.7695s.5 1.3359.75 2.1094c.086.2734.2149.4687.3868.5859.1718.1172.3632.1758.5742.1758.414 0 .7695-.168 1.0664-.5039.3047-.3281.457-.7383.457-1.2305 0-.3906-.1211-.832-.3633-1.3242-.2343-.5-.5351-1.0039-.9023-1.5117-.3594-.5078-.7305-.9805-1.1133-1.418-.3828-.4375-.7187-.7891-1.0078-1.0547-.8125-.7578-1.6836-1.3398-2.6133-1.7461-.9297-.414-1.875-.7265-2.8359-.9375-.9532-.2109-1.8867-.3945-2.8008-.5508-.9063-.1562-1.7578-.35152-2.5547-.5859-.78906-.24219-1.48046-.58984-2.07421-1.04297-.59375-.46094-1.04688-1.10156-1.35938-1.92187-.07031-.1875-.03515-.33203.10547-.4336.14844-.10156.3086-.0664.48047.10547.64063.65625 1.30859 1.14063 2.00391 1.45313.69534.30468 1.41404.51562 2.15624.63281.75.10937 1.5117.19531 2.2852.25781.7734.05469 1.5586.15235 2.3554.29297.7969.14063 1.5977.39063 2.4024.75.8047.35935 1.6054.91015 2.4023 1.65235.2031.1719.4024.2266.5977.1641.2031-.0704.3242-.2149.3633-.4336.0312-.1563.0546-.3516.0703-.586.0156-.2422.0234-.4883.0234-.73826 0-1.8125-.3906-3.3164-1.1719-4.51171-.7812-1.19532-1.8593-2.08985-3.2343-2.6836-1.375-.60156-2.9571-.90234-4.7461-.90234-.5938 0-1.2149.03906-1.8633.11719-.6406.07031-1.27346.14453-1.89846.22265-.625.07031-1.21093.10547-1.75781.10547-.59375 0-1.20312-.03516-1.82812-.10547s-1.23829-.23437-1.83985-.49219C3.25 1.36302 2.67969.948957 2.14062.386457 1.89844.128644 1.62891.030988 1.33203.093488 1.03516.148175.839844.374738.746094.773175Z"
                fill="#78BA35"
            />
        </Svg>
    );
};

export default LeafSvg;
