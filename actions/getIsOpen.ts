import { UserSettings } from "@prisma/client";

const getDate = (time: string): Date => {
  const [hours, minutes] = time.split(':')
  const date = new Date()
  date.setHours(Number(hours), Number(minutes))
  return date
}

export function getIsOpen(userSettings: UserSettings | null) {
  if (!userSettings) return false;
  const today = new Date()

  const dayOpenTime = getDate(userSettings.dayOpenTime)
  const dayCloseTime = getDate(userSettings.dayCloseTime)

  const nightOpenTime = getDate(userSettings.nightOpenTime)
  const nightCloseTime = getDate(userSettings.nightCloseTime)

  if (nightCloseTime < nightOpenTime) {
    // Seteo el dia siguiente
    nightOpenTime.setDate(nightOpenTime.getDate() - 1)
    if(today <= nightCloseTime && today >= nightOpenTime) {
      return true
    }

  }

  if (today <= nightCloseTime && today >= nightOpenTime) {
    return true
  }

  if (today <= dayCloseTime && today >= dayOpenTime) {
    return true
  }

  return false;
}