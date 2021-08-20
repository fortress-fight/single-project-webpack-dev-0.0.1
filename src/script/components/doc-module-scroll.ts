/*
 * @Description: 营销文档
 * @Author: F-Stone
 * @Date: 2021-08-16 13:21:47
 * @LastEditTime: 2021-08-16 13:21:48
 * @LastEditors: F-Stone
 */
import { gsap } from "gsap";

const mainPhoneAnimateParam = {
    0: {
        introImg: {
            scale: 1,
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
        group: { x: 0 },
        docShow4: { y: 20, opacity: 0 },
    },
    1: {
        introImg: {
            scale: 0.92,
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
        group: { x: 0 },
        docShow4: { y: 20, opacity: 0 },
    },
    2: {
        introImg: {
            scale: 1,
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
        group: { x: 0 },
        docShow4: { y: 20, opacity: 0 },
    },
    3: {
        introImg: {
            scale: 1,
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
        group: { x: "-100%" },
        docShow4: { y: 0, opacity: 1 },
    },
};
function forwardAnimate(animate, currentParam) {
    animate.to(".module-doc .intro-img", {
        ...currentParam.introImg,
    });
    animate.to(
        ".module-doc .main-phone-lock",
        {
            ...currentParam.mainPhoneLock,
        },
        0
    );
    animate.to(
        ".module-doc .layer-cover",
        {
            ...currentParam.layerCover,
        },
        0
    );
    animate.to(".module-doc .layer-cover img", {
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
    animate.to(".module-doc .layer-cover img", {
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
}

function parallax() {
    gsap.timeline({
        scrollTrigger: {
            trigger: "#placeholder-doc_scroll",
            scrub: true,
            start: "bottom bottom",
            end: "bottom top",
        },
    }).to(".module-doc .module-body", {
        ease: "none",
        y: "20vh",
    });
}
export default function initDocModuleScroll(): void {
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
    const scrollAnimate = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
            trigger: ".module-doc .wrapper-limit_width",
            scrub: true,
            start: "top top+=20vh",
            end: "bottom bottom",
            endTrigger: "#placeholder-doc_scroll",
            pinSpacing: false,
            pin: true,
        },
    });
    scrollAnimate.to($scaleDom, {
        duration: 4,
        scale: 1,
        x: 0,
        y: 0,
    });
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
        if (dir == 1) {
            forwardAnimate(phoneAnimate, currentParam);
        } else {
            backAnimate(phoneAnimate, currentParam);
        }
        phoneAnimate.play();
        oldIndex = currentIndex;
    }
    $module.find(".module-body .item-intro").each((i, dom) => {
        const distance = "50%";
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
    parallax();
}
