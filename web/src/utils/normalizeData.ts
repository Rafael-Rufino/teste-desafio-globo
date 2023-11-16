import { normalizeString } from "./normalizedString";

export function normalizeData<T extends { id: string; value: string }>(
  data: T[]
): T[] {
  return data.map((item) => ({
    ...item,
    value: normalizeString(item.value),
  }))
}