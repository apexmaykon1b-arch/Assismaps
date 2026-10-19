ASSIS MAPS — ATUALIZAÇÃO AUTOMÁTICA

- Verifica atualizações do site/service worker ao abrir, voltar ao primeiro plano, recuperar internet e a cada 5 minutos enquanto está aberto.
- Durante uma navegação ativa, tenta recalcular a rota quando a internet volta e periodicamente; o app mostra horário de início e conclusão/falha e pode enviar notificações se o usuário permitir.
- Em navegador/PWA, execução em segundo plano NÃO é garantida pelo Android. Para manter GPS e navegação com a tela bloqueada, o APK precisa de Foreground Service Android nativo e notificação persistente.
- A base demonstrativa de radares, pedágios e riscos NÃO vira dado real só por estar online. Para atualizar esses dados, hospede JSON confiável com `radars`, `tolls`, `risks` e opcionalmente `trafficHints`, e configure `assis_maps_data_url` no armazenamento local; o servidor deve permitir CORS.
- Trânsito/acidentes ao vivo exigem API específica e seus termos/chaves. Nenhuma fonte ao vivo vem configurada por padrão.
- As notificações exigem HTTPS, suporte do navegador e permissão explícita. A estimativa de 30 segundos não é garantia.
