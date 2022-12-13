import { clientSubmit } from "../fetchs/clientFetch.js";

const clientController = async (e) => {
    const client = {
        nome : document.getElementById('nome').value,
        email : document.getElementById('email').value,
        mensagem : document.getElementById('message').value,
        opcao_mensagem : document.getElementById('opcao-mensagem').value,
        telefone : [
            {
                ddd : document.getElementById('celular').value.split('-')[0],
                telefone : document.getElementById('celular').value.split('-')[1],
                formato : 2
            }
        ]
    }
    if (document.getElementById('telefone').value) {
        client.telefone.push({
            ddd : document.getElementById('telefone').value.split('-')[0],
            telefone : document.getElementById('telefone').value.split('-')[1],
            formato : 1
        })
    }
    clientSubmit(client)
}

export {
    clientController
}