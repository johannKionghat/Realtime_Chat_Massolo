import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { blurhash } from '../utils/common';
import { router } from 'expo-router';

export default function ChatItem({ item, noBorder }) {
    const borderBottomWidth = noBorder ? 0 : 1;
    const openChatRoom = ()=>{
        router.push({pathname: '/chatRoom', params:item});
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
          <Text style={{fontSize: hp(1.6)}} className="font-medium text-neutral-500">Time</Text>
        </View>
        <Text style={{fontSize: hp(1.6)}} className="font-medium text-neutral-500">Last message</Text>
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
