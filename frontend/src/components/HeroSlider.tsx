import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, useWindowDimensions, useColorScheme } from 'react-native';
import { ThemedText } from './themed-text';
import { Colors, Spacing } from '@/constants/theme';

interface HeroSliderProps {
  onCtaPress?: () => void;
}

const slides = [
  {
    title: 'Zero Drama,',
    subtitle: 'Timely Supply',
    desc: 'Sourced from trusted ISO-certified dairies to ensure uncompromising freshness, hygiene, and on-time delivery every single day.',
    buttonText: 'Partner with Us',
  },
  {
    title: 'Lowest Price,',
    subtitle: 'No Compromise',
    desc: 'Unmatched wholesale bulk prices on Milk, Curd, Paneer, and Butter for educational institutes, corporate chains, and hotels.',
    buttonText: 'Get Quote Now',
  },
  {
    title: 'Your Milk,',
    subtitle: 'Your Way',
    desc: 'Customized daily B2B packages and scheduling tailored to your institutional requirements. Reliable fleet of delivery vehicles.',
    buttonText: 'Explore Catalog',
  },
];

export function HeroSlider({ onCtaPress }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { width } = useWindowDimensions();
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' || !scheme ? 'light' : scheme];

  const isDesktop = width >= 768;

  // Auto transition
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[activeIndex];

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundElement }]}>
      {/* Background Graphic Accents */}
      <View style={[styles.circleAccent1, { backgroundColor: colors.accent, opacity: 0.08 }]} />
      <View style={[styles.circleAccent2, { backgroundColor: colors.primary, opacity: 0.05 }]} />

      <View style={styles.content}>
        <View style={styles.slideContent}>
          {/* Badge */}
          <View style={[styles.badge, { backgroundColor: colors.primary + '15' }]}>
            <ThemedText type="smallBold" style={{ color: colors.primary, textTransform: 'uppercase', letterSpacing: 1 }}>
              ⚡ Bulk B2B Dairy Partner
            </ThemedText>
          </View>

          {/* Titles */}
          <ThemedText style={[styles.title, { color: colors.text }]}>
            {slide.title}
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: colors.primary }]}>
            {slide.subtitle}
          </ThemedText>

          {/* Description */}
          <ThemedText style={[styles.desc, { color: colors.textSecondary }]}>
            {slide.desc}
          </ThemedText>

          {/* Button CTA */}
          <Pressable
            onPress={onCtaPress}
            style={({ pressed }) => [
              styles.ctaButton,
              { backgroundColor: colors.primary, transform: [{ scale: pressed ? 0.98 : 1 }] }
            ]}
          >
            <ThemedText style={styles.ctaButtonText}>{slide.buttonText}</ThemedText>
          </Pressable>
        </View>

        {/* Indicators */}
        <View style={styles.indicators}>
          {slides.map((_, idx) => (
            <Pressable
              key={idx}
              onPress={() => setActiveIndex(idx)}
              style={[
                styles.indicator,
                {
                  backgroundColor: idx === activeIndex ? colors.primary : colors.border,
                  width: idx === activeIndex ? 24 : 8,
                },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 480,
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  circleAccent1: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    top: -100,
    right: -100,
  },
  circleAccent2: {
    position: 'absolute',
    width: 600,
    height: 600,
    borderRadius: 300,
    bottom: -200,
    left: -200,
  },
  content: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: Spacing.five,
    justifyContent: 'space-between',
    height: '100%',
    paddingVertical: Spacing.six,
  },
  slideContent: {
    maxWidth: 620,
    gap: Spacing.two,
    marginTop: Spacing.four,
    backgroundColor: '#FFFFFF',
    padding: Spacing.four,
    borderRadius: 28,
    shadowColor: '#0B4EB2',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.08,
    shadowRadius: 40,
    elevation: 6,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: 999,
    marginBottom: Spacing.two,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    lineHeight: 56,
  },
  subtitle: {
    fontSize: 48,
    fontWeight: '900',
    lineHeight: 56,
    marginTop: -8,
  },
  desc: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: Spacing.two,
    marginBottom: Spacing.four,
  },
  ctaButton: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.five,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 6,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  indicators: {
    flexDirection: 'row',
    gap: Spacing.two,
    alignSelf: 'flex-start',
    marginTop: Spacing.four,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
  },
});
