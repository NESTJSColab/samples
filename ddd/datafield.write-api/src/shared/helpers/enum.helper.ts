export const getEnumKeyAsString = (value: string, list: any): string => {
  const indexOfS = Object.values(list).indexOf(value as unknown as any);

  return Object.keys(list)[indexOfS];
};

export const getEnumKey = (value: string, list: any): any => {
  return list[value];
};
