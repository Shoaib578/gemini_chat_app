import { StyleSheet, Platform, StatusBar  } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
    },
    header: {
        backgroundColor: '#1e1e1e',
        padding: 16,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 48, // iOS default
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    headerText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    messagesContainer: {
      padding: 16,
      paddingBottom: 80,
    },
    messageContainer: {
      maxWidth: '80%',
      padding: 12,
      borderRadius: 12,
      marginBottom: 8,
    },
    userMessage: {
      backgroundColor: '#2a2a2a',
      alignSelf: 'flex-end',
      borderTopRightRadius: 0,
    },
    botMessage: {
      backgroundColor: '#1e1e1e',
      alignSelf: 'flex-start',
      borderTopLeftRadius: 0,
    },
    messageText: {
      color: '#fff',
      fontSize: 16,
      lineHeight: 22,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
      backgroundColor: '#1e1e1e',
      borderTopWidth: 1,
      borderTopColor: '#333',
    },
    input: {
      flex: 1,
      backgroundColor: '#2a2a2a',
      color: '#fff',
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 10,
      maxHeight: 120,
      marginRight: 8,
    },
    sendButton: {
      backgroundColor: '#3a3a3a',
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    codeBlockContainer: {
      backgroundColor: '#252525',
      borderRadius: 8,
      padding: 12,
      marginVertical: 8,
      overflow: 'hidden',
    },
    codeText: {
      fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
      fontSize: 14,
      color: '#f8f8f8',
      lineHeight: 20,
    },
    copyIconContainer: {
      position: 'absolute',
      top: 8,
      right: 8,
      zIndex: 1,
    },
    
  });

  export default styles