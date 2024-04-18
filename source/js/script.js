let addNote = document.querySelector('#add-note');//Botão de para adicionar nota
let closeModalView =  document.querySelector('#close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); //Modal para edição das notas
let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
let notes = document.querySelector('#notes');//Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
let btnCloseModal = document.querySelector("#btn-close-note");//icone para fechar modal de edição de nota.

//++++++++++++++  EVENTOS +++++++++++++++//

addNote.addEventListener('click', (evt) => {
  evt.preventDefault();
  modal.style.display = 'block';
  notes.style.display = 'none';
  addNote.style.display = 'none';
  document.querySelector("#input-id").value = "";
  document.querySelector("#input-title").value = "";
  document.querySelector("#input-content").value = "";
});

btnCloseModal.addEventListener('click', (evt) => {
  evt.preventDefault();
  listNotes();
  modal.style.display = 'none';
  notes.style.display = 'flex';
  addNote.style.display = 'block';
});

btnSaveNote.addEventListener('click', (evt) => {
  evt.preventDefault();
  const objNote = {
    id: document.querySelector("#input-id").value.trim(),
    title: document.querySelector("#input-title").value.trim(),
    content: document.querySelector("#input-content").value.trim()
  };
  saveNote(objNote);
});

closeModalView.addEventListener('click', (evt) => {
  evt.preventDefault();
  modalView.style.display = 'none';
  notes.style.display = 'flex';
  addNote.style.display = 'block';
});

//++++++++++++++  FUNÇÕES +++++++++++++++//

const saveNote = (note) => {
  let listNotes = loadNotes();

  if (note.id.length < 1) {
    note.id = new Date().getTime();
    document.querySelector('#input-id').value = note.id;
    listNotes.push(note);
  } else {
    listNotes.forEach((item, i) => {
      if (item.id == note.id) {
        listNotes[i] = note;
      }
    });
  }
  note.lastTime = new Date().getTime();
  listNotes = JSON.stringify(listNotes);
  localStorage.setItem('notes', listNotes);
};

const loadNotes = () => {
  let listNotes = localStorage.getItem('notes');
  if (!listNotes) {
    listNotes = [];
  } else {
    listNotes = JSON.parse(listNotes);
  }
  return listNotes;
};

const listNotes = () => {
  notes.innerHTML = "";
  const list = loadNotes();
  list.forEach((item) => {
    const divCard = document.createElement('div');
    divCard.className = 'card';
    divCard.style.width = '18rem';
    notes.appendChild(divCard);

    const divCardBody = document.createElement('div');
    divCardBody.className = "card-body";
    divCard.appendChild(divCardBody);

    const h1 = document.createElement('h1');
    h1.innerText = item.title;
    divCardBody.appendChild(h1);

    const pContent = document.createElement('p');
    pContent.innerText = item.content;
    divCardBody.appendChild(pContent);

    const pDate = document.createElement('p');
    const time = new Date(item.lastTime);
    pDate.innerText = "Última alteração : " + time.toLocaleDateString("pt-BR");
    divCardBody.appendChild(pDate);

    divCard.addEventListener('click', () => {
      showNoteDetails(item);
    });
  });
};

const showNoteDetails = (note) => {
  document.querySelector('#title-note').innerHTML = "<h1>" + note.title + "</h1>";
  document.querySelector('#content-note').innerHTML = "<p>" + note.content + "</p>";
  document.querySelector('#title-note').innerHTML += "<p>Última alteração:" + new Date(note.lastTime).toLocaleDateString("pt-BR") + "</p>";
  document.querySelector('#controls-note').innerHTML = "";

  const aDelete = document.createElement('a');
  const iDelete = document.createElement('i');
  iDelete.style.color = "#F00";
  iDelete.className = "bi bi-trash";
  aDelete.appendChild(iDelete);
  aDelete.addEventListener('click', (evt) => {
    evt.preventDefault();
    deleteNote(note.id);
  });

  const aEdit = document.createElement('a');
  const iEdit = document.createElement('i');
  iEdit.style.color = "#00FF00";
  iEdit.className = "bi bi-pen";
  aEdit.appendChild(iEdit);
  aEdit.addEventListener('click', () => {
    editNote(note);
  });

  document.querySelector('#controls-note').appendChild(aDelete);
  document.querySelector('#controls-note').appendChild(aEdit);

  modalView.style.display = 'block';
  notes.style.display = 'none';
  addNote.style.display = 'none';
};

const deleteNote = (id) => {
  let noteDelete = loadNotes(); 
  noteDelete = noteDelete.filter(note => note.id !== id); 
  localStorage.setItem('notes', JSON.stringify(noteDelete));
  listNotes();
  modalView.style.display='none';
  addNote.style.display = 'block';
  notes.style.display = 'flex';
};

const editNote = (note) => {
  document.querySelector("#input-id").value = note.id;
  document.querySelector("#input-title").value = note.title;
  document.querySelector("#input-content").value = note.content;
  modal.style.display = 'block';
  addNote.style.display = 'none';
  notes.style.display = 'none';
  modalView.style.display = 'none';
};

listNotes();
