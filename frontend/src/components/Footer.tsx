import React from 'react';
import { View, StyleSheet, Pressable, useWindowDimensions, Linking, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from './themed-text';
import { Colors, Spacing } from '@/constants/theme';

interface FooterProps {
  onNavPress?: (section: string) => void;
}

export function Footer({ onNavPress }: FooterProps) {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' || !scheme ? 'light' : scheme];

  const isDesktop = width >= 768;

  const handleLinkPress = (href: string, section?: string) => {
    if (href === '/' && onNavPress) {
      onNavPress(section ?? 'home');
      return;
    }

    router.push(href);
  };

  const handleLegalLinkPress = (type: 'terms' | 'privacy') => {
    if (type === 'terms') {
      router.push('/terms-and-conditions');
    } else {
      router.push('/privacy-policy');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.primary, borderTopColor: colors.accent }]}>
      <View style={styles.content}>
        <View style={styles.grid}>
          {/* Col 1: About */}
          <View style={[styles.column, { width: isDesktop ? '30%' : '100%' }]}>
            <ThemedText type="defaultSemiBold" style={[styles.logoText, { color: colors.white }]}>
              Milk<ThemedText type="defaultSemiBold" style={{ color: colors.accent }}>EnRte</ThemedText>
            </ThemedText>
            <ThemedText type="small" style={[styles.aboutText, { color: colors.white }]}>
              We specialize in the lowest-price bulk B2B supply of milk and milk products. Sourced directly from trusted, ISO-certified milk dairies to ensure uncompromising quality and consistency.
            </ThemedText>
            <ThemedText type="smallBold" style={{ color: colors.accent, marginTop: Spacing.two }}>
              ISO 9001:2015 Certified
            </ThemedText>
          </View>

          {/* Col 2: Quick Links */}
          <View style={[styles.column, { width: isDesktop ? '20%' : '100%' }]}>
            <ThemedText type="defaultSemiBold" style={[styles.colHeader, { color: colors.white }]}>Useful Links</ThemedText>
            <Pressable onPress={() => handleLinkPress('/')} style={styles.link}>
              <ThemedText type="small" style={{ color: colors.white }}>Home</ThemedText>
            </Pressable>
            <Pressable onPress={() => handleLinkPress('/products')} style={styles.link}>
              <ThemedText type="small" style={{ color: colors.white }}>Products</ThemedText>
            </Pressable>
            <Pressable onPress={() => handleLinkPress('/why-us')} style={styles.link}>
              <ThemedText type="small" style={{ color: colors.white }}>Why MilkEnRte</ThemedText>
            </Pressable>
            <Pressable onPress={() => handleLinkPress('/contact')} style={styles.link}>
              <ThemedText type="small" style={{ color: colors.white }}>Contact Us</ThemedText>
            </Pressable>
          </View>

          {/* Col 3: Hours */}
          <View style={[styles.column, { width: isDesktop ? '20%' : '100%' }]}>
            <ThemedText type="defaultSemiBold" style={[styles.colHeader, { color: colors.white }]}>Working Hours</ThemedText>
            <ThemedText type="small" style={{ color: colors.white, marginBottom: 4 }}>
              🗓️ <ThemedText type="smallBold" style={{ color: colors.white }}>Mon to Sat:</ThemedText>
            </ThemedText>
            <ThemedText type="small" style={{ color: colors.white, marginLeft: 20, marginBottom: Spacing.two }}>
              10.00 AM to 7.00 PM
            </ThemedText>
            <ThemedText type="small" style={{ color: colors.white }}>
              🗓️ <ThemedText type="smallBold" style={{ color: colors.white }}>Sunday:</ThemedText> Closed
            </ThemedText>
          </View>

          {/* Col 4: Addresses */}
          <View style={[styles.column, { width: isDesktop ? '30%' : '100%' }]}>
            <ThemedText type="defaultSemiBold" style={[styles.colHeader, { color: colors.white }]}>Our Addresses</ThemedText>
            
            <View style={styles.addressItem}>
              <ThemedText style={{ fontSize: 14 }}>📍</ThemedText>
              <ThemedText type="small" style={[styles.addressText, { color: colors.white }]}>
                <ThemedText type="smallBold" style={{ color: colors.white }}>Corporate Office: </ThemedText>
                1201, Skylon Tower, Plot No. 37, Sector 19A, Vashi, Navi Mumbai, Maharashtra 400703
              </ThemedText>
            </View>

            <View style={styles.addressItem}>
              <ThemedText style={{ fontSize: 14 }}>📍</ThemedText>
              <ThemedText type="small" style={[styles.addressText, { color: colors.white }]}>
                <ThemedText type="smallBold" style={{ color: colors.white }}>Distribution Hub: </ThemedText>
                Shop 10, Sant Gadge Maharaj CHS, Khardev Nagar, Chembur East, Mumbai - 400071
              </ThemedText>
            </View>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.accent, opacity: 0.25 }]} />

        <View style={styles.footerBottom}>
          <ThemedText type="small" style={{ color: colors.white, lineHeight: 18 }}>
            Copyright © {new Date().getFullYear()} <ThemedText type="smallBold" style={{ color: colors.accent }}>MilkEnRte</ThemedText>. All Rights Reserved.
          </ThemedText>
          <View style={styles.legalLinks}>
            <Pressable onPress={() => handleLegalLinkPress('terms')} style={styles.legalLink}>
              <ThemedText type="small" style={{ color: colors.accent }}>Terms & Conditions</ThemedText>
            </Pressable>
            <Pressable onPress={() => handleLegalLinkPress('privacy')} style={styles.legalLink}>
              <ThemedText type="small" style={{ color: colors.accent }}>Privacy Policy</ThemedText>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: Spacing.five,
    borderTopWidth: 1,
    marginTop: Spacing.six,
  },
  content: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: Spacing.four,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 24,
  },
  column: {
    gap: Spacing.two,
    minWidth: 200,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  aboutText: {
    lineHeight: 20,
    marginTop: Spacing.one,
  },
  colHeader: {
    fontSize: 16,
    marginBottom: Spacing.two,
  },
  link: {
    paddingVertical: 4,
  },
  addressItem: {
    flexDirection: 'row',
    gap: Spacing.one,
    alignItems: 'flex-start',
    marginBottom: Spacing.two,
  },
  addressText: {
    flex: 1,
    lineHeight: 18,
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: Spacing.four,
  },
  footerBottom: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.two,
  },
  legalLinks: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  legalLink: {
    paddingVertical: 2,
  },
});
