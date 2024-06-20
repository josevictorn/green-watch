import { Card } from '@/components/card'
import { Link } from 'expo-router'
import { Image, Text, View } from 'react-native'

export default function Basil() {
  return (
    <View className='flex-1 bg-green-500 items-center justify-center py-24 px-6'>
      <Image
        source={require("@/assets/logo.png")}
        className='h-16'
        resizeMode='contain'
      />
      <View className='mt-8 gap-6'>
        <View className='gap-1'>
          <Text className='text-2xl text-white font-bold'>Manjericão</Text>
          <Text className='text-base text-gray-200'>O manjericão ama umidade de 40-60%, temperaturas de 18-24°C e luz intensa de 70-80%. Cuide dele e terá folhas frescas e aromáticas sempre!</Text>
        </View>

        <View className='gap-2'>
          <Card type='luminosity' icon='lightbulb' plant='basil' />
          <Card type='temperature' icon='temperature-high' plant='basil' />
          <Card type='humidity' icon='water' plant='basil' />
        </View>

        <Link 
          href="/"
          className="text-base text-white font-bold text-center"
        >
          Voltar ao início
        </Link>
      </View>
    </View>
  )
}