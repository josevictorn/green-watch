import { Card } from '@/components/card'
import { Link, Redirect } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function Home() {
  return (
    <View className='flex-1 py-24 px-6 bg-green-500 items-center justify-between'>
      <Image
        source={require("@/assets/logo.png")}
        className='h-16'
        resizeMode='contain'
      />
      <View className='mt-8 gap-6'>
        <View className='gap-1'>
          <Text className='text-2xl text-white font-bold'>Suas plantas</Text>
          <Text className='text-base text-gray-200'>Escolha uma de suas plantas cadastradas no sistema para analisar.</Text>
        </View>

        <View className='gap-2'>
          <Link href="/basil" asChild>
            <TouchableOpacity 
              activeOpacity={0.7} 
              className="w-full h-14 bg-orange-500 items-center justify-center rounded-lg"
            >
              <Text className="text-green-500 text-base font-bold uppercase">Manjericão</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/mint" asChild>
            <TouchableOpacity 
              activeOpacity={0.7} 
              className="w-full h-14 bg-orange-500 items-center justify-center rounded-lg"
            >
              <Text className="text-green-500 text-base font-bold uppercase">Hortelã</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  )
}