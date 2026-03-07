import { Link } from "react-router-dom";
import React, { useEffect, useRef, useCallback, useState } from "react";
import * as THREE from "three";

/* ─────────────────────────────────────────────
   Game constants
   ───────────────────────────────────────────── */
const minTileIndex = -8;
const maxTileIndex = 8;
const tilesPerRow = maxTileIndex - minTileIndex + 1;
const tileSize = 42;

/* ─────────────────────────────────────────────
   Textures (canvas-based)
   ───────────────────────────────────────────── */
function makeTexture(width, height, rects) {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "rgba(0,0,0,0.6)";
  rects.forEach((r) => ctx.fillRect(r.x, r.y, r.w, r.h));
  return new THREE.CanvasTexture(c);
}

const carFrontTex  = makeTexture(40, 80, [{ x: 0, y: 10, w: 30, h: 60 }]);
const carBackTex   = makeTexture(40, 80, [{ x: 10, y: 10, w: 30, h: 60 }]);
const carRightTex  = makeTexture(110, 40, [{ x: 10, y: 0, w: 50, h: 30 }, { x: 70, y: 0, w: 30, h: 30 }]);
const carLeftTex   = makeTexture(110, 40, [{ x: 10, y: 10, w: 50, h: 30 }, { x: 70, y: 10, w: 30, h: 30 }]);
const truckFrontTex = makeTexture(30, 30, [{ x: 5, y: 0, w: 10, h: 30 }]);
const truckRightTex = makeTexture(25, 30, [{ x: 15, y: 5, w: 10, h: 10 }]);
const truckLeftTex  = makeTexture(25, 30, [{ x: 15, y: 15, w: 10, h: 10 }]);

/* ─────────────────────────────────────────────
   Helper builders
   ───────────────────────────────────────────── */
function randomElement(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function Wheel(x) {
  const w = new THREE.Mesh(
    new THREE.BoxGeometry(12, 33, 12),
    new THREE.MeshLambertMaterial({ color: 0x333333, flatShading: true })
  );
  w.position.x = x;
  w.position.z = 6;
  return w;
}

function Car(idx, dir, color) {
  const car = new THREE.Group();
  car.position.x = idx * tileSize;
  if (!dir) car.rotation.z = Math.PI;
  const main = new THREE.Mesh(new THREE.BoxGeometry(60, 30, 15), new THREE.MeshLambertMaterial({ color, flatShading: true }));
  main.position.z = 12; main.castShadow = true; main.receiveShadow = true;
  car.add(main);
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(33, 24, 12), [
    new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true, map: carBackTex }),
    new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true, map: carFrontTex }),
    new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true, map: carRightTex }),
    new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true, map: carLeftTex }),
    new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true }),
    new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true }),
  ]);
  cabin.position.x = -6; cabin.position.z = 25.5; cabin.castShadow = true; cabin.receiveShadow = true;
  car.add(cabin);
  car.add(Wheel(18));
  car.add(Wheel(-18));
  return car;
}

function Truck(idx, dir, color) {
  const t = new THREE.Group();
  t.position.x = idx * tileSize;
  if (!dir) t.rotation.z = Math.PI;
  const cargo = new THREE.Mesh(new THREE.BoxGeometry(70, 35, 35), new THREE.MeshLambertMaterial({ color: 0xb4c6fc, flatShading: true }));
  cargo.position.x = -15; cargo.position.z = 25; cargo.castShadow = true; cargo.receiveShadow = true;
  t.add(cargo);
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(30, 30, 30), [
    new THREE.MeshLambertMaterial({ color, flatShading: true, map: truckFrontTex }),
    new THREE.MeshLambertMaterial({ color, flatShading: true }),
    new THREE.MeshLambertMaterial({ color, flatShading: true, map: truckLeftTex }),
    new THREE.MeshLambertMaterial({ color, flatShading: true, map: truckRightTex }),
    new THREE.MeshPhongMaterial({ color, flatShading: true }),
    new THREE.MeshPhongMaterial({ color, flatShading: true }),
  ]);
  cabin.position.x = 35; cabin.position.z = 20; cabin.castShadow = true; cabin.receiveShadow = true;
  t.add(cabin);
  t.add(Wheel(37)); t.add(Wheel(5)); t.add(Wheel(-35));
  return t;
}

function Grass(rowIndex) {
  const g = new THREE.Group();
  g.position.y = rowIndex * tileSize;
  const sec = (c) => new THREE.Mesh(new THREE.BoxGeometry(tilesPerRow * tileSize, tileSize, 3), new THREE.MeshLambertMaterial({ color: c }));
  const m = sec(0xbaf455); m.receiveShadow = true; g.add(m);
  const l = sec(0x99c846); l.position.x = -tilesPerRow * tileSize; g.add(l);
  const r = sec(0x99c846); r.position.x = tilesPerRow * tileSize; g.add(r);
  return g;
}

function Road(rowIndex) {
  const rd = new THREE.Group();
  rd.position.y = rowIndex * tileSize;
  const sec = (c) => new THREE.Mesh(new THREE.PlaneGeometry(tilesPerRow * tileSize, tileSize), new THREE.MeshLambertMaterial({ color: c }));
  const m = sec(0x454a59); m.receiveShadow = true; rd.add(m);
  const l = sec(0x393d49); l.position.x = -tilesPerRow * tileSize; rd.add(l);
  const r = sec(0x393d49); r.position.x = tilesPerRow * tileSize; rd.add(r);
  return rd;
}

function Tree(tileIndex, height) {
  const tree = new THREE.Group();
  tree.position.x = tileIndex * tileSize;
  const trunk = new THREE.Mesh(new THREE.BoxGeometry(15, 15, 20), new THREE.MeshLambertMaterial({ color: 0x4d2926, flatShading: true }));
  trunk.position.z = 10; tree.add(trunk);
  const crown = new THREE.Mesh(new THREE.BoxGeometry(30, 30, height), new THREE.MeshLambertMaterial({ color: 0x7aa21d, flatShading: true }));
  crown.position.z = height / 2 + 20; crown.castShadow = true; crown.receiveShadow = true;
  tree.add(crown);
  return tree;
}

function Player() {
  const p = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(15, 15, 20), new THREE.MeshLambertMaterial({ color: "white", flatShading: true }));
  body.position.z = 10; body.castShadow = true; body.receiveShadow = true; p.add(body);
  const cap = new THREE.Mesh(new THREE.BoxGeometry(2, 4, 2), new THREE.MeshLambertMaterial({ color: 0xf0619a, flatShading: true }));
  cap.position.z = 21; cap.castShadow = true; cap.receiveShadow = true; p.add(cap);
  const container = new THREE.Group();
  container.add(p);
  return container;
}

/* ─────────────────────────────────────────────
   Row generation
   ───────────────────────────────────────────── */
function genForest() {
  const occ = new Set();
  const trees = Array.from({ length: 4 }, () => {
    let ti; do { ti = THREE.MathUtils.randInt(minTileIndex, maxTileIndex); } while (occ.has(ti)); occ.add(ti);
    return { tileIndex: ti, height: randomElement([20, 45, 60]) };
  });
  return { type: "forest", trees };
}

function genCarLane() {
  const direction = randomElement([true, false]);
  const speed = randomElement([125, 156, 188]);
  const occ = new Set();
  const vehicles = Array.from({ length: 3 }, () => {
    let ti; do { ti = THREE.MathUtils.randInt(minTileIndex, maxTileIndex); } while (occ.has(ti));
    occ.add(ti - 1); occ.add(ti); occ.add(ti + 1);
    return { initialTileIndex: ti, color: randomElement([0xa52523, 0xbdb638, 0x78b14b]) };
  });
  return { type: "car", direction, speed, vehicles };
}

function genTruckLane() {
  const direction = randomElement([true, false]);
  const speed = randomElement([125, 156, 188]);
  const occ = new Set();
  const vehicles = Array.from({ length: 2 }, () => {
    let ti; do { ti = THREE.MathUtils.randInt(minTileIndex, maxTileIndex); } while (occ.has(ti));
    [-2, -1, 0, 1, 2].forEach((d) => occ.add(ti + d));
    return { initialTileIndex: ti, color: randomElement([0xa52523, 0xbdb638, 0x78b14b]) };
  });
  return { type: "truck", direction, speed, vehicles };
}

function generateRows(n) {
  return Array.from({ length: n }, () => {
    const t = randomElement(["car", "truck", "forest"]);
    if (t === "car") return genCarLane();
    if (t === "truck") return genTruckLane();
    return genForest();
  });
}

function calcFinalPos(cur, moves) {
  return moves.reduce((p, d) => {
    if (d === "forward") return { ...p, rowIndex: p.rowIndex + 1 };
    if (d === "backward") return { ...p, rowIndex: p.rowIndex - 1 };
    if (d === "left") return { ...p, tileIndex: p.tileIndex - 1 };
    if (d === "right") return { ...p, tileIndex: p.tileIndex + 1 };
    return p;
  }, cur);
}

function validPos(cur, moves, meta) {
  const fp = calcFinalPos(cur, moves);
  if (fp.rowIndex === -1 || fp.tileIndex === minTileIndex - 1 || fp.tileIndex === maxTileIndex + 1) return false;
  const row = meta[fp.rowIndex - 1];
  if (row && row.type === "forest" && row.trees.some((t) => t.tileIndex === fp.tileIndex)) return false;
  return true;
}

/* ─────────────────────────────────────────────
   CrossyGame — React component wrapping the Three.js game
   ───────────────────────────────────────────── */
function CrossyGame({ onGameStart, onGameOver }) {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const startedRef = useRef(false);

  const handleStart = useCallback(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      onGameStart();
    }
  }, [onGameStart]);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    const player = Player();
    const map = new THREE.Group();
    scene.add(player); scene.add(map);
    scene.add(new THREE.AmbientLight());

    const dirLight = new THREE.DirectionalLight();
    dirLight.position.set(-100, -100, 200); dirLight.up.set(0, 0, 1); dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048; dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.up.set(0, 0, 1);
    dirLight.shadow.camera.left = -400; dirLight.shadow.camera.right = 400;
    dirLight.shadow.camera.top = 400; dirLight.shadow.camera.bottom = -400;
    dirLight.shadow.camera.near = 50; dirLight.shadow.camera.far = 400;
    dirLight.target = player;
    player.add(dirLight);

    // Camera
    const sz = 300;
    const vr = window.innerWidth / window.innerHeight;
    const w = vr < 1 ? sz : sz * vr;
    const h = vr < 1 ? sz / vr : sz;
    const camera = new THREE.OrthographicCamera(w / -2, w / 2, h / 2, h / -2, 100, 900);
    camera.up.set(0, 0, 1); camera.position.set(300, -300, 300); camera.lookAt(0, 0, 0);
    player.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas: canvasRef.current });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    // State
    const metadata = [];
    const pos = { currentRow: 0, currentTile: 0 };
    const movesQueue = [];
    const moveClock = new THREE.Clock(false);
    const vehicleClock = new THREE.Clock();
    let gameOver = false;

    function initMap() {
      metadata.length = 0;
      map.remove(...map.children);
      for (let i = 0; i > -10; i--) map.add(Grass(i));
      addRowsToMap();
    }

    function addRowsToMap() {
      const newMeta = generateRows(20);
      const start = metadata.length;
      metadata.push(...newMeta);
      newMeta.forEach((rd, i) => {
        const ri = start + i + 1;
        if (rd.type === "forest") {
          const row = Grass(ri);
          rd.trees.forEach(({ tileIndex: ti, height: ht }) => row.add(Tree(ti, ht)));
          map.add(row);
        }
        if (rd.type === "car") {
          const row = Road(ri);
          rd.vehicles.forEach((v) => { const c = Car(v.initialTileIndex, rd.direction, v.color); v.ref = c; row.add(c); });
          map.add(row);
        }
        if (rd.type === "truck") {
          const row = Road(ri);
          rd.vehicles.forEach((v) => { const c = Truck(v.initialTileIndex, rd.direction, v.color); v.ref = c; row.add(c); });
          map.add(row);
        }
      });
    }

    function initPlayer() {
      player.position.x = 0; player.position.y = 0;
      player.children[0].position.z = 0;
      pos.currentRow = 0; pos.currentTile = 0;
      movesQueue.length = 0;
    }

    function initGame() {
      gameOver = false;
      startedRef.current = false;
      initPlayer(); initMap();
      const sd = document.getElementById("game-score");
      if (sd) sd.innerText = "0";
      const rc = document.getElementById("game-result-container");
      if (rc) rc.style.visibility = "hidden";
    }

    function queueMove(d) {
      if (gameOver) return;
      handleStart();
      if (!validPos({ rowIndex: pos.currentRow, tileIndex: pos.currentTile }, [...movesQueue, d], metadata)) return;
      movesQueue.push(d);
    }

    function stepCompleted() {
      const d = movesQueue.shift();
      if (d === "forward") pos.currentRow += 1;
      if (d === "backward") pos.currentRow -= 1;
      if (d === "left") pos.currentTile -= 1;
      if (d === "right") pos.currentTile += 1;
      if (pos.currentRow > metadata.length - 10) addRowsToMap();
      const sd = document.getElementById("game-score");
      if (sd) sd.innerText = pos.currentRow.toString();
    }

    function animatePlayer() {
      if (!movesQueue.length) return;
      if (!moveClock.running) moveClock.start();
      const progress = Math.min(1, moveClock.getElapsedTime() / 0.2);
      // position
      const sx = pos.currentTile * tileSize, sy = pos.currentRow * tileSize;
      let ex = sx, ey = sy;
      if (movesQueue[0] === "left") ex -= tileSize;
      if (movesQueue[0] === "right") ex += tileSize;
      if (movesQueue[0] === "forward") ey += tileSize;
      if (movesQueue[0] === "backward") ey -= tileSize;
      player.position.x = THREE.MathUtils.lerp(sx, ex, progress);
      player.position.y = THREE.MathUtils.lerp(sy, ey, progress);
      player.children[0].position.z = Math.sin(progress * Math.PI) * 8;
      // rotation
      let er = 0;
      if (movesQueue[0] === "forward") er = 0;
      if (movesQueue[0] === "left") er = Math.PI / 2;
      if (movesQueue[0] === "right") er = -Math.PI / 2;
      if (movesQueue[0] === "backward") er = Math.PI;
      player.children[0].rotation.z = THREE.MathUtils.lerp(player.children[0].rotation.z, er, progress);
      if (progress >= 1) { stepCompleted(); moveClock.stop(); }
    }

    function animateVehicles() {
      const delta = vehicleClock.getDelta();
      metadata.forEach((rd) => {
        if (rd.type === "car" || rd.type === "truck") {
          const beg = (minTileIndex - 2) * tileSize, end = (maxTileIndex + 2) * tileSize;
          rd.vehicles.forEach(({ ref }) => {
            if (!ref) return;
            if (rd.direction) { ref.position.x = ref.position.x > end ? beg : ref.position.x + rd.speed * delta; }
            else { ref.position.x = ref.position.x < beg ? end : ref.position.x - rd.speed * delta; }
          });
        }
      });
    }

    function hitTest() {
      if (gameOver) return;
      const row = metadata[pos.currentRow - 1];
      if (!row) return;
      if (row.type === "car" || row.type === "truck") {
        const pb = new THREE.Box3(); pb.setFromObject(player);
        row.vehicles.forEach(({ ref }) => {
          if (!ref) return;
          const vb = new THREE.Box3(); vb.setFromObject(ref);
          if (pb.intersectsBox(vb)) {
            gameOver = true;
            const rc = document.getElementById("game-result-container");
            const fs = document.getElementById("game-final-score");
            if (rc) rc.style.visibility = "visible";
            if (fs) fs.innerText = pos.currentRow.toString();
            onGameOver(pos.currentRow);
          }
        });
      }
    }

    function animate() {
      animateVehicles(); animatePlayer(); hitTest();
      renderer.render(scene, camera);
    }

    initGame();
    renderer.setAnimationLoop(animate);

    // Controls
    const onKey = (e) => {
      if (e.key === "ArrowUp") { e.preventDefault(); queueMove("forward"); }
      else if (e.key === "ArrowDown") { e.preventDefault(); queueMove("backward"); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); queueMove("left"); }
      else if (e.key === "ArrowRight") { e.preventDefault(); queueMove("right"); }
    };
    window.addEventListener("keydown", onKey);

    // Swipe controls for mobile
    let touchStartX = 0, touchStartY = 0;
    const onTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      const absDx = Math.abs(dx), absDy = Math.abs(dy);
      if (Math.max(absDx, absDy) < 30) return; // too short, ignore
      if (absDx > absDy) {
        queueMove(dx > 0 ? "right" : "left");
      } else {
        queueMove(dy > 0 ? "backward" : "forward");
      }
    };
    const cvs = canvasRef.current;
    cvs.addEventListener("touchstart", onTouchStart, { passive: true });
    cvs.addEventListener("touchend", onTouchEnd, { passive: true });

    const fwd = document.getElementById("game-forward");
    const bwd = document.getElementById("game-backward");
    const lft = document.getElementById("game-left");
    const rgt = document.getElementById("game-right");
    const retryBtn = document.getElementById("game-retry");
    const fwdH = () => queueMove("forward");
    const bwdH = () => queueMove("backward");
    const lftH = () => queueMove("left");
    const rgtH = () => queueMove("right");
    const retryH = () => { initGame(); handleStart(); };
    fwd && fwd.addEventListener("click", fwdH);
    bwd && bwd.addEventListener("click", bwdH);
    lft && lft.addEventListener("click", lftH);
    rgt && rgt.addEventListener("click", rgtH);
    retryBtn && retryBtn.addEventListener("click", retryH);

    const onResize = () => {
      const vr2 = window.innerWidth / window.innerHeight;
      const w2 = vr2 < 1 ? sz : sz * vr2;
      const h2 = vr2 < 1 ? sz / vr2 : sz;
      camera.left = w2 / -2; camera.right = w2 / 2; camera.top = h2 / 2; camera.bottom = h2 / -2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    gameRef.current = { renderer, onKey, onResize, fwd, bwd, lft, rgt, retryBtn, fwdH, bwdH, lftH, rgtH, retryH, cvs, onTouchStart, onTouchEnd };

    return () => {
      renderer.setAnimationLoop(null);
      renderer.dispose();
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      cvs.removeEventListener("touchstart", onTouchStart);
      cvs.removeEventListener("touchend", onTouchEnd);
      fwd && fwd.removeEventListener("click", fwdH);
      bwd && bwd.removeEventListener("click", bwdH);
      lft && lft.removeEventListener("click", lftH);
      rgt && rgt.removeEventListener("click", rgtH);
      retryBtn && retryBtn.removeEventListener("click", retryH);
    };
  }, [handleStart, onGameOver]);

  return (
    <div className="game-wrapper">
      <canvas ref={canvasRef} className="game-canvas" />

      <div id="game-controls">
        <div>
          <button id="game-forward" type="button">&#9650;</button>
          <button id="game-left" type="button">&#9664;</button>
          <button id="game-backward" type="button">&#9660;</button>
          <button id="game-right" type="button">&#9654;</button>
        </div>
      </div>

      <div id="game-score">0</div>

      <div id="game-result-container">
        <div id="game-result">
          <h1>Game Over</h1>
          <p>Your score: <span id="game-final-score"></span></p>
          <button id="game-retry" type="button">Retry</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Home page
   ───────────────────────────────────────────── */
export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [firstDeath, setFirstDeath] = useState(false);
  const [diedBefore, setDiedBefore] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleGameStart = useCallback(() => setGameStarted(true), []);
  const handleGameOver = useCallback((score) => {
    setFinalScore(score);
    if (!diedBefore) {
      setFirstDeath(true);
    }
    // Don't reset gameStarted — keep hero hidden
  }, [diedBefore]);

  const handleKeepPlaying = useCallback(() => {
    setFirstDeath(false);
    setDiedBefore(true);
    // Trigger the retry button click in the game
    const retryBtn = document.getElementById('game-retry');
    if (retryBtn) retryBtn.click();
  }, []);

  const handleDismissFirstDeath = useCallback(() => {
    setFirstDeath(false);
    setDiedBefore(true);
  }, []);

  return (
    <div className={`home-page-v2${gameStarted ? " game-active" : ""}${firstDeath ? " first-death-active" : ""}`}>

      {/* ───── GAME CANVAS (always mounted, behind everything) ───── */}
      <CrossyGame onGameStart={handleGameStart} onGameOver={handleGameOver} />

      {/* ───── FIRST DEATH MODAL ───── */}
      {firstDeath && (
        <div className="first-death-overlay" onClick={handleDismissFirstDeath}>
          <div className="first-death-modal" onClick={e => e.stopPropagation()}>
            <p className="fd-score">You crossed <strong>{finalScore}</strong> {finalScore === 1 ? 'road' : 'roads'}</p>
            <h2 className="fd-title">Not bad for a chicken.</h2>
            <p className="fd-body">Want to find out where you actually stand in your engineering career?</p>
            <div className="fd-actions">
              <Link to="/questionnaire" className="fd-btn fd-btn-primary">
                <span>Take the Quiz</span>
                <span className="fd-arrow">&rarr;</span>
              </Link>
              <button className="fd-btn fd-btn-secondary" onClick={handleKeepPlaying}>
                Nah, let me play
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───── HERO OVERLAY (above the fold) ───── */}
      <section className={`hero-overlay${gameStarted ? " hero-hidden" : ""}`}>
        <div className="hero-overlay-inner">
          <h1 className="hero-headline">
            The chicken crossed the road.<br />
            <span className="hero-highlight">Your PR is still in review.</span>
          </h1>
          <p className="hero-sub">
            You're the chicken. The road is your career. The trucks are production incidents at 2 AM.<br />
            <span className="hero-sub-desktop">Use <strong>arrow keys</strong> to play — or </span>
            <span className="hero-sub-mobile">F</span><span className="hero-sub-desktop">f</span>ind out which lane you're actually in.
          </p>
          <div className="hero-actions">
            <Link to="/questionnaire" className="cta-primary">
              <span className="cta-text">Am I Cooked?</span>
              <span className="cta-arrow">&rarr;</span>
            </Link>
            <button className="cta-play" onClick={() => setGameStarted(true)}>
              &#9654; Play the Game
            </button>
          </div>
          <p className="hero-note">Free. No sign-up. No "let's circle back." Just answers.</p>
          <div className="scroll-hint">
            Or scroll — we don't judge<br /><span>&#8595;</span>
          </div>
        </div>
      </section>

      {/* ───── BELOW-THE-FOLD CONTENT (scrollable) ───── */}
      <div className={`below-fold${gameStarted ? " below-fold-hidden" : ""}`}>

        <section className="section-what">
          <div className="section-inner">
            <h2 className="section-heading">From <span className="accent">Egg to Absolute Unit</span></h2>
            <p className="section-text">
              Every senior engineer was once a mass of uncertainty Googling "what is a pointer."
              The difference? They stopped <em>pretending</em> and started leveling up on purpose.
              We mapped the whole journey — so you can stop guessing and <strong>start growing</strong>.
            </p>
          </div>
        </section>

        <section className="section-paths">
          <div className="section-inner">
            <h2 className="section-heading">Two ways to stop winging it</h2>
            <div className="path-cards">
              <Link to="/questionnaire" className="path-card path-card-quiz">
                <span className="path-icon">🍳</span>
                <span className="path-title">Am I Cooked?</span>
                <span className="path-desc">Answer a few honest questions. Find out if you're a free-range senior or still in the incubator.</span>
              </Link>
              <a
                href="https://docs.google.com/spreadsheets/d/1e71fL0b5lYyac_SMSZZFHqID_VjixPwUOuCqFXtzGL4/edit?pli=1&gid=0#gid=0"
                target="_blank"
                rel="noopener noreferrer"
                className="path-card path-card-ladder"
              >
                <span className="path-icon">🥚</span>
                <span className="path-title">The Egg-xpectations</span>
                <span className="path-desc">The full career framework. See exactly what separates the hatchlings from the roosters.</span>
              </a>
            </div>
          </div>
        </section>

        <section className="section-creators">
          <div className="section-inner">
            <h2 className="section-heading">Other things we built instead of sleeping</h2>
            <div className="creator-cards">
              <a className="creator-card" href="https://www.softwarearchitectureaddict.com/" target="_blank" rel="noopener noreferrer">
                <span className="creator-icon">🏛️</span>
                <span className="creator-label">Software Architecture Addict</span>
              </a>
              <a className="creator-card" href="https://www.youtube.com/watch?v=uI8NDsDouig" target="_blank" rel="noopener noreferrer">
                <span className="creator-icon">🍴</span>
                <span className="creator-label">The Forker</span>
              </a>
              <a className="creator-card" href="http://chuckwho.com/" target="_blank" rel="noopener noreferrer">
                <span className="creator-icon">🥋</span>
                <span className="creator-label">ChuckWho</span>
              </a>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          Made with 🌽 and zero regard for poultry metaphors by <a href="https://forter.dev/" target="_blank" rel="noopener noreferrer"><strong>Forter</strong></a>
        </footer>
      </div>
    </div>
  );
}
