import React from 'react';
import { ScrollView, View, StyleSheet, useColorScheme, useWindowDimensions } from 'react-native';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';

export default function AboutPage() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' || !scheme ? 'light' : scheme];
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return (
    <ThemedView style={styles.pageContainer}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.heroSection, { backgroundColor: colors.backgroundElement }]}> 
          <ThemedText style={[styles.heroBadge, { color: colors.primary }]}>ABOUT US</ThemedText>
          <ThemedText style={[styles.heroTitle, { color: colors.text }]}>Dairy Supply Made Dependable</ThemedText>
          <ThemedText type="small" style={[styles.heroCopy, { color: colors.textSecondary }]}> 
            MilkEnRte delivers business-grade milk products with consistent cold-chain logistics, quality verification, and on-time supply for corporate kitchens, hotels, and institutions.
          </ThemedText>
        </View>

        <View style={[styles.contentSection, { backgroundColor: colors.background }]}> 
          <View style={[styles.sectionRow, { flexDirection: isDesktop ? 'row' : 'column' }]}> 
            <View style={[styles.sectionColumn, { width: isDesktop ? '48%' : '100%' }]}> 
              <ThemedText type="defaultSemiBold" style={[styles.sectionHeading, { color: colors.text }]}>Our Promise</ThemedText>
              <ThemedText type="small" style={[styles.sectionText, { color: colors.textSecondary }]}>
                Consistent delivery schedules, certified grade inspection, and flexible order quantities designed to serve businesses at scale.
              </ThemedText>
            </View>

            <View style={[styles.sectionColumn, { width: isDesktop ? '48%' : '100%' }]}> 
              <ThemedText type="defaultSemiBold" style={[styles.sectionHeading, { color: colors.text }]}>What We Supply</ThemedText>
              <ThemedText type="small" style={[styles.sectionText, { color: colors.textSecondary }]}>
                Milk, curd, paneer, cheese, ghee, butter, lassi, and more — all sourced from ISO-certified processing units for reliable business consumption.
              </ThemedText>
            </View>
          </View>
        </View>

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
    maxWidth: 760,
    lineHeight: 24,
  },
  contentSection: {
    width: '100%',
    paddingVertical: Spacing.five,
    paddingHorizontal: Spacing.five,
  },
  sectionRow: {
    gap: Spacing.four,
    marginBottom: Spacing.five,
  },
  sectionColumn: {
    gap: Spacing.two,
  },
  sectionHeading: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: Spacing.two,
  },
  sectionText: {
    lineHeight: 24,
  },
});
