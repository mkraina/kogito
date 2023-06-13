export const secondsToTime = (input: number): string => {
  const seconds = input < 0 ? 0 : input;

  const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0'),
    m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0'),
    s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');

  return h === '00' ? `${m}:${s}` : `${h}:${m}:${s}`;
};
