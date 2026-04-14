import { Canvas } from "@react-three/fiber";
import { Planet } from "../components/Planet";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { Suspense } from "react"; // 👈 Import Suspense

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  const text = `Building production-ready web applications and intelligent ML systems to solve real-world problems.`;

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden"
    >
      <AnimatedHeaderSection
        subTitle={"Machine Learning Engineer | Web/App Developer "}
        title={"Dhiraj\u00A0Gogoi"}
        text={text}
        textColor={"text-black"}
      />

      <figure
        className="absolute inset-0 -z-50 opacity-95"
        style={{ width: "100%", height: "100dvh" }} // Use 100dvh for better mobile scrolling
      >
        <Canvas
          shadows
          camera={{
            position: [0, 0, -10],
            fov: isMobile ? 22 : 17.5,
            near: 1,
            far: 20,
          }}
        >
          <ambientLight intensity={0.55} />

          {/* 👇 Wrap async 3D elements in Suspense to prevent crashes 👇 */}
          <Suspense fallback={null}>
            <Float speed={0.8} rotationIntensity={0.6} floatIntensity={1.2}>
              <Planet scale={isMobile ? 0.72 : 1} />
            </Float>

            <Environment resolution={256}>
              <group rotation={[-Math.PI / 3, 4, 1]}>
                <Lightformer
                  form="circle"
                  intensity={2.2}
                  position={[0, 5, -9]}
                  scale={10}
                />
                <Lightformer
                  form="circle"
                  intensity={1.8}
                  position={[0, 3, 1]}
                  scale={10}
                />
                <Lightformer
                  form="circle"
                  intensity={1.6}
                  position={[-5, -1, -1]}
                  scale={10}
                />
                <Lightformer
                  form="circle"
                  intensity={2}
                  position={[10, 1, 0]}
                  scale={16}
                />
              </group>
            </Environment>
          </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};

export default Hero;