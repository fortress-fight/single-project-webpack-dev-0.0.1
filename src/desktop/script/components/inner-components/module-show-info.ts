/*
 * @Description: 功能展示板块中文字分区
 * @Author: F-Stone
 * @Date: 2021-10-15 19:17:06
 * @LastEditTime: 2021-10-15 19:17:07
 * @LastEditors: F-Stone
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function getWebScrollAnim() {
    const webScrollAnimate = gsap.timeline({
        paused: true,
        defaults: { overwrite: "auto", ease: "none" },
    });
    webScrollAnimate.to($("#web-site-body"), { y: -100 });
    webScrollAnimate.to($("#mweb-site-body"), { y: -80 }, 0);
    const progress = { scale: 1 };
    webScrollAnimate.to(progress, {
        duration: 0.3,
        scale: 0.8,
        onUpdate() {
            gsap.set(".main-phone-back-card", {
                scale: progress.scale,
            });
        },
    });
    webScrollAnimate.to(progress, {
        duration: 0.3,
        scale: 1,
        onUpdate() {
            gsap.set(".main-phone-back-card", {
                scale: progress.scale,
            });
        },
    });
    webScrollAnimate.to(
        $(".main-phone-back-card .btn-shadow"),
        {
            duration: 0.4,
            opacity: 0,
            scale: 1.8,
        },
        "<"
    );
    return webScrollAnimate;
}

// info 的滚动切换行为
function changeContent(dir, index) {
    console.log("dir, index:", dir, index);
    const phoneWrapper = $(
        ".module-show .wrapper-main_phone_imgs, .module-show .main-phone-2"
    );
    switch (index) {
        case "0":
            if (dir == -1) {
                gsap.to(".module-show .main-phone-back-card", {
                    overwrite: true,
                    x: "200%",
                    duration: 0.8,
                    ease: "better-elastic",
                });
                gsap.to(phoneWrapper, {
                    overwrite: "auto",
                    duration: 0.8,
                    ease: "better-elastic",
                    x: "0%",
                });
            }
            break;
        case "1":
            {
                gsap.to(".module-show .main-phone-back-card", {
                    overwrite: true,
                    x: "0",
                    duration: 0.8,
                    ease: "better-elastic",
                });
                gsap.to(phoneWrapper, {
                    overwrite: "auto",
                    duration: 0.8,
                    ease: "better-elastic",
                    x: "-100%",
                });
            }
            break;
        case "2":
            if (dir == 1) {
                gsap.to(".module-show .main-phone-back-card", {
                    overwrite: true,
                    x: "200%",
                    duration: 0.8,
                    ease: "better-elastic",
                });
                gsap.to(phoneWrapper, {
                    overwrite: "auto",
                    duration: 0.8,
                    ease: "better-elastic",
                    x: "0%",
                });
            }
            break;

        default:
            break;
    }
}
const setSection = (() => {
    let oldIndex = -1;
    const doms = $(".module-show .slider-item");
    return (dir, index) => {
        if (dir == 1) {
            if (index <= oldIndex) return;
        } else {
            if (index >= oldIndex) return;
        }
        changeContent(dir, index);
        if (oldIndex != -1) {
            gsap.set(doms.eq(oldIndex), {
                zIndex: 0,
            });
            gsap.to(doms.eq(oldIndex), {
                overwrite: "auto",
                duration: 0.5,
                autoAlpha: 0,
            });
        }
        gsap.set(doms.eq(index), {
            zIndex: 10,
        });
        gsap.to(doms.eq(index), {
            overwrite: "auto",
            duration: 0.5,
            autoAlpha: 1,
        });
        oldIndex = index;
    };
})();

export default function genShowInfoCtrl(): {
    anim: (distance?: string) => gsap.core.Timeline;
    setSection: (dir: number, index: string) => void;
} {
    const $module = $(".module-show");
    const $items = $module.find(".wrapper-sec-area .intro-item");
    const uemoWeb = $(
        ".module-show .wrapper-sec-area .uemo-web, .module-show .box-left_arrow"
    );
    ScrollTrigger.saveStyles($items);
    ScrollTrigger.saveStyles(uemoWeb);
    const webScrollAnimate = getWebScrollAnim();
    return {
        anim(distance = "50%") {
            const scrollAnim = gsap.timeline({
                paused: true,
            });
            $items.each((i, dom) => {
                scrollAnim.addLabel(String(i));
                gsap.set(dom, { y: distance });
                switch (i) {
                    case 0:
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
                                duration: 0.5,
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
                                duration: 0.5,
                            },
                            "-=0.5"
                        );
                        break;
                    case 1:
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
                                duration: 0.5,
                            },
                            "<"
                        );
                        scrollAnim.to(dom, {
                            duration: 1,
                            y: "-" + distance,
                            zIndex: 0,
                            onUpdate() {
                                const progress = this.progress();
                                webScrollAnimate.progress(progress);
                            },
                        });
                        scrollAnim.to(
                            dom,
                            {
                                opacity: 0,
                                ease: "none",
                                duration: 0.5,
                            },
                            "-=0.5"
                        );
                        break;

                    case 2:
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
                                duration: 0.5,
                            },
                            "<"
                        );
                        break;

                    default:
                        break;
                }
            });

            scrollAnim.to(
                uemoWeb,
                {
                    opacity: 1,
                },
                "0"
            );
            return scrollAnim;
        },
        setSection,
    };
}
