import { View, Text, Button, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext';

export default function home() {
    const {logout, user} = useAuth();
    const handleLogout  = async ()=>{
        await logout();
    }
    console.log('user: ', user);
  return (
    <View>
      <Text>home</Text>
      <Pressable onPress={handleLogout}>
            <Text>Sign Out</Text>
      </Pressable>
    </View>
  )
}