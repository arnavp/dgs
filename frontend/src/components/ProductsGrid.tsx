import React from 'react';
import { View, StyleSheet, Pressable, useWindowDimensions, useColorScheme } from 'react-native';
import { ThemedText } from './themed-text';
import { Colors, Spacing } from '@/constants/theme';

interface ProductsGridProps {
  onProductSelect?: (productName: string) => void;
}

const products = [
  { name: 'Standardised Milk', icon: '🥛', spec: '4.5% Fat, 8.5% SNF', pack: '500ml, 1L, Bulk Cans', usage: 'Corporates, Hotels' },
  { name: 'Premium Curd', icon: '🥣', spec: '3.0% Fat, Solid set', pack: '1kg, 5kg, 10kg Buckets', usage: 'Caterers, Restaurants' },
  { name: 'Fresh Paneer', icon: '🧀', spec: 'High Protein, Soft-pressed', pack: '1kg, 2kg, 5kg blocks', usage: 'Hotels, Catering chains' },
  { name: 'Pure Cow Ghee', icon: '🏺', spec: '99.7% Milk Fat, Granular', pack: '1L tins, 5L, 15kg jars', usage: 'Bakeries, Kitchens' },
  { name: 'Table Butter', icon: '🧈', spec: 'Salted / Unsalted 80% Fat', pack: '100g, 500g, Bulk blocks', usage: 'Food manufacturing, Cafes' },
  { name: 'Processed Cheese', icon: '🍕', spec: 'Super melting, Creamy', pack: 'Slices, Shredded, Blocks', usage: 'QSRs, Pizza outlets' },
  { name: 'UHT Milk (Long Life)', icon: '📦', spec: 'No preservatives, Sterile', pack: '200ml, 1L Tetrapacks', usage: 'Offices, Remote sites' },
  { name: 'Fresh Butter Milk', icon: '🍶', spec: 'Spiced / Plain cooling', pack: '200ml pouches, bulk dispensers', usage: 'Cafeterias, Events' },
  { name: 'Creamy Lassi', icon: '🥤', spec: 'Sweetened / Mango flavor', pack: '200ml, 500ml bottles', usage: 'Retail stores, Food courts' },
];

export function ProductsGrid({ onProductSelect }: ProductsGridProps) {
  const { width } = useWindowDimensions();
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' || !scheme ? 'light' : scheme];

  const columnsCount = width >= 992 ? 3 : width >= 600 ? 2 : 1;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={[styles.subTitle, { color: colors.accent }]}>OUR PRODUCT PORTFOLIO</ThemedText>
        <ThemedText style={[styles.title, { color: colors.text }]}>Freshness in Every Category</ThemedText>
        <View style={[styles.divider, { backgroundColor: colors.primary }]} />
      </View>

      <View style={styles.grid}>
        {products.map((item, idx) => (
          <View
            key={idx}
            style={[
              styles.card,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
                width: `${100 / columnsCount - 2}%`,
                marginHorizontal: '1%',
              },
            ]}
          >
            <View style={[styles.iconContainer, { backgroundColor: colors.backgroundElement }]}>
              <ThemedText style={styles.icon}>{item.icon}</ThemedText>
            </View>

            <ThemedText type="defaultSemiBold" style={[styles.cardTitle, { color: colors.text }]}>
              {item.name}
            </ThemedText>

            <View style={styles.specs}>
              <ThemedText type="small" style={{ color: colors.textSecondary }}>
                🔬 <ThemedText type="smallBold" style={{ color: colors.text }}>Spec:</ThemedText> {item.spec}
              </ThemedText>
              <ThemedText type="small" style={{ color: colors.textSecondary }}>
                📦 <ThemedText type="smallBold" style={{ color: colors.text }}>Pack:</ThemedText> {item.pack}
              </ThemedText>
              <ThemedText type="small" style={{ color: colors.textSecondary }}>
                🏨 <ThemedText type="smallBold" style={{ color: colors.text }}>Best for:</ThemedText> {item.usage}
              </ThemedText>
            </View>

            <Pressable
              onPress={() => onProductSelect?.(item.name)}
              style={({ pressed }) => [
                styles.selectBtn,
                {
                  backgroundColor: pressed ? colors.backgroundSelected : colors.backgroundElement,
                  borderColor: colors.primary,
                },
              ]}
            >
              <ThemedText type="smallBold" style={{ color: colors.primary, textAlign: 'center' }}>
                Request Inquiry
              </ThemedText>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: Spacing.five,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.five,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: Spacing.one,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
  },
  divider: {
    width: 60,
    height: 4,
    borderRadius: 2,
    marginTop: Spacing.two,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: '2%',
    rowGap: 24,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: Spacing.four,
    justifyContent: 'space-between',
    minHeight: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.three,
  },
  icon: {
    fontSize: 28,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: Spacing.two,
  },
  specs: {
    gap: Spacing.one,
    marginBottom: Spacing.three,
    flexGrow: 1,
  },
  selectBtn: {
    paddingVertical: Spacing.two - 2,
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'stretch',
  },
});
