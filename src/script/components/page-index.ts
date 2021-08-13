/*
 * @Description: 首页的执行类
 * @Author: F-Stone
 * @Date: 2021-08-05 11:23:16
 * @LastEditTime: 2021-08-05 11:23:18
 * @LastEditors: F-Stone
 */

import { gsap } from "gsap";

import SiteManage from "./site-manage";

import {
    propagandaModuleScroll,
    getLineEnter,
    getLineEnterEnd,
} from "./propaganda-module";
import showModuleScrollUpdate from "./show-module-scroll-update";
import { ScrollTrigger } from "@/lib/gsap-member/esm/ScrollTrigger";
import designModuleScrollUpdate from "./design-module-scroll-update";

export default class IndexPage extends SiteManage {
    disableTask = ["initScrollNav"];
    otherTask = [
        "propagandaModule",
        "designModule",
        "showModule",
        "contactModule",
        "statisticModule",
    ];
    private _getMainPhoneEnter() {
        const animate = gsap.timeline();
        // const mainPhone = $(".layer-main_phone");
        const mainHand = $(".layer-hand-back");
        animate.fromTo(
            mainHand,
            {
                y: "10vh",
                opacity: 0,
            },
            {
                y: "0vh",
                opacity: 1,
                ease: "Power2.easeOut",
            }
        );
        return animate;
    }
    private _propagandaModuleEnter() {
        const animate = getLineEnter();
        const animateEnterEnd = getLineEnterEnd();
        animateEnterEnd.eventCallback("onComplete", () => {
            ScrollTrigger.update();
            ScrollTrigger.refresh();
            this.vsScroll.update();
        });
        const mainPhoneEnter = this._getMainPhoneEnter();
        animate.add(animateEnterEnd, ">");
        animate.add(mainPhoneEnter, "-=0.3");

        const enterDom = $(".site-head");
        setTimeout(() => {
            requestAnimationFrame(() => {
                gsap.fromTo(
                    enterDom,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        ease: "Power2.easeOut",
                        delay: 0.4,
                        duration: 0.4,
                        stagger: 1,
                        onStart() {
                            animate.play();
                        },
                        onComplete: () => {
                            this.initScrollNav();
                        },
                    }
                );
            });
        }, 100);
    }
    propagandaModule(): void {
        if (!$(".module-propaganda")[0]) return;
        this._propagandaModuleEnter();
        propagandaModuleScroll();
    }

    designModule(): void {
        if (!$(".module-design").length) return;
        gsap.timeline({
            scrollTrigger: {
                trigger: ".module-design .module-inner_wrapper",
                scrub: true,
                start: "top top",
                end: "+=300%",
                pin: true,
                onUpdate: designModuleScrollUpdate(),
            },
        });
    }
    showModule(): void {
        if (!$(".module-show").length) return;
        gsap.timeline({
            scrollTrigger: {
                id: "moduleShow",
                trigger: ".module-show .module-body",
                start: "center center",
                end: "+=400%",
                scrub: true,
                pin: true,
                onUpdate: showModuleScrollUpdate(this.vsScroll),
            },
        });
    }
    contactModule(): void {
        if (!$(".module-contact").length) return;
        const animate = gsap.timeline({
            defaults: {
                ease: "Power0.easeNone",
            },
            scrollTrigger: {
                trigger: ".module-contact",
                scrub: true,
                start: "top bottom",
                end: "bottom bottom",
                onUpdate: updateContactModule,
            },
        });

        function updateContactModule({ progress }) {
            gsap.set($(".module-contact > .wrapper-limit_width--min"), {
                y: -(1 - progress) * 100 + "%",
            });
        }
        animate.fromTo(
            ".module-contact > .wrapper-limit_width--min",
            {
                top: () =>
                    $(".module-contact > .wrapper-limit_width--min").height() *
                    0.3,
            },
            { top: "0vh" }
        );
        $(".module-contact .layer-circle img").each((i, dom) => {
            animate.fromTo(
                dom,
                {
                    y: () => {
                        return $(dom).data("speed") * 6 + "vh";
                    },
                    ease: "power1.none",
                },
                { y: "0vh" },
                0
            );
        });
    }
    statisticModule(): void {
        if (!$(".module-statistic").length) return;
        const itemInfo = $(".module-statistic .item-info");
        ScrollTrigger.create({
            trigger: ".module-statistic .box-intro_img",
            scrub: true,
            start: "center center",
            end: "bottom bottom",
            endTrigger: ".module-statistic",
            pin: true,
        });
        let oldIndex = -1;
        const doms = $(".module-statistic .item-intro_img");
        gsap.set(doms.not(doms.eq(0)), {
            opacity: 0,
        });
        function setSection(currentIndex) {
            if (oldIndex == currentIndex) return;
            if (oldIndex != -1) {
                gsap.set(doms.eq(oldIndex), {
                    zIndex: 0,
                });
                gsap.to(doms.eq(oldIndex), {
                    duration: 0.36,
                    overwrite: "auto",
                    autoAlpha: 0,
                });
            }
            gsap.set(doms.eq(currentIndex), {
                zIndex: 10,
            });
            gsap.to(doms.eq(currentIndex), {
                duration: 0.36,
                overwrite: "auto",
                autoAlpha: 1,
            });
            oldIndex = currentIndex;
        }
        itemInfo.each((i, dom) => {
            const animate = gsap.timeline({
                defaults: {
                    ease: "Power2.easeOut",
                },
                scrollTrigger: {
                    start: "top 80%",
                    end: "bottom 20%",
                    trigger: dom,
                    scrub: true,
                    onUpdate({ progress, direction }) {
                        if (direction == -1) {
                            progress <= 0.5 && setSection(i);
                        } else {
                            progress >= 0.5 && setSection(i);
                        }
                    },
                },
            });
            animate.from(dom, {
                opacity: () => {
                    return i == 0 ? 1 : 0.2;
                },
            });
            animate.to(dom, {
                opacity: 1,
            });
            animate.to(dom, {
                opacity: () => {
                    return i == itemInfo.length - 1 ? 1 : 0.3;
                },
            });
        });
    }
}
