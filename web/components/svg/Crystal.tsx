import { SVGProps } from 'react';
import styled from 'styled-components';
import { Palette } from '../../styles/sc/colors';

const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const genCrystal = (
    variant: number,
    x: number,
    y: number,
    rot: number = 0
): SVGProps<SVGSVGElement> => {
    return (
        <Crystal
            className="crystal"
            variant={variant}
            width={'10em'}
            height={'10em'}
            style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                transform: `translate(-50%, -50%) rotate(${rot}deg)`,
            }}
        />
    );
};

export const generateRandomCrystals = (
    num: number
): SVGProps<SVGSVGElement>[] => {
    const crystals: SVGProps<SVGSVGElement>[] = [];
    for (let i = 0; i < num; i++) {
        const variant = randomInt(0, 7);
        const xPos = randomInt(15, 85);
        const yPos = randomInt(10, 40);
        const angle = randomInt(0, 360);
        crystals.push(genCrystal(variant, xPos, yPos, angle));
    }

    return crystals;
};

const CrystalSVG = styled.svg`
    color: ${Palette.offSecondary};
`;

export const Crystal = ({
    variant = 0,
    ...props
}: SVGProps<SVGSVGElement> & { variant?: number }) => {
    const variants = [
        <CrystalSVG
            key={0}
            className="crystal"
            width={116}
            height={167}
            viewBox="0 0 116 167"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...(props as any)}
        >
            <path
                d="M3 82L59 4M3 82L59 163M3 82L22 95.5M59 4L104 58.5L113 92M59 4L42.5 71.5M59 4L84 78.5M113 92L59 163M113 92L84 78.5M59 163V113.5M59 163L22 95.5M42.5 71.5L22 95.5M42.5 71.5L59 113.5M59 113.5L84 78.5"
                stroke="currentColor"
                strokeWidth={4}
            />
        </CrystalSVG>,
        <CrystalSVG
            key={1}
            className="crystal"
            width={96}
            height={183}
            viewBox="0 0 96 183"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...(props as any)}
        >
            <path
                d="M13.5 145L3 101.5L41 5M13.5 145L62 180M13.5 145L30 115.5M41 5L93.5 112.5M41 5L30 115.5M93.5 112.5L62 180M93.5 112.5L61 133M62 180C61.2 179.456 61.5 148.107 61 133M30 115.5L61 133"
                stroke="currentColor"
                strokeWidth={4}
            />
        </CrystalSVG>,
        <CrystalSVG
            key={2}
            className="crystal"
            width={109}
            height={191}
            viewBox="0 0 109 191"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...(props as any)}
        >
            <path
                d="M71.5 3L37.5 13.5L5 57M71.5 3L106 87.5M71.5 3L40.5 52M71.5 3L85.5 67.5M5 57L3 101L60 186M5 57L18.5 76.5M60 186L106 87.5M60 186L64.5 94M60 186L18.5 76.5M106 87.5L85.5 67.5M40.5 52L64.5 94M40.5 52L18.5 76.5M64.5 94L85.5 67.5"
                stroke="currentColor"
                strokeWidth={4}
            />
        </CrystalSVG>,
        <CrystalSVG
            key={3}
            className="crystal"
            width="87"
            height="207"
            viewBox="0 0 87 207"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...(props as any)}
        >
            <path
                d="M38 4L2 61.5M38 4L84.5 70M38 4L21 45.5M38 4L60.5 48M2 61.5V135.5M2 61.5L21 45.5M2 135.5L41.5 202.5M2 135.5L24.5 156M41.5 202.5L74.5 135.5M41.5 202.5L54 161.5M41.5 202.5L24.5 156M74.5 135.5L84.5 70M74.5 135.5L54 161.5M84.5 70L60.5 48M21 45.5L38 70M60.5 48L38 70M38 70V141M38 141L24.5 156M38 141L54 161.5"
                stroke="currentColor"
                strokeWidth="4"
            />
        </CrystalSVG>,
        <CrystalSVG
            key={4}
            className="crystal"
            width="94"
            height="200"
            viewBox="0 0 94 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...(props as any)}
        >
            <path
                d="M7.5 154L2 135V72L10.5 47M7.5 154L41.5 196.5M7.5 154L21 132M10.5 47L34.5 4M10.5 47L18.5 63.5M34.5 4L74 40M34.5 4L45 34M74 40L86.5 53.5L91.5 135L74 167M74 40L66 49.5M74 167L41.5 196.5M74 167L72.5 152M41.5 196.5L34.5 158M21 132L34.5 158M21 132L18.5 63.5M34.5 158L56 143.5M56 143.5L72.5 152M56 143.5L72.5 124.5M72.5 152V124.5M72.5 124.5L66 49.5M66 49.5L45 34M45 34L18.5 63.5"
                stroke="currentColor"
                strokeWidth="4"
            />
        </CrystalSVG>,
        <CrystalSVG
            key={5}
            className="crystal"
            width="74"
            height="149"
            viewBox="0 0 74 149"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...(props as any)}
        >
            <path
                d="M68 104.5L48 145.5L21 125M68 104.5L71.5 55L59 21M68 104.5L41.5 88M59 21L46 4M59 21L48 43M46 4L3 57M46 4L34.5 31.5M3 57L9 99.5M3 57L34.5 31.5M9 99.5L21 125M9 99.5L23.5 108M21 125L23.5 108M23.5 108L41.5 88M41.5 88V68M41.5 68L48 43M41.5 68L39.5 50M48 43L39.5 50M39.5 50L34.5 31.5"
                stroke="currentColor"
                strokeWidth="4"
            />
        </CrystalSVG>,
        <CrystalSVG
            key={6}
            className="crystal"
            width="112"
            height="134"
            viewBox="0 0 112 134"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...(props as any)}
        >
            <path
                d="M3 74L15 34.5L59.5 3L90.5 37.5M3 74L34.5 88.5M3 74L4.5 116M90.5 37.5L76 71M90.5 37.5L109 65M76 71L34.5 88.5M76 71L92.5 88.5M34.5 88.5V112.5M4.5 116L34.5 112.5M4.5 116L53.5 131.5M34.5 112.5L53.5 131.5M53.5 131.5L90.5 116M90.5 116L92.5 88.5M90.5 116L106.5 91.5C106.865 83.3333 107.877 66.6 109 65M92.5 88.5L109 65"
                stroke="currentColor"
                strokeWidth="4"
            />
        </CrystalSVG>,
        <CrystalSVG
            key={7}
            className="crystal"
            width="79"
            height="197"
            viewBox="0 0 79 197"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...(props as any)}
        >
            <path
                d="M37.5 4L24.5 60.5M37.5 4L65 44.5M37.5 4L10 48.5L3 78M24.5 60.5L41.5 84M24.5 60.5L3 78M41.5 84L65 44.5M41.5 84L40 161.5M65 44.5L71.5 70.5L76.5 137L59.5 172M3 78L6 158.5L23.75 176M59.5 172L41.5 193.5L23.75 176M59.5 172L40 161.5M40 161.5L23.75 176"
                stroke="currentColor"
                strokeWidth="4"
            />
        </CrystalSVG>,
    ];

    return variants[variant];
};
