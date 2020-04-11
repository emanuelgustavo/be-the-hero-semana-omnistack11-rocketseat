import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },

  logoImage: {
    margin: 24,
  },

  title: {
    fontSize: 42,
    fontWeight: "700",
    color: "#13131A",
  },

  text: {
    width: "90%",
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 32,
    color: "#737380",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 24,
  },

  TextInput: {
    width: "80%",
    height: 60,
    lineHeight: 32,
    fontSize: 20,
    backgroundColor: "#fff",
    borderColor: "#DCDCE6",
    borderStyle: "solid",
    borderRadius: 8,
    borderWidth: 1.5,
    color: "#A8A8B3",
    marginBottom: 10,
    paddingLeft: 10,
  },

  location: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  locationCity: {
    width: "78%",
  },

  locationUF: {
    width: "20%",
  },

  buttonRegister: {
    width: "80%",
    height: 60,
    backgroundColor: "#E02041",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 8,
    borderColor: "#E02041",
    marginTop: 10,
  },

  buttonRegisterText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },

  buttonBack: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },

  buttonBackText: {
    marginLeft: 10,
    fontSize: 18,
    color: "#E02041",
  },
});

export default styles;