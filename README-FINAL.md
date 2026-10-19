ASSIS MAPS v6 — pacote web/PWA para publicação na Vercel

O QUE O PACOTE FAZ
- Interface de mapa com origem/destino, localização GPS e traçado de rota online via serviços públicos de geocodificação/roteamento.
- Modos carro, moto e a pé na interface. Atenção: o roteador público usado não garante perfil específico de moto; o modo moto pode usar rota rodoviária de carro.
- Instruções de manobra por voz quando o navegador suporta SpeechSynthesis.
- Acompanhamento GPS enquanto a página está ativa, marcador do veículo e compartilhamento do resumo/link da rota.
- Relatório textual com distância, duração, vias e dados locais importados. Chat simples baseado em regras; não é um modelo de IA generativa.
- Verificação de atualização do site/service worker ao recuperar a conexão, voltar ao primeiro plano e periodicamente enquanto a página estiver aberta.
- Importar/exportar JSON para uma fonte de dados que você controla; mantém a última base salva no dispositivo.
- Começa com listas vazias de radares, pedágios, acidentes e riscos para não apresentar coordenadas de exemplo como se fossem reais.

O QUE EXIGE CONFIGURAÇÃO/OUTRO DESENVOLVIMENTO
1. Para sincronizar dados dinâmicos, configure uma URL JSON real em localStorage com a chave assis_maps_data_url. O JSON precisa conter arrays radars, tolls e risks; trafficHints é opcional. Use apenas fonte com licença adequada, atualizada e confiável. Não há uma fonte ao vivo incluída neste pacote.
2. A IA generativa não está conectada. Para respostas livres, é necessário configurar um modelo local ou um backend/API e proteger qualquer chave no servidor, nunca embutir segredo no front-end.
3. Trânsito ao vivo, incidentes, histórico de acidentes, avaliações de vias, radares e tarifas de pedágio dependem de fontes apropriadas. O pacote não pode afirmar que estão atualizados sem recebê-los de uma fonte.
4. Estratégias “economia” e “segurança” são apenas aproximações no roteador público: não garantem evitar pedágios nem minimizam risco com estatísticas oficiais.
5. A perspectiva de mapa aqui continua sendo um mapa 2D com marcador e centralização GPS; não é a câmera 3D inclinada do Google Maps.
6. PWA/Vercel não pode garantir GPS, recálculo e notificações persistentes depois que Android suspende/encerra o navegador. Permissão de notificação não mantém o app rodando.
7. Para navegação contínua com tela bloqueada, o APK precisa de implementação Android nativa testada: serviço de localização em primeiro plano, notificação persistente, permissões de localização/notificação, política de bateria e sincronização em rede. Isso não é entregue como APK nativo neste ZIP.

PUBLICAÇÃO
- Extraia o ZIP e importe a pasta assis-maps-v6 para a Vercel como projeto estático. index.html é a entrada; não requer build.
- GPS e notificações exigem HTTPS e consentimento.
- Teste primeiro parado, em percurso curto, e não confie em dados de alerta não verificados.

Este é o pacote web mais completo dentro das capacidades de uma PWA; não é um substituto completo do Google Maps nem um APK Android nativo final.
