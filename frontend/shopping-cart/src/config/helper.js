const currency = (value) => {
    return parseFloat(value).toLocaleString('pt-br', {minimumFractionDigits: 2})
}

const itemsQuantity = (items) => {
    let itemsTotal = 0;
    for (let item in items) {
      itemsTotal += items[item].count;
    }
    return itemsTotal;
  }


const itemsFormatter = (items) => {
    console.log("items formatter")
    console.log(items)
    let itemsList = []
    for (let index in items) {
        itemsList.push(items[index])
    }
    return itemsList;
}

const productsInOrderFormatter = (items) => {
    console.log(items)
    let itemsList = []

    for (let index in items) {
        console.log(items[index].count)
        for (let cont=0; cont<items[index].count;cont++)
            itemsList.push(parseInt(index))
    }

    console.log(itemsList)
    return itemsList;
}

const helpers = {
    currency,
    itemsQuantity,
    itemsFormatter,
    productsInOrderFormatter,
}

export default helpers