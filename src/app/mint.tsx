import { Card } from '@/components/card'
import { Link } from 'expo-router'
import { Image, Text, View } from 'react-native'

export default function Mint() {
  return (
    <View className='flex-1 bg-green-500 items-center justify-center py-24 px-6'>
      <Image
        source={require("@/assets/logo.png")}
        className='h-16'
        resizeMode='contain'
      />
      <View className='mt-8 gap-6'>
        <View className='gap-1'>
          <Text className='text-2xl text-white font-bold'>Hortelã</Text>
          <Text className='text-base text-gray-200'>A hortelã adora umidade de 50-70%, temperaturas de 18-24°C e luz suave de 50-60%. Cuide bem dela e terá um aroma fresco sempre à mão!</Text>
        </View>

        <View className='gap-2'>
          <Card type='luminosity' icon='lightbulb' plant='mint' />
          <Card type='temperature' icon='temperature-high' plant='mint' />
          <Card type='humidity' icon='water' plant='mint' />
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