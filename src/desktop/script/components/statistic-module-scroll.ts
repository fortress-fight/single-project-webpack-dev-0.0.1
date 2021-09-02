/*
 * @Description:
 * @Author: F-Stone
 * @Date: 2021-08-27 12:01:11
 * @LastEditTime: 2021-08-27 12:01:12
 * @LastEditors: F-Stone
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function normalScreen() {
    const $module = $(".module-statistic");
    const itemInfo = $(".module-statistic .item-info");
    ScrollTrigger.create({
        trigger: ".module-statistic .box-intro_img",
        scrub: true,
        start: () => {
            return `center ${(window.outerHeight - window.navDistance) / 2}`;
        },
        end: () => {
            return (
                "+=" +
                ($module.find(".list-info").outerHeight() -
                    $(".module-statistic .box-intro_img").outerHeight() / 2)
            );
        },
        invalidateOnRefresh: true,
        pin: true,
    });

    let oldIndex = -1;
    const doms = $(".module-statistic .item-intro_img");
    gsap.set(doms.not(doms.eq(0)), {
        opacity: 0,
    });
    function setSection(currentIndex, dir) {
        if (dir == 1) {
            if (currentIndex <= oldIndex) return;
        } else {
            if (currentIndex >= oldIndex) return;
        }
        if (oldIndex != -1) {
            gsap.set(doms.eq(oldIndex), {
                zIndex: 0,
            });
            gsap.to(doms.eq(oldIndex), {
                duration: 0.36,
                overwrite: "auto",
                autoAlpha: 0,
            });
        }
        gsap.set(doms.eq(currentIndex), {
            zIndex: 10,
        });
        gsap.to(doms.eq(currentIndex), {
            duration: 0.36,
            overwrite: "auto",
            autoAlpha: 1,
        });
        oldIndex = currentIndex;
    }
    itemInfo.each((i, dom) => {
        const animate = gsap.timeline({
            defaults: {
                ease: "Power2.easeOut",
            },
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
                return i == 0 ? 1 : 0.2;
            },
        });
        animate.to(dom, {
            opacity: 1,
        });
        animate.to(dom, {
            opacity: () => {
                return i == itemInfo.length - 1 ? 1 : 0.3;
            },
        });
    });
    gsap.fromTo(
        $module.find(".bg-circle"),
        {
            opacity: 0,
            scale: 0.4,
        },
        {
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            ease: "Power2.easeOut",
            scrollTrigger: {
                trigger: $module.find(".box-bg"),
                start: "center bottom",
            },
        }
    );
}
function phoneScreen() {
    const $module = $(".module-statistic");
    const itemInfo = $(".module-statistic .item-info");
    const scrollAnim = gsap.timeline({
        scrollTrigger: {
            trigger: ".module-statistic .state-pos_right",
            scrub: true,
            start: () => {
                return `center ${
                    (window.outerHeight - window.navDistance) / 2
                }`;
            },
            end: () =>
                "+=" +
                (window.outerHeight - window.navDistance) *
                    (itemInfo.length / 2),
            pin: ".module-statistic .module-body",
            invalidateOnRefresh: true,
        },
    });
    let oldIndex = -1;
    const doms = $(".module-statistic .item-intro_img");
    gsap.set(doms.not(doms.eq(0)), {
        opacity: 0,
    });
    scrollAnim.to(".module-statistic .wrapper-limit_width", {
        y: "-10vw",
    });
    function setSection(currentIndex) {
        const dir = scrollAnim.scrollTrigger.direction;
        if (dir == 1) {
            if (currentIndex <= oldIndex) return;
        } else {
            if (currentIndex >= oldIndex) return;
        }
        if (oldIndex != -1) {
            gsap.set(doms.eq(oldIndex), {
                zIndex: 0,
            });
            gsap.to(doms.eq(oldIndex), {
                duration: 0.36,
                overwrite: "auto",
                autoAlpha: 0,
            });
        }
        gsap.set(doms.eq(currentIndex), {
            zIndex: 10,
        });
        gsap.to(doms.eq(currentIndex), {
            duration: 0.36,
            overwrite: "auto",
            autoAlpha: 1,
        });
        oldIndex = currentIndex;
    }
    const distance = "10%";
    itemInfo.each((i, dom) => {
        gsap.set(dom, { y: distance });
        if (i == 0) {
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
                    duration: 0.8,
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
                    duration: 0.8,
                },
                "-=0.8"
            );
        } else if (i == itemInfo.length - 1) {
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
                    duration: 0.8,
                },
                "<"
            );
        } else {
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
                    duration: 0.8,
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
                    duration: 0.8,
                },
                "-=0.8"
            );
        }
    });
    scrollAnim.to({}, { duration: 2 });
    gsap.fromTo(
        $module.find(".bg-circle"),
        {
            opacity: 0,
            scale: 0.4,
        },
        {
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            ease: "Power2.easeOut",
            scrollTrigger: {
                trigger: ".module-statistic .state-pos_right",
                start: "center center",
            },
        }
    );
}
export default function statisticModuleScroll(): void {
    const itemInfo = $(".module-statistic .item-info");
    ScrollTrigger.saveStyles(itemInfo);
    ScrollTrigger.saveStyles(".module-statistic .wrapper-limit_width");
    ScrollTrigger.matchMedia({
        "(min-width: 735px)": normalScreen,
        "(max-width: 734px)": phoneScreen,
    });
}
