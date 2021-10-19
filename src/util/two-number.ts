/*
 * @Description:
 * @Author: F-Stone
 * @Date: 2021-08-24 18:14:10
 * @LastEditTime: 2021-08-24 18:14:11
 * @LastEditors: F-Stone
 */
export function twoNumber(number: number): string {
    return number >= 10 ? String(number) : "0" + number;
}
