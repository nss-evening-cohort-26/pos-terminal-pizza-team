import {
  getAllOrders, deleteOrder, getSingleOrder, getOpenOrders
} from './orderData';
import { deleteOrderItem, getAllOrderItems, getOrderItemsByItem } from './orderItemsData';
import { getSingleItem, updateItem } from './itemsData';
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

const searchOrders = async (uid, searchValue) => {
  const allOrders = await getAllOrders(uid);
  const filteredOrders = await allOrders.filter((order) => (
    order.customer_name.toLowerCase().includes(searchValue)
  || order.customer_phone.includes(searchValue)
  ));
  return filteredOrders;
};
const removeMenuItem = async (uid, itemFirebaseKey) => {
  const orderItems = await getOrderItemsByItem(itemFirebaseKey);
  const openOrders = await getOpenOrders(uid);
  // find and delete instances of item in open orders
  const openOrderItems = orderItems.filter((oi) => openOrders.some((oo) => oo.firebaseKey === oi.order_id));
  const deletedOrderItems = openOrderItems.map((oi) => deleteOrderItem(oi.firebaseKey));
  await Promise.all(deletedOrderItems);
  // update item to be removed from menu
  const removePayload = {
    removed: true,
    firebaseKey: itemFirebaseKey
  };
  await updateItem(removePayload);
};

export {
  searchOrders,
  getOrderDetails,
  deleteOrderAndOrderItems,
  removeMenuItem
};
