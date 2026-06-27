import React from 'react';
import { ScrollView, View, StyleSheet, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';

import { Header } from '@/components/Header';
import { ProductsGrid } from '@/components/ProductsGrid';
import { Footer } from '@/components/Footer';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';

export default function ProductsPage() {
  const router = useRouter();
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' || !scheme ? 'light' : scheme];

  const handleProductSelect = (productName: string) => {
    router.push(`/contact?product=${encodeURIComponent(productName)}`);
  };

  return (
    <ThemedView style={styles.pageContainer}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.heroSection, { backgroundColor: colors.backgroundElement }]}> 
          <ThemedText style={[styles.heroBadge, { color: colors.primary }]}>PRODUCTS</ThemedText>
          <ThemedText style={[styles.heroTitle, { color: colors.text }]}>Explore Our Dairy Portfolio</ThemedText>
          <ThemedText type="small" style={[styles.heroCopy, { color: colors.textSecondary }]}>
            Fresh milk, curd, paneer, ghee, butter and B2B milk-products built for hotels, institutions, canteens, and foodservice supply chains.
          </ThemedText>
        </View>

        <ProductsGrid onProductSelect={handleProductSelect} />
        <Footer />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Spacing.six,
  },
  heroSection: {
    width: '100%',
    paddingVertical: Spacing.six,
    paddingHorizontal: Spacing.five,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  heroBadge: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: Spacing.two,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '900',
    lineHeight: 44,
    marginBottom: Spacing.three,
  },
  heroCopy: {
    maxWidth: 800,
    lineHeight: 24,
  },
});
