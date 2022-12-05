class card extends HTMLElement {
    constructor () {
        super()
        this.shadow = this.attachShadow({mode:'open'})
        this.nome = 'Nome da Pizza'
        this.ingredientes = 'Ingredientes da Pizza'
        this.preco = 'Valor'
        this.imgurl = 'https://sp-ao.shortpixel.ai/client/q_glossy,ret_img/https://nonnabeni.com.br/wp-content/uploads/elementor/thumbs/PIZZA-1-ojygvkiy3e3jky5xzq9t3l9v9yuerfxke7nuyqdkho.png'
    }
    static get observedAttributes() {
        return['nome', 'ingredientes', 'preco', 'imgurl']
    }
    attributeChangedCallback(nameAttr, oldValue, newValue) {
        this[nameAttr] = newValue
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
            <span class="pizza-name">${this.nome}</span>
            <p class="pizza-ingredientes>${this.ingredientes}</p>
        `
        return card
    }
    styles () {
        const style = document.createElement('style')
        style.textContent = `
        .pizza-card {
            width: 300px;
            height: 400px;
            background-color: #D9D9D9;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
        }
        .pizza-name, pizza-ingredientes {
            color: #000;
            font-size: 1rem;
        }
        .card-image {
            height: 50%;
            width: 50%;
            background-size: cover;
            background-position: center;
        }
        .pizza-card:hover {
            color: #fff;
            background-color: #F25A71;
        }
        `
        return style
    }
}

customElements.define('pizza-card', card)