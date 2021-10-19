/*
 * @Description:
 * @Author: Fu Fei
 * @Date: 2021-03-20 19:08:21
 * @LastEditTime: 2021-03-20 19:08:21
 * @LastEditors: Fu Fei
 * @FilePath: \emit\src\lib\script\gsap.plugin.ts
 */

import { gsap } from "gsap";
import { CustomEase } from "./gsap-member/esm/CustomEase.js";
// import { ScrollToPlugin } from "./gsap-member/esm/ScrollToPlugin.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(CustomEase);
// gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

// CustomEase.create("scroll", "0.25, 0.00, 0.35, 1.00");
// CustomEase.create("better-ease-out", "0.17, 0.84, 0.44, 1");
// CustomEase.create("better-ease-in-out", "0.645,0.045,0.355,1");
CustomEase.create("better-elastic", "0.77, 0, 0.175, 1");
// CustomEase.create("dragger-elastic", "0.18, 0.89, 0.32, 1.28");
// CustomEase.create("easeOutQuart", "0.25, 1, 0.5, 1");
CustomEase.create("lineEffect", "0.23, 1, 0.32, 1");
// CustomEase.create("test-es", "0.17, 0.67, 0.83, 0.67");
// CustomEase.create("test-es", "M0,0 C0.286,0 0.838,0.073 1,0.166 1.132,0.242 1.432,0.504 1,1");
CustomEase.create("test-es", "M0,0 C0.286,0 0.792,0 0.9,0.1 1,0.217 1,0.489 1,1");
CustomEase.create("test-es-1", "M0,0 C0.46,0 0.652,0.066 0.754,0.148 0.903,0.268 0.966,0.464 1,1");
