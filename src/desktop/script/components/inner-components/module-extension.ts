/*
 * @Description:
 * @Author: F-Stone
 * @Date: 2021-10-18 14:07:40
 * @LastEditTime: 2021-10-18 14:07:41
 * @LastEditors: F-Stone
 */

import { gsap } from "gsap";
import lottie from "lottie-web";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { getScrollOrder } from "./scroll-trigger-manage";

export default function initExtension(): {
    init: () => void;
} {
    const $module = $(".module-extension");
    const dom = $(".module-extension .module-body .list-extension")[0];
    const domParent = $(".module-extension .module-body")[0];
    const $pinWrapper = $module.find(".wrapper-limit_width--min .pin-wrapper");
    const $list = $(".module-extension .list-extension");
    const $item = $list.find(".item-extension");
    ScrollTrigger.saveStyles($module);
    ScrollTrigger.saveStyles($list);
    ScrollTrigger.saveStyles($pinWrapper);
    return {
        init() {
            const mainScrollOrder = getScrollOrder();
            function allAdapt() {
                const scrollAnim = gsap.timeline({
                    defaults: {
                        overwrite: "auto",
                        ease: "none",
                    },
                    scrollTrigger: {
                        trigger: $module,
                        refreshPriority: mainScrollOrder,
                        start: () => {
                            return `center ${
                                (window.outerHeight - window.navDistance) / 2
                            }`;
                        },
                        scrub: true,
                        pin: $pinWrapper,
                        invalidateOnRefresh: true,
                        anticipatePin: 1,
                        end: () => `+=${dom.offsetWidth}`,
                    },
                });

                scrollAnim.to($list, {
                    duration: 1,
                    x: () => {
                        return -(dom.offsetWidth - domParent.offsetWidth);
                    },
                });
                scrollAnim.to({}, { duration: 0.2 });
            }

            $item.find(".box-icon").each((i, dom) => {
                const lottieAnimate = lottie.loadAnimation({
                    container: dom,
                    renderer: "svg",
                    loop: false,
                    autoplay: false,
                    path: $(dom).data("ae-icon"),
                });
                $(dom).data("lottieAnimate", lottieAnimate);
            });
            $item.on("pointerenter", (ev) => {
                const dom = ev.currentTarget;
                const animate = $(dom).find(".box-icon").data("lottieAnimate");
                if (animate.isPaused) {
                    animate.goToAndPlay(0, 1);
                }
            });
            ScrollTrigger.matchMedia({
                all: allAdapt,
            });
        },
    };
}
