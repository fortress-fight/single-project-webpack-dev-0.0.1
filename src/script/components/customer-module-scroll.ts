/* eslint-disable @typescript-eslint/no-unused-vars */
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
    console.log("boxWidth:", boxWidth);
};
export default function initCustomerModuleScroll(): void {
    getMaxWidth();
    ScrollTrigger.addEventListener("refreshInit", getMaxWidth);

    const animate = gsap.timeline({
        scrollTrigger: {
            trigger: ".module-customer .wrapper-limit_width",
            scrub: true,
            start: "center center",
            pin: true,
            end: () => `+=${maxWidth}`,
            invalidateOnRefresh: true,
        },
    });
    animate.to(".module-customer .module-list", {
        ease: "Power0.none",
        x: -Math.abs(maxWidth - boxWidth),
    });
    $(".module-customer .module-item").each((i, dom) => {
        const animate = gsap.timeline({
            scrollTrigger: {
                trigger: dom,
                start: "left right",
                end: "left left",
                scrub: true,
            },
        });
        animate.fromTo(
            $(dom).find(".cover-img"),
            {
                x: "100%",
            },
            {
                ease: "Power0.none",
                x: 0,
            }
        );
    });
}
