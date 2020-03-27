import React from "react";
import { View, Image, Text, TouchableOpacity, Linking } from "react-native";
import logoImg from "../../assets/logo.png";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { composeAsync as asyncMailComposer } from "expo-mail-composer";
import { ScrollView } from "react-native-gesture-handler";

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;

  const formatedIncidentValue = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(incident.value);

  const message = `Olá ${incident.ong_whatsapp}, estou entrando em contato pois gostaria de ajudar no caso ${incident.title} com o valor de ${formatedIncidentValue}.`;

  function navegateBack() {
    navigation.goBack();
  }

  function sendMail() {
    asyncMailComposer({
      subject: `Heroi do caso: ${incident.title}`,
      recipients: [incident.ong_email],
      body: message
    });
  }
  function senWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=+${incident.ong}&text=${message}`);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navegateBack}>
          <Feather name="arrow-left" size={28} color="#e02041" />
        </TouchableOpacity>
      </View>
      <ScrollView
        marginTop={48}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.incident}>
          <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
          <Text style={styles.incidentValue}>
            {incident.ong_name} de {incident.ong_city} - {incident.ong_uf}
          </Text>

          <Text style={styles.incidentProperty}>CASO:</Text>
          <Text style={styles.incidentValue}>{incident.title}</Text>

          <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
          <Text style={styles.incidentValue}>{incident.description}</Text>

          <Text style={styles.incidentProperty}>VALOR:</Text>
          <Text style={styles.incidentValue}>{formatedIncidentValue}</Text>
        </View>
        <View style={styles.contactBox}>
          <Text style={styles.heroTitle}>Salve o dia!</Text>
          <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

          <Text style={styles.heroDescription}>Entre em contato:</Text>

          <View style={styles.actions}>
            <TouchableOpacity onPress={senWhatsapp} style={styles.actionButton}>
              <Text style={styles.actionButtonText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={sendMail} style={styles.actionButton}>
              <Text style={styles.actionButtonText}>E-mail</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
