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

const mapeamentoDetalhes = {
    'plastic': { categories: ["Plástico"], color: 'Vermelho', mensagem: 'Lave as embalagens plásticas para remover restos de alimentos. Tampas podem ser recicladas junto com as garrafas. Plásticos como PET levam mais de 400 anos para se decompor!' },
    'paper': { categories: ["Papel"], color: 'Azul', mensagem: 'Papéis e papelões devem estar secos e limpos. Evite amassar, apenas dobre. Caixas de pizza engorduradas e guardanapos sujos não são recicláveis.' },
    'cardboard': { categories: ["Papelão"], color: 'Azul', mensagem: 'Desmonte as caixas de papelão para economizar espaço. Certifique-se de que não estejam molhadas ou engorduradas, pois isso contamina o processo de reciclagem.' },
    'glass': { categories: ["Vidro"], color: 'Verde', mensagem: 'O vidro é 100% reciclável! Lave os potes e garrafas. Se estiver quebrado, enrole em jornal para proteger os coletores e descarte no lixo comum com um aviso.' },
    'metal': { categories: ["Metal"], color: 'Amarelo', mensagem: 'Latas de alumínio e aço são altamente recicláveis. Lave as latas de alimentos para evitar mau cheiro e contaminação. Amasse-as para otimizar o espaço.' },
    'organic': { categories: ["Orgânico"], color: 'Marrom', mensagem: 'Resíduos orgânicos, como restos de frutas e vegetais, podem virar adubo através da compostagem, reduzindo o lixo em aterros e gerando um rico fertilizante para plantas.' },
    'biodegradable': { categories: ["Orgânico"], color: 'Marrom', mensagem: 'Resíduos biodegradáveis, como restos de alimentos e plantas, podem se decompor naturalmente e virar adubo através da compostagem.' },
    'stone': { categories: ["Rejeito"], color: 'Cinza', mensagem: 'Pedras e pequenas quantidades de entulho são considerados rejeitos. Para grandes volumes, como restos de obra, procure um Ecoponto ou um serviço de coleta especializado.' }
};
const traducaoClasses = { 'plastic': 'Plástico', 'paper': 'Papel', 'cardboard': 'Papelão', 'glass': 'Vidro', 'metal': 'Metal', 'organic': 'Orgânico', 'biodegradable': 'Biodegradável', 'stone': 'Pedra' };
const infoPadrao = { color: 'Cinza', mensagem: 'Este resíduo é considerado rejeito e não deve ser descartado na coleta seletiva. Deposite-o no lixo comum. Isso inclui lixo de banheiro, fraldas e absorventes.' };
const coresCss = { 'Vermelho': '#e74c3c', 'Azul': '#3498db', 'Verde': '#2ecc71', 'Amarelo': '#f1c40f', 'Marrom': '#964B00', 'Cinza': '#95a5a6' };


// --- Nova função para converter o arquivo para Base64 ---
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fileInputRef = useRef(null);

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

    // --- Função handleUpload totalmente refeita ---
    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);
        setError(null);

        try {
            // 1. Converte a imagem para Base64
            const base64Image = await toBase64(file);

            const apiKey = import.meta.env.VITE_ROBOFLOW_API_KEY;
            if (!apiKey) throw new Error("Chave de API não configurada.");
            
            // 2. Monta a URL da API
            const url = `https://detect.roboflow.com/waste-classification-uwqfy/1?api_key=${apiKey}`;

            // 3. Envia a string Base64 no corpo da requisição
            const response = await axios.post(url, base64Image, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });

            const prediction = response.data.predictions[0];
            if (prediction) {
                const classeDetectada = prediction.class.toLowerCase();
                const nomeTraduzido = traducaoClasses[classeDetectada] || prediction.class;
                const infoResiduo = mapeamentoDetalhes[classeDetectada] || infoPadrao;
                const primaryMaterial = infoResiduo.categories ? infoResiduo.categories[0] : nomeTraduzido;
                const scanResult = { class: nomeTraduzido, confidence: (prediction.confidence * 100).toFixed(2), ...infoResiduo };
                setResult(scanResult);
                if (user && primaryMaterial) {
                    await axios.post(`${apiUrl}/history`, { material_type: primaryMaterial, confidence: prediction.confidence }, { withCredentials: true });
                }
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
    };

    const handleChooseFileClick = () => {
        if (!user) {
            setIsModalOpen(true);
            return;
        }
        fileInputRef.current.click();
    };

    const handleCameraClick = () => {
        if (!user) {
            setIsModalOpen(true);
            return;
        }
        navigate('/live');
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
                                        <strong>Cor da Lixeira:</strong>  {result.color}
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
                                <ButtonPrimary onClick={handleReset}>Analisar Outra Imagem</ButtonPrimary>
                            </div>
                        )}
                        {error && <p className="residue-error">{error}</p>}
                    </div>
                </section>
            </main>
            <AuthRedirectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}

export default ResiduePage;