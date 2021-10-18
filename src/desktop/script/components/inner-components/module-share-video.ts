/*
 * @Description: 动态板块的视频展示处理
 * @Author: F-Stone
 * @Date: 2021-10-18 12:06:42
 * @LastEditTime: 2021-10-18 12:06:43
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

function getCanvasVideoCtrl() {
    // dom
    const $section = $(".module-share");
    const layerCoverShare = $section.find(".layer-cover--share")[0];
    const canvas = document.getElementById(
        "video-play-canvas"
    ) as HTMLCanvasElement;
    const context = canvas.getContext("2d");

    const frameCount = 96;
    const currentFrame = (index) => {
        return (
            ENV.IMG_PATH +
            "video-fps-1/video-fps-0000" +
            index.toString().padStart(3, "0") +
            ".jpg"
        );
    };

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
            })
                .then()
                .catch(() => {
                    //
                })
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
        const { scale, w: cw, h: ch, t: dt, l: dl, r: dr } = renderProgress;
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
        getAnim: () => {
            return gsap.to(imgCount, {
                ease: "none",
                paused: true,
                index: frameCount - 1,
                snap: { index: 1 },
                startAt: { index: 0 },
                onUpdate() {
                    renderImg(imgCount.index);
                },
            });
        },
        render: () => {
            renderImg(imgCount.index);
        },
    };
}
export default function getScaleVideoCtrl(): {
    getAnime: () => {
        anime: gsap.core.Timeline;
        destroy: () => void;
    };
    initRenderProgress: () => void;
} {
    // doms
    const $section = $(".module-share");

    const $layerVideoPlay = $section.find(".layer--video-play");
    const $videoDesc = $layerVideoPlay.find(".desc-content");
    const $moduleSharePhone = $section.find(".module-share_phone");
    const videoTargetBox = $section.find(".preview-image-box")[0];
    const layerCoverShare = $section.find(".layer-cover--share")[0];
    const $opacityDoms = $section.find(
        ".module-header, .module-body>.state-pos_left, .module-body>.state-pos_right, .module-arrow"
    );
    const minVideoBox = $(".layer-cover--share .video-box")[0];
    ScrollTrigger.saveStyles($opacityDoms);
    ScrollTrigger.saveStyles($section.find(".video-btn"));
    ScrollTrigger.saveStyles(layerCoverShare);
    ScrollTrigger.saveStyles($videoDesc);
    ScrollTrigger.saveStyles(
        $moduleSharePhone.find(".wrapper-phone").add($videoDesc)
    );

    const videoCtrl = getCanvasVideoCtrl();
    return {
        getAnime: () => {
            const anime = gsap.timeline({
                paused: true,
                defaults: { ease: "none" },
            });

            // hide other opacity doms
            anime.to($opacityDoms, { opacity: 0 });
            // hide other opacity doms
            anime.to($opacityDoms, { opacity: 0 });

            // big size
            anime.addLabel("scaleBigStart");

            anime.fromTo(
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
                    duration: 0.6,
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
                        videoCtrl.render();
                        gsap.set($section.find(".video-btn"), {
                            x: renderProgress.l + renderProgress.w / 2,
                            y: renderProgress.t + renderProgress.h / 2,
                        });
                    },
                },
                0
            );

            anime.addLabel("scaleBigEnd", "-=0.4");

            // play btn
            anime.to(
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
            anime.to(layerCoverShare, { opacity: 1 }, "scaleBigEnd");
            anime.to(layerCoverShare, { opacity: 1 }, "scaleBigEnd");
            anime.to($videoDesc, { opacity: 1 }, "scaleBigEnd");
            anime.to(
                $section.find(".wrapper-pos--center"),
                { y: 0 },
                "scaleBigEnd"
            );

            // video play
            anime.add(videoCtrl.getAnim().timeScale(0.2).play(), "scaleBigEnd");

            // scale min
            anime.to(
                $moduleSharePhone.find(".wrapper-phone").add($videoDesc),
                { opacity: 0 },
                "-=0.5"
            );

            // min size
            anime.to(renderProgress, {
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
                    videoCtrl.render();
                },
            });
            ScrollTrigger.addEventListener("refresh", videoCtrl.render);
            return {
                anime,
                destroy() {
                    ScrollTrigger.removeEventListener(
                        "refresh",
                        videoCtrl.render
                    );
                },
            };
        },
        initRenderProgress,
    };
}
