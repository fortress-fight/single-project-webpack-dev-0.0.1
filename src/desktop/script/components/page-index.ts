/*
 * @Description: 首页的执行类
 * @Author: F-Stone
 * @Date: 2021-08-05 11:23:16
 * @LastEditTime: 2021-08-05 11:23:18
 * @LastEditors: F-Stone
 */
import SiteManage from "./site-manage";

export default class IndexPage extends SiteManage {
    otherTask = ["propagandaModule"];
    propagandaModule(): void {
        if (!$(".module-propaganda")[0]) return;
    }
}
