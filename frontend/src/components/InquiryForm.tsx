import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Pressable, ActivityIndicator, useColorScheme, FlatList, Modal } from 'react-native';
import { ThemedText } from './themed-text';
import { Colors, Spacing } from '@/constants/theme';

interface InquiryFormProps {
  selectedProduct?: string;
  onSuccess?: () => void;
}

const STATIC_PRODUCTS = [
  "Milk", "Curd", "Paneer", "Ghee", "Butter",
  "Cheese", "Srikhand", "UHT Milk", "Mawa",
  "Butter Milk", "Lassi"
];

const STATIC_BRANDS = [
  "Amul", "Gowardhan", "Gokul", "Govind", "Nandini",
  "Mother Dairy", "Warna", "Chitale", "Heritage",
  "Nature Delight", "Mahananda", "Akshara"
];

const STATIC_QUANTITIES = [
  "Minimum 12 Ltr/10kg",
  "12 to 50 Ltr/kg",
  "50 to 100 Ltr/kg",
  "100 to 500 Ltr/kg",
  "500+ Ltr/kg"
];

export function InquiryForm({ selectedProduct, onSuccess }: InquiryFormProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' || !scheme ? 'light' : scheme];

  // Catalog state
  const [products, setProducts] = useState<string[]>(STATIC_PRODUCTS);
  const [brands, setBrands] = useState<string[]>(STATIC_BRANDS);
  const [quantities, setQuantities] = useState<string[]>(STATIC_QUANTITIES);

  // Form inputs
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [product, setProduct] = useState('');
  const [brand, setBrand] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  // Dropdown states
  const [activeDropdown, setActiveDropdown] = useState<'product' | 'brand' | 'quantity' | null>(null);

  // Submission states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  // Pre-fill selected product if passed from catalog grid
  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct);
    }
  }, [selectedProduct]);

  // Fetch catalog from backend API on mount
  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/catalog');
        if (response.ok) {
          const data = await response.json();
          if (data.products) setProducts(data.products);
          if (data.brands) setBrands(data.brands);
          if (data.quantities) setQuantities(data.quantities);
        }
      } catch (err) {
        console.log('Using local static catalog fallback. Backend not running yet or unreachable.');
      }
    };
    fetchCatalog();
  }, []);

  const validateEmail = (emailStr: string) => {
    return /\S+@\S+\.\S+/.test(emailStr);
  };

  const handleSubmit = async () => {
    setErrorMsg('');
    if (!name.trim()) return setErrorMsg('Full Name is required');
    if (!phone.trim() || phone.trim().length < 10) return setErrorMsg('Valid 10-digit Phone is required');
    if (!email.trim() || !validateEmail(email)) return setErrorMsg('Valid Email is required');
    if (!product) return setErrorMsg('Please select a product');
    if (!brand) return setErrorMsg('Please select a brand');
    if (!quantity) return setErrorMsg('Please select a per-day quantity');

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          product,
          brand,
          quantity,
          message,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setName('');
        setPhone('');
        setEmail('');
        setProduct('');
        setBrand('');
        setQuantity('');
        setMessage('');
        onSuccess?.();
      } else {
        const text = await response.text();
        setErrorMsg(text || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error: Unable to connect to server. Check if backend is running on port 8080.');
    } finally {
      setLoading(false);
    }
  };

  const renderDropdownModal = () => {
    if (!activeDropdown) return null;

    let data: string[] = [];
    let title = '';
    let onSelect = (val: string) => {};

    if (activeDropdown === 'product') {
      data = products;
      title = 'Select Product';
      onSelect = (val) => { setProduct(val); setActiveDropdown(null); };
    } else if (activeDropdown === 'brand') {
      data = brands;
      title = 'Select Brand';
      onSelect = (val) => { setBrand(val); setActiveDropdown(null); };
    } else if (activeDropdown === 'quantity') {
      data = quantities;
      title = 'Select Quantity';
      onSelect = (val) => { setQuantity(val); setActiveDropdown(null); };
    }

    return (
      <Modal
        visible={true}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setActiveDropdown(null)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setActiveDropdown(null)}>
          <View style={[styles.modalContent, { backgroundColor: colors.background, borderColor: colors.border }]}>
            <ThemedText type="defaultSemiBold" style={[styles.modalTitle, { color: colors.primary }]}>{title}</ThemedText>
            <FlatList
              data={data}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={({ pressed }) => [
                    styles.modalItem,
                    { backgroundColor: pressed ? colors.backgroundSelected : 'transparent' }
                  ]}
                  onPress={() => onSelect(item)}
                >
                  <ThemedText style={{ color: colors.text }}>{item}</ThemedText>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, borderColor: colors.border }]}>
      <ThemedText type="defaultSemiBold" style={[styles.formHeader, { color: colors.primary }]}>
        Have Questions? Get in Touch!
      </ThemedText>
      <ThemedText type="small" style={[styles.formSub, { color: colors.textSecondary }]}>
        Submit your bulk B2B delivery inquiry. Minimum daily order limit is 12 Liters / 10 Kilograms.
      </ThemedText>

      {errorMsg ? (
        <View style={styles.errorBox}>
          <ThemedText style={styles.errorText}>⚠️ {errorMsg}</ThemedText>
        </View>
      ) : null}

      {success ? (
        <View style={[styles.successBox, { backgroundColor: colors.primary + '15' }]}>
          <ThemedText type="defaultSemiBold" style={{ color: colors.primary }}>🎉 Submission Successful!</ThemedText>
          <ThemedText type="small" style={{ color: colors.textSecondary, marginTop: Spacing.one }}>
            Thank you for reaching out. Our representative will contact you shortly to review your pricing options.
          </ThemedText>
          <Pressable style={[styles.okBtn, { backgroundColor: colors.primary }]} onPress={() => setSuccess(false)}>
            <ThemedText style={styles.okBtnText}>New Inquiry</ThemedText>
          </Pressable>
        </View>
      ) : (
        <View style={styles.form}>
          <TextInput
            placeholder="Your Name"
            placeholderTextColor={colors.textSecondary}
            value={name}
            onChangeText={setName}
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          />

          <View style={styles.row}>
            <TextInput
              placeholder="Mobile Number"
              placeholderTextColor={colors.textSecondary}
              value={phone}
              keyboardType="phone-pad"
              onChangeText={setPhone}
              style={[styles.input, styles.halfInput, { borderColor: colors.border, color: colors.text }]}
            />
            <TextInput
              placeholder="Email Address"
              placeholderTextColor={colors.textSecondary}
              value={email}
              keyboardType="email-address"
              onChangeText={setEmail}
              style={[styles.input, styles.halfInput, { borderColor: colors.border, color: colors.text }]}
            />
          </View>

          {/* Selectors */}
          <View style={styles.row}>
            <Pressable
              onPress={() => setActiveDropdown('product')}
              style={[styles.input, styles.halfInput, styles.selector, { borderColor: colors.border }]}
            >
              <ThemedText style={{ color: product ? colors.text : colors.textSecondary }}>
                {product || 'Select Product'}
              </ThemedText>
              <ThemedText style={{ color: colors.textSecondary }}>▼</ThemedText>
            </Pressable>

            <Pressable
              onPress={() => setActiveDropdown('brand')}
              style={[styles.input, styles.halfInput, styles.selector, { borderColor: colors.border }]}
            >
              <ThemedText style={{ color: brand ? colors.text : colors.textSecondary }}>
                {brand || 'Select Brand'}
              </ThemedText>
              <ThemedText style={{ color: colors.textSecondary }}>▼</ThemedText>
            </Pressable>
          </View>

          <Pressable
            onPress={() => setActiveDropdown('quantity')}
            style={[styles.input, styles.selector, { borderColor: colors.border }]}
          >
            <ThemedText style={{ color: quantity ? colors.text : colors.textSecondary }}>
              {quantity || 'Per Day Quantity'}
            </ThemedText>
            <ThemedText style={{ color: colors.textSecondary }}>▼</ThemedText>
          </Pressable>

          <TextInput
            placeholder="Your Message (Optional)"
            placeholderTextColor={colors.textSecondary}
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            style={[styles.input, styles.textarea, { borderColor: colors.border, color: colors.text }]}
          />

          <Pressable
            onPress={handleSubmit}
            disabled={loading}
            style={({ pressed }) => [
              styles.submitBtn,
              { backgroundColor: colors.primary, opacity: pressed || loading ? 0.9 : 1 }
            ]}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <ThemedText style={styles.submitBtnText}>Send Message ➜</ThemedText>
            )}
          </Pressable>
        </View>
      )}

      {renderDropdownModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: Spacing.four,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  formHeader: {
    fontSize: 22,
    marginBottom: Spacing.one,
  },
  formSub: {
    marginBottom: Spacing.three,
    lineHeight: 18,
  },
  form: {
    gap: Spacing.two,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    fontSize: 14,
    height: 44,
    justifyContent: 'center',
  },
  halfInput: {
    flex: 1,
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
    paddingVertical: Spacing.two,
  },
  submitBtn: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  errorBox: {
    backgroundColor: '#FFF5F5',
    padding: Spacing.two,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FEB2B2',
    marginBottom: Spacing.two,
  },
  errorText: {
    color: '#C53030',
    fontSize: 13,
  },
  successBox: {
    padding: Spacing.four,
    borderRadius: 12,
    alignItems: 'center',
    gap: Spacing.two,
  },
  okBtn: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    borderRadius: 8,
    marginTop: Spacing.three,
  },
  okBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    maxHeight: 400,
    borderRadius: 16,
    borderWidth: 1,
    padding: Spacing.three,
  },
  modalTitle: {
    fontSize: 16,
    marginBottom: Spacing.two,
    textAlign: 'center',
  },
  modalItem: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: 8,
    marginVertical: 2,
  },
});
