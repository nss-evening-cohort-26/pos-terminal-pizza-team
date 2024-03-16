import { getSingleOrder } from './orderData';
import { getAllOrderItems } from './orderItemsData';
import { getSingleItem } from './itemsData';

const getOrderDetails = async (orderFirebaseKey) => {
  //  GET THE SINGLE ORDER
  const order = await getSingleOrder(orderFirebaseKey);

  // GET THE ORDER ITEMS RELATED TO THE ORDER
  const orderItems = await getAllOrderItems(orderFirebaseKey);

  // GET THE SINGLE ITEMS IN ORDER RETURNS AN ARRAY OF PROMISES
  const items = await orderItems.map((ob) => getSingleItem(ob.item_id));

  // PROMISE.ALL TO GET ALL ITEM OBJECTS
  const ItemsInOrder = await Promise.all(items);

  // RETURN THE ORDER OBJECT AND THE ARRAY OF ITEMS FOUND IN ORDERITEMS
  return { ...order, items: ItemsInOrder };
};

export default getOrderDetails;
