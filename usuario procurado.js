    async function buscarUsuarios() {
      const query = document.getElementById('searchInput').value.trim();
      const resultados = document.getElementById('resultados');
      resultados.innerHTML = '';

      if (!query) {
        resultados.innerHTML = '<li>Digite algo para pesquisar.</li>';
        return;
      }

      try {
        const resposta = await fetch(`https://api.github.com/search/users?q=${query}`);
        const dados = await resposta.json();

        if (dados.items && dados.items.length > 0) {
          dados.items.forEach(usuario => {
            const li = document.createElement('li');
            li.innerHTML = `
              <img src="${usuario.avatar_url}" width="50" style="vertical-align:middle; border-radius:50%;">
              <strong>${usuario.login}</strong> - <a href="${usuario.html_url}" target="_blank">Perfil</a>
            `;
            resultados.appendChild(li);
          });
        } else {
          resultados.innerHTML = '<li>Não foram encontrados usuários para esta pesquisa.</li>';
        }
      } catch (erro) {
        resultados.innerHTML = '<li>Erro ao buscar usuários.</li>';
      }
    }
