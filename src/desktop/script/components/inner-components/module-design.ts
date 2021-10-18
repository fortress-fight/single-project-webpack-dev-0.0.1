/*
 * @Description: 设计展示模块
 * @Author: F-Stone
 * @Date: 2021-10-15 16:12:27
 * @LastEditTime: 2021-10-15 16:12:30
 * @LastEditors: F-Stone
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { twoNumber } from "@/util/two-number";
import { getScrollOrder } from "./scroll-trigger-manage";

import cardMove from "./module-design-card";

// intro 的滚动切换行为
function getIntroScrollCtrl() {
    const $introItems = $(".module-design .list-intro .item-intro");
    ScrollTrigger.saveStyles($introItems);
    return (distance = "50%") => {
        gsap.set($introItems, {
            y: (index) => (index ? distance : "0"),
        });
        const scrollAnim = gsap.timeline({
            paused: true,
            defaults: { ease: "none" },
        });
        const duration = 0.3;
        $introItems.each((i, dom) => {
            switch (i) {
                case 0:
                    scrollAnim.addLabel("0");
                    scrollAnim.to(dom, { y: "-" + distance });
                    scrollAnim.to(
                        dom,
                        {
                            opacity: 0,
                            duration,
                        },
                        `-=${duration}`
                    );
                    break;
                case 1:
                    scrollAnim.addLabel("1");
                    scrollAnim.to(dom, { y: 0 });
                    scrollAnim.to(
                        dom,
                        {
                            opacity: 1,
                            duration,
                        },
                        "<"
                    );
                    scrollAnim.to(dom, { y: "-" + distance });
                    scrollAnim.to(
                        dom,
                        {
                            opacity: 0,
                            duration,
                        },
                        `-=${duration}`
                    );
                    break;

                case 2:
                    scrollAnim.addLabel("2");
                    scrollAnim.to(dom, { y: 0 });
                    scrollAnim.to(
                        dom,
                        {
                            opacity: 1,
                            duration,
                        },
                        "<"
                    );
                    break;

                default:
                    break;
            }
        });
        scrollAnim.to({}, { duration: 0.5 });
        return scrollAnim;
    };
}

// card 的滚动切换行为
const setSection = (() => {
    let oldIndex = -1;
    return (dir, index) => {
        if (index == oldIndex) return;
        if (dir == 1) {
            if (index <= oldIndex) return;
        } else {
            if (index >= oldIndex) return;
        }
        $(".module-design .footer-index-nav .current").text(
            twoNumber(Number(index || 0) + 1)
        );
        cardMove(dir, index);
        oldIndex = index;
    };
})();

export default function initDesign(): { init: () => void } {
    const $moduleInnerWrapper = $(".module-design .module-inner_wrapper");
    ScrollTrigger.saveStyles($moduleInnerWrapper);

    const defaultOrder = getScrollOrder();
    const scrollOrder = getScrollOrder();
    const introScrollCtrl = getIntroScrollCtrl();
    function allAdapt() {
        gsap.timeline({
            defaults: {
                ease: "none",
            },
            scrollTrigger: {
                refreshPriority: defaultOrder,
                trigger: $moduleInnerWrapper,
                scrub: true,
                start: "top bottom",
                end: "top top",
            },
        }).fromTo(
            $(".module-design .list-intro"),
            { y: "100%", opacity: 0 },
            { y: 0, opacity: 1 }
        );
    }
    function bigAdapt() {
        const introScrollAnim = introScrollCtrl();
        const scrollAnim = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
                trigger: $moduleInnerWrapper,
                refreshPriority: scrollOrder,
                scrub: true,
                start: "top top",
                end: () => Math.min(window.innerWidth * 4, 1920 * 3),
                invalidateOnRefresh: true,
                pin: true,
                anticipatePin: 1,
                onRefresh() {
                    gsap.set(".module-design .divide-inner", {
                        width: introScrollAnim.progress() * 100 + "%",
                    });
                    setSection(
                        scrollAnim.scrollTrigger?.direction,
                        scrollAnim.currentLabel()
                    );
                },
            },
        });
        _bindCardMove(scrollAnim, introScrollAnim);
    }
    function smallAdapt() {
        const introScrollAnim = introScrollCtrl();
        const scrollAnim = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
                refreshPriority: scrollOrder,
                trigger: $moduleInnerWrapper,
                scrub: true,
                start: "top top",
                end: 3200,
                invalidateOnRefresh: true,
                pin: true,
                anticipatePin: 1,
                onRefresh() {
                    gsap.set(".module-design .divide-inner", {
                        width: introScrollAnim.progress() * 100 + "%",
                    });
                    setSection(
                        scrollAnim.scrollTrigger?.direction,
                        introScrollAnim.currentLabel()
                    );
                },
            },
        });
        _bindCardMove(scrollAnim, introScrollAnim);
    }
    function _bindCardMove(
        scrollAnim: gsap.core.Timeline,
        introScrollAnim: gsap.core.Timeline
    ) {
        introScrollAnim.eventCallback("onUpdate", () => {
            gsap.set(".module-design .divide-inner", {
                width: introScrollAnim.progress() * 100 + "%",
            });
            setSection(
                scrollAnim.scrollTrigger?.direction,
                introScrollAnim.currentLabel()
            );
        });
        scrollAnim.add(introScrollAnim.play());
    }
    return {
        init() {
            ScrollTrigger.matchMedia({
                "(min-width: 735px)": bigAdapt,
                "(max-width: 734px)": smallAdapt,
                all: allAdapt,
            });
        },
    };
}
