import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { shopService, Item } from '../services';
import { formatPoints } from '../utils/formatters';

interface Props {
  route: { params: { category: string } };
  navigation: any;
}

const CategoryDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { category } = route.params;
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: category });
    setItems([]);
    setPage(1);
    setHasMore(true);
    fetchItems(1, true);
  }, [category]);

  const fetchItems = async (pageNum = 1, reset = false) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);
      const limit = 20;
      const data = await shopService.getItemsByCategory(category, pageNum, limit);
      if (reset) {
        setItems(data);
      } else {
        setItems(prev => [...prev, ...data]);
      }
      setHasMore(data.length === limit);
      setPage(pageNum);
    } catch (error: any) {
      console.error('カテゴリ取得失敗:', error);
      Alert.alert('エラー', error.message || '商品を取得できませんでした');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      {item.image_url ? (
        <Image source={{ uri: item.image_url }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}
      <View style={styles.infoArea}>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.price}>{formatPoints(item.point_price)}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleEndReached = () => {
    if (!loadingMore && hasMore && !loading) {
      fetchItems(page + 1);
    }
  };

  if (loading && page === 1) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
        <Text style={styles.loadingText}>読み込み中...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loadingMore ? (
        <View style={{ padding: 20 }}>
          <ActivityIndicator size="small" color="#FF6B35" />
        </View>
      ) : null}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 20,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#ccc',
  },
  infoArea: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '500',
  },
  price: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
});

export default CategoryDetailScreen; 