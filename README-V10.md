# Assis Maps v10 — integração de fontes e validação

## O que este pacote faz automaticamente
- Mapa 2D e mapa vetorial MapLibre/OpenFreeMap com perspectiva, edifícios quando os tiles têm dados e rota desenhada nos dois mapas.
- Consulta de radares, pedágios mapeados, obras e tags de atenção do OpenStreetMap/Overpass para a área visível; dados comunitários não são rotulados como oficiais.
- Geocodificação e cálculo de rota por funções da Vercel.
- Atualização de dados comunitários ao mover o mapa e a cada cinco minutos enquanto a página está ativa.
- Endpoint `/api/data-sources` que verifica a disponibilidade do catálogo DNIT CKAN e informa as fontes oficiais, URLs e situação da integração.
- Endpoint `/api/traffic` preparado para HERE Traffic API. Se `HERE_API_KEY` estiver configurada na Vercel, consulta incidentes da área visível e os apresenta na camada de atenção. Sem chave, informa claramente que o feed ao vivo não está configurado; não inventa ocorrências.
- Endpoint `/api/health` informa APIs e limitações atuais.
- Proteção de bounding box e respostas explícitas para falhas dos serviços.

## Configuração opcional para incidentes ao vivo
1. Crie uma conta HERE e obtenha uma chave válida para Traffic API.
2. Na Vercel: Project → Settings → Environment Variables → `HERE_API_KEY`.
3. Faça redeploy e abra `/api/health`; deve indicar que a integração HERE está configurada.
4. No app, Camadas → Fontes oficiais → Verificar fontes e integrações.

Uma chave válida e o plano do provedor são necessários. A integração entrega incidentes fornecidos pela HERE, não velocidades de trânsito completas nem garantia de que todos os eventos estejam reportados.

## Fontes oficiais e comunitárias
- PRF dados abertos (acidentes históricos, CSV/ZIP, atualização mensal): https://www.gov.br/prf/pt-br/acesso-a-informacao/dados-abertos/dados-abertos-da-prf
- PRF radares fixos: https://www.gov.br/prf/pt-br/assuntos/fiscalizacao-de-velocidade/radares-fixos
- DNIT datasets: https://servicos.dnit.gov.br/dadosabertos/ e https://www.gov.br/dnit/pt-br/acesso-a-informacao/dados-abertos/conjuntos-de-dados
- HERE Traffic API: https://docs.here.com/traffic-api/docs/overview
- OSM: https://www.openstreetmap.org/copyright

## Limitações que não podem ser removidas só por código local
- A página PRF publica arquivos CSV/ZIP, não uma API JSON de incidentes ao vivo. Este pacote descobre as fontes e fornece os links, mas **não ingere ainda o histórico PRF em uma base geoespacial persistente nem calcula mapa de calor oficial**. Isso requer pipeline de importação e armazenamento persistente.
- Os datasets do DNIT têm formatos/frequências diferentes. O endpoint descobre metadados, mas não afirma que todos os recursos foram geocodificados e plotados.
- Trânsito em tempo real requer chave/plano de um provedor. HERE é opcional e retorna incidentes, não necessariamente fluxo de velocidade em todas as vias.
- Não há feed público único e garantido de acidentes recentes, tarifas atuais de todos os pedágios, ou API oficial aberta de radares com garantias de atualização.
- A estratégia econômica não garante evitar pedágios e não calcula custo total. O perfil de moto ainda usa roteamento de carro.
- PWA/browser não garante localização em segundo plano após bloqueio de tela/encerramento. Para isso, é necessário projeto Android nativo com foreground service, permissões e testes num dispositivo físico.
- Rotas e tiles públicos podem impor limites, mudar ou ficar indisponíveis. Não use este projeto como única fonte para dirigir; siga placas e condições reais.

## Testes realizados
- Sintaxe de todos os endpoints JavaScript com `node --check`.
- Sintaxe dos scripts inline de `index.html` validada separadamente.
- JSON de `vercel.json`, manifest e package validado.
- Testes unitários básicos dos validadores de bounding box e parser de status.
- Integridade do ZIP validada com `unzip -t`.

Os testes estáticos não equivalem a testes de ponta a ponta em produção. APIs externas, credenciais e permissões Android devem ser validadas depois do deploy.
