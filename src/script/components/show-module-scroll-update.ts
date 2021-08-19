/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Description: 企业展示模块的滚动效果
 * @Author: F-Stone
 * @Date: 2021-08-11 15:59:06
 * @LastEditTime: 2021-08-11 15:59:07
 * @LastEditors: F-Stone
 */
type TYPE_SCROLL_UPDATE = ScrollTrigger.Callback;

import { gsap } from "gsap";
import { ScrollTrigger as scrollTrigger } from "@/lib/gsap-member/esm/ScrollTrigger";
let siteVsScroll;

interface TYPE_ANIMATE_PARAM_PRO {
    target: JQuery<HTMLElement>;
    param: { [param: string]: string | number };
}
// function introItemScroll() {
//     const $module = $(".module-show");

//     $module.find(".wrapper-sec-area .intro-item").each((i, dom) => {
//         const scrollParam: ScrollTrigger.Vars = {
//             trigger: dom,
//             start: "center center",
//             onUpdate({ progress }) {
//                 console.log("progress:", progress);
//             },
//         };
//         scrollTrigger.create(scrollParam);
//     });
// }
export default function secScroll(vsScroll: unknown): void {
    const $module = $(".module-show");
    const animate = gsap.timeline({
        defaults: {
            ease: "none",
        },
        scrollTrigger: {
            trigger: $module.find("#show-placeholder-2"),
            scrub: 1,
            start: "top bottom",
            end: "bottom bottom",
            pinSpacing: false,
            pin: $module.find(".wrapper-module_content"),
        },
    });
    const infoItem = $(
        ".module-show .module-body .item-intro:not(.intro-phone)"
    );
    animate.to(infoItem, {
        z: (index) => {
            if (index >= 2 && index <= 5) {
                return -400;
            } else {
                return -600;
            }
        },
        opacity: 0,
        stagger: {
            grid: [4, 2],
            from: "edges",
            ease: "better-elastic",
            amount: 0.1,
        },
    });
    const bg = $(".module-show .wrapper-sec-area .state-pos_right");
    animate.to(bg, {
        width: "50%",
    });
    const phoneInfoItem = $(".module-show .module-body .intro-phone");
    animate.fromTo(
        phoneInfoItem,
        {
            z: "150px",
        },
        {
            z: 0,
            ease: "better-elastic",
        },
        "<"
    );
    let oldIndex = -1;
    const phoneWrapper = $(
        ".module-show .wrapper-main_phone_imgs, .module-show .main-phone-2"
    );
    const doms = $(".module-show .slider-item");
    function setSection(currentIndex) {
        const dir = animate.scrollTrigger.direction;
        if (dir == 1) {
            if (currentIndex <= oldIndex) return;
        } else {
            if (currentIndex >= oldIndex) return;
        }
        switch (currentIndex) {
            case 0:
                if (dir == -1) {
                    gsap.to(phoneWrapper, {
                        overwrite: "auto",
                        duration: 0.8,
                        ease: "better-elastic",
                        x: "0%",
                    });
                }
                break;
            case 1:
                gsap.to(phoneWrapper, {
                    overwrite: "auto",
                    duration: 0.8,
                    ease: "better-elastic",
                    x: "-100%",
                });
                if (dir == 1) {
                    //
                }
                break;
            case 2:
                if (dir == 1) {
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
        gsap.set(doms.eq(currentIndex), {
            zIndex: 10,
        });
        gsap.to(doms.eq(currentIndex), {
            overwrite: "auto",
            duration: 0.5,
            autoAlpha: 1,
        });
        oldIndex = currentIndex;
    }
    $module.find(".wrapper-sec-area .intro-item").each((i, dom) => {
        animate.addLabel("introItemStart" + i);
        switch (i) {
            case 0:
                animate.to(dom, {
                    duration: 1,
                    y: 0,
                    onUpdate() {
                        const progress = this.progress();
                        gsap.set(dom, {
                            opacity: gsap.utils.normalize(0, 0.5, progress),
                        });
                    },
                    onComplete() {
                        setSection(i);
                    },
                });
                animate.to(dom, {
                    duration: 1,
                    y: "-50%",
                    onUpdate() {
                        const progress = this.progress();

                        gsap.set(dom, {
                            opacity: gsap.utils.normalize(0, 0.5, 1 - progress),
                        });
                        if (progress >= 0.9) {
                            setSection(i);
                        }
                    },
                });
                break;
            case 1:
                animate.to(dom, {
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
                animate.to(dom, {
                    duration: 1,
                    y: "-50%",
                    onUpdate() {
                        const progress = this.progress();
                        gsap.set(dom, {
                            opacity: gsap.utils.normalize(0, 0.5, 1 - progress),
                        });
                        gsap.set($("#web-site-body"), {
                            y: -300 * progress,
                        });
                        gsap.set($("#mweb-site-body"), {
                            y: -400 * progress,
                        });
                        if (progress >= 0.9) {
                            setSection(i);
                        }
                    },
                });
                break;

            case 2:
                animate.to(dom, {
                    duration: 1,
                    y: 0,
                    onUpdate() {
                        gsap.set(dom, {
                            opacity: gsap.utils.normalize(
                                0,
                                0.5,
                                this.progress()
                            ),
                            onComplete() {
                                setSection(i);
                            },
                        });
                    },
                });
                break;

            default:
                break;
        }
        animate.addLabel("introItemEnd" + i);
    });

    const uemoWeb = $(".module-show .wrapper-sec-area .uemo-web");
    animate.to(
        uemoWeb,
        {
            y: "0",
            opacity: 1,
        },
        "introItemStart0"
    );
}
