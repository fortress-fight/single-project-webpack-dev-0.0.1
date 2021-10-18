/*
 * @Description: 联系板块
 * @Author: F-Stone
 * @Date: 2021-10-15 20:44:01
 * @LastEditTime: 2021-10-15 20:44:03
 * @LastEditors: F-Stone
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { os } from "@/util/os";
import { getScrollOrder } from "./scroll-trigger-manage";

export default function initContact(): { init: () => void } {
    return {
        init() {
            ScrollTrigger.saveStyles(".module-contact .wrapper-module_body");
            ScrollTrigger.saveStyles(".module-contact .layer-circle img");
            ScrollTrigger.saveStyles(
                ".module-contact .wrapper-limit_width--min"
            );
            function bigAdapt() {
                const animate = gsap.timeline({
                    defaults: {
                        ease: "none",
                    },
                    scrollTrigger: {
                        trigger: ".module-contact .wrapper-limit_width--min",
                        refreshPriority: getScrollOrder(),
                        scrub: true,
                        start: "top bottom",
                        end: "bottom bottom",
                        pinSpacing: false,
                        pin: true,
                        pinType: "transform",
                        invalidateOnRefresh: true,
                    },
                });

                if (!os.isMobile) {
                    animate.fromTo(
                        ".module-contact .wrapper-module_body",
                        {
                            ease: "none",
                            yPercent: -70,
                        },
                        { yPercent: -100 }
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
                } else {
                    animate.set(".module-contact .wrapper-module_body", {
                        yPercent: -100,
                    });
                }
            }
            ScrollTrigger.matchMedia({
                "(min-width: 735px)": bigAdapt,
            });
        },
    };
}
