import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, useColorScheme, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Header } from '@/components/Header';
import { HeroSlider } from '@/components/HeroSlider';
import { ProductsGrid } from '@/components/ProductsGrid';
import { BrandsCarousel } from '@/components/BrandsCarousel';
import { InquiryForm } from '@/components/InquiryForm';
import { Footer } from '@/components/Footer';
import { ThemedText } from '@/components/themed-text';
import { Colors, Spacing } from '../constants/theme';

export default function HomeScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' || !scheme ? 'light' : scheme];
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  const handleProductSelect = (productName: string) => {
    setSelectedProduct(productName);
    router.push(`/contact?product=${encodeURIComponent(productName)}`);
  };

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <HeroSlider onCtaPress={() => router.push('/contact')} />

        <View style={[styles.statsSection, { backgroundColor: colors.background }]}>
          <View style={styles.statsContainer}>
            <View style={[styles.statBox, { borderColor: colors.border, width: isDesktop ? '30%' : '100%' }]}>
              <ThemedText style={[styles.statNum, { color: colors.primary }]}>50K+</ThemedText>
              <ThemedText type="smallBold" style={{ color: colors.text }}>Liters Daily Delivery</ThemedText>
              <ThemedText type="small" style={{ color: colors.textSecondary, textAlign: 'center' }}>
                Scale to meet your highest volume demands seamlessly.
              </ThemedText>
            </View>

            <View style={[styles.statBox, { borderColor: colors.border, width: isDesktop ? '30%' : '100%' }]}>
              <ThemedText style={[styles.statNum, { color: colors.primary }]}>100%</ThemedText>
              <ThemedText type="smallBold" style={{ color: colors.text }}>ISO-Certified Partnering</ThemedText>
              <ThemedText type="small" style={{ color: colors.textSecondary, textAlign: 'center' }}>
                Strict testing for purity, fat content, and hygiene standards.
              </ThemedText>
            </View>

            <View style={[styles.statBox, { borderColor: colors.border, width: isDesktop ? '30%' : '100%' }]}>
              <ThemedText style={[styles.statNum, { color: colors.primary }]}>0%</ThemedText>
              <ThemedText type="smallBold" style={{ color: colors.text }}>Delivery Delay (Zero Drama)</ThemedText>
              <ThemedText type="small" style={{ color: colors.textSecondary, textAlign: 'center' }}>
                Dedicated refrigerated fleet operating every single morning.
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Section 3: Who We Are / Intro */}
        <View style={styles.innerContainer}>
          <View style={[styles.introRow, { flexDirection: isDesktop ? 'row' : 'column' }]}>
            <View style={[styles.introCol, { width: isDesktop ? '50%' : '100%' }]}>
              <ThemedText style={[styles.sectionSubtitle, { color: colors.accent }]}>ABOUT MILKENRTE</ThemedText>
              <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
                At MilkEnRte, service is our real product – milk is only the beginning
              </ThemedText>
              <View style={[styles.lineDecorator, { backgroundColor: colors.primary }]} />
            </View>

            <View style={[styles.introCol, { width: isDesktop ? '50%' : '100%' }]}>
              <ThemedText type="default" style={{ color: colors.textSecondary, lineHeight: 24, marginBottom: Spacing.two }}>
                We specialize in bulk B2B supply of milk and premium dairy derivatives. Sourced from ISO-certified state-of-the-art dairies, our logistics are designed to support heavy operations without pause.
              </ThemedText>
              <ThemedText type="default" style={{ color: colors.textSecondary, lineHeight: 24 }}>
                Our corporate, retail, educational, and hospitality partners depend on us for transparency, competitive pricing, and strict adherence to timelines. We build relationships that last.
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Section 4: Brand Partners Showcase */}
        <View style={styles.innerContainer}>
          <BrandsCarousel />
        </View>

        {/* Section 5: Products Catalog Grid */}
        <View style={styles.innerContainer}>
          <ProductsGrid onProductSelect={handleProductSelect} />
        </View>

        {/* Section 6: Why Us Detailed Features */}
        <View
          style={[styles.whyUsSection, { backgroundColor: colors.backgroundElement }]}
        >
          <View style={styles.whyUsContent}>
            <View style={styles.centerHeader}>
              <ThemedText style={[styles.sectionSubtitle, { color: colors.accent }]}>THE MILKENRTE ADVANTAGE</ThemedText>
              <ThemedText style={[styles.sectionTitle, { color: colors.text, textAlign: 'center' }]}>Why Leading Brands Trust Us</ThemedText>
              <View style={[styles.lineDecorator, { backgroundColor: colors.primary, alignSelf: 'center' }]} />
            </View>

            <View style={[styles.featuresRow, { flexDirection: isDesktop ? 'row' : 'column' }]}>
              <View style={[styles.featureCard, { backgroundColor: colors.background, width: isDesktop ? '31%' : '100%' }]}>
                <ThemedText style={styles.featureIcon}>🔬</ThemedText>
                <ThemedText type="defaultSemiBold" style={{ color: colors.text, marginVertical: Spacing.one }}>Strict Lab Testing</ThemedText>
                <ThemedText type="small" style={{ color: colors.textSecondary, lineHeight: 18 }}>
                  Every batch of milk undergoes rapid-detection lab checks for adulteration, fat percentage, and SNF purity before transit.
                </ThemedText>
              </View>

              <View style={[styles.featureCard, { backgroundColor: colors.background, width: isDesktop ? '31%' : '100%' }]}>
                <ThemedText style={styles.featureIcon}>❄️</ThemedText>
                <ThemedText type="defaultSemiBold" style={{ color: colors.text, marginVertical: Spacing.one }}>Cold Chain Fleet</ThemedText>
                <ThemedText type="small" style={{ color: colors.textSecondary, lineHeight: 18 }}>
                  Our vehicles maintain optimal temperature control to guarantee freshness and prevent bacterial growth during morning deliveries.
                </ThemedText>
              </View>

              <View style={[styles.featureCard, { backgroundColor: colors.background, width: isDesktop ? '31%' : '100%' }]}>
                <ThemedText style={styles.featureIcon}>📈</ThemedText>
                <ThemedText type="defaultSemiBold" style={{ color: colors.text, marginVertical: Spacing.one }}>Competitive Pricing</ThemedText>
                <ThemedText type="small" style={{ color: colors.textSecondary, lineHeight: 18 }}>
                  Direct sourcing from dairy cooperatives eliminates middleman markup, offering your business the lowest bulk rates in the market.
                </ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* Section 7: B2B Inquiry Form */}
        <View style={[styles.innerContainer, styles.formContainer]}>
          <View style={[styles.formRow, { flexDirection: isDesktop ? 'row' : 'column' }]}>
            <View style={[styles.formColText, { width: isDesktop ? '45%' : '100%' }]}>
              <ThemedText style={[styles.sectionSubtitle, { color: colors.accent }]}>PARTNER WITH US</ThemedText>
              <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>Let's Optimize Your Dairy Supply</ThemedText>
              <ThemedText style={{ color: colors.textSecondary, lineHeight: 22, marginTop: Spacing.two }}>
                Ready to cut down supply volatility? MilkEnRte guarantees on-time delivery, clear digital billing, and lab-certified purity. Fill out the form, and our sales executive will create a custom corporate proposal for your review.
              </ThemedText>
              <View style={styles.bulletList}>
                <ThemedText type="smallBold" style={{ color: colors.primary, marginVertical: 4 }}>✓ Custom pricing contract options</ThemedText>
                <ThemedText type="smallBold" style={{ color: colors.primary, marginVertical: 4 }}>✓ Dedicated client relationships manager</ThemedText>
                <ThemedText type="smallBold" style={{ color: colors.primary, marginVertical: 4 }}>✓ Live transit SMS alerts</ThemedText>
              </View>
            </View>

            <View style={[styles.formColForm, { width: isDesktop ? '50%' : '100%' }]}>
              <InquiryForm
                selectedProduct={selectedProduct}
                onSuccess={() => setSelectedProduct('')}
              />
            </View>
          </View>
        </View>

        {/* Footer */}
        {/* onNavPress={scrollToSection} */}
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: Spacing.five,
    marginVertical: Spacing.four,
  },
  innerContainer: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: Spacing.five,
    marginVertical: Spacing.four,
  },
  statsSection: {
    width: '100%',
    paddingVertical: Spacing.five,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#D9E7FB',
    backgroundColor: '#FFFFFF',
    marginTop: Spacing.four,
  },
  statsContainer: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: Spacing.five,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20,
  },
  statBox: {
    borderWidth: 1,
    borderRadius: 16,
    padding: Spacing.four,
    alignItems: 'center',
    gap: Spacing.one,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  statNum: {
    fontSize: 40,
    fontWeight: '900',
  },
  introRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 40,
    paddingVertical: Spacing.four,
  },
  introCol: {
    gap: Spacing.two,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 40,
  },
  lineDecorator: {
    width: 50,
    height: 4,
    borderRadius: 2,
    marginTop: Spacing.one,
  },
  whyUsSection: {
    width: '100%',
    paddingVertical: Spacing.six,
    marginVertical: Spacing.four,
    borderRadius: 28,
    overflow: 'hidden',
  },
  whyUsContent: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: Spacing.five,
  },
  centerHeader: {
    alignItems: 'center',
    marginBottom: Spacing.five,
  },
  featuresRow: {
    justifyContent: 'space-between',
    gap: 24,
  },
  featureCard: {
    borderRadius: 12,
    padding: Spacing.four,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: Spacing.two,
  },
  formContainer: {
    paddingVertical: Spacing.four,
  },
  formRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 40,
  },
  formColText: {
    gap: Spacing.two,
  },
  formColForm: {
    alignSelf: 'stretch',
  },
  bulletList: {
    marginTop: Spacing.three,
    gap: Spacing.one,
  },
  scrollContent: {
    paddingBottom: Spacing.six,
  },
});
