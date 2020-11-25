const currency = (value) => {
    return parseFloat(value).toLocaleString('pt-br', {minimumFractionDigits: 2})
}

const helpers = {
    currency,
}

export default helpers