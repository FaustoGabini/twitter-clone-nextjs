const DATE_UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
];

const getDateDiffs = (timestamp) => {
  const now = Date.now();
  const elapsed =
    (now - timestamp) /
    1000; /* Lo divimos entre mil para trabajar en segundos y no en milisegundos */

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (elapsed > secondsInUnit || unit === "second") {
      const value = Math.round(elapsed / secondsInUnit);
      return {
        value: value,
        unit: unit,
      };
    }
  }
};

export default function useTimeAgo(timestamp) {
  const { value, unit } = getDateDiffs(timestamp);
  /* Relative time format */
  const rtf = new Intl.RelativeTimeFormat("es", {
    style: "short",
  });
  return rtf.format(-value, unit);
}
