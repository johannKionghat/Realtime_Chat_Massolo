import { View, Text } from 'react-native'
import React from 'react'
import AnimatedLottieView from 'lottie-react-native'

export default function Loading({size}) {
  return (
    <View style={{height:size, aspectRatio:1}}>
        <AnimatedLottieView style={{flex:1}} source={require('../assets/images/loader.json')} autoPlay loop/>
    </View>
  )
}