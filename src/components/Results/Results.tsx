import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { type Result } from '../../types';
import Card, { CardHeader, CardBody } from '../UI/Card';
import Button from '../UI/Button';
import Badge from '../UI/Badge';
import { Copy, Check, Edit2, Save, Download, FileText, Trash2, Image as ImageIcon, ChevronDown, ChevronUp } from 'lucide-react';
import './Results.css';

export default function Results() {
    const { results, updateResult, handleDownloadCSV, clearResults } = useApp();

    return (
        <div className="results">
            <div className="results__header">
                <div className="results__header-left">
                    <h2 className="results__title">Resultados</h2>
                    <Badge variant="primary" size="md">
                        {results.length} {results.length === 1 ? 'imagem' : 'imagens'}
                    </Badge>
                </div>
                <div className="results__header-actions">
                    <Button
                        variant="ghost"
                        size="md"
                        onClick={clearResults}
                        icon={<Trash2 size={18} />}
                    >
                        Limpar
                    </Button>
                    <Button
                        variant="secondary"
                        size="md"
                        onClick={handleDownloadCSV}
                        icon={<Download size={18} />}
                    >
                        Exportar CSV
                    </Button>
                </div>
            </div>

            <div className="results__list">
                {results.map((result, index) => (
                    <ResultCard
                        key={index}
                        result={result}
                        onUpdate={(newAlt) => updateResult(index, { alt: newAlt })}
                    />
                ))}
            </div>
        </div>
    );
}

function ResultCard({ result, onUpdate }: { result: Result; onUpdate: (alt: string) => void }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(result.alt);
    const [copied, setCopied] = useState(false);
    const [showImage, setShowImage] = useState(true);
    const [showMetadata, setShowMetadata] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(result.alt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSave = () => {
        onUpdate(editValue);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditValue(result.alt);
        setIsEditing(false);
    };

    return (
        <Card className="result-card" padding="none" variant="default">
            <CardHeader>
                <div className="result-card__header">
                    <div className="result-card__filename">
                        <FileText size={16} />
                        <span>{result.filename}</span>
                    </div>
                    <div className="result-card__actions">
                        {result.imageUrl && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowImage(!showImage)}
                                icon={<ImageIcon size={16} />}
                            >
                                {showImage ? 'Ocultar' : 'Mostrar'}
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsEditing(!isEditing)}
                            icon={<Edit2 size={16} />}
                        >
                            {isEditing ? 'Cancelar' : 'Editar'}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopy}
                            icon={copied ? <Check size={16} /> : <Copy size={16} />}
                        >
                            {copied ? 'Copiado!' : 'Copiar'}
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardBody>
                <div className="result-card__content">
                    {/* Image Preview */}
                    {result.imageUrl && showImage && (
                        <div className="result-image">
                            <img src={result.imageUrl} alt={result.filename} />
                        </div>
                    )}

                    {/* ALT Text Section */}
                    <div className="result-field">
                        <label className="result-field__label">
                            ALT TEXT
                            <Badge variant="info" size="sm" styleVariant="outline">
                                SEO
                            </Badge>
                        </label>
                        {isEditing ? (
                            <div className="result-field__edit">
                                <textarea
                                    className="input result-textarea"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    rows={3}
                                />
                                <div className="result-field__edit-actions">
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={handleSave}
                                        icon={<Save size={16} />}
                                    >
                                        Salvar
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={handleCancel}
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="result-field__value">
                                <code className="result-code">{result.alt}</code>
                            </div>
                        )}
                    </div>

                    {/* Description Section */}
                    <div className="result-field">
                        <label className="result-field__label">
                            DESCRIÇÃO
                            <Badge variant="success" size="sm" styleVariant="outline">
                                Detalhada
                            </Badge>
                        </label>
                        <div className="result-field__value">
                            <p className="result-description">{result.description}</p>
                        </div>
                    </div>

                    {/* Metadata if available */}
                    {result.metadata && (
                        <div className="result-metadata-section">
                            <button
                                className="result-metadata-toggle"
                                onClick={() => setShowMetadata(!showMetadata)}
                            >
                                {showMetadata ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                {showMetadata ? 'Ocultar Metadados' : 'Mostrar Metadados'}
                            </button>

                            {showMetadata && (
                                <div className="result-metadata">
                                    <div className="result-metadata__item">
                                        <span className="result-metadata__label">Confiança:</span>
                                        <Badge variant="primary" size="sm">
                                            {(result.metadata.confidence * 100).toFixed(0)}%
                                        </Badge>
                                    </div>
                                    {result.metadata.objects && result.metadata.objects.length > 0 && (
                                        <div className="result-metadata__item">
                                            <span className="result-metadata__label">Objetos:</span>
                                            <div className="result-metadata__tags">
                                                {result.metadata.objects.slice(0, 5).map((obj: string, idx: number) => (
                                                    <Badge key={idx} variant="default" size="sm">
                                                        {obj}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </CardBody>
        </Card>
    );
}
