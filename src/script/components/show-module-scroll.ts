/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Description: 展示模块的滚动效果
 * @Author: F-Stone
 * @Date: 2021-08-18 13:20:28
 * @LastEditTime: 2021-08-18 13:20:29
 * @LastEditors: F-Stone
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "@/lib/gsap-member/esm/ScrollTrigger";
export default function showModuleScroll(): void {
    const $module = $(".module-show");
    const scrollAnimate = gsap.timeline({
        defaults: {
            ease: "none",
            duration: 0.5,
        },
        scrollTrigger: {
            trigger: $module.find(".wrapper-module_content"),
            scrub: 1,
            start: "bottom center",
            pin: true,
        },
    });
    scrollAnimate
        .to($module.find(".module-title, .module-subtitle"), {
            y: (index) => {
                return -(30 + 60 * index) + "%";
            },
            ease: "Power3.easeOut",
            opacity: 0,
            stagger: 0.06,
        })
        .to(
            $module.find(".box-desc"),
            {
                opacity: 0,
            },
            0
        );
}
