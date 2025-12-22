'use client'

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import frag from './shader/bgFrag.glsl?raw';
import { Timestamp } from 'next/dist/server/lib/cache-handlers/types';

export default function Scene() {
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => { if (typeof window !== undefined) {
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera();
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);
        renderer.domElement.style.width = '100vw';
        renderer.domElement.style.height = '100vh';
        containerRef.current?.appendChild(renderer.domElement);
        camera.position.z = 5;
        
        const geo = new THREE.PlaneGeometry(2, 2);
        const mat = new THREE.ShaderMaterial({
            fragmentShader: frag,
            uniforms: {
                time: { value: 0.0 },
                res: { value: new THREE.Vector3(
                    document.documentElement.clientWidth,
                    document.documentElement.clientHeight,
                    1.0
                )}, 
                defaultCol: { value: new THREE.Vector3(
                    0.00000,
                    0.03501,
                    0.11233,
                )},
                yOffset: { value: -window.scrollY * 0.5 / document.documentElement.clientHeight },
            },

        });
        const plane = new THREE.Mesh(geo, mat);
        scene.add(plane);

        function resize() {
            const w = document.documentElement.clientWidth;
            const h = document.documentElement.clientHeight;
            const canvas = renderer.domElement;
            canvas.style.width = '100vw';
            canvas.style.height = '100vh';
            renderer.setSize(w, h, false);

            camera.updateProjectionMatrix();
            mat.uniforms.res.value.set(w, h, 1.0);
        }

        function scroll() {
            mat.uniforms.yOffset.value = -window.scrollY * 0.5 / document.documentElement.clientHeight;
        }

        let then: Timestamp = 0;
        function renderScene(time: Timestamp) {
            const delta = (time-then) * 0.001;
            then = time;
            mat.uniforms.time.value += delta;
            renderer.render(scene, camera);
            requestAnimationFrame(renderScene);
        }

        renderScene(0);

        window.addEventListener('resize', resize);
        window.addEventListener('scroll', scroll);
        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('scroll', scroll);
        };
    }}, [])
    return (
    <div ref={containerRef} className="fixed z-[-1]" suppressHydrationWarning={true}>
        
    </div>
    );
}