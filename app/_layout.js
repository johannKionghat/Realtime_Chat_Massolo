import { Slot, useRouter, useSegments } from 'expo-router';
import { View } from 'react-native';
import "../global.css"
import { useEffect } from 'react';
import { AuthContextProvider, useAuth } from '../context/authContext';


const MainLayout = ()=>{
    const {isAuthenticated} = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(()=>{
        // check if user is authenticated or not
        if(typeof isAuthenticated=='undefined') return;
        const inApp = segments[0]=='(app)';
        if ( isAuthenticated && !inApp ){
            // redirect user to home
            router.replace('home');
        }else if (isAuthenticated==false){
            // redirect user to signIn page
            router.replace('signIn');
        }
    },[isAuthenticated])

    return <Slot/>
}

export default function RootLayout() {
  return (
    <AuthContextProvider>
        <MainLayout/>
    </AuthContextProvider>
  );
}
