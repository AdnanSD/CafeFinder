function btnMenu(){
let menu=document.querySelector('.menu');
menu.classList.add('show')

}

function btnClose(){
let menu=document.querySelector('.menu'); 
menu.classList.remove('show')  
}


// MAPA BASE 
const map = L.map('map').setView([-12.1358, -38.4192], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// ---------------------------------------------------------------------------------
// LOCAL PARA INSERÇÃO MANUAL DE DADOS 
let correnteLatLong;

// Abrir modal para entrada de dados ao clicar no mapa
map.on('click', function (e) {
    correnteLatLong = e.latlng;
    document.getElementById('inputUsuario').style.display = 'block';
});

// Fechar modal
function closeModelo() {
    document.getElementById('inputUsuario').style.display = 'none';
}

// Adicionar marcador com descrição e foto
document.getElementById('inputFormato').addEventListener('submit', function (e) {
    e.preventDefault();

    const descricao = document.getElementById('descricao').value;
    const foto = document.getElementById('foto').value;

    let popupContent = `<h4>${descricao}</h4>`;
    if (foto) {
        popupContent += `<img src="${foto}" alt="Foto" style="width: 100%; height: auto;">`;
    }

    L.marker([correnteLatLong.lat, correnteLatLong.lng]).addTo(map)
        .bindPopup(popupContent);


    closeModelo();
    document.getElementById('inputFormato').reset();
});

// ---------------------------------------------------------------



// Lojas do mapa
const cafes = [
    // São paulo 
    { lat: -23.55052, lng: -46.633308, name: 'Café Aroma Paulista' },
    { lat: -23.55658, lng: -46.662647, name: 'Rota do Espresso' },
    { lat: -23.56355, lng: -46.654248, name: 'Cantinho do Café SP' },

    // Rio de janeiro
    { lat: -23.55052, lng: -46.633308, name: 'Carioca Coffee Corner' },
    { lat: -23.55658, lng: -46.662647, name: 'Sabor do Samba Café' },
    { lat: -23.56355, lng: -46.654248, name: 'Praia & Café RJ' },

    // Minas gerais 

    { lat: -19.936478, lng: -43.938147, name: 'Serra do Café Mineiro' },
    { lat: -19.934454, lng: -43.937963, name: 'Minas Aromáticas' },
    { lat: -18.922127, lng: -48.284625, name: 'Café com Queijo MG' },

    // Bahia 

    { lat: -12.971590, lng: -38.501460, name: 'Bahia Barista' },
    { lat: -12.976215, lng: -38.458375, name: 'Axé do Café' },
    { lat: -12.970381, lng: -38.508848, name: 'Salvador Espresso Spot' },

    // Parana

    { lat: -25.4295963, lng: -49.2712724, name: 'Paraná Perk' },
    { lat: -25.4384154, lng: -49.2712724, name: 'Café Curitiba Charme' },
    { lat: -25.4427766, lng: -49.2744074, name: 'Espresso Paranaense' },

    // Rio Grande Do Sul 

    { lat: -30.0318, lng: -51.2065, name: 'Pampa Café' },
    { lat: -30.0346, lng: -51.2206, name: 'Gaúcho Espresso House' },
    { lat: -30.0277, lng: -51.2246, name: 'Porto Alegre Brew' },

    // Santa Catarina 

    { lat: -27.5973002, lng: -48.5480492, name: 'Floripa Coffee Corner' },
    { lat: -27.5904, lng: -48.5480492, name: 'Ilha do Café SC' },
    { lat: -27.5938, lng: -48.544, name: 'Joinville Java' },

    // Ceara 

    { lat: -3.71839, lng: -38.5434, name: 'Fortaleza Bean Haven' },
    { lat: -3.7319, lng: -38.5267, name: 'Ceará Cappuccino Café' },
    { lat: -3.7373, lng: -38.5267, name: 'Sol & Sabor CE' },

    // Pernambuco 

    { lat: -8.0476, lng: -34.877, name: 'Recife Roastery' },
    { lat: -8.0566, lng: -34.877, name: 'Olinda Espresso Emporium' },
    { lat: -8.0561, lng: -34.8944, name: 'Pernambuco Perfetto' },

    // Goias 

    { lat: -16.6869, lng: -49.2648, name: 'Goiânia Grounds' },
    { lat: -16.6796, lng: -49.2639, name: 'Cerrado Coffee Corner' },
    { lat: -16.6791, lng: -49.2694, name: 'Goiás Gourmet Grind' },


];


// Adicione marcadores para cada loja de café
cafes.forEach(cafe => {
    L.marker([cafe.lat, cafe.lng]).addTo(map)
        .bindPopup(`<h4>${cafe.name}</h4>`);
});

// Função para obter a localização do usuário
let usuarioLatitude;
let usuarioLongitude;

function geoLocalizacao() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosicao, showError);
    } else {
        alert("Navegador não suportado");
    }
}

// Função para exibir a posição do usuário
function showPosicao(position) {
    usuarioLatitude = position.coords.latitude;
    usuarioLongitude = position.coords.longitude;

    L.marker([usuarioLatitude, usuarioLongitude]).addTo(map)
        .bindPopup('Você está aqui!')
        .openPopup();
    map.setView([usuarioLatitude, usuarioLongitude], 13);


}

// Função para exibir erros relacionados à geolocalização
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("Usuário negou a solicitação de Geolocalização.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("As informações de localização não estão disponíveis.");
            break;
        case error.TIMEOUT:
            alert("A solicitação para obter a localização do usuário expirou.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Ocorreu um erro desconhecido.");
            break;
    }
}