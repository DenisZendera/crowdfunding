const openMenu = document.querySelector('.hum-menu');
const menuView = document.querySelector('.menu');
const backView = document.querySelector('.back-project');
const modalContainer = document.querySelector('.back-content');
const bookMarkBtn = document.querySelector('.bookmark');
const bookMarkText = document.getElementById('bookMark');
const bookMarkIcon = document.getElementById('logo');
const backProjectBtn = document.querySelector('.back-btn');
const rewardBtns = document.querySelectorAll('.footer-btn.reward, #reward-2');
const statsCard = document.querySelector('.stats');
const amountBacked = document.getElementById('current-total');
const backers = document.getElementById('total-backers');
const bamboLeft = document.getElementById('card1-left');
const blackLeft = document.getElementById('card2-left');
const loader = document.querySelector('.load-bar');

const appState = {
  isMenuOpen: false,
  isBookMarked: false,
  isBackProjectOpen: false,
  selectedPledgeId: null, 
  isCompleted: false, 
  totalBacked : 89914,
  totalBackers : 5007,
  totalBambo : 101,
  totalBlack : 64
};


function renderStats(){
    const formatter = new Intl.NumberFormat('en-US');
    return `
        <div class="card">
            <p  class="card-title" id="current-total">$${formatter.format(Math.floor(appState.totalBacked))}</p>
            <p class="card-footer" class="footer-total">of $100,000 backed</p>
          </div>

          <div class="card">
            <p class="card-title" id="total-backers">${formatter.format(appState?.totalBackers)}</p>
            <p class="card-footer" id="footer-backers">total backers</p>
          </div>

          <div class="card">
            <p class="card-title" id="days">56</p>
            <p class="card-footer" class="footer-days">days left</p>
          </div>
    `
}

function loadProgress(){
    if(Math.floor((appState.totalBacked/100000)*100) < 100){
        const percent = Math.floor((appState.totalBacked/100000)*100);
        loader.style.setProperty('--loading-width', `${percent}%`);
    }else{
        loader.style.setProperty('--loading-width', `100%`);
    }

    
}

function renderModalSelectionHTML() {
  return `
    <div class="back-header">
      <p class="back-title">Back this project</p>
      <button class="cancel" id="close-modal-btn">
        <img src="images/icon-close-modal.svg" alt="cancel">
      </button>
    </div>

    <p class="back-description">
      Want to support us in bringing Mastercraft Bamboo Monitor Riser out in the world?
    </p>

    <!-- Card 1: No Reward -->
    <div class="sub-card1 back-card ${appState.selectedPledgeId === 'radio-1' ? 'open' : ''}" data-id="radio-1" data-min="0">
      <div class="sub-back-header">
        <div class="header-content">
          <input type="radio" class="radio-btn" id="radio-1" name="radio" ${appState.selectedPledgeId === 'radio-1' ? 'checked' : ''}>
          <div class="back-h-text">
            <label for="radio-1" class="sub-title clickable-title">Pledge with no reward</label>
          </div>
        </div>
      </div>

      <p class="sub-back-description">
        Choose to support us without a reward if you simply believe in our project. As a backer, you will be signed up to receive product updates via email.
      </p>

      <div class="sub-back-footer">
        <p class="footer-text">Enter your Pledge</p>
        <div class="back-options">
          <div class="box">
            <p class="dollar">$</p>
            <input type="number" min="1" value="1" class="inputbox">
          </div>
          <button class="footer-btn continue">Continue</button>
        </div>
      </div>
      <p class="error-msg">Please enter an amount above $0</p>
    </div>

    <!-- Card 2: Bamboo Stand -->
    <div class="sub-card1 back-card ${appState.totalBambo < 1 ? 'unavailable' : ''}  ${appState.selectedPledgeId === 'radio-2' ? 'open' : ''}" data-id="radio-2" data-min="25">
      <div class="sub-back-header">
        <div class="header-content">
          <input type="radio" class="radio-btn" id="radio-2" name="radio" ${appState.selectedPledgeId === 'radio-2' ? 'checked' : ''}>
          <div class="back-h-text">
            <label for="radio-2" class="sub-title clickable-title">Bamboo Stand</label>
            <p class="pledge">Pledge $25 or more</p>
          </div>
        </div>
        <div class="footer-number sub-back-base">
          <p class="left">${appState.totalBambo < 1 ? 0 : appState.totalBambo}</p>
          <span class="small">left</span>
        </div>
      </div>

      <p class="sub-back-description">
        You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you'll be added to a special Backer member list.
      </p>

      <div class="sub-back-footer">
        <p class="footer-text">Enter your Pledge</p>
        <div class="back-options">
          <div class="box">
            <p class="dollar">$</p>
            <input type="number" min="25" value="25" class="inputbox">
          </div>
          <button class="footer-btn continue">Continue</button>
        </div>
      </div>
      <p class="error-msg">Please enter an amount of $25 or more</p>
    </div>

    <div class="sub-card1 back-card ${appState.totalBlack < 1 ? 'unavailable' : ''} ${appState.selectedPledgeId === 'radio-3' ? 'open' : ''}" data-id="radio-3" data-min="75">
      <div class="sub-back-header">
        <div class="header-content">
          <input type="radio" class="radio-btn" id="radio-3" name="radio" ${appState.selectedPledgeId === 'radio-3' ? 'checked' : ''}>
          <div class="back-h-text">
            <label for="radio-3" class="sub-title clickable-title">Black Edition Stand</label>
            <p class="pledge">Pledge $75 or more</p>
          </div>
        </div>
        <div class="footer-number sub-back-base">
          <p class="left">${appState.totalBlack < 1 ? 0 : appState.totalBlack}</p>
          <span class="small">left</span>
        </div>
      </div>

      <p class="sub-back-description">
        You get a Black Special Edition computer stand and a personal thank you. You'll be added to our Backer member list. Shipping is included.
      </p>

      <div class="sub-back-footer">
        <p class="footer-text">Enter your Pledge</p>
        <div class="back-options">
          <div class="box">
            <p class="dollar">$</p>
            <input type="number" min="75" value="75" class="inputbox">
          </div>
          <button class="footer-btn continue">Continue</button>
        </div>
      </div>
      <p class="error-msg">Please enter an amount of $75 or more</p>
    </div>

    <!-- Card 4: Out of Stock -->
    <div class="sub-card1 unavailable back-card">
      <div class="sub-back-header">
        <div class="header-content">
          <input type="radio" class="radio-btn" disabled>
          <div class="back-h-text">
            <p class="sub-title">Mahogany Special Edition</p>
            <p class="pledge">Pledge $200 or more</p>
          </div>
        </div>
        <div class="footer-number sub-back-base">
          <p class="left">0</p>
          <span class="small">left</span>
        </div>
      </div>

      <p class="sub-back-description">
        You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You'll be added to our Backer member list. Shipping is included.
      </p>
    </div>
  `;
}

function renderSuccessHTML() {
  return `
    <div class="completed-wrapper">
      <div class="check">
        <img src="images/icon-check.svg" alt="check icon" class="check-img" draggable="false">
      </div>
      <p class="gratitude">Thanks for your support!</p>
      <p class="gratitude-text">
        Your pledge brings us one step closer to sharing Mastercraft Bamboo Monitor Riser worldwide. You will get an email once our campaign is completed.
      </p>
      <button class="footer-btn got-it" id="got-it-btn">Got it!</button>
    </div>
  `;
}


function renderModal() {
  if (appState.isCompleted) {
    modalContainer.classList.add('completed');
    modalContainer.innerHTML = renderSuccessHTML();
    bindSuccessEvents();
  } else {
    modalContainer.classList.remove('completed');
    modalContainer.innerHTML = renderModalSelectionHTML();
    bindModalSelectionEvents();
  }
}

function bindModalSelectionEvents() {
  const closeBtn = document.getElementById('close-modal-btn');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  const cards = modalContainer.querySelectorAll('.back-card:not(.unavailable)');

  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
      const targetCard = card.querySelector('.left');
        

      const radio = card.querySelector('.radio-btn');
      selectCard(card.dataset.id);
    });

    const radio = card.querySelector('.radio-btn');
    if (radio) {
      radio.addEventListener('change', () => selectCard(card.dataset.id));
    }

    const continueBtn = card.querySelector('.continue');
    const input = card.querySelector('.inputbox');

    if (continueBtn && input) {
      continueBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const minPledge = Number(card.dataset.min);
        const pledgeValue = Number(input.value);

       if (pledgeValue >= minPledge && pledgeValue > 0) {
        card.classList.remove('error');
        appState.totalBacked += pledgeValue;
        appState.totalBackers += 1;

        if (minPledge === 25) {
            checkLeft(25);
            if (bamboLeft) bamboLeft.textContent = appState.totalBambo;
        } else if (minPledge === 75) {
            checkLeft(75);
            if (blackLeft) blackLeft.textContent = appState.totalBlack;
        }

        loadProgress();
        statsCard.innerHTML = renderStats();

        appState.isCompleted = true;
        renderModal();
        } else {
          card.classList.add('error');
        }
      });

      input.addEventListener('input', () => card.classList.remove('error'));
    }
  });
}

function checkLeft(limit){
    if(limit === 25){
        appState.totalBambo -= 1;
    }else{
        appState.totalBlack -= 1;
    } 
}

function bindSuccessEvents() {
  const gotItBtn = document.getElementById('got-it-btn');
  if (gotItBtn) {
    gotItBtn.addEventListener('click', () => {
      appState.isCompleted = false;
      appState.selectedPledgeId = null;
      closeModal();
    });
  }
}

function selectCard(cardId) {
  appState.selectedPledgeId = cardId;

  const cards = modalContainer.querySelectorAll('.back-card');
  cards.forEach((card) => {
    const radio = card.querySelector('.radio-btn');
    if (card.dataset.id === cardId) {
      card.classList.add('open');
      if (radio) radio.checked = true;
    } else {
      card.classList.remove('open');
      if (radio) radio.checked = false;
    }
  });
}

function openModal(defaultPledgeId = null) {
  appState.isBackProjectOpen = true;
  appState.selectedPledgeId = defaultPledgeId;
  appState.isCompleted = false;
  renderModal();
  document.body.style.overflow = 'hidden';
  backView.classList.add('backOpen');
}

function closeModal() {
  appState.isBackProjectOpen = false;
  document.body.style.overflow = 'auto';
  backView.classList.remove('backOpen');
}

window.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && appState.isBackProjectOpen){
        closeModal();
    }
})

openMenu.addEventListener('click', () => {
  appState.isMenuOpen = !appState.isMenuOpen;
  openMenu.src = appState.isMenuOpen ? 'images/icon-close-menu.svg' : 'images/icon-hamburger.svg';
  document.body.style.overflow = appState.isMenuOpen ? 'hidden' : 'auto';
  menuView.classList.toggle('open', appState.isMenuOpen);
});

bookMarkBtn.addEventListener('click', () => {
  appState.isBookMarked = !appState.isBookMarked;
  bookMarkBtn.classList.toggle('bookmarked', appState.isBookMarked);
  bookMarkText.innerText = appState.isBookMarked ? 'Bookmarked' : 'Bookmark';
});



backProjectBtn.addEventListener('click', () => openModal());

rewardBtns.forEach((btn, index) => {
  btn.addEventListener('click', (e) => {
    const targetId = index === 0 ? 'radio-2' : 'radio-3';
    openModal(targetId);
  });
});