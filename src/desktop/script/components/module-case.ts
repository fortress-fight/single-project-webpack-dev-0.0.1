/* eslint-disable @typescript-eslint/no-unused-vars */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Impetus from "@/desktop/lib/Impetus";

export default function moduleCase(): {
    init: () => void;
    loopList: () => void;
} {
    const $section = $(".module-case");
    const $box = $section.find(".module-body");
    const $list = $section.find(".module-list");

    return {
        init() {
            this.loopList();
            return this;
        },
        loopList() {
            // autoplay config
            const groupSize = 3;
            let targetPos = 0;
            let autoplay = false;
            let pointerEnter = false;

            // dragger config
            let draggerStartPos = 0;
            let currentPost = 0;
            let isDragging = false;

            // init layout
            const itemHTML = $list.html();
            $list.html(itemHTML.repeat(groupSize));

            // get size
            const $items = $section.find(".module-item");
            let itemWidth = $items.width();
            let space = Number(gsap.getProperty($items[0], "marginRight"));

            let wrapperWidth = (itemWidth + space) * $items.length;
            const groupWidth = wrapperWidth / groupSize;

            function setPos(targetPos) {
                gsap.set($items, {
                    x: (i) => {
                        return i * (itemWidth + space) + targetPos;
                    },
                    overwrite: true,
                    force3D: true,
                    modifiers: {
                        x: (x) => {
                            const s = gsap.utils.wrap(
                                -(groupWidth + itemWidth + space),
                                wrapperWidth - groupWidth - (itemWidth + space),
                                parseFloat(x)
                            );
                            return `${s}px`;
                        },
                    },
                });
            }
            function render() {
                setPos(targetPos);
                targetPos = (targetPos % wrapperWidth) - 2;
                autoplay && requestAnimationFrame(render);
            }
            function initLoopAnim() {
                render();
                return {
                    start() {
                        if (!autoplay) {
                            autoplay = true;
                            render();
                        }
                    },
                    pause() {
                        autoplay = false;
                    },
                };
            }
            const animControl = initLoopAnim();

            ScrollTrigger.create({
                trigger: ".module-case .module-body",
                onEnter() {
                    animControl.start();
                },
                onEnterBack() {
                    animControl.start();
                },
                onLeave() {
                    animControl.pause();
                },
                onLeaveBack() {
                    animControl.pause();
                },
            });
            const enterEventName = window.PointerEvent
                ? "pointerenter"
                : "mouseenter";
            $list.on(enterEventName, () => {
                pointerEnter = true;
                animControl.pause();
            });

            const leaveEventName = window.PointerEvent
                ? "pointerleave"
                : "mouseleave";
            $list.on(leaveEventName, () => {
                pointerEnter = false;
                !isDragging && animControl.start();
            });
            new Impetus({
                source: $list[0],
                start(x) {
                    draggerStartPos = x;
                    if (isDragging) {
                        targetPos = currentPost;
                    }
                    isDragging = true;
                },
                update(x, y) {
                    currentPost =
                        targetPos + ((x - draggerStartPos) % wrapperWidth);
                    setPos(currentPost);
                },
                complete(x) {
                    isDragging = false;
                    targetPos = currentPost;
                    !pointerEnter && animControl.start();
                },
            });

            // resize handler
            function refresh() {
                itemWidth = $items.width();
                space = Number(gsap.getProperty($items[0], "marginRight"));
                wrapperWidth = (itemWidth + space) * $items.length;
            }
            $(window).on("resize", refresh);
        },
    };
}
