/*
 * @Description: 风格切换的滚动行为
 * @Author: F-Stone
 * @Date: 2021-08-11 16:04:28
 * @LastEditTime: 2021-08-11 16:04:28
 * @LastEditors: F-Stone
 */

import { gsap } from "gsap";
import type { ScrollTrigger } from "@/lib/gsap-member/esm/ScrollTrigger";

type TYPE_SCROLL_UPDATE = ScrollTrigger.Callback;

let otherAnimate;
let infoAnimate;
function getCardAnimateParam(cardIndex) {
    let param;
    switch (cardIndex) {
        case 0:
            param = {
                cardIndex: cardIndex,
                footerImg: 0,
                cardX: "0",
                designBg: "#182919",
                cardBg: "#0e120b",
                cardShadow: "0px 17px 33px 0px rgb(31, 54, 29, 0.68) ",
            };
            break;
        case 1:
            param = {
                cardIndex: cardIndex,
                footerImg: 1,
                cardX: "-100%",
                designBg: "#202167",
                cardBg: "#2f4461",
                cardShadow: "0px 17px 33px 0px rgba(20, 33, 93, 0.68)",
            };
            break;

        case 2:
            param = {
                cardIndex: cardIndex,
                footerImg: 2,
                cardX: "-200%",
                designBg: "#370000",
                cardBg: "#420001",
                cardShadow: "0px 17px 33px 0px rgba(39, 3, 3, 0.68)",
            };
            break;

        case 3:
            param = {
                cardIndex: cardIndex,
                footerImg: 3,
                cardX: "-300%",
                designBg: "#33a47b",
                cardBg: "#d9e3e7",
                cardShadow: "0px 17px 33px 0px rgba(15, 160, 109, 0.68)",
            };
            break;

        default:
            break;
    }
    return param;
}
function getCardOtherAnimate() {
    let otherAnimate = gsap.timeline();
    return function (param, cardIndex) {
        let oldIndex = $(".phone-footer img.state-active").index();
        oldIndex = oldIndex == -1 ? 0 : oldIndex;
        const newIndex = param.footerImg;
        otherAnimate.kill();
        gsap.killTweensOf($(".phone-footer img"));
        otherAnimate = gsap.timeline();
        otherAnimate
            .to(".deep-head", {
                opacity: cardIndex == 3 ? 0 : 1,
            })
            .to(
                ".lighter-head",
                {
                    opacity: cardIndex == 3 ? 1 : 0,
                },
                0
            );

        if (
            (newIndex == 3 && oldIndex != 3) ||
            (oldIndex == 3 && newIndex != 3)
        ) {
            $(".phone-footer img").eq(newIndex).addClass("state-active");
            $(".phone-footer img").eq(oldIndex).removeClass("state-active");
            otherAnimate.to(
                $(".phone-footer img").eq(newIndex).siblings(),
                {
                    y: 30,
                    opacity: 0,
                },
                0
            );
            otherAnimate.to($(".phone-footer img").eq(newIndex), {
                startAt: { y: 30 },
                opacity: 1,
                y: 0,
            });
        } else if (oldIndex != newIndex) {
            $(".phone-footer img").eq(newIndex).addClass("state-active");
            $(".phone-footer img").eq(oldIndex).removeClass("state-active");
            otherAnimate.to(
                $(".phone-footer img").eq(newIndex).siblings(),
                { y: 0, opacity: 0, duration: 0 },
                0
            );
            otherAnimate.to(
                $(".phone-footer img").eq(newIndex),
                {
                    y: 0,
                    opacity: 1,
                    duration: 0,
                },
                0
            );
        }
        return otherAnimate;
    };
}
function getCardInfoAnimate() {
    let infoAnimate = gsap.timeline();
    let oldIndex = 0;
    const operDom = $(".module-design .list-intro .item-intro");
    return function (param, cardIndex) {
        if (oldIndex == cardIndex) return;
        oldIndex = cardIndex;
        // const animateDom = operDom.eq(0).find(".text");
        infoAnimate.kill();
        infoAnimate.killTweensOf();
        infoAnimate = gsap.timeline({
            defaults: {
                duration: 0.8,
                ease: "better-elastic",
            },
        });
        operDom.each((i, dom) => {
            const textDoms = $(dom).find(".text").toArray();
            infoAnimate.to(
                [...textDoms].reverse(),
                {
                    y: "100%",
                    stagger: 0.1,
                },
                0
            );
            infoAnimate.to(
                [...textDoms],
                {
                    y: "0%",
                    onStart() {
                        if (i == cardIndex) {
                            operDom.not(dom).hide();
                            $(dom).show();
                        }
                    },
                    stagger: 0.1,
                },
                0.8 + 0.1 * (textDoms.length - 1)
            );
        });
    };
}
function getCardAnimate(cardIndex) {
    const param = getCardAnimateParam(cardIndex);
    if (!otherAnimate) {
        otherAnimate = getCardOtherAnimate();
    }
    if (!infoAnimate) {
        infoAnimate = getCardInfoAnimate();
    }
    const cardAnimate = gsap.timeline({
        paused: true,
        defaults: {
            ease: "power2.out",
            duration: 1.2,
        },
        onStart: () => {
            otherAnimate(param, cardIndex);
            infoAnimate(param, cardIndex);
        },
    });
    cardAnimate.to(".phone-card .card-box-inner", {
        x: param.cardX,
    });
    cardAnimate.to(".module-design", {
        backgroundColor: param.designBg,
        duration: 0.66,
    });
    cardAnimate.to(
        ".module-design .card-bg",
        {
            backgroundColor: param.cardBg,
        },
        0
    );
    cardAnimate.to(
        ".module-design .img-wrapper",
        {
            boxShadow: param.cardShadow,
        },
        0
    );
    cardAnimate.to(
        ".module-design .list-card--right .item-card",
        {
            x: () => {
                return (
                    -param.cardIndex *
                    $(".module-design .list-card--right .item-card")
                        .eq(0)
                        .outerWidth(true)
                );
            },
        },
        0
    );
    cardAnimate.to(
        ".module-design .list-card--left .item-card",
        {
            x: () => {
                return (
                    -param.cardIndex *
                    $(".module-design .list-card--right .item-card")
                        .eq(0)
                        .outerWidth(true)
                );
            },
        },
        0
    );
    return cardAnimate;
}
export default function designModuleScrollUpdate(): TYPE_SCROLL_UPDATE {
    function getCurrentSection({ progress, direction, isActive }) {
        let pro = 0;
        if (progress > 0.99) {
            pro = 1;
        } else if (progress < 0.01) {
            pro = 0;
        } else {
            pro = progress;
        }
        cardMove(pro, isActive, direction);
    }
    const animateGroup = {
        oneCardAnimate: () => getCardAnimate(0),
        reOneCardAnimate: () => getCardAnimate(0),
        twoCardAnimate: () => getCardAnimate(1),
        reTwoCardAnimate: () => getCardAnimate(1),
        threeCardAnimate: () => getCardAnimate(2),
        reThreeCardAnimate: () => getCardAnimate(2),
        fourCardAnimate: () => getCardAnimate(3),
        reFourCardAnimate: () => getCardAnimate(3),
    };
    let oldAnimateName;
    let oldAnimate;
    function cardMove(progress, isActive, direction) {
        if (!isActive) return;
        let animateName;
        switch (direction) {
            case -1:
                if (progress >= 0 && progress < 0.25) {
                    animateName = "reOneCardAnimate";
                }
                if (progress >= 0.25 && progress < 0.5) {
                    animateName = "reTwoCardAnimate";
                }
                if (progress >= 0.5 && progress < 0.75) {
                    animateName = "reThreeCardAnimate";
                }
                if (progress >= 0.75 && progress <= 1) {
                    animateName = "reFourCardAnimate";
                }
                break;

            case 1:
                if (progress >= 0 && progress < 0.25) {
                    animateName = "oneCardAnimate";
                }
                if (progress >= 0.25 && progress < 0.5) {
                    animateName = "twoCardAnimate";
                }
                if (progress >= 0.5 && progress < 0.75) {
                    animateName = "threeCardAnimate";
                }
                if (progress >= 0.75 && progress <= 1) {
                    animateName = "fourCardAnimate";
                }
                break;

            default:
                break;
        }
        if (animateName && oldAnimateName != animateName) {
            oldAnimateName = animateName;
            oldAnimate && oldAnimate.kill();
            const animate = animateGroup[animateName]();
            oldAnimate = animate;
            animate.play();
        }
    }
    return getCurrentSection;
}
