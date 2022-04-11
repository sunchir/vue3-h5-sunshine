/**
 * judge whether is android or ios
 * @returns string  android or ios
 */
export const phoneModel = () => {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios
  if (isAndroid) return 'android';
  if (isiOS) return 'ios';
};
