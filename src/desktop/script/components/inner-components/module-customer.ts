/*
 * @Description:
 * @Author: F-Stone
 * @Date: 2021-10-18 15:19:18
 * @LastEditTime: 2021-10-18 15:19:19
 * @LastEditors: F-Stone
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { getScrollOrder } from "./scroll-trigger-manage";

export default function initCustomer(): {
    init: () => void;
} {
    const $section = $(".module-customer");
    const $moduleBody = $section.find(".wrapper-limit_width .module-body");
    const $list = $section.find(".module-list");
    const $items = $section.find(".module-item");
    const $itemInfo = $items.find(".item-info");
    const $wrapperModuleList = $section.find(".wrapper-module_list");

    ScrollTrigger.saveStyles($list);
    ScrollTrigger.saveStyles($items);
    ScrollTrigger.saveStyles($moduleBody);
    const beforeInit = function () {
        gsap.set($section, {
            marginBottom: () => {
                return -$moduleBody.innerHeight();
            },
        });
        $items.toArray().forEach((item) => {
            const coverAnimate = gsap.fromTo(
                $(item).find(".cover-img"),
                {
                    x: "-200%",
                },
                {
                    paused: true,
                    immediateRender: false,
                    ease: "power3",
                    x: 0,
                }
            );
            $(item).data("coverAnimate", coverAnimate);
        });
    };
    return {
        init() {
            const mainScrollOrder = getScrollOrder();
            function bigAdapt() {
                beforeInit();
                const scrollAnime = gsap.timeline({
                    defaults: { ease: "none" },
                    scrollTrigger: {
                        trigger: $moduleBody,
                        refreshPriority: mainScrollOrder,
                        scrub: true,
                        start: () => {
                            return `center ${
                                (window.outerHeight - window.navDistance) / 2
                            }`;
                        },
                        pin: true,
                        end: () =>
                            `+=${
                                $list[0].offsetWidth + window.innerWidth * 0.3
                            }`,
                        onRefresh() {
                            gsap.set(".module-customer", {
                                marginBottom: () => {
                                    return -$moduleBody.innerHeight();
                                },
                            });
                        },
                        onUpdate() {
                            $items.toArray().forEach((dom) => {
                                const size = dom.getBoundingClientRect();
                                const maxWidth = window.innerWidth + size.width;
                                const disPos = size.left + size.width;
                                const percent = disPos / maxWidth;
                                $(dom)
                                    .data("coverAnimate")
                                    .progress(gsap.utils.clamp(0, 1, percent));
                            });
                        },
                        invalidateOnRefresh: true,
                    },
                });
                scrollAnime.fromTo(
                    $list,
                    {
                        x: () => $list.parent()[0].offsetWidth,
                    },
                    {
                        x: () => {
                            return -Math.abs(
                                $list[0].offsetWidth -
                                    $list.parent()[0].offsetWidth
                            );
                        },
                    }
                );
                scrollAnime.to({}, { duration: 0.03 });
                $items.toArray().forEach((dom) => {
                    const size = dom.getBoundingClientRect();
                    const maxWidth = window.innerWidth + size.width;
                    const disPos = size.left + size.width;
                    const percent = disPos / maxWidth;
                    $(dom)
                        .data("coverAnimate")
                        .progress(gsap.utils.clamp(0, 1, percent));
                });

                return () => {
                    gsap.set($section, {
                        marginBottom: 0,
                    });

                    $items.toArray().forEach((dom) => {
                        $(dom).data("coverAnimate").progress();
                        $(dom).data("coverAnimate").kill();
                    });
                };
            }

            function smallAdapt() {
                gsap.set($items, {
                    zIndex: (index) => {
                        return $items.length - index;
                    },
                });
                const $newItemInfo = $(
                    "<div class='item-info-wrapper state-clone'></div>"
                );
                $itemInfo.clone().appendTo($newItemInfo);
                $newItemInfo.appendTo($wrapperModuleList);

                const scrollAnime = gsap.timeline({
                    defaults: {
                        ease: "none",
                    },
                    scrollTrigger: {
                        trigger: $moduleBody,
                        refreshPriority: mainScrollOrder,
                        start: () => {
                            return `center ${
                                (window.outerHeight - window.navDistance) / 2
                            }`;
                        },
                        scrub: true,
                        pin: true,
                        end: () => `+=${$items.length * 600}`,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });
                const distance = "15px";
                $newItemInfo.find(".item-info").each((i, dom) => {
                    gsap.set(dom, { y: distance });
                    if (i == 0) {
                        scrollAnime.to(dom, { y: "-" + distance }, 0);
                        scrollAnime.to(
                            dom,
                            {
                                opacity: 0,
                                ease: "none",
                                duration: 0.3,
                            },
                            "-=0.3"
                        );
                    } else if (
                        i ==
                        $newItemInfo.find(".item-info").length - 1
                    ) {
                        scrollAnime.to(dom, { y: 0 });
                        scrollAnime.to(
                            dom,
                            {
                                opacity: 1,
                                ease: "none",
                                duration: 0.3,
                            },
                            "<"
                        );
                    } else {
                        scrollAnime.to(dom, { y: 0 });
                        scrollAnime.to(
                            dom,
                            {
                                opacity: 1,
                                ease: "none",
                                duration: 0.3,
                            },
                            "<"
                        );
                        scrollAnime.to(dom, {
                            y: "-" + distance,
                        });
                        scrollAnime.to(
                            dom,
                            {
                                opacity: 0,
                                ease: "none",
                                duration: 0.3,
                            },
                            "-=0.3"
                        );
                    }
                });
                scrollAnime.to(
                    $list,
                    {
                        duration: scrollAnime.totalDuration(),
                        x: () => {
                            return -Math.abs(
                                $list[0].offsetWidth -
                                    $list.parent()[0].offsetWidth
                            );
                        },
                    },
                    0
                );
                scrollAnime.to({}, { duration: 0.5 });
                return () => {
                    $newItemInfo.remove();
                };
            }
            ScrollTrigger.matchMedia({
                "(min-width: 735px)": bigAdapt,
                "(max-width: 734px)": smallAdapt,
            });
        },
    };
}
