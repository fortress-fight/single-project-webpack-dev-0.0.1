/*
 * @Description:
 * @Author: Fu Fei
 * @Date: 2020-07-16 18:13:02
 * @LastEditTime: 2020-07-29 11:06:14
 * @LastEditors: Fu Fei
 * @FilePath: \uemo_verification\src\script\os.ts
 */

export const os = (function () {
    const ua = navigator.userAgent;
    const is_iPad =
        navigator.userAgent.match(/(iPad)/) /* iOS pre 13 */ ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet =
            /(?:iPad|PlayBook)/.test(ua) ||
            (isAndroid && !/(?:Mobile)/.test(ua)) ||
            (isFireFox && /(?:Tablet)/.test(ua)) ||
            is_iPad,
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc =
            !isPhone &&
            !isAndroid &&
            !isSymbian &&
            !isTablet &&
            !isWindowsPhone;
    return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc,
        isMobile: isPhone || isAndroid || isTablet || isWindowsPhone,
        isChrome,
    };
})();
