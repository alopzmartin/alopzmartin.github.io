---
layout: default
title: Orientações para os trabalhos
permalink: /teaching/orientacoes-trabalhos/
---

# Orientações para a elaboração dos trabalhos

Estas orientações destinam-se a ajudar os estudantes a organizar, desenvolver e apresentar os trabalhos realizados no âmbito da unidade curricular de **Tópicos de Matemática I**, da Licenciatura em Ciência de Dados.

O objetivo de um trabalho não é apenas chegar aos resultados pedidos, mas também **explicar o raciocínio seguido, justificar os métodos utilizados e apresentar os resultados de forma clara e rigorosa**.

Não existe uma estrutura única que todos os relatórios tenham de seguir. Cabe a cada grupo decidir como organizar e apresentar o trabalho, tendo em conta os problemas propostos e a relação entre as diferentes partes.

As indicações seguintes devem ser entendidas como orientações gerais, e não como um modelo obrigatório de relatório.

---

## Organização e apresentação

Um relatório deve permitir que alguém que não acompanhou a realização do trabalho compreenda os problemas estudados, os métodos utilizados e os resultados obtidos.

De um modo geral, será útil incluir:

- Uma breve introdução, apresentando os objetivos do trabalho e os problemas a resolver.
- O desenvolvimento matemático, com os cálculos, argumentos e justificações necessários.
- Os resultados obtidos, incluindo representações gráficas e resultados numéricos, quando apropriado.
- Uma discussão dos resultados e das conclusões que deles podem ser retiradas.
- As referências utilizadas e, quando necessário, anexos com material complementar.

Esta organização é apenas indicativa. As diferentes componentes podem ser apresentadas de outra forma, desde que o relatório seja coerente e permita acompanhar o raciocínio desenvolvido.

**Evitem apresentar uma sucessão de cálculos sem explicar o que estão a fazer e porquê.** Por outro lado, também não é necessário descrever exaustivamente todas as operações algébricas elementares.

O importante é encontrar um equilíbrio entre o detalhe matemático e a clareza da exposição.

## Fundamentação matemática

As conclusões apresentadas devem ser devidamente justificadas.

Sempre que utilizarem um resultado matemático, devem identificar o teorema, propriedade ou método em que se baseiam e explicar por que razão pode ser aplicado ao problema em estudo.

Por exemplo, se utilizarem um teorema para justificar a existência de uma solução, não basta afirmar que o teorema se aplica. É necessário verificar as respetivas hipóteses.

O mesmo se aplica a resultados sobre continuidade, diferenciabilidade, monotonia, aproximação de funções ou convergência de métodos numéricos.

Não é necessário demonstrar todos os teoremas utilizados, mas é importante **identificá-los corretamente e justificar a sua aplicação**.

As expressões matemáticas devem ser escritas com notação adequada, definindo as variáveis e os parâmetros utilizados.

## Desenvolvimento dos problemas

O nível de detalhe depende naturalmente do problema, mas há alguns princípios que devem orientar a apresentação.

### Estudo de funções

Quando é solicitado o estudo de uma função, o relatório deve apresentar os principais resultados e justificar as conclusões obtidas.

Por exemplo, a determinação de intervalos de monotonia ou de concavidade deve estar apoiada no estudo das derivadas relevantes.

Os cálculos podem ser acompanhados de tabelas ou representações gráficas, mas estas não substituem a justificação matemática.

Uma representação gráfica deve ser consistente com o estudo analítico realizado. Se surgir alguma aparente contradição, importa compreendê-la e explicá-la.

### Aproximações de Taylor

Quando utilizarem um polinómio de Taylor, devem indicar claramente a função considerada, o ponto em torno do qual é feita a aproximação e a ordem do polinómio.

É importante distinguir entre a expressão do polinómio e a aproximação que este permite obter.

Se for solicitada uma estimativa do erro, deve ser explicado o resultado matemático utilizado, as condições necessárias à sua aplicação e a forma como se obtém a estimativa.

Quando forem apresentados gráficos comparativos, deverão explicar o que se observa e relacionar essas observações com os resultados teóricos.

### Métodos numéricos

A aplicação de um método numérico exige mais do que apresentar uma sequência de aproximações ou o resultado produzido por um programa.

Devem explicar o método utilizado, como foi construído o processo iterativo e quais os critérios adotados para obter uma aproximação.

Quando apropriado, devem ainda justificar as condições que permitem aplicar o método e discutir a sua convergência.

Os resultados numéricos devem ser interpretados à luz dos resultados matemáticos estudados.

Estas indicações não substituem as questões concretas colocadas nos enunciados. Servem apenas para ilustrar o tipo de explicação e fundamentação esperado.

---

## Utilização de Python e outras ferramentas computacionais

A utilização de Python permite complementar o trabalho matemático, nomeadamente através de cálculos numéricos, representações gráficas e implementação de algoritmos.

Não se espera necessariamente uma utilização avançada da linguagem. O importante é que consigam compreender as ferramentas utilizadas e explicar o seu papel na resolução dos problemas.

Quando recorrerem a código, devem indicar o que faz, quais os dados ou parâmetros utilizados e de que forma são obtidos os resultados apresentados.

Se utilizarem rotinas ou exemplos de código disponibilizados pelos docentes, devem identificá-los. O mesmo se aplica a código adaptado de outras fontes.

**Os resultados produzidos por um programa não substituem a fundamentação matemática.** Sempre que apropriado, deverão ser acompanhados de uma explicação e de uma interpretação.

### Representações gráficas

Os gráficos devem contribuir para a compreensão dos problemas e dos resultados.

Devem ser suficientemente claros e legíveis, com identificação dos eixos, legendas e outras indicações necessárias à sua interpretação.

No texto do relatório, expliquem o que se pretende mostrar com cada gráfico e que conclusões podem retirar dele.

Evitem incluir figuras apenas para ilustrar visualmente resultados que não são posteriormente discutidos.

---

## Figuras, tabelas e equações

As figuras, tabelas e equações devem estar devidamente integradas no texto do relatório. Não basta incluí-las: é importante explicar o que representam e de que forma contribuem para a resolução dos problemas.

### Figuras e gráficos

As figuras e os gráficos devem ser numerados e acompanhados de uma legenda, colocada **por baixo da figura**.

A legenda deve ser suficientemente informativa para que o leitor compreenda o que está representado, sem precisar de procurar toda a explicação no texto.

Por exemplo:

*Figura 1 — Representação gráfica da função \(f\) no intervalo \([-2,3]\).*

Os gráficos devem ainda apresentar, quando aplicável:

- Identificação dos eixos e das variáveis representadas.
- Unidades de medida, quando existam.
- Legendas que permitam distinguir diferentes funções, curvas ou conjuntos de dados.
- Escalas e intervalos adequados ao que se pretende analisar.

**Todas as figuras devem ser referidas no texto** e acompanhadas de uma breve explicação ou interpretação.

Por exemplo:

> Como se observa na Figura 1, a função apresenta um mínimo local em \(x=1\), em concordância com os resultados obtidos através do estudo da primeira derivada.

Evitem incluir gráficos sem explicar o que pretendem mostrar ou que conclusões podem ser retiradas deles.

### Tabelas

As tabelas também devem ser numeradas e ter um título ou legenda informativa, mas, ao contrário das figuras, **a legenda deve aparecer por cima da tabela**.

Por exemplo:

*Tabela 1 — Aproximações sucessivas obtidas pelo método de Newton-Raphson.*

As colunas devem estar claramente identificadas e os valores numéricos devem ser apresentados com um número adequado de casas decimais.

Tal como acontece com as figuras, as tabelas devem ser referidas e comentadas no texto.

Não é necessário repetir no texto todos os valores apresentados. O importante é chamar a atenção para os resultados relevantes e explicar o que permitem concluir.

### Equações e expressões matemáticas

As expressões matemáticas devem ser apresentadas de forma legível, utilizando uma notação consistente ao longo do relatório.

As equações mais importantes, sobretudo aquelas que serão referidas posteriormente, devem ser destacadas do texto e numeradas.

Por exemplo, se for introduzida a fórmula de iteração de Newton-Raphson,

$$
x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)},
$$

poderão identificá-la como equação (1) e utilizar essa referência nas explicações seguintes.

Não é necessário numerar todas as expressões matemáticas. A numeração deve facilitar a leitura e permitir fazer referências claras, sem sobrecarregar o relatório.

As variáveis e os parâmetros utilizados devem ser definidos, e a notação deve manter-se consistente.

**As equações devem fazer parte do raciocínio apresentado**, e não aparecer como elementos isolados. Sempre que necessário, expliquem de onde resultam, em que condições são válidas e como são utilizadas.

### Algumas recomendações gerais

- Evitem expressões como "no gráfico abaixo" ou "na tabela seguinte" quando podem utilizar referências mais precisas, como "na Figura 2" ou "na Tabela 1".
- Mantenham uma numeração consistente para figuras, tabelas e equações.
- Confirmem que todas as figuras e tabelas têm legendas adequadas e são referidas no texto.
- Não incluam figuras, tabelas ou equações apenas para preencher o relatório. Cada elemento deve ter uma função na explicação dos problemas ou na apresentação dos resultados.

Uma apresentação cuidada ajuda o leitor a acompanhar o raciocínio e a compreender os resultados. Faz também parte da aprendizagem de como comunicar informação matemática e científica.

---

## Código, referências e anexos

O relatório deve permitir identificar os procedimentos utilizados e, sempre que possível, reproduzir os resultados computacionais apresentados.

O código desenvolvido pelo grupo deve ser disponibilizado, seja em anexo, em ficheiros separados ou através de uma referência para um repositório ou notebook acessível.

Quando utilizarem código previamente disponibilizado pelos docentes, podem remeter para esse material, identificando claramente as rotinas utilizadas e eventuais alterações introduzidas.

Não é necessário colocar extensos blocos de código no corpo principal do relatório se estes dificultarem a leitura. Nesse caso, podem apresentar a parte relevante do procedimento e remeter para o código completo.

Os anexos também podem ser utilizados para incluir cálculos extensos, tabelas ou outros elementos complementares.

No entanto, **os argumentos matemáticos e os resultados necessários à compreensão do trabalho devem constar do próprio relatório**. Os anexos não devem substituir a explicação principal.

Sempre que utilizarem livros, apontamentos, artigos, documentação técnica ou outras fontes, devem identificá-los adequadamente.

---

## Trabalho de grupo e responsabilidade

A distribuição de tarefas entre os elementos de um grupo é natural e pode facilitar a realização do trabalho.

No entanto, **todos os elementos do grupo são responsáveis pelo trabalho entregue na sua totalidade**.

Não é suficiente que cada estudante compreenda apenas a parte em que trabalhou diretamente. Todos devem conhecer os problemas abordados, compreender os métodos utilizados e ser capazes de explicar e discutir os resultados apresentados.

Isto inclui o código desenvolvido ou utilizado pelo grupo, os cálculos matemáticos e as conclusões retiradas.

A revisão conjunta do relatório é também uma oportunidade para identificar erros, esclarecer dúvidas e melhorar a apresentação do trabalho.

Esta responsabilidade partilhada é particularmente importante na formação em Ciência de Dados, onde o trabalho em equipa exige compreender, avaliar e integrar resultados produzidos por diferentes pessoas.

---

## Antes da entrega

Reservem algum tempo para reler o relatório completo, de preferência depois de todas as partes terem sido reunidas.

Verifiquem se os problemas foram efetivamente respondidos, se os resultados estão justificados e se a apresentação permite acompanhar o raciocínio.

Confirmem também que as figuras e tabelas estão numeradas, têm legendas adequadas e são referidas no texto; que os gráficos são legíveis; que as equações estão corretamente apresentadas e que a notação matemática é consistente. Verifiquem ainda que o código utilizado está identificado e que os anexos e referências estão completos.

Um bom relatório deve ser compreensível sem exigir que o leitor reconstrua os cálculos, adivinhe os métodos utilizados ou procure nos anexos explicações que deveriam estar no texto principal.

**Organizar e comunicar resultados matemáticos também faz parte da formação em Ciência de Dados.** O relatório é uma oportunidade para desenvolver essas competências, para além da resolução dos problemas propostos.

---

[← Voltar à página de Ensino]({{ '/teaching/' | relative_url }})
