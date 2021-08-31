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
                getDirection: true,
                tablet: { smooth: true },
                smartphone: { smooth: true },
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
        // const oldScrollTop = 0;
        function setNavState($dom, dir) {
            const oldSize = $dom.attr("data-size");
            if (dir == "up") {
                oldSize != "normal" && $dom.attr("data-size", "normal");
            } else {
                oldSize != "mini" && $dom.attr("data-size", "mini");
            }
        }

        if (this.vsScroll) {
            this.vsScroll.on("scroll", (args) => {
                requestAnimationFrame(() =>
                    setNavState($navDom, args.direction)
                );
            });
        } else {
            let oldScrollTop = window.scrollY;
            $(window).on("scroll", () => {
                requestAnimationFrame(() => {
                    if (window.scrollY <= 0) {
                        setNavState($navDom, "up");
                    } else {
                        setNavState(
                            $navDom,
                            window.scrollY > oldScrollTop ? "down" : "up"
                        );
                    }
                    oldScrollTop = window.scrollY;
                });
            });
        }
    }
}
