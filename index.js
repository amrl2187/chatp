document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('storeSelect').addEventListener('change', loadProducts);
    loadProducts();
    setupButtons();
});

const allProducts = [
    { store: 'amazon', category: 'computadora', name: " Amazon ", image: "amazon.png", description: "mother board", link: "https://www.amazon.com/s?k=computadoras&__mk_es_US=%C3%85M%C3%85%C5%BD%C3%95%C3%91&ref=nb_sb_noss_1" },
    { store: 'aliexpress', category: 'computadora', name: " AliExpress ", image: "aliexpress.png", description: "meorias Ram", link: "https://www.aliexpress.com/computer1" },
    { store: 'joytec', category: 'computadora', name: " yoyTec ", image: "yoytec.png", description: "", link: "https://www.joytec.com/computer1" },
    { store: 'paytec', category: 'computadora', name: " PayTec ", image: "ptytec.png", description: "", link: "https://www.paytec.com/computer1" },
    { store: 'loltec', category: 'computadora', name: " loltec ", image: "loltec.png", description: "", link: "https://www.uptech.com/computer1" },
    { store: 'bestbuy', category: 'computadora', name: " bestbuy ", image: "bestbuy.png", description: "", link: "https://www.compurastro.com/computer1" },
    
];

function loadProducts() {
    const store = document.getElementById('storeSelect').value;
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = ''; // Limpiar contenedor de productos
    const filteredProducts = allProducts.filter(product => product.store === store || store === 'all');
    renderProducts(filteredProducts);
}

function searchProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const store = document.getElementById('storeSelect').value;
    const filteredProducts = allProducts.filter(product => {
        const matchesStore = product.store === store || store === 'all';
        const matchesSearch = product.name.toLowerCase().includes(searchInput) || 
                              product.description.toLowerCase().includes(searchInput) ||
                              product.category.toLowerCase().includes(searchInput);
        return matchesStore && matchesSearch;
    });
    renderProducts(filteredProducts);
}

function renderProducts(products) {
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = ''; // Limpiar contenedor de productos
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `<h3>${product.name}</h3>
                                <img src="${product.image}" alt="${product.name}">
                                <p>${product.description}</p>
                                <a href="${product.link}" target="_blank">Ir a página original</a>`;
        productsContainer.appendChild(productDiv);
    });
}

function setupButtons() {
    document.getElementById('helpButton').addEventListener('click', function() {
        alert('Esta es la sección de ayuda.');
    });

    document.getElementById('infoButton').addEventListener('click', function() {
        alert('Esta es la sección de información.');
    });

    document.getElementById('otherButton1').addEventListener('click', function() {
        alert('Otro botón 1 presionado.');
    });

    document.getElementById('otherButton2').addEventListener('click', function() {
        alert('Otro botón 2 presionado.');
    });
}

// Funciones del chatbot
const responses = {
    "¿Cuál es el horario de atención?": "Nuestro horario de atención es de 9 AM a 6 PM de lunes a viernes.",
    "¿Dónde están ubicados?": "Estamos ubicados en la calle Falsa 123, Ciudad Ejemplo.",
    "¿Cómo puedo hacer una devolución?": "Para hacer una devolución, por favor visita nuestra sección de devoluciones en la página web.",
    "¿Ofrecen envíos internacionales?": "Sí, ofrecemos envíos internacionales a varios países.",
    "¿Puedo pagar con tarjeta de crédito?": "Sí, aceptamos pagos con tarjeta de crédito y débito."
};

function toggleChatbot() {
    const chatbotModal = document.getElementById('chatbotModal');
    chatbotModal.style.display = chatbotModal.style.display === 'none' ? 'block' : 'none';
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('chatbotInput');
        const message = input.value.trim();
        if (message) {
            addMessage('user', message);
            respondToMessage(message);
            input.value = '';
        }
    }
}

function addMessage(sender, text) {
    const chatbotBody = document.getElementById('chatbotBody');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbotMessage ${sender}`;
    messageDiv.innerText = text;
    chatbotBody.appendChild(messageDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function respondToMessage(message) {
    const response = responses[message] || "Lo siento, no entiendo la pregunta. Por favor, intenta con otra pregunta.";
    setTimeout(() => {
        addMessage('bot', response);
    }, 500);
}

function selectQuestion(question) {
    addMessage('user', question);
    respondToMessage(question);
}
