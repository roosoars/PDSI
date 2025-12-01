import { useApp } from '../../context/AppContext';
import { Clock, Trash2, FileText } from 'lucide-react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Badge from '../UI/Badge';
import './History.css';

export default function History() {
    const { history, clearHistory } = useApp();

    if (history.length === 0) {
        return (
            <div className="history-empty">
                <Clock size={48} />
                <h3>Nenhum histórico</h3>
                <p>Suas gerações aparecerão aqui</p>
            </div>
        );
    }

    return (
        <div className="history">
            <div className="history__header">
                <div className="history__header-left">
                    <h2 className="history__title">Histórico</h2>
                    <Badge variant="primary" size="md">
                        {history.length} {history.length === 1 ? 'item' : 'itens'}
                    </Badge>
                </div>
                <Button
                    variant="ghost"
                    size="md"
                    onClick={clearHistory}
                    icon={<Trash2 size={18} />}
                >
                    Limpar Histórico
                </Button>
            </div>

            <div className="history__list">
                {history.map((item, index) => (
                    <Card key={index} className="history-item" padding="md" variant="default">
                        <div className="history-item__header">
                            <div className="history-item__filename">
                                <FileText size={16} />
                                <span>{item.filename}</span>
                            </div>
                            <Badge variant="success" size="sm" styleVariant="outline">
                                Gerado
                            </Badge>
                        </div>
                        <div className="history-item__content">
                            <div className="history-item__field">
                                <label className="history-item__label">ALT TEXT</label>
                                <p className="history-item__value">{item.alt}</p>
                            </div>
                            {item.description && (
                                <div className="history-item__field">
                                    <label className="history-item__label">DESCRIÇÃO</label>
                                    <p className="history-item__value history-item__description">
                                        {item.description}
                                    </p>
                                </div>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
