/*
 * @Description: design module 的滚动行为
 * @Author: F-Stone
 * @Date: 2021-08-20 11:25:18
 * @LastEditTime: 2021-08-20 11:25:19
 * @LastEditors: F-Stone
 */
import { gsap } from "gsap";

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
function cardMove(direction, sectionIndex) {
    let _animateName;
    switch (sectionIndex) {
        case 0:
            _animateName = "oneCardAnimate";
            break;
        case 1:
            _animateName = "twoCardAnimate";
            break;
        case 2:
            _animateName = "threeCardAnimate";
            break;

        default:
            break;
    }
    const animateName =
        direction == -1
            ? `re${_animateName.replace(/^\S/, (s) => s.toUpperCase())}`
            : _animateName;

    if (animateName && oldAnimateName != animateName) {
        oldAnimateName = animateName;
        oldAnimate && oldAnimate.kill();
        const animate = animateGroup[animateName]();
        oldAnimate = animate;
        animate.play();
    }
}
export default function initDesignModuleScroll(): void {
    // console.log("running");

    let oldIndex = -1;
    function setSection(currentIndex) {
        const dir = scrollAnimate.scrollTrigger.direction;
        if (dir == 1) {
            if (currentIndex <= oldIndex) return;
        } else {
            if (currentIndex >= oldIndex) return;
        }
        cardMove(dir, currentIndex);
        oldIndex = currentIndex;
    }

    const scrollAnimate = gsap.timeline({
        defaults: {
            ease: "none",
        },
        scrollTrigger: {
            trigger: ".module-design .module-inner_wrapper",
            scrub: true,
            start: "top top",
            end: "+=200%",
            pin: true,
        },
    });
    $(".module-design .list-intro .item-intro").each((i, dom) => {
        switch (i) {
            case 0:
                scrollAnimate.to(dom, {
                    y: "-50%",
                    onUpdate() {
                        gsap.set(dom, {
                            opacity: gsap.utils.normalize(
                                0,
                                0.5,
                                1 - this.progress()
                            ),
                        });
                    },
                    onStart() {
                        setSection(i);
                    },
                });
                break;

            case 1:
                scrollAnimate.to(dom, {
                    y: 0,
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
                scrollAnimate.to(dom, {
                    y: "-50%",
                    onUpdate() {
                        gsap.set(dom, {
                            opacity: gsap.utils.normalize(
                                0,
                                0.5,
                                1 - this.progress()
                            ),
                        });
                    },
                });
                break;

            case 2:
                scrollAnimate.to(dom, {
                    y: 0,
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
    });
}
