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
            window.navDistance = window.outerHeight - window.innerHeight;
            const locoScroll = new LocomotiveScroll({
                el: document.querySelector("#site-page"),
                smooth: true,
                speed: true,
                lerp: 0.075,
                getDirection: true,
                tablet: { smooth: true },
                smartphone: { smooth: true },
            });

            locoScroll.on("scroll", () => {
                ScrollTrigger.update();
            });
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
            this.vsScroll = locoScroll;
        } else {
            $("body").css({
                overflow: "auto",
            });
            window.navDistance = window.outerHeight - window.innerHeight;
            // gsap.set(".module-propaganda", {
            //     minHeight: window.outerHeight - window.navDistance,
            // });
            let orientation = null;

            if (window.innerWidth > window.innerHeight) {
                orientation = "row";
            }

            if (window.innerWidth < window.innerHeight) {
                orientation = "col";
            }
            $(window).on("resize", () => {
                requestAnimationFrame(() => {
                    const distance = Math.abs(
                        window.outerHeight - window.innerHeight
                    );
                    if (window.innerWidth > window.innerHeight) {
                        if (orientation != "row") {
                            window.location.reload();
                        }
                    } else if (window.innerWidth < window.innerHeight) {
                        if (orientation != "col") {
                            window.location.reload();
                        }
                    }
                    if (window.navDistance > distance) {
                        window.navDistance = distance;
                        ScrollTrigger.refresh();
                        // gsap.set(".module-propaganda", {
                        //     minHeight: window.outerHeight - window.navDistance,
                        // });
                    }

                    ScrollTrigger.update();
                });
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
