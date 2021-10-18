/*
 * @Description: 功能介绍板块
 * @Author: F-Stone
 * @Date: 2021-10-15 18:03:47
 * @LastEditTime: 2021-10-15 18:03:51
 * @LastEditors: F-Stone
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { getScrollOrder } from "./scroll-trigger-manage";
import genShowInfoCtrl from "./module-show-info";

function getEnterCtrl() {
    const $module = $(".module-show");

    // animate doms
    const $scaleDom = $module.find(".layer--scale");
    const $wrapperZeroArea = $module.find(".wrapper-zero_area");
    const $boxDescText = $module.find(".box-desc > *");
    const $moduleHeadText = $module.find(".module-title, .module-subtitle");
    const $boxDesc = $module.find(".box-desc");
    const $wrapperFirstArea = $module.find(".wrapper-first_area");
    const $layerBg = $module.find(".layer--bg");

    ScrollTrigger.saveStyles($wrapperZeroArea);
    ScrollTrigger.saveStyles($boxDescText);
    ScrollTrigger.saveStyles($moduleHeadText);
    ScrollTrigger.saveStyles($boxDesc);
    ScrollTrigger.saveStyles($scaleDom);
    ScrollTrigger.saveStyles($wrapperFirstArea);
    ScrollTrigger.saveStyles($layerBg);

    const dM = {
        wrapperZeroArea: 0.5,
        descText: 0.8,
        moduleHeadText: 1,
        desc: 0.3,
        layerScale: 1,
        wrapperFirstArea: 0.8,
        innerImg: 1,
    };
    return {
        getAnim: () => {
            const enterAnim = gsap.timeline({
                paused: true,
                defaults: {
                    overwrite: "auto",
                    ease: "none",
                },
            });
            enterAnim.to($wrapperZeroArea, {
                opacity: 1,
                duration: dM.wrapperZeroArea,
            });
            enterAnim.to(
                $boxDescText,
                {
                    opacity: 1,
                    duration: dM.descText,
                    stagger: dM.descText / 5,
                },
                "-=0.5"
            );
            enterAnim.addLabel("descTextEnd");

            enterAnim.to($moduleHeadText, {
                y: (index) => -(30 + 60 * index) + "%",
                ease: "Power3.easeOut",
                opacity: 0,
                stagger: 0.06,
                duration: dM.moduleHeadText,
            });
            enterAnim.to(
                $boxDesc,
                {
                    opacity: 0,
                    duration: dM.desc,
                },
                "descTextEnd"
            );

            enterAnim.fromTo(
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
            enterAnim.to(
                $scaleDom,
                {
                    ease: "test-es-1",
                    duration: dM.layerScale,
                    height: () => $(".module-show .target-box-size").height(),
                    width: () => $(".module-show .target-box-size").width(),
                },
                "descTextEnd"
            );
            enterAnim.to(
                $wrapperFirstArea,
                {
                    scale: 1,
                    ease: "power1.inOut",
                    duration: dM.layerScale + 0.4,
                },
                "descTextEnd"
            );
            enterAnim.to(
                $wrapperFirstArea,
                {
                    opacity: 1,
                    duration: dM.wrapperFirstArea,
                },
                "descTextEnd+=0.1"
            );
            enterAnim.to(
                $layerBg,
                {
                    opacity: 1,
                    duration: dM.wrapperFirstArea,
                },
                "descTextEnd+=0.1"
            );
            return enterAnim;
        },
    };
}
function getMoveInCtrl() {
    const dom = $(".module-show .module-body .group-col");
    const phoneInfoItem = $(".module-show .module-body .intro-phone");

    ScrollTrigger.saveStyles(dom);
    ScrollTrigger.saveStyles(phoneInfoItem);

    return {
        genAnim() {
            const animate = gsap.timeline({
                paused: true,
                defaults: {
                    overwrite: true,
                },
            });
            animate.to(dom.not(dom.eq(2)), {
                z: (index) => {
                    if (index >= 1 && index <= 2) {
                        return -1600;
                    } else {
                        return -2500;
                    }
                },
                force3D: true,
                duration: 1,
                ease: "test-es",
                stagger: {
                    from: "edges",
                },
            });
            animate.to(
                phoneInfoItem,
                {
                    z: 0,
                    force3D: true,
                    ease: "better-elastic",
                },
                "-=0.3"
            );
            animate.to(dom.not(dom.eq(2)), { opacity: 0 });
            return animate;
        },
    };
}
function getBgShowCtrl() {
    const bg = $(".module-show .wrapper-sec-area .state-pos_right");

    ScrollTrigger.saveStyles(bg);

    return {
        genAnim() {
            const animate = gsap.timeline({
                pause: true,
                defaults: {
                    ease: "none",
                    overwrite: true,
                },
            });
            animate.to(bg, {
                width: "50%",
                ease: "better-elastic",
            });
            return animate;
        },
    };
}

function getMiddleBgShowCtrl() {
    const phoneInfoItem = $(".module-show .module-body .intro-phone");
    ScrollTrigger.saveStyles(phoneInfoItem);
    return {
        genAnim() {
            const animate = gsap.timeline({
                paused: true,
                defaults: {
                    ease: "none",
                    overwrite: "auto",
                },
            });
            animate.to(phoneInfoItem, {
                z: 0,
                x: () => {
                    return (
                        $(
                            ".module-show .wrapper-sec-area .state-pos_left"
                        )[0].getBoundingClientRect().left -
                        phoneInfoItem.parent()[0].getBoundingClientRect().left
                    );
                },
                y: "-7vw",
                duration: 1,
                width: "23.14453125vw",
                ease: "better-elastic",
                yoyo: true,
            });
            return animate;
        },
    };
}

function getSmallBgShowCtrl() {
    const phoneInfoItem = $(".module-show .module-body .intro-phone");
    ScrollTrigger.saveStyles(phoneInfoItem);

    return {
        genAnim() {
            const animate = gsap.timeline({
                defaults: {
                    ease: "none",
                    overwrite: "auto",
                },
            });
            animate.to(phoneInfoItem, {
                z: 0,
                x: () => {
                    return (
                        $(
                            ".module-show .wrapper-sec-area .state-pos_left"
                        )[0].getBoundingClientRect().left -
                        phoneInfoItem.parent()[0].getBoundingClientRect().left
                    );
                },
                y: "5.5vw",
                duration: 0.8,
                width: "28vw",
                ease: "better-elastic",
                yoyo: true,
            });
            return animate;
        },
    };
}

export default function initShow(): { init: () => void } {
    const $module = $(".module-show");
    const defaultOrder = getScrollOrder();
    const scrollOrder = getScrollOrder();
    const enterCtrl = getEnterCtrl();
    const moveInCtrl = getMoveInCtrl();
    const bgShowCtrl = getBgShowCtrl();
    const showInfoCtrl = genShowInfoCtrl();
    const middleBgShowCtrl = getMiddleBgShowCtrl();
    const smallBgShowCtrl = getSmallBgShowCtrl();

    ScrollTrigger.saveStyles($module.find(".module-body .wrapper-zero_area"));
    ScrollTrigger.saveStyles($module.find(".module-header"));
    ScrollTrigger.saveStyles($module.find(".wrapper-module_content"));

    function genGsapAnim(onRefresh) {
        const scrollAnim = gsap.timeline({
            defaults: {
                overwrite: "auto",
                ease: "none",
                force3D: true,
            },
            scrollTrigger: {
                trigger: $module.find(".module-body .wrapper-zero_area"),
                refreshPriority: scrollOrder,
                scrub: true,
                start: () => {
                    return `center ${
                        (window.outerHeight - window.navDistance) / 2
                    }`;
                },
                end: "bottom bottom+=10",
                endTrigger: "#show-placeholder",
                pinSpacing: false,
                anticipatePin: 1,
                pin: $module.find(".wrapper-module_content"),
                invalidateOnRefresh: true,
                onRefresh,
            },
        });
        scrollAnim.add(enterCtrl.getAnim().play());
        return scrollAnim;
    }
    function allAdapt() {
        const navAnim = gsap.timeline({
            defaults: {
                ease: "none",
                overwrite: "auto",
            },
            scrollTrigger: {
                trigger: $module.find(".module-header"),
                refreshPriority: defaultOrder,
                scrub: true,
                end: "bottom bottom",
                endTrigger: $module.find(".module-body .wrapper-zero_area"),
                invalidateOnRefresh: true,
            },
        });
        navAnim.set($module.find(".wrapper-zero_area"), {
            opacity: 0,
        });
        navAnim.set($module.find(".box-desc > *"), {
            opacity: 0,
        });
        navAnim.fromTo(
            $module.find(".module-header"),
            { opacity: 0 },
            { opacity: 1 }
        );
    }

    function bigAdapt() {
        const showInfoAnim = showInfoCtrl.anim();
        const scrollAnim = genGsapAnim(() => {
            showInfoCtrl.setSection(
                scrollAnim.scrollTrigger?.direction,
                showInfoAnim.currentLabel()
            );
        });
        showInfoAnim.eventCallback("onUpdate", () => {
            showInfoCtrl.setSection(
                scrollAnim.scrollTrigger?.direction,
                showInfoAnim.currentLabel()
            );
        });
        scrollAnim.to({}, { duration: 0.6 });
        scrollAnim.add(moveInCtrl.genAnim().play());
        scrollAnim.add(bgShowCtrl.genAnim().play());
        scrollAnim.add(showInfoAnim.play());
        scrollAnim.to({}, { duration: 0.6 });
    }
    function middleAdapt() {
        const showInfoAnim = showInfoCtrl.anim("10%");
        const scrollAnim = genGsapAnim(() => {
            showInfoCtrl.setSection(
                scrollAnim.scrollTrigger?.direction,
                showInfoAnim.currentLabel()
            );
        });
        showInfoAnim.eventCallback("onUpdate", () => {
            showInfoCtrl.setSection(
                scrollAnim.scrollTrigger?.direction,
                showInfoAnim.currentLabel()
            );
        });
        scrollAnim.to({}, { duration: 0.6 });
        scrollAnim.add(moveInCtrl.genAnim().play());
        scrollAnim.add(middleBgShowCtrl.genAnim().play());
        scrollAnim.add(showInfoAnim.play());
        scrollAnim.to({}, { duration: 1 });
    }
    function smallAdapt() {
        const showInfoAnim = showInfoCtrl.anim("15px");
        const scrollAnim = genGsapAnim(() => {
            showInfoCtrl.setSection(
                scrollAnim.scrollTrigger?.direction,
                showInfoAnim.currentLabel()
            );
        });
        showInfoAnim.eventCallback("onUpdate", () => {
            showInfoCtrl.setSection(
                scrollAnim.scrollTrigger?.direction,
                showInfoAnim.currentLabel()
            );
        });
        scrollAnim.to({}, { duration: 0.6 });
        scrollAnim.add(moveInCtrl.genAnim().timeScale(2).play());
        scrollAnim.add(smallBgShowCtrl.genAnim().timeScale(2).play());
        scrollAnim.add(showInfoAnim.play());
        scrollAnim.to({}, { duration: 0.2 });
    }

    return {
        init() {
            ScrollTrigger.matchMedia({
                "(min-width: 1069px)": bigAdapt,
                "(min-width: 735px) and (max-width: 1068px)": middleAdapt,
                "(max-width: 734px)": smallAdapt,
                all: allAdapt,
            });
        },
    };
}
