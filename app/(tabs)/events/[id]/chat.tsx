import { Message } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  const onSend = useCallback(() => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      _id: Date.now(),
      text: inputText.trim(),
      createdAt: new Date(),
      user: { _id: 1, name: 'You' },
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText('');

    // Simulate support reply after 1 second
    setTimeout(() => {
      const reply: Message = {
        _id: Date.now() + 1,
        text: 'Thanks for your message! We’ll get back to you soon.',
        createdAt: new Date(),
        user: { _id: 2, name: 'Support' },
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  }, [inputText]);

  const renderMessage = ({ item }: { item: Message; }) => {
    const isUser = item.user._id === 1;
    return (
      <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.supportMessage]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timeText}>
          {item.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
        <Text style={styles.username}>{item.user.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#2ACE99', '#B8FAD6']} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Support Chat</Text>
      </LinearGradient>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item._id.toString()}
        style={styles.chatContainer}
        inverted
        contentContainerStyle={{ paddingBottom: 10 }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor="#888"
          onSubmitEditing={onSend}
          returnKeyType="send"
        />
        <TouchableOpacity style={styles.sendButton} onPress={onSend} disabled={!inputText.trim()}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FFF9',
    paddingBottom: 70,
  },
  header: {
    paddingTop: (StatusBar.currentHeight ?? 0) + 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 50,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Poppins-ExtraBold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  chatContainer: {
    backgroundColor: '#DCFDE7',
    padding: 10,
    flex: 1,
  },
  messageContainer: {
    maxWidth: '70%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  userMessage: {
    backgroundColor: '#2ACE99',
    alignSelf: 'flex-end',
  },
  supportMessage: {
    backgroundColor: '#B8FAD6',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    fontSize: 16,
  },
  username: {
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    fontSize: 12,
    marginTop: 5,
  },
  timeText: {
    fontFamily: 'Poppins-Regular',
    color: '#888',
    fontSize: 12,
    textAlign: 'right',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sendButton: {
    backgroundColor: '#2ACE99',
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
    justifyContent: 'center',
  },
  sendText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});