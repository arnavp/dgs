import React from 'react';
import { View, StyleSheet, Pressable, useWindowDimensions, Linking, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { Colors, Spacing } from '@/constants/theme';

interface HeaderProps {
  onNavPress?: (section: string) => void;
}

export function Header({ onNavPress }: HeaderProps) {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' || !scheme ? 'light' : scheme];
  
  const isDesktop = width >= 768;

  const navLinks = [
    { label: 'Home', href: '/', section: 'home' },
    { label: 'Products', href: '/products', section: 'products' },
    { label: 'Why Us', href: '/why-us', section: 'whyUs' },
    { label: 'Contact', href: '/contact', section: 'contact' },
  ] as const;

  type NavLinkHref = typeof navLinks[number]['href'];

  const handlePhonePress = () => {
    Linking.openURL('tel:+919930029900');
  };

  const handleNav = (href: NavLinkHref, section: string) => {
    if (href === '/' && onNavPress) {
      onNavPress(section);
      return;
    }

    router.push(href);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Top bar info (Phone, Email) - Desktop only */}
      {isDesktop && (
        <View style={[styles.topBar, { backgroundColor: colors.primary }]}>
          <View style={styles.topBarContent}>
            <View style={styles.contactInfo}>
              <Pressable onPress={handlePhonePress}>
                <ThemedText style={styles.topBarText}>📞 +91 9930029900</ThemedText>
              </Pressable>
              <Pressable onPress={() => Linking.openURL('mailto:info@milkenrte.com')}>
                <ThemedText style={styles.topBarText}>✉️ info@milkenrte.com</ThemedText>
              </Pressable>
            </View>
            <View style={styles.socialInfo}>
              <ThemedText style={styles.topBarText}>ISO 9001:2015 Certified Supply Chain</ThemedText>
            </View>
          </View>
        </View>
      )}

      {/* Main navigation header */}
      <View style={[styles.navbar, { borderBottomColor: colors.border }]}>
        <View style={styles.navbarContent}>
          {/* Logo */}
         <Pressable onPress={() => handleNav('/', 'home')} style={styles.logoContainer}>
  <View style={[styles.logoIcon, { backgroundColor: colors.primary }]}>
    <ThemedText style={styles.logoIconText}>M</ThemedText>
  </View>
  <ThemedText type="defaultSemiBold" style={[styles.logoText, { color: colors.primary }]}>
    Milk<ThemedText type="defaultSemiBold" style={{ color: colors.accent }}>EnRte</ThemedText>
  </ThemedText>
</Pressable>

          {/* Nav Links */}
          {isDesktop ? (
            <View style={styles.navLinks}>
              <Pressable onPress={() => handleNav('/', 'home')} style={[styles.navButton, { backgroundColor: colors.primary }]}> 
                <ThemedText type="smallBold" style={{ color: colors.white }}>Home</ThemedText>
              </Pressable>
              <Pressable onPress={() => handleNav('/products', 'products')} style={[styles.navButton, { backgroundColor: colors.primary }]}> 
                <ThemedText type="smallBold" style={{ color: colors.white }}>Products</ThemedText>
              </Pressable>
              <Pressable onPress={() => handleNav('/why-us', 'whyUs')} style={[styles.navButton, { backgroundColor: colors.primary }]}> 
                <ThemedText type="smallBold" style={{ color: colors.white }}>Why Us</ThemedText>
              </Pressable>
              <Pressable onPress={() => handleNav('/contact', 'contact')} style={[styles.navButton, { backgroundColor: colors.accent }]}>
                <ThemedText type="smallBold" style={{ color: colors.text }}>Contact</ThemedText>
              </Pressable>
              
              <Pressable 
                onPress={() => handleNav('/contact', 'contact')} 
                style={[styles.ctaButton, { backgroundColor: colors.accent }]}
              >
                <ThemedText style={styles.ctaButtonText}>Get In Touch</ThemedText>
              </Pressable>
            </View>
          ) : (
            <View style={styles.mobileActions}>
              <Pressable 
                onPress={handlePhonePress}
                style={[styles.compactCtaButton, { borderColor: colors.primary }]}
              >
                <ThemedText type="smallBold" style={{ color: colors.primary }}>Call Now</ThemedText>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 1000,
  },
  topBar: {
    paddingVertical: Spacing.one,
    width: '100%',
  },
  topBarContent: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
  },
  contactInfo: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  socialInfo: {
    flexDirection: 'row',
  },
  topBarText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  navbar: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    paddingVertical: Spacing.two,
  },
  navbarContent: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIconText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  navButton: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  ctaButton: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    borderRadius: 999,
    marginLeft: Spacing.two,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  mobileActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compactCtaButton: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: 6,
    borderWidth: 1,
  },
});
