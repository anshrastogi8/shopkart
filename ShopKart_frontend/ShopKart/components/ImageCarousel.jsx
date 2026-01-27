import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import Swiper from "react-native-swiper";


function SlideItem({ item }) {
  return (
    <View style={styles.slide}>
      <Image source={item.img} style={styles.image} />
      <View style={styles.mainContent}>
        <Text style={styles.headline}>{item.headline}</Text>
        <Text style={styles.subheading}>{item.subheading}</Text>
        {item.cta && (
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaText}>{item.cta.text}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default function ImageCarousel({slides}) {
  return (
    <View style={{ height: 300 }}>
      <Swiper
        autoplay
        autoplayTimeout={5}
        loop
        showsPagination
        dotStyle={styles.dot}
        activeDotStyle={[styles.dot, { backgroundColor: "#747373ff",width:24}]}
      >
        {slides.map((item, index) => (
          <SlideItem key={index} item={item} />
        ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover"
  },
  mainContent: {
    position: "absolute",
    top: 35,
    left: 40
  },
  headline: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 10
  },
  subheading: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10
  },
  ctaButton: {
    backgroundColor: "#10B981",
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
    alignSelf: "flex-start"
  },
  ctaText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600"
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#614343ff",
    marginHorizontal: 5
  }
});
