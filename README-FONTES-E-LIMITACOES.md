# Assis Maps v7 — fontes e limitações

## Fontes de referência
- PRF — radares fixos: https://www.gov.br/prf/pt-br/assuntos/fiscalizacao-de-velocidade/radares-fixos
- DNIT — dados abertos, incluindo condições do pavimento e controle de velocidade: https://www.gov.br/dnit/pt-br/acesso-a-informacao/dados-abertos/conjuntos-de-dados
- PRF — portal de dados abertos: https://www.gov.br/prf/pt-br/acesso-a-informacao/dados-abertos/dados-abertos
- Mapa base OpenStreetMap: https://www.openstreetmap.org/ (atribuição obrigatória; respeitar política dos tiles: https://operations.osmfoundation.org/policies/tiles/)
- Geocodificação Nominatim e roteamento OSRM são serviços públicos de demonstração, sem SLA; não tratar como infraestrutura de produção.

## Importante
O aplicativo não baixa automaticamente os dados da PRF/DNIT porque as páginas/datasets não oferecem, nesta implementação, um endpoint JSON universal pronto para consulta ao vivo. Os pontos fictícios foram removidos para evitar exibir radares, pedágios ou riscos inventados. Para alimentar a base, crie um processo de importação/normalização dos arquivos oficiais e configure um endpoint JSON seu.

A opção 3D atual é somente uma inclinação visual experimental em CSS, não é uma renderização geográfica 3D real nem uma câmera com rotação/bearing correta. Navegação real 3D exige migração para MapLibre GL JS/Mapbox GL ou SDK nativo, um estilo de mapa compatível e, para edifícios/terreno, fontes de dados 3D.

Trânsito ao vivo, acidentes recentes, preços de pedágio, avaliações de vias e alertas comunitários ainda não estão integrados. Não use o protótipo como única fonte para decisões de condução.
