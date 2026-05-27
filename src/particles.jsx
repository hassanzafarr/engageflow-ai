import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Particles({ density = 1 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = () => mount.clientWidth;
    const h = () => mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w() / h(), 0.1, 1000);
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w(), h());
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const COUNT = Math.floor(220 * density);
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const homePositions = new Float32Array(COUNT * 3);

    const cEm = new THREE.Color(0x10b981);
    const cVi = new THREE.Color(0x8b5cf6);
    const cWhite = new THREE.Color(0xe9d5ff);

    for (let i = 0; i < COUNT; i++) {
      const r = 40 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.55;
      const z = r * Math.cos(phi) - 10;
      positions[i*3+0] = x; positions[i*3+1] = y; positions[i*3+2] = z;
      homePositions[i*3+0] = x; homePositions[i*3+1] = y; homePositions[i*3+2] = z;
      velocities[i*3+0] = (Math.random() - .5) * 0.02;
      velocities[i*3+1] = (Math.random() - .5) * 0.02;
      velocities[i*3+2] = (Math.random() - .5) * 0.02;
      const mix = Math.random();
      const c = mix < .45 ? cEm.clone() : mix < .9 ? cVi.clone() : cWhite.clone();
      colors[i*3+0] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b;
      sizes[i] = 1.2 + Math.random() * 2.4;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geom.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = spriteCanvas.height = 64;
    const sctx = spriteCanvas.getContext('2d');
    const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.25, 'rgba(255,255,255,0.85)');
    grad.addColorStop(0.6, 'rgba(255,255,255,0.18)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(spriteCanvas);

    const mat = new THREE.PointsMaterial({
      size: 1.6, map: tex, vertexColors: true, transparent: true,
      depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
    });
    const points = new THREE.Points(geom, mat);
    scene.add(points);

    const MAX_LINES = 700;
    const linePositions = new Float32Array(MAX_LINES * 2 * 3);
    const lineColors = new Float32Array(MAX_LINES * 2 * 3);
    const lineGeom = new THREE.BufferGeometry();
    lineGeom.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeom.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.35,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeom, lineMat);
    scene.add(lines);

    const onResize = () => {
      camera.aspect = w() / h(); camera.updateProjectionMatrix();
      renderer.setSize(w(), h());
    };
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize); ro.observe(mount);

    let raf, t0 = performance.now();
    const homeVec = new THREE.Vector3();
    const tick = () => {
      const dt = Math.min(40, performance.now() - t0); t0 = performance.now();
      const pos = geom.attributes.position.array;
      const lpos = lineGeom.attributes.position.array;
      const lcol = lineGeom.attributes.color.array;

      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3;
        homeVec.set(homePositions[ix], homePositions[ix+1], homePositions[ix+2]);
        const dxh = homeVec.x - pos[ix];
        const dyh = homeVec.y - pos[ix+1];
        const dzh = homeVec.z - pos[ix+2];
        velocities[ix]   += dxh * 0.0008;
        velocities[ix+1] += dyh * 0.0008;
        velocities[ix+2] += dzh * 0.0008;
        velocities[ix]   += (Math.sin(t0 * 0.0003 + i) * 0.0006);
        velocities[ix+1] += (Math.cos(t0 * 0.00037 + i * 1.3) * 0.0006);
        velocities[ix]   *= 0.96;
        velocities[ix+1] *= 0.96;
        velocities[ix+2] *= 0.96;
        pos[ix]   += velocities[ix];
        pos[ix+1] += velocities[ix+1];
        pos[ix+2] += velocities[ix+2];
      }
      geom.attributes.position.needsUpdate = true;

      let li = 0;
      const step = Math.max(1, Math.floor(COUNT / 90));
      for (let a = 0; a < COUNT && li < MAX_LINES; a += 1) {
        for (let b = a + 1; b < COUNT && li < MAX_LINES; b += step) {
          const ax = pos[a*3], ay = pos[a*3+1], az = pos[a*3+2];
          const bx = pos[b*3], by = pos[b*3+1], bz = pos[b*3+2];
          const dx = ax - bx, dy = ay - by, dz = az - bz;
          const d2 = dx*dx + dy*dy + dz*dz;
          const TH = 70;
          if (d2 < TH) {
            const alpha = 1 - d2 / TH;
            lpos[li*6+0] = ax; lpos[li*6+1] = ay; lpos[li*6+2] = az;
            lpos[li*6+3] = bx; lpos[li*6+4] = by; lpos[li*6+5] = bz;
            lcol[li*6+0] = colors[a*3]   * alpha;
            lcol[li*6+1] = colors[a*3+1] * alpha;
            lcol[li*6+2] = colors[a*3+2] * alpha;
            lcol[li*6+3] = colors[b*3]   * alpha;
            lcol[li*6+4] = colors[b*3+1] * alpha;
            lcol[li*6+5] = colors[b*3+2] * alpha;
            li++;
          }
        }
      }
      for (let k = li; k < MAX_LINES; k++) {
        lpos[k*6+0] = lpos[k*6+1] = lpos[k*6+2] = 0;
        lpos[k*6+3] = lpos[k*6+4] = lpos[k*6+5] = 0;
      }
      lineGeom.setDrawRange(0, li * 2);
      lineGeom.attributes.position.needsUpdate = true;
      lineGeom.attributes.color.needsUpdate = true;

      points.rotation.y += 0.0008;
      points.rotation.x = Math.sin(performance.now() * 0.0001) * 0.06;
      lines.rotation.copy(points.rotation);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
      try { mount.removeChild(renderer.domElement); } catch (e) {}
      geom.dispose(); lineGeom.dispose(); mat.dispose(); lineMat.dispose(); tex.dispose();
      renderer.dispose();
    };
  }, [density]);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" />;
}
