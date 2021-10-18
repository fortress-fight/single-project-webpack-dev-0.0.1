/*
 * @Description: 社交板块
 * @Author: F-Stone
 * @Date: 2021-10-18 12:00:38
 * @LastEditTime: 2021-10-18 12:00:39
 * @LastEditors: F-Stone
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { getScrollOrder } from "./scroll-trigger-manage";
import getScaleVideoCtrl from "./module-share-video";
import getUserListCtrl from "./module-share-list";

export default function initShare(): { init: () => void } {
    const $section = $(".module-share");
    const $pinContent = $section.find(".module_content-box");

    ScrollTrigger.saveStyles($pinContent);

    const scaleVideoCtrl = getScaleVideoCtrl();
    const { getListAnime, getMinListAnime } = getUserListCtrl();
    return {
        init() {
            const mainScrollOrder = getScrollOrder();
            function bigAdapt() {
                const scrollAnim = gsap.timeline({
                    paused: true,
                    defaults: { ease: "none" },
                    scrollTrigger: {
                        trigger: $pinContent,
                        refreshPriority: mainScrollOrder,
                        invalidateOnRefresh: true,
                        start: () => {
                            return `center ${
                                (window.outerHeight - window.navDistance) / 2
                            }`;
                        },
                        scrub: true,
                        pin: $pinContent,
                        end: "4000px",
                    },
                });
                const listAnime = getListAnime();
                scrollAnim.add(listAnime.anime.play());
                const scaleVideoAnim = scaleVideoCtrl.getAnime();
                scrollAnim.add(scaleVideoAnim.anime.play());
                return function () {
                    scaleVideoCtrl.initRenderProgress();
                    listAnime.destroy();
                    scaleVideoAnim.destroy();
                };
            }
            function smallAdapt() {
                const userListControl = getMinListAnime();
                const scrollAnim = gsap.timeline({
                    paused: true,
                    defaults: { ease: "none" },
                    scrollTrigger: {
                        trigger: $pinContent,
                        refreshPriority: mainScrollOrder,
                        invalidateOnRefresh: true,
                        start: () => {
                            return `center ${
                                (window.outerHeight - window.navDistance) / 2
                            }`;
                        },
                        scrub: 0.5,
                        pin: true,
                        end: "1500px",
                    },
                });
                const scaleVideoAnim = scaleVideoCtrl.getAnime();
                scrollAnim.add(scaleVideoAnim.anime.play());
                return () => {
                    scaleVideoCtrl.initRenderProgress();
                    userListControl.destroy();
                    scaleVideoAnim.destroy();
                };
            }
            ScrollTrigger.matchMedia({
                "(min-width: 735px)": bigAdapt,
                "(max-width: 734px)": smallAdapt,
            });
        },
    };
}
