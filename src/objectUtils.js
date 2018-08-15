export function mergeAt(k, data, obj) {
  return {...obj, [k]: {...obj[k], ...data}};
}
