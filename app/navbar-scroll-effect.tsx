'use client';

import { useEffect } from 'react';

const REVEAL_THRESHOLD = 0.3;

export default function NavbarScrollEffect() {
    useEffect(() => {
        const navbar = document.querySelector<HTMLElement>('.navbar-scroll-reveal');
        if (!navbar) return;

        const updateVisibility = () => {
            navbar.classList.toggle('is-visible', window.scrollY >= window.innerHeight * REVEAL_THRESHOLD);
        };

        updateVisibility();
        window.addEventListener('scroll', updateVisibility, { passive: true });
        window.addEventListener('resize', updateVisibility);

        return () => {
            window.removeEventListener('scroll', updateVisibility);
            window.removeEventListener('resize', updateVisibility);
        };
    }, []);

    return null;
}
