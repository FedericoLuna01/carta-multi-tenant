import { UserSettings } from "@prisma/client";

export function getIsOpen(userSettings: UserSettings | null) {
  if (!userSettings) return false;
  const today = new Date()
  const todayDate = today.toISOString().substring(0, 10);

  const dayOpenTime = new Date(`${todayDate}T${userSettings.dayOpenTime}`)
  const dayCloseTime = new Date(`${todayDate}T${userSettings.dayCloseTime}`)

  const nightOpenTime = new Date(`${todayDate}T${userSettings.nightOpenTime}`)
  const nightCloseTime = new Date(`${todayDate}T${userSettings.nightCloseTime}`)

  // TODO: No funciona si el horario de cierre es menor al de apertura

  if (nightOpenTime < nightCloseTime) {
    if (today >= nightOpenTime && today < nightCloseTime) {
      return true;
    }
  } else {
    if (today >= nightOpenTime || today < nightCloseTime) {
      return true;
    }
  }

  if (dayOpenTime < dayCloseTime) {
    if (today >= dayOpenTime && today < dayCloseTime) {
      return true;
    }
  } else {
    if (today >= dayOpenTime || today < dayCloseTime) {
      return true;
    }
  }

  return false;
}