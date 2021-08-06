/*
 * @Description: 首页的执行类
 * @Author: F-Stone
 * @Date: 2021-08-05 11:23:16
 * @LastEditTime: 2021-08-05 11:23:18
 * @LastEditors: F-Stone
 */

import SiteManage from "./site-manage";
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
    otherTask = ["propagandaModule"];
    propagandaModule(): void {
        const animate = getLineEnter();
        const animateEnterEnd = getLineEnterEnd();
        const mainPhoneEnter = getMainPhoneEnter();
        animate.add(animateEnterEnd, ">");
        animate.add(mainPhoneEnter, "-=0.2");
        animate.eventCallback("onComplete", () => {
            // $("body").removeClass("state-prevent_scroll");
            $(".wrapper-propaganda_intro .layer-main_phone").addClass(
                "state-ready"
            );
        });

        const enterDom = $(".site-logo, .btn-open_project_QR");
        setTimeout(() => {
            requestAnimationFrame(() => {
                gsap.to(enterDom, {
                    opacity: 1,
                    ease: "Power2.easeOut",
                    delay: 0.4,
                    duration: 0.4,
                    stagger: 1,
                    onStart() {
                        window.scrollTo(0, 0);
                    },
                    onComplete: () => {
                        animate.play();
                        this.initScrollNav();
                    },
                });
            });
        }, 100);
    }
}
