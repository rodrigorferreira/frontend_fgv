

// Dados do cardápio
const menuItems = [
    { name: "Hamburguer Clássico", category: "Hamburgueres", price: 15.00, image: "./imagens/hamburguer_classico.jpg", description: "Pão, carne, queijo, alface, tomate e maionese." },
    { name: "Hamburguer Vegano", category: "Hamburgueres", price: 14.00, image: "./imagens/hamburguer_vegano.jpeg", description: "Pão vegano, hambúrguer de grão de bico, alface, tomate e molho especial." },
    { name: "Batata Frita", category: "Acompanhamentos", price: 8.00, image: "./imagens/batata_frita.jpg", description: "Batatas fritas crocantes e saborosas." },
    { name: "Milkshake de Chocolate", category: "Bebidas", price: 12.00, image: "./imagens/milkshake_chocolate.jpg", description: "Milkshake cremoso sabor chocolate." },
    { name: "Coca-Cola lata 350ml", category: "Bebidas", price: 10.00, image: "./imagens/cocacola.jpg", description: "Coca-Cola Lata de 250 ml." }
    // Adicione mais itens aqui
];

    // Função para mostrar a descrição do item
    function displayMenu(items) {
      const menuContainer = document.getElementById("menuItems");
      menuContainer.innerHTML = "";
    
      items.forEach(item => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menuItem");
    
        const itemName = document.createElement("h2");
        itemName.textContent = item.name;
    
        const itemImage = document.createElement("img");
        itemImage.src = item.image;
        itemImage.alt = item.name;
    
        const itemPrice = document.createElement("p");
        itemPrice.textContent = `Preço: R$ ${item.price.toFixed(2)}`;
        itemPrice.classList.add("price"); // Adiciona a classe "price"
    
        const itemCategory = document.createElement("p");
        itemCategory.textContent = `Categoria: ${item.category}`;
        itemCategory.classList.add("category"); // Adiciona a classe "category"
    
        const itemDescription = document.createElement("p");
        itemDescription.textContent = item.description;
        itemDescription.classList.add("description");
    
        // Eventos para mostrar/ocultar a descrição
        itemImage.addEventListener("mouseenter", () => showDescription(itemDescription));
        itemImage.addEventListener("mouseleave", () => hideDescription(itemDescription));
    
        // Adiciona elementos ao item do menu
        menuItem.appendChild(itemName);
        menuItem.appendChild(itemImage);
        menuItem.appendChild(itemPrice);
        menuItem.appendChild(itemCategory);
        menuItem.appendChild(itemDescription);
    
        // Adiciona o item do menu ao contêiner principal
        menuContainer.appendChild(menuItem);
      });

        // Adiciona a verificação do status ao carregar a página
        updateStatusBasedOnTime();
    }
    
    function showDescription(descriptionElement) {
      // Mostra a descrição apenas se o mouse estiver sobre a imagem
      descriptionElement.style.display = "block";
    }
    
    function hideDescription(descriptionElement) {
      // Oculta a descrição
      descriptionElement.style.display = "none";
    }
    // Funções de atualização da interface e do status
    function search() {
      const searchTerm = document.getElementById("searchInput").value.toLowerCase();
      const menuItems = document.querySelectorAll(".menuItem");
    
      menuItems.forEach(item => {
        const itemName = item.querySelector("h2").textContent.toLowerCase();
        const itemCategory = item.querySelector(".category").textContent.toLowerCase();
        const itemDescription = item.querySelector(".description").textContent.toLowerCase();
    
        const matchesSearchTerm = itemName.includes(searchTerm) || itemCategory.includes(searchTerm) || itemDescription.includes(searchTerm);
    
        if (matchesSearchTerm) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    }
  
    // Atualiza o status com base na hora atual do dia (Horario de funcionamento)
    function updateStatusBasedOnTime() {  
      const horarioFuncionamento = document.getElementById("horarioFuncionamento");
    
      const now = new Date();
      const currentHour = now.getHours();
    
      const horaAbertura = 9; // Horário fictício de abertura (ajuste conforme necessário)
      const horaFechamento = 19; // Horário fictício de fechamento (ajuste conforme necessário)
    
      if (currentHour >= horaAbertura && currentHour < horaFechamento) {
        horarioFuncionamento.textContent = "Aberto agora";
      } else {
        horarioFuncionamento.textContent = "Fechado";
      }
    }

  const whatsappIcon = document.querySelector(".whatsapp-icon");

whatsappIcon.addEventListener("click", () => {
  // Substitua o número do telefone com o número real
  const phoneNumber = "5521997767019";
  const whatsappURL = `https://wa.me/${phoneNumber}`;
  window.open(whatsappURL, "_blank");
});

    // Função para abrir o menu
    window.onload = () => {
      displayMenu(menuItems);
    };
    