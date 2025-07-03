import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function ShopScreen() {
  const [quantity, setQuantity] = useState('1');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>



      {/* 메인 상품 */}
      <View style={styles.mainProduct}>
        {/* 왼쪽: 이미지 */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' }}
          style={styles.productImage}
        />
        {/* 오른쪽: 정보 및 버튼 */}
        <View style={styles.productInfoColumn}>
          <Text style={styles.productTitle}>株式会社純電機製作所{ '\n' }ナチュラルシャンプー</Text>
          <View style={styles.underline} />

          <Text style={styles.price}>2,500円</Text>
          <View style={styles.productPriceColumn}>
          <View style={styles.pickerContainerRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
          <View style={{
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  width: 80,
  height: 32,
  overflow: 'hidden',
  justifyContent: 'center',
}}>
  <Picker
    selectedValue={quantity}
    onValueChange={(itemValue) => setQuantity(itemValue)}
    style={{
      height: 32,
      fontSize: 14,
      marginTop: -4,
    }}
    dropdownIconColor="#333"
    mode="dropdown"
  >
    <Picker.Item label="1個" value="1" />
    <Picker.Item label="2個" value="2" />
  </Picker>
</View>
</View>

          </View>
    
            <TouchableOpacity style={styles.buyButtonRow}>
              <Text style={styles.buyTextRow}>購入</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cartButtonRow}>
              <Text style={styles.cartTextRow}>カート</Text>
            </TouchableOpacity>
          </View>
          </View>
     
      </View>

      {/* 관련상품 */}
      <Text style={styles.relatedTitle}>関連商品はいかがですか？</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.relatedScroll} contentContainerStyle={styles.relatedProducts}>
        <ProductCard name="暁（アカツキ）2本セット" price="2,500円" imageUri="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" />
        <ProductCard name="暁（アカツキ）歯ブラシセット" price="500円" imageUri="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80" />
        <ProductCard name="暁（アカツキ）タオル" price="1,500円" imageUri="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" />
      </ScrollView>

      <Text style={styles.bottomText}>
        おすすめが気に召しませんでしたか？{ '\n' }ご相談対応も可能です。ぜひお問い合わせください。
      </Text>
    </ScrollView>
  );
}

function ProductCard({ name, price, imageUri }: { name: string; price: string; imageUri: string }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUri }} style={styles.cardImage} />
      <Text style={styles.cardName}>{name}</Text>
      <Text style={styles.cardPrice}>{price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
    minHeight: '100%',
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 18,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menu: {
    color: '#222',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerText: {
    color: '#222',
    fontSize: 16,
    fontWeight: '500',
  },
  mainProduct: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 18,
    paddingBottom: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    gap: 24,
  },
  productImage: {
    width: 180,
    height: 270,
    borderRadius: 12,
    marginRight: 0,
    resizeMode: 'cover',
    backgroundColor: '#eee',
  },
  productPriceColumn:{
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 4,
  },
  productInfoColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 8,
    marginLeft: 12,
    marginTop: 2,
  },
  productTitle: {
    fontSize: 15,
    textAlign: 'left',
    marginBottom: 2,
    color: '#222',
    fontWeight: '400',
    lineHeight: 20,
  },
  price: {
    fontSize: 24,
    marginBottom: 4,
    color: 'black',
    textAlign: 'left',
  },
  pickerContainerRow: {
    width: 90,
    height: 36,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#fafafa',
    overflow: 'hidden',
    marginRight: 0,
    justifyContent: 'center',
    marginBottom: 4,
  },
  pickerRowStyle: {
    width: 100,
    height: 22,
    borderRadius: 9999,
    backgroundColor: '#fafafa',
    paddingHorizontal: 18,
    color: '#222',
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  buyButtonRow: {
    backgroundColor: '#F08359',
    width: 100,
    height: 22,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyTextRow: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  cartButtonRow: {
    backgroundColor: '#FED950',
    width: 100,
    height: 22,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartTextRow: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 15,
  },
  relatedTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 10,
    color: '#222',
  },
  relatedScroll: {
    marginBottom: 0,
  },
  relatedProducts: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 10,
  },
  card: {
    width: 110,
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#fff',
  },
  cardImage: {
    width: 80,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginBottom: 6,
    resizeMode: 'cover',
  },
  cardName: {
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 4,
    color: '#222',
    lineHeight: 15,
  },
  cardPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },
  bottomText: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 32,
    color: '#888',
    marginBottom: 16,
    lineHeight: 16,
  },
  underline: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 6,
    borderRadius: 1,
  },
});
