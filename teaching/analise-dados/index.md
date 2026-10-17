---
layout: default
title: "Da Álgebra Linear à Análise de Dados"
permalink: /teaching/analise-dados/
# Desbloquear uma secção mudando false para true.
mostrar_matrizes: true
mostrar_transposta: true
mostrar_produto: true
mostrar_medias: false
mostrar_covariancia: false
mostrar_sistemas: false
---

<link rel="stylesheet" href="{{ '/teaching/analise-dados/assets/css/analise.css' | relative_url }}">

<div class="ad-lesson" markdown="1">

<a class="ad-back" href="{{ '/teaching/' | relative_url }}">← Voltar à página de Docência</a>

<h1 class="ad-page-title">Da Álgebra Linear à Análise de Dados</h1>

*Uma tabela de números, muitas perguntas.*

Imagine que recebemos os resultados de seis estudantes em três unidades curriculares. À primeira vista, temos apenas uma tabela. Mas como descobrir padrões, combinar informações, comparar resultados e perceber que variáveis estão relacionadas?

Neste pequeno percurso, vamos usar **sempre o mesmo conjunto de dados fictícios**. À medida que estudamos conceitos de Álgebra Linear, vamos descobrir novas formas de responder a estas perguntas. As experiências permitem alterar dados, experimentar operações e observar imediatamente os seus efeitos.

**Não é necessário saber Estatística ou programação para começar.** Os temas serão disponibilizados gradualmente, à medida que forem estudados nas aulas. As primeiras experiências trabalham apenas com matrizes, transposição e produto matricial.

<div class="ad-note">Este tutorial complementa as aulas de <strong>Fundamentos de Álgebra Linear</strong>. As classificações são inventadas e os índices que construímos têm apenas finalidade didática: não representam um sistema real de avaliação de estudantes.</div>

## Percurso

<div class="ad-roadmap" aria-label="Percurso dos capítulos">
<div class="ad-stop"><span class="ad-step">01</span><span><strong>Matrizes</strong><small>Uma tabela também é uma matriz.</small></span><span class="ad-status">Disponível</span></div>
<div class="ad-stop"><span class="ad-step">02</span><span><strong>Transposta</strong><small>Trocar observações e variáveis.</small></span><span class="ad-status">Disponível</span></div>
<div class="ad-stop"><span class="ad-step">03</span><span><strong>Produto matricial</strong><small>Calcular índices ponderados para todos.</small></span><span class="ad-status">Disponível</span></div>
<div class="ad-stop {% unless page.mostrar_medias %}ad-locked{% endunless %}"><span class="ad-step">04</span><span><strong>Médias e centragem</strong><small>Comparar observações com a média.</small></span><span class="ad-status">{% if page.mostrar_medias %}Disponível{% else %}Em breve{% endif %}</span></div>
<div class="ad-stop {% unless page.mostrar_covariancia %}ad-locked{% endunless %}"><span class="ad-step">05</span><span><strong>Relações entre variáveis</strong><small>De produtos escalares a covariâncias.</small></span><span class="ad-status">{% if page.mostrar_covariancia %}Disponível{% else %}Em breve{% endif %}</span></div>
<div class="ad-stop {% unless page.mostrar_sistemas %}ad-locked{% endunless %}"><span class="ad-step">06</span><span><strong>Sistemas de equações</strong><small>Descobrir pesos desconhecidos.</small></span><span class="ad-status">{% if page.mostrar_sistemas %}Disponível{% else %}Em breve{% endif %}</span></div>
</div>

{% if page.mostrar_matrizes %}
## 1. Uma tabela é uma matriz?

Consideremos os seguintes resultados, numa escala de 0 a 20. Cada **linha** descreve um estudante; cada **coluna**, uma variável: Matemática, Programação ou Estatística.

<div class="ad-demo" id="ad-data-demo">
<div class="ad-demo-heading"><strong>Experiência 1 — Explorar a tabela</strong><span>Interativo</span></div>
<p class="ad-small">Seleciona uma linha ou uma coluna. Repara na informação que a seleção representa.</p>
<div class="ad-controls"><label for="ad-select-mode">Selecionar</label><select id="ad-select-mode"><option value="row">Estudante (linha)</option><option value="col">Disciplina (coluna)</option></select><select id="ad-select-item" aria-label="Escolher linha ou coluna"></select></div>
<div id="ad-table-1" class="ad-table-wrap"></div>
<div id="ad-selection" class="ad-result" aria-live="polite"></div>
</div>

### Recordar a teoria

Uma matriz $X\in M_{m\times n}(\mathbb R)$ tem $m$ linhas e $n$ colunas. A entrada $x_{ij}$ está na linha $i$ e na coluna $j$. Aqui, $X\in M_{6\times3}(\mathbb R)$:

$$
X=\begin{pmatrix}
12&15&13\\
16&14&17\\
10&12&11\\
18&17&16\\
14&13&15\\
8&11&9
\end{pmatrix}.
$$

**Para pensar:** quantos valores precisaríamos de guardar se tivéssemos 1000 estudantes e 20 variáveis?
{% endif %}

{% if page.mostrar_transposta %}
## 2. O que muda quando transpomos os dados?

Em $X$, a linha 1 descreve a Ana. Em $X^t$, a linha 1 contém as classificações de **todos os estudantes em Matemática**. Não alteramos os valores: alteramos apenas a forma de os organizar.

<div class="ad-demo" id="ad-transpose-demo">
<div class="ad-demo-heading"><strong>Experiência 2 — Trocar linhas e colunas</strong><span>Interativo</span></div>
<div class="ad-controls"><button id="ad-transpose" type="button" class="ad-primary">Mostrar transposta</button><button id="ad-transpose-reset" type="button">Repor</button></div>
<div class="ad-two-col"><div><strong>Matriz inicial $X$</strong><div id="ad-transpose-original" class="ad-matrix-scroll"></div></div><div><strong id="ad-transpose-title">Resultado: $X$</strong><div id="ad-transpose-result" class="ad-matrix-scroll"></div></div></div>
<p id="ad-transpose-hint" class="ad-small" aria-live="polite">A matriz inicial tem dimensão 6 × 3.</p>
</div>

### Recordar a teoria

A transposta satisfaz $(X^t)_{ij}=x_{ji}$. Logo, se $X$ é $6\times3$, então $X^t$ é $3\times6$. Uma propriedade que será importante mais adiante é

$$
(AB)^t=B^tA^t.
$$

**Para pensar:** o que representa a segunda linha de $X^t$? Será que o número de estudantes mudou ao transpor a matriz?
{% endif %}

{% if page.mostrar_produto %}
## 3. Para que serve multiplicar matrizes?

Imaginemos que queremos construir um **índice ponderado** dos resultados, combinando as três disciplinas. Não se trata de uma classificação oficial; é apenas uma forma de experimentar como diferentes pesos alteram uma medida composta.

Se $w$ contém os três pesos, então os seis índices são calculados de uma só vez:

$$
\underbrace{s}_{6\times1}=\underbrace{X}_{6\times3}\underbrace{w}_{3\times1}.
$$

<div class="ad-demo" id="ad-weights-demo">
<div class="ad-demo-heading"><strong>Experiência 3 — Criar um índice ponderado</strong><span>Interativo</span></div>
<p class="ad-small">Altera os pesos. São normalizados para que a soma seja 100%; o índice e a ordenação atualizam-se automaticamente.</p>
<div class="ad-sliders"><label>Matemática <input type="range" id="ad-w0" min="0" max="100" step="5" value="40"><output id="ad-wv0"></output></label><label>Programação <input type="range" id="ad-w1" min="0" max="100" step="5" value="35"><output id="ad-wv1"></output></label><label>Estatística <input type="range" id="ad-w2" min="0" max="100" step="5" value="25"><output id="ad-wv2"></output></label></div>
<div class="ad-controls"><button id="ad-w-reset" type="button">Repor os pesos</button><label for="ad-w-student">Ver cálculo de</label><select id="ad-w-student"></select></div>
<div class="ad-two-col"><div><strong>Ordenação pelo índice</strong><div id="ad-ranking" class="ad-rankings" aria-live="polite"></div></div><div><strong>As matrizes da operação</strong><div id="ad-weight-matrices" class="ad-matrix-scroll"></div></div></div>
<div id="ad-weight-detail" class="ad-result" aria-live="polite"></div>
</div>

### Recordar a teoria

O elemento $i$ do produto $s=Xw$ é o produto escalar entre a linha $i$ de $X$ e a coluna $w$:

$$
s_i=x_{i1}w_1+x_{i2}w_2+x_{i3}w_3.
$$

A ordem é importante: $Xw$ está definido, mas $wX$ **não está**, dadas estas dimensões. O produto matricial permite calcular todos os resultados simultaneamente, sem escrever seis fórmulas separadas.

**Para pensar:** se atribuirmos 100% do peso a Matemática, o que acontece à ordenação? E se o peso de cada disciplina for igual?
{% endif %}

{% if page.mostrar_medias %}
## 4. Como resumir um conjunto de dados?

Até aqui, trabalhámos com dados individuais. Agora, queremos saber o que é *típico*. A média de cada variável é um primeiro resumo. Também podemos subtrair a média a cada observação e trabalhar com os **desvios em relação à média**.

<div class="ad-demo" id="ad-mean-demo">
<div class="ad-demo-heading"><strong>Experiência 4 — Alterar os dados e observar as médias</strong><span>Interativo</span></div>
<p class="ad-small">Altera uma classificação (entre 0 e 20). Repara nas médias e na matriz centrada.</p>
<div class="ad-controls"><label for="ad-mean-person">Estudante</label><select id="ad-mean-person"></select><label for="ad-mean-subject">Disciplina</label><select id="ad-mean-subject"></select><label for="ad-mean-value">Valor</label><input id="ad-mean-value" type="number" min="0" max="20" step="1" value="12"><button type="button" id="ad-mean-apply" class="ad-primary">Atualizar</button><button type="button" id="ad-mean-reset">Repor</button></div>
<div class="ad-two-col"><div><strong>Dados atuais</strong><div id="ad-mean-table" class="ad-table-wrap"></div></div><div><strong>Médias por disciplina</strong><div id="ad-mean-bars"></div></div></div>
<details class="ad-details"><summary>Ver a matriz centrada $X_c$</summary><div id="ad-centered" class="ad-matrix-scroll"></div></details>
<div id="ad-mean-note" class="ad-result" aria-live="polite"></div>
</div>

### Recordar a teoria

Se $\mathbf 1=(1,\ldots,1)^t\in\mathbb R^6$, a linha das médias é

$$
\bar x=\frac16\mathbf1^tX\in\mathbb R^{1\times3}.
$$

A matriz centrada é $X_c=X-\mathbf1\bar x$. Cada coluna de $X_c$ tem soma igual a zero.

**Para pensar:** a média muda mais quando alteramos uma classificação em 1 ponto ou em 5 pontos? Porquê?
{% endif %}

{% if page.mostrar_covariancia %}
## 5. Como sabemos se duas variáveis variam em conjunto?

Os alunos com melhores resultados numa disciplina tendem também a ter melhores resultados noutra? Uma forma de explorar a pergunta é observar os pares de classificações e calcular a **covariância amostral**.

<div class="ad-demo" id="ad-cov-demo">
<div class="ad-demo-heading"><strong>Experiência 5 — Comparar duas variáveis</strong><span>Interativo</span></div>
<div class="ad-controls"><label for="ad-cov-a">Eixo horizontal</label><select id="ad-cov-a"></select><label for="ad-cov-b">Eixo vertical</label><select id="ad-cov-b"></select><button type="button" id="ad-cov-reset">Repor dados</button></div>
<div class="ad-two-col"><div><strong>Gráfico de dispersão</strong><svg id="ad-scatter" class="ad-chart" viewBox="0 0 370 300" role="img" aria-label="Gráfico de dispersão das classificações"></svg></div><div><strong>Matriz de covariâncias</strong><div id="ad-cov-matrix" class="ad-matrix-scroll"></div><p class="ad-small" id="ad-cov-info" aria-live="polite"></p></div></div>
</div>

### Recordar a teoria

A partir de $X_c$, definimos a matriz de covariâncias amostrais

$$
C=\frac{1}{n-1}X_c^tX_c,\qquad n=6.
$$

A entrada $C_{jk}$ mede a covariação das variáveis $j$ e $k$. A diagonal contém as variâncias; as entradas fora da diagonal podem ser positivas, negativas ou nulas. **Covariância não prova causalidade** e o seu valor depende das unidades e da escala dos dados.

**Para pensar:** se somarmos 2 pontos à classificação de todos os estudantes numa disciplina, a sua covariância com as outras altera-se?
{% endif %}

{% if page.mostrar_sistemas %}
## 6. Conseguimos recuperar pesos desconhecidos?

Até agora, escolhíamos os pesos de um índice. E se conhecêssemos os índices obtidos por três estudantes, mas não os pesos usados? Teríamos um **sistema de três equações lineares**.

<div class="ad-demo" id="ad-systems-demo">
<div class="ad-demo-heading"><strong>Experiência 6 — Descobrir os pesos</strong><span>Interativo</span></div>
<p class="ad-small">Partimos das classificações da Ana, do Bruno e da Carla. Experimenta os índices apresentados (foram construídos com pesos desconhecidos) e descobre-os resolvendo o sistema.</p>
<div class="ad-controls"><label for="ad-scenario">Conjunto de resultados</label><select id="ad-scenario"><option value="0">Cenário A</option><option value="1">Cenário B</option><option value="2">Cenário C</option></select><button type="button" id="ad-solve" class="ad-primary">Resolver sistema</button><button type="button" id="ad-solve-reset">Ocultar solução</button></div>
<div class="ad-two-col"><div><strong>Equações</strong><div id="ad-system-equations" class="ad-result"></div></div><div><strong>Forma matricial</strong><div id="ad-system-matrix" class="ad-matrix-scroll"></div></div></div>
<div id="ad-system-solution" class="ad-result" aria-live="polite">Consegues antecipar os pesos?</div>
</div>

### Recordar a teoria

Um sistema $Aw=b$ pode ter uma solução única, infinitas soluções ou nenhuma solução. Quando $A$ é uma matriz quadrada invertível, a solução única satisfaz $w=A^{-1}b$. Em geral, é também possível usar eliminação de Gauss. Aqui escolhemos três estudantes cujas classificações formam uma matriz invertível.

**Para pensar:** o que aconteceria se as três linhas de $A$ fossem múltiplas umas das outras? Conseguiríamos determinar univocamente os pesos?
{% endif %}

## Para continuar a explorar

Esta é uma introdução guiada, não um curso de Estatística. O objetivo é reconhecer ideias já estudadas em Álgebra Linear dentro de tarefas que surgem na análise de dados. No tutorial complementar, **[Da Álgebra Linear à Visão por Computador]({{ '/teaching/visao-computador/' | relative_url }})**, podes descobrir aplicações semelhantes, mas a partir de imagens.

</div>

<script defer src="{{ '/teaching/analise-dados/assets/js/analise.js' | relative_url }}"></script>
