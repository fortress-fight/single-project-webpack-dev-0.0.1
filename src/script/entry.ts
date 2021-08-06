/*
 * @Description: 执行文件
 * @Author: F-Stone
 * @Date: 2021-08-02 18:26:11
 * @LastEditTime: 2021-08-02 18:26:12
 * @LastEditors: F-Stone
 */
/* ---------------------------------- */
/*            register lib            */
/* ---------------------------------- */
import "@/lib/gsap.plugin";

/* ---------------------------------- */
/*            page manages            */
/* ---------------------------------- */
import SiteManage from "./components/site-manage";
import IndexPage from "./components/page-index";
$(() => {
    const pageManage = {
        "page-index": IndexPage,
    };
    const type = $("#site-page").data("type");
    if (type in pageManage) {
        new pageManage[type]().init();
    } else {
        new SiteManage().init();
    }
});
