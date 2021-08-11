/*
 * @Description:
 * @Author: F-Stone
 * @Date: 2021-08-11 16:13:52
 * @LastEditTime: 2021-08-11 16:13:53
 * @LastEditors: F-Stone
 */
import { gsap } from "gsap";

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
    animate.fromTo(
        modulePropaganda,
        {
            paddingTop: "28.462963vh",
        },
        {
            paddingTop: "25.462962962963vh",
        }
    );
    animate.fromTo(
        modulePropagandaTitle,
        {
            fontSize: "128px",
            "letter-spacing": "-4px",
        },
        {
            fontSize: "100px",
            "letter-spacing": "-0px",
        },
        0
    );
    animate.fromTo(
        modulePropagandaServe,
        {
            fontSize: "19px",
        },
        {
            fontSize: "15px",
        },
        0
    );
    return animate;
}
export function propagandaModuleScroll(): void {
    const textWrapper = $(".wrapper-propaganda_text");
    const IntroWrapper = $(".wrapper-propaganda_intro");

    gsap.timeline({
        scrollTrigger: {
            trigger: ".module-propaganda",
            start: "top top",
            scrub: true,
        },
    })
        .to(textWrapper, { y: "30vh", opacity: 0 }, 0)
        .to(IntroWrapper, { y: "20vh" }, 0);
}