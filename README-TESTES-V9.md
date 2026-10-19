# Testes locais executados
- `node --check` em cada função JavaScript da pasta `api/`.
- Sintaxe dos scripts inline de `index.html` validada com Node.
- `vercel.json` e `manifest.webmanifest` validados como JSON.
- Arquivo ZIP verificado com `unzip -t`.

Limite: não foi possível fazer teste de ponta a ponta dos serviços externos dentro do ambiente de geração. Depois de publicar, abra `/api/health`, permita GPS/notificações e teste uma rota curta. A disponibilidade dos endpoints públicos externos pode variar.
