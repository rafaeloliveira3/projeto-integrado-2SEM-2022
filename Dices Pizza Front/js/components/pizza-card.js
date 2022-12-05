class card extends HTMLElement {
    constructor () {
        super()
        this.shadow = this.attachShadow({mode : 'open'})
        this.nome = 'Nome da Pizza'
        this.ingredientes = 'Ingredientes da Pizza'
        this.preco = 'Valor'
        this.imgurl = 'https://sp-ao.shortpixel.ai/client/q_glossy,ret_img/https://nonnabeni.com.br/wp-content/uploads/elementor/thumbs/PIZZA-1-ojygvkiy3e3jky5xzq9t3l9v9yuerfxke7nuyqdkho.png'
    }
    static get observedAttributes() {
        return['nome', 'ingredientes', 'preco', 'imgurl']
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
            <h4>Ingredientes</h4>
            <p class="pizza-ingredientes">${this.ingredientes}</p>
            <span class="pizza-price">Preço - R$ ${this.preco}</span>
        `
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
        `

        return style
    }
}

customElements.define('pizza-card', card)