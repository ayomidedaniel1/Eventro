import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

export default function ChatScreen() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    // Simulate support reply after 1 second
    setTimeout(() => {
      const reply: IMessage = {
        _id: Date.now() + 1,
        text: 'Thanks for your message! We’ll get back to you soon.',
        createdAt: new Date(),
        user: { _id: 2, name: 'Support' },
      };
      setMessages((prev) => GiftedChat.append(prev, [reply]));
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2ACE99', '#B8FAD6']}
        style={styles.header}
      >
        <Text style={styles.headerText}>Support Chat</Text>
      </LinearGradient>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{ _id: 1, name: 'You' }}
        messagesContainerStyle={styles.chatContainer}
        placeholder="Type a message..."
        renderUsernameOnMessage={true}
        timeTextStyle={{ left: styles.timeText, right: styles.timeText }}
        maxComposerHeight={100}
        minInputToolbarHeight={50}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FFF9',
  },
  header: {
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
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
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
  timeText: {
    fontFamily: 'Poppins-Regular',
    color: '#888',
    fontSize: 12,
  },
});