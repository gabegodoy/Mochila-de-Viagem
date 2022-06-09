const form = document.getElementById('novoItem');
const lista = document.querySelector('#lista');
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((elemento) => {
  criaElemento(elemento)
}); 



form.addEventListener('submit', (evento) => {
  evento.preventDefault()

  const nomeProduto = evento.target.elements['nome'];
  const quantidadeProduto = evento.target.elements['quantidade'];


/* //VERIFICA PLURAL
  if (nomeProduto.value.charAt(nomeProduto.value.length -1) != 's' && quantidadeProduto.value > 1){
    definePlural(nomeProduto)
  }  */
  
//CRIA ITEM  
  const item = {
    'nome': nomeProduto.value,
    'quantidade': quantidadeProduto.value
  }
  
  //VERIFICA ITENS REPETIDOS  
  const existe = itens.find(elemento => elemento.nome === nomeProduto.value);
  
  if (existe){
    item.id = existe.id;
    atualizaQuantidade(item);

    itens[itens.findIndex(elemento => elemento.id === existe.id)] = item;

  }
  else {
    item.id = itens[itens.length -1] ? (itens[itens.length -1]).id +1 : 0;
    criaElemento(item);
    itens.push(item) ;

  }

  atualizaLocal();
  
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
  novoItem.id = item.id

  novoItem.innerHTML += item.nome;

  lista.appendChild(novoItem)
  
} 

function atualizaQuantidade (item){
  document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}



//DELETAR OU RISCAR ITENS
const itensHtml = document.querySelectorAll('.item')
itensHtml.forEach((elemento) => {
  elemento.addEventListener("click", () => {
    if (elemento.style.textDecoration == "line-through"){
      elemento.style.textDecoration = "none"
    }else{elemento.style.textDecoration = "line-through";}
 
    atualizaLocal();

  })

  elemento.addEventListener("dblclick", (target) => {
    lista.removeChild(elemento);
    removeLocal(target.target.id)
  })

});

  
function removeLocal (id){
  let newArray = itens.filter((item) => item.id != id);
  localStorage.setItem("itens", JSON.stringify(newArray))
}


function atualizaLocal (){
  localStorage.setItem("itens", JSON.stringify(itens));
}