import { API_URL } from '../api.js';

export async function deleteGasto(id) {
  try {
    const response = await fetch(`${API_URL}/api/gastos/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) throw new Error('Erro ao deletar gasto');
    return { success: true }; 
  } catch (error) {
    console.error('Falha em deleteGasto:', error);
  }
}