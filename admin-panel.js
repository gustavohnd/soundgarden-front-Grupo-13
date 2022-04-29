const tableSelector = document.querySelector(".table").children[1];

function createElementsFromEvents(data){
    
    data.forEach((event, index) => {
        const trElement = document.createElement('tr');
        const id = event._id;

        const thElement = document.createElement('th');
        thElement.setAttribute('scope', 'row');
        thElement.innerText = index + 1;

        const firstTdElement = document.createElement('td');
        const date = event.scheduled.substring(0,10);
        const hour = event.scheduled.substring(11,16);
        firstTdElement.innerText = date.replaceAll('-','/') + " " + hour;

        const secondTdElement = document.createElement('td');
        secondTdElement.innerText = event.name;
        
        const thirdTdElement = document.createElement('td');
        thirdTdElement.innerText = event.attractions.join(', ');

        const fourthTdElement = document.createElement('td');

        const firstAnchor = document.createElement('a');
        firstAnchor.innerText = "ver reservas";
        firstAnchor.classList.add('btn', 'btn-dark');
        firstAnchor.addEventListener("click", async () => {
            const response = await fetch(`https://xp41-soundgarden-api.herokuapp.com/bookings/event/${id}`)
            const dataRequisition = await response.json();

            const firstAnchorId = JSON.stringify(event._id);
            localStorage.setItem('DATA_ID', firstAnchorId);
            const nameData = JSON.stringify(event.name);
            localStorage.setItem('DATA',nameData);
            return showModal(dataRequisition);

        });

        const secondAnchor = document.createElement('a');
        secondAnchor.innerText = "editar";
        secondAnchor.classList.add('btn', 'btn-secondary');
        secondAnchor.href = 'editar-evento.html?id=' + id; 

        const thirdAnchor = document.createElement('a');
        thirdAnchor.innerText = "excluir";
        thirdAnchor.classList.add('btn', 'btn-danger');
        thirdAnchor.href = 'excluir-evento.html?id=' + id;

        trElement.append(thElement, firstTdElement, secondTdElement, thirdTdElement, fourthTdElement);

        fourthTdElement.append(firstAnchor, secondAnchor, thirdAnchor);

        tableSelector.appendChild(trElement);
        
    })
}

let resquestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch('https://xp41-soundgarden-api.herokuapp.com/events', resquestOptions)
    .then(response => response.json())
    .then(data => createElementsFromEvents(data))
    .catch(error => console.log(error)
);

let modalWrap = null;


const showModal = async (dataRequisition) => {

    const titleData = localStorage.getItem('DATA');
    const del = /"/g;
    const title = titleData.replace(del,'');
  
    if (modalWrap !== null) {
        modalWrap.remove();
    }



    modalWrap = document.createElement('div');
    modalWrap.innerHTML = `
    
    <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <form class="modal-content">
                <div class="modal-header text-center">
                    <h4 class="modal-title w-100 font-weight-bold">${title}</h4>
                    <button type="button" id="close" data-dismiss="modal" aria-label="Close" data-bs-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <table id="response-table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">email</th>
                            <th scope="col">Reserva(s)</th>
                        </tr>
                    </thead>
                    <tbody>
                            
                    </tbody>
                </table>
            </form>
        </div>
    </div>
      
    `;

    document.body.append(modalWrap);

    let modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    modal.show();

    const tableSelectorResponse = document.querySelector("#response-table").children[1];

    dataRequisition.forEach((event, index) => {
        
        const trElement = document.createElement('tr');

        const thElement = document.createElement('th');
        thElement.setAttribute('scope', 'row');
        thElement.innerText = index + 1;

        const firstTdElement = document.createElement('td');
        firstTdElement.innerText = event.owner_name;

        const secondTdElement = document.createElement('td');
        secondTdElement.innerText = event.owner_email;
        
        const thirdTdElement = document.createElement('td');
        thirdTdElement.innerText = '1';

        trElement.append(thElement, firstTdElement, secondTdElement, thirdTdElement);
        tableSelectorResponse.appendChild(trElement);

    })

}
    


// //chamar meus elementos da API
 

// const arrowGetEvents =  async () => { //async foi add por conta do await abaixo
//     try{
//         const response = await fetch ('https://xp41-soundgarden-api.herokuapp.com/events') //promesse - usa await para fazer a requisição primeiro e depois o console.log
//         // console.log(response);
//             //transformar a response em json
//         const data =  await response.json();
//         return data; //alimenta a const abaixo "eventArray"
//         // console.log(data);
//     } catch (error){
//         console.error(error)
//     }

// }
// // arrowGetEvents ();

// //renderizar os elementos

// const renderElements = (eventsArray) => {
//     eventsArray.forEach( (event, index) => {

//         const tableBodySelector = document.querySelector('#table-body')

//         const trElement = document.createElement('tr');

//         const thElement = document.createElement('th');
//         thElement.innerText = index + 1;

//         const firstTdElement = document.createElement('td');
//         const date = event.scheduled.substring(0, 10).replaceAll('-', '/');
//         const time = event.scheduled.substring(11, 16);
//         firstTdElement.innerText = date + " " + time;

//         const secondTdElement = document.createElement('td');
//         secondTdElement.innerText = event.name;

//         const thirdTdElement = document.createElement('td');
//         thirdTdElement.innerText = event.attractions.join(', ');

//         const forthTdElement = document.createElement('td');

//         const firstAnchorTag = document.createElement('a');
//         firstAnchorTag.innerText = "Ver Reservas";
//         firstAnchorTag.classList.add('btn');
//         firstAnchorTag.classList.add('btn-dark');


//         const secondAnchorTag = document.createElement('a');
//         secondAnchorTag.innerText = "Editar";
//         secondAnchorTag.classList.add('btn');
//         secondAnchorTag.classList.add('btn-secondary');
//         secondAnchorTag.setAttribute('href', ('editar-evento.html?id=' + event._id));


//         const thirdAnchorTag = document.createElement('a');
//         thirdAnchorTag.innerText = "Excluir";
//         thirdAnchorTag.classList.add('btn');
//         thirdAnchorTag.classList.add('btn-danger');
//         thirdAnchorTag.setAttribute('href', ('excluir-evento.html?id=' + event._id));

//         forthTdElement.append(firstAnchorTag, secondAnchorTag, thirdAnchorTag);

//         trElement.append(thElement, firstTdElement, secondTdElement, thirdTdElement, forthTdElement);

//         tableBodySelector.appendChild(trElement);

//     } )
// }

// async function main() {
//     try{
//         const eventsArray = await arrowGetEvents();
//         console.log(eventsArray);
//         renderElements(eventsArray);
//     } catch (error) {
//         console.error(error)
//     }
// }

// main()
