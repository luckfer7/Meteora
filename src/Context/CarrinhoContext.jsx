
import { createContext, useState } from "react";

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho"

export const CarrinhoProvider = ({children}) => {

    const [carrinho, setCarrinho] = useState([]);
    const [quantidade, setQuantidade] = useState(0)
    const [valorTotal, setValorTotal] = useState(0)

    return (
        <CarrinhoContext.Provider value={{ carrinho, setCarrinho, quantidade, setQuantidade, valorTotal, setValorTotal }}>
            {children}
        </CarrinhoContext.Provider>
    )
}

//esse provider diz que eu vou compartilhar o contexto, criado com o createcontext, pra todo componente que eu receber como children. Não é possível compartilhar sem o provider.

// o createcontext() é uma função do react, criar contexto e retorna um objeto com componentes. Um desses é o carrinho provider

//essa forma evita o problema de dropdrilling 

// o value é responsável por compartilhar os estados da aplicação dos componentes que são envolvidos por eles.