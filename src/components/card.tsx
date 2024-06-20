import { Text, TouchableOpacity, View } from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import mqtt from "mqtt"

type Props = {
  plant: "basil" | "mint"
  icon: keyof typeof FontAwesome5.glyphMap
  type: "temperature" | "luminosity" | "humidity"
}

export function Card({ plant, icon, type }: Props) {
  const [isLedOn, setIsLedOn] = useState(false);
  const [ldrMessage, setLdrMessage] = useState(0);
  const [tempMessage, setTempMessage] = useState(0);
  const [umdMessage, setUmdMessage] = useState(0);

  const [state, setState] = useState('');

  let stateLdr = 'critical';
  let stateTemp = 'critical';
  let stateUmd = 'critical';

  let nameTopic;

  if(type==='temperature') {
    nameTopic="ledTemp"
  } else if(type==='luminosity'){
    nameTopic="ledLuz"
  } else {
    nameTopic="ledUmd"
  }
  
  const topic = `francisco.silva.086@ufrn.edu.br/${nameTopic}`;

  const client = mqtt.connect('mqtt://maqiatto.com:8883', {
    username: 'francisco.silva.086@ufrn.edu.br',
    password: 'teste123'
  });

  client.on('connect', () => {
    console.log('Conectado ao broker MQTT');
    client.subscribe('francisco.silva.086@ufrn.edu.br/ldr')
    client.subscribe('francisco.silva.086@ufrn.edu.br/temp')
    client.subscribe('francisco.silva.086@ufrn.edu.br/umd')
  });

  client.on('message', (topic, payload, packet) => {
    if(topic === 'francisco.silva.086@ufrn.edu.br/ldr') {
      setLdrMessage(Number(payload))

      if(plant === 'basil') {
        if(ldrMessage >= 45 && ldrMessage <= 55) {
          stateLdr = 'stable'
        } else if (ldrMessage >= 40 && ldrMessage < 45 || ldrMessage > 55 && ldrMessage <= 60) {
          stateLdr = 'attention'
        } else {
          stateLdr = 'critical'
        }
      } else {
        if(ldrMessage >= 55 && ldrMessage <= 65) {
          stateLdr = 'stable'
        } else if (ldrMessage >= 50 && ldrMessage < 55 || ldrMessage > 65 && ldrMessage <= 70) {
          stateLdr = 'attention'
        } else {
          stateLdr = 'critical'
        }
      }

      if(type === 'humidity') {
        setState(stateLdr);
      }

    } else if (topic === 'francisco.silva.086@ufrn.edu.br/temp') {
      setTempMessage(Number(payload))

      if(plant === 'basil') {
        if(tempMessage >= 16 && tempMessage <= 22) {
          stateTemp = 'stable'
        } else if (tempMessage >= 18 && tempMessage < 16 || tempMessage > 22 && tempMessage <= 24) {
          stateTemp = 'attention'
        } else {
          stateTemp = 'critical'
        }
      } else {
        if(tempMessage >= 16 && tempMessage <= 22) {
          stateTemp = 'stable'
        } else if (tempMessage >= 18 && tempMessage < 16 || tempMessage > 22 && tempMessage <= 24) {
          stateTemp = 'attention'
        } else {
          stateTemp = 'critical'
        }
      }

      if(type === 'temperature') {
        setState(stateTemp);
      }
    } else {
      setUmdMessage(Number(payload))

      if(plant === 'basil') {
        if(umdMessage >= 65 && umdMessage <= 75) {
          stateUmd = 'stable'
        } else if (umdMessage >= 60 && umdMessage < 65 || umdMessage > 75 && umdMessage <= 80) {
          stateUmd = 'attention'
        } else {
          stateUmd = 'critical'
        }
      } else {
        if(umdMessage >= 55 && umdMessage <= 55) {
          stateUmd = 'stable'
        } else if (umdMessage >= 50 && umdMessage < 55 || umdMessage > 55 && umdMessage <= 60) {
          stateUmd = 'attention'
        } else {
          stateUmd = 'critical'
        }
      }

      if(type === 'luminosity') {
        setState(stateUmd);
      }
    }
  })

  const toggleLed = () => {
    const message = isLedOn ? '1' : '0';

    client.publish(topic, message, () => {
      console.log(`Mensagem "${message}" enviada ao tópico "${topic}"`);
      setIsLedOn(!isLedOn);
    });
  };
  
  return (
    <View className="flex-row justify-between bg-[#002125] p-6 border border-[#163B40] rounded-lg">
      <View>
        <Text className="text-4xl font-semibold text-white">
          {type === 'luminosity' && ldrMessage}
          {type === 'temperature' && tempMessage}
          {type === 'humidity' && umdMessage}
          <Text className="text-2xl font-normal">
            {type === 'luminosity' && " %"}
            {type === 'temperature' && " ºC"}
            {type === 'humidity' && " %"}
          </Text>
        </Text>
        <Text className="text-base font-semibold text-white">
          {type === 'luminosity' && "Luminosidade"}
          {type === 'humidity' && "Umidade"}
          {type === 'temperature' && "Temperatura"}
        </Text>
        {state === 'stable' && 
          <Text className="text-base font-normal text-green-200">
            Dentro do esperado
          </Text>
        }
        {state === 'attention' && 
          <Text className="text-base font-normal text-yellow-200">
            Nível de atenção
          </Text>
        }
        {state === 'critical' && 
          <Text className="text-base font-normal text-red-200">
            Nível crítico
          </Text>
        }
      </View>
      <TouchableOpacity 
        activeOpacity={0.65}
        className="h-24 w-24 bg-[#042D30] border border-[#163B40] items-center justify-center rounded-lg"
        onPress={toggleLed}
      >
        {
          isLedOn ? 
          <Text className="text-[#F48F56]">
            <FontAwesome5 
              name={icon} 
              size={36} 
            />
          </Text> :
          <Text className="text-[#163B40]">
            <FontAwesome5 
              name={icon} 
              size={36} 
            />
          </Text>
        }
      </TouchableOpacity>
    </View>
  )
}