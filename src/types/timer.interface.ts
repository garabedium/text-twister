export interface TimerProps {
  restartGame: () => void
}

export type TimerInterval = ReturnType<typeof setInterval> | undefined;
