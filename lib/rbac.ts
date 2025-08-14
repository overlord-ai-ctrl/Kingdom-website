import { Role } from "@prisma/client";

const roleOrder: Role[] = [
  Role.PEASANT,
  Role.SQUIRE,
  Role.KNIGHT,
  Role.BARON,
  Role.VISCOUNT,
  Role.EARL,
  Role.NOBLE,
  Role.KING,
  Role.OVERLORD,
];

export function hasRoleOrHigher(actual: Role, required: Role): boolean {
  return roleOrder.indexOf(actual) >= roleOrder.indexOf(required);
}
