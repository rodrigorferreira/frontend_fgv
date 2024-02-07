

// Inicializa o aplicativo Vue
const vueApp = new Vue({
  // Define o elemento HTML que será controlado pelo Vue
  el: '#menuItems',

  // Define os dados do aplicativo
  data: {
    searchTerm: '', // Termo de pesquisa
    items: [], // Itens do menu
    isPreviewVisible: false, // Define se a visualização detalhada do produto está visível
    selectedItem: null // Item selecionado para exibir detalhes
  },

  // Define os métodos disponíveis no aplicativo Vue
  methods: {
    // Carrega os itens do menu a partir de um arquivo JSON
    async loadMenuItems() {
      try {
        const response = await fetch('menu.json'); // Faz a requisição para o arquivo JSON
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        this.items = await response.json(); // Atualiza a lista de itens do menu com os dados obtidos
      } catch (error) {
        console.error('Erro ao carregar itens do menu:', error); // Exibe um erro caso haja falha no carregamento dos itens
      }
    },

    // Método para esconder a visualização detalhada do produto
    search() {
      this.isPreviewVisible = false;
    },

    // Método para exibir a descrição detalhada de um item
    showDescription(item) {
      this.selectedItem = item; // Define o item selecionado
      this.isPreviewVisible = true; // Exibe a visualização detalhada do produto
    },

    // Método para fechar a visualização detalhada do produto
    closePreview() {
      this.isPreviewVisible = false; // Esconde a visualização detalhada do produto
    }
  },

  // Define as propriedades computadas do aplicativo Vue
  computed: {
    // Filtra os itens do menu com base no termo de pesquisa
    filteredItems() {
      return this.items.filter(item => {
        const searchTermLowerCase = this.searchTerm.toLowerCase(); // Converte o termo de pesquisa para minúsculas
        return item.name.toLowerCase().includes(searchTermLowerCase) || // Verifica se o nome do item contém o termo de pesquisa
          item.category.toLowerCase().includes(searchTermLowerCase); // Verifica se a categoria do item contém o termo de pesquisa
      });
    }
  },

  // Executa a função de carregar os itens do menu quando o aplicativo Vue é criado
  created() {
    this.loadMenuItems();
  }
});



// Dados do cardápio
let menuItems = [];

// Função para fazer a requisição à API e carregar os itens do menu
async function carregarItensDoMenu() {
  try {
    const resposta = await fetch('menu.json');
    if (!resposta.ok) {
      throw new Error(`Erro na requisição: ${resposta.status}`);
    }

    menuItems = await resposta.json();
    displayMenu(menuItems);
  } catch (erro) {
    console.error('Erro ao carregar itens do menu:', erro);
  }
}

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

    // Evento para mostrar a visualização detalhada do produto ao clicar na imagem
    itemImage.addEventListener("click", () => showPreview(item)); // Correção aqui

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

// Função para mostrar a visualização detalhada do produto
function showPreview(item) {
  console.log("Exibindo visualização detalhada do item:", item);
  const previewContainer = document.querySelector('.product-preview');
  const previewContent = previewContainer.querySelector('.preview-content');
  
  previewContent.querySelector('.preview-name').textContent = item.name;
  previewContent.querySelector('.preview-image').src = item.image;
  previewContent.querySelector('.preview-price').textContent = `Preço: R$ ${item.price.toFixed(2)}`;
  previewContent.querySelector('.preview-category').textContent = `Categoria: ${item.category}`;
  previewContent.querySelector('.preview-description').textContent = item.description;

  previewContainer.style.display = 'block';

  // Evento para fechar a visualização detalhada ao clicar em "Fechar"
  const closeButton = previewContent.querySelector('.close-preview');
  closeButton.addEventListener('click', () => {
    console.log("Fechando visualização detalhada");
    previewContainer.style.display = 'none';
  });
}


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

// Adicionando o evento de clique ao botão de busca
document.getElementById("searchButton").addEventListener("click", search);


// Atualiza o status com base na hora atual do dia (Horario de funcionamento)
function updateStatusBasedOnTime() {  
  const horarioFuncionamento = document.getElementById("horarioFuncionamento");

  const now = new Date();
  const currentHour = now.getHours();

  const horaAbertura = 16; // Horário fictício de abertura (ajuste conforme necessário)
  const horaFechamento = 24; // Horário fictício de fechamento (ajuste conforme necessário)

  if (currentHour >= horaAbertura && currentHour < horaFechamento) {
    horarioFuncionamento.textContent = "Aberto agora";
  } else {
    horarioFuncionamento.textContent = "Fechado";
  }
}

const whatsappIcon = document.querySelector(".whatsapp-icon");

whatsappIcon.addEventListener("click", () => {
 
  const phoneNumber = "5521997767019";
  const whatsappURL = `https://wa.me/${phoneNumber}`;
  window.open(whatsappURL, "_blank");
});

// Função para abrir o menu
window.onload = () => {
  carregarItensDoMenu();
};
