import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useCart } from './CartContext';  // Importar el hook personalizado

const Carrito = () => {
  const { cart, removeFromCart, updateQuantity, calculateTotal } = useCart();  // Usar el hook para acceder a las funciones

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.cartImage} />
      <View style={styles.cartDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>${parseFloat(item.price.replace('$', '')).toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity ===1}
            style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
            style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      {/* Total del carrito */}
      <View style={styles.totalCarritoContainer}>
        <Text style={styles.totalCarritoText}>Total: ${calculateTotal()}</Text>
      </View>

      {/* Botón de Comprar */}
      <TouchableOpacity style={styles.comprarButton}>
        <Text style={styles.comprarButtonText}>Comprar</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 10,
  },
  cartImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  cartDetails: {
    flex: 1,
    marginLeft: 10,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    color: 'red',
    fontSize: 16,
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityButton: {
    backgroundColor: '#A9D6E5',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#013A63',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 80,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  totalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  totalCarritoContainer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalCarritoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  comprarButton: {
    backgroundColor: '#013A63',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10, 
   
  },
  comprarButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Carrito;
