# Tutorial: Configurando GitHub Actions e Variáveis de Ambiente (.env)

Este guia explica como configurar o GitHub Actions no seu projeto e como lidar com variáveis de ambiente (o arquivo `.env`) de forma segura, já que **arquivos .env nunca devem ser commitados no repositório**.

## 1. Configurando Variáveis de Ambiente (Secrets)

No GitHub, você não sobe o arquivo `.env`. Em vez disso, você configura "Secrets" e "Variables" nas configurações do repositório.

1.  Vá até a página do seu repositório no GitHub.
2.  Clique na aba **Settings** (Configurações).
3.  No menu lateral esquerdo, procure por **Secrets and variables** e clique em **Actions**.
4.  Você verá duas abas: "Secrets" e "Variables".
    *   **Secrets**: Para dados sensíveis (chaves de API, senhas, tokens). O valor fica oculto após salvo.
    *   **Variables**: Para dados não sensíveis (URLs públicas, flags de configuração). O valor fica visível.
5.  Clique em **New repository secret** (ou variable).
6.  **Name**: Coloque o nome da variável exatamente como está no seu `.env` (ex: `VITE_API_URL`).
7.  **Secret/Value**: Cole o valor correspondente.
8.  Clique em **Add secret**.

Repita isso para todas as variáveis do seu `.env` que o build precisa.

## 2. Criando o Workflow do GitHub Actions

O GitHub Actions funciona através de arquivos `.yml` dentro da pasta `.github/workflows/`.

1.  Crie a pasta `.github/workflows` na raiz do seu projeto, se não existir.
2.  Crie um arquivo chamado `deploy.yml` (ou `main.yml`) dentro dessa pasta.

### Exemplo de Workflow (Vite/React)

Abaixo um exemplo de como configurar um workflow que injeta as variáveis de ambiente durante o build.

```yaml
name: Build and Deploy

on:
  push:
    branches:
      - main  # Roda quando houver push na branch main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout do código
        uses: actions/checkout@v4

      - name: Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Instalar dependências
        run: npm ci

      - name: Build do Projeto
        # Aqui injetamos as variáveis de ambiente para o comando de build
        env:
          VITE_API_KEY: ${{ secrets.VITE_API_KEY }}
          VITE_API_URL: ${{ vars.VITE_API_URL }}
          # Adicione todas as suas variáveis aqui
        run: npm run build

      # Exemplo: Deploy (se fosse para o Firebase, por exemplo)
      # - name: Deploy to Firebase
      #   uses: FirebaseExtended/action-hosting-deploy@v0
      #   env:
      #     FIREBASE_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      #   with:
      #     repoToken: '${{ secrets.GITHUB_TOKEN }}'
      #     firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT_SEU_PROJETO }}'
      #     channelId: live
      #     projectId: seu-projeto-id
```

## Resumo

1.  **NUNCA** commite o `.env`.
2.  Cadastre as chaves no **GitHub Settings > Secrets and variables > Actions**.
3.  No arquivo `.yml` do workflow, use a chave `env:` para mapear os secrets (`${{ secrets.NOME }}`) para as variáveis de ambiente que o seu script de build espera.
