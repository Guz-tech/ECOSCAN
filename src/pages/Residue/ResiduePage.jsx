import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ButtonPrimary from "@/components/Button/ButtonPrimary.jsx";
import ButtonSecondary from "@/components/Button/ButtonSecondary.jsx";
import "./Residue.css";
import imageCompression from 'browser-image-compression';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "../../context/AuthContex.jsx";
import AuthRedirectModal from '../../components/AuthRedirectModal/AuthRedirectModal.jsx';
import MaterialSelectionModal from '../../components/MaterialSelectionModal/MaterialSelectionModal.jsx';

// --- Mapeamentos e constantes (ATUALIZADOS) ---

const infoPadrao = { categories: ["Rejeito"], color: 'Cinza', mensagem: 'Este resíduo é considerado rejeito e não deve ser descartado na coleta seletiva. Deposite-o no lixo comum. Isso inclui lixo de banheiro, fraldas e absorventes.' };
const metalInfo = { categories: ["Metal"], color: 'Amarelo', mensagem: 'Latas de alumínio e aço são altamente recicláveis. Lave as latas de alimentos para evitar mau cheiro e contaminação. Amasse-as para otimizar o espaço.' };
const plasticoInfo = { categories: ["Plástico"], color: 'Vermelho', mensagem: 'Lave as embalagens plásticas para remover restos de alimentos. Tampas podem ser recicladas junto com as garrafas.' };
const papelInfo = { categories: ["Papel"], color: 'Azul', mensagem: 'Papéis e papelões devem estar secos e limpos. Evite amassar, apenas dobre. Caixas de pizza engorduradas não são recicláveis.' };
const vidroInfo = { categories: ["Vidro"], color: 'Verde', mensagem: 'O vidro é 100% reciclável! Lave os potes e garrafas. Se estiver quebrado, enrole em jornal para proteger os coletores.' };
const organicoInfo = { categories: ["Orgânico"], color: 'Marrom', mensagem: 'Resíduos orgânicos, como restos de frutas e vegetais, podem virar adubo através da compostagem.' };
const cartaoInfo = { categories: ["Papelão"], color: 'Azul', mensagem: 'Desmonte as caixas de papelão para economizar espaço. Certifique-se de que não estejam molhadas ou engorduradas.' };

const mapeamentoDetalhes = {
    // Classes de Materiais
    'plastic': plasticoInfo,
    'paper': papelInfo,
    'glass': vidroInfo,
    'metal': metalInfo,
    'organic': organicoInfo,
    'biodegradable': organicoInfo,
    'cardboard': cartaoInfo,

    // Classes de Objetos
    'bottle': { categories: ["Plástico", "Vidro", "Metal"], color: 'Vermelho', mensagem: 'Garrafas podem ser de Plástico, Vidro ou Metal. Verifique o material e descarte na lixeira correta.' },
    'petbottle': plasticoInfo,
    'can': metalInfo,

    // Classes de Rejeitos e Números
    'stone': { ...infoPadrao, categories: ["Rejeito"] },
    '26': { ...infoPadrao, categories: ["Rejeito"] },
    '0': { ...infoPadrao, categories: ["Rejeito"] }, // Classe "0" também estava na lista
    '1': { ...infoPadrao, categories: ["Rejeito"] }, // Classe "1" também estava na lista
    'mask': { ...infoPadrao, categories: ["Rejeito"] }, // Máscaras são rejeito
    
    // Classes em MAIÚSCULO (do modelo)
    'PLASTIC': plasticoInfo,
    'PAPER': papelInfo,
    'GLASS': vidroInfo,
    'METAL': metalInfo,
    'BIODEGRADABLE': organicoInfo,
    'CARDBOARD': cartaoInfo,
};

const traducaoClasses = { 
    // Materiais
    'plastic': 'Plástico', 
    'paper': 'Papel', 
    'glass': 'Vidro', 
    'metal': 'Metal', 
    'organic': 'Orgânico', 
    'biodegradable': 'Orgânico', 
    'cardboard': 'Papelão', 

    // Objetos
    'bottle': 'Garrafa', 
    'petbottle': 'Garrafa PET',
    'can': 'Lata',

    // Rejeitos e Números
    'stone': 'Pedra',
    '26': 'Rejeito (26)',
    '0': 'Rejeito (0)',
    '1': 'Rejeito (1)',
    'mask': 'Máscara',

    // Classes em MAIÚSCULO
    'PLASTIC': 'Plástico',
    'PAPER': 'Papel',
    'GLASS': 'Vidro',
    'METAL': 'Metal',
    'BIODEGRADABLE': 'Orgânico',
    'CARDBOARD': 'Papelão',
};

const coresCss = { 'Vermelho': '#e74c3c', 'Azul': '#3498db', 'Verde': '#2ecc71', 'Amarelo': '#f1c40f', 'Marrom': '#964B00', 'Cinza': '#95a5a6' };
// Lista de materiais para o modal de seleção (incluindo Papelão)
const ALL_MATERIALS = ['Plástico', 'Papel', 'Papelão', 'Vidro', 'Metal', 'Orgânico', 'Eletrônico', 'Rejeito'];


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


function ResiduePage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const apiUrl = import.meta.env.VITE_API_URL;

    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const fileInputRef = useRef(null);

    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [detectedConfidence, setDetectedConfidence] = useState(0);


    useEffect(() => {
        return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); };
    }, [previewUrl]);

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;
        setResult(null);
        setError(null);
        setLoading(true);
        const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
        try {
            const compressedFile = await imageCompression(selectedFile, options);
            setFile(compressedFile);
            setPreviewUrl(URL.createObjectURL(compressedFile));
        } catch (err) {
            setError("Não foi possível processar esta imagem. Tente outra.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);
        setError(null);

        try {
            const base64Image = await toBase64(file);
            const apiKey = import.meta.env.VITE_ROBOFLOW_API_KEY;
            if (!apiKey) throw new Error("Chave de API não configurada.");
            
            // Esta é a URL do seu projeto (que encontramos)
            const url = `https://detect.roboflow.com/waste-classification-uwqfy/1?api_key=${apiKey}`;

            const response = await axios.post(url, base64Image, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            });

            const prediction = response.data.predictions[0];
            if (prediction) {
                // A classe pode ser "can", "bottle", "PLASTIC" ou "26"
                const classeDetectada = prediction.class; // Não precisa de toLowerCase(), pois "PLASTIC" é uma classe

                // Agora "can", "bottle", "26", etc., serão encontrados
                const nomeTraduzido = traducaoClasses[classeDetectada] || classeDetectada;
                const infoResiduo = mapeamentoDetalhes[classeDetectada] || infoPadrao;
                
                const scanResult = { 
                    class: nomeTraduzido, 
                    confidence: (prediction.confidence * 100).toFixed(2), 
                    ...infoResiduo 
                };
                
                setResult(scanResult);
                setDetectedConfidence(prediction.confidence); 

            } else {
                setError('Nenhum objeto foi detectado na imagem. Tente outra foto.');
            }
        } catch (err) {
            if (err.response) {
                setError(`Erro ${err.response.status}: ${err.response.data.message || 'O servidor da Roboflow retornou um erro.'}`);
            } else {
                setError(`Erro ao analisar a imagem: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setResult(null);
        setPreviewUrl(null);
        setLoading(false);
        setError(null);
        setIsSaveModalOpen(false); 
        setDetectedConfidence(0); 
    };

    const handleChooseFileClick = () => {
        if (!user) {
            setIsAuthModalOpen(true);
            return;
        }
        fileInputRef.current.click();
    };

    const handleCameraClick = () => {
        if (!user) {
            setIsAuthModalOpen(true);
            return;
        }
        navigate('/live');
    };

    const handleOpenSaveModal = () => {
        setIsSaveModalOpen(true);
    };

    const handleConfirmSave = async (selectedMaterial) => {
        if (user && selectedMaterial && selectedMaterial !== "Rejeito") {
            try {
                await axios.post(`${apiUrl}/history`, { 
                    material_type: selectedMaterial, 
                    confidence: detectedConfidence 
                }, { withCredentials: true });
            } catch (historyError) {
                console.error("Não foi possível guardar o scan no histórico:", historyError);
            }
        }
        setIsSaveModalOpen(false);
        handleReset();
    };


    return (
        <>
            <main>
                <section className="residue-section">
                    <div className="container residue-content">
                        {!previewUrl && !result && (
                            <>
                                <div className="residue-text">
                                    <h1>O que vamos reciclar hoje?</h1>
                                    <p>Aponte a câmera para um item ou escolha uma imagem da galeria para a análise.</p>
                                </div>
                                <div className="residue-buttons">
                                    <input type="file" accept="image/*" onChange={handleFileChange} id="file-upload" style={{ display: 'none' }} ref={fileInputRef} />
                                    <ButtonSecondary onClick={handleCameraClick}>Usar câmera</ButtonSecondary>
                                    <ButtonPrimary onClick={handleChooseFileClick}>Escolher da galeria</ButtonPrimary>
                                </div>
                            </>
                        )}
                        {previewUrl && !result && (
                            <div className="residue-preview-container">
                                <h1>Imagem Selecionada</h1>
                                <img src={previewUrl} alt="Preview do resíduo" className="residue-image-preview" />
                                <div className="residue-buttons">
                                    <ButtonSecondary onClick={handleReset} disabled={loading}>Cancelar</ButtonSecondary>
                                    <ButtonPrimary onClick={handleUpload} disabled={loading}>
                                        {loading ? 'Analisando...' : 'Analisar Imagem'}
                                    </ButtonPrimary>
                                </div>
                            </div>
                        )}
                        
                        {result && (
                            <div className="residue-result-container">
                                <h1>Resultado da Análise</h1>
                                <div className="residue-result-card">
                                    <p><strong>Material Detectado:</strong> {result.class}</p>
                                    <div className="result-color-info">
                                        <strong>Cor da Lixeira:</strong>&nbsp;{result.color} 
                                        <FontAwesomeIcon icon={faRecycle} className="icon-color" style={{ color: coresCss[result.color] }} />
                                    </div>
                                    <div className="residue-educational-message">
                                        <h4>Dica de Descarte</h4>
                                        <p>{result.mensagem}</p>
                                    </div>
                                    <small className="confidence-disclaimer">
                                        A confiança dessa análise é de {result.confidence}%, nosso identificador pode cometer erros!
                                    </small>
                                </div>

                                <div className="confirmation-buttons">
                                    <ButtonSecondary onClick={handleReset}>
                                        Errado? Tente Novamente
                                    </ButtonSecondary>
                                    <ButtonPrimary onClick={handleOpenSaveModal} disabled={!user}>
                                        Salvar no Dashboard
                                    </ButtonPrimary>
                                </div>
                            </div>
                        )}
                        {error && <p className="residue-error">{error}</p>}
                    </div>
                </section>
            </main>
            
            <AuthRedirectModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

            <MaterialSelectionModal
                isOpen={isSaveModalOpen}
                onClose={() => setIsSaveModalOpen(false)}
                onConfirm={handleConfirmSave}
                detectedItemName={result?.class || ''}
                // O modal de seleção agora terá as categorias corretas (ex: ["Plástico", "Vidro", "Metal"] para Garrafa)
                categories={result?.categories ? result.categories : ALL_MATERIALS}
            />
        </>
    );
}

export default ResiduePage;