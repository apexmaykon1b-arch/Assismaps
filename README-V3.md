# Assis Maps v3

Versão experimental para publicação estática na Vercel.

## Melhorias
- Estratégias de rota visíveis: equilibrada, economia aproximada, menor distância disponível e segurança baseada na base local.
- Relatório de rota para a IA/compartilhamento com origem, destino, distância/tempo, vias retornadas, radares/pedágios/riscos da base local e limitações.
- Compartilhamento nativo quando disponível, com alternativa para copiar relatório/link.
- Acompanhamento GPS e instruções faladas mantidos.

## Limitações importantes
- Não existe nesta versão um feed confiável de trânsito, acidentes e radares em tempo real. A base padrão contém pontos de demonstração e não deve ser tratada como informação oficial.
- Para dados reais e atualizados é necessário integrar fontes/provedores adequados, com APIs/chaves, termos de uso e limites. A sincronização atual não transforma pontos demonstrativos em dados ao vivo.
- A estratégia economia escolhe a menor distância entre as alternativas retornadas; não garante evitar pedágios. A estratégia segurança mostra os riscos conhecidos na base local, mas não calcula uma rota oficial de menor risco.
- Moto usa roteamento rodoviário de carro; confirme as condições e regras locais. O roteamento a pé usa serviço comunitário.
- A navegação pode ser interrompida em segundo plano pelo Android; não usar como substituto às placas nem manipular o celular dirigindo.
- A função de relatório apresenta dados ao painel da IA local da interface, não chama automaticamente um modelo externo. Integração com IA real exige configurar um backend/API e proteger chaves; não colocar chaves secretas no frontend da Vercel.

## Publicação
Importe a pasta `assis-maps` para um repositório Git e conecte-o à Vercel como site estático, sem build command. Teste GPS, voz, rota e compartilhamento antes de gerar APK.
