import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import experience from '../assets/images/experience.jpg';

export default function PromoDuo() {
  const navigation = useNavigation();

  return (
    <ScrollView horizontal style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://images.pexels.com/photos/14768957/pexels-photo-14768957.jpeg',
        }}
        style={styles.card}
        imageStyle={styles.imageBackground}
      >
        <View>
          <Text style={[styles.title, { color: 'white' }]}>
            End of Season Sale — {'\n'}Up to 60% Off
          </Text>
        </View>

        <TouchableOpacity
          style={styles.lightButton}
          onPress={() => navigation.navigate('Sale')}
        >
          <Text style={styles.lightButtonText}>Shop Sale</Text>
        </TouchableOpacity>
      </ImageBackground>

      <ImageBackground
        source={experience}
        style={styles.card}
        imageStyle={styles.imageBackground}
      >
        <View>
          <Text style={[styles.title, { color: '#111827' }]}>
            Streetwear Essentials
          </Text>
        </View>

        <TouchableOpacity
          style={styles.darkButton}
          onPress={() => navigation.navigate('Lookbook')}
        >
          <Text style={styles.darkButtonText}>View Lookbook</Text>
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  card: {
    flex: 1,
    aspectRatio: 2 / 3,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 12,
    justifyContent: 'space-between',
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    elevation: 5, 
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  imageBackground: {
    borderRadius: 16,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    position:"relative",
    top:100
  },
  lightButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  lightButtonText: {
    color: '#111827',
    fontWeight: '600',
    fontSize: 18,
  },
  darkButton: {
    backgroundColor: '#111827',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  darkButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
});
