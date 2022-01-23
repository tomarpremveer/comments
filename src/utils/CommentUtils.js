export function sortValues(values, sortOrder) {
  return sortOrder === 1
    ? values.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
    : values.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
}

export function ID() {
  return Math.random().toString(16).slice(2);
}
