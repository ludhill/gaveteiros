// Objeto de estado compartilhado para o objeto 2D
const objectState = {
    x: 50,
    y: 50,
    width: 100,
    height: 60,
    depth: 40
};

// Configuração dos palcos (stages) do Konva para cada vista
const stages = {
    front: new Konva.Stage({
        container: 'front-view',
        width: 400,
        height: 300,
    }),
    top: new Konva.Stage({
        container: 'top-view',
        width: 400,
        height: 300,
    }),
    right: new Konva.Stage({
        container: 'right-view',
        width: 400,
        height: 300,
    }),
};

// Criação das camadas (layers) para cada vista
const layers = {
    front: new Konva.Layer(),
    top: new Konva.Layer(),
    right: new Konva.Layer(),
};

// Adiciona as camadas aos palcos
stages.front.add(layers.front);
stages.top.add(layers.top);
stages.right.add(layers.right);

// Função para desenhar o objeto em todas as vistas com base no estado compartilhado
function drawViews() {
    // Limpa as camadas antes de redesenhar
    layers.front.destroyChildren();
    layers.top.destroyChildren();
    layers.right.destroyChildren();

    // --- Vista Frontal ---
    const frontRect = new Konva.Rect({
        x: objectState.x,
        y: objectState.y,
        width: objectState.width,
        height: objectState.height,
        fill: 'lightblue',
        stroke: 'black',
        strokeWidth: 2,
        draggable: true,
    });
    layers.front.add(frontRect);

    // --- Vista Superior ---
    const topRect = new Konva.Rect({
        x: objectState.x,
        y: objectState.y,
        width: objectState.width,
        height: objectState.depth,
        fill: 'lightgreen',
        stroke: 'black',
        strokeWidth: 2,
        draggable: true,
    });
    layers.top.add(topRect);

    // --- Vista Lateral Direita ---
    const rightRect = new Konva.Rect({
        x: objectState.y,
        y: objectState.x,
        width: objectState.depth,
        height: objectState.height,
        fill: 'lightcoral',
        stroke: 'black',
        strokeWidth: 2,
        draggable: true,
    });
    layers.right.add(rightRect);


    // Sincronização ao arrastar
    frontRect.on('dragmove', () => {
        objectState.x = frontRect.x();
        objectState.y = frontRect.y();
        drawViews();
    });

    topRect.on('dragmove', () => {
        objectState.x = topRect.x();
        // Na vista superior, o 'y' representa a profundidade
        objectState.y = topRect.y();
        drawViews();
    });

    rightRect.on('dragmove', () => {
        // Na vista lateral, o 'x' representa a profundidade e o 'y' a posição vertical
        objectState.y = rightRect.x();
        objectState.x = rightRect.y();
        drawViews();
    });

    // Redesenha todas as camadas
    layers.front.draw();
    layers.top.draw();
    layers.right.draw();
}

// Desenho inicial das vistas
drawViews();
