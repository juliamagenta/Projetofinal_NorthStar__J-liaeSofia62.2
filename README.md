# North Star

Site de planejamento de intercâmbio desenvolvido por **Júlia Zanini Stein e Sofia França Cavalheiro**, da turma **62.2**.
O projeto reúne destinos, modalidades de intercâmbio, dicas, custos, documentos, agenda e cronograma em uma interface feita com HTML, CSS e JavaScript.

## Links para entrega

- **Aplicação publicada:** https://juliamagenta.github.io/Projetofinal_NorthStar__J-liaeSofia62.2/
- **Repositório público:** https://github.com/juliamagenta/Projetofinal_NorthStar__J-liaeSofia62.2

## Checklist dos critérios de avaliação

| Critério | Valor | Situação | Por que a aplicação atende |
| --- | --- | --- | --- |
| Deploy e Funcionamento | 2,0 pontos | Confirmado na verificação realizada | O projeto está publicado no GitHub Pages, com `index.html` como página inicial. As 17 páginas abriram durante a conferência, sem tela branca ou erros de carregamento identificados. Os arquivos HTML, CSS, JavaScript e imagens estão referenciados no projeto. |
| Interatividade sem Recarregamento | 2,0 pontos | Confirmado na Agenda e em Documentos | Os formulários usam eventos JavaScript e `event.preventDefault()` para impedir o envio padrão. O cadastro, a edição e a exclusão de tarefas e documentos atualizam a interface dinamicamente, sem precisar recarregar a página. |
| Persistência de Dados | 2,0 pontos | Confirmado nos fluxos testados | A aplicação salva informações no `localStorage` e recupera esses dados ao abrir as páginas. Nos testes da Agenda e de Documentos, os registros e suas alterações permaneceram após atualizar a página com F5; os itens excluídos continuaram removidos após atualizar. O código também armazena informações de perfil, orçamento, planejamento, favoritos e mensagens locais. |
| Estabilidade do Console | 2,0 pontos | Sem erros do site identificados nos testes realizados | O código possui validações de formulários e tratamento de falhas em operações de armazenamento. Não foram identificados erros do site durante a navegação pelas 17 páginas e os testes de criação, edição, exclusão e persistência na Agenda e em Documentos. |
| Adaptabilidade, Responsividade e Acessibilidade | 2,0 pontos | Recursos implementados; conferir visualmente em celular antes da apresentação | O HTML possui `meta viewport` e o CSS usa media queries para reorganizar menus, grades e formulários em diferentes larguras. Há textos alternativos em imagens informativas, rótulos nos campos, elementos HTML semânticos, atributos ARIA, link para pular ao conteúdo e indicação visual de foco para navegação por teclado. |


