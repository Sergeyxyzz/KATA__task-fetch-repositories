const searchInput = document.querySelector('.searchInput') // ищем элем
const repoResults = document.querySelector('.repoResults') // результаты поиска элемов в инпуте
const repoList = document.querySelector('.repoList') // список элемов при добавлении 

let timer

// ввод/вывод инпут
searchInput.addEventListener('input', function() {
    console.log(this.value)
    clearTimeout(timer)

    const queryString = this.value

    timer = setTimeout(() => {
        fetch(`https://api.github.com/search/repositories?q=${queryString}`) 
        .then(response => response.json())
        .then(data => {
            console.log(data)
            repoResults.innerHTML = '' // на каждом резолве очистка списка иначе он будет дополняться 
            data.items.slice(0, 5).forEach(elem => {
                console.log(elem)
                const repoItem = document.createElement('li') 
                repoItem.classList.add('repoInpLi') 
                repoItem.innerText = elem.name // в инпут полчил имя элема
                repoItem.addEventListener('click', () => {
                    renderElem(elem) // отправил элем на отрисовку при клике по нему
                    searchInput.value = '' // очистка инпута
                    repoResults.innerHTML = '' // очистка выпадающего списка элемов
                })
                repoResults.appendChild(repoItem) // вывел список 5 элемов под инпут
            })
        }).catch(err => console.log(err))
    }, 600)
})

// рендер элемов
function renderElem(elem) { 
    const repoItem = document.createElement('li') // создал шаблон-карточку элема
    repoItem.classList.add('repoItem')
    repoItem.innerHTML = `
        <div>
            Name: ${elem.name} <br>
            Owner: ${elem.owner.login} <br>
            Stars: ${elem.stargazers_count} 
            <img src='${elem.owner.avatar_url}' class='avatarOwner' title='avatar of ${elem.owner.login} profile'/>
        </div>
        <div>
            <span class='deleteBtn'><img src='./pngwing.com.png' width='75px' /></span>
        </div>
    `
    repoList.appendChild(repoItem) // добавить элем в repoList при клике

    // удаляем элем
    const deleteBtn = repoItem.querySelector('.deleteBtn')
    deleteBtn.addEventListener('click', function() {
        repoItem.remove() 
    })
}

