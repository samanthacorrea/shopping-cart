import helper from '../helper'

test('currency', () => {
    expect(helper.currency(32.88)).toBe("32,88");
  });


const items = {"9":{"id":9,"name":"O feminismo é para todo mundo: Políticas arrebatadoras","author":"Bell Hooks","price":"23.89","image":"http://127.0.0.1:8000/media/cart/0_Qaptthq.jpg","count":5},"13":{"id":13,"name":"O mito da beleza: Como as imagens de beleza são usadas contra as mulheres","author":"Naomi Wolf","price":"39.40","image":"http://127.0.0.1:8000/media/cart/3_LeOVSh1.jpg","count":3},"14":{"id":14,"name":"Mulheres que correm com os lobos","author":"Clarissa Pinkola Estés","price":"34.89","image":"http://127.0.0.1:8000/media/cart/4_myDQtXu.jpg","count":5}}

test('items quantity', () => {
    expect(helper.itemsQuantity(items)).toBe(13);
  });
