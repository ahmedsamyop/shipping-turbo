import app from '../index'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from 'firebase/firestore'
// init services
const db = getFirestore(app)
// collection ref
const colRefOrders = collection(db, 'orders')
class Orders {
  async displayAll() {
    try {
      let orders = []
      const response = (await getDocs(colRefOrders)).docs
      response.forEach((doc) => {
        orders.push({ ...doc.data(), id: doc.id })
      })
      return orders
    } catch (error) {
      throw new Error(error.message)
    }
  }
  async create({
    orderId,
    orderName,
    cName,
    cPhone,
    cAddress,
    sellerName,
    sellerPhone,
    orderPrice,
    daPrice,
    totalPrice,
    daEmail,
  }) {
    try {
      await addDoc(colRefOrders, {
        orderId,
        orderName,
        cName,
        cPhone: Number(cPhone),
        cAddress,
        sellerName,
        sellerPhone: Number(sellerPhone),
        orderPrice: Number(orderPrice),
        daPrice: Number(daPrice),
        totalPrice: Number(totalPrice),
        daEmail,
        status: daEmail ? 'assigned' : 'not-assigned',
        report: '',
        // createdAt: serverTimestamp(),
      })
      return `Create Succefully order by id ${orderId}`
    } catch (error) {
      throw new Error(error.message)
    }
  }
  async edit({
    id,
    orderId,
    orderName,
    cName,
    cPhone,
    cAddress,
    sellerName,
    sellerPhone,
    orderPrice,
    daPrice,
    totalPrice,
    daEmail,
  }) {
    try {
      const docRef = doc(db, 'orders', id)
      await updateDoc(docRef, {
        orderId,
        orderName,
        cName,
        cPhone: Number(cPhone),
        cAddress,
        sellerName,
        sellerPhone: Number(sellerPhone),
        orderPrice: Number(orderPrice),
        daPrice: Number(daPrice),
        totalPrice: Number(totalPrice),
        daEmail,
        status: daEmail ? 'assigned' : 'not-assigned',
        report: '',
      })
      return `update order Succefully`
    } catch (error) {
      throw new Error(error.message)
    }
  }
  async delete(id) {
    try {
      const docRef = doc(db, 'orders', id)
      await deleteDoc(docRef)
      return `Delete order Succefully`
    } catch (error) {
      throw new Error(error.message)
    }
  }
  // DA
  async editStatus({ id, status, report }) {
    try {
      const docRef = doc(db, 'orders', id)
      await updateDoc(docRef, {
        status,
        report,
      })
      return `update order Succefully`
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export { Orders, colRefOrders }
