import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GEMINI_MODELS, OPENAI_MODELS, type Language, type DescriptionStyle } from '../../types';
import Modal from '../UI/Modal';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Badge from '../UI/Badge';
import Glossary from './Glossary';
import { Info } from 'lucide-react';
import './Settings.css';

export default function Settings({ onClose }: { onClose: () => void }) {
    const {
        apiKey,
        setApiKey,
        provider,
        setProvider,
        model,
        setModel,
        language,
        setLanguage,
        style,
        setStyle,
        history,
    } = useApp();
    const [localKey, setLocalKey] = useState(apiKey);
    const [error, setError] = useState('');

    const models = provider === 'gemini' ? GEMINI_MODELS : OPENAI_MODELS;

    const handleProviderChange = (newProvider: 'gemini' | 'openai') => {
        setProvider(newProvider);
        setModel(newProvider === 'gemini' ? GEMINI_MODELS[0] : OPENAI_MODELS[0]);
    };

    const handleSave = () => {
        if (!localKey.trim()) {
            setError('A chave de API é obrigatória');
            return;
        }
        setApiKey(localKey);
        setError('');
        onClose();
    };

    return (
        <Modal
            isOpen={true}
            onClose={onClose}
            title="⚙️ Configurações da API"
            size="lg"
            scrollable
            footer={
                <Button variant="primary" size="lg" onClick={handleSave} fullWidth>
                    Salvar e Continuar
                </Button>
            }
        >
            <div className="settings-content">
                <p className="settings-subtitle">
                    🔒 Suas chaves de API são armazenadas localmente e nunca enviadas para nossos servidores.
                </p>

                <div className="settings-form">
                    {/* Provider Selection */}
                    <div className="form-group">
                        <label className="form-label">Provedor de IA</label>
                        <div className="provider-buttons">
                            <Button
                                variant={provider === 'gemini' ? 'primary' : 'secondary'}
                                size="md"
                                onClick={() => handleProviderChange('gemini')}
                                fullWidth
                            >
                                Google Gemini
                            </Button>
                            <Button
                                variant={provider === 'openai' ? 'primary' : 'secondary'}
                                size="md"
                                onClick={() => handleProviderChange('openai')}
                                fullWidth
                            >
                                OpenAI
                            </Button>
                        </div>
                    </div>

                    {/* Model Selection */}
                    <div className="form-group">
                        <label className="form-label">Modelo</label>
                        <select
                            className="input"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                        >
                            {models.map((m) => (
                                <option key={m} value={m}>
                                    {m}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Language Selection */}
                    <div className="form-group">
                        <label className="form-label">Idioma de Saída</label>
                        <select
                            className="input"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as Language)}
                        >
                            <option value="pt-BR">Português (Brasil)</option>
                            <option value="en-US">English (US)</option>
                            <option value="es-ES">Español</option>
                        </select>
                    </div>

                    {/* Style Selection */}
                    <div className="form-group">
                        <label className="form-label">Estilo da Descrição</label>
                        <select
                            className="input"
                            value={style}
                            onChange={(e) => setStyle(e.target.value as DescriptionStyle)}
                        >
                            <option value="concise">Conciso (Direto ao ponto)</option>
                            <option value="detailed">Detalhado (Completo)</option>
                            <option value="formal">Formal (Profissional)</option>
                            <option value="informal">Informal (Casual)</option>
                        </select>
                    </div>

                    {/* API Key Input */}
                    <Input
                        label={`Chave da API ${provider === 'gemini' ? 'Gemini' : 'OpenAI'}`}
                        id="api-key"
                        type="password"
                        placeholder="Insira sua chave de API"
                        value={localKey}
                        onChange={(e) => setLocalKey(e.target.value)}
                        error={error}
                    />

                    {/* Info Box */}
                    <div className="settings-info">
                        <Info size={16} />
                        <span>
                            Obtenha sua chave de API no{' '}
                            {provider === 'gemini' ? (
                                <a
                                    href="https://aistudio.google.com/app/apikey"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Google AI Studio
                                </a>
                            ) : (
                                <a
                                    href="https://platform.openai.com/api-keys"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    OpenAI Platform
                                </a>
                            )}
                        </span>
                    </div>

                    {/* Glossary */}
                    <Glossary />

                    {/* Usage Stats */}
                    <div className="usage-section">
                        <h3 className="section-title">📊 Uso da API</h3>
                        <div className="usage-stats">
                            <div className="stat-item">
                                <span className="stat-label">Requisições (Sessão)</span>
                                <Badge variant="primary">{history.length}</Badge>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Status do Serviço</span>
                                <Badge variant="success" dot>Operacional</Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
