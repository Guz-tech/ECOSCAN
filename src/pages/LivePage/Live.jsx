import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "./Live.css";
import * as tf from "@tensorflow/tfjs";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import axios from "axios";
import { useAuth } from "../../context/AuthContex.jsx";
import AuthRedirectModal from "../../components/AuthRedirectModal/AuthRedirectModal.jsx";


const WASTE_INFO_MAP = {
  bottle: { categories: ["Plástico", "Vidro"], tips: [{ category: "Plástico", text: "Descarte em lixeiras de cor vermelha. Lave a garrafa para remover resíduos." },{ category: "Vidro", text: "Descarte em lixeiras de cor verde. Embale cacos em jornal para evitar acidentes." }] },
  cup: { categories: ["Plástico", "Vidro", "Metal"], tips: [{ category: "Plástico", text: "Descarte em lixeiras de cor vermelha. Verifique se não há líquidos." },{ category: "Vidro", text: "Descarte em lixeiras de cor verde. Tenha cuidado se estiver quebrado." },{ category: "Metal", text: "Descarte em lixeiras de cor amarela. Amasse para reduzir o volume." }] },
  book: { categories: ["Papel"], tips: [{ category: "Papel", text: "Descarte na lixeira de cor azul. Remova capas de plástico ou espirais de metal se possível." }] },
  banana: { categories: ["Orgânico"], tips: [{ category: "Orgânico", text: "Ideal para compostagem ou descarte em lixo orgânico." }] },
  apple: { categories: ["Orgânico"], tips: [{ category: "Orgânico", text: "Ideal para compostagem ou descarte em lixo orgânico." }] },
  "cell phone": { categories: ["Eletrônico"], tips: [{ category: "Eletrônico", text: "NUNCA descarte no lixo comum. Procure postos de coleta ou lojas de operadoras." }] },
};
const TRANSLATION_MAP = { bottle: "Garrafa", cup: "Copo", book: "Livro", banana: "Banana", apple: "Maçã", "cell phone": "Celular" };
const DETECTABLE_CLASSES = Object.keys(WASTE_INFO_MAP);

function LivePage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const animationFrameId = useRef(null);
  
  const { user, loading: authLoading } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [modelLoaded, setModelLoaded] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [detectedItem, setDetectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("Clique em 'Iniciar Detecção' para começar.");

  useEffect(() => {
    if (!authLoading && !user) {
      setIsModalOpen(true);
    }
  }, [user, authLoading]);

  useEffect(() => {
    setStatus("Carregando modelo de IA...");
    const currentVideoRef = videoRef.current; 
    cocoSsd.load().then((model) => {
      modelRef.current = model;
      setModelLoaded(true);
      setStatus("Clique em 'Iniciar Detecção' para começar.");
    });
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (currentVideoRef && currentVideoRef.srcObject) { 
        currentVideoRef.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const detectFrame = async () => {
    if (isFrozen || !modelRef.current || !videoRef.current?.srcObject || videoRef.current.paused) return;
    try {
      const predictions = await modelRef.current.detect(videoRef.current);
      const wasteDetections = predictions.filter((p) => DETECTABLE_CLASSES.includes(p.class));
      if (wasteDetections.length > 0) {
        const firstItem = wasteDetections[0];
        const materialInfo = WASTE_INFO_MAP[firstItem.class];
        const primaryMaterial = materialInfo?.categories[0];
        setIsFrozen(true);
        setDetectedItem(firstItem);
        drawDetections([firstItem]);
        setStatus(`Objeto analisado: ${TRANSLATION_MAP[firstItem.class] || firstItem.class}`);
        if (videoRef.current) videoRef.current.pause();
        if (user && primaryMaterial) {
          try {
            await axios.post(`${apiUrl}/history`, { material_type: primaryMaterial, confidence: firstItem.score }, { withCredentials: true });
          } catch (historyError) {
            console.error("Não foi possível guardar o scan da câmera no histórico:", historyError);
          }
        }
      } else {
        animationFrameId.current = requestAnimationFrame(detectFrame);
      }
    } catch (error) {
      console.error("Erro durante a detecção:", error);
      animationFrameId.current = requestAnimationFrame(detectFrame);
    }
  };

  const startDetection = async () => {
    setIsCameraOn(true);
    setIsFrozen(false);
    setDetectedItem(null);
    setStatus("Aguardando permissão da câmera...");
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((device) => device.kind === "videoinput");
      let rearCameras = videoDevices.filter((device) => device.label.toLowerCase().includes("back") || !device.label.toLowerCase().includes("front"));
      let bestCameraId = null;
      if (rearCameras.length > 0) {
        const mainCamera = rearCameras.find((camera) => !camera.label.toLowerCase().includes("wide"));
        bestCameraId = mainCamera ? mainCamera.deviceId : rearCameras[0].deviceId;
      }
      const constraints = { video: { ...(bestCameraId ? { deviceId: { exact: bestCameraId } } : { facingMode: "environment" }) } };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setStatus("Procurando por resíduos...");
          detectFrame();
        };
      }
    } catch (err) {
      console.error("Erro ao acessar a câmera: ", err);
      setStatus("Permissão da câmera negada ou erro ao iniciar.");
      setIsCameraOn(false);
    }
  };

  const stopDetection = () => {
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
    setIsFrozen(false);
    setDetectedItem(null);
    setStatus("Clique em 'Iniciar Detecção' para começar.");
  };

  const drawDetections = (detections) => {
    if (!canvasRef.current || !videoRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.canvas.width = videoRef.current.videoWidth;
    ctx.canvas.height = videoRef.current.videoHeight;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    detections.forEach((prediction) => {
      const [x, y, width, height] = prediction.bbox;
      const text = `${TRANSLATION_MAP[prediction.class] || prediction.class} (${Math.round(prediction.score * 100)}%)`;
      const color = "#FF0000";
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.font = "20px Arial";
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.fillText(text, x, y > 20 ? y - 10 : y + height + 20);
    });
  };

  const detectedInfo = detectedItem ? WASTE_INFO_MAP[detectedItem.class] : null;

  if (!user && !authLoading) {
    return <AuthRedirectModal isOpen={isModalOpen} onClose={() => navigate('/')} />;
  }

  return (
    <main className="live-page">
      <div className="container live-content">
        {!isCameraOn ? (
          <div className="initial-view">
            <div className="initial-view-box">
              <h1>Detector de Resíduos</h1>
              <p>Aponte a câmera para um objeto para identificá-lo e receber dicas de descarte em tempo real.</p>
              <div className={`result-panel status-info`}><p>{status}</p></div>
              <ButtonPrimary onClick={startDetection} disabled={!modelLoaded}>
                {modelLoaded ? "Iniciar Detecção" : "Carregando IA..."}
              </ButtonPrimary>
            </div>
          </div>
        ) : (
          <>
            <div className="video-container">
              <video ref={videoRef} autoPlay playsInline muted />
              <canvas ref={canvasRef} className="detection-canvas" />
            </div>
            {isFrozen && detectedItem && (<div className="disclaimer-box">Confiança da IA: {(detectedItem.score * 100).toFixed(1)}%. Lembre-se, a IA pode cometer erros.</div>)}
            <div className={`result-panel ${detectedItem ? "status-alert" : "status-info"}`}><p>{status}</p></div>
            <ButtonPrimary onClick={stopDetection}>Parar Detecção</ButtonPrimary>
            {isFrozen && detectedInfo && (
              <div className="predictions-list">
                <h2>Análise do Objeto: {TRANSLATION_MAP[detectedItem.class]}</h2>
                <p className="analysis-text">Este objeto pode ser de: <strong>{detectedInfo.categories.join(", ")}</strong>.</p>
                <div className="disposal-tips">
                  <h3>Dicas de Descarte:</h3>
                  <ul>
                    {detectedInfo.tips.map((tip, idx) => (<li key={idx}><strong>{tip.category}:</strong> {tip.text}</li>))}
                  </ul>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default LivePage;