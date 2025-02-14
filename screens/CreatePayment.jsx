import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { ModalCustom } from '../components/ModalCustom'
import { MaterialIcons } from '@expo/vector-icons'
import { createOrder } from '../services/api';
import { useNavigation } from '@react-navigation/native'
import { currencies } from '../services/currencies'


export const CreatePayment = () => {

    const navigation = useNavigation();
    const [amount, setAmount] = useState("");
    const [concept, setConcept] = useState("");
    const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
    const [showSelector, setShowSelector] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const [inputHeight, setInputHeight] = useState(80);
    const isAmountEmpty = amount.trim() === "";


    const handleCurrencySelect = (currency) => {
        setSelectedCurrency(currency);
        setShowSelector(true);
    };

    const handleTextChange = (text) => {
        if (text.length <= 140) {
            setConcept(text);
            setCharCount(text.length);
        }
    };

    const handleContentSizeChange = (contentWidth, contentHeight) => {
        setInputHeight(Math.min(Math.max(contentHeight, 80), 150));
    };

    const handleCreateOrder = async () => {
        try {
            const orderData = {
                expected_output_amount: amount,
                reference: concept,
                fiat: selectedCurrency.abbreviation,
                language: "ES",
            };
            const orderResult = await createOrder(orderData);
            navigation.navigate("Application", { orderResult, orderData, selectedCurrency });
        } catch (error) {
            Alert.alert("Error", error.response?.data?.message || error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ ...styles.headerTitle }}>Crear pago</Text>
                <TouchableOpacity style={styles.currencySelector} onPress={handleCurrencySelect}>
                    <Text style={styles.currencyText}>
                        {selectedCurrency.abbreviation || "USD"}
                    </Text>
                    <MaterialIcons name="keyboard-arrow-down" size={24} color="#002859" />
                </TouchableOpacity>
            </View>
            <View style={[styles.amountContainer, { flexDirection: selectedCurrency.abbreviation === "EUR" ? "row-reverse" : "row" }]}>
                <Text style={[styles.dollarSign, { color: amount.trim() === "" ? '#C0CCDA' : '#035AC5' }]}>
                    {selectedCurrency.symbol || "$"}
                </Text>
                <TextInput
                    style={[styles.dollarSign, { color: amount.trim() === "" ? '#C0CCDA' : '#035AC5' }]}
                    keyboardType='decimal-pad'
                    placeholder='0.00'
                    placeholderTextColor={amount.trim() === "" ? '#C0CCDA' : '#035AC5'}
                    value={amount}
                    onChangeText={setAmount}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Concepto</Text>
                <View style={styles.container}>
                    <TextInput
                        multiline
                        style={[styles.input, { height: inputHeight }]}
                        placeholder="Añade descripción del pago"
                        value={concept}
                        onChangeText={handleTextChange}
                        onContentSizeChange={handleContentSizeChange}
                    />
                    <Text style={styles.charCount}>{charCount}/140 caracteres</Text>
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <TouchableOpacity
                    style={{ ...styles.continueButton, backgroundColor: isAmountEmpty ? '#f0f4ff' : '#035AC5' }}
                    disabled={isAmountEmpty}
                    onPress={handleCreateOrder}
                >
                    <Text style={{ ...styles.continueText, color: isAmountEmpty ? '#71B0FD' : '#FFFFFF' }} >Continuar</Text>
                </TouchableOpacity>
            </View>
            <ModalCustom
                visible={showSelector}
                onClose={() => setShowSelector(false)}
                onSelect={handleCurrencySelect}
                items={currencies}
                selectedItem={selectedCurrency}
            />
        </View >
    )
}

export default CreatePayment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        alignContent: 'space-between',
        flexDirection: 'column',
        paddingHorizontal: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 30 : 0,

    },
    headerTitle: {
        textAlign: 'center',
        fontSize: 24,
        color: '#002859',
        alignItems: 'center',
        fontFamily: 'Mulish_800ExtraBold',
    },
    currencySelector: {
        position: 'absolute',
        right: 10,
        top: StatusBar.currentHeight + 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 24,
        backgroundColor: '#D3DCE64D',
    },
    currencyText: {
        fontSize: 16,
        marginRight: 4,
        color: '#002859',
        fontFamily: 'Mulish_800ExtraBold',
    },
    amountContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        minHeight: 70,
        flex: 0.5,
    },
    dollarSign: {
        fontSize: 40,
        marginRight: 4,
    },
    amount: {
        fontSize: 40,
    },
    inputContainer: {
        marginTop: 30,
        paddingHorizontal: 16,
        height: 200,
        fontFamily: 'Mulish_400Regular',
        flex: 2,
    },
    label: {
        fontSize: 16,
        color: '#002859',
        marginBottom: 8,
        fontFamily: 'Mulish_800ExtraBold',
    },
    input: {
        borderWidth: 1,
        height: 56,
        borderRadius: 6,
        borderColor: '#D3DCE6',
        paddingHorizontal: 16,
        fontSize: 14,
        fontFamily: 'Mulish_400Regular',
        minHeight: 56,
        color: '#002859',
        lineHeight: 20,
        fontSize: 16,
        paddingTop: 18,
        paddingBottom: 18,
    },
    continueButton: {
        marginHorizontal: 16,
        marginVertical: 20,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 56,
    },
    continueText: {
        fontSize: 16,
        fontFamily: 'Mulish_600SemiBold',
    },
    charCount: {
        marginver: 8,
        fontSize: 12,
        fontFamily: 'Mulish_400Regular',
        alignSelf: 'flex-end',
    }
})