/* eslint-disable prefer-const */
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
function getRect(dom: HTMLElement) {
    return dom.getBoundingClientRect();
}
export default function moduleShare(): {
    init: () => void;
    scaleVideo: () => {
        anim: gsap.core.Timeline;
        destroy: () => void;
    };
    canvasVideo: () => {
        anim: gsap.core.Tween;
        render: () => void;
    };
} {
    // public doms
    const $section = $(".module-share");
    let renderProgress;
    function initRenderProgress() {
        renderProgress = {
            scale: 2,
            t: 0,
            l: 0,
            w: 0,
            h: 0,
            r: 0,
        };
    }
    initRenderProgress();

    const $layerVideoPlay = $section.find(".layer--video-play");
    const $videoDesc = $layerVideoPlay.find(".desc-content");
    const $moduleSharePhone = $section.find(".module-share_phone");

    const videoTargetBox = $section.find(".preview-image-box")[0];
    const layerCoverShare = $section.find(".layer-cover--share")[0];

    /* ---------------------------------- */
    /*      user list animate helper      */
    /* ---------------------------------- */

    // dom
    const $list = $section.find(".user-list");

    const updateCount = (function userListCount() {
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
    })();

    function setUserList() {
        const userListAnim = gsap.timeline({
            paused: true,
            defaults: { ease: "none" },
        });

        // config
        const process = { y: 0 };
        const groupSize = 3;

        // init layout
        const itemHTML = $list.html();
        $(itemHTML.repeat(groupSize - 1))
            .addClass("state-clone")
            .appendTo($list);
        const $items = $section.find(".user-item");

        // cash size
        let space = 0;
        let itemHeight = 0;
        let wrapperHeight = 0;
        let groupHeight = 0;
        let itemSize = 0;

        // updateSize
        function updateSize() {
            space = Number(gsap.getProperty($items[1], "marginBottom")) || 0;
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
                const movePos = parseFloat(String(gsap.getProperty(dom, "y")));

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
            anim: userListAnim,
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
    }
    function setMinUserList() {
        // autoplay config
        const groupSize = 3;
        let targetPos = 0;

        // dragger config
        let draggerStartPos = 0;
        let currentPos = 0;
        let isDragging = false;

        // init layout
        const itemHTML = $list.html();
        $(itemHTML.repeat(groupSize - 1))
            .addClass("state-clone")
            .appendTo($list);

        // get size
        const $items = $section.find(".user-item");
        let itemWidth = $items.width();
        let space = Number(gsap.getProperty($items[0], "marginRight") || "0");
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

                const movePos = parseFloat(String(gsap.getProperty(dom, "x")));

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
            space = Number(gsap.getProperty($items[0], "marginRight") || "0");
            itemOutWidth = itemWidth + space;
            wrapperWidth = itemOutWidth * $items.length;
        }
        $(window).on("resize.loopCase", refresh);

        let scrollAnim = gsap.timeline({
            paused: true,
            defaults: { ease: "none" },
            scrollTrigger: {
                invalidateOnRefresh: true,
                trigger: $section.find(".count-box"),
                start: "bottom bottom",
                scrub: 0.5,
            },
        });
        let scrollVal = { x: 0 };
        scrollAnim.to(scrollVal, {
            x: -itemOutWidth * 3,
            onUpdate() {
                setPos(scrollVal.x);
            },
        });
        return {
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
    }

    /* ---------------------------------- */
    /*             video scale            */
    /* ---------------------------------- */

    return {
        init() {
            const $pinContent = $section.find(".module_content-box");
            ScrollTrigger.matchMedia({
                "(min-width: 735px)": () => {
                    const scrollAnim = gsap.timeline({
                        paused: true,
                        defaults: { ease: "none" },
                        scrollTrigger: {
                            invalidateOnRefresh: true,
                            trigger: $pinContent,
                            start: () => {
                                return `center ${
                                    (window.outerHeight - window.navDistance) /
                                    2
                                }`;
                            },
                            scrub: true,
                            pin: $pinContent,
                            end: "4000px",
                        },
                    });
                    const scaleVideoControl = this.scaleVideo();
                    const setUserListControl = setUserList();
                    scrollAnim.add(setUserListControl.anim.play());
                    scrollAnim.add(scaleVideoControl.anim.play());
                    return function () {
                        initRenderProgress();
                        setUserListControl.destroy();
                        scaleVideoControl.destroy();
                    };
                },
                "(max-width: 734px)": () => {
                    let userListControl = setMinUserList();
                    const scrollAnim = gsap.timeline({
                        paused: true,
                        defaults: { ease: "none" },
                        scrollTrigger: {
                            invalidateOnRefresh: true,
                            trigger: $pinContent,
                            start: () => {
                                return `center ${
                                    (window.outerHeight - window.navDistance) /
                                    2
                                }`;
                            },
                            scrub: 0.5,
                            pin: true,
                            end: "1500px",
                        },
                    });
                    const scaleVideoControl = this.scaleVideo();
                    scrollAnim.add(scaleVideoControl.anim.play());
                    return () => {
                        initRenderProgress();
                        userListControl.destroy();
                        scaleVideoControl.destroy();
                    };
                },
            });
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
            scaleVideoAnim.to($opacityDoms, { opacity: 0 });

            // big size
            scaleVideoAnim.addLabel("scaleBigStart");

            scaleVideoAnim.fromTo(
                renderProgress,
                {
                    w: () => getRect(videoTargetBox).width,
                    h: () => getRect(videoTargetBox).height,
                    l: () =>
                        getRect(videoTargetBox).left -
                        getRect(layerCoverShare).left,
                    t: () =>
                        getRect(videoTargetBox).top -
                        getRect(layerCoverShare).top,
                    r: () =>
                        String(
                            gsap.getProperty(videoTargetBox, "borderRadius")
                        ),
                },
                {
                    ease: "power3.inOut",
                    duration: 0.8,
                    r: 0,
                    scale: 1,
                    w: () => window.innerWidth,
                    h: () => window.outerHeight - window.navDistance,
                    l: 0,
                    t: 0,
                    snap: {
                        l: 1,
                        t: 1,
                        w: 1,
                        h: 1,
                    },
                    onUpdate() {
                        videoControl.render();
                        gsap.set($section.find(".video-btn"), {
                            x: renderProgress.l + renderProgress.w / 2,
                            y: renderProgress.t + renderProgress.h / 2,
                        });
                    },
                },
                0
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
            scaleVideoAnim.to(layerCoverShare, { opacity: 1 }, "scaleBigEnd");
            scaleVideoAnim.to(layerCoverShare, { opacity: 1 }, "scaleBigEnd");
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
            const minVideoBox = $(".layer-cover--share .video-box")[0];

            // min size
            scaleVideoAnim.to(renderProgress, {
                delay: 0.1,
                r: () => {
                    return parseInt($(minVideoBox).css("borderRadius"));
                },
                l: () => {
                    return (
                        getRect(minVideoBox).left -
                        getRect(layerCoverShare).left
                    );
                },
                t: () => {
                    return (
                        getRect(minVideoBox).top - getRect(layerCoverShare).top
                    );
                },
                w: () => getRect(minVideoBox).width,
                h: () => getRect(minVideoBox).height,
                snap: {
                    l: 1,
                    t: 1,
                    w: 1,
                    h: 1,
                },
                onUpdate() {
                    videoControl.render();
                },
            });
            ScrollTrigger.addEventListener("refresh", videoControl.render);
            return {
                anim: scaleVideoAnim,
                destroy() {
                    ScrollTrigger.removeEventListener(
                        "refresh",
                        videoControl.render
                    );
                },
            };
        },
        canvasVideo() {
            // dom
            const canvas = document.getElementById(
                "video-play-canvas"
            ) as HTMLCanvasElement;
            const context = canvas.getContext("2d");

            const frameCount = 96;
            const currentFrame = (index) =>
                `${ENV.IMG_PATH}video-fps-1/video-fps-0000${index
                    .toString()
                    .padStart(3, "0")}.jpg`;

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
                const layerCoverShareSize = getRect(layerCoverShare);
                canvas.width = layerCoverShareSize.width;
                canvas.height = layerCoverShareSize.height;
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
                dh < ch && (clipH *= ch / dh);
                dw < cw && (clipW *= cw / dw);
                drawRoundRect(ctx, dl, dt, cw, ch, dr || 0);
                context.clip();

                // draw image
                let ratio = scale;
                let dImgL = dl,
                    dImgT = dt;
                dh < ch && (ratio = (ch / dh) * scale);
                dw < cw && (ratio = (cw / dw) * scale);
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
