# Planejamento Sprint 1 - Core MVP
**Período:** Até 21/11/2025
**Foco:** MVP Mínimo Funcional (Upload > IA > Alt Text > Revisão > Export)

## Histórias de Usuário e Status de Implementação

### S1 — Upload de imagem(s) (único e lote)
**Pontos:** 5
**Status:** ✅ Implementado (Frontend) / 🚧 Backend (Firebase Storage)
- **Requisitos:**
  - [x] Drag-and-drop para múltiplos arquivos
  - [x] Validação de formatos (JPG, PNG, WEBP)
  - [x] Feedback visual de progresso
- **Arquivos Relacionados:**
  - `src/components/Workspace/Workspace.tsx` (Interface de Upload)
  - `src/services/storage-service.ts` (Lógica de Storage - A implementar)

### S2 — Processamento com IA e geração de metadados
**Pontos:** 8
**Status:** ✅ Implementado (Integração Gemini/OpenAI)
- **Requisitos:**
  - [x] Integração com API de Visão (Gemini/OpenAI)
  - [x] Extração de metadados (objetos, cores, etc.)
  - [x] Tratamento de erros e retry
- **Arquivos Relacionados:**
  - `src/services/ai-service.ts` (Integração APIs)
  - `src/context/AppContext.tsx` (Gerenciamento de Estado)

### S3 — Gerar Alt Text (texto) com parâmetros
**Pontos:** 5
**Status:** ✅ Implementado (Básico) / 🚧 Melhorias (Estilos)
- **Requisitos:**
  - [x] Geração de descrição base
  - [ ] Seleção de idioma/estilo (Conciso, Detalhado, etc.)
  - [ ] Sugestão para imagens decorativas
- **Arquivos Relacionados:**
  - `src/components/Settings/Settings.tsx` (Configuração de Prompt)
  - `src/services/ai-service.ts` (Prompt Engineering)

### S4 — Revisar/Editar e Confirmar Alt Text
**Pontos:** 5
**Status:** 🚧 Em Progresso
- **Requisitos:**
  - [x] Visualização da imagem + texto gerado
  - [ ] Interface de edição (Chat-like ou Textarea)
  - [ ] Botão de Aprovação
- **Arquivos Relacionados:**
  - `src/components/Results/Results.tsx` (Display de Resultados)

### S5 — Exportar JSON estruturado
**Pontos:** 3
**Status:** 🚧 A Implementar
- **Requisitos:**
  - [ ] Botão de exportar JSON
  - [ ] Estrutura: `{"image_name": {"alt": "...", "meta": ...}}`
- **Arquivos Relacionados:**
  - `src/components/Results/Results.tsx` (Botão Exportar)
  - `src/utils/export-utils.ts` (Lógica de geração JSON)
