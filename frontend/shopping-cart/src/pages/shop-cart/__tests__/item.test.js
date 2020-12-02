import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'
import Item from '../item'
import '@testing-library/jest-dom/extend-expect'

const item = {"id":9,
                 "name":"O feminismo é para todo mundo: Políticas arrebatadoras",
                 "author":"Bell Hooks",
                 "price":"23.89",
                 "image":"http://127.0.0.1:8000/media/cart/0_Qaptthq.jpg",
                 "count":5}


describe("Product working", () => {
  test("render Product Details", () => {
    const { getByText } = render(
      <Router>
        <Item item={item}/>
      </Router>
    )
    expect(getByText("Bell Hooks")).toHaveTextContent("Bell Hooks");
    
  });
});