import { deleteOrder, getSingleOrder } from './orderData';
import { deleteOrderItem, getAllOrderItems } from './orderItemsData';
import { getSingleItem } from './itemsData';
import { deleteRevenue, getRevenueByOrder } from './revenueData';

const getOrderDetails = async (orderFirebaseKey) => {
  //  GET THE SINGLE ORDER
  const order = await getSingleOrder(orderFirebaseKey);

  // GET THE ORDER ITEMS RELATED TO THE ORDER
  const orderItems = await getAllOrderItems(orderFirebaseKey);

  // GET THE SINGLE ITEMS IN ORDER RETURNS AN ARRAY OF PROMISES
  const items = await orderItems.map((ob) => getSingleItem(ob.item_id));

  // PROMISE.ALL TO GET ALL ITEM OBJECTS
  const itemsInOrder = await Promise.all(items);

  itemsInOrder.forEach((element, index) => {
    // eslint-disable-next-line no-param-reassign
    element.order_item_id = orderItems[index].firebaseKey;
  });

  // RETURN THE ORDER OBJECT AND THE ARRAY OF ITEMS FOUND IN ORDERITEMS
  console.warn(itemsInOrder);
  return { ...order, items: itemsInOrder };
};

const deleteOrderAndOrderItems = async (orderFirebaseKey) => {
  const revenueNode = await getRevenueByOrder(orderFirebaseKey);
  const deleteRevenueNodePromises = await revenueNode.map((revObj) => deleteRevenue(revObj.firebaseKey));
  await Promise.all(deleteRevenueNodePromises);
  const orderItems = await getAllOrderItems(orderFirebaseKey);
  const deleteOrderItemPromises = await orderItems.map((oiObj) => deleteOrderItem(oiObj.firebaseKey));
  await Promise.all(deleteOrderItemPromises);

  await deleteOrder(orderFirebaseKey);
};

export { getOrderDetails, deleteOrderAndOrderItems };
