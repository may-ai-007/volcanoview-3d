import React, { useRef, useMemo, useState, useEffect, Suspense, forwardRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mountain, Eye, EyeOff, Loader2 } from 'lucide-react';

/* ============================================
   Configuration
   ============================================ */
// GLB模型路径映射 - 生成模型后替换
const GLB_MODELS = {
  before: '/models/volcano-calm.glb',
  during: '/models/volcano-erupting.glb',
  after: '/models/volcano-after.glb',
  extension: '/models/volcano-calm.glb', // 扩展知识复用平静火山
  crossSection: '/models/volcano-cross-section.glb',
};

/* ============================================
   ErrorBoundary - 错误边界（修复 setState-during-render）
   ============================================ */
class ModelErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.warn('GLB model load error:', error.message);
    // 使用 setTimeout 延迟调用，避免在渲染阶段触发父组件 setState
    if (this.props.onError) {
      setTimeout(() => this.props.onError(), 0);
    }
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

/* ============================================
   GLBModelInner - 加载并渲染 GLB 模型
   ============================================ */
const GLBModelInner = forwardRef(function GLBModelInner({ url }, ref) {
  const gltf = useLoader(GLTFLoader, url);
  const scene = useMemo(() => {
    const cloned = gltf.scene.clone(true);
    // 自动居中和缩放模型
    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 5 / maxDim;

    cloned.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);
    cloned.scale.setScalar(scale);
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return cloned;
  }, [gltf]);

  useEffect(() => {
    return () => {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach(m => m.dispose());
          } else {
            child.material?.dispose();
          }
        }
      });
    };
  }, [scene]);

  return <primitive ref={ref} object={scene} />;
});

/* ============================================
   GLBModelLoader - 加载Tripo生成的GLB模型
   ============================================ */
function GLBModelLoader({ url, currentStage }) {
  const groupRef = useRef();

  // 根据阶段调整模型效果
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // 喷发中轻微震动
    if (currentStage === 'during') {
      groupRef.current.position.x = Math.sin(t * 3) * 0.02;
      groupRef.current.position.z = Math.cos(t * 3.7) * 0.02;
    } else {
      groupRef.current.position.x = 0;
      groupRef.current.position.z = 0;
    }
  });

  return (
    <group ref={groupRef}>
      <Suspense fallback={null}>
        <GLBModelInner url={url} />
      </Suspense>
    </group>
  );
}

/* ============================================
   ProceduralVolcano - 程序化火山（fallback）
   ============================================ */
function ProceduralVolcano({ viewMode, currentStage }) {
  const meshRef = useRef();
  const isCrossSection = viewMode === 'crossSection';

  const volcanoGeometry = useMemo(() => {
    const points = [];
    const segments = 40;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      let radius, y;
      if (t < 0.7) {
        const slope = Math.pow(1 - t / 0.7, 0.6);
        radius = 3.5 * slope + 0.3;
        y = t * 4.0;
      } else if (t < 0.85) {
        const localT = (t - 0.7) / 0.15;
        radius = 0.3 * (1 - localT * 0.7);
        y = 2.8 + localT * 1.2;
      } else {
        const localT = (t - 0.85) / 0.15;
        if (localT < 0.3) {
          radius = 0.09 + localT * 0.15;
          y = 4.0 + localT * 0.15;
        } else if (localT < 0.5) {
          radius = 0.135 - (localT - 0.3) * 0.1;
          y = 4.045 + (localT - 0.3) * 0.05;
        } else {
          const craterT = (localT - 0.5) / 0.5;
          radius = 0.115 * (1 - craterT * 0.3);
          y = 4.055 - craterT * 0.4;
        }
      }
      points.push(new THREE.Vector2(Math.max(0.001, radius), y));
    }
    return new THREE.LatheGeometry(points, 64);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    if (currentStage === 'during') {
      meshRef.current.position.x = Math.sin(t * 3) * 0.02;
      meshRef.current.position.z = Math.cos(t * 3.7) * 0.02;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh geometry={volcanoGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          color={isCrossSection ? '#8B7355' : '#6B5B4F'}
          roughness={0.85}
          metalness={0.05}
          transparent={isCrossSection}
          opacity={isCrossSection ? 0.4 : 1}
          side={isCrossSection ? THREE.DoubleSide : THREE.FrontSide}
        />
      </mesh>
    </group>
  );
}

/* ============================================
   LavaPool - 火山口岩浆池
   ============================================ */
function LavaPool({ currentStage }) {
  const meshRef = useRef();
  const isActive = currentStage === 'during' || currentStage === 'before';
  const intensity = currentStage === 'during' ? 2.0 : currentStage === 'before' ? 0.8 : 0.3;

  useFrame((state) => {
    if (meshRef.current && isActive) {
      const t = state.clock.elapsedTime;
      meshRef.current.material.emissiveIntensity = intensity + Math.sin(t * 1.5) * 0.3;
    }
  });

  if (!isActive) return null;

  return (
    <mesh ref={meshRef} position={[0, 3.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[0.1, 32]} />
      <meshStandardMaterial
        color="#ff4500"
        emissive="#ff3300"
        emissiveIntensity={intensity}
        toneMapped={false}
      />
    </mesh>
  );
}

/* ============================================
   MagmaChamber - 地下岩浆库（剖面模式）
   ============================================ */
function MagmaChamber({ viewMode, currentStage }) {
  const meshRef = useRef();
  const isActive = viewMode === 'crossSection';
  const glowIntensity = currentStage === 'during' ? 2.5 : 1.5;

  useFrame((state) => {
    if (meshRef.current && isActive) {
      const t = state.clock.elapsedTime;
      meshRef.current.material.emissiveIntensity = glowIntensity + Math.sin(t * 0.8) * 0.5;
      meshRef.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.03);
    }
  });

  if (!isActive) return null;

  return (
    <mesh ref={meshRef} position={[0, -1.5, 0]}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshStandardMaterial
        color="#ff6600"
        emissive="#ff4400"
        emissiveIntensity={glowIntensity}
        transparent
        opacity={0.85}
        toneMapped={false}
      />
    </mesh>
  );
}

/* ============================================
   Conduit - 岩浆通道（剖面模式）
   ============================================ */
function Conduit({ viewMode }) {
  if (viewMode !== 'crossSection') return null;

  return (
    <mesh position={[0, 1.5, 0]}>
      <cylinderGeometry args={[0.15, 0.2, 5, 16]} />
      <meshStandardMaterial
        color="#ff5500"
        emissive="#ff3300"
        emissiveIntensity={1.2}
        transparent
        opacity={0.7}
        toneMapped={false}
      />
    </mesh>
  );
}

/* ============================================
   Ground - 地面
   ============================================ */
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <circleGeometry args={[12, 64]} />
      <meshStandardMaterial color="#4a7c59" roughness={0.9} metalness={0} />
    </mesh>
  );
}

/* ============================================
   CraterLight - 火山口动态光源
   ============================================ */
function CraterLight({ currentStage }) {
  const lightRef = useRef();
  const intensity = currentStage === 'during' ? 3.0 : currentStage === 'before' ? 0.8 : 0.2;

  useFrame((state) => {
    if (lightRef.current) {
      const t = state.clock.elapsedTime;
      lightRef.current.intensity = intensity + Math.sin(t * 2) * 0.3;
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 4.5, 0]}
      color="#ff6633"
      intensity={intensity}
      distance={10}
      decay={2}
    />
  );
}

/* ============================================
   LavaFlow - 熔岩流（已移除：GLB模型自带熔岩效果，
   程序化圆柱体在真实模型上显示为多余的棍状物）
   ============================================ */

/* ============================================
   ParticleSystem3D - 3D粒子效果（修复 buffer resize）
   使用 useRef 保持 buffer 引用稳定，避免 Three.js buffer resize 错误
   ============================================ */
function ParticleSystem3D({ currentStage }) {
  const pointsRef = useRef();
  const MAX_PARTICLES = 200;

  // 使用 useRef 保持 buffer 引用不变，避免 Three.js 报 buffer resize 错误
  const buffersRef = useRef({
    positions: new Float32Array(MAX_PARTICLES * 3),
    colors: new Float32Array(MAX_PARTICLES * 3),
    sizes: new Float32Array(MAX_PARTICLES),
    velocities: new Float32Array(MAX_PARTICLES * 3),
  });

  // 阶段切换时重新初始化粒子数据
  useEffect(() => {
    const { positions, colors, sizes, velocities } = buffersRef.current;
    const count = currentStage === 'during' ? 200 : currentStage === 'before' ? 30 : currentStage === 'after' ? 50 : 0;

    // 先把所有粒子隐藏
    for (let i = 0; i < MAX_PARTICLES; i++) {
      positions[i * 3 + 1] = -100;
      sizes[i] = 0;
      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;
    }

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      if (currentStage === 'during') {
        positions[i3] = (Math.random() - 0.5) * 0.5;
        positions[i3 + 1] = 4.0 + Math.random() * 0.5;
        positions[i3 + 2] = (Math.random() - 0.5) * 0.5;

        const type = Math.random();
        if (type < 0.4) {
          colors[i3] = 1; colors[i3 + 1] = 0.3 + Math.random() * 0.3; colors[i3 + 2] = 0;
          sizes[i] = 3 + Math.random() * 4;
        } else if (type < 0.7) {
          colors[i3] = 1; colors[i3 + 1] = 0.6 + Math.random() * 0.3; colors[i3 + 2] = 0;
          sizes[i] = 2 + Math.random() * 3;
        } else {
          colors[i3] = 0.5; colors[i3 + 1] = 0.5; colors[i3 + 2] = 0.5;
          sizes[i] = 4 + Math.random() * 6;
        }

        velocities[i3] = (Math.random() - 0.5) * 0.06;
        velocities[i3 + 1] = 0.03 + Math.random() * 0.08;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.06;
      } else if (currentStage === 'before') {
        positions[i3] = (Math.random() - 0.5) * 2;
        positions[i3 + 1] = -1 + Math.random() * 2;
        positions[i3 + 2] = (Math.random() - 0.5) * 2;
        colors[i3] = 1; colors[i3 + 1] = 0.4; colors[i3 + 2] = 0;
        sizes[i] = 2 + Math.random() * 2;
        velocities[i3] = (Math.random() - 0.5) * 0.005;
        velocities[i3 + 1] = 0.005 + Math.random() * 0.01;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.005;
      } else if (currentStage === 'after') {
        positions[i3] = (Math.random() - 0.5) * 1;
        positions[i3 + 1] = 4.0 + Math.random() * 2;
        positions[i3 + 2] = (Math.random() - 0.5) * 1;
        colors[i3] = 0.7; colors[i3 + 1] = 0.7; colors[i3 + 2] = 0.7;
        sizes[i] = 5 + Math.random() * 8;
        velocities[i3] = (Math.random() - 0.5) * 0.01;
        velocities[i3 + 1] = 0.01 + Math.random() * 0.02;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
      }
    }

    // 标记需要更新
    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.geometry.attributes.color.needsUpdate = true;
    }
  }, [currentStage]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const { positions, velocities } = buffersRef.current;

    for (let i = 0; i < MAX_PARTICLES; i++) {
      const i3 = i * 3;

      // 跳过隐藏的粒子
      if (positions[i3 + 1] < -50) continue;

      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      // 重置超出范围的粒子
      if (positions[i3 + 1] > 10 || positions[i3 + 1] < -3) {
        if (currentStage === 'during') {
          positions[i3] = (Math.random() - 0.5) * 0.5;
          positions[i3 + 1] = 4.0 + Math.random() * 0.5;
          positions[i3 + 2] = (Math.random() - 0.5) * 0.5;
        } else {
          positions[i3] = (Math.random() - 0.5) * 1;
          positions[i3 + 1] = 4.0;
          positions[i3 + 2] = (Math.random() - 0.5) * 1;
        }
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const { positions, colors, sizes } = buffersRef.current;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={MAX_PARTICLES}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={MAX_PARTICLES}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={MAX_PARTICLES}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ============================================
   HotspotLabel - 3D空间中的热点标签
   ============================================ */
function HotspotLabel({ hotspot, isSelected, onClick }) {
  const [hovered, setHovered] = useState(false);

  const positions = {
    crater: [0, 4.5, 0],
    'magma-chamber': [0, -1.5, 0.8],
    conduit: [0.5, 2, 0.5],
    'ash-cloud': [0, 6, 0],
    'lava-flow': [1.5, 2.5, 0.8],
    'cooling-rock': [1.2, 2, 0.5],
  };

  const pos = positions[hotspot.id] || [0, 3, 1];

  return (
    <Html position={pos} center distanceFactor={8}>
      <div
        className={`hotspot-label-3d ${isSelected ? 'selected' : ''} ${hovered ? 'hovered' : ''}`}
        onClick={(e) => { e.stopPropagation(); onClick(hotspot); }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="hotspot-label-3d-dot" />
        <span className="hotspot-label-3d-text">{hotspot.name}</span>
      </div>
    </Html>
  );
}

/* ============================================
   SmartVolcanoModel - 智能模型加载器
   根据是否有GLB文件选择加载真实模型或程序化模型
   ============================================ */
function SmartVolcanoModel({ currentStage, viewMode }) {
  const [useGLB, setUseGLB] = useState(true);

  // 使用 key 强制在阶段切换时重新挂载 GLB 加载器
  const modelKey = viewMode === 'crossSection'
    ? `crossSection`
    : currentStage;

  const modelUrl = viewMode === 'crossSection'
    ? GLB_MODELS.crossSection
    : GLB_MODELS[currentStage];

  if (useGLB) {
    return (
      <ModelErrorBoundary
        onError={() => setUseGLB(false)}
        fallback={<ProceduralVolcano viewMode={viewMode} currentStage={currentStage} />}
      >
        <Suspense fallback={<ProceduralVolcano viewMode={viewMode} currentStage={currentStage} />}>
          <GLBModelLoader key={modelKey} url={modelUrl} currentStage={currentStage} />
        </Suspense>
      </ModelErrorBoundary>
    );
  }

  // Fallback: 程序化模型
  return (
    <>
      <ProceduralVolcano viewMode={viewMode} currentStage={currentStage} />
      <LavaPool currentStage={currentStage} />
      {viewMode === 'crossSection' && (
        <>
          <MagmaChamber viewMode={viewMode} currentStage={currentStage} />
          <Conduit viewMode={viewMode} />
        </>
      )}
    </>
  );
}

/* ============================================
   SceneContent - All 3D objects
   ============================================ */
function SceneContent({ currentStage, viewMode, hotspots, selectedHotspot, onHotspotClick, showLabels }) {
  return (
    <>
      {/* Lighting - Studio setup */}
      <ambientLight intensity={0.6} color="#e8e0f0" />
      <directionalLight
        position={[5, 8, 4]}
        intensity={1.2}
        color="#fff5e6"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight
        position={[-4, 2, -3]}
        intensity={0.4}
        color="#b0c4ff"
      />

      {/* Volcano Model - GLB or Procedural */}
      <SmartVolcanoModel currentStage={currentStage} viewMode={viewMode} />

      {/* Ground */}
      <Ground />

      {/* Dynamic crater light */}
      <CraterLight currentStage={currentStage} />

      {/* Particles */}
      <ParticleSystem3D currentStage={currentStage} />

      {/* Hotspot labels */}
      {showLabels && hotspots.map((hotspot) => (
        <HotspotLabel
          key={hotspot.id}
          hotspot={hotspot}
          isSelected={selectedHotspot?.id === hotspot.id}
          onClick={onHotspotClick}
        />
      ))}

      {/* Controls */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.08}
        minDistance={4}
        maxDistance={15}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={0.2}
      />
    </>
  );
}

/* ============================================
   VolcanoScene - Main exported component
   ============================================ */
function VolcanoScene({
  currentStage,
  viewMode,
  hotspots,
  selectedHotspot,
  onHotspotClick,
  showLabels,
}) {
  const stageLabels = {
    before: '喷发前 - 地下正在积聚力量',
    during: '喷发中 - 壮观的火山喷发',
    after: '喷发后 - 大地重新塑造',
    extension: '扩展知识 - 危险与益处',
  };

  return (
    <div className="volcano-canvas-container">
      <Canvas
        shadows
        camera={{ position: [6, 5, 6], fov: 45, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: 'linear-gradient(180deg, #87CEEB 0%, #B0C4DE 40%, #D2B48C 100%)' }}
      >
        <fog attach="fog" args={['#c8d6e5', 12, 25]} />
        <SceneContent
          currentStage={currentStage}
          viewMode={viewMode}
          hotspots={hotspots}
          selectedHotspot={selectedHotspot}
          onHotspotClick={onHotspotClick}
          showLabels={showLabels}
        />
      </Canvas>

      {/* Stage badge overlay */}
      <div className="scene-overlay">
        <div className="scene-stage-badge">
          {stageLabels[currentStage] || ''}
        </div>
        {viewMode === 'crossSection' && (
          <div className="scene-crosssection-badge">
            <Eye size={13} />
            剖面视图
          </div>
        )}
      </div>
    </div>
  );
}

export default VolcanoScene;
