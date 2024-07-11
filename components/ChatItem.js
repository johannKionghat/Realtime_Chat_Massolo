import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { blurhash, formatDate, getRoomId } from '../utils/common';
import { router } from 'expo-router';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function ChatItem({ item, noBorder, currentUser }) {
    const [lastMessage, setLastMessage]=useState(undefined);
    useEffect(()=>{
     // fetch all messages
      let roomId = getRoomId(currentUser?.userId, item?.userId)
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      const q = query(messagesRef,orderBy('createdAt', 'desc'));

      let unsub = onSnapshot(q, (snapshot)=>{
          let allMessages = snapshot.docs.map(doc=>{
            return doc.data();
          });
          setLastMessage(allMessages[0]?allMessages[0]:null);
      })
      return unsub;
    },[]);

    console.log('curent user: ', currentUser)

    const borderBottomWidth = noBorder ? 0 : 1;
    const openChatRoom = ()=>{
        router.push({pathname: '/chatRoom', params:item});
    }

    const renderTime = ()=>{
      if(lastMessage){
        let date = lastMessage?.createdAt;
        return formatDate(new Date(date?.seconds * 1000));
      }
    }

    const renderLastMessage = ()=>{
      if(typeof lastMessage == undefined)return 'Loading...';
      if(lastMessage){
        if(currentUser?.userId==lastMessage?.userId)return "You: "+lastMessage?.text;
        return lastMessage?.text;
      }else{
        return 'Say Hi !'
      }
    }

  return (
    <TouchableOpacity onPress={openChatRoom} style={[styles.container,{borderBottomWidth}]}>
      <Image
        style={{height: hp(6), width: hp(6), borderRadius: 100}}
        source={item?.profileUrl}
        placeholder={blurhash}
        transition={500}
        />
      <View style={styles.textContainer}>
        <View style={styles.textRow}>
          <Text style={{fontSize: hp(1.8)}} className="font-semibold text-neutral-800">{item?.username}</Text>
          <Text style={{fontSize: hp(1.6)}} className="font-medium text-neutral-500">
            {renderTime()}
          </Text>
        </View>
        <Text style={{fontSize: hp(1.6)}} className="font-medium text-neutral-500">
          {renderLastMessage()}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    alignItems: 'center',
    marginBottom: hp(1),
    paddingBottom: hp(1),
    borderBottomColor: '#e0e0e0',
  },
  avatar: {
    borderRadius: hp(3),
  },
  textContainer: {
    flex: 1,
    marginLeft: wp(3),
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
