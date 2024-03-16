import { deleteOrder, getSingleOrder } from './orderData';
import { deleteOrderItem, getAllOrderItems } from './orderItemsData';
import { getSingleItem } from './itemsData';
// import { deleteRevenue, getRevenueByOrder } from './revenueData';

const getOrderDetails = async (orderFirebaseKey) => {
  console.warn(orderFirebaseKey);
  //  GET THE SINGLE ORDER
  const order = await getSingleOrder(orderFirebaseKey);

  // GET THE ORDER ITEMS RELATED TO THE ORDER
  const orderItems = await getAllOrderItems(orderFirebaseKey);
  console.warn(orderItems);

  // GET THE SINGLE ITEMS IN ORDER RETURNS AN ARRAY OF PROMISES
  const items = await orderItems.map((ob) => getSingleItem(ob.item_id));

  // PROMISE.ALL TO GET ALL ITEM OBJECTS
  const ItemsInOrder = await Promise.all(items);

  // RETURN THE ORDER OBJECT AND THE ARRAY OF ITEMS FOUND IN ORDERITEMS
  return { ...order, items: ItemsInOrder };
};

const deleteOrderAndOrderItems = async (orderFirebaseKey) => {
  // const order = await getSingleOrder(orderFirebaseKey);
  const orderItems = await getAllOrderItems(orderFirebaseKey);
  const deleteOrderItemPromises = await orderItems.map((oiObj) => deleteOrderItem(oiObj.firebaseKey));

  await Promise.all(deleteOrderItemPromises).then(() => deleteOrder(orderFirebaseKey));
  // const revenueNode = await getRevenueByOrder(orderFirebaseKey);
  // const deleteRevenueNodePromises = await revenueNode.map((revObj) => deleteRevenue(revObj.orderFirebaseKey));

  // await Promise.all(deleteOrderItemPromises).then(() => {
  //   if (order.open) {
  //     deleteOrder(orderFirebaseKey);
  //   } else {
  //     deleteRevenue(orderFirebaseKey).then(deleteOrder);
  //   }
  // });
};

export { getOrderDetails, deleteOrderAndOrderItems };
