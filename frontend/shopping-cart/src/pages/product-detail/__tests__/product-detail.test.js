import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'
import ProductDetail from '../product-detail'
import '@testing-library/jest-dom/extend-expect'

const product = {"id":9,
                  "name":"O feminismo é para todo mundo: Políticas arrebatadoras",
                  "author":"Bell Hooks",
                  "description":"O feminismo sob a visão de uma das mais importantes feministas negras da atualidade. Eleita uma das principais intelectuais norte-americanas, pela revista Atlantic Monthly, e uma das 100 Pessoas Visionárias que Podem Mudar Sua Vida, pela revista Utne Reader, a aclamada feminista negra bell hooks nos apresenta, nesta acessível cartilha, a natureza do feminismo e seu compromisso contra sexismo, exploração sexista e qualquer forma de opressão. Com peculiar clareza e franqueza, hooks incentiva leitores a descobrir como o feminismo pode tocar e mudar, para melhor, a vida de todo mundo. Homens, mulheres, crianças, pessoas de todos os gêneros, jovens e adultos: todos podem educar e ser educados para o feminismo. Apenas assim poderemos construir uma sociedade com mais amor e justiça.O livro apresenta uma visão original sobre políticas feministas, direitos reprodutivos, beleza, luta de classes feminista, feminismo global, trabalho, raça e gênero e o fim da violência. Além disso, esclarece sobre temas como educação feminista para uma consciência crítica, masculinidade feminista, maternagem e paternagem feministas, casamento e companheirismo libertadores, política sexual feminista, lesbianidade e feminismo, amor feminista, espiritualidade feminista e o feminismo",
                  "price":"23.89",
                  "image":"http://127.0.0.1:8000/media/cart/0_Qaptthq.jpg",
                  "stock_quantity":0}


describe("Product working", () => {
  test("render Product Details", () => {
    const { getByText } = render(
      <Router>
        <ProductDetail product={product}/>
      </Router>
    )
    expect(getByText("Bell Hooks")).toHaveTextContent("Bell Hooks");
    
  });
});