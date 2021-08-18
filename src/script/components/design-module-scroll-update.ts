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
                opacity: cardIndex == 2 ? 0 : 1,
            })
            .to(
                ".lighter-head",
                {
                    opacity: cardIndex == 2 ? 1 : 0,
                },
                0
            );

        if (
            (newIndex == 2 && oldIndex != 2) ||
            (oldIndex == 2 && newIndex != 2)
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

let otherAnimate;
function getCardAnimate(cardIndex) {
    const param = getCardAnimateParam(cardIndex);
    if (!otherAnimate) {
        otherAnimate = getCardOtherAnimate();
    }
    const cardAnimate = gsap.timeline({
        paused: true,
        defaults: {
            ease: "power2.out",
            duration: 1.2,
        },
        onStart: () => {
            otherAnimate(param, cardIndex);
        },
    });
    cardAnimate.to(".phone-card .card-box-inner", {
        x: param.cardX,
    });
    cardAnimate.to(
        ".module-design .module-inner_wrapper",
        {
            backgroundColor: param.designBg,
            duration: 0.66,
        },
        0
    );
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
    };
    let oldAnimateName;
    let oldAnimate;
    function cardMove(progress, isActive, direction) {
        if (!isActive) return;
        let animateName;
        switch (direction) {
            case -1:
                if (progress >= 0 && progress < 0.3333) {
                    animateName = "reOneCardAnimate";
                }
                if (progress >= 0.3333 && progress < 0.6666) {
                    animateName = "reTwoCardAnimate";
                }
                if (progress >= 0.6666 && progress < 1) {
                    animateName = "reThreeCardAnimate";
                }
                break;

            case 1:
                if (progress >= 0 && progress < 0.3333) {
                    animateName = "oneCardAnimate";
                }
                if (progress >= 0.3333 && progress < 0.6666) {
                    animateName = "twoCardAnimate";
                }
                if (progress >= 0.6666 && progress < 1) {
                    animateName = "threeCardAnimate";
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
