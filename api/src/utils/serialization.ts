

export const safeStringify = (data: Object):string => {
  const cache = new WeakSet();
  return JSON.stringify(data, (key, value) => {
      if (value && typeof value === 'object') {
        if (cache.has(value))
          return;
        cache.add(value);
      }
      return value;
  });
}