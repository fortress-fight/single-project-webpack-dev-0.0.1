import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Impetus from "@/desktop/lib/Impetus";

export default function moduleCase(): {
    init: () => void;
    loopList: () => void;
} {
    const $section = $(".module-case");
    const $list = $section.find(".module-list");

    return {
        init() {
            this.loopList();
            return this;
        },
        loopList() {
            function runningAnim() {
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
                $(itemHTML.repeat(groupSize - 1))
                    .addClass("state-clone")
                    .appendTo($list);

                // get size
                const $items = $section.find(".module-item");
                let itemWidth = $items.width();
                let space = Number(
                    gsap.getProperty($items[0], "marginRight") || "0"
                );

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
                                    wrapperWidth -
                                        groupWidth -
                                        (itemWidth + space),
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
                    ? "pointerenter."
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
                const draggerImpetus = new Impetus({
                    source: $list[0],
                    start(x) {
                        draggerStartPos = x;
                        if (isDragging) {
                            targetPos = currentPost;
                        }
                        isDragging = true;
                    },
                    update(x) {
                        currentPost =
                            targetPos + ((x - draggerStartPos) % wrapperWidth);
                        setPos(currentPost);
                    },
                    complete() {
                        isDragging = false;
                        targetPos = currentPost;
                        !pointerEnter && animControl.start();
                    },
                });

                // resize handler
                function refresh() {
                    itemWidth = $items.width();
                    space = Number(
                        gsap.getProperty($items[0], "marginRight") || "0"
                    );
                    wrapperWidth = (itemWidth + space) * $items.length;
                }
                $(window).on("resize.loopCase", refresh);
                return () => {
                    // stop autoplay
                    pointerEnter = false;
                    animControl.pause();

                    // remove eventListener
                    $list.off();
                    $(window).off("resize.loopCase");

                    // reset pos
                    draggerImpetus.destroy();
                    $items.filter(".state-clone").remove();
                    setTimeout(() => {
                        gsap.set($items, {
                            x: 0,
                            y: 0,
                        });
                    });
                };
            }
            ScrollTrigger.matchMedia({
                "(min-width: 735px)": runningAnim,
                "(max-width: 734px)": function () {
                    //
                },
            });
        },
    };
}
