import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "./Live.css";
import * as tf from "@tensorflow/tfjs"; // Importação solicitada
// Componentes de Botão
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import ButtonSecondary from "@/components/Button/ButtonSecondary.jsx";
import axios from "axios";
import { useAuth } from "../../context/AuthContex.jsx";
import AuthRedirectModal from "../../components/AuthRedirectModal/AuthRedirectModal.jsx";
// Importar o modal de SELEÇÃO
import MaterialSelectionModal from "../../components/MaterialSelectionModal/MaterialSelectionModal.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';

// --- Mapas de Informação ---

// 1. O que a IA detecta e quais materiais podem ser
const WASTE_INFO_MAP = {
  bottle: { categories: ["Plástico", "Vidro", "Metal"], tips: [] },
  cup: { categories: ["Plástico", "Vidro", "Metal"], tips: [] },
  book: { categories: ["Papel"], tips: [] },
  banana: { categories: ["Orgânico"], tips: [] },
  apple: { categories: ["Orgânico"], tips: [] },
  "cell phone": { categories: ["Eletrônico"], tips: [] },
};
// 2. Tradução
const TRANSLATION_MAP = { bottle: "Garrafa", cup: "Copo", book: "Livro", banana: "Banana", apple: "Maçã", "cell phone": "Celular" };
// 3. Classes que a IA deve procurar
const DETECTABLE_CLASSES = Object.keys(WASTE_INFO_MAP);

// 4. Mapa de dicas por MATERIAL (a ser exibido)
const MATERIAL_TIPS_MAP = {
  'Plástico': { color: 'Vermelho', mensagem: 'Lave as embalagens plásticas para remover restos de alimentos. Tampas podem ser recicladas junto com as garrafas.' },
  'Papel': { color: 'Azul', mensagem: 'Papéis e papelões devem estar secos e limpos. Evite amassar, apenas dobre.' },
  'Vidro': { color: 'Verde', mensagem: 'O vidro é 100% reciclável! Lave os potes e garrafas. Se estiver quebrado, enrole em jornal para proteger os coletores.' },
  'Metal': { color: 'Amarelo', mensagem: 'Latas de alumínio e aço são altamente recicláveis. Lave as latas de alimentos e amasse-as.' },
  'Orgânico': { color: 'Marrom', mensagem: 'Restos de frutas e vegetais podem virar adubo através da compostagem.' },
  'Eletrônico': { color: 'Ponto de Coleta', mensagem: 'NUNCA descarte no lixo comum. Procure postos de coleta ou lojas de operadoras.' },
  'Outro/Rejeito': { color: 'Cinza', mensagem: 'Este item é considerado rejeito. Descarte no lixo comum.' }
};
// 5. Cores
const CORES_CSS = { 'Vermelho': '#e74c3c', 'Azul': '#3498db', 'Verde': '#2ecc71', 'Amarelo': '#f1c40f', 'Marrom': '#964B00', 'Ponto de Coleta': '#e74c3c', 'Cinza': '#95a5a6' };


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
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // Modal de Auth
  const [status, setStatus] = useState("Clique em 'Iniciar Detecção' para começar.");
  
  // Estado para o modal de seleção de material
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  
  // Guarda TODAS as dicas para o item detectado
  const [displayedResultInfo, setDisplayedResultInfo] = useState(null);

  // Efeito para checar autenticação
  useEffect(() => {
    if (!authLoading && !user) {
      setIsAuthModalOpen(true);
    }
  }, [user, authLoading]);

  // Efeito para carregar o modelo de IA
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


  /** Reinicia o loop de detecção (chamado ao 'Tentar Novamente' ou após salvar) */
  const restartDetectionLoop = () => {
    setIsFrozen(false);
    setDetectedItem(null);
    setDisplayedResultInfo(null);
    setIsSaveModalOpen(false); // Garante que o modal feche
    setStatus("Procurando por resíduos...");
    
    // Limpa o canvas
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    
    // Reinicia o vídeo e a detecção
    if (videoRef.current) {
      videoRef.current.play();
      animationFrameId.current = requestAnimationFrame(detectFrame);
    }
  };

  /** Loop principal de detecção */
  const detectFrame = async () => {
    // Se estiver congelado OU se o modal de salvar estiver aberto, não faz nada
    if (isFrozen || isSaveModalOpen || !modelRef.current || !videoRef.current?.srcObject || videoRef.current.paused) return;
    
    try {
      const predictions = await modelRef.current.detect(videoRef.current);
      const wasteDetections = predictions.filter((p) => DETECTABLE_CLASSES.includes(p.class));
      
      if (wasteDetections.length > 0) {
        const firstItem = wasteDetections[0];

        // 1. Congela a tela
        setIsFrozen(true);
        setDetectedItem(firstItem);
        drawDetections([firstItem]);
        if (videoRef.current) videoRef.current.pause();

        // 2. Prepara TODAS as informações de descarte
        const detectedName = TRANSLATION_MAP[firstItem.class] || firstItem.class;
        const info = WASTE_INFO_MAP[firstItem.class];
        
        // Pega as categorias (ex: ["Plástico", "Vidro", "Metal"])
        const categories = info ? info.categories : ['Outro/Rejeito']; 
        
        // Busca as dicas para CADA categoria
        const allTips = categories.map(material => {
          const tips = MATERIAL_TIPS_MAP[material] || MATERIAL_TIPS_MAP['Outro/Rejeito'];
          return { material, ...tips };
        });
        
        // 3. Define o resultado para ser exibido
        setDisplayedResultInfo({ name: detectedName, allTips: allTips });
        setStatus(`Objeto analisado: ${detectedName}`);
        
      } else {
        // Continua o loop se nada for encontrado
        animationFrameId.current = requestAnimationFrame(detectFrame);
      }
    } catch (error) {
      console.error("Erro durante a detecção:", error);
      animationFrameId.current = requestAnimationFrame(detectFrame);
    }
  };

  /** Inicia a câmera e a detecção */
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

  /** Para a câmera e limpa tudo */
  const stopDetection = () => {
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
    setIsFrozen(false);
    setDetectedItem(null);
    setDisplayedResultInfo(null);
    setIsSaveModalOpen(false); // Garante que o modal feche
    setStatus("Clique em 'Iniciar Detecção' para começar.");

    // Limpa o canvas
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
  };

  /** Desenha a caixa de detecção no canvas */
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

  // --- Handlers para os botões e modal ---

  /** Botão: "Errado? Tente Novamente" */
  const handleRetryClick = () => {
    restartDetectionLoop();
  };

  /** Botão: "Salvar no Dashboard" -> Abre o modal */
  const handleOpenSaveModal = () => {
    setIsSaveModalOpen(true);
  };

  /** Botão "Salvar" DENTRO DO MODAL -> Salva e reinicia */
  const handleConfirmSave = async (selectedMaterial) => {
    if (user && detectedItem && selectedMaterial && selectedMaterial !== 'Outro/Rejeito') {
      try {
        await axios.post(`${apiUrl}/history`, { 
          material_type: selectedMaterial, 
          confidence: detectedItem.score 
        }, { withCredentials: true });
        
        setStatus(`Salvo: ${selectedMaterial}!`);
      } catch (historyError) {
        console.error("Não foi possível guardar o scan da câmera no histórico:", historyError);
        setStatus("Erro ao salvar.");
      }
    }
    
    // Fecha o modal e reinicia o loop
    setIsSaveModalOpen(false);
    restartDetectionLoop();
  };

  // --- Renderização ---
  if (!user && !authLoading) {
    return <AuthRedirectModal isOpen={isAuthModalOpen} onClose={() => navigate('/')} />;
  }

  return (
    <>
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
              
              {isFrozen && detectedItem && (<div className="disclaimer-box">A confiança da IA é de: {(detectedItem.score * 100).toFixed(1)}%. Lembre-se, a IA pode cometer erros. Ajude-nos a treinar com seu feedback!</div>)}
              <div className={`result-panel ${displayedResultInfo ? "status-alert" : "status-info"}`}><p>{status}</p></div>
              
              {!isFrozen ? (
                // 1. Se NÃO estiver congelado (rodando normal)
                <ButtonPrimary onClick={stopDetection}>
                  Parar Detecção
                </ButtonPrimary>
              ) : (
                // 2. Se ESTIVER congelado (mostrando resultado)
                <div className="confirmation-buttons">
                  <ButtonSecondary onClick={handleRetryClick}>
                    Errado? Tente Novamente
                  </ButtonSecondary>
                  <ButtonPrimary onClick={handleOpenSaveModal} disabled={!user}>
                    Salvar no Dashboard
                  </ButtonPrimary>
                </div>
              )}
              
              {/* --- LÓGICA DE RESULTADO (Exibe todas as opções) --- */}
              {isFrozen && displayedResultInfo && (
                <div className="predictions-list">
                  <h2>Sugestão: {displayedResultInfo.name}</h2>
                  <p className="analysis-text">
                    Este objeto pode ser de <strong>{displayedResultInfo.allTips.length}</strong> {displayedResultInfo.allTips.length > 1 ? 'materiais' : 'material'}:
                  </p>
                  
                  {/* Mapeia e exibe TODAS as opções */}
                  <div className="material-options-grid">
                    {displayedResultInfo.allTips.map((info) => (
                      <div key={info.material} className="material-option-card">
                        <div className="material-option-header">
                          <h3>{info.material} (Lixeira {info.color})</h3>
                          <FontAwesomeIcon 
                            icon={faRecycle} 
                            className="icon-color-live" 
                            style={{ color: CORES_CSS[info.color] || '#95a5a6' }} 
                          />
                        </div>
                        <p className="material-option-tip">{info.mensagem}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* --- Renderiza o MODAL DE SELEÇÃO --- */}
      <MaterialSelectionModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onConfirm={handleConfirmSave}
        // Passa o nome do item detectado para o modal
        detectedItemName={displayedResultInfo?.name || ''}
        // Passa apenas os nomes dos materiais para o modal
        categories={displayedResultInfo?.allTips.map(t => t.material) || []}
      />
    </>
  );
}

export default LivePage;