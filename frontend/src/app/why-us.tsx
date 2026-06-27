import React from 'react';
import { ScrollView, View, StyleSheet, useColorScheme, useWindowDimensions } from 'react-native';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';

export default function WhyUsPage() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' || !scheme ? 'light' : scheme];
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return (
    <ThemedView style={styles.pageContainer}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.heroSection, { backgroundColor: colors.backgroundElement }]}> 
          <ThemedText style={[styles.heroBadge, { color: colors.primary }]}>WHY MILKENRTE</ThemedText>
          <ThemedText style={[styles.heroTitle, { color: colors.text }]}>Trusted Dairy Supply at Scale</ThemedText>
          <ThemedText type="small" style={[styles.heroCopy, { color: colors.textSecondary }]}> 
            Our mission is to deliver bulk milk and dairy products with unbroken cold chain logistics, certified quality, and timely doorstep supply for businesses across Mumbai and beyond.
          </ThemedText>
        </View>

        <View style={[styles.contentSection, { backgroundColor: colors.background }]}> 
          <View style={[styles.sectionRow, { flexDirection: isDesktop ? 'row' : 'column' }]}> 
            <View style={[styles.sectionColumn, { width: isDesktop ? '48%' : '100%' }]}> 
              <ThemedText type="defaultSemiBold" style={[styles.sectionHeading, { color: colors.text }]}>Built for large volume requirements</ThemedText>
              <ThemedText type="small" style={[styles.sectionText, { color: colors.textSecondary }]}>
                We serve corporate canteens, food factories, hotels, educational institutions, and charted caterers with continuous deliveries and digital invoicing.
              </ThemedText>
            </View>

            <View style={[styles.sectionColumn, { width: isDesktop ? '48%' : '100%' }]}> 
              <ThemedText type="defaultSemiBold" style={[styles.sectionHeading, { color: colors.text }]}>ISO-certified supply chain</ThemedText>
              <ThemedText type="small" style={[styles.sectionText, { color: colors.textSecondary }]}>
                Every batch is lab-verified, tracked by temperature-controlled fleet, and handled with hygiene practices that match modern dairy processing standards.
              </ThemedText>
            </View>
          </View>

          <View style={[styles.featuresGrid, { flexDirection: isDesktop ? 'row' : 'column' }]}> 
            {[
              { title: 'Rapid Delivery', body: 'Morning pickup and same-day distribution along planned city routes.' },
              { title: 'Custom B2B Packs', body: 'Flexible daily quantities, brand preferences, and packaging sized for kitchens and cafeterias.' },
              { title: 'Quality Assurance', body: 'Proven milk chemistry tests, fat/SNF verification, and cold-storage control.' },
            ].map((item, idx) => (
              <View key={idx} style={[styles.featureCard, { width: isDesktop ? '32%' : '100%', backgroundColor: colors.backgroundElement, borderColor: colors.border }]}> 
                <ThemedText type="defaultSemiBold" style={[styles.featureTitle, { color: colors.text }]}>{item.title}</ThemedText>
                <ThemedText type="small" style={[styles.featureBody, { color: colors.textSecondary }]}>{item.body}</ThemedText>
              </View>
            ))}
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
  featuresGrid: {
    gap: Spacing.four,
  },
  featureCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: Spacing.four,
  },
  featureTitle: {
    fontSize: 18,
    marginBottom: Spacing.two,
  },
  featureBody: {
    lineHeight: 22,
  },
});
