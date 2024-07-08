import { View, Text, ScrollView, Platform, KeyboardAvoidingView } from 'react-native'

const ios = Platform.OS == 'ios';
export default function CustomKeyboardView({children}) {
  return (
    <KeyboardAvoidingView
        behavior={ios? 'padding': 'height'}
        style={{flex:1}}
    >
        <ScrollView
        style={{flex:1}}
        bounces={false}
        showsVerticalScrollIndicator={false}
        >
            {
                children
            }
        </ScrollView>
    </KeyboardAvoidingView>
  )
}