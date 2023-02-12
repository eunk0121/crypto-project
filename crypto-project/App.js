import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';


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
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => {
            return (
            <Text>
              {item.name}, {item.symbol},{item.price_usd}
            </Text>
          )}}
        />
      )}
    </View>
  );
};

export default App;