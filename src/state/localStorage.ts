const getNumber = (key: string): number | null => {
  const value = localStorage.getItem(key);
  if (value !== null) {
    return Number.parseInt(value);
  } else {
    return null;
  }
};

const setNumber = (key: string, value: number | null) => {
  if (value !== null) {
    localStorage.setItem(key, value.toString());
  } else {
    localStorage.removeItem(key);
  }
};

export const localStorageState = (
  key: string
): [() => number | null, (value: number | null) => void] => {
  return [
    () => getNumber(key),
    (value: number | null) => setNumber(key, value),
  ];
};

export const [retrieveSetIndex, storeSetIndex] = localStorageState("set");
export const [retrieveStartTime, storeStartTime] = localStorageState("time");
