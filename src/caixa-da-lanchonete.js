class CaixaDaLanchonete {
    
        
    calcularValorDaCompra(metodoDePagamento, itens) {   
        const cardapio = [
            {nome:'cafe', valor: 3.0}, 
            {nome:'chantily', valor: 1.5}, 
            {nome:'suco', valor: 6.2},
            {nome:'sanduiche', valor: 6.5},
            {nome:'queijo', valor: 2.0},
            {nome:'salgado', valor: 7.25},
            {nome:'combo1', valor: 9.5},
            {nome:'combo2', valor: 7.5},
          ]
        
         
        const cardapioMapeado = cardapio.map(item => item.nome);
        
        if(itens.length === 0){
            return "Não há itens no carrinho de compra!"
        }

        if(metodoDePagamento !== 'dinheiro' && metodoDePagamento !== 'credito' && metodoDePagamento !== 'debito'){
            return "Forma de pagamento inválida!"
        }
    
    
        // [{itemPedido: "cafe", quantidade 1},{}]
        const pedidos = itens.map(item => {
            const [itemPedido, quantidade] = item.split(",");
            return { itemPedido: itemPedido, quantidade: parseInt(quantidade)};
        });

        const pedidoMapeado = pedidos.map(item => item.itemPedido);

        let valorTotal = 0;

    
        for(let i = 0; i < pedidos.length; i++ ) {
            let item = pedidos[i]
        
            let itemNoCardapio = cardapio.filter(produto => produto.nome === item.itemPedido);
            let valor;
        
            if(itemNoCardapio.length > 0) {
                valor = itemNoCardapio[0].valor
            }
            
            if(!cardapioMapeado.includes(item.itemPedido)){
                return "Item inválido!"
            }else if(item.itemPedido === 'chantily' && !pedidoMapeado.includes('cafe')){
                return "Item extra não pode ser pedido sem o principal"
            }else if(item.itemPedido === 'queijo' && !pedidoMapeado.includes('sanduiche')){
                return "Item extra não pode ser pedido sem o principal"
            }
            
            let valorParcial = valor * item.quantidade

            valorTotal = valorTotal + valorParcial 

            
        }

        if(valorTotal === 0){
            return "Quantidade inválida!"
        }
        
        if(metodoDePagamento === 'credito'){
            valorTotal = valorTotal + ((valorTotal /100) * 3)
        }else if(metodoDePagamento === 'dinheiro'){
            valorTotal = valorTotal - ((valorTotal /100) * 5)
        }

        console.log(valorTotal)

        let valorTotalFormatado = valorTotal.toFixed(2)
        console.log(valorTotalFormatado)

        let retorno = "R$ " + valorTotalFormatado

        

        
        return retorno.replace(".", ",");
    }

}

export { CaixaDaLanchonete };
 