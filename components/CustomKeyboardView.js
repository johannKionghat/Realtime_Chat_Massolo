import { View, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'

const ios = Platform.OS == 'ios';
export default function CustomKeyboardView({Children}) {
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
                Children
            }
        </ScrollView>
    </KeyboardAvoidingView>
  )
}