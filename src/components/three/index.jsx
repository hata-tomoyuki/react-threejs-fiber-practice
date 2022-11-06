import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import {angleToRadius} from '../../utils/angle.js'
import * as THREE from 'three';
import gsap from 'gsap';
import {Car} from './car';

const Three = () => {

    const orbitControlRef = useRef(null);

    useFrame((state) => {
        if(!!orbitControlRef.current) {
            const { x, y } = state.mouse;
            orbitControlRef.current.setAzimuthalAngle(-x * angleToRadius(90));
            orbitControlRef.current.setPolarAngle((y + 1) * angleToRadius(90-30));
            orbitControlRef.current.update();
        }
    })

    const ballRef = useRef(null);
    useEffect(() => {
        if(!!ballRef.current) {

            const timeline = gsap.timeline();

            timeline.to(ballRef.current.position, {
                x: 1,
                duration: 2,
                ease: 'power2.out',
            })

            timeline.to(ballRef.current.position, {
                y: 0.5,
                duration: 1,
                ease: 'bounce.out'
            }, "<")
        }
    }, [ballRef.current]);

  return (
    <>
        <PerspectiveCamera makeDefault position={[0, 1, 5]} />
        <OrbitControls
            ref={orbitControlRef}
            minPolarAngle={angleToRadius(60)}
            maxPolarAngle={angleToRadius(80)}
        />

        <mesh position={[-2, 1.5, 0]} castShadow ref={ballRef}>
            <sphereBufferGeometry args={[0.5 ,32, 32]} />
            <meshStandardMaterial color="#fff" metalness={0.6} roughness={0.2} />
        </mesh>

        <Car />

        <mesh rotation={[-(angleToRadius(90)), 0, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#fd6ee3" />
        </mesh>
        <ambientLight args={["#fff", 0.25]} />
        <spotLight args={["#fff", 1.5, 7, angleToRadius(45), 0.4]} position={[-3, 1, 0]} castShadow />

        <Environment background>
            <mesh>
                <sphereGeometry args={[50, 100, 100]} />
                <meshBasicMaterial color="#fb41d9" side={THREE.BackSide} />
            </mesh>
        </Environment>
    </>
  )
}

export default Three
