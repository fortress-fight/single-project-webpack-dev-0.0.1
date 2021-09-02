/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Description: 营销文档
 * @Author: F-Stone
 * @Date: 2021-08-16 13:21:47
 * @LastEditTime: 2021-08-16 13:21:48
 * @LastEditors: F-Stone
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const mainPhoneAnimateParam = {
    0: {
        leftAreaBg: {
            scale: 1,
        },
        introImg: {
            scale: 1,
            y: "0%",
            filter: "blur(0px)",
        },
        mainPhoneLock: {
            y: 40,
            opacity: 0,
        },
        layerCover: {
            backgroundColor: "rgb(0 0 0 / 0)",
        },
        docShow2: { y: "100%" },
        userOperBar: { y: 0, opacity: 1 },
        group: { x: 0 },
        docShow4: { y: 20, opacity: 0 },
    },
    1: {
        leftAreaBg: {
            scale: 1.1,
        },
        introImg: {
            scale: 0.85,
            y: "7%",
            filter: "blur(5px)",
        },
        mainPhoneLock: {
            y: 0,
            opacity: 1,
        },
        layerCover: {
            backgroundColor: "rgb(0 0 0 / 0)",
        },
        docShow2: { y: "100%" },
        userOperBar: { y: 0, opacity: 1 },
        group: { x: 0 },
        docShow4: { y: 20, opacity: 0 },
    },
    2: {
        leftAreaBg: {
            scale: 1,
        },
        introImg: {
            scale: 1,
            y: "0%",
            filter: "blur(0px)",
        },
        mainPhoneLock: {
            y: 40,
            opacity: 0,
        },
        layerCover: {
            backgroundColor: "rgba(0,0,0,0.20)",
        },
        docShow2: { y: "0%" },
        userOperBar: { y: "100%", opacity: 0 },
        group: { x: 0 },
        docShow4: { y: 20, opacity: 0 },
    },
    3: {
        leftAreaBg: {
            scale: 1,
        },
        introImg: {
            scale: 1,
            y: "0%",
            filter: "blur(0px)",
        },
        mainPhoneLock: {
            y: 40,
            opacity: 0,
        },
        layerCover: {
            backgroundColor: "rgb(0 0 0 / 0)",
        },
        docShow2: { y: "100%" },
        userOperBar: { y: 0, opacity: 1 },
        group: { x: "-100%" },
        docShow4: { y: 0, opacity: 1 },
    },
};
function forwardAnimate(animate, currentParam) {
    animate.to(
        ".module-doc .intro-img",
        {
            id: "introImg",
            ...currentParam.introImg,
        },
        0
    );
    animate.to(
        ".module-doc_show .left_area-bg",
        {
            id: "leftAreaBg",
            duration: 0.8,
            ...currentParam.leftAreaBg,
        },
        "-=0.45"
    );
    animate.to(
        ".module-doc .main-phone-lock",
        {
            ...currentParam.mainPhoneLock,
        },
        0
    );
    animate.to(
        ".module-doc .layer-cover .user-oper_bar",
        {
            ...currentParam.userOperBar,
            delay: 0.5,
        },
        0
    );
    animate.to(
        ".module-doc .layer-cover",
        {
            ...currentParam.layerCover,
        },
        "<"
    );
    animate.to(".module-doc .layer-cover .doc-show-2", {
        ...currentParam.docShow2,
    });
    animate.to(
        ".module-doc .group",
        {
            ...currentParam.group,
        },
        0
    );
    animate.to(
        ".module-doc .doc-show-4",
        {
            ...currentParam.docShow4,
            duration: 0.45,
        },
        "0.15"
    );
}
function backAnimate(animate, currentParam) {
    animate.to(".module-doc .doc-show-4", {
        ...currentParam.docShow4,
        duration: 0.45,
    });
    animate.to(
        ".module-doc .group",
        {
            ...currentParam.group,
        },
        "0.15"
    );
    animate.to(
        ".module-doc .layer-cover .user-oper_bar",
        {
            ...currentParam.userOperBar,
        },
        "<"
    );
    animate.to(".module-doc .layer-cover .doc-show-2", {
        ...currentParam.docShow2,
    });
    animate.to(
        ".module-doc .layer-cover",
        {
            ...currentParam.layerCover,
        },
        "<"
    );
    animate.to(
        ".module-doc .intro-img",
        {
            id: "introImg",
            ...currentParam.introImg,
        },
        "<"
    );
    animate.to(
        ".module-doc .main-phone-lock",
        {
            ...currentParam.mainPhoneLock,
        },
        "<"
    );
    animate.to(
        ".module-doc_show .left_area-bg",
        {
            id: "leftAreaBg",
            ...currentParam.leftAreaBg,
            duration: 0.8,
        },
        ">-=0.45"
    );
}

function parallax() {
    gsap.timeline({
        scrollTrigger: {
            trigger: "#placeholder-doc_scroll",
            scrub: true,
            start: "top bottom",
            invalidateOnRefresh: true,
            end: () => `+=${window.innerHeight}`,
        },
    }).to(".module-doc .module-body", {
        ease: "none",
        y: () => window.innerHeight * 0.3,
    });
}
function getDocCover() {
    const $module = $(".module-doc");
    const $scaleDom = $module.find(".intro-img");
    gsap.set($scaleDom, {
        transformOrigin: () => {
            const position = $scaleDom[0].getBoundingClientRect();
            const headPosition = $module
                .find(".main-phone_head")[0]
                .getBoundingClientRect();
            return `center ${headPosition.bottom - position.top}px`;
        },
        force3D: true,
        x: () => {
            const position = $scaleDom[0].getBoundingClientRect();
            return window.innerWidth / 2 - (position.left + position.width / 2);
        },
        y: () => {
            const modulePosition = $module[0].getBoundingClientRect();
            const headPosition = $module
                .find(".main-phone_head")[0]
                .getBoundingClientRect();
            return -(headPosition.bottom - modulePosition.top);
        },
        scale: () => {
            return window.innerWidth / $module.find(".main-phone").width();
        },
    });
}
function getInfoAnim(scrollAnimate, distance = "30%", type = "normal") {
    const $module = $(".module-doc");
    let oldIndex = -1;
    let phoneAnimate = gsap.timeline({
        paused: true,
        defaults: {
            overwrite: "auto",
        },
    });
    function setSection(currentIndex) {
        const dir = scrollAnimate.scrollTrigger.direction;
        if (dir == 1) {
            if (currentIndex <= oldIndex) return;
        } else {
            if (currentIndex >= oldIndex) return;
        }
        phoneAnimate.kill();
        phoneAnimate.killTweensOf();
        phoneAnimate = gsap.timeline({
            paused: true,
            defaults: {
                overwrite: true,
                ease: "better-elastic",
                duration: 0.36,
            },
        });
        const currentParam = mainPhoneAnimateParam[currentIndex];
        if (type == "smallScreen") {
            currentParam.leftAreaBg.scale = 1;
        }
        if (dir == 1) {
            forwardAnimate(phoneAnimate, currentParam);
        } else {
            backAnimate(phoneAnimate, currentParam);
        }
        phoneAnimate.play();
        oldIndex = currentIndex;
    }
    scrollAnimate.to({}, {}, ">-=1");
    $module.find(".module-body .item-intro").each((i, dom) => {
        gsap.set(dom, { y: distance });
        scrollAnimate.addLabel("itemIntroStart" + i);
        switch (i) {
            case 0:
                scrollAnimate.to(dom, {
                    duration: 1,
                    y: 0,
                    onUpdate() {
                        const progress = this.progress();
                        gsap.set(dom, {
                            opacity: gsap.utils.normalize(0, 0.5, progress),
                        });
                    },
                    onStart() {
                        setSection(i);
                    },
                    onReverseComplete() {
                        gsap.to(".module-doc .layer-cover .user-oper_bar", {
                            overwrite: "auto",
                            opacity: 0,
                            y: "100%",
                        });
                    },
                });
                scrollAnimate.to(dom, {
                    duration: 1,
                    y: "-" + distance,
                    onUpdate() {
                        const progress = this.progress();

                        gsap.set(dom, {
                            opacity: gsap.utils.normalize(0, 0.5, 1 - progress),
                        });
                    },
                });
                break;
            case 1:
            case 2:
                scrollAnimate.to(dom, {
                    duration: 1,
                    y: 0,
                    onUpdate() {
                        const progress = this.progress();
                        gsap.set(dom, {
                            opacity: gsap.utils.normalize(0, 0.5, progress),
                        });
                    },
                    onStart() {
                        setSection(i);
                    },
                    onReverseComplete() {
                        setSection(i - 1);
                    },
                });
                scrollAnimate.to(dom, {
                    duration: 1,
                    y: "-" + distance,
                    onUpdate() {
                        const progress = this.progress();
                        gsap.set(dom, {
                            opacity: gsap.utils.normalize(0, 0.5, 1 - progress),
                        });
                    },
                });
                break;

            case 3:
                scrollAnimate.to(dom, {
                    duration: 1,
                    y: 0,
                    onUpdate() {
                        gsap.set(dom, {
                            opacity: gsap.utils.normalize(
                                0,
                                0.5,
                                this.progress()
                            ),
                        });
                    },
                    onStart() {
                        setSection(i);
                    },
                    onReverseComplete() {
                        setSection(i - 1);
                    },
                });
                break;

            default:
                break;
        }
        scrollAnimate.addLabel("itemIntroEnd" + i);
    });
}
function getBeforeEnter(scrollAnimate) {
    const $module = $(".module-doc");
    const $scaleDom = $module.find(".intro-img");
    scrollAnimate.to($scaleDom, {
        overwrite: "auto",
        duration: 3,
        scale: 1,
        x: 0,
        y: 0,
        ease: "expo.inOut",
        onComplete() {
            gsap.to(".module-doc .layer-cover .user-oper_bar", {
                overwrite: "auto",
                opacity: 1,
                y: "0%",
            });
        },
        onReverseComplete() {
            gsap.killTweensOf($scaleDom);
        },
    });
    scrollAnimate.fromTo(
        $(".module-doc_show .left_area-bg"),
        { scale: 0.5 },
        {
            scale: 1,
            duration: 2,
            onReverseComplete() {
                gsap.killTweensOf($(".module-doc_show .left_area-bg"));
            },
        },
        "1.3"
    );

    scrollAnimate.fromTo(
        $(".module-doc .module-body > .state-pos_right"),
        { y: "100%" },
        { y: 0, duration: 2, ease: "none" },
        "<"
    );
}
function bigScreen() {
    getDocCover();
    const scrollAnimate = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
            trigger: ".module-doc .wrapper-limit_width",
            scrub: true,
            start: "top top",
            end: "+=5000",
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
        },
    });
    getBeforeEnter(scrollAnimate);
    getInfoAnim(scrollAnimate);
    scrollAnimate.to({}, { duration: 1 });
    parallax();
}
function smallScreen() {
    getDocCover();
    const scrollAnimate = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
            trigger: ".module-doc .wrapper-limit_width",
            scrub: true,
            start: "top top",
            end: "+=5000",
            pin: true,
            invalidateOnRefresh: true,
        },
    });
    getBeforeEnter(scrollAnimate);
    getInfoAnim(scrollAnimate, "10%", "smallScreen");
    scrollAnimate.to({}, { duration: 1 });
    parallax();
}
// function phoneScreen() {
//     //
// }
export default function initDocModuleScroll(): void {
    const $module = $(".module-doc");
    const $scaleDom = $module.find(".intro-img");
    ScrollTrigger.saveStyles($scaleDom);
    ScrollTrigger.saveStyles($module.find(".module-body .item-intro"));
    ScrollTrigger.saveStyles(".module-doc .module-body");
    ScrollTrigger.saveStyles($(".module-doc_show .left_area-bg"));
    ScrollTrigger.saveStyles($(".module-doc .module-body > .state-pos_right"));
    ScrollTrigger.matchMedia({
        "(min-width: 1069px)": bigScreen,
        "(min-width: 735px) and (max-width: 1068px)": smallScreen,
        "(max-width: 734px)": smallScreen,
    });
}
