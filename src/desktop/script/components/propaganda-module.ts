/*
 * @Description:
 * @Author: F-Stone
 * @Date: 2021-08-11 16:13:52
 * @LastEditTime: 2021-08-11 16:13:53
 * @LastEditors: F-Stone
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function getLineEnter(): gsap.core.Timeline {
    const lineWrapper = $(".box-text_effect");
    const lineOne = $(".effect-line-1");
    const lineTwo = $(".effect-line-2");
    const animate = gsap.timeline({
        paused: true,
        defaults: {
            ease: "lineEffect",
        },
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
export function getLineEnterEnd(): gsap.core.Timeline {
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
export function propagandaModuleScroll(): void {
    const textWrapper = $(".wrapper-propaganda_text");
    const IntroWrapper = $(".wrapper-propaganda_intro");
    const secHand = $(".wrapper-propaganda_intro .layer-hand-ahead");

    ScrollTrigger.matchMedia({
        "(min-width: 735px)": function () {
            gsap.timeline({
                defaults: {
                    ease: "none",
                },
                scrollTrigger: {
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
                        y: () => {
                            return window.innerWidth >= 1068 ? "60vh" : "50vh";
                        },
                        duration: 1,
                    },
                    0
                )
                .to(IntroWrapper, { y: "20vh", duration: 1 }, 0)
                .to(secHand, { x: "0", y: "0", duration: 0.5 }, 0)
                .to(secHand, { x: "0", y: "0", duration: 0.5 }, ">");
        },
        "(max-width: 734px)": function () {
            gsap.timeline({
                defaults: {
                    ease: "none",
                },
                scrollTrigger: {
                    trigger: ".module-propaganda",
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            })
                .to(textWrapper, { y: "60vh", duration: 1 }, 0)
                .to(IntroWrapper, { y: "20vh", duration: 1 }, 0)
                .to(secHand, { x: "0", y: "0", duration: 0.5 }, 0)
                .to(secHand, { x: "0", y: "0", duration: 0.5 }, ">");
        },
    });
}
