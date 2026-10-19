# Assis Maps v9 — integração automática de serviços públicos

## O que foi implementado
- APIs Vercel em `/api`: geocodificação, cálculo de rota, dados viários comunitários e health check.
- O app chama as APIs do próprio projeto quando implantado na Vercel; quando a API não existe, usa os serviços públicos OSM diretamente como fallback.
- Atualiza automaticamente radares mapeados pela comunidade, pedágios mapeados, obras mapeadas e tags de perigo OSM para a área visível do mapa. Faz nova consulta ao mover o mapa e a cada 5 minutos enquanto a página estiver executando.
- Fontes comunitárias exibidas separadamente das bases importadas pelo usuário; não são apresentadas como oficiais.
- Mapa 3D vetorial com edifícios quando os dados OSM e zoom permitem; câmera acompanha a posição durante navegação e exibe o ícone de veículo/pedestre.
- Geocodificação e rotas passam por funções Vercel para reduzir problemas de CORS e centralizar os pedidos.
- Nenhuma coordenada de radar, pedágio ou acidente inventada é incluída como dado.

## Como publicar
1. Extraia a pasta `assis-maps-v7`.
2. Importe a pasta inteira para um projeto Vercel (não apenas `index.html`).
3. A Vercel detecta `vercel.json` e as funções dentro de `api/`.
4. Abra `/api/health` no domínio publicado para verificar as rotas de API.
5. O app é PWA; para um APK com localização e notificações garantidas em segundo plano, ainda é necessário empacotar com uma camada Android nativa/serviço foreground. O navegador sozinho não garante isso.

## Fontes e limites que não devem ser ocultados
- Mapa: OpenFreeMap + OpenStreetMap; atribuição obrigatória. A cobertura 3D depende dos dados disponíveis.
- Geocodificação: Nominatim (política de uso e limites aplicáveis).
- Rota de carro/moto: demonstração pública OSRM, com perfil de carro; moto não tem perfil de roteamento separado nesta configuração. Pedestre usa o serviço público routed-foot.
- Radares, pedágios, obras e tags de perigo: OpenStreetMap/Overpass, dados comunitários que podem estar ausentes ou desatualizados; radar OSM não equivale a lista oficial PRF.
- **Não existe feed de velocidade do trânsito em tempo real, alerta oficial de acidente em tempo real, preços de pedágio confiáveis, importação automática dos CSV históricos da PRF ou prevenção garantida de pedágios nesta versão.** Não foi possível tratar essas fontes como APIs estáveis sem uma integração/licença/feed verificável. O histórico PRF é publicado como arquivos CSV/ZIP e requer pipeline de ingestão/normalização separado.
- Estratégia “economia” continua sendo aproximação pela menor distância entre alternativas retornadas, não cálculo do custo total nem garantia de evitar pedágio.
- Os serviços públicos podem limitar ou interromper solicitações; não há SLA.

## Referências oficiais/técnicas
- MapLibre: https://maplibre.org/maplibre-gl-js/docs/
- OpenFreeMap: https://openfreemap.org/quick_start/
- Política de tiles OSM: https://operations.osmfoundation.org/policies/tiles/
- PRF dados abertos: https://www.gov.br/prf/pt-br/acesso-a-informacao/dados-abertos/dados-abertos-da-prf
- PRF radares fixos: https://www.gov.br/prf/pt-br/assuntos/fiscalizacao-de-velocidade/radares-fixos
- DNIT dados abertos: https://www.gov.br/dnit/pt-br/acesso-a-informacao/dados-abertos/conjuntos-de-dados
