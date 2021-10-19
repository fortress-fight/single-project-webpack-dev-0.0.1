/*
 * @Description:
 * @Author: F-Stone
 * @Date: 2021-10-18 13:09:14
 * @LastEditTime: 2021-10-18 13:09:17
 * @LastEditors: F-Stone
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function userListCount() {
    const $countBox = $(".count-num .text");
    let currentNumber = parseInt($countBox.text());
    const numManage = { num: currentNumber };
    // tab number handler
    return (num) => {
        if (currentNumber == num) return;
        currentNumber = num;
        gsap.to(numManage, {
            num: num,
            overwrite: true,
            duration: 1,
            ease: "power2.inOut",
            onUpdate() {
                $countBox.text(
                    String(Math.ceil(numManage.num)).padStart(3, "0")
                );
            },
        });
    };
}

/* ---------------------------------- */
/*      user list animate helper      */
/* ---------------------------------- */

export default function getUserListCtrl(): {
    getListAnime: () => {
        anime: gsap.core.Timeline;
        destroy: () => void;
    };
    getMinListAnime: () => {
        anime: gsap.core.Timeline;
        destroy: () => void;
    };
} {
    // dom
    const $section = $(".module-share");
    const $list = $section.find(".user-list");

    ScrollTrigger.saveStyles($section.find(".user-item"));
    const updateCount = userListCount();

    function initLayout(groupSize) {
        const itemHTML = $list.html();
        $(itemHTML.repeat(groupSize - 1))
            .addClass("state-clone")
            .appendTo($list);
        return $section.find(".user-item");
    }

    return {
        getListAnime() {
            const userListAnim = gsap.timeline({
                paused: true,
                defaults: { ease: "none" },
            });
            // config
            const process = { y: 0 };
            const groupSize = 3;

            // init layout
            const $items = initLayout(groupSize);

            // cash size
            let space = 0;
            let itemHeight = 0;
            let wrapperHeight = 0;
            let groupHeight = 0;
            let itemSize = 0;

            // updateSize
            function updateSize() {
                space =
                    Number(gsap.getProperty($items[1], "marginBottom")) || 0;
                itemHeight = $items.height();
                itemSize = itemHeight + space;
                wrapperHeight = itemSize * $items.length;
                groupHeight = wrapperHeight / groupSize;
            }
            updateSize();
            $(window).on("resize", updateSize);

            /* ---------------------------------- */
            /*        更新 user-list 进程          */
            /* ---------------------------------- */
            updateItemPos();
            ScrollTrigger.addEventListener("refresh", updateItemPos);
            userListAnim.to(process, {
                y: () => -itemSize * (groupSize - 1),
                onUpdate: () => updateItemPos(),
            });

            function updateOpacity() {
                $items.each((i, dom) => {
                    const movePos = parseFloat(
                        String(gsap.getProperty(dom, "y"))
                    );

                    let percent = gsap.utils.normalize(
                        0,
                        itemSize * 2,
                        Math.abs(movePos)
                    );
                    percent = gsap.utils.clamp(0, 1, percent);
                    percent = Math.abs(percent - 1);
                    if (percent >= 0.9) {
                        updateCount($(dom).data("counter"));
                    }
                    gsap.set(dom, {
                        opacity: percent,
                        scale: 0.85 + percent * 0.15,
                    });
                    // $section.find(".count-num .text").text("000");
                });
            }
            function updateItemPos() {
                const targetPos = process.y;
                gsap.set($items, {
                    y: (i) => i * itemSize + targetPos,
                    overwrite: true,
                    force3D: true,
                    onUpdate: updateOpacity,
                    modifiers: {
                        y(targetPos) {
                            const movePos = gsap.utils.wrap(
                                -(groupHeight + itemSize),
                                wrapperHeight - groupHeight - itemSize,
                                parseFloat(targetPos)
                            );
                            return `${movePos}px`;
                        },
                    },
                });
            }

            return {
                anime: userListAnim,
                destroy() {
                    ScrollTrigger.removeEventListener("refresh", updateItemPos);
                    $(window).off("resize", updateSize);
                    $items.filter(".state-clone").remove();
                    gsap.set($items, {
                        y: 0,
                        scale: 1,
                        opacity: 1,
                    });
                },
            };
        },
        getMinListAnime() {
            // autoplay config
            const groupSize = 3;
            const targetPos = 0;

            // init layout
            const $items = initLayout(groupSize);
            // get size
            let itemWidth = $items.width();
            let space = Number(
                gsap.getProperty($items[0], "marginRight") || "0"
            );
            let itemOutWidth = itemWidth + space;
            let wrapperWidth = itemOutWidth * $items.length;
            const groupWidth = wrapperWidth / groupSize;

            const setPos = (targetPos) => {
                $items.each((i, dom) => {
                    gsap.set(dom, {
                        x: i * itemOutWidth + targetPos,
                        overwrite: true,
                        force3D: true,
                        modifiers: {
                            x: (x) => {
                                const s = gsap.utils.wrap(
                                    -(groupWidth + itemOutWidth),
                                    wrapperWidth - groupWidth - itemOutWidth,
                                    parseFloat(x)
                                );
                                return `${s}px`;
                            },
                        },
                    });

                    const movePos = parseFloat(
                        String(gsap.getProperty(dom, "x"))
                    );

                    let percent = gsap.utils.normalize(
                        0,
                        itemOutWidth * 2,
                        Math.abs(movePos)
                    );
                    percent = gsap.utils.clamp(0, 1, percent);
                    percent = Math.abs(percent - 1);
                    if (percent >= 0.9) {
                        updateCount($(dom).data("counter"));
                    }
                    gsap.set(dom, {
                        opacity: percent,
                        scale: 0.6 + percent * 0.4,
                    });
                });
            };

            setPos(targetPos);

            // resize handler
            function refresh() {
                itemWidth = $items.width();
                space = Number(
                    gsap.getProperty($items[0], "marginRight") || "0"
                );
                itemOutWidth = itemWidth + space;
                wrapperWidth = itemOutWidth * $items.length;
            }
            $(window).on("resize.loopCase", refresh);

            const userListAnim = gsap.timeline({
                paused: true,
                defaults: { ease: "none" },
                scrollTrigger: {
                    invalidateOnRefresh: true,
                    trigger: $section.find(".count-box"),
                    start: "bottom bottom",
                    scrub: 0.5,
                },
            });
            const scrollVal = { x: 0 };
            userListAnim.to(scrollVal, {
                x: -itemOutWidth * 3,
                onUpdate() {
                    setPos(scrollVal.x);
                },
            });

            return {
                anime: userListAnim,
                destroy: () => {
                    // remove eventListener
                    $(window).off("resize.loopCase");
                    $items.filter(".state-clone").remove();
                    gsap.set($items, {
                        x: 0,
                        scale: 1,
                        opacity: 1,
                    });
                },
            };
        },
    };
}
