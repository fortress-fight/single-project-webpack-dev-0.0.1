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
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Impetus from "impetus";
import initDocModuleScroll from "./doc-module-scroll";
import initCustomerModuleScroll from "./customer-module-scroll";
import initShowModuleScroll from "./show-module-scroll";
import initDesignModuleScroll from "./design-module-scroll";

export default class IndexPage extends SiteManage {
    disableTask = ["initScrollNav"];
    otherTask = [
        "propagandaModule",
        "designModule",
        "showModule",
        "docModule",
        "extensionModule",
        "statisticModule",
        "customerModule",
        "contactModule",
        "weixinCode",
    ];
    weixinCode(): void {
        let startDisableOpen;
        let endDisableOpen;
        gsap.to(".footer_layer--fixed", {
            opacity: 0,
            onStart() {
                endDisableOpen = true;
            },
            onReverseComplete() {
                endDisableOpen = false;
            },
            scrollTrigger: {
                trigger: ".module-contact",
                scrub: true,
                start: "top bottom",
                end: "bottom bottom",
                onUpdate({ progress }) {
                    gsap.set(".footer_layer--fixed", {
                        y: -progress * $(".module-contact").height(),
                    });
                },
            },
        });
        const weixinBtnAnimate = gsap.to(".btn-open_QR", {
            paused: true,
            duration: 0.36,
            ease: "Power2.easeOut",
            width: "auto",
        });
        let state = "close";
        function openWeixinCode() {
            if (startDisableOpen || endDisableOpen) return;
            if (state == "open") return;
            state = "open";
            weixinBtnAnimate.play();
        }
        function closeWeixinCode() {
            if (state == "close") return;
            state = "close";
            weixinBtnAnimate.reverse();
        }
        let timeout;
        const waitTime = 600;
        this.vsScroll.on("scroll", (args) => {
            const scrollY = args.delta.y;
            closeWeixinCode();
            clearTimeout(timeout);
            if (scrollY < 10) {
                startDisableOpen = true;
            } else {
                startDisableOpen = false;
            }
            timeout = setTimeout(() => {
                openWeixinCode();
            }, waitTime);
        });
        let disableClick = false;
        $(".btn-open_QR").on("click", () => {
            if (disableClick) return;
            const wrapperWeixinCode = $(`
                <div class="wrapper-weixin_code flex flex-c-c">
                    <div class="box-weixin_code">
                        <img src="${$(".btn-open_QR").attr(
                            "data-img-src"
                        )}" alt="" />
                    </div>
                </div>
            `).appendTo("body");
            requestAnimationFrame(() => {
                const showWeixinCode = gsap
                    .timeline({
                        onStart() {
                            disableClick = false;
                        },
                        onReverseComplete() {
                            wrapperWeixinCode.remove();
                        },
                    })
                    .to(wrapperWeixinCode, {
                        duration: 0.36,
                        backgroundColor: "rgba(0,0,0,0.6)",
                    })
                    .fromTo(
                        wrapperWeixinCode.find(".box-weixin_code"),
                        {
                            y: "0vh",
                            opacity: 0,
                        },
                        {
                            y: "-5vh",
                            opacity: 1,
                            duration: 0.26,
                        }
                    );
                wrapperWeixinCode.one("click", (ev) => {
                    if (ev.target != wrapperWeixinCode[0]) {
                        return;
                    }
                    showWeixinCode.reverse();
                });
            });
        });
    }
    private _getMainPhoneEnter() {
        const animate = gsap.timeline();
        // const mainPhone = $(".layer-main_phone");
        const mainHand = $(".wrapper-propaganda_intro .inner-wrapper");
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
        // animateEnterEnd.eventCallback("onComplete", () => {
        //     ScrollTrigger.update();
        //     ScrollTrigger.refresh();
        //     this.vsScroll.update();
        // });
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
        initDesignModuleScroll();
    }
    showModule(): void {
        if (!$(".module-show").length) return;
        initShowModuleScroll();
    }
    contactModule(): void {
        if (!$(".module-contact").length) return;
        const animate = gsap.timeline({
            defaults: {
                ease: "none",
            },
            scrollTrigger: {
                trigger: ".module-contact .wrapper-limit_width--min",
                scrub: true,
                start: "top bottom",
                end: "bottom bottom",
                pinSpacing: false,
                pin: true,
            },
        });

        animate.fromTo(
            ".module-contact .wrapper-module_body",
            {
                ease: "none",
                y: "-70%",
            },
            { y: "-100%" }
        );
        $(".module-contact .layer-circle img").each((i, dom) => {
            animate.fromTo(
                dom,
                {
                    y: () => {
                        return $(dom).data("speed") * 4 + "vh";
                    },
                    ease: "none",
                },
                { y: "0vh" },
                0
            );
        });
    }
    statisticModule(): void {
        if (!$(".module-statistic").length) return;
        const $module = $(".module-statistic");
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
        function setSection(currentIndex, dir) {
            if (dir == 1) {
                if (currentIndex <= oldIndex) return;
            } else {
                if (currentIndex >= oldIndex) return;
            }
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
                            progress <= 0.5 && setSection(i, direction);
                        } else {
                            progress >= 0.5 && setSection(i, direction);
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
        gsap.fromTo(
            $module.find(".bg-circle"),
            {
                opacity: 0,
                scale: 0.4,
            },
            {
                opacity: 1,
                scale: 1,
                stagger: 0.1,
                ease: "Power2.easeOut",
                scrollTrigger: {
                    trigger: $module.find(".box-bg"),
                    start: "center bottom",
                },
            }
        );
    }
    extensionModule(): void {
        if (!$(".module-extension").length) return;
        const dom = $(".module-extension .module-body .list-extension")[0];
        const domParent = $(".module-extension .module-body")[0];
        const disSize = Math.abs(dom.offsetWidth - domParent.offsetWidth);
        new Impetus({
            source: dom,
            boundX: [-disSize, 0],
            update: function (x) {
                gsap.set(dom, { x: Math.round(x) });
            },
        });
    }
    docModule(): void {
        if (!$(".module-doc").length) return;
        initDocModuleScroll();
    }
    customerModule(): void {
        if (!$(".module-customer").length) return;
        initCustomerModuleScroll();
    }
}
