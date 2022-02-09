export const addItemToBasket = (basket, item, totalAmount) => {
  const itemInBasket = basket.find((basketItem) => item.sku === basketItem.sku);

  if (itemInBasket && itemInBasket.quantity < item.basketLimit) {
    return {
      basket: basket.map((basketItem) =>
        basketItem.sku === item.sku
          ? { sku: item.sku, quantity: basketItem.quantity + 1 }
          : basketItem
      ),
      totalAmount: parseFloat(+totalAmount + +item.price).toFixed(2),
    };
  } else if (itemInBasket && itemInBasket.quantity === item.basketLimit) {
    return { basket, totalAmount };
  }

  return {
    basket: [...basket, { sku: item.sku, quantity: 1 }],
    totalAmount: parseFloat(+totalAmount + +item.price).toFixed(2),
  };
};

export const removeItemFromBasket = (basket, item, totalAmount) => {
  const itemInBasket = basket.find((basketItem) => item.sku === basketItem.sku);

  if (itemInBasket && basket.length > 1) {
    let newAmount = parseFloat(
      parseFloat(+totalAmount) -
        parseFloat(itemInBasket.quantity * item.unitPrice)
    ).toFixed(2);

    let basketObject = {
      totalAmount: newAmount,
      basket: basket.filter((basketItem) => basketItem.sku !== item.sku),
    };
    console.log(basketObject);

    return basketObject;
  } else if (itemInBasket && basket.length === 1) {
    return {
      totalAmount: 0.0,
      basket: basket.filter((basketItem) => basketItem.sku !== item.sku),
    };
  }
  return { basket, totalAmount };
};

export const reduceItemQuantity = (basket, item, totalAmount) => {
  const itemInBasket = basket.find((basketItem) => item.sku === basketItem.sku);

  if (itemInBasket) {
    if (itemInBasket.quantity > 1) {
      return {
        basket: basket.map((basketItem) =>
          basketItem.sku === item.sku
            ? { sku: basketItem.sku, quantity: basketItem.quantity - 1 }
            : basketItem
        ),
        totalAmount: parseFloat(+totalAmount - +item.price).toFixed(2),
      };
    } else {
      return removeItemFromBasket(basket, item, totalAmount);
    }
  }

  return { basket, totalAmount };
};

export const changeItemQuantity = (basket, item, totalAmount) => {
  let amount = totalAmount;
  let unitPrice = item.unitPrice;
  let newQuantity = item.newQuantity;
  let prevQuantity = item.prevQuantity;

  if (newQuantity > prevQuantity) {
    const price = parseFloat(
      (+newQuantity - +prevQuantity) * +unitPrice
    ).toFixed(2);
    amount = parseFloat(+amount + +price).toFixed(2);
  } else if (newQuantity < prevQuantity) {
    const price = parseFloat(
      (+prevQuantity - +newQuantity) * +unitPrice
    ).toFixed(2);
    amount = parseFloat(+amount - +price).toFixed(2);
  }

  return {
    basket: basket.map((basketItem) =>
      basketItem.sku === item.sku &&
      basketItem.newQuantity !== item.prevQuantity
        ? { sku: basketItem.sku, quantity: item.newQuantity }
        : basketItem
    ),
    totalAmount: parseFloat(amount).toFixed(2),
  };
};
