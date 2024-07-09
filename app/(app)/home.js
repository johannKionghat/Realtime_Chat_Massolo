import { View, Text, Button, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/authContext';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ActivityIndicator } from 'react-native';
import ChatList from '../../components/ChatList';
import Loading from '../../components/Loading'
import { usersRef } from '../../firebaseConfig';
import { getDocs, query, where } from 'firebase/firestore';

export default function home() {
    const {logout, user} = useAuth();
    const [users, setUsers] = useState([])
    useEffect(()=>{
      if (user?.uid)
        getUsers();
    },[])
    const getUsers = async ()=>{
      // fetch users
      const q = query (usersRef, where('userId', '!=', user?.uid))

      const querySnapShot= await getDocs(q);
      let data = [];
      querySnapShot.forEach(doc=>{
        data.push({...doc.data()})
      });

      setUsers(data);
    }
  return (
    <View className='flex-1 bg-white'>
        {
          users.length>0?(
              <ChatList users={users} />
          ):(
            <View className="flex items-center" style={{top: hp(30)}}>
              <Loading size={hp(10)}/>
            </View>
          )
        }      
    </View>
  )
}