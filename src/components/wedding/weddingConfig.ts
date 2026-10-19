export const WEDDING_TIME_ZONE = "Asia/Jakarta";

export const CEREMONY_DATE = new Date("2027-11-20T10:00:00+07:00");
export const RECEPTION_DATE = new Date("2027-11-20T12:00:00+07:00");
export const WEDDING_DATE = CEREMONY_DATE;

export const WEDDING_VENUE = {
  name: "Novotel Bandung",
  address: "Bandung, Indonesia",
  mapUrl: "https://maps.app.goo.gl/hCfZP6JACgz9LxeZ9",
};

export function formatWeddingDate(locale: string) {
  return WEDDING_DATE.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: WEDDING_TIME_ZONE,
  });
}

export function formatWeddingTime(date: Date) {
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: WEDDING_TIME_ZONE,
  });
}
