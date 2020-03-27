import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, FlatList } from "react-native";
import logoImg from "../../assets/logo.png";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";

export default function Incidents() {
  const navigation = useNavigation();
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  function refreshIncidents() {
    setRefreshing(true);
    loadIncidents(true);
  }
  async function loadIncidents(refresh) {
    if (loading || (total > 0 && incidents.length === total)) {
      return;
    }
    setLoading(true);
    try {
      const response = await api.get("/incidents", {
        params: {
          page: refresh === true ? 1 : nextPage
        }
      });
      setTotal(response.headers["x-total-count"]);
      if (refresh == true) {
        setIncidents(response.data);
        setNextPage(2);
      } else {
        setIncidents(old => [...old, ...response.data]);
        setNextPage(nextPage + 1);
      }
    } catch (err) {
      alert(
        "Erro ao se comunicar com o servidor. Verifique se o mesmo está online"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }
  useEffect(() => {
    loadIncidents();
  }, []);
  function navegateToDetail(incident) {
    navigation.navigate("details", { incident });
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>
        </Text>
      </View>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos a baixo e salve o dia
      </Text>
      <FlatList
        style={styles.incidentList}
        keyExtractor={incident => `key-${incident.id}`}
        // showsVerticalScrollIndicator={false}
        onRefresh={refreshIncidents}
        refreshing={refreshing}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        onStart
        data={incidents}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.ong_name}</Text>
            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>
            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </Text>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => {
                navegateToDetail(incident);
              }}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
