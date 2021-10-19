/*
 * @Description: scrollTrigger 行为管理
 * @Author: F-Stone
 * @Date: 2021-10-15 15:48:18
 * @LastEditTime: 2021-10-15 15:48:19
 * @LastEditors: F-Stone
 */
let scrollOrderMax = 100;
export function getScrollOrder(): number {
    scrollOrderMax -= 5;
    return scrollOrderMax;
}
