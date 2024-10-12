export function formatDate(dateString: string | undefined): string {
  const currentDate: Date = new Date();
  const inputDate: Date = new Date(dateString || "");
  const diffInSeconds: number = Math.floor(
    (currentDate.getTime() - inputDate.getTime()) / 1000,
  );

  const intervals: { [key: string]: number } = {
    year: 31536000, // seconds in a year
    month: 2592000, // seconds in a month
    week: 604800, // seconds in a week
    day: 86400, // seconds in a day
    hour: 3600, // seconds in an hour
    minute: 60, // seconds in a minute
    second: 1,
  };

  for (const key in intervals) {
    const interval: number = Math.floor(diffInSeconds / intervals[key]);
    if (interval >= 1) {
      return interval === 1 ? `1 ${key} ago` : `${interval} ${key}s ago`;
    }
  }

  return "just now";
}
