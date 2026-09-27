export const accessTypes = [
  { id: "functional", label: "Functional modules" },
  { id: "technical", label: "Technical modules" },
] as const;

export type AccessType = (typeof accessTypes)[number]["id"];

export const durations = [1, 2, 3, 6] as const;
export type AccessDuration = (typeof durations)[number];

export const accessPrices: Record<AccessType, Record<AccessDuration, number>> = {
  functional: { 1: 1300, 2: 2200, 3: 2800, 6: 5500 },
  technical: { 1: 1400, 2: 2500, 3: 3000, 6: 5800 },
};

export const specialistModuleCodes = new Set(["IBP", "GRC", "Ariba", "SF", "BTP"]);

export function durationLabel(months: AccessDuration) {
  return `${months} month${months === 1 ? "" : "s"}`;
}