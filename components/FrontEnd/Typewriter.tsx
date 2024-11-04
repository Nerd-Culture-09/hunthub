"use client";
import PropTypes from "prop-types";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";

export function TypewriterEffectSmoothDemo({
  words = [
    { text: "Build" },
    { text: "awesome" },
    { text: "apps" },
    { text: "with" },
    { text: "Aceternity.", className: "text-blue-500 dark:text-blue-500" },
  ],
  buttonTexts = ["Join now", "Signup"],
}) {
  return (
    <div>
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}

// PropTypes to enforce type-checking
TypewriterEffectSmoothDemo.propTypes = {
  headingText: PropTypes.string,
  words: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      className: PropTypes.string,
    })
  ),
  buttonTexts: PropTypes.arrayOf(PropTypes.string),
};
