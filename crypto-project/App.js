import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NativeBaseProvider, Center, Box, HStack, Heading, Text,ScrollView,Image } from "native-base";

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getCoins = async () => {
    try {
      const response = await fetch('https://api.coinlore.net/api/tickers/?start=0&limit=15');
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


  const DataBox = () => {
    return (
      <ScrollView>
        <HStack >
          <Center p="4" m="2" marginTop="5" width="100%"><Heading size="md">Cryptocurrencies</Heading></Center>
        </HStack>
        <HStack p="2" space="3" rounded="md" alignItems="center" width="100%" display="flex" flexDirection="row" justifyContent="space-between" height="10" >
          <Center w="40%" fontSize="xs">Coin</Center>
          <Center w="25%" fontSize="xs">Symbol</Center>
          <Center w="25%" fontSize="xs">Price_USD</Center>
        </HStack>
        {data.map((item, k) => {
          return (
            <HStack key={k} p="4" m="1" space="3" rounded="md" width="100%" display="flex" flexDirection="row" justifyContent="space-between" alignSelf='center'borderWidth="2" borderColor="muted.300">
              <Text w="45%" bold fontSize="md" >
              <Image style={{height: 20, width: 20, marginRight:4}} source={{uri: `https://www.coinlore.com/img/${item.nameid}.webp`}}/>{item.name}</Text>
              <Text w="20%" fontSize="md">{item.symbol}</Text>
              <Text w="25%" textAlign="right" bold fontSize="md">{item.price_usd}</Text>
            </HStack>
          )
        })
        }
      </ScrollView>
    )
  };


  return (
    <NativeBaseProvider>
      <View style={{ flex: 1, padding: 24 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <DataBox />
        )}
      </View>
    </NativeBaseProvider>
  );
};

export default App;