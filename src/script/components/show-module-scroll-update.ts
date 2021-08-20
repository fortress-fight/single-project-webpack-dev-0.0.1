/*
 * @Description: 企业展示模块的滚动效果
 * @Author: F-Stone
 * @Date: 2021-08-11 15:59:06
 * @LastEditTime: 2021-08-11 15:59:07
 * @LastEditors: F-Stone
 */

import { gsap } from "gsap";

export default function secScroll(): void {
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
    animate.to({}, { duration: 0.6 });
    const infoItem = $(
        ".module-show .module-body .item-intro:not(.intro-phone)"
    );
    animate.to(infoItem, {
        z: (index) => {
            if (index >= 2 && index <= 5) {
                return -100;
            } else {
                return -160;
            }
        },
        // opacity: 0,
        stagger: {
            grid: [4, 2],
            from: "edges",
            ease: "none",
            amount: 0.1,
        },
    });
    animate.to(infoItem, {
        z: (index) => {
            if (index >= 2 && index <= 5) {
                return -5000;
            } else {
                return -8000;
            }
        },
        // opacity: 0,
        stagger: {
            grid: [4, 2],
            from: "edges",
            ease: "Power4.easeIn",
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
    const webScrollAnimate = gsap.timeline({
        paused: true,
        defaults: { ease: "none" },
    });
    webScrollAnimate.to($("#web-site-body"), { y: -100 });
    webScrollAnimate.to($("#mweb-site-body"), { y: -160 }, 0);
    webScrollAnimate.to($(".main-phone-back-card"), {
        duration: 0.3,
        scale: 0.8,
    });
    webScrollAnimate.to($(".main-phone-back-card"), {
        duration: 0.3,
        scale: 1,
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
    $module.find(".wrapper-sec-area .intro-item").each((i, dom) => {
        animate.addLabel("introItemStart" + i);
        switch (i) {
            case 0:
                animate.to(dom, {
                    duration: 1,
                    y: 0,
                    zIndex: 10,
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
                    zIndex: 0,
                    onUpdate() {
                        const progress = this.progress();

                        gsap.set(dom, {
                            opacity: gsap.utils.normalize(0, 0.5, 1 - progress),
                        });
                    },
                });
                break;
            case 1:
                animate.to(dom, {
                    duration: 1,
                    y: 0,
                    zIndex: 10,
                    onUpdate() {
                        const progress = this.progress();
                        gsap.set(dom, {
                            opacity: gsap.utils.normalize(0, 0.5, progress),
                        });
                    },
                    onStart() {
                        setSection(i);
                    },
                    onReverseComplete() {
                        setSection(i - 1);
                    },
                });
                animate.to(dom, {
                    duration: 1,
                    y: "-50%",
                    zIndex: 0,
                    onUpdate() {
                        const progress = this.progress();
                        gsap.set(dom, {
                            opacity: gsap.utils.normalize(0, 0.5, 1 - progress),
                        });
                        webScrollAnimate.progress(progress);
                    },
                });
                break;

            case 2:
                animate.to(dom, {
                    duration: 1,
                    y: 0,
                    zIndex: 10,
                    onUpdate() {
                        gsap.set(dom, {
                            opacity: gsap.utils.normalize(
                                0,
                                0.5,
                                this.progress()
                            ),
                        });
                    },
                    onStart() {
                        setSection(i);
                    },
                    onReverseComplete() {
                        setSection(i - 1);
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
    animate.to({}, { duration: 0.3 });
}
