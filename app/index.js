import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import Loading from '../components/Loading'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function startPage() {
  return (
    <View className="flex-1 justify-center items-center">
        <Loading size={hp(20)}/>
    </View>
  )
}