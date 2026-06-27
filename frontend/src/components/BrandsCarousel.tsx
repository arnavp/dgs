import React from 'react';
import { View, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { ThemedText } from './themed-text';
import { Colors, Spacing } from '@/constants/theme';

const brands = [
  'Amul', 'Gowardhan', 'Gokul', 'Govind', 
  'Nandini', 'Mother Dairy', 'Warna', 'Chitale', 
  'Heritage', 'Nature Delight', 'Mahananda', 'Akshara',
  'Milk Mist', 'Vikas', 'Nandan', 'Dailysia'
];

export function BrandsCarousel() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' || !scheme ? 'light' : scheme];

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundElement }]}>
      <View style={styles.header}>
        <ThemedText style={[styles.subTitle, { color: colors.accent }]}>BRANDS WE CATER</ThemedText>
        <ThemedText style={[styles.title, { color: colors.text }]}>ISO Certified Partner Networks</ThemedText>
        <ThemedText type="small" style={[styles.desc, { color: colors.textSecondary }]}>
          We distribute high-quality products sourced directly from India’s leading trusted dairy cooperatives.
        </ThemedText>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {brands.map((brand, idx) => (
          <View
            key={idx}
            style={[
              styles.brandCard,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={[styles.brandLogoCircle, { backgroundColor: colors.primary + '10' }]}>
              <ThemedText type="defaultSemiBold" style={{ color: colors.primary, fontSize: 18 }}>
                {brand.charAt(0)}
              </ThemedText>
            </View>
            <ThemedText type="smallBold" style={[styles.brandName, { color: colors.text }]}>
              {brand}
            </ThemedText>
            <ThemedText style={{ fontSize: 10, color: colors.accent }}>✓ Certified</ThemedText>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: Spacing.five,
    borderRadius: 16,
    marginVertical: Spacing.four,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    marginBottom: Spacing.four,
  },
  subTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: Spacing.one,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: Spacing.one,
  },
  desc: {
    textAlign: 'center',
    maxWidth: 600,
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
    paddingBottom: Spacing.two,
  },
  brandCard: {
    width: 140,
    height: 120,
    borderRadius: 12,
    borderWidth: 1,
    padding: Spacing.two,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  brandLogoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  brandName: {
    fontSize: 14,
    textAlign: 'center',
  },
});
