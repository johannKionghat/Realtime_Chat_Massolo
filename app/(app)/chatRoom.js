import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import MessageList from '../../components/MessageList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import CustomKeyboardView from '../../components/CustomKeyboardView';
import { useAuth } from '../../context/authContext';
import { getRoomId } from '../../utils/common';
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Animated from 'react-native-reanimated';


export default function ChatRoom() {
    const item = useLocalSearchParams(); // secon user
    const {user} = useAuth(); // logged in user
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const textRef = useRef('');
    const inputRef = useRef(null);
    const scrollViewRef = useRef(null);
    useEffect(()=>{
      createRoomIfNoExists();

      // fetch all messages
      let roomId = getRoomId(user?.userId, item?.userId)
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      const q = query(messagesRef,orderBy('createdAt', 'asc'));

      let unsub = onSnapshot(q, (snapshot)=>{
          let allMessages = snapshot.docs.map(doc=>{
            return doc.data();
          });
          setMessages([...allMessages]);
      })
      const KeyboardDisShowListener = Keyboard.addListener(
        'keyboardDidShow', updateScrollView
      )
      return ()=>{
        unsub();
        KeyboardDisShowListener.remove();
      };
    },[]);

    useEffect(()=>{
      updateScrollView();
    },[messages])

    const updateScrollView = () => {
      setTimeout(() => {
        console.log(scrollViewRef.current);
          if (scrollViewRef.current) {
              scrollViewRef.current.scrollToEnd({ animated: true });
          }
      }, 100);
  };

    const createRoomIfNoExists = async ()=>{
      // roomId
      let roomId = getRoomId(user?.userId,item?.userId);
      await setDoc(doc(db, "rooms", roomId), {
        roomId,
        createdAt: Timestamp.fromDate(new Date())
      });
    };
    const handleSendMessage = async ()=>{
        let message = textRef.current.trim();
        if(!message) return;
        // send message
        try {
          let roomId = getRoomId(user?.userId, item?.userId);
          const docRef = doc(db, "rooms", roomId);
          const messagesRef = collection(docRef, "messages");
          textRef.current = "";
          if(inputRef) inputRef?.current?.clear();

          const newDoc = await addDoc(messagesRef, {
            userId: user?.userId,
            text: message,
            profileUrl: user?.profileUrl,
            senderName: user?.username,
            createdAt: Timestamp.fromDate(new Date()),
          })
        } catch (err) {
          Alert.alert('Message', err.message);
        }
    }
  return (
    <CustomKeyboardView inChat={true}>
      <View className='flex-1 bg-white'>
        <StatusBar style="dark"/>
        <ChatRoomHeader user={item} router={router}/>
        <View className="h-3 border-b border-neutral-300"/>
        <View className="flex-1 justify-between bg-neutral-100 overflow-visible" >
          <View className="flex-1" >
            <MessageList messages = {messages} currentUser={user} scrollViewRef={scrollViewRef}/>
          </View>
          <View style={{marginBottom : hp(2.7)}} className="pt-2">
              {/* input message */}
              <View className="flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5">
                <TextInput
                  ref={inputRef}
                  onChangeText={value=> textRef.current =value}
                  placeholder='Type message...'
                  style={{fontSize:hp(2)}}
                  className="flex-1 mr-2"
                />
                <TouchableOpacity onPress={handleSendMessage} style={styles.touchableOpacity}>
                    <FontAwesome name="send" size={hp(2.5)} color="white"/>
                </TouchableOpacity>
              </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  )
}
const styles=StyleSheet.create({
  touchableOpacity:{
    backgroundColor:"#00acab",
    padding:8,
    marginRight:1,
    borderRadius:100
  }
})