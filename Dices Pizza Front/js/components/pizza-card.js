class card extends HTMLElement {
    constructor () {
        super()
        this.shadow = this.attachShadow({mode : 'open'})
        this.nome = 'Nome da Pizza'
        this.ingredientes = 'Ingredientes da Pizza'
        this.preco = 'Valor'
        this.imgurl = 'https://sp-ao.shortpixel.ai/client/q_glossy,ret_img/https://nonnabeni.com.br/wp-content/uploads/elementor/thumbs/PIZZA-1-ojygvkiy3e3jky5xzq9t3l9v9yuerfxke7nuyqdkho.png'
        this.helper = 'Ingredientes ou Volume'
    }
    static get observedAttributes() {
        return['nome', 'ingredientes', 'preco', 'imgurl', 'helper']
    }
    attributeChangedCallback(nameAttr, oldValue, newValue) {
        this[nameAttr]  = newValue
    }
    connectedCallback () {
        this.shadow.appendChild(this.component())
        this.shadow.appendChild(this.styles())
    }
    component () {
        const card = document.createElement('div')
        card.classList.add('pizza-card')
        card.innerHTML = `
            <img src="${this.imgurl}" alt="imagem da pizza" class="card-image">
            <h2 class="pizza-name">${this.nome}</h2>
            <h4>${this.helper}</h4>
            <p class="pizza-ingredientes">${this.ingredientes}</p>
            <span class="pizza-price">Preço - R$ ${this.preco}</span>
        `
        if (this.helper == 'Ingredientes') {
            card.innerHTML += `<input type="checkbox" name="favorito" id="favoritar">
                <label for="favoritar" class="favorito"><img src="./img/svg/star-full-icon.svg" alt="Estrela"><span>Favoritar</span></label>`
        }
        return card
    }
    styles () {
        const style = document.createElement('style')
        style.textContent = `
        .pizza-card {
            padding: 10px 20px; 
            background-color: #D9D9D9;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            transition: all .3s;
            border-radius: 25px;
            gap: 3px;
        }
        .pizza-name {
            font-size: 1.5rem;
            font-weight: 600;
        }
        .pizza-card h4 {
            font-size: 1.15rem;
            margin: 0;
            font-weight: 500;
        }
        .pizza-ingredientes {
            margin-top: 2px;
        }
        .card-image {
            height: 220px;
            background-size: cover;
            background-position: center;
        }
        .pizza-card:hover {
            color: #fff;
            background-color: #F25A71;
        }
        .pizza-price {
            font-size: 1.09rem;
        }
        #favoritar {
            display: none;
        }
        #favoritar:checked + .favorito img{
            animation-name: jump;
            animation-duration: .3s;
            filter: invert(84%) sepia(85%) saturate(4456%) hue-rotate(357deg) brightness(107%) contrast(106%);
        }
        .favorito img {
            height: 25px;
            transition: all .3s;
        }
        .favorito {
            display: flex;
            flex-direction: row;
            gap: 10px;
            align-items: center;
            justify-content: center;
        }
        @keyframes jump {
            0% {
                height: 25px;
            }
            50% {
                height: 35px
            }
            100% {
                height: 25px;
            }
        }
        @media(max-width:768px) {
            .pizza-name {
                font-size: 1.2rem;
            }
            .pizza-card h4 {
                font-size: 1.1rem;
            }
            .card-image {
                height: 180px;
            }
            .pizza-price {
                font-size: 1rem;
            }
        }
        `

        return style
    }
}

customElements.define('pizza-card', card)