/*
 * @Description: 营销文档
 * @Author: F-Stone
 * @Date: 2021-08-16 13:21:47
 * @LastEditTime: 2021-08-16 13:21:48
 * @LastEditors: F-Stone
 */
import { gsap } from "gsap";
// import { ScrollTrigger } from "@/lib/gsap-member/esm/ScrollTrigger";

export default function initDocModuleScroll(): void {
    gsap.timeline({
        scrollTrigger: {
            trigger: ".module-doc .wrapper-limit_width .module-doc_show",
            scrub: true,
            start: "top top+=20vh",
            end: "bottom bottom",
            pin: true,
        },
    });

    const itemInfo = $(".module-doc .item-intro");

    itemInfo.each((i, dom) => {
        const animate = gsap.timeline({
            // defaults: {
            //     ease: "Power2.easeOut",
            // },
            scrollTrigger: {
                start: "top 80%",
                end: "bottom 20%",
                trigger: dom,
                scrub: true,
                onUpdate({ progress, direction }) {
                    if (direction == -1) {
                        progress <= 0.5 && setSection(i, direction);
                    } else {
                        progress >= 0.5 && setSection(i, direction);
                    }
                },
            },
        });
        animate.from(dom, {
            opacity: () => {
                return i == 0 ? 1 : 0.1;
            },
        });
        animate.to(dom, {
            opacity: 1,
        });
        animate.to(dom, {
            opacity: () => {
                return i == itemInfo.length - 1 ? 1 : 0.6;
            },
        });
    });
    let oldIndex = -1;
    let animate = gsap.timeline({
        paused: true,
        defaults: {
            overwrite: "auto",
        },
    });
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
    function setSection(currentIndex, dir) {
        if (dir == 1) {
            if (currentIndex <= oldIndex) return;
        } else {
            if (currentIndex >= oldIndex) return;
        }
        animate.kill();
        animate.killTweensOf();
        animate = gsap.timeline({
            paused: true,
            defaults: {
                overwrite: true,
                ease: "better-elastic",
                duration: 0.36,
            },
        });
        const currentParam = mainPhoneAnimateParam[currentIndex];
        if (dir == 1) {
            forwardAnimate(animate, currentParam);
        } else {
            backAnimate(animate, currentParam);
        }
        animate.play();
        oldIndex = currentIndex;
    }
    gsap.timeline({
        scrollTrigger: {
            trigger: ".module-doc .wrapper-limit_width",
            scrub: true,
            start: "bottom bottom",
            end: "bottom top",
            // end: "+=100%",
            pinSpacing: false,
        },
    }).to(".module-doc .wrapper-limit_width", {
        ease: "none",
        y: "20vh",
    });
}
