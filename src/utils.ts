export const calculateTimeLeft = (dateTime: string) => {
  const now = new Date();
  const targetDate = new Date(dateTime);
  const timeDifference = targetDate.getTime() - now.getTime();

  if (timeDifference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, done: false };
};

export const formatCount = (count: number) => {
  return count.toString().padStart(2, "0");
};
