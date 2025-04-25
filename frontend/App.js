import { StatusBar } from 'expo-status-bar';
import {  
  View, 
  SafeAreaView, 
  TextInput, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform,
  TouchableOpacity,
  Text,
  ActivityIndicator
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { getAnswerApi } from './services/api';
import { useState,useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/AppStyles';

export default function App() {
  const flatListRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!inputText.trim() || loading) return;
    
    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
     
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);
    
    try {
      const { response, result } = await getAnswerApi(inputText);
      
      // Process the response to separate code blocks and regular text
      const botMessage = {
        id: Date.now() + 1,
        text: result.text,
        sender: 'bot',
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch(err) {
      console.log(err);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
      }]);
    } finally {
      setLoading(false);
    }
  };


  const renderMessageItem = ({ item }) => {
    const parts = item.text.split(/(```[\s\S]*?```)/g);
  
    const handleCopy = (text) => {
      Clipboard.setStringAsync(text);
    };
  
    return (
      <View style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userMessage : styles.botMessage
      ]}>
        {parts.map((part, index) => {
          const isCode = part.startsWith('```') && part.endsWith('```');
          if (isCode) {
            const code = part.slice(3, -3).trim();
            return (
              <View key={index} style={styles.codeBlockContainer}>
                <TouchableOpacity 
                  style={styles.copyIconContainer}
                  onPress={() => handleCopy(code)}
                >
                  <Ionicons name="copy-outline" size={18} color="#ccc" />
                </TouchableOpacity>
                <Text style={styles.codeText}>{code}</Text>
              </View>
            );
          } else {
            return (
              <Text key={index} style={styles.messageText}>
                {part.trim()}
              </Text>
            );
          }
        })}
      </View>
    );
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Gemini Chat</Text>
      </View>
      
      {/* Chat messages */}
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.messagesContainer}
        inverted={false}
        ref={flatListRef}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      
      {/* Input area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          placeholderTextColor="#888"
          multiline
        />
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSend}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Ionicons name="send" size={24} color="#fff" />
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

