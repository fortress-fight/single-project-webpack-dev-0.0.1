/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Description: 展示模块的滚动效果
 * @Author: F-Stone
 * @Date: 2021-08-18 13:20:28
 * @LastEditTime: 2021-08-18 13:20:29
 * @LastEditors: F-Stone
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function getMoveInAnim(scrollAnim) {
    const dom = $(".module-show .module-body .group-col");
    const animate = gsap.timeline({
        defaults: {
            overwrite: "auto",
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
    const phoneInfoItem = $(".module-show .module-body .intro-phone");
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

    scrollAnim.add(animate);
}
function getBgShowAnim(scrollAnim) {
    const bg = $(".module-show .wrapper-sec-area .state-pos_right");
    const animate = gsap.timeline({
        defaults: {
            ease: "none",
            overwrite: "auto",
        },
    });
    animate.to(bg, {
        width: "50%",
        ease: "better-elastic",
    });
    scrollAnim.add(animate);
}
function setInfoAnim(scrollAnim, distance = "50%") {
    const $module = $(".module-show");
    let oldIndex = -1;
    const phoneWrapper = $(
        ".module-show .wrapper-main_phone_imgs, .module-show .main-phone-2"
    );
    const doms = $(".module-show .slider-item");
    function setSection(currentIndex) {
        const dir = scrollAnim.scrollTrigger.direction;
        if (dir == 1) {
            if (currentIndex <= oldIndex) return;
        } else {
            if (currentIndex >= oldIndex) return;
        }
        switch (currentIndex) {
            case 0:
                if (dir == -1) {
                    gsap.to(".module-show .main-phone-back-card", {
                        overwrite: true,
                        x: "200%",
                        duration: 0.8,
                        ease: "better-elastic",
                    });
                    gsap.to(phoneWrapper, {
                        overwrite: "auto",
                        duration: 0.8,
                        ease: "better-elastic",
                        x: "0%",
                    });
                }
                break;
            case 1:
                {
                    gsap.to(".module-show .main-phone-back-card", {
                        overwrite: true,
                        x: "0",
                        duration: 0.8,
                        ease: "better-elastic",
                    });
                    gsap.to(phoneWrapper, {
                        overwrite: "auto",
                        duration: 0.8,
                        ease: "better-elastic",
                        x: "-100%",
                    });
                }
                break;
            case 2:
                if (dir == 1) {
                    gsap.to(".module-show .main-phone-back-card", {
                        overwrite: true,
                        x: "200%",
                        duration: 0.8,
                        ease: "better-elastic",
                    });
                    gsap.to(phoneWrapper, {
                        overwrite: "auto",
                        duration: 0.8,
                        ease: "better-elastic",
                        x: "0%",
                    });
                }
                break;

            default:
                break;
        }
        if (oldIndex != -1) {
            gsap.set(doms.eq(oldIndex), {
                zIndex: 0,
            });
            gsap.to(doms.eq(oldIndex), {
                overwrite: "auto",
                duration: 0.5,
                autoAlpha: 0,
            });
        }
        gsap.set(doms.eq(currentIndex), {
            zIndex: 10,
        });
        gsap.to(doms.eq(currentIndex), {
            overwrite: "auto",
            duration: 0.5,
            autoAlpha: 1,
        });
        oldIndex = currentIndex;
    }
    const webScrollAnimate = getWebScrollAnim();
    $module.find(".wrapper-sec-area .intro-item").each((i, dom) => {
        scrollAnim.addLabel("introItemStart" + i);
        gsap.set(dom, { y: distance });
        switch (i) {
            case 0:
                scrollAnim.to(dom, {
                    duration: 1,
                    y: 0,
                    zIndex: 10,
                    onComplete() {
                        setSection(i);
                    },
                });
                scrollAnim.to(
                    dom,
                    {
                        opacity: 1,
                        ease: "none",
                        duration: 0.5,
                    },
                    "<"
                );
                scrollAnim.to(dom, {
                    duration: 1,
                    y: "-" + distance,
                    zIndex: 0,
                });
                scrollAnim.to(
                    dom,
                    {
                        opacity: 0,
                        ease: "none",
                        duration: 0.5,
                    },
                    "-=0.5"
                );
                break;
            case 1:
                scrollAnim.to(dom, {
                    duration: 1,
                    y: 0,
                    zIndex: 10,
                    onStart() {
                        setSection(i);
                    },
                    onReverseComplete() {
                        setSection(i - 1);
                    },
                });
                scrollAnim.to(
                    dom,
                    {
                        opacity: 1,
                        ease: "none",
                        duration: 0.5,
                    },
                    "<"
                );
                scrollAnim.to(dom, {
                    duration: 1,
                    y: "-" + distance,
                    zIndex: 0,
                    onUpdate() {
                        const progress = this.progress();
                        webScrollAnimate.progress(progress);
                    },
                });
                scrollAnim.to(
                    dom,
                    {
                        opacity: 0,
                        ease: "none",
                        duration: 0.5,
                    },
                    "-=0.5"
                );
                break;

            case 2:
                scrollAnim.to(dom, {
                    duration: 1,
                    y: 0,
                    zIndex: 10,
                    onStart() {
                        setSection(i);
                    },
                    onReverseComplete() {
                        setSection(i - 1);
                    },
                });
                scrollAnim.to(
                    dom,
                    {
                        opacity: 1,
                        ease: "none",
                        duration: 0.5,
                    },
                    "<"
                );
                break;

            default:
                break;
        }
        scrollAnim.addLabel("introItemEnd" + i);
    });

    const uemoWeb = $(
        ".module-show .wrapper-sec-area .uemo-web, .module-show .box-left_arrow"
    );
    scrollAnim.to(
        uemoWeb,
        {
            opacity: 1,
        },
        "introItemStart0"
    );
}
function getWebScrollAnim() {
    const webScrollAnimate = gsap.timeline({
        paused: true,
        defaults: { overwrite: "auto", ease: "none" },
    });
    webScrollAnimate.to($("#web-site-body"), { y: -100 });
    webScrollAnimate.to($("#mweb-site-body"), { y: -80 }, 0);
    webScrollAnimate.to($(".main-phone-back-card"), {
        duration: 0.3,
        scale: 0.8,
    });
    webScrollAnimate.to($(".main-phone-back-card"), {
        duration: 0.3,
        scale: 1,
    });
    webScrollAnimate.to(
        $(".main-phone-back-card .btn-shadow"),
        {
            duration: 0.4,
            opacity: 0,
            scale: 1.8,
        },
        "<"
    );
    return webScrollAnimate;
}
function getMiddleBgShowAnim(scrollAnim) {
    const animate = gsap.timeline({
        defaults: {
            ease: "none",
            overwrite: "auto",
        },
    });
    const phoneInfoItem = $(".module-show .module-body .intro-phone");
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
    scrollAnim.add(animate);
}
function getPhoneBgShowAnim(scrollAnim) {
    const animate = gsap.timeline({
        defaults: {
            ease: "none",
            overwrite: "auto",
        },
    });
    const phoneInfoItem = $(".module-show .module-body .intro-phone");
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
        duration: 1,
        width: "28vw",
        ease: "better-elastic",
        yoyo: true,
    });
    scrollAnim.add(animate);
}
function showNavAnim() {
    const $module = $(".module-show");
    const navAnim = gsap.timeline({
        defaults: {
            ease: "none",
            overwrite: "auto",
        },
        scrollTrigger: {
            trigger: $module.find(".module-header"),
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
function scrollAnim(screenSize) {
    showNavAnim();
    const $module = $(".module-show");
    const $scaleDom = $module.find(".layer--scale");
    const scrollAnimate = gsap.timeline({
        defaults: {
            overwrite: "auto",
            ease: "none",
            force3D: true,
        },
        scrollTrigger: {
            trigger: $module.find(".module-body .wrapper-zero_area"),
            scrub: true,
            start: () => {
                return `center ${
                    (window.outerHeight - window.navDistance) / 2
                }`;
            },
            end: "bottom bottom+=10",
            endTrigger: "#show-placeholder",
            pinSpacing: false,
            pin: $module.find(".wrapper-module_content"),
            invalidateOnRefresh: true,
        },
    });
    function enterAnim() {
        const enterAnim = gsap.timeline({
            defaults: {
                overwrite: "auto",
                ease: "none",
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
        enterAnim.addLabel("start");
        enterAnim
            .addLabel("wrapperZeroAreaStart")
            .to($module.find(".wrapper-zero_area"), {
                opacity: 1,
                duration: dM.wrapperZeroArea,
            })
            .addLabel("wrapperZeroAreaEnd");
        enterAnim
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
        enterAnim
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
        enterAnim
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

        enterAnim.addLabel("layerScaleStart", "descTextEnd");
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
        const scaleAnimate = gsap.to($scaleDom, {
            ease: "test-es-1",
            duration: dM.layerScale,
            height: () => $(".module-show .target-box-size").height(),
            width: () => $(".module-show .target-box-size").width(),
        });
        enterAnim.add(scaleAnimate, "<+=0");
        enterAnim.addLabel("layerScaleEnd", ">");
        enterAnim.addLabel("wrapperFirstAreaScaleStart").fromTo(
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
        enterAnim.addLabel("wrapperFirstAreaStart").to(
            $module.find(".wrapper-first_area"),
            {
                opacity: 1,
                duration: dM.wrapperFirstArea,
            },
            "descTextEnd+=0.1"
        );
        enterAnim.addLabel("layerBgStart").to(
            $module.find(".layer--bg"),
            {
                opacity: 1,
                duration: dM.wrapperFirstArea,
            },
            "<"
        );
        return enterAnim;
    }
    scrollAnimate.add(enterAnim());
    if (screenSize == "big") {
        scrollAnimate.to({}, { duration: 0.6 });
        getMoveInAnim(scrollAnimate);
        getBgShowAnim(scrollAnimate);
        setInfoAnim(scrollAnimate);
        scrollAnimate.to({}, { duration: 0.6 });
    } else if (screenSize == "small") {
        scrollAnimate.to({}, { duration: 0.6 });
        getMoveInAnim(scrollAnimate);
        getMiddleBgShowAnim(scrollAnimate);
        setInfoAnim(scrollAnimate, "10%");
        scrollAnimate.to({}, { duration: 1 });
    } else if (screenSize == "phone") {
        scrollAnimate.to({}, { duration: 0.6 });
        getMoveInAnim(scrollAnimate);
        getPhoneBgShowAnim(scrollAnimate);
        setInfoAnim(scrollAnimate, "10%");
        scrollAnimate.to({}, { duration: 3 });
    }
}
export default function showModuleScroll(): void {
    const $module = $(".module-show");
    /* ---------------------------------- */
    /*             showNavAnim            */
    /* ---------------------------------- */
    ScrollTrigger.saveStyles($module.find(".wrapper-zero_area"));
    ScrollTrigger.saveStyles($module.find(".box-desc > *"));
    ScrollTrigger.saveStyles($module.find(".module-header"));
    /* ---------------------------------- */
    /*             scrollAnim             */
    /* ---------------------------------- */
    ScrollTrigger.saveStyles($module.find(".module-title, .module-subtitle"));
    ScrollTrigger.saveStyles($module.find(".box-desc"));
    ScrollTrigger.saveStyles($module.find(".layer--scale"));
    ScrollTrigger.saveStyles($module.find(".wrapper-first_area"));
    ScrollTrigger.saveStyles($module.find(".layer--bg"));
    /* ---------------------------------- */
    /*              sec-anime             */
    /* ---------------------------------- */
    ScrollTrigger.saveStyles($module.find(".module-body .group-col"));
    ScrollTrigger.saveStyles(
        $module.find(".wrapper-sec-area .state-pos_right")
    );
    ScrollTrigger.saveStyles($module.find(".module-body .intro-phone"));
    ScrollTrigger.saveStyles(
        $module.find(".wrapper-sec-area .uemo-web, .box-left_arrow")
    );
    ScrollTrigger.saveStyles($module.find(".wrapper-sec-area .intro-item"));
    ScrollTrigger.matchMedia({
        "(min-width: 1069px)": () => scrollAnim("big"),
        "(min-width: 735px) and (max-width: 1068px)": () => scrollAnim("small"),
        "(max-width: 734px)": () => scrollAnim("phone"),
    });
}
