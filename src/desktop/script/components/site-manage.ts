/*
 * @Description:
 * @Author: F-Stone
 * @Date: 2021-08-05 11:23:27
 * @LastEditTime: 2021-08-05 11:23:28
 * @LastEditors: F-Stone
 */

import SiteManage from "@desktop/util/site-manage-0.1.0";

export default class UemoCardSite extends SiteManage {
    name = "uemo-card";
    vsScroll = null;
    readonly preTask = [];
    readonly defaultTask = [];
    private setNavState($dom, dir) {
        const oldSize = $dom.attr("data-size");
        if (dir == "down") {
            oldSize != "mini" && $dom.attr("data-size", "mini");
        } else {
            oldSize != "normal" && $dom.attr("data-size", "normal");
        }
    }
    initScrollNav(): void {
        const $navDom = $("#site-head");
        let oldScrollTop = window.scrollY;
        $(window).on("scroll", () => {
            requestAnimationFrame(() => {
                if (window.scrollY <= 0) {
                    this.setNavState($navDom, "up");
                } else {
                    this.setNavState(
                        $navDom,
                        window.scrollY > oldScrollTop ? "down" : "up"
                    );
                }
                oldScrollTop = window.scrollY;
            });
        });
    }
}
