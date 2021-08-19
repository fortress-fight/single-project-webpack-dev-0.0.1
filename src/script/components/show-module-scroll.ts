/*
 * @Description: 展示模块的滚动效果
 * @Author: F-Stone
 * @Date: 2021-08-18 13:20:28
 * @LastEditTime: 2021-08-18 13:20:29
 * @LastEditors: F-Stone
 */

import { gsap } from "gsap";
import secScroll from "./show-module-scroll-update";

function firstScroll() {
    const $module = $(".module-show");
    gsap.set($module.find(".wrapper-zero_area"), {
        opacity: 0,
    });
    gsap.set($module.find(".box-desc > *"), {
        opacity: 0,
    });
    const scrollAnimate = gsap.timeline({
        defaults: {
            ease: "none",
        },
        scrollTrigger: {
            trigger: $module.find(".module-body .wrapper-zero_area"),
            scrub: 1,
            start: "center center",
            end: "bottom bottom",
            endTrigger: "#show-placeholder",
            pinSpacing: false,
            pin: $module.find(".wrapper-module_content"),
        },
    });
    const dM = {
        wrapperZeroArea: 0.5,
        descText: 0.8,
        moduleHeadText: 1,
        desc: 0.3,
        layerScale: 1,
        wrapperFirstArea: 0.8,
        innerImg: 1,
    };
    scrollAnimate.addLabel("start");
    scrollAnimate
        .addLabel("wrapperZeroAreaStart")
        .to($module.find(".wrapper-zero_area"), {
            opacity: 1,
            duration: dM.wrapperZeroArea,
        })
        .addLabel("wrapperZeroAreaEnd");
    scrollAnimate
        .addLabel("descTextStart")
        .to(
            $module.find(".box-desc > *"),
            {
                opacity: 1,
                duration: dM.descText,
                stagger: dM.descText / 5,
            },
            "-=0.5"
        )
        .addLabel("descTextEnd");
    scrollAnimate
        .addLabel("moduleHeadStart")
        .to($module.find(".module-title, .module-subtitle"), {
            y: (index) => {
                return -(30 + 60 * index) + "%";
            },
            ease: "Power3.easeOut",
            opacity: 0,
            stagger: 0.06,
            duration: dM.moduleHeadText,
        })
        .addLabel("moduleHeadEnd");
    scrollAnimate
        .addLabel("descStart")
        .to(
            $module.find(".box-desc"),
            {
                opacity: 0,
                duration: dM.desc,
            },
            "descTextEnd"
        )
        .addLabel("descEnd");
    scrollAnimate
        .addLabel("layerScaleStart")
        .to(
            $module.find(".layer--scale"),
            {
                height: "100vh",
                ease: "Power4.easeIn",
                boxShadow: "0 40px 80px 0 rgba(0,0,0,0)",
                borderRadius: 0,
                duration: dM.layerScale,
                onUpdate() {
                    const originHeight = $module.find(".layer--scale").height();
                    gsap.set($module.find(".layer--scale")[0], {
                        width: (Number(originHeight) / 80) * 560,
                    });
                },
            },
            "descTextEnd"
        )
        .addLabel("layerScaleEnd");

    scrollAnimate
        .addLabel("wrapperFirstAreaScaleStart")
        .fromTo(
            $module.find(".wrapper-first_area"),
            {
                scale: 0.4,
            },
            {
                scale: 1,
                ease: "Power2.easeIn",
                duration: dM.layerScale,
            },
            "<"
        )
        .addLabel("wrapperFirstAreaScaleEnd");
    scrollAnimate
        .addLabel("wrapperFirstAreaStart")
        .to(
            $module.find(".wrapper-first_area"),
            {
                opacity: 1,
                duration: dM.wrapperFirstArea,
            },
            "descTextEnd+=0.1"
        )
        .addLabel("wrapperFirstAreaEnd");
    scrollAnimate
        .addLabel("layerBgStart")
        .to(
            $module.find(".layer--bg"),
            {
                opacity: 1,
                duration: dM.wrapperFirstArea,
            },
            "<"
        )
        .addLabel("layerBgEnd");
}
export default function showModuleScroll(vsScroll: unknown): void {
    firstScroll();
    secScroll(vsScroll);
}
