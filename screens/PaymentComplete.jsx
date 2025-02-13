import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

const PaymentComplete = ({navigation}) => {
    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Ionicons name="checkmark-circle" size={100} color="#A7E8BF" />
                <Text style={styles.contentText}>
                    Pago recibido
                </Text>
                <Text style={styles.contentTextSub}>
                    El pago se ha confirmado con éxito.
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.confirmButton} onPress={() => { navigation.navigate('CreatePayment') }}>
                    <Text style={styles.confirmButtonText}>
                        Finalizar
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PaymentComplete

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    iconContainer: {
        alignItems: 'center',
        flex: 1
    },
    modalContent: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        height: 100
    },
    contentText: {
        fontSize: 24,
        color: '#002859',
        fontFamily: 'Mulish_700Bold'
    },
    contentTextSub: {
        fontSize: 16,
        color: '#647184',
        fontFamily: 'Mulish400_Regular',
        width: 314,
        textAlign: 'center'
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    confirmButton: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginVertical: 20,
        padding: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9FAFC',
        width: 339,
        gap: 8
    },
    confirmButtonText: {
        fontSize: 16,
        fontFamily: 'Mulish_600SemiBold',
        color: '#035AC5'
    },
})