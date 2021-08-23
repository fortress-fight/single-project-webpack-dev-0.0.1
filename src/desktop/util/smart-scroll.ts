/*
 * @Description: 移动端悬浮窗阻止上层滚动
 * @Author: Fu Fei
 * @Date: 2021-04-19 10:42:02
 * @LastEditTime: 2021-04-19 10:42:04
 * @LastEditors: Fu Fei
 * @FilePath: \emit\src\script\smart-scroll.ts
 */
jQuery.event.special.touchstart = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setup: function (_, ns, handle: any) {
        this.addEventListener("touchstart", handle, {
            passive: !ns.includes("noPreventDefault"),
        });
    },
};
jQuery.event.special.touchmove = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setup: function (_, ns, handle: any) {
        this.addEventListener("touchmove", handle, {
            passive: !ns.includes("noPreventDefault"),
        });
    },
};
jQuery.event.special.wheel = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setup: function (_, ns, handle: any) {
        this.addEventListener("wheel", handle, { passive: true });
    },
};
jQuery.event.special.mousewheel = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setup: function (_, ns, handle: any) {
        this.addEventListener("mousewheel", handle, { passive: true });
    },
};
export const smartScroll = function (
    container: JQuery<HTMLElement>,
    selectorScrollable: string
): {
    destroy: () => void;
} {
    // 如果没有滚动容器选择器，或者已经绑定了滚动时间，忽略
    if (!selectorScrollable || container.data("isBindScroll")) {
        return;
    }

    // 判断当前浏览器是否需要添加该行为
    let needHackBrowser;

    const data = {
        posY: 0,
        maxscroll: 0,
        elScroll: null,
        scrollY: 0,
    };

    // 事件处理
    container.on({
        "touchstart.smartScroll": function (event) {
            const events = event.touches[0] || event;

            // 先求得是不是滚动元素或者滚动元素的子元素
            const elTarget = $(event.target);

            if (!elTarget.length) {
                return;
            }

            let elScroll;

            // 获取标记的滚动元素，自身或子元素皆可
            if (elTarget.is(selectorScrollable)) {
                elScroll = elTarget;
            } else if (
                (elScroll = elTarget.parents(selectorScrollable)).length == 0
            ) {
                elScroll = null;
            }

            if (!elScroll) {
                return;
            }

            // 当前滚动元素标记
            data.elScroll = elScroll;

            // 垂直位置标记
            data.posY = events.pageY;
            data.scrollY = elScroll.scrollTop();
            // 是否可以滚动
            data.maxscroll =
                elScroll[0].scrollHeight - elScroll[0].clientHeight;
        },
        "touchmove.smartScroll": function (event) {
            // 如果不足于滚动，则禁止触发整个窗体元素的滚动
            if (data.maxscroll <= 0 || needHackBrowser) {
                // 禁止滚动
                event.preventDefault();
            }
            // 滚动元素
            const elScroll = data.elScroll;
            // 当前的滚动高度
            const scrollTop = elScroll.scrollTop();

            // 现在移动的垂直位置，用来判断是往上移动还是往下
            const events = event.touches[0] || event;
            // 移动距离
            const distanceY = events.pageY - data.posY;

            if (needHackBrowser) {
                elScroll.scrollTop(data.scrollY - distanceY);
                elScroll.trigger("scroll");
                return;
            }

            // 上下边缘检测
            if (distanceY > 0 && scrollTop == 0) {
                // 往上滑，并且到头
                // 禁止滚动的默认行为
                event.preventDefault();
                return;
            }

            // 下边缘检测
            if (distanceY < 0 && scrollTop + 1 >= data.maxscroll) {
                // 往下滑，并且到头
                // 禁止滚动的默认行为
                event.preventDefault();
                return;
            }
        },
        "touchend.smartScroll": function () {
            data.maxscroll = 0;
        },
    });

    // 防止多次重复绑定
    container.data("isBindScroll", true);
    return {
        destroy: () => {
            container.off("touchstart.smartScroll");
            container.off("touchmove.smartScroll");
            container.off("touchend.smartScroll");
        },
    };
};
