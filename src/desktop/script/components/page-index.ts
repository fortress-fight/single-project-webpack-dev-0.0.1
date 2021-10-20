/*
 * @Description: 首页的执行类
 * @Author: F-Stone
 * @Date: 2021-08-05 11:23:16
 * @LastEditTime: 2021-08-05 11:23:18
 * @LastEditors: F-Stone
 */
import SiteManage from "./site-manage";

import initPropaganda from "./inner-components/module-propaganda";
import initDesign from "./inner-components/module-design";
import initShow from "./inner-components/module-show";
import initContact from "./inner-components/module-contact";
import initDoc from "./inner-components/module-doc";
import initShare from "./inner-components/module-share";
import initExtension from "./inner-components/module-extension";
import initStatistic from "./inner-components/module-statistic";
import initCustomer from "./inner-components/module-customer";
import initCase from "./inner-components/module-case";
import initWeiXinCode from "./inner-components/module-weixin-code";

export default class IndexPage extends SiteManage {
    otherTask = [
        "propagandaModule",
        "designModule",
        "showModule",
        "docModule",
        "shareModule",
        "extensionModule",
        "statisticModule",
        "customerModule",
        "caseModule",
        "contactModule",
        "weixinCode",
        "videoPlayObserver",
    ];
    propagandaModule(): void {
        if (!$(".module-propaganda")[0]) return;
        initPropaganda().init();
    }
    designModule(): void {
        if (!$(".module-design").length) return;
        initDesign().init();
    }
    showModule(): void {
        if (!$(".module-show").length) return;
        initShow().init();
    }
    docModule(): void {
        if (!$(".module-doc").length) return;
        initDoc(this.vsScroll).init();
    }
    shareModule(): void {
        if (!$(".module-share").length) return;
        initShare().init();
    }
    extensionModule(): void {
        if (!$(".module-extension").length) return;
        initExtension().init();
    }
    statisticModule(): void {
        if (!$(".module-statistic").length) return;
        initStatistic().init();
    }
    customerModule(): void {
        if (!$(".module-customer").length) return;
        initCustomer().init();
    }
    caseModule(): void {
        if (!$(".module-case").length) return;
        initCase().init();
    }
    contactModule(): void {
        if (!$(".module-contact").length) return;
        initContact().init();
    }
    weixinCode(): void {
        if (!$(".btn-open_QR")[0]) return;
        initWeiXinCode(this.vsScroll).init();
    }
    videoPlayObserver(): void {
        const $videoModules = $(
            ".module-design, .module-show, .module-propaganda"
        );
        if (window.IntersectionObserver) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        const $videos = $(entry.target).find(
                            "video"
                        ) as JQuery<HTMLVideoElement>;

                        if (entry.intersectionRatio > 0) {
                            $videos.each((i, dom) => {
                                dom.play();
                            });
                        } else {
                            $videos.each((i, dom) => {
                                dom.pause();
                            });
                        }
                    });
                },
                { threshold: [0, 1] }
            );
            $videoModules.each((i, dom) => {
                observer.observe(dom);
            });
        } else {
            const $videos = $videoModules.find(
                "video"
            ) as JQuery<HTMLVideoElement>;
            $videos.each((i, dom) => {
                dom.play();
            });
        }
    }
}
