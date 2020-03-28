import { StyleSheet } from "react-native";
import Constants from "expo-constants";
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  incident: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 16
  },

  incidentProperty: {
    fontSize: 14,
    color: "#41414d",
    fontWeight: "bold",
    marginTop: 24
  },
  incidentValue: {
    marginTop: 8,
    fontSize: 15,
    color: "#737380"
  },
  contactBox: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 16
  },
  actions: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between"
  },
  heroTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#13131a",
    lineHeight: 30
  },
  heroDescription: {
    fontSize: 15,
    color: "#737380",
    marginTop: 16
  },
  actionButton: {
    width: "48%",
    backgroundColor: "#E02041",
    borderRadius: 8,
    height: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  actionButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold"
  }
});
