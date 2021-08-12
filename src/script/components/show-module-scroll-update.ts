/*
 * @Description: 企业展示模块的滚动效果
 * @Author: F-Stone
 * @Date: 2021-08-11 15:59:06
 * @LastEditTime: 2021-08-11 15:59:07
 * @LastEditors: F-Stone
 */
type TYPE_SCROLL_UPDATE = ScrollTrigger.Callback;

import { gsap } from "gsap";

interface TYPE_ANIMATE_PARAM_PRO {
    target: JQuery<HTMLElement>;
    param: { [param: string]: string | number };
}
function getAnimateParam(): {
    [param: number]: {
        infoItem: TYPE_ANIMATE_PARAM_PRO;
        bg: TYPE_ANIMATE_PARAM_PRO;
        uemoWeb: TYPE_ANIMATE_PARAM_PRO;
        phoneWrapper: TYPE_ANIMATE_PARAM_PRO;
        backCard: TYPE_ANIMATE_PARAM_PRO;
    };
} {
    const infoItem = $(
        ".module-show .module-body .item-intro:not(.intro-phone)"
    );
    const bg = $(".module-show .wrapper-sec-area .state-pos_right");
    const uemoWeb = $(".module-show .wrapper-sec-area .uemo-web");
    const phoneWrapper = $(
        ".module-show .wrapper-main_phone_imgs, .module-show .main-phone-2"
    );
    const backCard = $(".module-show .main-phone-back-card");
    return {
        0: {
            infoItem: {
                target: infoItem,
                param: { scale: 1, opacity: 1 },
            },
            bg: { target: bg, param: { width: 0 } },
            uemoWeb: { target: uemoWeb, param: { y: "10vh", opacity: 0 } },
            phoneWrapper: {
                target: phoneWrapper,
                param: { x: "0%" },
            },
            backCard: {
                target: backCard,
                param: { opacity: "0" },
            },
        },
        1: {
            infoItem: {
                target: infoItem,
                param: { scale: 0.4, opacity: 0 },
            },
            bg: {
                target: bg,
                param: { width: "50%" },
            },
            uemoWeb: {
                target: uemoWeb,
                param: { y: "0", opacity: 1 },
            },
            phoneWrapper: {
                target: phoneWrapper,
                param: { x: "0%" },
            },
            backCard: {
                target: backCard,
                param: { opacity: "0" },
            },
        },
        2: {
            infoItem: {
                target: infoItem,
                param: { scale: 0.4, opacity: 0 },
            },
            bg: {
                target: bg,
                param: { width: "50%" },
            },
            uemoWeb: {
                target: uemoWeb,
                param: { y: "0", opacity: 1 },
            },
            phoneWrapper: {
                target: phoneWrapper,
                param: { x: "-100%" },
            },
            backCard: {
                target: backCard,
                param: { opacity: "0.7" },
            },
        },
        3: {
            infoItem: {
                target: infoItem,
                param: { scale: 0.4, opacity: 0 },
            },
            bg: {
                target: bg,
                param: { width: "50%" },
            },
            uemoWeb: {
                target: uemoWeb,
                param: { y: "0", opacity: 1 },
            },
            phoneWrapper: {
                target: phoneWrapper,
                param: { x: "0%" },
            },
            backCard: {
                target: backCard,
                param: { opacity: "0.7" },
            },
        },
        4: {
            infoItem: {
                target: infoItem,
                param: { scale: 0.4, opacity: 0 },
            },
            bg: {
                target: bg,
                param: { width: "50%" },
            },
            uemoWeb: {
                target: uemoWeb,
                param: { y: "0", opacity: 1 },
            },
            phoneWrapper: {
                target: phoneWrapper,
                param: { x: "0%" },
            },
            backCard: {
                target: backCard,
                param: { opacity: "0.7" },
            },
        },
    };
}
function getInfoAnimate() {
    let infoAnimate = gsap.timeline();
    let oldIndex = -1;
    const operDom = $(".module-show .intro-item ");
    return function (stepIndex) {
        const currentIndex = stepIndex;
        if (oldIndex == currentIndex) return;
        oldIndex = currentIndex;
        // infoAnimate.kill();
        infoAnimate.killTweensOf();
        infoAnimate = gsap.timeline({
            overwrite: true,
            smoothChildTiming: true,
            defaults: {
                duration: 0.6,
                ease: "better-elastic",
            },
        });
        operDom.each((i, dom) => {
            const textDoms = $(dom).find(".inner-row").toArray();
            infoAnimate.to(
                textDoms,
                {
                    y: "100%",
                    stagger: {
                        amount: 0.1,
                        from: "end",
                    },
                },
                0
            );
            infoAnimate.to(
                textDoms,
                {
                    y: "0%",
                    onStart() {
                        if (i == currentIndex) {
                            operDom.not(dom).hide();
                            $(dom).show();
                        }
                    },
                    stagger: {
                        amount: 0.1,
                        from: "start",
                    },
                },
                0.6 + 0.1 * (textDoms.length - 1)
            );
        });
    };
}

let infoAnimate;
let initAnimate = false;
let animateParam: ReturnType<typeof getAnimateParam>;
function setForward(stepIndex, animate) {
    const { infoItem, bg, uemoWeb, phoneWrapper, backCard } =
        animateParam[stepIndex];

    animate.to(infoItem.target, {
        ...infoItem.param,
        duration: 0.6,
        stagger: {
            grid: [4, 2],
            from: "end",
            ease: "better-elastic",
            amount: 0.2,
        },
    });
    animate.to(
        bg.target,
        {
            ...bg.param,
            duration: 0.6,
            onStart() {
                infoAnimate(stepIndex);
            },
        },
        "-=0.2"
    );
    animate.to(uemoWeb.target, {
        ...uemoWeb.param,
        duration: 1,
    });
    animate.to(
        phoneWrapper.target,
        {
            ...phoneWrapper.param,
            duration: 1,
        },
        "-=1"
    );
    animate.to(
        backCard.target,
        {
            ...backCard.param,
            duration: 0.6,
        },
        "-=1"
    );
}
function setBack(stepIndex, animate) {
    const { infoItem, bg, uemoWeb, phoneWrapper, backCard } =
        animateParam[stepIndex];

    animate.to(backCard.target, {
        ...backCard.param,
        duration: 0.6,
    });
    animate.to(
        phoneWrapper.target,
        {
            ...phoneWrapper.param,
            duration: 1,
        },
        "-=1"
    );
    animate.to(
        uemoWeb.target,
        {
            ...uemoWeb.param,
            duration: 1,
        },
        "-=1"
    );
    animate.to(bg.target, {
        ...bg.param,
        duration: 0.6,
        onStart() {
            infoAnimate(stepIndex);
        },
    });
    animate.to(
        infoItem.target,
        {
            ...infoItem.param,
            duration: 0.6,
            stagger: {
                grid: [4, 2],
                ease: "better-elastic",
                amount: 0.2,
            },
        },
        "-=0.2"
    );
}
function getAnimate(stepIndex, direction) {
    if (!initAnimate) {
        animateParam = getAnimateParam();
        infoAnimate = getInfoAnimate();
        initAnimate = true;
    }
    const animate = gsap.timeline({
        paused: true,
        overwrite: true,
        smoothChildTiming: true,
        defaults: {
            ease: "better-elastic",
        },
    });
    if (direction == 1) {
        setForward(stepIndex, animate);
    } else {
        setBack(stepIndex, animate);
    }
    return animate;
}
function getMainPhoneAnimate() {
    return gsap.fromTo(
        $(".module-show .main-phone"),
        { opacity: 0.3 },
        {
            paused: true,
            opacity: 1,
        }
    );
}
// function getWebScroll() {
//     const animate = gsap.timeline();
//     animate.to({})
//     return animate;
// }
export default function showModuleScrollUpdate(): TYPE_SCROLL_UPDATE {
    const web = $(".box-m_web img:nth-child(2)");
    const mWeb = $(".wrapper-uemo_web img:nth-child(2)");
    function getCurrentSection({ progress, direction, isActive }) {
        let pro = 0;
        if (progress > 0.99) {
            pro = 1;
        } else if (progress < 0.01) {
            pro = 0;
        } else {
            pro = progress;
        }
        runAnimate(pro, isActive, direction);
    }
    const animateGroup = {
        stepOneAnimate: (direction) => getAnimate(0, direction),
        reStepOneAnimate: (direction) => getAnimate(0, direction),
        stepTwoAnimate: (direction) => getAnimate(1, direction),
        reStepTwoAnimate: (direction) => getAnimate(1, direction),
        stepThreeAnimate: (direction) => getAnimate(2, direction),
        reStepThreeAnimate: (direction) => getAnimate(2, direction),
        stepFourAnimate: (direction) => getAnimate(3, direction),
        reStepFourAnimate: (direction) => getAnimate(3, direction),
        mainPhoneAnimate: getMainPhoneAnimate(),
    };
    let oldAnimateName;
    let oldAnimate;
    function runAnimate(progress, isActive, direction) {
        if (!isActive) return;
        let animateName;
        let animate;
        animateGroup.mainPhoneAnimate.progress(progress / 0.2);
        const webScrollProgress = gsap.utils.clamp(
            0,
            1,
            gsap.utils.normalize(0.4, 0.6, progress)
        );
        if (oldAnimate) {
            console.log(!oldAnimate.paused);
            gsap.to(web, {
                y: -200 * webScrollProgress,
            });
            gsap.to(mWeb, {
                y: -300 * webScrollProgress,
            });
        }
        switch (direction) {
            case -1:
                if (progress >= 0 && progress < 0.2) {
                    animateName = "reStepOneAnimate";
                }
                if (progress >= 0.2 && progress < 0.4) {
                    animateName = "reStepTwoAnimate";
                }
                if (progress >= 0.4 && progress < 0.6) {
                    animateName = "reStepThreeAnimate";
                }
                if (progress >= 0.6 && progress <= 0.8) {
                    animateName = "reStepFourAnimate";
                }
                if (progress >= 0.8 && progress <= 1) {
                    animateName = "reStepFourAnimate";
                }
                break;
            case 1:
                if (progress >= 0 && progress < 0.2) {
                    animateName = "stepOneAnimate";
                }
                if (progress >= 0.2 && progress < 0.4) {
                    animateName = "stepTwoAnimate";
                }
                if (progress >= 0.4 && progress < 0.6) {
                    animateName = "stepThreeAnimate";
                }
                if (progress >= 0.6 && progress < 0.8) {
                    animateName = "stepFourAnimate";
                }
                if (progress >= 0.8 && progress <= 1) {
                    animateName = "stepFourAnimate";
                }
                break;

            default:
                break;
        }
        if (animateName && oldAnimateName != animateName) {
            oldAnimateName = animateName;
            oldAnimate && oldAnimate.killTweensOf();
            animate = animateGroup[animateName](direction);
            oldAnimate = animate;
            animate.play();
        }
    }
    return getCurrentSection;
}
