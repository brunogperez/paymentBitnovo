import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, Modal, StyleSheet, View, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const ModalQRCode = ({
    web_url,
    isVisible,
    onClose,
    selectedCurrency,
    orderData
}) => {

    const qrValue = web_url

    return (
        <Modal
            visible={isVisible}
            onRequestClose={onClose}
            animationType='fade'
        >
            <View style={styles.modalContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <MaterialIcons name="arrow-back" size={24} color="#002859" />
                    </TouchableOpacity>
                </View>
                <View style={styles.modalContent}>
                    <View style={styles.advertisement}>
                        <MaterialCommunityIcons name="information" size={24} color="#002859" opacity={0.4} />
                        <Text style={styles.advertisementText}>
                            Escanea el QR y serás redirigido a la pasarela de pago de Bitnovo Pay
                        </Text>
                    </View>
                    <View style={styles.qrContainer}>
                        <QRCode
                            value={qrValue}
                            size={300}
                            color="black"
                            backgroundColor="white"
                        />
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.footerTextAmount}>
                            {selectedCurrency.symbol} {orderData.expected_output_amount}
                        </Text>
                        <Text style={styles.footerText}>
                            Esta pantalla se actualizará automáticamente.
                        </Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ModalQRCode;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    header: {
        height: 80,
        width: 339,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 16,
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: '#EFF2F7',
        height: 28,
        width: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        flex: 4,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#035AC5',
        gap: 20,
        width: '100%'
    },
    advertisement: {
        height: 70,
        width: 339,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 20,
        backgroundColor: '#EFF2F7',
        borderRadius: 6,
        gap: 8
    },
    advertisementText: {
        color: '#002859',
        fontSize: 12,
        fontFamily: 'Mulish_400Regular',
        lineHeight: 16
    },
    qrContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 339,
    },
    footer: {
        width: 339,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 25,
        flex: 1
    },
    footerTextAmount: {
        marginTop: 20,
        color: '#EFF2F7',
        fontSize: 26,
        fontFamily: 'Mulish_800ExtraBold',
    },
    footerText: {
        color: '#EFF2F7',
        fontSize: 14,
        fontFamily: 'Mulish_400Regular',
        lineHeight: 41,
    },
})

