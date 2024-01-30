const fs = require('fs');

// Dados do cardápio
const menuItems = [
    { name: "Hamburguer Clássico", category: "Hamburgueres", price: 15.00, image: "./imagens/hamburguer_classico.jpg", description: "Pão, carne, queijo, alface, tomate e maionese." },
    { name: "Hamburguer Vegano", category: "Hamburgueres", price: 14.00, image: "./imagens/hamburguer_vegano.jpeg", description: "Pão vegano, hambúrguer de grão de bico, alface, tomate e molho especial." },
    { name: "Batata Frita", category: "Acompanhamentos", price: 8.00, image: "./imagens/batata_frita.jpg", description: "Batatas fritas crocantes e saborosas." },
    { name: "Milkshake de Chocolate", category: "Bebidas", price: 12.00, image: "./imagens/milkshake_chocolate.jpg", description: "Milkshake cremoso sabor chocolate." },
    { name: "Coca-Cola lata 350ml", category: "Bebidas", price: 10.00, image: "./imagens/cocacola.jpg", description: "Coca-Cola Lata de 250 ml." }
    // Adicione mais itens aqui
];

// Convertendo para JSON
const jsonData = JSON.stringify(menuItems, null, 2);

// Escrevendo no arquivo
fs.writeFile('menu.json', jsonData, 'utf8', (err) => {
    if (err) {
        console.error('Erro ao escrever o arquivo:', err);
    } else {
        console.log('Arquivo JSON criado com sucesso!');
    }
});
