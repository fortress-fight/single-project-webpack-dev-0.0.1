/* eslint-disable @typescript-eslint/no-unused-vars */
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
    scaleVideo: () => gsap.core.Timeline;
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
                    invalidateOnRefresh: true,
                    trigger: $pinContent,
                    scrub: true,
                    pin: true,
                    pinSpacing: "12000px",
                },
            });
            scrollAnim.add(this.setUserList());
            scrollAnim.add(this.scaleVideo());
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

            // set size var
            let space = 0;
            let itemHeight = 0;
            let wrapperHeight = 0;
            let groupHeight = 0;
            let itemSize = 0;

            function calcSize() {
                space =
                    Number(gsap.getProperty($items[1], "marginBottom")) || 0;
                itemHeight = $items.height();
                itemSize = itemHeight + space;
                wrapperHeight = itemSize * $items.length;
                groupHeight = wrapperHeight / groupSize;
            }
            calcSize();

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
                calcSize();
            }
            $(window).on("resize", refresh);
            return userListAnim;
        },
        scaleVideo() {
            const scaleVideoAnim = gsap.timeline({
                defaults: {
                    ease: "none",
                },
            });

            // doms
            const $section = $(".module-share");
            const $opacityDoms = $section.find(
                ".module-header, .module-body>.state-pos_left, .module-body>.state-pos_right, .module-arrow"
            );

            // hide other opacity doms
            scaleVideoAnim.to($opacityDoms, {
                opacity: 0,
            });

            // dom
            const $previewImage = $section.find(
                ".preview-image .preview-image-box"
            );

            // size
            scaleVideoAnim.addLabel("scaleBigStart");
            scaleVideoAnim.to(
                $previewImage,
                {
                    borderRadius: 0,
                    width: () => window.innerWidth,
                    height: () => window.innerHeight,
                    x: () => {
                        return -$previewImage[0].getBoundingClientRect().left;
                    },
                    y: () => {
                        const imgTop =
                            $previewImage[0].getBoundingClientRect().top;
                        const coverTop = $(
                            ".layer-cover--share"
                        )[0].getBoundingClientRect().top;
                        return coverTop - imgTop;
                    },
                },
                0
            );
            scaleVideoAnim.addLabel("scaleBigEnd");

            // play btn
            scaleVideoAnim.to(
                $section.find(".video-btn"),
                {
                    scale: 4,
                    opacity: 0,
                },
                0
            );
            scaleVideoAnim.to(
                $section.find(".video-btn-arrow"),
                { opacity: 0 },
                0
            );

            // text-content
            scaleVideoAnim.to(
                $section.find(".layer-cover--share"),
                { opacity: 1 },
                "scaleBigEnd"
            );
            scaleVideoAnim.to(
                $section.find(".layer-cover--share"),
                { opacity: 1 },
                "scaleBigEnd"
            );
            scaleVideoAnim.to(
                $section.find(".desc-content"),
                { opacity: 1 },
                "scaleBigEnd"
            );
            scaleVideoAnim.to(
                $section.find(".wrapper-pos--center"),
                { y: 0 },
                "scaleBigEnd"
            );

            // scale min
            scaleVideoAnim.to($section.find(".desc-content, .wrapper-phone"), {
                opacity: 0,
            });

            // dom
            const $minVideoBox = $(".layer-cover--share .video-box");

            // min size
            let minBoxSize = $minVideoBox[0].getBoundingClientRect();
            let currentPreviewSize = $previewImage[0].getBoundingClientRect();
            scaleVideoAnim.call(() => {
                minBoxSize = $minVideoBox[0].getBoundingClientRect();
                currentPreviewSize = $previewImage[0].getBoundingClientRect();
            });
            // const countWidth = gsap.to($previewImage.find(".image"), {
            //     pause: true,
            //     immediateRender: false,
            //     width: () => minBoxSize.width,
            //     height: () => minBoxSize.height,
            // });
            scaleVideoAnim.to($previewImage, {
                borderRadius: () => {
                    return parseInt($minVideoBox.css("borderRadius"));
                },
                x: () => {
                    return "+=" + (minBoxSize.left - currentPreviewSize.left);
                },
                y: () => {
                    return "+=" + (minBoxSize.top - currentPreviewSize.top);
                },
                snap: { x: 1, y: 1 },
                width: () => minBoxSize.width,
                height: () => minBoxSize.height,
            });
            // scaleVideoAnim.add(
            //     gsap.to($previewImage.find(".image"), {
            //         borderRadius: 20,
            //         x: () => minBoxSize.left,
            //         y: () => minBoxSize.top,
            //         width: () => minBoxSize.width,
            //         height: () => minBoxSize.height,
            //         startAt: {
            //             width: "100%",
            //             height: "100%",
            //         },
            //         onUpdate() {
            //             console.log(this.progress());
            //         },
            //     })
            // );
            return scaleVideoAnim;
        },
    };
}
