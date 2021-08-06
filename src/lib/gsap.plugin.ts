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
import { ScrollTrigger } from "./gsap-member/esm/ScrollTrigger";

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
