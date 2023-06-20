import {
  scoreMultiples,
} from '../utils/constants.util';

export type ButtonProps = {
  className?: string,
  text?: string,
  icon?: string
};

export type GuessMobileProps = {
  userGuess: string,
  handleBackspace: () => void;
};

export type ShuffleLetters = () => ShuffleLetters | string;

export type ScoreWordLengthKey = keyof typeof scoreMultiples;
