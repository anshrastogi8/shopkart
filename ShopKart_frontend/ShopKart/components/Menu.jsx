import React from 'react';
import { ScrollView, StyleSheet, View, Text, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function MenuGroup({ title, items }) {
  return (
    <View style={{flex:1,backgroundColor:"#ffffff",padding: 16}}>
      <Text style={styles.groupTitle}>{title}</Text>
      <View style={styles.menuSection}>
        {items.map((item, index) => (
          <Pressable key={index} style={styles.menuItem}>
            <MaterialCommunityIcons
              name={item.icon}
              size={22}
              color="#FAF3E0"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.menuText}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default function Menu() {
  return (
    <ScrollView style={styles.screen}>
      <MenuGroup
        title="Discover"
        items={[
          { icon: 'fire', label: 'Trending Now' },
          { icon: 'new-box', label: 'New Arrivals' },
          { icon: 'sale', label: 'Top Deals' },
        ]}
      />

      <MenuGroup
        title="Features"
        items={[
          { icon: 'gift-outline', label: 'Gift Cards' },
          { icon: 'account-multiple-plus-outline', label: 'Invite & Earn' },
          { icon: 'store-outline', label: 'Store Locator' },
          { icon: 'bell-outline', label: 'Notifications' },
        ]}
      />

      <MenuGroup
        title="Community"
        items={[
          { icon: 'comment-text-outline', label: 'Customer Reviews' },
          { icon: 'calendar-outline', label: 'Events & Workshops' },
          { icon: 'book-open-outline', label: 'Blog / Articles' },
        ]}
      />

      <MenuGroup
        title="Settings & Help"
        items={[
          { icon: 'language-outline', label: 'Language & Region' },
          { icon: 'cog-outline', label: 'App Settings' },
        ]}
      />

      <MenuGroup
        title="Support"
        items={[
          { icon: 'help-circle-outline', label: 'Help Center' },
          { icon: 'phone', label: 'Contact Us' },
        ]}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menuGroup: {
    marginBottom: 20,
  },
  groupTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    marginBottom: 8,
  },
  menuSection: {
    backgroundColor: '#4b809fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(230,237,243,0.08)',
  },
  menuText: {
    fontSize: 16,
    color: '#FAF3E0',
    fontWeight: '500',
  },
});
