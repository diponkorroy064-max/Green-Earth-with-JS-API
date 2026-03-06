const treeDetailsModal = document.getElementById('tree_details_modal');

const loadAllCategories = fetch('https://openapi.programming-hero.com/api/categories')
    .then((res) => res.json())
    .then((data) => displayAllCategories(data.categories))


const displayAllCategories = (data) => {
    const categoriesContainer = document.getElementById('categoriesContainer');

    data.forEach(category => {
        // console.log(category)

        const btn = document.createElement("button");
        btn.className = "btn btn-primary w-full";

        btn.onclick = () => selectCategory(category.id, btn);

        btn.innerHTML = `
            ${category.category_name}
        `;
        categoriesContainer.appendChild(btn);

    });
};



async function selectCategory(categoryId, btn) {
    // console.log(categoryId, btn);
    showLoading();

    const allButtons = document.querySelectorAll("#categoriesContainer button, #allTreesBtn");

    allButtons.forEach((btn) => {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline");
    });

    btn.classList.add('btn-primary');
    btn.classList.remove("btn-outline");

    const res = await fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`);

    const data = await res.json();
    console.log(data.plants);

    displayAllTrees(data.plants);

    hideLoading();

};


allTreesBtn.addEventListener('click',()=> {
    const allButtons = document.querySelectorAll("#categoriesContainer button, #allTreesBtn");

    allButtons.forEach((btn) => {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline");
    });

    allTreesBtn.classList.add('btn-primary');
    allTreesBtn.classList.remove("btn-outline");

    loadAllTrees();

});


const loadAllTrees = fetch('https://openapi.programming-hero.com/api/plants')
    .then((res) => res.json())
    .then((allTrees) => {
        displayAllTrees(allTrees.plants)
        showLoading();
    }
);



const displayAllTrees = (data) => {
    hideLoading();

    const treesContainer = document.getElementById('trees-container');

    data.forEach((treeCategory) => {
        // console.log(treeCategory);

        const cards = document.createElement('div');
        cards.className = "bg-base-100 shadow-sm border border-gray-200 rounded-md";

        cards.innerHTML = `
        <figure class="p-2">
            <img src="${treeCategory.image}" class="h-[200px] w-screen rounded-md object-cover" alt="Shoes" />
        </figure>

        <div class="space-y-3 pb-3">
            <h2 onclick="openTreeModal(${treeCategory.id})" class="card-title pl-3 text-[16px]">${treeCategory.name}</h2>
            <p class="text-left px-3 text-[12px] line-clamp-2">${treeCategory.description}</p>

            <div class="card-actions flex justify-between">
              <h3 class="badge badge-success bsdge-outline ml-3">${treeCategory.category}</h3>
              <h3 class="font-bold mr-3">$ ${treeCategory.price}</h3>
            </div>

            <div class="flex justify-center">
            <button class="btn w-[220px] bg-green-500 text-white font-bold">Add to Card</button>
            </div>
        </div>
    `;
        treesContainer.appendChild(cards);
    })
}


const loadingSpiner = document.getElementById('loadingSpiner');
function showLoading() {
    loadingSpiner.classList.remove('hidden');
    loadingSpiner.classList.add('flex');
    // treesContainer.innerHTML = '';
}


function hideLoading() {
    loadingSpiner.classList.add('hidden');
    loadingSpiner.classList.remove('flex');
}


function openTreeModal() {
    treeDetailsModal.showModal();
}


