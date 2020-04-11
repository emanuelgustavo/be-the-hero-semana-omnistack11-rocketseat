import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 36
  },

  logoImage: {
    margin: 12,
  },

  heroesImage: {
    margin: 24,
  },

  textInput: {
    width: "75%",
    height: 60,
    marginTop: 36,
    padding: 2,
    lineHeight: 40,
    fontSize: 22,
    borderColor: "#DCDCE6",
    borderRadius: 8,
    borderWidth: 1.5,
    backgroundColor: "#fff",
    color: "#DCDCE6",
    paddingLeft: 10,
  },

  entryButton: {
    width: "75%",
    height: 60,
    marginTop: 10,
    backgroundColor: "#E02041",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#DCDCE6",
    borderRadius: 8,
    borderWidth: 1.5,
  },

  entryButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },

  registerButton: {
    marginTop: 20,
    width: "75%",
    flexDirection: "row",
    alignItems: "center",
  },

  registerButtonText: {
    color: "#E02041",
    fontWeight: "500",
    fontSize: 18,
    marginLeft: 10,
  },
});

export default styles;