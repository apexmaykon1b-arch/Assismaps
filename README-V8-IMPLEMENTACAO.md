# Assis Maps — atualização v8

## Implementado nesta versão
- Alternância 2D/3D usando MapLibre GL JS e o estilo vetorial Liberty do OpenFreeMap.
- Câmera inclinada no mapa 3D e camada de edifícios extrudidos quando o nível de zoom e os dados de altura permitem.
- Linha da rota desenhada também na visualização 3D, sincronizada quando uma rota é calculada ou recalculada.
- Mantidas as fontes oficiais da PRF e do DNIT e a remoção de pontos fictícios.

## Limitações importantes
- A camada 3D precisa de conexão com a internet e de disponibilidade do serviço de tiles. A cobertura/detalhe de edifícios varia por região.
- O roteamento continua usando serviços públicos de demonstração do OSRM/routed-foot; não há garantia de disponibilidade ou qualidade de produção.
- Não há integração automática dos arquivos oficiais da PRF/DNIT; os links levam às fontes. Também não há feed de trânsito ao vivo, acidentes ao vivo, preços de pedágio ou risco calculado por histórico.
- A atualização periódica no navegador só ocorre enquanto o navegador/PWA consegue executar. Atualização contínua em segundo plano exige app Android nativo/serviço em primeiro plano.
- Não use como única fonte para decisões de direção. Confira sinalização, condições locais e informações oficiais.

## Fontes e tecnologias
- MapLibre GL JS: https://maplibre.org/maplibre-gl-js/docs/
- OpenFreeMap: https://openfreemap.org/quick_start/
- PRF radares fixos: https://www.gov.br/prf/pt-br/assuntos/fiscalizacao-de-velocidade/radares-fixos
- DNIT dados abertos: https://www.gov.br/dnit/pt-br/acesso-a-informacao/dados-abertos/conjuntos-de-dados
- PRF dados abertos: https://www.gov.br/prf/pt-br/acesso-a-informacao/dados-abertos/dados-abertos
