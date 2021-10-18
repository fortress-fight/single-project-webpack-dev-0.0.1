/*
 * @Description: 文档介绍板块
 * @Author: F-Stone
 * @Date: 2021-10-15 18:02:06
 * @LastEditTime: 2021-10-15 18:02:07
 * @LastEditors: F-Stone
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { getScrollOrder } from "./scroll-trigger-manage";
// doc 中手机的切换行为
import tabPhoneAnim from "./module-doc-phone";

// 获取设置 doc 封面放大参数
function _getScaleParam() {
    const $module = $(".module-doc");
    const targetDom1 = $module.find(".placeholder-doc_preview");
    const targetDom2 = $module.find(".placeholder-doc_preview--row");
    const phoneWidth = $module.find(".main-phone").width();
    const scale1 = targetDom1.width() / phoneWidth;
    const scale2 = targetDom2.width() / phoneWidth;
    if (scale1 > scale2) {
        return {
            scale: scale1,
            select: targetDom1,
        };
    } else {
        return {
            scale: scale2,
            select: targetDom2,
        };
    }
}
// 设置 doc 封面的位置
function setDocCover() {
    const $module = $(".module-doc");
    const $scaleDom = $module.find(".intro-img");
    const $phoneHead = $module.find(".main-phone_head");
    gsap.set($scaleDom, {
        transformOrigin: "center center",
        scale: 1,
        x: 0,
        y: 0,
    });
    const scaleParam = _getScaleParam();
    gsap.set($scaleDom, {
        transformOrigin: () => {
            const position = $scaleDom[0].getBoundingClientRect();
            const headPosition = $phoneHead[0].getBoundingClientRect();
            return `center ${headPosition.bottom - position.top}px`;
        },
        force3D: true,
        scale: scaleParam.scale,
        x: () => {
            const position = $scaleDom[0].getBoundingClientRect();
            const select = scaleParam.select;
            const targetPos = select[0].getBoundingClientRect();
            return (
                targetPos.left +
                targetPos.width / 2 -
                (position.left + position.width / 2)
            );
        },
        y: () => {
            const modulePosition = $module[0].getBoundingClientRect();
            const headPosition = $phoneHead[0].getBoundingClientRect();
            return -(headPosition.bottom - modulePosition.top);
        },
    });
}
// 获取 doc 封面缩小的运动
function getBeforeEnterCtrl() {
    const $module = $(".module-doc");
    const $scaleDom = $module.find(".intro-img");
    const $leftAreaBg = $module.find(".module-doc_show .left_area-bg");
    const $statePosRight = $module.find(".module-body > .state-pos_right");
    ScrollTrigger.saveStyles($scaleDom);
    ScrollTrigger.saveStyles($leftAreaBg);
    ScrollTrigger.saveStyles($statePosRight);
    return {
        getAnim() {
            const scrollAnim = gsap.timeline({
                paused: true,
                defaults: {
                    overwrite: true,
                },
            });

            scrollAnim.to($scaleDom, {
                duration: 3,
                scale: 1,
                x: 0,
                y: 0,
                ease: "expo.inOut",
                onComplete() {
                    gsap.to(".module-doc .layer-cover .user-oper_bar", {
                        overwrite: "auto",
                        opacity: 1,
                        y: "0%",
                    });
                },
                // onReverseComplete() {
                //     gsap.killTweensOf($scaleDom);
                // },
            });
            scrollAnim.fromTo(
                $leftAreaBg,
                { scale: 0.5 },
                {
                    scale: 1,
                    duration: 2,
                    // onReverseComplete() {
                    //     gsap.killTweensOf($leftAreaBg);
                    // },
                },
                "1.3"
            );

            scrollAnim.fromTo(
                $statePosRight,
                { y: "100%" },
                { y: 0, duration: 2, ease: "none" },
                "<"
            );

            return scrollAnim;
        },
    };
}

/* ---------------------------------- */
/*       获取 doc 介绍的文字运动        */
/* ---------------------------------- */

// 内容的滚动切换行为
const setSection = (() => {
    let oldIndex = -1;
    return (dir, index, type?) => {
        if (index == oldIndex) return;
        if (dir == 1) {
            if (index <= oldIndex) return;
        } else {
            if (index >= oldIndex) return;
        }
        tabPhoneAnim(dir, index, type);
        oldIndex = index;
    };
})();

function getInfoCtrl() {
    const $module = $(".module-doc");
    const $moduleItemInfo = $module.find(".module-body .item-intro");
    ScrollTrigger.saveStyles($moduleItemInfo);
    return {
        getAnim(distance = "30%") {
            gsap.set($moduleItemInfo, { y: distance });
            const scrollAnim = gsap.timeline({
                paused: true,
                defaults: {
                    ease: "none",
                    overwrite: "auto",
                },
            });
            const duration = 1;
            $moduleItemInfo.each((i, dom) => {
                scrollAnim.addLabel(String(i));
                switch (i) {
                    case 0:
                    case 1:
                    case 2:
                        scrollAnim.to(dom, {
                            duration,
                            y: 0,
                            onReverseComplete() {
                                if (i == 0) {
                                    gsap.to(
                                        ".module-doc .layer-cover .user-oper_bar",
                                        {
                                            overwrite: true,
                                            opacity: 0,
                                            y: "100%",
                                        }
                                    );
                                }
                            },
                        });
                        scrollAnim.to(
                            dom,
                            {
                                opacity: 1,
                                duration: duration / 2,
                            },
                            "<"
                        );
                        scrollAnim.to(dom, {
                            duration,
                            y: "-" + distance,
                        });

                        scrollAnim.to(
                            dom,
                            {
                                opacity: 0,
                                duration: duration / 2,
                            },
                            `-=${duration / 2}`
                        );
                        break;

                    case 3:
                        scrollAnim.to(dom, {
                            duration,
                            y: 0,
                        });
                        scrollAnim.to(
                            dom,
                            {
                                opacity: 1,
                                duration: duration / 2,
                            },
                            "<"
                        );
                        break;

                    default:
                        break;
                }
            });
            return scrollAnim;
        },
    };
}

export default function initDoc(): { init: () => void } {
    const allScrollOrder = getScrollOrder();

    function allAdapt() {
        ScrollTrigger.create({
            trigger: ".module-doc .wrapper-limit_width",
            refreshPriority: allScrollOrder,
            start: "top bottom+=10",
            onEnter() {
                setDocCover();
            },
        });
    }

    const mainScrollOrder = getScrollOrder();
    function getParallaxCtrl() {
        const $parallaxDom = $(".module-doc .module-body");
        ScrollTrigger.saveStyles($parallaxDom);
        return {
            init() {
                gsap.timeline({
                    paused: true,
                    scrollTrigger: {
                        trigger: "#placeholder-doc_scroll",
                        refreshPriority: mainScrollOrder,
                        scrub: true,
                        start: "top bottom",
                        invalidateOnRefresh: true,
                        end: () =>
                            `+=${window.outerHeight - window.navDistance}`,
                    },
                }).to($parallaxDom, {
                    ease: "none",
                    y: () => (window.outerHeight - window.navDistance) * 0.3,
                });
            },
        };
    }
    const beforeEnterCtrl = getBeforeEnterCtrl();
    const infoCtrl = getInfoCtrl();
    const parallaxCtrl = getParallaxCtrl();

    function bigAdapt() {
        setDocCover();
        const infoScrollAnim = infoCtrl.getAnim();
        const scrollAnim = gsap.timeline({
            defaults: { ease: "none", overwrite: true },
            scrollTrigger: {
                trigger: ".module-doc .wrapper-limit_width",
                refreshPriority: mainScrollOrder,
                scrub: true,
                start: "top top",
                end: "+=5000",
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onRefresh() {
                    setSection(
                        scrollAnim.scrollTrigger?.direction,
                        infoScrollAnim.currentLabel()
                    );
                },
            },
        });
        scrollAnim.add(beforeEnterCtrl.getAnim().play());
        infoScrollAnim.eventCallback("onUpdate", () => {
            setSection(
                scrollAnim.scrollTrigger?.direction,
                infoScrollAnim.currentLabel()
            );
        });
        scrollAnim.add(infoScrollAnim.play(), ">-=1");
        scrollAnim.to({}, { duration: 1 });
        parallaxCtrl.init();
    }
    function smallAdapt() {
        setDocCover();
        const infoScrollAnim = infoCtrl.getAnim("15px");
        const scrollAnim = gsap.timeline({
            defaults: { ease: "none", overwrite: true },
            scrollTrigger: {
                trigger: ".module-doc .wrapper-limit_width",
                refreshPriority: mainScrollOrder,
                scrub: true,
                start: "top top",
                end: "+=5000",
                pin: true,
                invalidateOnRefresh: true,
                onRefresh() {
                    setSection(
                        scrollAnim.scrollTrigger?.direction,
                        infoScrollAnim.currentLabel(),
                        "smallScreen"
                    );
                },
            },
        });

        scrollAnim.add(beforeEnterCtrl.getAnim().play());
        infoScrollAnim.eventCallback("onUpdate", () => {
            setSection(
                scrollAnim.scrollTrigger?.direction,
                infoScrollAnim.currentLabel(),
                "smallScreen"
            );
        });
        scrollAnim.add(infoScrollAnim.play(), ">-=1");
        scrollAnim.to({}, { duration: 1 });
    }

    return {
        init() {
            ScrollTrigger.matchMedia({
                "(min-width: 735px)": bigAdapt,
                "(max-width: 734px)": smallAdapt,
                all: allAdapt,
            });
        },
    };
}
