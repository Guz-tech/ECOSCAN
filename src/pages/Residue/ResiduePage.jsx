import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ButtonPrimary from "@/components/Button/ButtonPrimary.jsx";
import ButtonSecondary from "@/components/Button/ButtonSecondary.jsx";
import "./Residue.css";

function ResiduePage() {
  console.log("Variáveis de Ambiente Carregadas:", import.meta.env);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setResult(null);
      setError(null);
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
        setResult({ class: prediction.class, confidence: (prediction.confidence * 100).toFixed(2) });
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
                <ButtonSecondary onClick={handleChooseFileClick}>Usar câmera</ButtonSecondary>
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
                <p><strong>Confiança:</strong> {result.confidence}%</p>
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