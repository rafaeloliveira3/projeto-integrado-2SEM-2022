import base from './helpers/baseUrl.js'

const promotions = async () => {
    const url = base + 'promocoes'
    const res = await fetch(url)
    
    const promocoes = await res.json()
    return promocoes.promocao
}

const promotionSave = async () => {
    const product = document.querySelector('#formato').value
    let url = base + 'admin/promocao'
    let json

    let descont = document.querySelector('#desconto').value

    if(product == 1){
        json = {
            descricao : document.querySelector('#descricao').value,
            desconto  : null,
            formato   : 1
        }
    } else if (product == 2) {
        json = {
            descricao : document.querySelector('#descricao').value,
            desconto  : descont,
            formato   : 2
        }
    }
    await log(json)
    const res = await fetch(url, {
        method : 'POST',
        headers : {'Content-type' : 'application/json'},
        body : JSON.stringify(json)
    })

    return {status : await res.status(), res : await res.json()}
}

const promotionPizzaSave = async (e) => {
    let url = base + 'admin/promo/pizza'
    let json
    const id = e.currentTarget.id
    const idPromotion = e.currentTarget.idPromotion

    let idPizza = id.slice(0, -6)
    let idPromocao = idPromotion.slice(0, -2)

    json = {
        promocao : idPromocao,
        pizza  : idPizza
    }
    console.log(json);
    const res = await fetch(url, {
        method : 'POST',
        headers : {'Content-type' : 'application/json'},
        body : JSON.stringify(json)
    })

    alert('Pizza adicionada na promoção!!!')
    return {status : await res.status(), res : await res.json()}
}


const promotionId = async (id) => {
        const url = base + `promotion/id/${id}`
        const res = await fetch(url)
    
        const promocoes = await res.json()
        return promocoes.Promocao[0]
}

export {
    promotions,
    promotionSave,
    promotionId,
    promotionPizzaSave
}