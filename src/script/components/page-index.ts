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
                trigger: ".module-design",
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
                trigger: ".module-show .module-body",
                start: "center center",
                end: "+=300%",
                scrub: true,
                pin: true,
                onUpdate: showModuleScrollUpdate(),
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
}
