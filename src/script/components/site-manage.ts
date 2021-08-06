/*
 * @Description:
 * @Author: F-Stone
 * @Date: 2021-08-05 11:23:27
 * @LastEditTime: 2021-08-05 11:23:28
 * @LastEditors: F-Stone
 */

import SiteManage from "@/util/site-manage-0.1.0";

export default class UemoCardSite extends SiteManage {
    name = "uemo-card";
    readonly defaultTask = ["initScrollNav"];
    initScrollNav(): void {
        const $navDom = $("#site-head");
        function setNavState($dom, scrollY, condition = 20) {
            const oldSize = $dom.attr("data-size");
            if (scrollY >= condition) {
                oldSize != "mini" && $dom.attr("data-size", "mini");
            } else {
                oldSize != "normal" && $dom.attr("data-size", "normal");
            }
        }
        setNavState($navDom, window.scrollY);
        $(window).on("scroll", () => {
            setNavState($navDom, window.scrollY);
        });
    }
}
