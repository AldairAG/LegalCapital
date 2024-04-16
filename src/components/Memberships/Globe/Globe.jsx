import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Globe = () => {
  const containerRef = useRef();

  useEffect(() => {
    // Create scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Load PNG texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('../../../Assets/Images/Baners_jpg/imagelogin.png'); // Replace with your image path

    // Set texture and material properties
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      color: 0xffffff, // Optional base color (affects texture blending)
      opacity: 1, // Optional opacity (0-1 for transparency)
    });

    // Create sphere geometry and mesh
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Render function
    const render = () => {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    };

    // Initial render
    render();

    // Cleanup on unmount
    return () => {
      scene.remove(sphere);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} />;
};

export default Globe;
