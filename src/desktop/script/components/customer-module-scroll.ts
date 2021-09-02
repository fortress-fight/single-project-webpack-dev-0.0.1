/*
 * @Description:
 * @Author: F-Stone
 * @Date: 2021-08-17 14:47:23
 * @LastEditTime: 2021-08-17 14:47:24
 * @LastEditors: F-Stone
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
function normalScreen() {
    gsap.set(".module-customer", {
        marginBottom: () => {
            return -$(".module-customer .module-body").innerHeight();
        },
    });
    $(".module-customer .module-item")
        .toArray()
        .forEach((item) => {
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
    const scrollAnimate = gsap.timeline({
        defaults: {
            ease: "none",
        },
        scrollTrigger: {
            trigger: ".module-customer .wrapper-limit_width .module-body",
            scrub: true,
            start: () => {
                return `center ${
                    (window.outerHeight - window.navDistance) / 2
                }`;
            },
            pin: true,
            end: () =>
                `+=${
                    $(".module-customer .module-list")[0].offsetWidth +
                    window.innerWidth * 0.3
                }`,
            onRefresh() {
                gsap.set(".module-customer", {
                    marginBottom: () => {
                        return -$(
                            ".module-customer .module-body"
                        ).innerHeight();
                    },
                });
            },
            onUpdate() {
                $(".module-customer .module-item")
                    .toArray()
                    .forEach((dom) => {
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
    scrollAnimate.fromTo(
        ".module-customer .module-list",
        { x: () => $(".module-customer .module-list").parent()[0].offsetWidth },
        {
            x: () => {
                return -Math.abs(
                    $(".module-customer .module-list")[0].offsetWidth -
                        $(".module-customer .module-list").parent()[0]
                            .offsetWidth
                );
            },
        }
    );
    scrollAnimate.to({}, { duration: 0.03 });
    $(".module-customer .module-item")
        .toArray()
        .forEach((dom) => {
            const size = dom.getBoundingClientRect();
            const maxWidth = window.innerWidth + size.width;
            const disPos = size.left + size.width;
            const percent = disPos / maxWidth;
            $(dom)
                .data("coverAnimate")
                .progress(gsap.utils.clamp(0, 1, percent));
        });
    return () => {
        $(".module-customer .module-item")
            .toArray()
            .forEach((dom) => {
                $(dom).data("coverAnimate").progress();
                $(dom).data("coverAnimate").kill();
            });

        gsap.set(".module-customer", {
            marginBottom: 0,
        });
    };
}
function smallScreen() {
    const $itemDoms = $(".module-customer .module-item");
    gsap.set($itemDoms, {
        zIndex: (index) => {
            return $itemDoms.length - index;
        },
    });
    const $itemInfo = $itemDoms.find(".item-info");
    const $newItemInfo = $("<div class='item-info-wrapper state-clone'></div>");
    $itemInfo.clone().appendTo($newItemInfo);
    $newItemInfo.appendTo(".module-customer .wrapper-module_list");

    const scrollAnimate = gsap.timeline({
        defaults: {
            ease: "none",
        },
        scrollTrigger: {
            trigger: ".module-customer .wrapper-limit_width .module-body",
            start: () => {
                return `center ${
                    (window.outerHeight - window.navDistance) / 2
                }`;
            },
            scrub: true,
            pin: true,
            end: () =>
                `+=${
                    $(".module-customer .module-list")[0].offsetWidth +
                    window.innerWidth
                }`,
            invalidateOnRefresh: true,
        },
    });
    const distance = "30%";
    $newItemInfo.find(".item-info").each((i, dom) => {
        gsap.set(dom, { y: distance });
        if (i == 0) {
            scrollAnimate.to(dom, { y: "-" + distance }, 0);
            scrollAnimate.to(
                dom,
                {
                    opacity: 0,
                    ease: "none",
                    duration: 0.3,
                },
                "-=0.3"
            );
        } else if (i == $newItemInfo.find(".item-info").length - 1) {
            scrollAnimate.to(dom, { y: 0 });
            scrollAnimate.to(
                dom,
                {
                    opacity: 1,
                    ease: "none",
                    duration: 0.3,
                },
                "<"
            );
        } else {
            scrollAnimate.to(dom, { y: 0 });
            scrollAnimate.to(
                dom,
                {
                    opacity: 1,
                    ease: "none",
                    duration: 0.3,
                },
                "<"
            );
            scrollAnimate.to(dom, {
                y: "-" + distance,
            });
            scrollAnimate.to(
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
    scrollAnimate.to(
        ".module-customer .module-list",
        {
            duration: scrollAnimate.totalDuration(),
            x: () => {
                return -Math.abs(
                    $(".module-customer .module-list")[0].offsetWidth -
                        $(".module-customer .module-list").parent()[0]
                            .offsetWidth
                );
            },
        },
        0
    );
    scrollAnimate.to({}, { duration: 1 });
    return () => {
        $newItemInfo.remove();
    };
}
export default function initCustomerModuleScroll(): void {
    ScrollTrigger.saveStyles(
        ".module-customer .wrapper-limit_width .module-body"
    );
    ScrollTrigger.saveStyles(".module-customer .wrapper-limit_width");
    ScrollTrigger.saveStyles(".module-customer .module-list");
    ScrollTrigger.matchMedia({
        "(min-width: 735px)": normalScreen,
        "(max-width: 734px)": smallScreen,
    });
}
