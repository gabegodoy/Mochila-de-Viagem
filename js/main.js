const form = document.getElementById('novoItem');
const lista = document.querySelector('#lista');
const itens = JSON.parse(localStorage.getItem("itens")) || [];


itens.forEach( (elemento) => {
  criaElemento(elemento)
});


form.addEventListener('submit', (evento) => {
  evento.preventDefault()

  const nomeProduto = evento.target.elements['nome'];
  const quantidadeProduto = evento.target.elements['quantidade'];


//VERIFICA PLURAL
  if (nomeProduto.value.charAt(nomeProduto.value.length -1) != 's' && quantidadeProduto.value > 1){
    definePlural(nomeProduto)
  } 
  
//CRIA ITEM  
  const item = {
    'nome': nomeProduto.value,
    'quantidade': quantidadeProduto.value
  }

//VERIFICA ITENS REPETIDOS  
  const existe = itens.find(elemento => elemento.nome === nomeProduto.value);

  if (existe){
    item.id = existe.id;
    atualizaElemento(item);

    itens[existe.id] = item
  }
  else {
    item.id = itens.length;
    criaElemento(item);
    itens.push(item) ;

  }

  

  localStorage.setItem("itens", JSON.stringify(itens));


  nomeProduto.value = '' 
  quantidadeProduto.value = ''
  
})



function definePlural(nomeProduto){
    return nomeProduto.value += 's'
}

function criaElemento(item){
  const novoItem = document.createElement('li');
  novoItem.classList.add('item');

  const numeroItem = document.createElement('strong');
  numeroItem.innerHTML = item.quantidade;
  numeroItem.dataset.id = item.id;
  novoItem.appendChild(numeroItem)

  novoItem.innerHTML += item.nome;

  lista.appendChild(novoItem)

} 

function atualizaElemento (item){
  document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}
