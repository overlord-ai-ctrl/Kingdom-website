export const ROLE_THRESHOLDS = {
  PEASANT: { xp: 0, crowns: 0 },
  SQUIRE: { xp: 100, crowns: 1 },
  KNIGHT: { xp: 300, crowns: 3 },
  BARON: { xp: 700, crowns: 7 },
  VISCOUNT: { xp: 1200, crowns: 12 },
  EARL: { xp: 2000, crowns: 20 },
  NOBLE: { xp: 3000, crowns: 30 },
  KING: { xp: 5000, crowns: 50 },
  OVERLORD: { xp: 999999, crowns: 999 },
} as const;

export type RoleKey = keyof typeof ROLE_THRESHOLDS;
