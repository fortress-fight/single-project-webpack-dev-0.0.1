/*
 * @Description:
 * @Author: F-Stone
 * @Date: 2021-10-18 14:21:58
 * @LastEditTime: 2021-10-18 14:22:01
 * @LastEditors: F-Stone
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { getScrollOrder } from "./scroll-trigger-manage";

export default function initStatistic(): {
    init: () => void;
} {
    const $module = $(".module-statistic");
    const $itemInfo = $module.find(".item-info");
    const $bgCircle = $module.find(".bg-circle");
    const $introImg = $module.find(".list-intro_img");
    const $itemImgs = $module.find(".item-intro_img");
    const $wrapperLimitWidth = $module.find(".wrapper-limit_width");

    ScrollTrigger.saveStyles($itemInfo);
    ScrollTrigger.saveStyles($bgCircle);
    ScrollTrigger.saveStyles($itemImgs);
    ScrollTrigger.saveStyles($wrapperLimitWidth);
    ScrollTrigger.saveStyles($module.find(".box-bg"));
    ScrollTrigger.saveStyles(".module-statistic .state-pos_right");
    ScrollTrigger.saveStyles(".module-statistic .module-body");
    ScrollTrigger.saveStyles(".module-statistic .box-intro_img");

    let oldIndex = -1;
    function setSection(dir, index) {
        if (index == oldIndex) return;
        if (dir == 1) {
            if (index <= oldIndex) return;
        } else {
            if (index >= oldIndex) return;
        }
        if (oldIndex != -1) {
            gsap.set($itemImgs.eq(oldIndex), {
                zIndex: 0,
            });
            gsap.to($itemImgs.eq(oldIndex), {
                duration: 0.36,
                overwrite: true,
                autoAlpha: 0,
            });
        }
        gsap.set($itemImgs.eq(index), {
            zIndex: 10,
        });
        gsap.to($itemImgs.eq(index), {
            duration: 0.36,
            overwrite: true,
            autoAlpha: 1,
        });
        oldIndex = index;
    }

    return {
        init() {
            const mainScrollOrder = getScrollOrder();
            function setInfoAnime() {
                $itemInfo.each((i, dom) => {
                    const anime = gsap.timeline({
                        defaults: {
                            overwrite: true,
                            ease: "Power2.easeOut",
                        },
                        scrollTrigger: {
                            trigger: dom,
                            refreshPriority: mainScrollOrder,
                            start: "top 80%",
                            end: "bottom 20%",
                            scrub: true,
                            onUpdate({ progress, direction }) {
                                if (direction == -1) {
                                    progress <= 0.5 && setSection(direction, i);
                                } else {
                                    progress >= 0.5 && setSection(direction, i);
                                }
                            },
                        },
                    });
                    anime.from(dom, {
                        opacity: () => {
                            return i == 0 ? 1 : 0.2;
                        },
                    });
                    anime.to(dom, {
                        opacity: 1,
                    });
                    anime.to(dom, {
                        opacity: () => {
                            return i == $itemInfo.length - 1 ? 1 : 0.3;
                        },
                    });
                });
            }
            function setBgCircle() {
                gsap.timeline({
                    default: {
                        overwrite: true,
                        ease: "Power2.easeOut",
                    },
                    scrollTrigger: {
                        trigger: $module.find(".box-bg"),
                        refreshPriority: mainScrollOrder,
                        start: "center bottom",
                    },
                })
                    .fromTo(
                        $bgCircle,
                        { opacity: 0, scale: 0.4 },
                        { opacity: 1, scale: 1, stagger: 0.1 }
                    )
                    .fromTo(
                        $introImg,
                        { opacity: 0, scale: 0.6 },
                        { opacity: 1, scale: 1 }
                    );
            }
            function getSmallInfoAnime(distance = "15px") {
                const scrollAnim = gsap.timeline({
                    paused: true,
                    default: {
                        overwrite: true,
                        ease: "none",
                    },
                });
                gsap.set($itemInfo, { y: distance });
                $itemInfo.each((i, dom) => {
                    scrollAnim.addLabel(String(i));
                    if (i == $itemInfo.length - 1) {
                        scrollAnim.to(dom, {
                            duration: 1,
                            y: 0,
                            zIndex: 10,
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
                return scrollAnim;
            }
            function setSmallCircle() {
                gsap.timeline({
                    default: {
                        ease: "Power2.easeOut",
                        overwrite: true,
                    },
                    scrollTrigger: {
                        trigger: ".module-statistic .state-pos_right",
                        refreshPriority: mainScrollOrder,
                        start: "center center",
                    },
                })
                    .fromTo(
                        $bgCircle,
                        { opacity: 0, scale: 0.4 },
                        { opacity: 1, scale: 1, stagger: 0.1 }
                    )
                    .fromTo(
                        $introImg,
                        { opacity: 0, scale: 0.6 },
                        { opacity: 1, scale: 1 }
                    );
            }
            function bigAdapt() {
                oldIndex = -1;
                ScrollTrigger.create({
                    trigger: ".module-statistic .box-intro_img",
                    refreshPriority: mainScrollOrder,
                    scrub: true,
                    start: () => {
                        return `center ${
                            (window.outerHeight - window.navDistance) / 2
                        }`;
                    },
                    end: () => {
                        return (
                            "+=" +
                            ($module.find(".list-info").outerHeight() -
                                $(
                                    ".module-statistic .box-intro_img"
                                ).outerHeight() /
                                    2)
                        );
                    },
                    invalidateOnRefresh: true,
                    pin: true,
                });
                setInfoAnime();
                setBgCircle();
            }
            function smallAdapt() {
                oldIndex = -1;
                const smallInfoAnime = getSmallInfoAnime();
                const scrollAnim = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".module-statistic .state-pos_right",
                        refreshPriority: mainScrollOrder,
                        scrub: true,
                        start: () => {
                            return `center ${
                                (window.outerHeight - window.navDistance) / 2 -
                                30
                            }`;
                        },
                        end: "+=" + 2500,
                        pin: ".module-statistic .module-body",
                        invalidateOnRefresh: true,
                        onRefresh() {
                            setSection(
                                scrollAnim.scrollTrigger?.direction,
                                smallInfoAnime.currentLabel()
                            );
                        },
                    },
                });
                gsap.set($itemImgs.not($itemImgs.eq(0)), { opacity: 0 });
                scrollAnim.to($wrapperLimitWidth, { y: "-10vw" });

                smallInfoAnime.eventCallback("onUpdate", () => {
                    setSection(
                        scrollAnim.scrollTrigger?.direction,
                        smallInfoAnime.currentLabel()
                    );
                });
                scrollAnim.add(smallInfoAnime.play());

                scrollAnim.to({}, { duration: 0.5 });
                setSmallCircle();
            }
            ScrollTrigger.matchMedia({
                "(min-width: 735px)": bigAdapt,
                "(max-width: 734px)": smallAdapt,
            });
        },
    };
}
