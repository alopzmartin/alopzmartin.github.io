---
layout: default
title: "Da Álgebra Linear à Visão por Computador"
permalink: /teaching/visao-computador/
# Alterar para true à medida que a matéria for lecionada.
mostrar_matrizes: true
mostrar_transposta: true
mostrar_produto: true
mostrar_transformacoes: true
mostrar_bases: true
mostrar_valores_proprios: true
mostrar_pca: false
---

<link rel="stylesheet" href="{{ '/teaching/visao-computador/assets/css/visao.css' | relative_url }}">

<div class="cv-lesson" markdown="1">

<a class="cv-back" href="{{ '/teaching/' | relative_url }}">← Voltar à página de Docência</a>

<h1 class="cv-page-title">Da Álgebra Linear à Visão por Computador</h1>

*Uma imagem, várias perguntas matemáticas.*

Quando olhamos para uma fotografia, reconhecemos objetos, formas e cores quase sem esforço. Para um computador, porém, uma imagem começa por ser uma coleção de números. Como se passa desses números ao reconhecimento de uma imagem? E o que tem isto a ver com as matrizes que estamos a estudar?

Nesta página vamos seguir **uma pequena imagem ao longo do semestre**. Começaremos por representá-la com uma matriz. Depois veremos o que acontece quando transpomos essa matriz, como funciona o produto de matrizes na manipulação de dados e, mais adiante, como surgem as transformações lineares, as bases, os valores próprios e uma técnica chamada *análise em componentes principais* (PCA).

Não é necessário conhecer já estes últimos assuntos. **As explicações serão disponibilizadas à medida que forem abordados nas aulas**, com lembretes da teoria, exemplos e experiências que podem explorar diretamente nesta página.

<div class="cv-note">Esta página é um complemento às aulas de <strong>Fundamentos de Álgebra Linear</strong>, não um substituto dos apontamentos. As experiências utilizam imagens pequenas e operações simplificadas para tornar as ideias visíveis.</div>

## Percurso

<div class="cv-roadmap" aria-label="Percurso dos tópicos">
  <div class="cv-stop cv-done"><span class="cv-step">01</span><span><strong>Matrizes</strong><small>Uma imagem é uma tabela de números.</small></span><span class="cv-status">Disponível</span></div>
  <div class="cv-stop cv-done"><span class="cv-step">02</span><span><strong>Transposição</strong><small>E se trocarmos linhas e colunas?</small></span><span class="cv-status">Disponível</span></div>
  <div class="cv-stop cv-done"><span class="cv-step">03</span><span><strong>Produto de matrizes</strong><small>Combinar informação de diferentes píxeis.</small></span><span class="cv-status">Disponível</span></div>
  <div class="cv-stop {% if page.mostrar_transformacoes %}cv-done{% else %}cv-locked{% endif %}"><span class="cv-step">04</span><span><strong>Transformações lineares</strong><small>Mover e transformar pontos de uma imagem.</small></span><span class="cv-status">{% if page.mostrar_transformacoes %}Disponível{% else %}Em breve{% endif %}</span></div>
  <div class="cv-stop {% if page.mostrar_bases %}cv-done{% else %}cv-locked{% endif %}"><span class="cv-step">05</span><span><strong>Bases e dimensão</strong><small>Quantos números precisamos de guardar?</small></span><span class="cv-status">{% if page.mostrar_bases %}Disponível{% else %}Em breve{% endif %}</span></div>
  <div class="cv-stop {% if page.mostrar_valores_proprios %}cv-done{% else %}cv-locked{% endif %}"><span class="cv-step">06</span><span><strong>Valores e vetores próprios</strong><small>Direções especiais de uma transformação.</small></span><span class="cv-status">{% if page.mostrar_valores_proprios %}Disponível{% else %}Em breve{% endif %}</span></div>
  <div class="cv-stop {% if page.mostrar_pca %}cv-done{% else %}cv-locked{% endif %}"><span class="cv-step">07</span><span><strong>Redução de dimensionalidade e PCA</strong><small>Representar imagens com menos informação.</small></span><span class="cv-status">{% if page.mostrar_pca %}Disponível{% else %}Em breve{% endif %}</span></div>
</div>

{% if page.mostrar_matrizes %}
## 1. Como é que um computador representa uma imagem?

Uma imagem em tons de cinzento pode ser descrita por uma matriz $A=(a_{ij})$. Cada entrada é o nível de luminosidade de um **píxel**: numa imagem usual de 8 bits, 0 significa preto e 255 significa branco. Os números intermédios correspondem a diferentes tons de cinzento.

Para começar, vamos usar uma imagem com apenas **8 linhas e 8 colunas**. Uma fotografia real terá normalmente centenas ou milhares de píxeis em cada dimensão, mas a ideia matemática é a mesma.

<div class="cv-demo" id="cv-matrix-demo">
  <div class="cv-demo-heading"><strong>Experiência 1 — Ver os números de uma imagem</strong><span>Interativo</span></div>
  <div class="cv-controls"><label for="cv-pattern">Imagem</label><select id="cv-pattern"><option value="eight">Algarismo 8</option><option value="arrow">Seta</option><option value="smile">Rosto</option></select><label class="cv-check"><input type="checkbox" id="cv-numbers" checked> Mostrar valores</label></div>
  <div class="cv-demo-columns"><div><div id="cv-pixels" class="cv-pixels" role="img" aria-label="Matriz de píxeis de oito por oito"></div><p class="cv-mini-caption">A imagem é desenhada a partir da matriz.</p></div><div><div id="cv-values" class="cv-matrix-output" aria-live="polite"></div><p class="cv-mini-caption">Os números são os níveis de cinzento dos píxeis.</p></div></div>
</div>

### Recordar a teoria

Uma matriz $A\in M_{m\times n}(\mathbb R)$ tem $m$ linhas e $n$ colunas. A entrada $a_{ij}$ encontra-se na linha $i$ e na coluna $j$. Por exemplo,

$$
A=\begin{pmatrix}0&128&255\\255&128&0\end{pmatrix}\in M_{2\times3}(\mathbb R).
$$

Nesta representação, a primeira linha contém três píxeis com luminosidades 0, 128 e 255. A segunda linha contém os mesmos valores na ordem inversa.

**Para pensar:** se uma imagem tem $100\times200$ píxeis e é representada por uma matriz em tons de cinzento, qual é o tipo dessa matriz? Quantas entradas contém?
{% endif %}

{% if page.mostrar_transposta %}
## 2. Para que serve a transposta?

A transposta de uma matriz obtém-se **trocando as linhas pelas colunas**. Se $A\in M_{m\times n}(\mathbb R)$, então $A^t\in M_{n\times m}(\mathbb R)$ e $(A^t)_{ij}=a_{ji}$.

Quando interpretamos a matriz como imagem, a transposição tem um efeito visual: **os píxeis são refletidos relativamente à diagonal principal**. Se a imagem não for quadrada, também se trocam a largura e a altura.

<div class="cv-demo" id="cv-transpose-demo">
  <div class="cv-demo-heading"><strong>Experiência 2 — Transpor uma imagem</strong><span>Interativo</span></div>
  <div class="cv-controls"><button type="button" id="cv-transpose" class="cv-primary">Aplicar transposição</button><button type="button" id="cv-transpose-reset">Repor</button></div>
  <div class="cv-demo-columns"><div><div id="cv-transpose-original" class="cv-pixels"></div><p class="cv-mini-caption">Imagem original $A$</p></div><div><div id="cv-transpose-result" class="cv-pixels"></div><p id="cv-transpose-label" class="cv-mini-caption" aria-live="polite">Resultado: $A$</p></div></div>
</div>

### Recordar a teoria

$$
A=\begin{pmatrix}1&2&3\\4&5&6\end{pmatrix},
\qquad
A^t=\begin{pmatrix}1&4\\2&5\\3&6\end{pmatrix}.
$$

Vale ainda a pena recordar duas propriedades:

$$
(A^t)^t=A,
\qquad
(A+B)^t=A^t+B^t.
$$

Mais adiante veremos outra propriedade importante: $(AB)^t=B^tA^t$. Reparem na **inversão da ordem** dos fatores.

**Para pensar:** por que razão uma transposição não equivale, em geral, a uma rotação de $90^\circ$? O que teríamos de acrescentar à operação?
{% endif %}

{% if page.mostrar_produto %}
## 3. O que acontece quando multiplicamos matrizes?

Ao contrário da soma, o produto de matrizes não se calcula simplesmente multiplicando entradas que ocupam a mesma posição. Cada entrada do produto é formada por uma **combinação de elementos de uma linha e de uma coluna**.

Se $A\in M_{m\times n}(\mathbb R)$ e $B\in M_{n\times p}(\mathbb R)$, então $AB\in M_{m\times p}(\mathbb R)$, com

$$
(AB)_{ij}=\sum_{k=1}^{n}a_{ik}b_{kj}.
$$

### Recordar a teoria com um exemplo

$$
\underbrace{\begin{pmatrix}1&2\\3&4\end{pmatrix}}_{A}
\underbrace{\begin{pmatrix}2&0\\1&3\end{pmatrix}}_{B}
=
\underbrace{\begin{pmatrix}4&6\\10&12\end{pmatrix}}_{AB}.
$$

A entrada na posição $(1,1)$ é $1\times2+2\times1=4$. E, em geral, **$AB\ne BA$**.

### Uma aplicação: suavizar uma imagem

Podemos usar uma matriz para **combinar os valores de píxeis vizinhos**. O exemplo seguinte utiliza uma operação muito simples: substitui cada linha pela média ponderada dessa linha e das linhas imediatamente vizinhas.

Se $A$ tem 8 linhas, construímos uma matriz de suavização $S_t\in M_{8\times8}(\mathbb R)$. O resultado é $B=S_tA$ (suavização vertical). Para suavizar na horizontal, usamos $B=AS_t$.

O resultado depende do lado em que colocamos o filtro. Esta operação é uma forma elementar de filtragem por multiplicação matricial. Em processamento de imagem usam-se também outros filtros, incluindo convoluções bidimensionais; não são exatamente a mesma operação.

<div class="cv-demo" id="cv-multiply-demo">
  <div class="cv-demo-heading"><strong>Experiência 3 — Suavizar uma imagem por multiplicação matricial</strong><span>Interativo</span></div>
  <div class="cv-controls">
    <label for="cv-direction">Direção do filtro</label>
    <select id="cv-direction"><option value="vertical">Vertical: B = Sₜ A</option><option value="horizontal">Horizontal: B = A Sₜ</option></select>
    <label for="cv-blur">Intensidade t</label>
    <input id="cv-blur" type="range" min="0" max="100" value="40" step="10">
    <output id="cv-blur-value" for="cv-blur">0,4</output>
  </div>
  <div class="cv-demo-columns"><div><div id="cv-blur-original" class="cv-pixels"></div><p class="cv-mini-caption">Imagem inicial A (8 × 8)</p></div><div><div id="cv-blur-output" class="cv-pixels"></div><p class="cv-mini-caption">Imagem filtrada B (8 × 8)</p></div></div>
  <p id="cv-blur-formula" class="cv-filter-description" aria-live="polite"></p>
  <div class="cv-equation-layout">
    <div><strong>A — matriz da imagem</strong><pre id="cv-matrix-a" class="cv-matrix-code" aria-label="Matriz original"></pre></div>
    <div><strong>Sₜ — matriz de suavização</strong><pre id="cv-matrix-s" class="cv-matrix-code" aria-label="Matriz do filtro"></pre></div>
    <div><strong>B — matriz resultante</strong><pre id="cv-matrix-b" class="cv-matrix-code" aria-label="Matriz do resultado"></pre></div>
  </div>
  <details class="cv-details"><summary>Ver o cálculo de uma entrada, passo a passo</summary>
    <div class="cv-controls"><label for="cv-row">Linha</label><select id="cv-row"></select><label for="cv-col">Coluna</label><select id="cv-col"></select></div>
    <p id="cv-entry-explanation" class="cv-entry-explanation" aria-live="polite"></p>
  </details>
  <p class="cv-mini-caption">Os valores das matrizes são apresentados arredondados para facilitar a leitura; o cálculo usa os valores sem arredondamento. Nos extremos, os pesos são ajustados para somarem 1.</p>
</div>

Esta experiência também ajuda a perceber uma ideia importante: **o produto matricial pode ser interpretado como a aplicação de uma transformação linear**.

**Para pensar:** se quiséssemos suavizar horizontalmente em vez de verticalmente, a matriz de ponderações teria de multiplicar $A$ à esquerda ou à direita?
{% endif %}

{% if page.mostrar_transformacoes %}
## 4. Como rodar ou refletir uma imagem?

Uma imagem pode ser vista como um conjunto de pontos no plano. A cada ponto associamos um vetor coluna $x=(x_1,x_2)^t$. Uma transformação linear da forma $T(x)=Mx$ permite alterar as coordenadas desses pontos.

Por exemplo, a matriz

$$
R=\begin{pmatrix}0&-1\\1&0\end{pmatrix}
$$

representa uma rotação de $90^\circ$ no sentido contrário ao dos ponteiros do relógio, em coordenadas cartesianas usuais. Já

$$
S=\begin{pmatrix}-1&0\\0&1\end{pmatrix}
$$

representa uma reflexão relativamente ao eixo vertical.

<div class="cv-demo" id="cv-transform-demo"><div class="cv-demo-heading"><strong>Experiência 4 — Transformar pontos de uma figura</strong><span>Interativo</span></div><div class="cv-controls"><label for="cv-transform-choice">Transformação</label><select id="cv-transform-choice"><option value="identity">Identidade</option><option value="rotation">Rotação de 90°</option><option value="mirror">Reflexão</option><option value="stretch">Escala horizontal × 1,5</option></select></div><svg id="cv-transform-svg" viewBox="0 0 420 260" role="img" aria-label="Figura e respetiva transformação linear"></svg><p class="cv-mini-caption">Neste exemplo alteramos as coordenadas dos pontos. Para transformar uma fotografia inteira é ainda necessário decidir como amostrar os píxeis.</p></div>

**Para pensar:** qual é a imagem do vetor $(1,0)^t$ em cada transformação? E do vetor $(0,1)^t$?
{% endif %}

{% if page.mostrar_bases %}
## 5. Bases e dimensão: quantos números são realmente necessários?

Uma imagem $8\times8$ tem 64 píxeis. Se lermos todas as entradas por ordem, podemos representá-la por um vetor de $\mathbb R^{64}$. Mas será que precisamos sempre de 64 números independentes?

Recordemos que uma **base** de $\mathbb R^n$ é um conjunto de $n$ vetores linearmente independentes que gera todo o espaço. Qualquer vetor $x\in\mathbb R^n$ pode escrever-se, de forma única, como combinação linear dos vetores dessa base:

$$x=c_1v_1+\cdots+c_nv_n.$$

As coordenadas $(c_1,\ldots,c_n)$ dependem da base escolhida. Uma base bem adaptada ao tipo de dados que estamos a estudar pode dar-nos uma descrição mais útil desses dados.

Isto ainda não significa que possamos reconstruir qualquer imagem sem perda usando menos de 64 números. Para isso, teremos de aceitar uma **aproximação** ou considerar imagens que pertençam a um conjunto mais restrito.
{% endif %}

{% if page.mostrar_valores_proprios %}
## 6. Valores e vetores próprios: direções que não mudam

Um vetor não nulo $v$ é vetor próprio de uma matriz quadrada $M$ se existir $\lambda$ tal que

$$Mv=\lambda v.$$

Ou seja, a transformação definida por $M$ pode alterar o comprimento e o sentido do vetor, mas mantém-no na mesma direção geométrica. O número $\lambda$ é o valor próprio correspondente.

Na visão por computador, esta ideia surge quando analisamos matrizes que descrevem como os dados variam. As direções associadas aos valores próprios ajudam-nos a encontrar os padrões de variação mais relevantes.

**Para pensar:** que vetores mantêm a direção quando aplicamos a matriz diagonal $\operatorname{diag}(2,1/2)$?
{% endif %}

{% if page.mostrar_pca %}
## 7. Podemos representar imagens com menos números? Uma introdução à PCA

Suponhamos que temos muitas imagens do mesmo tipo, por exemplo fotografias de algarismos manuscritos. Cada imagem $8\times8$ pode ser escrita como um vetor $x_i\in\mathbb R^{64}$, empilhando os seus píxeis numa coluna. Uma coleção de $N$ imagens dá-nos, portanto, uma matriz de dados com $N$ linhas e 64 colunas.

A **análise em componentes principais** (*Principal Component Analysis*, PCA) procura direções do espaço dos dados que expliquem a maior parte da sua variação. A ideia é representar cada imagem não por todas as suas 64 entradas, mas por um número mais pequeno de **coeficientes**, obtendo depois uma reconstrução aproximada.

### Da transposta à PCA

Se $X$ for a matriz de dados **centrados** (isto é, depois de subtrair a média de cada coluna), então

$$S=\frac{1}{N-1}X^tX$$

é a matriz de covariâncias amostral, para $N>1$. Os vetores próprios de $S$ associados aos maiores valores próprios indicam direções ao longo das quais os dados variam mais. Escolhendo $k$ dessas direções, podemos projetar cada imagem nesse subespaço de dimensão $k$.

Assim reaparecem, numa só aplicação, quase todos os conceitos estudados: matrizes, transposta, produto, subespaços, bases e valores próprios.

<div class="cv-note">Nota: reduzir a dimensão implica geralmente perda de informação. O objetivo é controlar essa perda, mantendo as características relevantes para a tarefa. Esta técnica é linear e não equivale aos métodos mais avançados de reconhecimento de imagens usados em aprendizagem profunda.</div>
{% endif %}

---

*Esta página será atualizada ao longo do semestre. Se alguma experiência não funcionar no teu navegador, verifica se o JavaScript está ativado.*

</div>

<script src="{{ '/teaching/visao-computador/assets/js/visao.js' | relative_url }}" defer></script>
