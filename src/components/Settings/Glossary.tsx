import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Badge from '../UI/Badge';
import Card from '../UI/Card';
import { Plus, Info } from 'lucide-react';
import './Glossary.css';

export default function Glossary() {
    const { glossary, addGlossaryTerm, removeGlossaryTerm } = useApp();
    const [newTerm, setNewTerm] = useState('');
    const [newDefinition, setNewDefinition] = useState('');

    const addTerm = () => {
        if (newTerm.trim() && newDefinition.trim()) {
            addGlossaryTerm(newTerm.trim(), newDefinition.trim());
            setNewTerm('');
            setNewDefinition('');
        }
    };

    const removeTerm = (index: number) => {
        removeGlossaryTerm(index);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            addTerm();
        }
    };

    return (
        <div className="glossary-section">
            <div className="glossary-header">
                <h3 className="section-title">📚 Glossário Personalizado</h3>
                <Badge variant="info" size="sm">Opcional</Badge>
            </div>

            <div className="glossary-info">
                <Info size={16} />
                <p>
                    Defina termos específicos que a IA deve usar ao descrever suas imagens.
                    Por exemplo: <code>"Logo"</code> → <code>"Logotipo da MinhaMarca"</code>
                </p>
            </div>

            {/* Existing Terms */}
            {glossary.length > 0 && (
                <Card className="glossary-list" padding="sm" variant="flat">
                    <div className="glossary-list-header">
                        <span className="glossary-count">
                            {glossary.length} {glossary.length === 1 ? 'termo' : 'termos'}
                        </span>
                    </div>
                    <div className="glossary-items">
                        {glossary.map((item, index) => (
                            <div key={index} className="glossary-item">
                                <div className="glossary-item-content">
                                    <span className="glossary-term">{item.term}</span>
                                    <span className="glossary-arrow">→</span>
                                    <span className="glossary-definition">{item.definition}</span>
                                </div>
                                <Badge
                                    variant="error"
                                    size="sm"
                                    onRemove={() => removeTerm(index)}
                                    styleVariant="outline"
                                >
                                    Remover
                                </Badge>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Add New Term */}
            <div className="glossary-add">
                <div className="glossary-inputs">
                    <Input
                        id="glossary-term"
                        placeholder="Ex: Logo"
                        value={newTerm}
                        onChange={(e) => setNewTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                        inputSize="sm"
                    />
                    <span className="glossary-arrow-input">→</span>
                    <Input
                        id="glossary-definition"
                        placeholder="Ex: Logotipo da MinhaMarca"
                        value={newDefinition}
                        onChange={(e) => setNewDefinition(e.target.value)}
                        onKeyPress={handleKeyPress}
                        inputSize="sm"
                    />
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={addTerm}
                    disabled={!newTerm.trim() || !newDefinition.trim()}
                    icon={<Plus size={16} />}
                >
                    Adicionar
                </Button>
            </div>

            <div className="glossary-examples">
                <p className="examples-title">Exemplos úteis:</p>
                <ul className="examples-list">
                    <li><code>CEO</code> → <code>João Silva, CEO da Empresa</code></li>
                    <li><code>Produto</code> → <code>Software XYZ</code></li>
                    <li><code>Escritório</code> → <code>Sede em São Paulo, Brasil</code></li>
                </ul>
            </div>
        </div>
    );
}
