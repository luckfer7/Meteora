//usar a palavra use, indica que estamos criando um hook customizado.

import { useContext, useEffect } from "react";
import { CarrinhoContext } from "@/context/CarrinhoContext";




export const useCarrinhoContext = () => {
    const {carrinho, setCarrinho, quantidade, setQuantidade, valorTotal, setValorTotal} = useContext(CarrinhoContext);

    function mudarQuantidade (id, quantidade) {
        return carrinho.map((itemDoCarrinho) => {
            if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade;
            return itemDoCarrinho;
        })
    }

    function adicionarProduto (novoProduto) {
        //temos que criar uma lógica na qual se o produto estiver no carrinho, devemos adicionar apenas a quantidade dele. Se ele não estiver no carrinho, devemos adcionar o produto em si.
        const temOProduto = carrinho.some((itemDoCarrinho) => {
            return itemDoCarrinho.id === novoProduto.id})
        //pra cada item do carrinho, verifico se o produto dentro do carrinho é o mesmo do novoProduto
        // apenas adicionando o return, podemos fazer com que dentro do carrinho, ao adionar o mesmo produto, aparecesse a quantidade do produto, e não o produto várias vezes.

        if (!temOProduto) {
        novoProduto.quantidade = 1
        return setCarrinho ((carrinhoAnterior) => [
            ...carrinhoAnterior,
            novoProduto
        ]) 
        //se não tiver o produto, adiciono pelo menos um e ainda vou retornar o carrinho no seu estado anterior e mais o novo produto.
        }  

        const carrinhoAtualizado = mudarQuantidade(novoProduto.id, 1)

        setCarrinho([...carrinhoAtualizado]);
             //se o produto ja estiver no carrinho, aumenta-se a quantidade dele.

    }

    function removerProduto (id) {
        const produto = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === id);
        //encontrar, dentro do meu carrinho, o produto do mesmo id que estou recebendo
        const ehOUltimo = produto.quantidade === 1; //se é 1, significa que ela é a última.
        if (ehOUltimo) {
            return setCarrinho((carrinhoAnterior) =>
            carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id));
            //filtra-se o produto que tem o id diferente do que eu recebi.
        }
        //essa função reduz o número de itens no carrinho ao clicar no icone de menos

        const carrinhoAtualizado = mudarQuantidade(id, -1)
        setCarrinho([...carrinhoAtualizado])
    }

    function removerProdutoCarrinho (id) {
        const produto = carrinho.filter((itemDoCarrinho) => itemDoCarrinho.id !== id);
        setCarrinho(produto);
    }


    useEffect(() => {
        const {totalTemp, quantidadeTemp} = carrinho.reduce(
            (acumulador, produto) => ({
                quantidadeTemp: acumulador.quantidadeTemp + produto.quantidade,
                totalTemp: acumulador.totalTemp + produto.preco * produto.quantidade,
            }),
            {
                quantidadeTemp: 0,
                totalTemp: 0,
            }
        );
        setQuantidade(quantidadeTemp);
        setValorTotal(totalTemp);
    }, [carrinho]);
    //para fazer com que somemos a quantidade de itens no carrinho, retornando um valor total, precisamos usar o método reduce()

    return {
        carrinho,
        setCarrinho,
        adicionarProduto,
        removerProduto,
        removerProdutoCarrinho,
        valorTotal,
        quantidade,
    }
}