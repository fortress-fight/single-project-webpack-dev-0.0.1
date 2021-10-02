/*
 * @Description:
 * @Author: F-Stone
 * @Date: 2021-10-02 14:13:29
 * @LastEditTime: 2021-10-02 14:13:31
 * @LastEditors: F-Stone
 */
import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function moduleShare(): {
    init: () => void;
    setUserList: () => gsap.core.Timeline;
} {
    const $section = $(".module-share");
    const $pinContent = $section.find(".module_content-box");
    return {
        init() {
            const scrollAnim = gsap.timeline({
                paused: true,
                defaults: {
                    ease: "none",
                },
                scrollTrigger: {
                    trigger: $pinContent,
                    scrub: true,
                    pin: true,
                    pinSpacing: "2000px",
                },
            });
            scrollAnim.add(this.setUserList());
        },
        setUserList() {
            const userListAnim = gsap.timeline();
            const $list = $section.find(".user-list");

            // config
            const process = { y: 0 };
            const groupSize = 3;

            // init layout
            const itemHTML = $list.html();
            $list.html(itemHTML.repeat(groupSize));
            const $items = $section.find(".user-item");

            // get size
            let space =
                Number(gsap.getProperty($items[1], "marginBottom")) || 0;
            let itemHeight = $items.height();
            const itemSize = itemHeight + space;
            let wrapperHeight = (itemHeight + space) * $items.length;
            const groupHeight = wrapperHeight / groupSize;

            const $countBox = $(".count-num .text");
            let currentNumber = parseInt($countBox.text());
            const numManage = { num: currentNumber };
            function updateCount(num) {
                gsap.to(numManage, {
                    num: num,
                    overwrite: true,
                    duration: 1,
                    ease: "power2.inOut",
                    onUpdate() {
                        const s = String(Math.ceil(numManage.num));
                        const result = "0".repeat(3 - s.split("").length) + s;
                        $countBox.text(result);
                    },
                });
            }
            function updateOpacity() {
                gsap.set($items, {
                    opacity(i) {
                        const movePos = parseFloat(
                            String(gsap.getProperty($items[i], "y"))
                        );

                        let itemOpacity = gsap.utils.clamp(
                            0,
                            1,
                            gsap.utils.normalize(
                                0,
                                itemSize * 2,
                                Math.abs(movePos)
                            )
                        );
                        itemOpacity = gsap.utils.clamp(
                            0,
                            1,
                            Math.abs(itemOpacity - 1)
                        );
                        if (itemOpacity >= 0.9) {
                            const targetCount = $items.eq(i).data("counter");
                            if (currentNumber != targetCount) {
                                currentNumber = targetCount;
                                updateCount(currentNumber);
                            }
                        }
                        return itemOpacity;
                    },
                });
            }
            function setPos(targetPos) {
                gsap.set($items, {
                    y: (i) => {
                        return i * (itemHeight + space) + targetPos;
                    },
                    overwrite: true,
                    force3D: true,
                    onUpdate() {
                        updateOpacity();
                    },
                    modifiers: {
                        y(targetPos) {
                            const movePos = gsap.utils.wrap(
                                -(groupHeight + itemHeight + space),
                                wrapperHeight -
                                    groupHeight -
                                    (itemHeight + space),
                                parseFloat(targetPos)
                            );
                            return `${movePos}px`;
                        },
                    },
                });
            }
            const showCount = 3;
            userListAnim.to(process, {
                y: -itemSize * (showCount - 1),
                onUpdate() {
                    setPos(process.y);
                },
            });
            setPos(0);

            // resize handler
            function refresh() {
                itemHeight = $items.width();
                space = Number(
                    gsap.getProperty($items[0], "marginRight") || "0"
                );
                wrapperHeight = (itemHeight + space) * $items.length;
            }
            $(window).on("resize", refresh);
            return userListAnim;
        },
    };
}
