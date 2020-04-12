import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },

  header: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 32,
    marginBottom: 18,
  },

  searchButton: {
    width: 120,
    height: 40,
    backgroundColor: "#E02041",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#E02041",
    borderWidth: 1.5,
    borderRadius: 8,
  },

  searchButtonText: {
    color: "#F0F0F5",
    fontSize: 16,
  },

  welcome: {
    width: "90%",
    fontSize: 20,
    color: "#414140",
    marginBottom: 18,
  },

  totalDonate: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 40,
    marginTop: 6,
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderWidth: 1.5,
    borderRadius: 8,
  },

  totalText: {
    fontSize: 20,
    color: "#737380",
  },

  titleRefresh: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    width: "90%",
    fontSize: 26,
    lineHeight: 32,
    marginTop: 12,
    marginBottom: 12,
  },

  emptyList: {
    width: "80%",
    fontSize: 20,
    textAlign: "center",
    marginTop: 32
  },

  list: {
    width: "90%",
    marginBottom: 30,
  },

  listItem: {
    width: "100%",
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 5,
  },

  listItemTitle: {
    width: "100%",
    fontSize: 16,
    color: "#41414D",
    fontWeight: "700",
    marginBottom: 10,
  },

  listItemText: {
    width: "100%",
    fontSize: 16,
    color: "#41414D",
    marginBottom: 10,
  },

  viewDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  viewDetailText: {
    color: "#E02041",
    fontSize: 16,
    marginLeft: 16,
  },
});

export default styles;