PUBLICAR ASSIS MAPS v6 NA VERCEL
1. Extraia o ZIP.
2. Importe a pasta assis-maps-v6 para um repositório Git.
3. Na Vercel, crie um projeto a partir desse repositório.
4. Configure como site estático, sem comando de build.
5. Abra a URL HTTPS no celular e permita localização/notificações apenas se desejar.

Importante: o site atualiza a interface e tenta sincronizar quando está em execução. Não consegue manter GPS/rota continuamente em segundo plano se o Android suspender o navegador. Para isso, é necessária implementação nativa Android (Foreground Service). Consulte README-FINAL.md para limitações e configuração de fontes de dados.
