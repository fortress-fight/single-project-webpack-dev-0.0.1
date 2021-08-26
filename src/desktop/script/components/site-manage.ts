/*
 * @Description:
 * @Author: F-Stone
 * @Date: 2021-08-05 11:23:27
 * @LastEditTime: 2021-08-05 11:23:28
 * @LastEditors: F-Stone
 */

import SiteManage from "@desktop/util/site-manage-0.1.0";
import { os } from "@/util/os";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

import { ScrollTrigger } from "gsap/ScrollTrigger";

export default class UemoCardSite extends SiteManage {
    name = "uemo-card";
    vsScroll = null;
    readonly preTask = ["initVsScroll"];
    readonly defaultTask = ["initScrollNav"];
    initVsScroll(): void {
        if (!os.isMobile) {
            const locoScroll = new LocomotiveScroll({
                el: document.querySelector("#site-page"),
                smooth: true,
                speed: true,
                lerp: 0.075,
                tablet: {
                    smooth: true,
                },
                smartphone: {
                    smooth: true,
                },
            });

            locoScroll.on("scroll", ScrollTrigger.update);
            ScrollTrigger.defaults({
                scroller: document.querySelector("#site-page"),
            });
            ScrollTrigger.scrollerProxy("#site-page", {
                scrollTop(value) {
                    return value
                        ? locoScroll.scrollTo(value, 0, 0)
                        : locoScroll.scroll.instance.scroll.y;
                },
                getBoundingClientRect() {
                    return {
                        top: 0,
                        left: 0,
                        width: window.innerWidth,
                        height: window.innerHeight,
                    };
                },
                pinType: "transform",
            });
            ScrollTrigger.addEventListener("refresh", () =>
                locoScroll.update()
            );
            $(window).on("resize", () => {
                locoScroll.update();
            });
            this.vsScroll = locoScroll;
        } else {
            $("body").css({
                overflow: "auto",
            });
        }
    }
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
        this.vsScroll.on("scroll", (args) => {
            setNavState($navDom, args.delta.y);
        });
    }
}
