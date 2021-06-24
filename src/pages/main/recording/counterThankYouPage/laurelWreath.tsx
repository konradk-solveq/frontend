export default `
<style>
body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #fff;
    color: #000;
}

#origin_svg {
    position: absolute;
    width: 100%;
    opacity: .1;
}

svg {
    background-color: #fff;
}

#back_circle {
    fill: #fdf5f5;
    stroke: none;
}

@keyframes lodyga_righ {
    0% {
        transform: rotate(149deg)
    }
    16.666666666% {
        transform: rotate(149deg)
    }
    100% {
        transform: rotate(5deg)
    }
}

.lodyga_righ {
    fill: none;
    stroke: #2cba3f;
    stroke-width: 14.01257324;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 4;
    transform-origin: 143px 147.83545px;
    animation: lodyga_righ 6s cubic-bezier(.12, .04, .49, 1.01) forwards 1;
}

@keyframes lodyga_left {
    0% {
        transform: rotate(-149deg)
    }
    16.6666666666666% {
        transform: rotate(-149deg)
    }
    100% {
        transform: rotate(-5deg)
    }
}

.lodyga_left {
    fill: none;
    stroke: #76ce5a;
    stroke-width: 14.01257324;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 4;
    transform-origin: 143px 147.83545px;
    animation: lodyga_left 6s cubic-bezier(.12, .04, .49, 1.01) forwards 1;
}

.lisc_wrap {
    transform-origin: 19px 60px;
}

.lisc_right {
    fill: #2cba3f;
    fill-rule: nonzero;
    transform-origin: 19px 60px;
    transform: scale(0);
}

#lisc_wrap_right_1 {
    transform: rotate(-10deg);
}

#lisc_wrap_right_2 {
    transform: rotate(20deg);
}

#lisc_wrap_right_3 {
    transform: rotate(50deg);
}

#lisc_wrap_right_4 {
    transform: rotate(80deg);
}

#lisc_wrap_right_5 {
    transform: rotate(110deg);
    /* animation: lisc_5 3.2s linear forwards 1; */
}

.lisc_left {
    fill: #76ce5a;
    fill-rule: nonzero;
    transform-origin: 19px 60px;
    transform: scale(0);
}

#lisc_wrap_left_1 {
    transform: rotate(10deg);
}

#lisc_wrap_left_2 {
    transform: rotate(-20deg);
}

#lisc_wrap_left_3 {
    transform: rotate(-50deg);
}

#lisc_wrap_left_4 {
    transform: rotate(-80deg);
}

#lisc_wrap_left_5 {
    transform: rotate(-110deg);
    /* animation: lisc_5 3.2s linear forwards 1; */
}

@keyframes lisc_right {
    0% {
        transform: rotate(15deg) scale(0)
    }
    5% {
        transform: rotate(0deg) scale(.10)
    }
    15% {
        transform: rotate(12deg) scale(.2)
    }
    25% {
        transform: rotate(0deg) scale(.3)
    }
    35% {
        transform: rotate(10deg) scale(.4)
    }
    45% {
        transform: rotate(0deg) scale(.5)
    }
    55% {
        transform: rotate(7deg) scale(.6)
    }
    65% {
        transform: rotate(0deg) scale(.7)
    }
    75% {
        transform: rotate(4deg) scale(.8)
    }
    85% {
        transform: rotate(0deg) scale(.9)
    }
    95% {
        transform: rotate(2deg) scale(.95)
    }
    100% {
        transform: rotate(0deg) scale(1)
    }
}

#lisc_right_1 {
    animation: lisc_right 2.4s 5.0s cubic-bezier(.21, -0.01, .82, .99) forwards 1;
}

#lisc_right_2 {
    animation: lisc_right 2.8s 3.6s cubic-bezier(.21, -0.01, .82, .99) forwards 1;
}

#lisc_right_3 {
    animation: lisc_right 3.2s 2.8s cubic-bezier(.21, -0.01, .82, .99) forwards 1;
}

#lisc_right_4 {
    animation: lisc_right 3.6s 2.1s cubic-bezier(.21, -0.01, .82, .99) forwards 1;
}

#lisc_right_5 {
    animation: lisc_right 4s 1.4s cubic-bezier(.21, -0.01, .82, .99) forwards 1;
}

@keyframes lisc_left {
    0% {
        transform: rotate(-15deg) scale(0)
    }
    5% {
        transform: rotate(0deg) scale(.10)
    }
    15% {
        transform: rotate(-12deg) scale(.2)
    }
    25% {
        transform: rotate(0deg) scale(.3)
    }
    35% {
        transform: rotate(-10deg) scale(.4)
    }
    45% {
        transform: rotate(0deg) scale(.5)
    }
    55% {
        transform: rotate(-7deg) scale(.6)
    }
    65% {
        transform: rotate(0deg) scale(.7)
    }
    75% {
        transform: rotate(-4deg) scale(.8)
    }
    85% {
        transform: rotate(0deg) scale(.9)
    }
    95% {
        transform: rotate(-2deg) scale(.95)
    }
    100% {
        transform: rotate(0deg) scale(1)
    }
}

#lisc_left_1 {
    animation: lisc_left 2.4s 5.0s cubic-bezier(.21, -0.01, .82, .99) forwards 1;
}

#lisc_left_2 {
    animation: lisc_left 2.8s 3.6s cubic-bezier(.21, -0.01, .82, .99) forwards 1;
}

#lisc_left_3 {
    animation: lisc_left 3.2s 2.8s cubic-bezier(.21, -0.01, .82, .99) forwards 1;
}

#lisc_left_4 {
    animation: lisc_left 3.6s 2.1s cubic-bezier(.21, -0.01, .82, .99) forwards 1;
}

#lisc_left_5 {
    animation: lisc_left 4s 1.4s cubic-bezier(.21, -0.01, .82, .99) forwards 1;
}

@keyframes star_left {
    0% {
        fill: #ecd9b6;
        opacity: .1;
    }
    6% {
        fill: #ffeecd;
        opacity: .2;
    }
    12% {
        fill: #ecd9b6;
        opacity: .3;
    }
    19% {
        fill: #ffeecd;
        opacity: .4;
    }
    30% {
        fill: #ecd9b6;
        opacity: .55;
    }
    40% {
        fill: #ffeecd;
        opacity: .7;
    }
    50% {
        fill: #ecd9b6;
        opacity: 1;
    }
    60% {
        fill: #ffeecd;
        opacity: 1;
    }
    75% {
        fill: #ecd9b6;
        opacity: 1;
    }
    100% {
        fill: #ffeecd;
        opacity: 1;
    }
}

#star_left {
    opacity: 0;
    fill: #ffeecd;
    animation: star_left 4s 0.3s cubic-bezier(.21, -0.01, .82, .99) forwards 1;
}

@keyframes star_right {
    0% {
        fill: #ffeecd;
        opacity: .1;
    }
    6% {
        fill: #ecd9b6;
        opacity: .2;
    }
    12% {
        fill: #ffeecd;
        opacity: .3;
    }
    19% {
        fill: #ecd9b6;
        opacity: .4;
    }
    30% {
        fill: #ffeecd;
        opacity: .55;
    }
    40% {
        fill: #ecd9b6;
        opacity: .7;
    }
    50% {
        fill: #ffeecd;
        opacity: 1;
    }
    60% {
        fill: #ecd9b6;
        opacity: 1;
    }
    75% {
        fill: #ffeecd;
        opacity: 1;
    }
    100% {
        fill: #ecd9b6;
        opacity: 1;
    }
}

#star_right {
    opacity: 0;
    fill: #ecd9b6;
    animation: star_right 4s 0.3s cubic-bezier(.21, -0.01, .82, .99) forwards 1;
}

#mark_1 {
    width: 5px;
    height: 5px;
    opacity: .5;
    fill: blueviolet;
    x: 19px;
    y: 60px;
}
</style>

<svg viewBox="0 0 286 286">
<defs>
    <clipPath id="clip_right">
        <rect x="143" y="0" width="143" height="286" />
    </clipPath>
    <clipPath id="clip_left">
        <rect x="0" y="0" width="143.1" height="286" />
    </clipPath>
</defs>
<circle id="back_circle" cx="143" cy="143" r="143"/>

<g
    clip-path="url(#clip_right)"
>
    <path 
        id="lodyga_righ"
        class="lodyga_righ"
        transform="rotate(141)"
        d="m 143.15039,225.02539 c 42.57748,-0.20363 77.0311,-34.77901 77.03125,-77.4043 C 220.17122,122.33841 208.03214,99.8739 189.25,85.75"
        >
    </path>
</g>
<g
    clip-path="url(#clip_left)"
>
    <path 
        id="lodyga_left"
        class="lodyga_left"
        transform="rotate(-5)"
        d="M 142.84961,225.02539 C 100.27213,224.82176 65.818513,190.24638 65.818363,147.62109 65.828763,122.33841 77.967863,99.8739 96.750003,85.75"
        >
    </path>
</g>

<g transform="translate(176, 38)">
    <g id="lisc_wrap_right_1" class="lisc_wrap">
        <path 
            id="lisc_right_1"
            class="lisc_right"
            d="M 17.577768,0 6.4662375,13.04815 c -4.15683,4.88174 -6.40103009,10.94286 -6.45088009,17.27993 -0.033,1.02037 -0.014,2.04822 0.0685,3.08087 0.5741801,7.20084 3.91638009,13.74668 9.41317009,18.43194 L 19.324968,60.217 30.436498,47.16885 c 4.16408,-4.89026 6.40887,-10.96457 6.45112,-17.31365 0.0314,-1.00939 0.0129,-2.02578 -0.0687,-3.04715 -0.57418,-7.20085 -3.91638,-13.7467 -9.41317,-18.43196 z"
            />
    </g>
</g>

<g transform="translate(195, 70)">
    <g id="lisc_wrap_right_2" class="lisc_wrap">
        <path 
            id="lisc_right_2"
            class="lisc_right"
            d="M 17.577768,0 6.4662375,13.04815 c -4.15683,4.88174 -6.40103009,10.94286 -6.45088009,17.27993 -0.033,1.02037 -0.014,2.04822 0.0685,3.08087 0.5741801,7.20084 3.91638009,13.74668 9.41317009,18.43194 L 19.324968,60.217 30.436498,47.16885 c 4.16408,-4.89026 6.40887,-10.96457 6.45112,-17.31365 0.0314,-1.00939 0.0129,-2.02578 -0.0687,-3.04715 -0.57418,-7.20085 -3.91638,-13.7467 -9.41317,-18.43196 z"
        />
    </g>
</g>

<g transform="translate(194, 107)">
    <g id="lisc_wrap_right_3" class="lisc_wrap">
        <path 
            id="lisc_right_3"
            class="lisc_right"
            d="M 17.577768,0 6.4662375,13.04815 c -4.15683,4.88174 -6.40103009,10.94286 -6.45088009,17.27993 -0.033,1.02037 -0.014,2.04822 0.0685,3.08087 0.5741801,7.20084 3.91638009,13.74668 9.41317009,18.43194 L 19.324968,60.217 30.436498,47.16885 c 4.16408,-4.89026 6.40887,-10.96457 6.45112,-17.31365 0.0314,-1.00939 0.0129,-2.02578 -0.0687,-3.04715 -0.57418,-7.20085 -3.91638,-13.7467 -9.41317,-18.43196 z"
        />
    </g>
</g>

<g transform="translate(174, 140)">
    <g id="lisc_wrap_right_4" class="lisc_wrap">
        <path 
            id="lisc_right_4"
            class="lisc_right"
            d="M 17.577768,0 6.4662375,13.04815 c -4.15683,4.88174 -6.40103009,10.94286 -6.45088009,17.27993 -0.033,1.02037 -0.014,2.04822 0.0685,3.08087 0.5741801,7.20084 3.91638009,13.74668 9.41317009,18.43194 L 19.324968,60.217 30.436498,47.16885 c 4.16408,-4.89026 6.40887,-10.96457 6.45112,-17.31365 0.0314,-1.00939 0.0129,-2.02578 -0.0687,-3.04715 -0.57418,-7.20085 -3.91638,-13.7467 -9.41317,-18.43196 z"
        />
    </g>
</g>

<g transform="translate(142, 158)">
    <g id="lisc_wrap_right_5" class="lisc_wrap">
        <path 
            id="lisc_right_5"
            class="lisc_right"
            d="M 17.577768,0 6.4662375,13.04815 c -4.15683,4.88174 -6.40103009,10.94286 -6.45088009,17.27993 -0.033,1.02037 -0.014,2.04822 0.0685,3.08087 0.5741801,7.20084 3.91638009,13.74668 9.41317009,18.43194 L 19.324968,60.217 30.436498,47.16885 c 4.16408,-4.89026 6.40887,-10.96457 6.45112,-17.31365 0.0314,-1.00939 0.0129,-2.02578 -0.0687,-3.04715 -0.57418,-7.20085 -3.91638,-13.7467 -9.41317,-18.43196 z"
        />
    </g>
</g>

<g transform="translate(73, 38)">
    <g id="lisc_wrap_left_1" class="lisc_wrap">
        <path 
            id="lisc_left_1"
            class="lisc_left"
            d="M 17.577768,0 6.4662375,13.04815 c -4.15683,4.88174 -6.40103009,10.94286 -6.45088009,17.27993 -0.033,1.02037 -0.014,2.04822 0.0685,3.08087 0.5741801,7.20084 3.91638009,13.74668 9.41317009,18.43194 L 19.324968,60.217 30.436498,47.16885 c 4.16408,-4.89026 6.40887,-10.96457 6.45112,-17.31365 0.0314,-1.00939 0.0129,-2.02578 -0.0687,-3.04715 -0.57418,-7.20085 -3.91638,-13.7467 -9.41317,-18.43196 z"
            />
    </g>
</g>

<g transform="translate(54, 70)">
    <g id="lisc_wrap_left_2" class="lisc_wrap">
        <path 
            id="lisc_left_2"
            class="lisc_left"
            d="M 17.577768,0 6.4662375,13.04815 c -4.15683,4.88174 -6.40103009,10.94286 -6.45088009,17.27993 -0.033,1.02037 -0.014,2.04822 0.0685,3.08087 0.5741801,7.20084 3.91638009,13.74668 9.41317009,18.43194 L 19.324968,60.217 30.436498,47.16885 c 4.16408,-4.89026 6.40887,-10.96457 6.45112,-17.31365 0.0314,-1.00939 0.0129,-2.02578 -0.0687,-3.04715 -0.57418,-7.20085 -3.91638,-13.7467 -9.41317,-18.43196 z"
        />
    </g>
</g>

<g transform="translate(54, 107)">
    <g id="lisc_wrap_left_3" class="lisc_wrap">
        <path 
        id="lisc_left_3"
        class="lisc_left"
        d="M 17.577768,0 6.4662375,13.04815 c -4.15683,4.88174 -6.40103009,10.94286 -6.45088009,17.27993 -0.033,1.02037 -0.014,2.04822 0.0685,3.08087 0.5741801,7.20084 3.91638009,13.74668 9.41317009,18.43194 L 19.324968,60.217 30.436498,47.16885 c 4.16408,-4.89026 6.40887,-10.96457 6.45112,-17.31365 0.0314,-1.00939 0.0129,-2.02578 -0.0687,-3.04715 -0.57418,-7.20085 -3.91638,-13.7467 -9.41317,-18.43196 z"
        />
    </g>
</g>

<g transform="translate(74, 140)">
    <g id="lisc_wrap_left_4" class="lisc_wrap">
        <path 
            id="lisc_left_4"
            class="lisc_left"
            d="M 17.577768,0 6.4662375,13.04815 c -4.15683,4.88174 -6.40103009,10.94286 -6.45088009,17.27993 -0.033,1.02037 -0.014,2.04822 0.0685,3.08087 0.5741801,7.20084 3.91638009,13.74668 9.41317009,18.43194 L 19.324968,60.217 30.436498,47.16885 c 4.16408,-4.89026 6.40887,-10.96457 6.45112,-17.31365 0.0314,-1.00939 0.0129,-2.02578 -0.0687,-3.04715 -0.57418,-7.20085 -3.91638,-13.7467 -9.41317,-18.43196 z"
        />
    </g>
</g>

<g transform="translate(106, 158)">
    <g id="lisc_wrap_left_5" class="lisc_wrap">
        <path 
            id="lisc_left_5"
            class="lisc_left"
            d="M 17.577768,0 6.4662375,13.04815 c -4.15683,4.88174 -6.40103009,10.94286 -6.45088009,17.27993 -0.033,1.02037 -0.014,2.04822 0.0685,3.08087 0.5741801,7.20084 3.91638009,13.74668 9.41317009,18.43194 L 19.324968,60.217 30.436498,47.16885 c 4.16408,-4.89026 6.40887,-10.96457 6.45112,-17.31365 0.0314,-1.00939 0.0129,-2.02578 -0.0687,-3.04715 -0.57418,-7.20085 -3.91638,-13.7467 -9.41317,-18.43196 z"
        />
    </g>
</g>

<path 
    id="star_left"
    d="M 143.50195 96.275391 L 127.17969 128.98242 L 90.773438 134.27344 L 117.0918 159.77734 L 110.91406 195.75391 L 143.50195 178.80859 L 143.50195 96.275391 z"
/>
<path 
    id="star_right"
    d="m 169.66,159.777 26.069,-25.504 -36.06,-5.289 -16.167,-32.709 v 82.533 l 32.278,16.946 z"
/>

</svg>

`;
