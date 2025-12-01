# Planejamento Sprint 2 - Estabilidade & Funcionalidades Avançadas
**Período:** 21/11 — 11/12/2025
**Foco:** Autenticação, Histórico e Infraestrutura

## Histórias de Usuário e Status de Implementação

### S6 — Autenticação (Google/GitHub) + Conta
**Pontos:** 5
**Status:** ✅ Implementado (Firebase Auth)
- **Requisitos:**
  - [x] Login Google
  - [x] Login GitHub
  - [x] Persistência de sessão
  - [x] Armazenamento seguro de API Key (Local/Encrypted)
- **Arquivos Relacionados:**
  - `src/components/Auth/Login.tsx` (UI Login)
  - `src/context/AuthContext.tsx` (Lógica Auth)
  - `src/firebase/config.ts` (Configuração Firebase)

### S7 — Histórico de sessões e busca
**Pontos:** 5
**Status:** 📅 Planejado
- **Requisitos:**
  - [ ] Listagem de uploads anteriores
  - [ ] Filtros por data/nome
- **Arquivos Relacionados:**
  - `src/components/History/History.tsx` (Novo Componente)

### S8 — Glossário / Customização de termos
**Pontos:** 3
**Status:** 📅 Planejado
- **Requisitos:**
  - [ ] CRUD de termos personalizados
  - [ ] Injeção no prompt da IA
- **Arquivos Relacionados:**
  - `src/components/Settings/Glossary.tsx` (Novo Componente)

### S9 — Notificações lote concluído
**Pontos:** 3
**Status:** 📅 Planejado
- **Requisitos:**
  - [ ] Feedback visual (Toast/Notification) ao finalizar lote
- **Arquivos Relacionados:**
  - `src/components/UI/Toast.tsx`

### S10 — Rate limiting/painel consumo
**Pontos:** 3
**Status:** 📅 Planejado
- **Requisitos:**
  - [ ] Monitoramento de uso de tokens
  - [ ] Limites de requisição

### S11 — Multi-idioma avançado
**Pontos:** 8
**Status:** 🚧 Parcial (Prompt suporta, UI precisa de seletor)
- **Requisitos:**
  - [ ] Detecção automática
  - [ ] Suporte explícito a múltiplos idiomas de saída

### S12 — CI/CD + Deploy Firebase
**Pontos:** 3
**Status:** ✅ Implementado
- **Requisitos:**
  - [x] Scripts de build e deploy
  - [x] Configuração Firebase Hosting
- **Arquivos Relacionados:**
  - `deploy.sh`
  - `.github/workflows/main.yml` (A criar)
