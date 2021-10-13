/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Description:
 * @Author: F-Stone
 * @Date: 2021-10-02 14:13:29
 * @LastEditTime: 2021-10-02 14:13:31
 * @LastEditors: F-Stone
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stringify } from "querystring";
const drawRoundRect = function (ctx, x, y, w, h, r) {
    const min_size = Math.min(w, h);
    if (r > min_size / 2) r = min_size / 2;
    // 开始绘制
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    return ctx;
};
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
    const renderProgress = {
        scale: 2,
        t: 0,
        l: 0,
        w: 0,
        h: 0,
        r: 0,
    };

    const $playground = $section.find(".wrapper-module_content");
    const $layerVideoPlay = $section.find(".layer--video-play");
    const $videoPlayBox = $section.find(".video-play-box");
    const $videoDesc = $layerVideoPlay.find(".desc-content");
    const $videoTargetBox = $section.find(".preview-image-box");
    const $layerCoverShare = $section.find(".layer-cover--share");

    const $moduleSharePhone = $section.find(".module-share_phone");
    const $previewImageBox = $moduleSharePhone.find(".preview-image-box");
    const $originImgBox = $previewImageBox.parent();

    // init-pos
    function setVideoPos() {
        const targetBoxSize = $videoTargetBox[0].getBoundingClientRect();
        const layerCoverShareSize = $layerCoverShare[0].getBoundingClientRect();
        const targetRadius = String(
            gsap.getProperty($videoTargetBox[0], "borderRadius")
        );
        const targetTop = targetBoxSize.top - layerCoverShareSize.top;
        const targetLeft = targetBoxSize.left - layerCoverShareSize.left;

        // gsap.set($videoPlayBox, {
        //     top: targetTop,
        //     left: targetLeft,
        //     width: targetBoxSize.width,
        //     height: targetBoxSize.height,
        //     borderRadius: targetRadius,
        //     snap: {
        //         top: 1,
        //         left: 1,
        //         width: 1,
        //         height: 1,
        //         borderRadius: 1,
        //     },
        // });
        gsap.set(renderProgress, {
            t: targetTop,
            l: targetLeft,
            w: targetBoxSize.width,
            h: targetBoxSize.height,
            r: targetRadius,
        });
    }

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
            setVideoPos();
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
                $items.each((i, dom) => {
                    const movePos = parseFloat(
                        String(gsap.getProperty(dom, "y"))
                    );

                    let percent = gsap.utils.clamp(
                        0,
                        1,
                        gsap.utils.normalize(0, itemSize * 2, Math.abs(movePos))
                    );
                    percent = Math.abs(percent - 1);
                    const itemOpacity = percent;
                    const itemScale = 0.85 + percent * 0.15;
                    if (percent >= 0.9) {
                        const targetCount = $(dom).data("counter");
                        if (currentNumber != targetCount) {
                            currentNumber = targetCount;
                            updateCount(currentNumber);
                        }
                    }
                    gsap.set(dom, {
                        opacity: itemOpacity,
                        scale: itemScale,
                    });
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
                y() {
                    return -itemSize * (showCount - 1);
                },
                onUpdate() {
                    setPos(process.y);
                },
            });
            ScrollTrigger.addEventListener("refresh", () => {
                setPos(process.y);
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
            const $opacityDoms = $section.find(
                ".module-header, .module-body>.state-pos_left, .module-body>.state-pos_right, .module-arrow"
            );

            // hide other opacity doms
            scaleVideoAnim.to($opacityDoms, {
                opacity: 0,
            });

            // size
            scaleVideoAnim.addLabel("scaleBigStart");
            scaleVideoAnim.fromTo(
                $previewImageBox,
                {
                    width: () => {
                        return $originImgBox.width();
                    },
                    height: () => {
                        return $originImgBox.height();
                    },
                },
                {
                    ease: "power3.inOut",
                    duration: 0.8,
                    borderRadius: 0,
                    width: () => window.innerWidth,
                    height: () => window.outerHeight - window.navDistance,
                    x: () => {
                        return -$originImgBox[0].getBoundingClientRect().left;
                    },
                    y: () => {
                        const imgTop =
                            $originImgBox[0].getBoundingClientRect().top;
                        const coverTop =
                            $layerCoverShare[0].getBoundingClientRect().top;
                        return coverTop - imgTop;
                    },
                    snap: { x: 1, y: 1 },
                },
                0
            );

            scaleVideoAnim.to(
                renderProgress,
                {
                    ease: "power3.inOut",
                    scale: 1,
                    duration: 0.8,
                    onUpdate() {
                        setVideoPos();
                        videoControl.render();
                    },
                },
                "<"
            );
            scaleVideoAnim.addLabel("scaleBigEnd");

            // play btn
            scaleVideoAnim.to(
                $section.find(".video-btn"),
                {
                    ease: "expo.inOut",
                    scale: 2,
                    duration: 0.4,
                    opacity: 0,
                },
                0
            );

            // text-content
            scaleVideoAnim.to($layerCoverShare, { opacity: 1 }, "scaleBigEnd");
            scaleVideoAnim.to($layerCoverShare, { opacity: 1 }, "scaleBigEnd");
            scaleVideoAnim.to($videoDesc, { opacity: 1 }, "scaleBigEnd");
            scaleVideoAnim.to(
                $section.find(".wrapper-pos--center"),
                { y: 0 },
                "scaleBigEnd"
            );

            // video play
            scaleVideoAnim.add(
                videoControl.anim.timeScale(0.2).play(),
                "scaleBigEnd"
            );

            // scale min
            scaleVideoAnim.to(
                $moduleSharePhone.find(".wrapper-phone").add($videoDesc),
                { opacity: 0 },
                "-=0.5"
            );

            // dom
            const $minVideoBox = $(".layer-cover--share .video-box");

            // min size
            let minBoxSize;
            let originBoxSize;
            function updateSize() {
                setVideoPos();
                minBoxSize = $minVideoBox[0].getBoundingClientRect();
                originBoxSize = $originImgBox[0].getBoundingClientRect();
            }
            updateSize();
            scaleVideoAnim.call(updateSize);
            $(window).on("resize", updateSize);

            scaleVideoAnim.to($previewImageBox, {
                borderRadius: () => {
                    return parseInt($minVideoBox.css("borderRadius"));
                },
                x: () => {
                    return minBoxSize.left - originBoxSize.left;
                },
                y: () => {
                    return minBoxSize.top - originBoxSize.top;
                },
                snap: { x: 1, y: 1 },
                width: () => minBoxSize.width,
                height: () => minBoxSize.height,
                onUpdate() {
                    setVideoPos();
                    videoControl.render();
                },
            });
            ScrollTrigger.addEventListener("refresh", () => {
                videoControl.render();
            });
            return scaleVideoAnim;
        },
        canvasVideo() {
            // dom
            const canvas = document.getElementById(
                "video-play-canvas"
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

            renderImg(0);
            function renderImg(index) {
                imageLoadPromises[index].then((img) => {
                    drawImageScaled(img, context);
                });
            }
            function drawImageScaled(
                img: HTMLImageElement,
                ctx: CanvasRenderingContext2D
            ) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                const {
                    scale,
                    w: cw,
                    h: ch,
                    t: dt,
                    l: dl,
                    r: dr,
                } = renderProgress;
                const iw = 1920;
                const ih = 1080;
                let dw = cw;
                let dh = (ih / iw) * dw;

                // draw clip box
                let clipW = dw;
                let clipH = dh;
                if (dh < ch) {
                    clipH *= ch / dh;
                }
                if (dw < cw) {
                    clipW *= cw / dw;
                }
                drawRoundRect(ctx, dl, dt, cw, ch, dr || 0);
                context.clip();

                // draw image
                let ratio = scale;
                let dImgL = dl,
                    dImgT = dt;
                if (dh < ch) {
                    ratio = (ch / dh) * scale;
                }
                if (dw < cw) {
                    ratio = (cw / dw) * scale;
                }
                dw *= ratio;
                dh *= ratio;
                dImgL -= (dw - clipW) / 2;
                dImgT -= (dh - clipH) / 2;
                ctx.drawImage(img, 0, 0, iw, ih, dImgL, dImgT, dw, dh);
            }
            return {
                anim: gsap.to(imgCount, {
                    ease: "none",
                    paused: true,
                    index: frameCount - 1,
                    snap: { index: 1 },
                    startAt: { index: 0 },
                    onUpdate() {
                        renderImg(imgCount.index);
                    },
                }),
                render: () => {
                    renderImg(imgCount.index);
                },
            };
        },
    };
}
