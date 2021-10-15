/*
 * @Description: 宣传板块的执行函数
 * @Author: F-Stone
 * @Date: 2021-10-15 15:26:45
 * @LastEditTime: 2021-10-15 15:26:46
 * @LastEditors: F-Stone
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getScrollOrder } from "./scroll-trigger-manage";
function getLineEnter(): gsap.core.Timeline {
    const lineWrapper = $(".box-text_effect");
    const lineOne = $(".effect-line-1");
    const lineTwo = $(".effect-line-2");
    const animate = gsap.timeline({
        paused: true,
        defaults: { ease: "lineEffect" },
    });
    animate.fromTo(
        lineWrapper,
        {
            y: "50vh",
            rotateY: "70deg",
            opacity: 0,
        },
        {
            ease: "Power1.easeOut",
            y: 0,
            rotateY: 0,
            opacity: 1,
            duration: 0.5,
        }
    );
    animate.fromTo(
        lineOne,
        {
            opacity: 0,
        },
        {
            opacity: 1,
            duration: 1.5,
            ease: "Power1.easeOut",
        },
        "0"
    );
    animate.fromTo(
        lineOne,
        {
            y: "50vh",
            rotateY: "-70deg",
        },
        {
            y: 0,
            rotateY: 0,
            duration: 2,
        },
        "0"
    );
    animate.fromTo(
        lineTwo,
        {
            y: "50vh",
            rotateY: "-70deg",
        },
        {
            y: 0,
            rotateY: 0,
            duration: 2,
        },
        "0.1"
    );
    animate.fromTo(
        lineTwo,
        {
            opacity: 0,
        },
        {
            opacity: 1,
            duration: 1.5,
            ease: "Power1.easeOut",
        },
        "0.08"
    );
    return animate;
}
function getLineEnterEnd(): gsap.core.Timeline {
    const animate = gsap.timeline({
        defaults: {
            ease: "better-elastic",
            duration: 0.6,
        },
    });
    const modulePropaganda = $(".module-propaganda");
    const modulePropagandaTitle = $(".module-propaganda .title");
    const modulePropagandaServe = $(".module-propaganda .project-serve");
    animate.to(modulePropaganda.find(".module-body"), {
        y: "0",
    });
    const defaultTitleSize = modulePropagandaTitle.css("font-size");
    const startTitleSize = parseInt(defaultTitleSize) * 1.289;
    animate.fromTo(
        modulePropagandaTitle,
        {
            fontSize: startTitleSize,
            "letter-spacing": "-4px",
        },
        {
            fontSize: defaultTitleSize,
            "letter-spacing": "-0px",
            onComplete() {
                modulePropagandaTitle.css({
                    fontSize: "",
                    letterSpacing: "",
                });
            },
        },
        0
    );
    const defaultSubtitleSize = modulePropagandaServe.css("font-size");
    const startSubtitleSize = parseInt(defaultSubtitleSize) * (19 / 15);
    animate.fromTo(
        modulePropagandaServe,
        {
            fontSize: startSubtitleSize,
        },
        {
            fontSize: defaultSubtitleSize,
            onComplete() {
                modulePropagandaServe.css({
                    fontSize: "",
                    letterSpacing: "",
                });
            },
        },
        0
    );
    return animate;
}
function getMainPhoneEnter(): gsap.core.Timeline {
    const animate = gsap.timeline();
    const mainHand = $(".wrapper-propaganda_intro .inner-wrapper");
    animate.fromTo(
        mainHand,
        {
            y: "10vh",
            opacity: 0,
        },
        {
            y: "0vh",
            opacity: 1,
            ease: "Power2.easeOut",
        }
    );
    return animate;
}
export default function initPropaganda(): {
    init: () => void;
} {
    function enterAnim() {
        const animate = getLineEnter();

        animate.add(getLineEnterEnd(), ">");
        animate.add(getMainPhoneEnter(), "-=0.3");

        requestAnimationFrame(() => {
            gsap.to(".site-head", {
                opacity: 1,
                ease: "Power2.easeOut",
                delay: 0.4,
                duration: 0.4,
                stagger: 1,
                startAt: {
                    opacity: 0,
                },
                onStart() {
                    animate.play();
                },
            });
        });
    }
    function propagandaModuleScroll(): void {
        const textWrapper = $(".wrapper-propaganda_text");
        const IntroWrapper = $(".wrapper-propaganda_intro");
        const secHand = $(".wrapper-propaganda_intro .layer-hand-ahead");
        const scrollOrder = getScrollOrder();
        function bigSizeAdapt() {
            gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                    refreshPriority: scrollOrder,
                    trigger: ".module-propaganda",
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            })
                .to(
                    textWrapper,
                    {
                        y: () => (window.innerWidth >= 1068 ? "60vh" : "50vh"),
                        duration: 1,
                    },
                    0
                )
                .to(IntroWrapper, { y: "20vh", duration: 1 }, 0)
                .to(secHand, { x: "0", y: "0", duration: 0.5 }, 0);
        }
        ScrollTrigger.matchMedia({
            all: bigSizeAdapt,
        });
    }
    return {
        init: () => {
            enterAnim();
            propagandaModuleScroll();
        },
    };
}
