/*
 * @Description: window 的对象扩展
 * @Author: Fu Fei
 * @Date: 2020-08-12 19:02:16
 * @LastEditTime: 2020-08-18 10:35:03
 * @LastEditors: Fu Fei
 * @FilePath: \new_page_build\page_build_editor\src\type\window.d.ts
 */
import jquery from "jquery";

declare global {
    interface Window {
        $: typeof jquery;
        navDistance: number;
    }
}
