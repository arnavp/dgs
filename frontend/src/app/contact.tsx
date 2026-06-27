'use client';

import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, useColorScheme, useWindowDimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { Header } from '@/components/Header';
import { InquiryForm } from '@/components/InquiryForm';
import { Footer } from '@/components/Footer';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';

export default function ContactPage() {
  const params = useLocalSearchParams();
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' || !scheme ? 'light' : scheme];
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  useEffect(() => {
    if (typeof params.product === 'string') {
      setSelectedProduct(params.product);
    }
  }, [params.product]);

  return (
    <ThemedView style={styles.pageContainer}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.heroSection, { backgroundColor: colors.backgroundElement }]}> 
          <ThemedText style={[styles.heroBadge, { color: colors.primary }]}>CONTACT</ThemedText>
          <ThemedText style={[styles.heroTitle, { color: colors.text }]}>Let's Talk Dairy Supply</ThemedText>
          <ThemedText type="small" style={[styles.heroCopy, { color: colors.textSecondary }]}> 
            Share your volume requirements and preferred products, and our team will follow up with a custom B2B proposal.
          </ThemedText>
        </View>

        <View style={styles.formWrapper}>
          <View style={[styles.formText, { width: isDesktop ? '45%' : '100%' }]}> 
            <ThemedText type="defaultSemiBold" style={[styles.sectionHeading, { color: colors.text }]}>Partner With MilkEnRte</ThemedText>
            <ThemedText type="small" style={[styles.sectionText, { color: colors.textSecondary }]}> 
              Minimum bulk orders start at 12 liters or 10kg. We provide cold-chain delivery, certified milk products, and dedicated corporate support.
            </ThemedText>
          </View>

          <View style={[styles.formContainer, { width: isDesktop ? '50%' : '100%' }]}> 
            <InquiryForm selectedProduct={selectedProduct} />
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
  formWrapper: {
    width: '100%',
    paddingVertical: Spacing.five,
    paddingHorizontal: Spacing.five,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 40,
  },
  formText: {
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
  formContainer: {
    alignSelf: 'stretch',
  },
});
