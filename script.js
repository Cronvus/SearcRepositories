const input = document.querySelector('.search')
const list = document.querySelector('.add-list')
const variants = document.querySelector('.variants');
let timeout;

input.addEventListener('input', () => {
    clearTimeout(timeout);
    const query = input.value.trim();

    if (query === '') {
        variants.innerHTML = '';
        return;
    }

    timeout = setTimeout(() => {
        fetch(`https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc`)
            .then(response => response.json())
            .then(data => showVariants(data.items));
    }, 300);
});

function showVariants(repos) {
    variants.innerHTML = '';
    repos.slice(0, 5).forEach(repo => {
        const li = document.createElement('li');
        li.textContent = repo.name;
        li.onclick = () => addRepo(repo);
        variants.appendChild(li);
    });
}

function addRepo(repo){
    const li = document.createElement('li')
    li.className = "list-item"
    li.innerHTML = `Name: ${repo.name} <br> Owner: ${repo.owner.login} <br> Stars: ${repo.stargazers_count}
<button class ='remove' onclick="removeRepo(this)"></button>`
    list.appendChild(li)
    input.value = ''
    input.innerHTML = ''
}

function removeRepo(button){
    const repoItem = button.parentElement;
    list.removeChild(repoItem);

}
