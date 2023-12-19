//Barra de Navegação com Sombra (Scroll Event)
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("shadow", window.scrollY > 0)
})

//Filter
$(document).ready(function () {
    $(".filter-item").click(function () {
        const value = $(this).attr("data-filter");
        if (value == "all"){
            $(".post-box").show("1000")
        } else{
            $(".post-box")
                .not("." + value)
                .hide(1000);
            $(".post-box")
            .filter("." + value)
            .show("1000")
        }
    });
    $(".filter-item").click(function () {
        $(this).addClass("active-filter").siblings().removeClass("active-filter")
    });
});

// Função para incrementar visualizações
function incrementViews() {
    // Simulação de incremento de visualizações
    let viewsCount = localStorage.getItem('viewsCount') || 0;
    viewsCount = parseInt(viewsCount) + 1;
    localStorage.setItem('viewsCount', viewsCount);

    // Atualizar o elemento HTML com o número de visualizações
    const viewsElement = document.getElementById('views-count');
    if (viewsElement) {
        viewsElement.textContent = viewsCount;
    }
}
// Verifica se há visualizações salvas no sessionStorage
// Se não houver, cria um objeto vazio para armazenar as visualizações
let viewsData = JSON.parse(sessionStorage.getItem('viewsData')) || {};

// Obtém todos os elementos de contagem de visualizações
const viewsElements = document.querySelectorAll('.views-count');

// Itera sobre cada elemento
viewsElements.forEach(element => {
    // Obtém o ID do post associado ao elemento
    const postId = element.getAttribute('data-post-id');

    // Verifica se há uma entrada para esse post no objeto viewsData
    // Se não houver, cria uma entrada com contagem 0
    if (!(postId in viewsData)) {
        viewsData[postId] = 0;
    }

    // Atualiza o texto do elemento com a contagem atual
    element.textContent = viewsData[postId];
});

// Adiciona um evento de clique a cada botão "Saiba mais"
const readButtons = document.querySelectorAll('.btn2');
readButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Obtém o ID do post associado ao botão
        const postId = button.parentNode.querySelector('.views-count').getAttribute('data-post-id');

        // Incrementa a contagem de visualizações para esse post
        viewsData[postId]++;

        // Atualiza o sessionStorage com as visualizações atualizadas
        sessionStorage.setItem('viewsData', JSON.stringify(viewsData));

        // Atualiza o texto do elemento HTML com o número de visualizações
        const viewsElement = button.parentNode.querySelector('.views-count');
        viewsElement.textContent = viewsData[postId];
    });
});