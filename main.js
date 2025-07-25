import { fetchGastos } from './services/get.js';    
import { addGasto } from './services/post.js';      
import { updateGasto } from './services/put.js';   
import { deleteGasto } from './services/delete.js';

const form = document.getElementById('gasto-form');
const gastosList = document.getElementById('gastos-list');
const gastoIdInput = document.getElementById('gasto-id');     
const descricaoInput = document.getElementById('descricao');
const valorInput = document.getElementById('valor');

const categoriaInput = document.getElementById('categoria');
const submitButton = form.querySelector('button');

function renderGastos(gastos) {
  gastosList.innerHTML = '';

  gastos.forEach(gasto => {
    const li = document.createElement('li');

    li.innerHTML = `
      <div class="gasto-info">
        <span class="gasto-descricao">${gasto.descricao} - ${gasto.categoria} - R$ ${Number(gasto.valor).toFixed(2)}</span>
        <small class="gasto-id">ID: ${gasto.id}</small>
      </div>
      <div class="gasto-actions">
        <button class="edit-btn" data-id="${gasto.id}">✏️</button>
        <button class="delete-btn" data-id="${gasto.id}">❌</button>
      </div>
    `;

    li.dataset.gasto = JSON.stringify(gasto);

    gastosList.appendChild(li);
  });
}

async function carregarGastos() {
  const gastos = await fetchGastos();

  renderGastos(gastos);
}
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = gastoIdInput.value;

  const gastoData = {
    descricao: descricaoInput.value,
    valor: parseFloat(valorInput.value),
    categoria: categoriaInput.value,
  };

  if (id) {
    await updateGasto(id, gastoData);
    submitButton.textContent = 'Adicionar';
  } else {
    await addGasto(gastoData);
  }

  form.reset();
  gastoIdInput.value = '';
  carregarGastos();
});
gastosList.addEventListener('click', async (e) => {
  const target = e.target;

  if (target.classList.contains('delete-btn')) {
    const id = target.dataset.id;
    const confirmDelete = confirm('Tem certeza que deseja deletar este gasto?');
    if (confirmDelete) {
      await deleteGasto(id); 
      carregarGastos();    
    }
  }

  if (target.classList.contains('edit-btn')) {
    const li = target.closest('li');
    const gasto = JSON.parse(li.dataset.gasto);

    descricaoInput.value = gasto.descricao;
    valorInput.value = gasto.valor;
    categoriaInput.value = gasto.categoria;

    submitButton.textContent = 'Atualizar';
    descricaoInput.focus();
  }
});
carregarGastos();