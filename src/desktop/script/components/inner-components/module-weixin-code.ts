/*
 * @Description: 微信二维码
 * @Author: F-Stone
 * @Date: 2021-10-15 20:50:24
 * @LastEditTime: 2021-10-15 20:50:25
 * @LastEditors: F-Stone
 */
import lottie from "lottie-web";
import { gsap } from "gsap";

import { os } from "@/util/os";
import { getScrollOrder } from "./scroll-trigger-manage";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function initWeiXinCode(vsScroll: { on: any }): {
    init: () => void;
} {
    return {
        init() {
            let startDisableOpen;
            let endDisableOpen;
            if (!os.isPhone) {
                const pointerBox = $(".ae-pointer")[0];
                const pointerAe = lottie.loadAnimation({
                    container: pointerBox,
                    renderer: "svg",
                    autoplay: false,
                    path: $(pointerBox).data("ae-icon"),
                });

                let weixinBtnAnimate = gsap.to(".btn-open_QR", {
                    paused: true,
                    duration: 0.36,
                    ease: "Power2.easeOut",
                    width: "auto",
                    onReverseComplete() {
                        pointerAe.pause();
                    },
                });
                $(window).on("resize", () => {
                    weixinBtnAnimate.kill();
                    $(".btn-open_QR").css({ width: "" });
                    weixinBtnAnimate = gsap.to(".btn-open_QR", {
                        paused: true,
                        duration: 0.36,
                        ease: "Power2.easeOut",
                        width: "auto",
                    });
                });
                let state = "close";
                const openWeixinCode = () => {
                    if (startDisableOpen || endDisableOpen) return;
                    if (state == "open") return;
                    pointerAe.play();
                    state = "open";
                    weixinBtnAnimate.play();
                };
                const closeWeixinCode = () => {
                    if (state == "close") return;
                    state = "close";
                    weixinBtnAnimate.reverse();
                };
                let timeout;
                const waitTime = 2000;
                let isFirst = true;
                if (vsScroll) {
                    vsScroll.on("scroll", (args) => {
                        if (isFirst) {
                            isFirst = false;
                            return;
                        }
                        const scrollY = args.delta.y;
                        closeWeixinCode();
                        clearTimeout(timeout);
                        if (scrollY < 10) {
                            startDisableOpen = true;
                        } else {
                            startDisableOpen = false;
                        }
                        timeout = setTimeout(() => {
                            openWeixinCode();
                        }, waitTime);
                    });
                } else {
                    $(window).on("scroll", () => {
                        const scrollY = window.scrollY;
                        closeWeixinCode();
                        clearTimeout(timeout);
                        if (scrollY < 10) {
                            startDisableOpen = true;
                        } else {
                            startDisableOpen = false;
                        }
                        timeout = setTimeout(() => {
                            openWeixinCode();
                        }, waitTime);
                    });
                }
                openWeixinCode();
            }
            gsap.to(".footer_layer--fixed", {
                opacity: 0,
                onStart() {
                    endDisableOpen = true;
                },
                onReverseComplete() {
                    endDisableOpen = false;
                },
                scrollTrigger: {
                    trigger: ".module-contact",
                    refreshPriority: getScrollOrder(),
                    scrub: true,
                    start: "top bottom",
                    end: "bottom bottom",
                    pinType: "transform",
                    onUpdate({ progress }) {
                        gsap.set(".footer_layer--fixed", {
                            y: -progress * $(".module-contact").height(),
                        });
                    },
                },
            });
            let disableClick = false;
            $(".btn-open_QR").on("click", () => {
                if (disableClick) return;
                const wrapperWeixinCode = $(`
                    <div class="wrapper-weixin_code flex flex-c-c">
                        <div class="box-weixin_code">
                            <img src="${$(".btn-open_QR").attr(
                                "data-img-src"
                            )}" alt="" />
                        </div>
                    </div>
                `).appendTo("body");
                requestAnimationFrame(() => {
                    const showWeixinCode = gsap
                        .timeline({
                            onStart() {
                                disableClick = false;
                            },
                            onReverseComplete() {
                                wrapperWeixinCode.remove();
                            },
                        })
                        .to(wrapperWeixinCode, {
                            duration: 0.36,
                            backgroundColor: "rgba(0,0,0,0.6)",
                        })
                        .fromTo(
                            wrapperWeixinCode.find(".box-weixin_code"),
                            {
                                y: "0vh",
                                opacity: 0,
                            },
                            {
                                y: "-5vh",
                                opacity: 1,
                                duration: 0.26,
                            }
                        );
                    wrapperWeixinCode.one("click", (ev) => {
                        if (ev.target != wrapperWeixinCode[0]) {
                            return;
                        }
                        showWeixinCode.reverse();
                    });
                });
            });
        },
    };
}
