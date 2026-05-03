# WhatsApp Bot App

Interface gráfica para o bot do WhatsApp com auto-update.

## Instalação

```bash
cd whatsapp-bot-app
npm install
```

## Executar

```bash
npm start
```

## Build (criar .exe)

```bash
npm run build
```

## Auto-update

Configure no `package.json` replace `seu-usuario` e `whatsapp-bot-repo` com seu usuário e repositório GitHub.

O app verifica updates automaticamente ao iniciar.

## Estrutura

```
whatsapp-bot-app/
├── src/
│   ├── main.js          # Código principal
│   ├── preload.js       # API segura
│   └── renderer/
│       └── index.html  # Interface
├── package.json
└── build.bat
```

## Requisitos

- Node.js 18+
- Python 3.10+ (para o bot)