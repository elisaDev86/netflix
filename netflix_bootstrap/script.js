// Aggiunge sezioni dinamiche con caroselli di card
function addContainersMovies() {
    // Dati delle sezioni
    const sezioni = [
        {
            titolo: 'Trending Now',
            immagini: ['./assets/imgs/trending/1.png', './assets/imgs/trending/2.png', './assets/imgs/trending/3.png', './assets/imgs/trending/4.png', './assets/imgs/trending/5.png', './assets/imgs/trending/6.png']
        },
        {
            titolo: 'Watch It Again',
            immagini: ['./assets/imgs/watchs/7.png', './assets/imgs/watchs/8.png', './assets/imgs/watchs/9.png', './assets/imgs/watchs/10.png', './assets/imgs/watchs/11.png', './assets/imgs/watchs/12.png']
        },
        {
            titolo: 'New Releases',
            immagini: ['./assets/imgs/releases/13.png', './assets/imgs/releases/14.png', './assets/imgs/releases/15.png', './assets/imgs/releases/16.png', './assets/imgs/releases/17.png', './assets/imgs/releases/18.png']
        }
    ];

    // Seleziona il contenitore principale
    const container = document.getElementById('dynamic-movie-sections');
    if (!container) {
        console.error("Container per le sezioni dinamiche non trovato.");
        return;
    }

    // Aggiungi ogni sezione al contenitore
    for (let i = 0; i < sezioni.length; i++) {
        const sezione = sezioni[i];
        const sectionHTML = createCardCarousel(sezione.titolo, sezione.immagini);
        container.appendChild(sectionHTML);
    }
}

// Crea una sezione con un carosello di card
function createCardCarousel(titolo, immagini) {
    const section = document.createElement('div');
    section.classList.add('my-4');

    // Aggiunge il titolo
    const title = document.createElement('h3');
    title.classList.add('text-white');
    title.textContent = titolo;
    section.appendChild(title);

    // Carosello
    const carouselId = 'carousel-' + titolettoToId(titolo);
    const carousel = document.createElement('div');
    carousel.setAttribute('id', carouselId);
    carousel.classList.add('carousel', 'slide');
    carousel.setAttribute('data-bs-ride', 'carousel');

    const carouselInner = document.createElement('div');
    carouselInner.classList.add('carousel-inner');

    // Dividi le immagini in gruppi di 4 e aggiungi al carosello
    const chunks = chunkArray(immagini, 4);
    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];

        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (i === 0) {
            carouselItem.classList.add('active');
        }

        const row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < chunk.length; j++) {
            const imgSrc = chunk[j];

            const col = document.createElement('div');
            col.classList.add('col-3');

            const card = document.createElement('div');
            card.classList.add('card');
            card.style.backgroundColor = '#111'; // Sfondo della card

            const img = document.createElement('img');
            img.setAttribute('src', imgSrc);
            img.classList.add('card-img-top');
            img.setAttribute('alt', 'Movie Poster');

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const cardText = document.createElement('p');
            cardText.classList.add('card-text', 'text-center');
            cardText.textContent = 'Movie Title';

            // Assembla la card
            cardBody.appendChild(cardText);
            card.appendChild(img);
            card.appendChild(cardBody);
            col.appendChild(card);
            row.appendChild(col);
        }

        carouselItem.appendChild(row);
        carouselInner.appendChild(carouselItem);
    }

    carousel.appendChild(carouselInner);

    // Controlli per il carosello
    const prevButton = document.createElement('button');
    prevButton.classList.add('carousel-control-prev');
    prevButton.setAttribute('type', 'button');
    prevButton.setAttribute('data-bs-target', '#' + carouselId);
    prevButton.setAttribute('data-bs-slide', 'prev');
    prevButton.innerHTML = `
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    `;

    const nextButton = document.createElement('button');
    nextButton.classList.add('carousel-control-next');
    nextButton.setAttribute('type', 'button');
    nextButton.setAttribute('data-bs-target', '#' + carouselId);
    nextButton.setAttribute('data-bs-slide', 'next');
    nextButton.innerHTML = `
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    `;

    carousel.appendChild(prevButton);
    carousel.appendChild(nextButton);

    section.appendChild(carousel);

    return section;
}

// Divide un array in gruppi più piccoli
function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

// Converte un titolo in un ID valido
function titolettoToId(titolo) {
    return titolo.toLowerCase().replace(/\s+/g, '-');
}

// Popola il footer con i link
function populateFooter() {
    const footerData = {
        link1: ['Audio e sottotitoli', 'Centro assistenza', 'Privacy', 'Testimonianze', 'Pianifica visione'],
        link2: ['Domande frequenti', 'Guida a Netflix', 'Carriera', 'Contatti', 'Unisciti alla nostra squadra'],
        link3: ['Streaming on demand', 'Regole di licenza', 'Cookie', 'Termini'],
        link4: ['Servizi di streaming', 'Netflix Originals', 'Acquista Netflix', 'Guida al pagamento']
    };

    for (let id in footerData) {
        const column = document.getElementById(id);
        if (!column) {
            console.error("Elemento con id '" + id + "' non trovato.");
            continue;
        }

        const titles = footerData[id];
        for (let i = 0; i < titles.length; i++) {
            const titolo = titles[i];
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = titolo;
            column.appendChild(link);
        }
    }
}

// Inizializza i contenuti della pagina
document.addEventListener('DOMContentLoaded', function () {
    addContainersMovies();
    populateFooter();
});
