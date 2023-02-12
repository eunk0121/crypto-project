import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import { NativeBaseProvider, VStack, Center } from "native-base";

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getCoins = async () => {
    try {
      const response = await fetch('https://api.coinlore.net/api/tickers/?start=0&limit=10');
      const json = await response.json();
      setData(json.data);
      // console.log(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCoins();
  }, []);

  return (
    <NativeBaseProvider>
      
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => {
            return (
            <VStack space={4} alignItems="center">
              <Center display="flex" flexDirection="row" justifyContent="space-between" w="100%" h="10" borderWidth="2" borderColor="#ccc" rounded="md">
                <Text>{item.name}</Text>
                <Text>{item.symbol}</Text>  
                <Text>{item.price_usd}</Text>
              </Center>
            </VStack>
          )}}
        />
      )}
    </View>
    </NativeBaseProvider>
  );
};

export default App;