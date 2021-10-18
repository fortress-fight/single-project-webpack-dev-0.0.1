/*
 * @Description: 文档板块的手机切换
 * @Author: F-Stone
 * @Date: 2021-10-18 11:30:43
 * @LastEditTime: 2021-10-18 11:30:44
 * @LastEditors: F-Stone
 */
import { gsap } from "gsap";

const mainPhoneAnimateParam = {
    0: {
        leftAreaBg: {
            scale: 1,
        },
        introImg: {
            scale: 1,
            y: "0%",
            filter: "blur(0px)",
        },
        mainPhoneLock: {
            y: 40,
            opacity: 0,
        },
        layerCover: {
            backgroundColor: "rgb(0 0 0 / 0)",
        },
        docShow2: { y: "100%" },
        userOperBar: { y: 0, opacity: 1 },
        group: { x: 0 },
        docShow4: { y: 20, opacity: 0 },
    },
    1: {
        leftAreaBg: {
            scale: 1.1,
        },
        introImg: {
            scale: 0.85,
            y: "7%",
            filter: "blur(5px)",
        },
        mainPhoneLock: {
            y: 0,
            opacity: 1,
        },
        layerCover: {
            backgroundColor: "rgb(0 0 0 / 0)",
        },
        docShow2: { y: "100%" },
        userOperBar: { y: 0, opacity: 1 },
        group: { x: 0 },
        docShow4: { y: 20, opacity: 0 },
    },
    2: {
        leftAreaBg: {
            scale: 1,
        },
        introImg: {
            scale: 1,
            y: "0%",
            filter: "blur(0px)",
        },
        mainPhoneLock: {
            y: 40,
            opacity: 0,
        },
        layerCover: {
            backgroundColor: "rgba(0,0,0,0.20)",
        },
        docShow2: { y: "0%" },
        userOperBar: { y: "100%", opacity: 0 },
        group: { x: 0 },
        docShow4: { y: 20, opacity: 0 },
    },
    3: {
        leftAreaBg: {
            scale: 1,
        },
        introImg: {
            scale: 1,
            y: "0%",
            filter: "blur(0px)",
        },
        mainPhoneLock: {
            y: 40,
            opacity: 0,
        },
        layerCover: {
            backgroundColor: "rgb(0 0 0 / 0)",
        },
        docShow2: { y: "100%" },
        userOperBar: { y: 0, opacity: 1 },
        group: { x: "-100%" },
        docShow4: { y: 0, opacity: 1 },
    },
};
const defaultTimelineParam = {
    paused: true,
    defaults: {
        overwrite: true,
        ease: "better-elastic",
        duration: 0.36,
    },
};
function getForwardAnimate(param) {
    const anime = gsap.timeline(defaultTimelineParam);
    anime.to(
        ".module-doc .intro-img",
        {
            id: "introImg",
            ...param.introImg,
        },
        0
    );
    anime.to(
        ".module-doc_show .left_area-bg",
        {
            id: "leftAreaBg",
            duration: 0.8,
            ...param.leftAreaBg,
        },
        "-=0.45"
    );
    anime.to(
        ".module-doc .main-phone-lock",
        {
            ...param.mainPhoneLock,
        },
        0
    );
    anime.to(
        ".module-doc .layer-cover .user-oper_bar",
        {
            ...param.userOperBar,
            delay: 0.5,
        },
        0
    );
    anime.to(
        ".module-doc .layer-cover",
        {
            ...param.layerCover,
        },
        "<"
    );
    anime.to(".module-doc .layer-cover .doc-show-2", {
        ...param.docShow2,
    });
    anime.to(
        ".module-doc .group",
        {
            ...param.group,
        },
        0
    );
    anime.to(
        ".module-doc .doc-show-4",
        {
            ...param.docShow4,
            duration: 0.45,
        },
        "0.15"
    );
    return anime;
}
function getBackAnimate(param) {
    const anime = gsap.timeline(defaultTimelineParam);

    anime.to(".module-doc .doc-show-4", {
        ...param.docShow4,
        duration: 0.45,
    });
    anime.to(
        ".module-doc .group",
        {
            ...param.group,
        },
        "0.15"
    );
    anime.to(
        ".module-doc .layer-cover .user-oper_bar",
        {
            ...param.userOperBar,
        },
        "<"
    );
    anime.to(".module-doc .layer-cover .doc-show-2", {
        ...param.docShow2,
    });
    anime.to(
        ".module-doc .layer-cover",
        {
            ...param.layerCover,
        },
        "<"
    );
    anime.to(
        ".module-doc .intro-img",
        {
            id: "introImg",
            ...param.introImg,
        },
        "<"
    );
    anime.to(
        ".module-doc .main-phone-lock",
        {
            ...param.mainPhoneLock,
        },
        "<"
    );
    anime.to(
        ".module-doc_show .left_area-bg",
        {
            id: "leftAreaBg",
            ...param.leftAreaBg,
            duration: 0.8,
        },
        ">-=0.45"
    );
    return anime;
}
export default function tabPhoneAnim(
    dir: string,
    index: number,
    type?: string
): void {
    const anime = gsap.timeline(defaultTimelineParam);
    const currentParam = mainPhoneAnimateParam[index];
    if (type == "smallScreen") {
        currentParam.leftAreaBg.scale = 1;
    }
    if (dir == "1") {
        anime.add(getForwardAnimate(currentParam).play());
    } else {
        anime.add(getBackAnimate(currentParam).play());
    }
    anime.play();
}
