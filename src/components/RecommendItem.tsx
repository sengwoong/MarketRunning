import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

interface RecommendItemProps {
  title: string;
  description: string;
  price: string;
  imageUrl?: string;
  onPress?: () => void;
}

const RecommendItem: React.FC<RecommendItemProps> = ({
  title,
  description,
  price,
  imageUrl,
  onPress
}) => {
  return (
    <TouchableOpacity style={styles.recommendItem} onPress={onPress}>
      {imageUrl ? (
        <Image 
          source={{ uri: imageUrl }}
          style={styles.recommendImage}
        />
      ) : (
        <View style={styles.recommendImagePlaceholder}>
          <Text style={styles.imagePlaceholder}>No Image</Text>
        </View>
      )}
      <View style={styles.recommendInfo}>
        <View style={styles.recommendInfoText}>
          <Text style={styles.recommendDescription}>{description}</Text>
          <Text style={styles.recommendPrice}>{price}</Text>
        </View>
        <Text style={styles.recommendTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recommendItem: {
    flexDirection: 'row',
    backgroundColor: '#FCFAF6',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  recommendImagePlaceholder: {
    width: 60,
    height: 95,
    backgroundColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  recommendImage: {
    width: 60,
    height: 95,
    borderRadius: 8,
    marginRight: 15,
  },
  imagePlaceholder: {
    color: '#999',
    fontSize: 12,
  },
  recommendInfo: {
    flex: 1,
  },
  recommendInfoText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recommendPrice: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recommendDescription: {
    color: '#666',
    fontSize: 14,
    marginBottom: 5,
  },
  recommendTitle: {
    color: '#333',
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default RecommendItem; 