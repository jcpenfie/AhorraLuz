import React from 'react';
import tw from 'twrnc';
import {View, Text} from 'react-native';
const MyHeader = (zone: any) => {
  return (
    <View
      style={tw`flex-row justify-between items-center px-4 py-2 bg-blue-500`}>
      <Text style={tw`text-white text-lg font-bold`}>Precio de la luz</Text>
      <Text style={tw`text-white text-lg font-bold`} onPress={zone('PCB')}>
        PCB
      </Text>
      <Text style={tw`text-white text-lg font-bold`} onPress={zone('PCB')}>CYM</Text>
    </View>
  );
};

export default MyHeader;
