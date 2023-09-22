const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    let eventsUser = "";

    user.events.forEach((event) => {
      if (event.type === "PushEvent") {
        event.payload.commits.forEach((commit) => {
          eventsUser += `<li><p>${event.repo.name}<br><span class="commits">"${
            commit.message ?? "Sem commits para esse evento 😥"
          }"</span></p></li>`;
        });
      } else if (event.type === "CreateEvent") {
        eventsUser += `<li><p>${event.repo.name}<br><span class="commits">"${
          event.payload.description ?? "Sem commits para esse evento😥"
        }"</span></p></li>`;
      } else {
        eventsUser += `<li><p>Nenhum Evento encontrado 😥</p></li>`;
      }
    });
    this.userProfile.innerHTML = `<div class="info">
                <img src="${user.avatarUrl}" alt="Foto do perfil do usuário"/>
                <div class="data">
                    <h1>${user.name ?? "Não possui nome cadastrado 😢"}</h1>
                    <p>${user.bio ?? "Não possui bio cadastrada 😢"}</p>
                    <p>👥 Seguidores: ${
                      user.followers ?? "Não possui seguidores 😥"
                    }</p>
                    <p>👥 Seguindo: ${
                      user.following ?? "Não segue ninguém no Github 😥"
                    }</p>
                </div>
            </div>`;

    let repositoriesItens = "";
    user.repositories.forEach(
      (repo) =>
        (repositoriesItens += `<li><a href="${repo.html_url}"
        target="_blank">${repo.name}<br><span>🍴${repo.forks}</span><span>⭐${
          repo.stargazers_count
        }</span><span>👀${repo.watchers}</span><span>💻${
          repo.language ?? "Nenhuma"
        }</span></a></li>`)
    );

    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`;
    }
    if (user.events.length > 0) {
      this.userProfile.innerHTML += `<div class="events">
                                                <h2>Eventos</h2>
                                                <ul>${
                                                  eventsUser ??
                                                  "Nenhum evento encontrado 😥"
                                                }</ul>
                                            </div>`;
    } else {
      this.userProfile.innerHTML += `<div class="events">
                                                <h2>Eventos</h2>
                                                <ul><li>'Nenhum evento encontrado 😥'</li></ul>
                                            </div>`;
    }
  },
  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
  },
};

export { screen };

//repositories[0].forks
//repositories[0].stargazers_count
//repositories[0].watchers
//language
