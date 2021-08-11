/*
 * @Description: 企业展示模块的滚动效果
 * @Author: F-Stone
 * @Date: 2021-08-11 15:59:06
 * @LastEditTime: 2021-08-11 15:59:07
 * @LastEditors: F-Stone
 */
type TYPE_SCROLL_UPDATE = ScrollTrigger.Callback;

import { gsap } from "gsap";

function getHideAnimate() {
    const hideAnimate = gsap.timeline({
        paused: true,
        defaults: {
            ease: "better-elastic",
        },
    });
    const infoItem = $(
        ".module-show .module-body .item-intro:not(.intro-phone)"
    ).toArray();
    const bg = $(".module-show .wrapper-sec-area .state-pos_right");
    const uemoWeb = $(".module-show .wrapper-sec-area .uemo-web");
    const textDom = $(".module-show .intro-item .inner-row");
    hideAnimate.to(infoItem, {
        scale: 0.4,
        duration: 0.6,
        opacity: 0,
        stagger: {
            grid: [4, 2],
            from: "end",
            ease: "better-elastic",
            amount: 0.2,
        },
    });
    hideAnimate.to(
        bg,
        {
            width: "50%",
            duration: 0.6,
        },
        "-=0.2"
    );
    hideAnimate.to(uemoWeb, {
        y: 0,
        duration: 1,
        opacity: 1,
    });
    hideAnimate.to(
        textDom,
        {
            y: 0,
            duration: 0.8,
            stagger: {
                amount: 0.1,
                from: "start",
            },
        },
        "-=0.7"
    );
    return hideAnimate;
}
function getReHideAnimate() {
    const hideAnimate = gsap.timeline({
        paused: true,
        defaults: {
            ease: "better-elastic",
        },
    });
    const infoItem = $(
        ".module-show .module-body .item-intro:not(.main-phone)"
    ).toArray();
    const bg = $(".module-show .wrapper-sec-area .state-pos_right");
    const uemoWeb = $(".module-show .wrapper-sec-area .uemo-web");
    const textDom = $(".module-show .intro-item .inner-row");

    hideAnimate.to(textDom, {
        y: "100%",
        duration: 0.8,
        stagger: {
            amount: 0.1,
            from: "end",
        },
    });
    hideAnimate.to(
        uemoWeb,
        {
            y: "10vh",
            duration: 1,
            opacity: 0,
        },
        0.3
    );
    hideAnimate.to(bg, {
        width: "0",
        duration: 0.6,
    });
    hideAnimate.to(
        infoItem,
        {
            scale: 1,
            duration: 0.6,
            opacity: 1,
            stagger: {
                grid: [4, 2],
                ease: "better-elastic",
                amount: 0.2,
            },
        },
        "-=0.2"
    );
    return hideAnimate;
}
export default function showModuleScrollUpdate(): TYPE_SCROLL_UPDATE {
    const animateGroup = {
        hideAnimate: () => getHideAnimate(),
        reHideAnimate: () => getReHideAnimate(),
    };
    const mainPhoneAnimate = gsap.fromTo(
        $(".module-show .main-phone"),
        { opacity: 0.3 },
        {
            paused: true,
            opacity: 1,
        }
    );
    let oldAnimateName;
    let oldAnimate;
    return function getCurrentSection({ progress, direction, isActive }) {
        if (!isActive) return;
        let animateName;
        let pro = 0;
        if (progress > 0.99) {
            pro = 1;
        } else if (progress < 0.01) {
            pro = 0;
        } else {
            pro = progress;
        }
        mainPhoneAnimate.progress(progress / 0.2);

        if (direction == 1) {
            if (pro >= 0.2) {
                animateName = "hideAnimate";
            }
        } else {
            if (pro <= 0.2) {
                animateName = "reHideAnimate";
            }
        }
        if (animateName && oldAnimateName != animateName) {
            oldAnimateName = animateName;
            oldAnimate && oldAnimate.kill();
            const animate = animateGroup[animateName]();
            oldAnimate = animate;
            animate.play();
        }
    };
}
