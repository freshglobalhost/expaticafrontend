import { COUNTRIES } from "@/lib/countries";

export function countryNameFromIso(iso2: string): string | undefined {
  const iso = iso2.toUpperCase();
  return COUNTRIES.find((c) => c.code === iso)?.name;
}

export function isoFromCountryName(name: string): string | undefined {
  if (!name) return undefined;
  return COUNTRIES.find((c) => c.name === name)?.code.toLowerCase();
}

/** intl-tel-input ISO2 list aligned with our country dropdown */
export const PHONE_COUNTRY_ISOS = COUNTRIES.map((c) => c.code.toLowerCase());
