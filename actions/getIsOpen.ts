import { UserSettings } from "@prisma/client";
import { isBefore, isWithinInterval, subDays, addDays } from "date-fns";

const getDate = (time: string): Date => {
  const [hours, minutes] = time.split(":");
  const date = new Date();
  date.setHours(Number(hours), Number(minutes));
  return date;
};

export function getIsOpen(userSettings: UserSettings | null) {
  if (!userSettings) return false;
  const today = new Date();

  const dayOpenTime = getDate(userSettings.dayOpenTime);
  const dayCloseTime = getDate(userSettings.dayCloseTime);

  let nightOpenTime = getDate(userSettings.nightOpenTime);
  let nightCloseTime = getDate(userSettings.nightCloseTime);

  if (isBefore(nightCloseTime, nightOpenTime)) {
    const hours = today.getHours();
    if (hours <= 12) {
      nightOpenTime = subDays(nightOpenTime, 1);
    }
    if (hours >= 12) {
      nightCloseTime = addDays(nightCloseTime, 1);
    }
  }

  if (isWithinInterval(today, { start: nightOpenTime, end: nightCloseTime })) {
    return true;
  }

  if (isWithinInterval(today, { start: dayOpenTime, end: dayCloseTime })) {
    return true;
  }

  return false;
}
