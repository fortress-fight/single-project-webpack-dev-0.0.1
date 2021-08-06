/*
 * @Description: 首页的执行类
 * @Author: F-Stone
 * @Date: 2021-08-05 11:23:16
 * @LastEditTime: 2021-08-05 11:23:18
 * @LastEditors: F-Stone
 */

import SiteManage from "./site-manage";
import { gsap } from "gsap";

export default class IndexPage extends SiteManage {
    otherTask = ["propagandaModule"];
    propagandaModule(): void {
        const enterDom = $(".site-logo, .btn-open_project_QR");
        console.log("enterDom:", enterDom);
        gsap.to(enterDom, {
            opacity: 1,
            ease: "Power2.easeOut",
            delay: 0.4,
            duration: 0.4,
            stagger: 1,
        });
    }
}
