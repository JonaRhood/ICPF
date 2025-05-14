'use strict';

import barba from '@barba/core';
import { animationEnter, animationLeave } from './animations';

import { initSwipers } from './swiper';
import { initResponsiveMenu, initSetViewportHeight } from './responsive';
import { initAboutContainer, initAboutScrollAnchor, initAboutUrlCheck } from './about-container';
import { emailContactAnimation } from './emailContactAnimation';
import { animationScroll } from './animations/animationsScroll';
import { initCookies } from './cookies';
import { buttonPrivacy } from './buttonPrivacy';
import { sermonsYT } from './sermonsYT';
import { initAnimatedCard } from './animatedCards';
import { library } from './library';

barba.hooks.once(() => {
    initCookies();
    initResponsiveMenu();
    initSetViewportHeight();
    animationScroll();
    buttonPrivacy();
})

barba.hooks.after(() => {
    initCookies();
    initResponsiveMenu();
    initSetViewportHeight();
    animationScroll();
    buttonPrivacy();
})

barba.init({
    preventRunning: true,
    schema: {
        prefix: 'data-router',
    },
    transitions: [
        {
            once({ next }) {
                animationEnter(next.container);
            },
            leave: ({ current }) => animationLeave(current.container),
            enter({ next }) {
                animationEnter(next.container);
                window.scrollTo(0, 0);
                document.documentElement.style.overflow = "";
                document.documentElement.style.paddingRight = "";
                document.querySelector("#firstNav").style.paddingRight = "";
            },
        }
    ],
    views: [{
        namespace: 'home',
        beforeEnter(data) {
            initSwipers();
            emailContactAnimation();
            initAnimatedCard();
        }
    },
    {
        namespace: 'about',
        beforeEnter(data) {
            initAboutScrollAnchor();
            initAboutContainer();
            initAboutUrlCheck();
        },
    },
    {
        namespace: 'sermons',
        beforeEnter(data) {
            sermonsYT();
        }
    },
    {
        namespace: 'library',
        beforeEnter(data) {
            library();
        }
    }]
})