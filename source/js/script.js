let addNote = document.querySelector('#add-note');//Botão de para adicionar nota
let closeModal =  document.querySelector('#close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); //Modal para edição das notas
let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
let notes = document.querySelectorAll('.item-note');//Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
let btnCloseNote = document.querySelector("#btn-close-note");//icone para fechar modal de edição de nota.

/**
 * Modal de edição da anotação
 */
addNote.addEventListener('click',
(evt)=>{
  evt.preventDefault();
  modal.style.display='block';
  document.querySelector('#notes').style.display='none';
  document.querySelector('#controls').style.display='none';
});

//Botão para salvar a nota
btnSaveNote.addEventListener('click',(evt)=>{
    evt.preventDefault();
   
    saveNote(
      {
        id: document.querySelector("#input-id").value,
        title:document.querySelector("#input-title").value,
        content:document.querySelector("#input-content").value,
       
      }
    );  
  });

  const saveNote = (note) => {
    //Registra o horário da ultima alteração
    note.lastTime = new Date().getTime();
    let notes= loadNotes();
    //Se uma lista não existir
    if (!notes){
      //criar lista vazia
      notes=[];
    }
    if(note.id.length == 0){
      note.id= new Date().getTime();
      //Atualiza o valor do id da nota
      document.querySelector("#input-id").value=note.id;
      //incluir a nota na lista
      notes.push(note);
    }else{
      //percore todos os itens da lista
      for (i=0; i<notes.length; i++){
        //Quando encontrar o id equivalente
        if(notes[i].id==note.id){
          //substituir as informações do item
          notes[i]=note;
        }
      }
    }
    //Transforma objeto em uma string
    notes=JSON.stringify(notes);
    //Salva string no local storage
    localStorage.setItem('notes', notes);
   
  }
  