let resquestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  
  window.onload = async () => {
      const data = await fetch('https://xp41-soundgarden-api.herokuapp.com/events', resquestOptions)
          .then((res) => res.json())
          .catch(() => {
              alert('Ouve um erro na busca deste evento')
          });
      createElementsFromEvents(data)
  }
  
  
  const eventContainer = document.querySelector(".full").children[1];
  
  const createElementsFromEvents = async (data) => {
      
      data.forEach( async (event) => {
          
          const articleElement = document.createElement('article');
          articleElement.classList.add('evento', 'card', 'p-5', 'm-3');
  
          const h2Element = document.createElement('h2');
          const date = event.scheduled.substring(0,10);
          h2Element.innerText = event.name + ' - ' + date.replaceAll('-','/');
  
          const h4Element = document.createElement('h4');
          h4Element.innerText = event.attractions.join(', ');
  
          const pElement = document.createElement('p');
          pElement.innerText = event.description;
  
          const aElement = document.createElement('a');
          aElement.innerText = "reserver ingresso";
          aElement.classList.add('btn', 'btn-primary');
          
  
          // localStorage.setItem(nameData);
  
          aElement.addEventListener("click", () => {
              const aElementId = JSON.stringify(event._id);
              localStorage.setItem('DATA_ID',aElementId);
              const nameData = JSON.stringify(event.name);
              localStorage.setItem('DATA',nameData);
              return showModal();
          })
  
          articleElement.append(h2Element, h4Element, pElement, aElement);
  
          eventContainer.appendChild(articleElement);
          
  
      });
  }
  
  var modalWrap = null;
  
  const showModal = async (title, id, callback) => {
    
    if (modalWrap !== null) {
      modalWrap.remove();
    }
  
    const idData = localStorage.getItem('DATA_ID');
    id = idData;
  
    const titleData = localStorage.getItem('DATA');
    const del = /"/g;
    title = titleData.replace(del,'');
  
    modalWrap = document.createElement('div');
    modalWrap.innerHTML = `
    
    <div class="modal fade" id="modalSubscriptionForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <form class="modal-content">
          <div class="modal-header text-center">
            <h4 class="modal-title w-100 font-weight-bold">${title}</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" data-bs-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body mx-3">
            <div class="md-form mb-5">
              <i class="fas fa-user prefix grey-text"></i>
              <input name="name" type="text" id="form3" class="form-control validate">
              <label data-error="wrong" data-success="right" for="form3">nome</label>
            </div>
            <div class="md-form mb-4">
              <i class="fas fa-envelope prefix grey-text"></i>
              <input name="email" type="email" id="form2" class="form-control validate">
              <label data-error="wrong" data-success="right" for="form2">email</label>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-center">
            <button class="btn btn-indigo">reservar ingresso <i class="fas fa-paper-plane-o ml-1"></i></button>
          </div>
        </form>
      </div>
    </div>
    <div class="text-center">
      <a href="" class="btn btn-default btn-rounded mb-4" data-toggle="modal" data-target="#modalSubscriptionForm">Launch
        Modal Subscription Form</a>
    </div>
      
    `;
  
    modalWrap.querySelector(".btn-indigo").onclick = callback;
  
    document.body.append(modalWrap);
  
    var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    modal.show();
  
    const modalReserva = document.querySelector('.modal-content');
  
    modalReserva.addEventListener('submit', (enter) => {
        
      enter.preventDefault();
  
        const modalObj = new FormData(modalReserva);
        // const nameCommers = '"' + modalObj.get('name') + '"';
  
        const idNoQuotation = id.replaceAll('"','');
        console.log(idNoQuotation)
  
        const bodyModal = {
            "owner_name": modalObj.get('name'),
            "owner_email": modalObj.get('email'),
            "number_tickets": '1',
            "event_id": idNoQuotation
        }
  
        console.log(bodyModal)
  
        fetch("https://xp41-soundgarden-api.herokuapp.com/bookings", {
            method: 'POST',
            headers: {
                "method": "POST",
                "headers": { "Content-Type": "application/JSON" },
                "body": JSON.stringify(bodyModal)
            },
            body: JSON.stringify(bodyModal)
        })
        .then(response => response.text())
        .then( result => console.log(result))
        .catch( error => console.error(error)
        );
    })
  
  }