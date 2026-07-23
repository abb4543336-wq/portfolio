import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground({ variant = "hero" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Dynamic bokeh & film dust particles
    const particleCount = variant === "hero" ? 1800 : 900;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const palette = [
      new THREE.Color("#ff5a5f"),
      new THREE.Color("#c471ed"),
      new THREE.Color("#12c2e9"),
      new THREE.Color("#34d399"),
    ];
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Camera Lens Ring 1 (Outer Wireframe Aperture)
    const ring1Geo = new THREE.TorusGeometry(2.2, 0.08, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x12c2e9,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    scene.add(ring1);

    // Camera Lens Ring 2 (Inner Aperture Blades geometry)
    const ring2Geo = new THREE.TorusKnotGeometry(1.5, 0.25, 180, 24, 2, 5);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xc471ed,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    scene.add(ring2);

    // 3D Viewfinder Frame Mesh
    const boxGeo = new THREE.BoxGeometry(3.6, 2.2, 0.4);
    const boxMat = new THREE.MeshBasicMaterial({
      color: 0xff5a5f,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const box = new THREE.Mesh(boxGeo, boxMat);
    box.position.set(-3, 1, -2);
    scene.add(box);

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    let raf;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      points.rotation.y = t * 0.04;
      points.rotation.x = t * 0.015;

      ring1.rotation.z = t * 0.2;
      ring1.rotation.y = t * 0.15;

      ring2.rotation.x = t * 0.35;
      ring2.rotation.y = t * 0.45;

      box.rotation.x = t * 0.25;
      box.rotation.y = t * 0.3;

      camera.position.x += (mouse.x * 0.9 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 0.6 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      boxGeo.dispose();
      boxMat.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [variant]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 -z-10"
      aria-hidden="true"
    />
  );
}
