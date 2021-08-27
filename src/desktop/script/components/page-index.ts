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
import Impetus from "impetus";
import initDocModuleScroll from "./doc-module-scroll";
import initCustomerModuleScroll from "./customer-module-scroll";
import initShowModuleScroll from "./show-module-scroll";
import initDesignModuleScroll from "./design-module-scroll";
import statisticModuleScroll from "./statistic-module-scroll";
import lottie from "lottie-web";

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

        let weixinBtnAnimate = gsap.to(".btn-open_QR", {
            paused: true,
            duration: 0.36,
            ease: "Power2.easeOut",
            width: "auto",
        });
        $(window).on("resize", () => {
            weixinBtnAnimate.kill();
            $(".btn-open_QR").css({ width: "" });
            weixinBtnAnimate = gsap.to(".btn-open_QR", {
                paused: true,
                duration: 0.36,
                ease: "Power2.easeOut",
                width: "auto",
            });
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
        statisticModuleScroll();
    }
    extensionModule(): void {
        if (!$(".module-extension").length) return;
        const dom = $(".module-extension .module-body .list-extension")[0];
        const domParent = $(".module-extension .module-body")[0];
        const disSize = Math.abs(dom.offsetWidth - domParent.offsetWidth);
        const dragger = new Impetus({
            source: dom,
            boundX: [-disSize, 0],
            update: function (x) {
                gsap.set(dom, { x: Math.round(x) });
            },
        });
        $(window).on("resize", () => {
            const disSize = Math.abs(dom.offsetWidth - domParent.offsetWidth);
            gsap.set(dom, { x: 0 });
            dragger.setBoundX([-disSize, 0]);
        });
        $(".module-extension .item-extension .box-icon").each((i, dom) => {
            const lottieAnimate = lottie.loadAnimation({
                container: dom,
                renderer: "svg",
                loop: false,
                autoplay: false,
                path: $(dom).data("ae-icon"),
            });
            $(dom).data("lottieAnimate", lottieAnimate);
        });
        $(".module-extension .item-extension").on("pointerenter", (ev) => {
            const dom = ev.currentTarget;
            const animate = $(dom).find(".box-icon").data("lottieAnimate");
            if (animate.isPaused) {
                animate.goToAndPlay(0, 1);
            }
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
