
// 1 - buscar o evento de acordo com o id que esta na API

const arrowGetEventById = async () => {
    try {
        const queryParameter = new URLSearchParams(window.location.search);

        const response = await fetch("https://xp41-soundgarden-api.herokuapp.com/events/" + queryParameter.get("id"));

        const data = await response.json();
        //retornar o objeto para onde esta sendo chamada
        return data;
    } catch {
        (error) => console.error(error);
    }
};
// 3 - criando a função de fato
function placeInputByEvent(event) {

    // 4 - buscando cada um dos elementos do formulario
    const nameSelector = document.querySelector("#name-input");
    nameSelector.value = event.name; //5 - preenchendo o formulario

    const bannerSelector = document.querySelector("#banner-input");
    bannerSelector.value = event.poster;

    const attractionsSelector = document.querySelector("#attractions-input");
    attractionsSelector.value = event.attractions.join(", ");

    const descriptionSelector = document.querySelector("#description-input");
    descriptionSelector.value = event.description;

    const dateSelector = document.querySelector("#date-input");
    dateSelector.value = event.scheduled.substring(0, 16);

    const capacityInput = document.querySelector("#capacity-input");
    capacityInput.value = event.number_tickets;
}

// 6 - editando o evento

function placeInputOnObject() {
    const nameSelector = document.querySelector("#name-input");
    const bannerSelector = document.querySelector("#banner-input");
    const attractionsSelector = document.querySelector("#attractions-input");
    const descriptionSelector = document.querySelector("#description-input");
    const dateSelector = document.querySelector("#date-input");
    const capacityInput = document.querySelector("#capacity-input");

    return {
        "name": nameSelector.value,
        "attractions": attractionsSelector.value.split(', '),
        "poster": bannerSelector.value,
        "description": descriptionSelector.value,
        "scheduled": dateSelector.value,
        "number_tickets": capacityInput.value
    }
}

    //2 - chamando função para colocar os elementos dentos do formulario
    async function main() {
        try {
            const queryParameter = new URLSearchParams(window.location.search);
            const event = await arrowGetEventById();

            placeInputByEvent(event);

            const formSelector = document.querySelector("#form");

            formSelector.addEventListener('submit', (event) => {
                event.preventDefault();
                const body = placeInputOnObject();
                fetch(("https://xp41-soundgarden-api.herokuapp.com/events/" +
                    queryParameter.get("id")), {
                    "method": "PUT", "headers": { "content-type": "application/json" },
                    "body": JSON.stringify(body)
                }).then(response => {
                    console.log(response);
                    alert("Seu evento foi atualizado!")
                }).catch(error => { console.error(error) })

            })

        } catch {
            (error) => console.error(error);
        }
    }

main();


//alterando 