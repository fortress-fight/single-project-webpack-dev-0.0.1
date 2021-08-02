/*
 * @Description: 站点管理类
 * @Author: Fu Fei
 * @Date: 2021-03-24 14:09:39
 * @LastEditTime: 2021-03-24 14:09:40
 * @LastEditors: Fu Fei
 * @FilePath: \emit\src\script\site-manage.ts
 */
interface TYPE_EVENT_CALLBACK {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...args: any[]): void;
}
interface TYPE_EVENT {
    name: string;
    desc: string;
    detail: Map<string, TYPE_EVENT_CALLBACK[]>;
}

const getType = (b: unknown) =>
    Object.prototype.toString.call(b).slice(8, -1).toLowerCase();
export default class SiteManage {
    name = "";
    initEnd = false;
    readonly preTask: string[] = [];
    readonly defaultTask: string[] = [];
    readonly disableTask: string[] = [];

    getTask(
        taskName: string,
        disableTask: string[] = []
    ): () => Promise<unknown> {
        if (!(taskName in this) || typeof this[taskName] != "function") {
            throw new Error(`不存在 ${taskName} 方法`);
        }
        if ([...this.disableTask, ...disableTask].includes(taskName)) {
            return () => undefined;
        }
        return this[taskName].bind(this);
    }

    events: Map<string, TYPE_EVENT> = new Map();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    afterInit(...arg: unknown[]): void {
        return;
    }
    init(param?: {
        preTask?: string[];
        disableTask?: string[];
        otherTask: string[];
    }): this {
        if (this.initEnd) return this;
        const _param = Object.assign(
            {
                preTask: [],
                disableTask: [],
                otherTask: [],
            },
            param || {}
        );
        const preTaskList = [];
        const preTasks = [...this.preTask, ..._param.preTask];
        preTasks.forEach((taskName) => {
            try {
                const taskResult = this.getTask(taskName)();
                if (getType(taskResult) == "promise") {
                    preTaskList.push(taskResult);
                } else {
                    preTaskList.push(Promise.resolve(taskResult));
                }
            } catch (error) {
                preTaskList.push(Promise.reject(error));
            }
        });
        Promise.all(preTaskList)
            .then((res) => {
                const result = {};
                preTasks.forEach((v, i) => {
                    result[v] = res[i];
                });
                this.defaultTask
                    .concat(_param.otherTask)
                    .forEach((taskName) => {
                        result[taskName] = this.getTask(taskName)();
                    });
                return Promise.resolve(result);
            })
            .then((res) => {
                this.initEnd = true;
                return this.afterInit(res);
            })
            .catch((err) => {
                console.log("err:", err);
            });
        return this;
    }
    one(name: string, callback: TYPE_EVENT_CALLBACK): void {
        const eventDetail = name.split(".");
        const eventName = eventDetail[0];
        const callbackWrapper = (...param) => {
            this.off(name, callbackWrapper);
            callback(...param);
        };

        if (this.events.has(eventName)) {
            const originEmit = this.events.get(eventName);
            if (originEmit.detail.get(name)) {
                originEmit.detail.get(name).push(callbackWrapper);
            } else {
                originEmit.detail.set(name, [callbackWrapper]);
            }
        } else {
            const newEvent: TYPE_EVENT = {
                name: eventName,
                desc: "",
                detail: new Map().set(name, [callbackWrapper]),
            };
            this.events.set(eventName, newEvent);
        }
    }
    bind(name: string, callback: TYPE_EVENT_CALLBACK): void {
        const eventDetail = name.split(".");
        const eventName = eventDetail[0];

        if (this.events.has(eventName)) {
            const originEmit = this.events.get(eventName);
            if (originEmit.detail.get(name)) {
                originEmit.detail.get(name).push(callback);
            } else {
                originEmit.detail.set(name, [callback]);
            }
        } else {
            const newEvent: TYPE_EVENT = {
                name: eventName,
                desc: "",
                detail: new Map().set(name, [callback]),
            };
            this.events.set(eventName, newEvent);
        }
    }
    off(name?: string, callback?: TYPE_EVENT_CALLBACK): void {
        if (!name) {
            this.events.forEach((item) => {
                item.detail.clear();
                item = null;
            });
            this.events.clear();
            return;
        }
        const eventDetail = name.split(".");
        const eventName = eventDetail[0];

        if (this.events.has(eventName)) {
            const originEmit = this.events.get(eventName);
            if (callback) {
                const originCallbacks = originEmit.detail.get(name);
                originCallbacks.forEach((fn, i) => {
                    if (fn == callback) {
                        originCallbacks[i] = undefined;
                    }
                });
            } else if (eventName == name) {
                originEmit.detail.clear();
            } else {
                originEmit.detail.delete(eventName);
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    trigger(name: string, data?: any[]): void {
        const eventDetail = name.split(".");
        const eventName = eventDetail[0];

        if (!this.events.has(eventName)) return;
        if (name == eventName) {
            this.events.get(eventName).detail.forEach((taskGroup) => {
                taskGroup.forEach((fn) => {
                    fn && fn.apply(this || window, data as []);
                });
            });
        } else {
            const detail = this.events.get(eventName).detail;
            if (!detail.has(name)) return;
            detail.get(name).forEach((fn) => {
                fn && fn.apply(this || window, data as []);
            });
        }
    }
    destroy(): void {
        this.off();
    }
}
