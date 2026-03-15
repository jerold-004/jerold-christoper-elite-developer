import { motion, useInView, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

import "./Counter.css";

type Place = number | ".";

type CounterProps = {
  value: number;
  fontSize?: number;
  padding?: number;
  places?: Place[];
  gap?: number;
  borderRadius?: number;
  horizontalPadding?: number;
  textColor?: string;
  fontWeight?: number | string;
  containerStyle?: React.CSSProperties;
  counterStyle?: React.CSSProperties;
  digitStyle?: React.CSSProperties;
  gradientHeight?: number;
  gradientFrom?: string;
  gradientTo?: string;
  topGradientStyle?: React.CSSProperties;
  bottomGradientStyle?: React.CSSProperties;
  triggerOnView?: boolean;
  inViewOnce?: boolean;
};

type NumberProps = {
  mv: ReturnType<typeof useSpring>;
  number: number;
  height: number;
};

function Number({ mv, number, height }: NumberProps) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * height;

    if (offset > 5) {
      memo -= 10 * height;
    }

    return memo;
  });

  return (
    <motion.span className="counter-number" style={{ y }}>
      {number}
    </motion.span>
  );
}

function normalizeNearInteger(num: number) {
  const nearest = Math.round(num);
  const tolerance = 1e-9 * Math.max(1, Math.abs(num));

  return Math.abs(num - nearest) < tolerance ? nearest : num;
}

function getValueRoundedToPlace(value: number, place: number) {
  const scaled = value / place;

  return Math.floor(normalizeNearInteger(scaled));
}

type DigitProps = {
  place: Place;
  value: number;
  height: number;
  digitStyle?: React.CSSProperties;
  animate: boolean;
};

function Digit({ place, value, height, digitStyle, animate }: DigitProps) {
  const isDecimal = place === ".";
  const valueRoundedToPlace = isDecimal ? 0 : getValueRoundedToPlace(value, place);
  const animatedValue = useSpring(0, {
    stiffness: 90,
    damping: 18,
    mass: 0.85,
  });

  useEffect(() => {
    if (!isDecimal) {
      animatedValue.set(animate ? valueRoundedToPlace : 0);
    }
  }, [animate, animatedValue, isDecimal, valueRoundedToPlace]);

  if (isDecimal) {
    return (
      <span className="counter-digit" style={{ height, ...digitStyle, width: "fit-content" }}>
        .
      </span>
    );
  }

  return (
    <span className="counter-digit" style={{ height, ...digitStyle }}>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </span>
  );
}

function derivePlacesFromValue(value: number): Place[] {
  const chars = [...value.toString()];
  const decimalIndex = chars.indexOf(".");

  return chars.map((char, i) => {
    if (char === ".") {
      return ".";
    }

    if (decimalIndex === -1) {
      return 10 ** (chars.length - i - 1);
    }

    if (i < decimalIndex) {
      return 10 ** (decimalIndex - i - 1);
    }

    return 10 ** -(i - decimalIndex);
  });
}

export default function Counter({
  value,
  fontSize = 100,
  padding = 0,
  places,
  gap = 8,
  borderRadius = 4,
  horizontalPadding = 8,
  textColor = "inherit",
  fontWeight = "inherit",
  containerStyle,
  counterStyle,
  digitStyle,
  gradientHeight = 16,
  gradientFrom = "black",
  gradientTo = "transparent",
  topGradientStyle,
  bottomGradientStyle,
  triggerOnView = true,
  inViewOnce = true,
}: CounterProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(containerRef, { once: inViewOnce, margin: "0px 0px -10% 0px" });
  const height = fontSize + padding;
  const resolvedPlaces = places ?? derivePlacesFromValue(value);
  const shouldAnimate = triggerOnView ? inView : true;

  const defaultCounterStyle: React.CSSProperties = {
    fontSize,
    gap,
    borderRadius,
    paddingLeft: horizontalPadding,
    paddingRight: horizontalPadding,
    color: textColor,
    fontWeight,
  };

  const defaultTopGradientStyle: React.CSSProperties = {
    height: gradientHeight,
    background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
  };

  const defaultBottomGradientStyle: React.CSSProperties = {
    height: gradientHeight,
    background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
  };

  return (
    <span ref={containerRef} className="counter-container" style={containerStyle}>
      <span className="counter-counter" style={{ ...defaultCounterStyle, ...counterStyle }}>
        {resolvedPlaces.map((place, index) => (
          <Digit
            key={`${String(place)}-${index}`}
            place={place}
            value={value}
            height={height}
            digitStyle={digitStyle}
            animate={shouldAnimate}
          />
        ))}
      </span>
      <span className="gradient-container">
        <span className="top-gradient" style={topGradientStyle ?? defaultTopGradientStyle} />
        <span className="bottom-gradient" style={bottomGradientStyle ?? defaultBottomGradientStyle} />
      </span>
    </span>
  );
}
