/*
 * @Description: 企业展示模块的滚动效果
 * @Author: F-Stone
 * @Date: 2021-08-11 15:59:06
 * @LastEditTime: 2021-08-11 15:59:07
 * @LastEditors: F-Stone
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function getMoveInAnim(scrollAnim) {
    const dom = $(".module-show .module-body .group-col");
    ScrollTrigger.saveStyles(dom);
    const animate = gsap.timeline();
    animate.to(dom.not(dom.eq(2)), {
        z: (index) => {
            if (index >= 1 && index <= 2) {
                return -1600;
            } else {
                return -2500;
            }
        },
        overwrite: "auto",
        duration: 1,
        ease: "test-es",
        stagger: {
            from: "edges",
        },
    });
    animate.to(dom.not(dom.eq(2)), { opacity: 0, immediateRender: false });
    scrollAnim.add(animate);
}
function getBgShowAnim(scrollAnim) {
    const bg = $(".module-show .wrapper-sec-area .state-pos_right");
    ScrollTrigger.saveStyles(bg);
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
    const phoneInfoItem = $(".module-show .module-body .intro-phone");
    ScrollTrigger.saveStyles(phoneInfoItem);
    animate.to(
        phoneInfoItem,
        {
            z: 0,
            ease: "better-elastic",
        },
        "<"
    );
    scrollAnim.add(animate);
}
function getMiddleBgShowAnim(scrollAnim) {
    const animate = gsap.timeline({
        defaults: {
            ease: "none",
            overwrite: "auto",
        },
    });
    const phoneInfoItem = $(".module-show .module-body .intro-phone");
    ScrollTrigger.saveStyles(phoneInfoItem);
    const wrapperFirstArea = $(".module-show .module-body .wrapper-first_area");
    ScrollTrigger.saveStyles(wrapperFirstArea);
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
function getWebScrollAnim() {
    const webScrollAnimate = gsap.timeline({
        paused: true,
        defaults: { ease: "none" },
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
function setInfoAnim(scrollAnim) {
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
        ScrollTrigger.saveStyles(dom);
        scrollAnim.addLabel("introItemStart" + i);
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
                    y: "-50%",
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
                    y: "-50%",
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
    ScrollTrigger.saveStyles(uemoWeb);
    scrollAnim.to(
        uemoWeb,
        {
            opacity: 1,
        },
        "introItemStart0"
    );
}
function bigScreen() {
    const $module = $(".module-show");
    const animate = gsap.timeline({
        defaults: {
            ease: "none",
            overwrite: "auto",
        },
        scrollTrigger: {
            trigger: $module.find("#show-placeholder-2"),
            scrub: 1,
            start: "top bottom",
            end: "bottom bottom",
            pinSpacing: false,
            pin: $module.find(".wrapper-module_content"),
            invalidateOnRefresh: true,
        },
    });
    animate.to({}, { duration: 0.6 });
    getMoveInAnim(animate);
    getBgShowAnim(animate);
    setInfoAnim(animate);
    animate.to({}, { duration: 0.3 });
}
function smallScreen() {
    const $module = $(".module-show");
    const animate = gsap.timeline({
        defaults: {
            ease: "none",
            overwrite: "auto",
        },
        scrollTrigger: {
            trigger: $module.find("#show-placeholder-2"),
            scrub: 1,
            start: "top bottom",
            end: "bottom bottom",
            pinSpacing: false,
            pin: $module.find(".wrapper-module_content"),
            invalidateOnRefresh: true,
        },
    });
    animate.to({}, { duration: 0.6 });
    getMoveInAnim(animate);
    getMiddleBgShowAnim(animate);
    setInfoAnim(animate);
    animate.to({}, { duration: 0.3 });
}
export default function secScroll(): void {
    ScrollTrigger.matchMedia({
        "(min-width: 1069px)": bigScreen,
        "(max-width: 1068px)": smallScreen,
    });
}
