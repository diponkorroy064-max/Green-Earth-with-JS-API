const loadAllCategories = fetch('https://openapi.programming-hero.com/api/categories')
    .then((res) => res.json())
    .then((data) => displayAllCategories(data.categories))


const displayAllCategories = (data) => {
    const categoriesContainer = document.getElementById('categoriesContainer');

    data.forEach(category => {
        // console.log(category)

        const btn = document.createElement("button");
        btn.className = "btn btn-wide";

        btn.innerHTML = `
            ${category.category_name}
        `;
        categoriesContainer.appendChild(btn);

    });
}



const loadAllTrees = fetch('https://openapi.programming-hero.com/api/plants')
    .then((res) => res.json())
    .then((allTrees) => displayAllTrees(allTrees.plants));


const displayAllTrees = (data) => {
    const treesContainer = document.getElementById('trees-container');

    data.forEach((treeCategory) => {
        console.log(treeCategory);

        const cards = document.createElement('div');
        cards.className = "bg-base-100 shadow-sm border border-gray-200 rounded-md";

        cards.innerHTML = `
        <figure class="p-2">
            <img src="${treeCategory.image}" class="h-[200px] w-screen rounded-md" alt="Shoes" />
        </figure>

        <div class="space-y-2 pb-3">
            <h2 class="card-title pl-3 text-[16px]">${treeCategory.name}</h2>
            <p class="text-left px-3 text-[12px] line-clamp-2">${treeCategory.description}</p>

            <div class="card-actions flex justify-between">
              <h3 class="btn btn-primary ml-3">${treeCategory.category}</h3>
              <h3 class="font-bold mr-3">$ ${treeCategory.price}</h3>
            </div>

            <button class="btn w-[220px] bg-green-500 text-white font-bold">Add to Card</button>
        </div>
    `;

        treesContainer.appendChild(cards);

    })

    
}

