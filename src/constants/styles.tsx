import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
        backgroundColor: '#fff'
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold'
      },
      groupList: {
        gap: 15
      },
      groupCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#D96F67',
        borderRadius: 20,
        height: 80,
        paddingHorizontal: 15
      },
      groupInfo: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12
      },
      groupName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
      },
      arrow: {
        fontSize: 22,
        fontWeight: '900'
      },
      addButton: {
        marginTop: 10,
        marginBottom: 30,
        backgroundColor: '#3C2A7D',
        paddingVertical: 14,
        borderRadius: 20,
        alignItems: 'center'
      },
      addButtonText: {
        color: '#fff',
        fontSize: 18
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
      },
      modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        width: '80%',
        alignItems: 'center'
      },
      input: {
        width: '100%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15
      },
      modalButton: {
        backgroundColor: '#3b0764',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 15
      },
      modalButtonText: {
        color: '#fff',
        fontSize: 16
      },
      contactList: {
        maxHeight: 150,
        width: '100%',
        marginBottom: 10
      },
      contactItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 8
      },
      contactSelected: {
        backgroundColor: '#c4b5fd',
        borderColor: '#7c3aed'
      },
      contactText: {
        fontSize: 16
      },
      headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      logoContainer: {
        flex: 1,
        alignItems: 'flex-start',
      },
      logo: {
        height: 40,
        width: 120,
      },
      profileButton: {
        padding: 4,
      }
});
