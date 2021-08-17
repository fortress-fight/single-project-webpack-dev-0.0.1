/*
 * @Description:
 * @Author: F-Stone
 * @Date: 2021-08-17 14:47:23
 * @LastEditTime: 2021-08-17 14:47:24
 * @LastEditors: F-Stone
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "@/lib/gsap-member/esm/ScrollTrigger";
let maxWidth = 0;
let boxWidth = 0;
const getMaxWidth = () => {
    maxWidth = $(".module-customer .module-list")[0].offsetWidth;
    boxWidth = $(".module-customer .module-list").parent()[0].offsetWidth;
};
export default function initCustomerModuleScroll(): void {
    getMaxWidth();
    ScrollTrigger.addEventListener("refreshInit", getMaxWidth);
    $(".module-customer .module-item")
        .toArray()
        .forEach((item) => {
            const coverAnimate = gsap.fromTo(
                $(item).find(".cover-img"),
                {
                    x: "-200%",
                },
                {
                    paused: true,
                    immediateRender: false,
                    ease: "power3",
                    x: 0,
                }
            );
            $(item).data("coverAnimate", coverAnimate);
        });
    const animate = gsap.timeline({
        defaults: {
            ease: "none",
        },
        scrollTrigger: {
            trigger: ".module-customer .wrapper-limit_width",
            scrub: true,
            start: "center center",
            pin: true,
            end: () => `+=${maxWidth}`,
            onUpdate() {
                $(".module-customer .module-item")
                    .toArray()
                    .forEach((dom) => {
                        const size = dom.getBoundingClientRect();
                        const maxWidth = window.innerWidth + size.width;
                        const disPos = size.left + size.width;
                        const percent = disPos / maxWidth;
                        $(dom)
                            .data("coverAnimate")
                            .progress(gsap.utils.clamp(0, 1, percent));
                    });
            },
            invalidateOnRefresh: true,
        },
    });
    animate.to(".module-customer .module-list", {
        x: -Math.abs(maxWidth - boxWidth),
    });
    $(".module-customer .module-item")
        .toArray()
        .forEach((dom) => {
            const size = dom.getBoundingClientRect();
            const maxWidth = window.innerWidth + size.width;
            const disPos = size.left + size.width;
            const percent = disPos / maxWidth;
            $(dom)
                .data("coverAnimate")
                .progress(gsap.utils.clamp(0, 1, percent));
        });
}
