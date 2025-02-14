// @ts-ignore
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { ModalCustom } from '../components/ModalCustom';
import ModalQRCode from '../components/ModalQRCode';
import { countries } from '../services/countries';
import ModalRequestSent from '../components/ModalRequestSent'
import { apiKEY, xDeviceID } from '../services/enviroment';



const ApplicationScreen = ({ navigation, route }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [showSelector, setShowSelector] = useState(false);
    const [isModalQRVisible, setIsModalQRVisible] = useState(false);
    const [isModalReqVisible, setIsModalReqVisible] = useState(false);

    const { orderResult, orderData, selectedCurrency } = route.params;
    const { web_url, identifier } = orderResult;

    console.log(web_url)

    const ws = useRef(null);

    useEffect(() => {

        ws.current = new WebSocket(`wss://payments.pre-bnvo.com/ws/merchant/${identifier}`, {
            headers: {
                "X-Device-Id": `${xDeviceID}`,
                "X-API-Key": `${apiKEY}`,
            }
        });
        ws.current.onopen = () => {
            console.log('Conexión WebSocket abierta');
            ws.current.send('Hola, servidor!');
        };
        ws.current.onmessage = (event) => {

            try {
                const message = JSON.parse(event.data);
                const status = message.status;
                if (status === 'CO') {
                    navigation.navigate('PaymentComplete')
                }
            } catch (err) {
                console.log('No se pudo parsear el mensaje:', event.data);
            }
        };
        ws.current.onerror = (event) => {
            console.log('Error WebSocket:', event.message);
        };
        ws.current.onclose = (event) => {
            console.log('Conexión WebSocket cerrada:', event.code, event.reason);
        };
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [identifier]);

    const handleItemSelect = (country) => {
        setSelectedCountry(country);
        setShowSelector(true);
    };

    const handleSentWhatsapp = () => {
        setIsModalReqVisible(true)
        setIsEditing(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainerMain}>
                <View style={styles.headerContainer}>
                    <View>
                        <MaterialIcons name='wallet' size={48} color='#035AC5' opacity={0.5} />
                    </View>
                    <View>
                        <Text style={styles.headerTitle}>
                            Solicitud de pago
                        </Text>
                        <View style={styles.headerAmount}>
                            <View style={{ gap: 8, flexDirection: selectedCurrency.symbol === "€" ? "row-reverse" : "row" }}>
                                <Text style={styles.headerAmountText}>
                                    {selectedCurrency.symbol}
                                </Text>
                                <Text style={styles.headerAmountText}>
                                    {orderData.expected_output_amount}
                                </Text>

                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.headerText}>
                        Comparte el enlace de pago con el cliente
                    </Text>
                </View>
            </View>
            <View style={styles.shareContainer}>
                <View style={{ alignItems: 'center', justifyContent: 'center', gap: 16, flexDirection: 'row', width: '100%' }}>
                    <TouchableOpacity style={{ ...styles.shareButton, width: 267 }} >
                        <Ionicons name="link" size={20} color='#035AC5'  />
                        <Text style={styles.shareText}>
                            {web_url ? web_url.replace(/^https?:\/\//, "") : ""}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.qrButton} onPress={() => setIsModalQRVisible(true)} >
                        <FontAwesome5 name="qrcode" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.shareButton} >
                    <Ionicons name="mail" size={20} color='#035AC5'  />
                    <Text style={styles.shareText}>
                        Enviar por correo electrónico
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareButton} onPress={() => setIsEditing(true)}>
                    <FontAwesome name="whatsapp" size={20} color='#035AC5'  />
                    {isEditing ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 16 }}>
                            <TouchableOpacity style={styles.selector} onPress={handleItemSelect} >
                                <Text style={styles.currencyText}>
                                    {selectedCountry.abbreviation || "+34"}
                                </Text>
                                <MaterialIcons name="keyboard-arrow-down" size={24} color="#002859" />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.phoneInput}
                                keyboardType="phone-pad"
                                placeholder="200 5869 75423"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                            />
                            <TouchableOpacity style={styles.sendButton} onPress={handleSentWhatsapp}>
                                <Text style={styles.sendText}>Enviar</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View>
                            <Text style={styles.shareText}>
                                Enviar por Whatsapp
                            </Text>
                        </View>
                    )
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareButton}>
                    <Ionicons name="share" size={20} color='#035AC5'  />
                    <Text style={styles.shareText}>
                        Compartir con otras aplicaciones
                    </Text>
                </TouchableOpacity>
            </View >
            <View style={{ justifyContent: 'flex-end' }}>
                <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('CreatePayment')}>
                    <Text style={styles.continueText}>Nueva solicitud</Text>
                    <MaterialIcons name='wallet' size={24} color='#035AC5' />
                </TouchableOpacity>
            </View>
            <ModalCustom
                visible={showSelector}
                onClose={() => setShowSelector(false)}
                onSelect={handleItemSelect}
                items={countries}
                selectedItem={selectedCountry}
            />
            <ModalQRCode
                web_url={web_url}
                isVisible={isModalQRVisible}
                onClose={() => setIsModalQRVisible(false)}
                selectedCurrency={selectedCurrency}
                orderData={orderData}
            />
            <ModalRequestSent
                onClose={() => setIsModalReqVisible(false)}
                visible={isModalReqVisible}
                style={{ alignItems: 'center' }}
            />
        </View >
    )
}

export default ApplicationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    headerContainerMain: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F9FAFC',
        width: 339,
        minHeight: 114,
        borderRadius: 12,
        marginTop: StatusBar.currentHeight + 30,
        paddingBottom: 18,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        gap: 8,
    },
    headerTitle: {
        fontSize: 16,
        color: '#647184',
        fontFamily: 'Mulish_400Regular',
    },
    headerAmount: {
        alignItems: 'flex-start',
    },
    headerAmountText: {
        fontSize: 34,
        color: '#002859',
        fontFamily: 'Mulish_700Bold',
    },
    headerText: {
        color: '#647184',
        fontFamily: 'Mulish_400Regular',
    },
    shareContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 20,
        gap: 20
    },
    shareButton: {
        flexDirection: 'row',
        height: 56,
        width: 339,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: '#D3DCE6',
        paddingHorizontal: 18,
        paddingVertical: 16,
    },
    shareText: {
        color: '#002859',
        fontFamily: 'Mulish_400Regular',
        fontSize: 15,
        marginLeft: 10,
    },
    qrButton: {
        height: 56,
        width: 56,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#035AC5',
    },
    continueButton: {
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
    continueText: {
        fontSize: 16,
        fontFamily: 'Mulish_600SemiBold',
        color: '#035AC5'
    },
    phoneInput: {
        height: 56,
        margin: 16,
        fontSize: 14,
        fontFamily: 'Mulish_400Regular',
        minHeight: 56,
        color: '#002859',
        lineHeight: 20,
        fontSize: 14,
        paddingTop: 18,
        paddingBottom: 18,
        flex: 1,
    },
    sendButton: {
        height: 24,
        width: 53,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#035AC5',
    },
    sendText: {
        color: '#FFFFFF',
        fontFamily: 'Mulish_400Regular',
        fontSize: 12,
    },
    selector: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})