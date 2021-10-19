// import type { ScrollTrigger } from "@desktop/lib/gsap-member/esm/ScrollTrigger";

interface ScrollTrigger {
    create(param: ScrollTrigger.Vars): void;
}

declare const ENV: {
    PROJECT_NAME: string;
    PUB_PATH: string;
    IMG_PATH: string;
};
