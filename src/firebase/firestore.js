import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import {app} from './firebaseConfig'; // Asegúrate de importar 'firebaseApp' desde tu archivo de configuración de Firebase

const firestore = getFirestore(app);

// Funciones del carrito
export async function addToCart(userId, productId, quantity, size, price) {
  const userDocRef = doc(firestore, "users", userId);

  const userDocSnap = await getDoc(userDocRef);

  try {
    if (!userDocSnap.exists() || !userDocSnap.data().cart) {
      await setDoc(userDocRef, { cart: [] }, { merge: true });
    }
    const cartItem = {
      productId,
      quantity,
      size,
      price,
    };
    console.log(cartItem)
    await updateDoc(userDocRef, {
      cart: arrayUnion(cartItem),
    });
  } catch (error) {
    console.log('Adding to cart error: ', error)
  }
}

export async function clearFirestoreCart(userId) {
  const userDocRef = doc(firestore, 'users', userId);
  await updateDoc(userDocRef, { cart: [] });
}


export async function removeFromCart(userId, productId) {
  const userDocRef = doc(firestore, 'users', userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userCart = userDocSnap.data().cart;
    const itemToRemove = userCart.find(item => item.productId === productId);

    if (itemToRemove) {
      await updateDoc(userDocRef, { cart: arrayRemove(itemToRemove) });
    }
  }
}


export async function getCart(userId) {
  const userDocRef = doc(firestore, 'users', userId);
  const userDocSnap = await getDoc(userDocRef);
  console.log('funcion getCart')
  return userDocSnap.data().cart || [];
}

// Funciones de órdenes
export async function createOrder(userId, email, address, cartItems, totalPrice) {
  const userDocRef = doc(firestore, 'users', userId);
  const userOrdersCollectionRef = collection(userDocRef, 'orders');
  const orderData = {
    email,
    address,
    cartItems,
    totalPrice,
  };
  const newOrder = {
    ...orderData,
    createdAt: new Date(),
  };

  const newOrderDocRef = doc(userOrdersCollectionRef);

  await setDoc(newOrderDocRef, newOrder);

  return newOrderDocRef.id;
}

// Funciones de historial de compras
export async function getOrderHistory(userId) {
  const userDocRef = doc(firestore, 'users', userId);
  const ordersCollectionRef = collection(userDocRef, 'orders');
  const querySnapshot = await getDocs(ordersCollectionRef);
  const orders = [];

  querySnapshot.forEach((doc) => {
    orders.push({ id: doc.id, ...doc.data() });
  });

  console.log('funcion getOrderHistory');
  return orders;
}


// Funciones para el catalogo
export async function getMostViewedProducts() {
  const productsRef = collection(firestore, 'products');
  const mostViewedQuery = query(productsRef, where('mostViewed', '==', true));

  try {
    console.log('funcion MostViewProducts')
    const querySnapshot = await getDocs(mostViewedQuery);
    const mostViewedProducts = [];
    querySnapshot.forEach((doc) => {
      mostViewedProducts.push(doc.data());
    });
    return mostViewedProducts;
  } catch (error) {
    console.error('Error al obtener los productos más vistos:', error);
    return [];
  }
}

export async function getCategories() {
  const categoriesRef = collection(firestore, 'categories');
  console.log('funcion getCategories')
  try {
    const querySnapshot = await getDocs(categoriesRef);
    const categories = [];
    querySnapshot.forEach((doc) => {
      categories.push(doc.data());
    });
    return categories;
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    return [];
  }
}

export async function getProductById(productId) {
  console.log(productId)
  try {
    const productsRef = collection(firestore, 'products');
    const productQuery = query(productsRef, where('id', '==', productId));
    const querySnapshot = await getDocs(productQuery);

    if (!querySnapshot.empty) {
      const productDoc = querySnapshot.docs[0];
      return { ...productDoc.data() };
    } else {
      console.log('No se encontró el producto con el ID:', productId);
      return null;
    }
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    return null;
  }
}

export async function getProductsByCategory(categoryId) {
  console.log('funcion getProductByCategory')
  const productsRef = collection(firestore, 'products');
  const q = query(productsRef, where('category', '==', categoryId));

  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => {
    return { ...doc.data() };
  });

  return products;
}

export async function getProductsBySubcategory(subcategoryId) {
  console.log('funcion getProductBySubcategory')
  const productsRef = collection(firestore, 'products');
  const q = query(productsRef, where('subcategory', '==', subcategoryId));

  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => {
    return { ...doc.data() };
  });

  return products;
}


