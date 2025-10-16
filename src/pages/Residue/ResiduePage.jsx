import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import ButtonPrimary from "@/components/Button/ButtonPrimary.jsx";
import ButtonSecondary from "@/components/Button/ButtonSecondary.jsx";
import "./Residue.css";

import imageCompression from 'browser-image-compression';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecycle } from '@fortawesome/free-solid-svg-icons';

// Mapeamento para detalhes de descarte
const mapeamentoDetalhes = {
    'plastic': { color: 'Vermelho', mensagem: 'Lave as embalagens plásticas para remover restos de alimentos. Tampas podem ser recicladas junto com as garrafas. Plásticos como PET levam mais de 400 anos para se decompor!' },
    'paper': { color: 'Azul', mensagem: 'Papéis e papelões devem estar secos e limpos. Evite amassar, apenas dobre. Caixas de pizza engorduradas e guardanapos sujos não são recicláveis.' },
    'cardboard': { color: 'Azul', mensagem: 'Desmonte as caixas de papelão para economizar espaço. Certifique-se de que não estejam molhadas ou engorduradas, pois isso contamina o processo de reciclagem.' },
    'glass': { color: 'Verde', mensagem: 'O vidro é 100% reciclável! Lave os potes e garrafas. Se estiver quebrado, enrole em jornal para proteger os coletores e descarte no lixo comum com um aviso.' },
    'metal': { color: 'Amarelo', mensagem: 'Latas de alumínio e aço são altamente recicláveis. Lave as latas de alimentos para evitar mau cheiro e contaminação. Amasse-as para otimizar o espaço.' },
    'organic': { color: 'Marrom', mensagem: 'Resíduos orgânicos, como restos de frutas e vegetais, podem virar adubo através da compostagem, reduzindo o lixo em aterros e gerando um rico fertilizante para plantas.' },
    'biodegradable': { color: 'Marrom', mensagem: 'Resíduos biodegradáveis, como restos de alimentos e plantas, podem se decompor naturalmente e virar adubo através da compostagem.' },
    'stone': { color: 'Cinza', mensagem: 'Pedras e pequenas quantidades de entulho são considerados rejeitos. Para grandes volumes, como restos de obra, procure um Ecoponto ou um serviço de coleta especializado.' }
};

const traducaoClasses = {
    'plastic': 'Plástico',
    'paper': 'Papel',
    'cardboard': 'Papelão',
    'glass': 'Vidro',
    'metal': 'Metal',
    'organic': 'Orgânico',
    'biodegradable': 'Biodegradável',
    'stone': 'Pedra'
};

const infoPadrao = { color: 'Cinza', mensagem: 'Este resíduo é considerado rejeito e não deve ser descartado na coleta seletiva. Deposite-o no lixo comum. Isso inclui lixo de banheiro, fraldas e absorventes.' };
const coresCss = { 'Vermelho': '#e74c3c', 'Azul': '#3498db', 'Verde': '#2ecc71', 'Amarelo': '#f1c40f', 'Marrom': '#964B00', 'Cinza': '#95a5a6' };


function ResiduePage() {
    const navigate = useNavigate(); // Inicialização correta

    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    // ADICIONE O USEEFFECT DE VOLTA
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    // ADICIONE AS FUNÇÕES DE VOLTA
    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) {
            return;
        }
        setResult(null);
        setError(null);
        setLoading(true);
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };
        try {
            const compressedFile = await imageCompression(selectedFile, options);
            setFile(compressedFile);
            setPreviewUrl(URL.createObjectURL(compressedFile));
        } catch (err) {
            console.error("Erro ao comprimir imagem:", err);
            setError("Não foi possível processar esta imagem. Tente outra.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append('file', file);
        try {
            const apiKey = import.meta.env.VITE_ROBOFLOW_API_KEY;
            if (!apiKey) throw new Error("Chave de API não configurada.");
            const response = await axios.post(
                `https://detect.roboflow.com/waste-classification-uwqfy/1?api_key=${apiKey}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            const prediction = response.data.predictions[0];
            if (prediction) {
                const classeDetectada = prediction.class.toLowerCase();
                const nomeTraduzido = traducaoClasses[classeDetectada] || prediction.class;
                const infoResiduo = mapeamentoDetalhes[classeDetectada] || infoPadrao;
                setResult({
                    class: nomeTraduzido,
                    confidence: (prediction.confidence * 100).toFixed(2),
                    ...infoResiduo
                });
            } else {
                setError('Nenhum objeto foi detectado na imagem. Tente outra foto.');
            }
        } catch (err) {
            console.error(err);
            setError(`Erro ao analisar a imagem: ${err.message}`);
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
        fileInputRef.current.click();
    };

    const handleCameraClick = () => {
        navigate('/live');
    };

    // ADICIONE O RETURN COM O JSX DE VOLTA
    return (
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
                                    <FontAwesomeIcon
                                        icon={faRecycle}
                                        className="icon-color"
                                        style={{ color: coresCss[result.color] }}
                                    />
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
    );
}

export default ResiduePage;