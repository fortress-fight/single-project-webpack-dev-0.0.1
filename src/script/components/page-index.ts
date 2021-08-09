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
    private _getCardAnimate(cardIndex) {
        let param = {
            cardIndex: cardIndex,
            footerImg: 0,
            cardX: "-100%",
            designBg: "#202167",
            cardBg: "#2f4461",
            cardShadow: "0px 17px 33px 0px rgba(20, 33, 93, 0.68)",
        };
        switch (cardIndex) {
            case 2:
                param = {
                    cardIndex: cardIndex,
                    footerImg: 1,
                    cardX: "-200%",
                    designBg: "#370000",
                    cardBg: "#420001",
                    cardShadow: "0px 17px 33px 0px rgba(39, 3, 3, 0.68)",
                };
                break;

            case 3:
                param = {
                    cardIndex: cardIndex,
                    footerImg: 2,
                    cardX: "-300%",
                    designBg: "#33a47b",
                    cardBg: "#d9e3e7",
                    cardShadow: "0px 17px 33px 0px rgba(15, 160, 109, 0.68)",
                };
                break;

            default:
                break;
        }
        const cardAnimate = gsap.timeline({
            paused: true,
            defaults: {
                ease: "power2.out",
                duration: 1.2,
            },
            onReverseComplete() {
                $(".phone-footer img").eq(param.footerImg).siblings().hide();
                $(".phone-footer img").eq(param.footerImg).show();
            },
            onStart() {
                $(".phone-footer img")
                    .eq(param.footerImg + 1)
                    .siblings()
                    .hide();
                $(".phone-footer img")
                    .eq(param.footerImg + 1)
                    .show();
            },
        });
        cardAnimate.to(".phone-card .card-box-inner", {
            x: param.cardX,
        });
        cardAnimate.to(
            ".module-design",
            {
                backgroundColor: param.designBg,
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
            ".module-design .card-box",
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
        if (cardIndex == 3) {
            cardAnimate.to(
                ".deep-head",
                {
                    opacity: 0,
                },
                0
            );
            cardAnimate.to(
                ".lighter-head",
                {
                    opacity: 1,
                },
                0
            );
        }
        return cardAnimate;
    }
    private _designModuleScrollUpdate() {
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
        function getCurrentSection({ progress, direction, isActive }) {
            let pro = 0;
            if (progress > 0.99) {
                pro = 1;
            } else if (progress < 0.01) {
                pro = 0;
            } else {
                pro = progress;
            }
            infoPos(pro, isActive);
            cardMove(pro, isActive, direction);
        }
        function infoPos(progress, isActive) {
            if (!isActive) return;
            infoAnimate.progress((progress - 0.6) / 0.4);
        }
        const oneCardAnimate = this._getCardAnimate(1);
        const twoCardAnimate = this._getCardAnimate(2);
        const threeCardAnimate = this._getCardAnimate(3);
        function cardMove(progress, isActive, direction) {
            if (!isActive) return;
            let animate;
            switch (direction) {
                case -1:
                    if (progress <= 1 && progress > 0.8) {
                        animate = threeCardAnimate;
                    }
                    if (progress <= 0.6 && progress > 0.4) {
                        animate = twoCardAnimate;
                    }
                    if (progress <= 0.2) {
                        animate = oneCardAnimate;
                    }
                    break;

                case 1:
                    if (progress >= 0 && progress < 0.2) {
                        animate = oneCardAnimate;
                    }
                    if (progress >= 0.4 && progress < 0.6) {
                        animate = twoCardAnimate;
                    }
                    if (progress >= 0.8) {
                        animate = threeCardAnimate;
                    }
                    break;

                default:
                    break;
            }

            animate &&
                (direction == -1
                    ? gsap.to(animate, {
                          time: 0,
                          ease: "power2.out",
                          duration: 1.2,
                          overwrite: true,
                      })
                    : animate.play());
            // gsap.to(animate, {
            //       time: 1.2,
            //       ease: "power2.out",
            //       duration: 1.2,
            //       overwrite: true,
            //   }));
        }
        return getCurrentSection;
    }
    designModule(): void {
        gsap.timeline({
            scrollTrigger: {
                trigger: ".module-design .module-inner_box",
                scrub: true,
                start: "bottom bottom",
                end: "+=300%",
                pin: true,
                onUpdate: this._designModuleScrollUpdate(),
            },
        });
    }
}
