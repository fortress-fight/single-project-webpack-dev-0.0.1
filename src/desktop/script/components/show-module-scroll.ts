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
    gsap.timeline({
        defaults: {
            ease: "none",
            overwrite: "auto",
        },
        scrollTrigger: {
            trigger: $module.find(".module-header"),
            scrub: true,
            end: "bottom bottom",
            endTrigger: $module.find(".module-body .wrapper-zero_area"),
        },
    }).fromTo($module.find(".module-header"), { opacity: 0 }, { opacity: 1 });

    const $scaleDom = $module.find(".layer--scale");
    const scrollAnimate = gsap.timeline({
        defaults: {
            overwrite: "auto",
            ease: "none",
        },
        scrollTrigger: {
            trigger: $module.find(".module-body .wrapper-zero_area"),
            scrub: true,
            start: () => {
                return `center ${
                    (window.outerHeight - window.navDistance) / 2
                }`;
            },
            end: "bottom bottom",
            endTrigger: "#show-placeholder",
            pinSpacing: false,
            pin: $module.find(".wrapper-module_content"),
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh() {
                const currentLabel = scrollAnimate.currentLabel();
                const labels = scrollAnimate.labels;
                if (labels.layerScaleEnd <= labels[currentLabel]) {
                    gsap.set($scaleDom[0], {
                        height: window.outerHeight - window.navDistance,
                        width:
                            (window.outerHeight - window.navDistance) *
                            scaleRota,
                    });
                }
            },
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

    const $zeroArea = $module.find(".wrapper-zero_area .wrapper-content");
    let scaleRota = $zeroArea.width() / $zeroArea.height();
    let originHeight = $scaleDom.height();
    scrollAnimate.addLabel("layerScaleStart", "descTextEnd");
    scrollAnimate.fromTo(
        $scaleDom,
        {
            borderRadius: () => {
                $scaleDom.css("borderRadius", "");
                return $scaleDom.css("borderRadius");
            },
            boxShadow: () => {
                $scaleDom.css("boxShadow", "");
                return $scaleDom.css("boxShadow");
            },
        },
        {
            ease: "test-es-1",
            boxShadow: "15px 20px 30px 0px rgba(0,0,0,0)",
            borderRadius: 0,
            force3D: true,
            duration: dM.layerScale,
        },
        "descTextEnd"
    );
    const templateHeight = { height: "0px" };
    const scaleAnimate = gsap.fromTo(
        templateHeight,
        {
            height() {
                scaleRota = $zeroArea.width() / $zeroArea.height();

                const currentHeight = $scaleDom.height();
                $scaleDom.css("height", "");
                originHeight = $scaleDom.height();
                $scaleDom.css("height", currentHeight);

                return originHeight;
            },
        },
        {
            duration: dM.layerScale,
            ease: "test-es-1",
            height: () => window.outerHeight - window.navDistance,
            onUpdate() {
                if (
                    (this.progress() == 1 || this.progress() == 0) &&
                    parseFloat(templateHeight.height) == originHeight
                ) {
                    return;
                }
                $(".console").text(templateHeight.height);
                gsap.set($scaleDom[0], {
                    height: templateHeight.height,
                    width: parseFloat(templateHeight.height) * scaleRota,
                });
            },
        }
    );
    scrollAnimate.add(scaleAnimate, "<+=0");
    scrollAnimate.addLabel("layerScaleEnd", ">");
    scrollAnimate.addLabel("wrapperFirstAreaScaleStart").fromTo(
        $module.find(".wrapper-first_area"),
        {
            scale: 0.4,
        },
        {
            scale: 1,
            ease: "power1.inOut",
            duration: dM.layerScale + 0.4,
        },
        "<"
    );
    scrollAnimate.addLabel("wrapperFirstAreaStart").to(
        $module.find(".wrapper-first_area"),
        {
            opacity: 1,
            duration: dM.wrapperFirstArea,
        },
        "descTextEnd+=0.1"
    );
    scrollAnimate.addLabel("layerBgStart").to(
        $module.find(".layer--bg"),
        {
            opacity: 1,
            duration: dM.wrapperFirstArea,
        },
        "<"
    );
}
export default function showModuleScroll(): void {
    firstScroll();
    secScroll();
}
