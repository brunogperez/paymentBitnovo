import React from 'react';
import { Text, Modal, StyleSheet, View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


export const ModalRequestSent = ({
    visible,
    onClose,
}) => {

    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
            animationType='fade'
            backdropColor='black'
        >
            <View style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
                backgroundColor: '#000000c0',
            }}>
                <View style={styles.modalContainer}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="checkmark-circle" size={80} color="#a5eff7" />
                    </View>
                    <View style={styles.modalContent}>
                        <Text style={styles.contentText}>
                            Solcitud enviada
                        </Text>
                        <Text style={styles.contentTextSub}>
                            Tu solicitud de pago ha sido enviado con éxito por Whatsapp.
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.confirmButton} onPress={onClose}>
                            <Text style={styles.confirmButtonText}>Entendido</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal >
    );
};

export default ModalRequestSent;

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#FFFFFF',
        paddingTop: 64,
        paddingBottom: 44,
        bottom: 0,
        height: 413,
        width: 354,
        borderRadius: 24,
        gap: 24,
        marginBottom: 10
    },
    iconContainer: {
        alignItems: 'center',
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap:15
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#035AC5',
        borderRadius: 5,
        height: 56,
        width: 320
    },
    confirmButtonText: {
        color: '#FFFFFF',
        marginRight: 10,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Mulish_600SemiBold'
    }
})

