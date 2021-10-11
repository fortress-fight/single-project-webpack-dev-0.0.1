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
    canvasVideo: () => {
        anim: gsap.core.Tween;
        render: () => void;
    };
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
                    end: "4000px",
                },
            });
            scrollAnim.add(this.setUserList().play());
            scrollAnim.add(this.scaleVideo().play());
        },
        setUserList() {
            const userListAnim = gsap.timeline({
                paused: true,
                defaults: {
                    ease: "none",
                },
            });
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
                paused: true,
                defaults: { ease: "none" },
            });
            const videoControl = this.canvasVideo();

            // doms
            const $section = $(".module-share");
            const $moduleSharePhone = $section.find(".module-share_phone");
            const $opacityDoms = $section.find(
                ".module-header, .module-body>.state-pos_left, .module-body>.state-pos_right, .module-arrow"
            );

            // hide other opacity doms
            scaleVideoAnim.to($opacityDoms, {
                opacity: 0,
            });

            // dom
            const $previewImageBox =
                $moduleSharePhone.find(".preview-image-box");

            // size
            scaleVideoAnim.addLabel("scaleBigStart");
            scaleVideoAnim.to(
                $previewImageBox,
                {
                    borderRadius: 0,
                    width: () => window.innerWidth,
                    height: () => window.innerHeight,
                    x: () => {
                        return -$previewImageBox[0].getBoundingClientRect()
                            .left;
                    },
                    y: () => {
                        const imgTop =
                            $previewImageBox[0].getBoundingClientRect().top;
                        const coverTop = $(
                            ".layer-cover--share"
                        )[0].getBoundingClientRect().top;
                        return coverTop - imgTop;
                    },
                    onUpdate() {
                        videoControl.render();
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
                $moduleSharePhone.find(".desc-content"),
                { opacity: 1 },
                "scaleBigEnd"
            );
            scaleVideoAnim.to(
                $section.find(".wrapper-pos--center"),
                { y: 0 },
                "scaleBigEnd"
            );

            // video play
            scaleVideoAnim.add(
                videoControl.anim.timeScale(0.5).play(),
                "scaleBigEnd"
            );

            // scale min
            scaleVideoAnim.to(
                $moduleSharePhone.find(".desc-content, .wrapper-phone"),
                {
                    opacity: 0,
                }
            );

            // dom
            const $minVideoBox = $(".layer-cover--share .video-box");

            // min size
            let minBoxSize = $minVideoBox[0].getBoundingClientRect();
            let currentPreviewSize =
                $previewImageBox[0].getBoundingClientRect();
            scaleVideoAnim.call(() => {
                minBoxSize = $minVideoBox[0].getBoundingClientRect();
                currentPreviewSize =
                    $previewImageBox[0].getBoundingClientRect();
            });
            scaleVideoAnim.to($previewImageBox, {
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
                onUpdate() {
                    console.log("2");
                    videoControl.render();
                },
            });
            return scaleVideoAnim;
        },
        canvasVideo() {
            const canvas = document.getElementById(
                "hero-lightpass"
            ) as HTMLCanvasElement;
            const context = canvas.getContext("2d");

            const frameCount = 106;
            const currentFrame = (index) =>
                `${
                    ENV.IMG_PATH
                }video-fps/pexels-shvets-production-7547661${index
                    .toString()
                    .padStart(4, "0")}.jpg`;

            const imgCount = { index: 0 };

            const imageLoadPromises = [];
            for (let i = 0; i < frameCount; i++) {
                const img = new Image();
                img.src = currentFrame(i);
                imageLoadPromises.push(
                    new Promise((res, rej) => {
                        if (img.complete) {
                            res(img);
                        } else {
                            img.onload = () => {
                                res(img);
                            };
                            img.onerror = () => {
                                rej(img);
                            };
                        }
                    }).then()
                );
            }

            const renderPromise = renderImg(0);
            function renderImg(index) {
                return imageLoadPromises[index].then((img) => {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    drawImageScaled(img, context);
                });
            }
            function drawImageScaled(
                img: HTMLImageElement,
                ctx: CanvasRenderingContext2D
            ) {
                const canvas = ctx.canvas;
                const size = canvas.parentElement.getBoundingClientRect();
                canvas.width = size.width;
                canvas.height = size.height;
                const cw = size.width;
                const ch = size.height;
                const iw = img.naturalWidth;
                const ih = img.naturalHeight;
                let dw = cw;
                let dh = (ih / iw) * dw;
                let ratio = 1;
                if (dh < ch) {
                    ratio = ch / dh;
                    dw *= ratio;
                    dh *= ratio;
                }

                const centerShift_x = (cw - dw) / 2;
                const centerShift_y = (ch - dh) / 2;
                ctx.drawImage(
                    img,
                    0,
                    0,
                    iw,
                    ih,
                    centerShift_x,
                    centerShift_y,
                    dw,
                    dh
                );
            }
            return {
                anim: gsap.to(imgCount, {
                    ease: "none",
                    paused: true,
                    index: frameCount - 1,
                    snap: { index: 1 },
                    startAt: { index: 0 },
                    onUpdate() {
                        const currentIndex = imgCount.index;
                        console.log("currentIndex:", currentIndex);
                        renderPromise.then(() => {
                            return renderImg(currentIndex);
                        });
                    },
                }),
                render: () => {
                    renderPromise.then(() => {
                        return renderImg(imgCount.index);
                    });
                },
            };
        },
    };
}
