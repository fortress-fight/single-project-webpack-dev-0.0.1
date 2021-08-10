/*
 * @Description: 首页的执行类
 * @Author: F-Stone
 * @Date: 2021-08-05 11:23:16
 * @LastEditTime: 2021-08-05 11:23:18
 * @LastEditors: F-Stone
 */

import SiteManage from "./site-manage";
import { ScrollTrigger } from "@/lib/gsap-member/esm/ScrollTrigger";
import { gsap } from "gsap";

function getLineEnter() {
    const lineWrapper = $(".box-text_effect");
    const lineOne = $(".effect-line-1");
    const lineTwo = $(".effect-line-2");
    const animate = gsap.timeline({
        paused: true,
        defaults: {
            ease: "lineEffect",
        },
    });
    animate.fromTo(
        lineWrapper,
        {
            y: "50vh",
            rotateY: "70deg",
            opacity: 0,
        },
        {
            ease: "Power1.easeOut",
            y: 0,
            rotateY: 0,
            opacity: 1,
            duration: 0.5,
        }
    );
    animate.fromTo(
        lineOne,
        {
            opacity: 0,
        },
        {
            opacity: 1,
            duration: 1.5,
            ease: "Power1.easeOut",
        },
        "0"
    );
    animate.fromTo(
        lineOne,
        {
            y: "50vh",
            rotateY: "-70deg",
        },
        {
            y: 0,
            rotateY: 0,
            duration: 2,
        },
        "0"
    );
    animate.fromTo(
        lineTwo,
        {
            y: "50vh",
            rotateY: "-70deg",
        },
        {
            y: 0,
            rotateY: 0,
            duration: 2,
        },
        "0.1"
    );
    animate.fromTo(
        lineTwo,
        {
            opacity: 0,
        },
        {
            opacity: 1,
            duration: 1.5,
            ease: "Power1.easeOut",
        },
        "0.08"
    );
    return animate;
}
function getLineEnterEnd() {
    const animate = gsap.timeline({
        defaults: {
            ease: "better-elastic",
            duration: 0.6,
        },
    });
    const modulePropaganda = $(".module-propaganda");
    const modulePropagandaTitle = $(".module-propaganda .title");
    const modulePropagandaServe = $(".module-propaganda .project-serve");
    animate.fromTo(
        modulePropaganda,
        {
            paddingTop: "28.462963vh",
        },
        {
            paddingTop: "25.462962962963vh",
        }
    );
    animate.fromTo(
        modulePropagandaTitle,
        {
            fontSize: "128px",
            "letter-spacing": "-4px",
        },
        {
            fontSize: "100px",
            "letter-spacing": "-0px",
        },
        0
    );
    animate.fromTo(
        modulePropagandaServe,
        {
            fontSize: "19px",
        },
        {
            fontSize: "15px",
        },
        0
    );
    return animate;
}
function getMainPhoneEnter() {
    const animate = gsap.timeline();
    const mainPhone = $(".layer-main_phone");
    const mainHand = $(".layer-hand-back, .layer-hand-front");
    animate.fromTo(
        mainHand,
        {
            y: "10vh",
            opacity: 0,
        },
        {
            y: "0vh",
            opacity: 1,
            ease: "Power2.easeOut",
        }
    );
    animate.fromTo(
        mainPhone,
        {
            scale: 1.3,
            opacity: 0,
        },
        {
            scale: 1,
            opacity: 1,
            ease: "Power2.easeOut",
        },
        0
    );
    return animate;
}
export default class IndexPage extends SiteManage {
    disableTask = ["initScrollNav"];
    otherTask = ["propagandaModule", "designModule"];
    private _propagandaModuleEnter() {
        const animate = getLineEnter();
        const animateEnterEnd = getLineEnterEnd();
        animateEnterEnd.eventCallback("onComplete", () => {
            ScrollTrigger.update();
            ScrollTrigger.refresh();
        });
        const mainPhoneEnter = getMainPhoneEnter();
        animate.add(animateEnterEnd, ">");
        animate.add(mainPhoneEnter, "-=0.2");

        const enterDom = $(".site-head");
        setTimeout(() => {
            requestAnimationFrame(() => {
                gsap.fromTo(
                    enterDom,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        ease: "Power2.easeOut",
                        delay: 0.4,
                        duration: 0.4,
                        stagger: 1,
                        onStart() {
                            window.scrollTo(0, 0);
                            animate.play();
                        },
                        onComplete: () => {
                            this.initScrollNav();
                        },
                    }
                );
            });
        }, 100);
    }
    propagandaModule(): void {
        if (!$(".module-propaganda")[0]) return;
        this._propagandaModuleEnter();
    }

    private _getCardAnimateParam(cardIndex) {
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
    private _getCardOtherAnimate() {
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
    private _getCardInfoAnimate() {
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
    private _otherAnimate;
    private _infoAnimate;
    private _getCardAnimate(cardIndex) {
        const param = this._getCardAnimateParam(cardIndex);
        if (!this._otherAnimate) {
            this._otherAnimate = this._getCardOtherAnimate();
        }
        if (!this._infoAnimate) {
            this._infoAnimate = this._getCardInfoAnimate();
        }
        const cardAnimate = gsap.timeline({
            paused: true,
            defaults: {
                ease: "power2.out",
                duration: 1.2,
            },
            onStart: () => {
                this._otherAnimate(param, cardIndex);
                this._infoAnimate(param, cardIndex);
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
    private _getCardInfoAnimateAbandoned() {
        const infoAnimate = gsap.timeline({ paused: true });
        infoAnimate
            .fromTo(
                ".module-design .list-intro",
                { y: 0 },
                {
                    y: () => {
                        return (
                            -1 *
                            $(
                                ".module-design .item-intro:first-child"
                            ).outerHeight(true)
                        );
                    },
                }
            )
            .fromTo(
                ".module-design .item-intro:last-child",
                { opacity: 0 },
                { opacity: 1 },
                0
            );
        return infoAnimate;
    }
    private _designModuleScrollUpdate() {
        function getCurrentSection({ progress, direction, isActive }) {
            let pro = 0;
            if (progress > 0.99) {
                pro = 1;
            } else if (progress < 0.01) {
                pro = 0;
            } else {
                pro = progress;
            }
            // infoPos(pro, isActive);
            cardMove(pro, isActive, direction);
        }
        // const infoAnimate = this._getCardInfoAnimate();
        // function infoPos(progress, isActive) {
        //     if (!isActive) return;
        //     infoAnimate.progress((progress - 0.6) / 0.4);
        // }
        const animateGroup = {
            oneCardAnimate: () => this._getCardAnimate(0),
            reOneCardAnimate: () => this._getCardAnimate(0),
            twoCardAnimate: () => this._getCardAnimate(1),
            reTwoCardAnimate: () => this._getCardAnimate(1),
            threeCardAnimate: () => this._getCardAnimate(2),
            reThreeCardAnimate: () => this._getCardAnimate(2),
            fourCardAnimate: () => this._getCardAnimate(3),
            reFourCardAnimate: () => this._getCardAnimate(3),
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
    designModule(): void {
        gsap.timeline({
            scrollTrigger: {
                trigger: ".module-design",
                scrub: true,
                start: "top top",
                end: "+=300%",
                pin: true,
                onUpdate: this._designModuleScrollUpdate(),
            },
        });
    }
}
