document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("devForm");
    const techsContainer = document.getElementById("techsContainer");
    const devList = document.getElementById("devList");
    let devs = JSON.parse(localStorage.getItem("devs")) || [];
  
    document.getElementById("addTech").addEventListener("click", () => {
      const div = document.createElement("div");
      div.classList.add("tech-entry");
      const techIndex = techsContainer.children.length;
      div.innerHTML = `
        <input type="text" name="tech" placeholder="Tecnologia" required>
        <div>
          ${["0-2 anos", "3-4 anos", "5+ anos"].map(exp => `
            <label>
              <input type="radio" name="exp${techIndex}" value="${exp}" required> ${exp}
            </label>
          `).join('')}
        </div>
        <button type="button" class="removeTech">Remover</button>
      `;
      techsContainer.appendChild(div);
    });
  
    techsContainer.addEventListener("click", (ev) => {
      if (ev.target.classList.contains("removeTech")) ev.target.parentElement.remove();
    });
  
    form.addEventListener("submit", (ev) => {
      ev.preventDefault(); // Impede o recarregamento da página
      
      const name = document.getElementById("devName").value.trim();
      if (!name) {
        alert("Por favor, insira o nome do desenvolvedor.");
        return;
      }
  
      const techs = [...techsContainer.children].map(row => {
        return {
          tech: row.querySelector("input[name='tech']").value.trim(),
          exp: row.querySelector("input[type='radio']:checked")?.value
        };
      }).filter(t => t.tech && t.exp);
  
      if (techs.length === 0) {
        alert("Adicione pelo menos uma tecnologia com tempo de experiência.");
        return;
      }
  
      const dev = { name, techs };
      devs.push(dev);
      localStorage.setItem("devs", JSON.stringify(devs));
      updateDevList();
      form.reset();
      techsContainer.innerHTML = "";
    });
  
    function updateDevList() {
      devList.innerHTML = "";
      devs.forEach(dev => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${dev.name}</strong><br> ${dev.techs.map(t => `${t.tech} (${t.exp})`).join(", ")}`;
        devList.appendChild(li);
      });
    }
  
    updateDevList();
  });
  
