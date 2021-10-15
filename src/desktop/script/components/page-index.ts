/*
 * @Description: 首页的执行类
 * @Author: F-Stone
 * @Date: 2021-08-05 11:23:16
 * @LastEditTime: 2021-08-05 11:23:18
 * @LastEditors: F-Stone
 */

import { gsap } from "gsap";

import SiteManage from "./site-manage";

import initPropaganda from "./inner-components/module-propaganda";
import initDesign from "./inner-components/module-design";
import initShow from "./inner-components/module-show";
import initContact from "./inner-components/module-contact";
import initWeiXinCode from "./inner-components/module-weixin-code";

import initDocModuleScroll from "./doc-module-scroll";
import initCustomerModuleScroll from "./customer-module-scroll";
import statisticModuleScroll from "./statistic-module-scroll";
import moduleCase from "./module-case";
import moduleShare from "./module-share";
import lottie from "lottie-web";

export default class IndexPage extends SiteManage {
    otherTask = [
        "propagandaModule",
        "designModule",
        "showModule",
        "docModule",
        "shareModule",
        "extensionModule",
        "statisticModule",
        "customerModule",
        "caseModule",
        "contactModule",
        "weixinCode",
    ];
    weixinCode(): void {
        if (!$(".btn-open_QR")[0]) return;
        initWeiXinCode(this.vsScroll).init();
    }
    propagandaModule(): void {
        if (!$(".module-propaganda")[0]) return;
        initPropaganda().init();
    }
    designModule(): void {
        if (!$(".module-design").length) return;
        initDesign().init();
    }
    showModule(): void {
        if (!$(".module-show").length) return;
        initShow().init();
    }
    docModule(): void {
        if (!$(".module-doc").length) return;
        initDocModuleScroll();
    }
    contactModule(): void {
        if (!$(".module-contact").length) return;
        initContact().init();
    }
    statisticModule(): void {
        if (!$(".module-statistic").length) return;
        statisticModuleScroll();
    }
    extensionModule(): void {
        if (!$(".module-extension").length) return;
        const $module = $(".module-extension");
        const dom = $(".module-extension .module-body .list-extension")[0];
        const domParent = $(".module-extension .module-body")[0];

        const scrollAnimate = gsap.timeline({
            defaults: {
                overwrite: "auto",
                ease: "none",
            },
            scrollTrigger: {
                start: () => {
                    return `center ${
                        (window.outerHeight - window.navDistance) / 2
                    }`;
                },
                scrub: true,
                trigger: $module,
                pin: $module.find(".wrapper-limit_width--min .pin-wrapper"),
                invalidateOnRefresh: true,
                anticipatePin: 1,
                end: () => `+=${dom.offsetWidth}`,
            },
        });

        scrollAnimate.to(".module-extension .list-extension", {
            duration: 1,
            x: () => {
                return -(dom.offsetWidth - domParent.offsetWidth);
            },
        });
        scrollAnimate.to({}, { duration: 0.2 });
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
    customerModule(): void {
        if (!$(".module-customer").length) return;
        initCustomerModuleScroll();
    }
    shareModule(): void {
        if (!$(".module-share").length) return;
        moduleShare().init();
    }
    caseModule(): void {
        if (!$(".module-case").length) return;
        moduleCase().init();
    }
}
