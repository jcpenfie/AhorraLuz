import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import {
  formateoFecha,
  formateoHora,
  formateoHoraConMinutos,
  soloHora,
} from './app/containers/utils/utils';
import {
  getAllPrices,
  getAvgPrices,
  getcheapestsPrices,
  getMaxPrices,
  getMinPrices,
  getNowPrices,
} from './app/containers/apiService/apiService';
import {styled} from 'nativewind';
import {Linking} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const App = () => {
  const [data, setData] = useState([
    {date: '00-00-0000', hour: '00:00', price: 0, units: '€'},
  ]);
  const [priceCheap, setPriceCheap] = useState([
    {date: '00-00-0000', hour: '00:00', price: 0, units: '€'},
  ]);
  const [priceTop, setPriceTop] = useState({
    date: '00-00-0000',
    price: 0,
    units: '€',
    hour: '00:00',
  });
  const [priceDown, setPriceDown] = useState({
    date: '00-00-0000',
    price: 0,
    units: '€',
    hour: '00:00',
  });
  const [priceAvg, setPriceAvg] = useState({
    date: '00-00-0000',
    price: 0,
    units: '€',
    hour: '00:00',
  });
  const [priceNow, setPriceNow] = useState({
    date: '00-00-000',
    hour: '00:00',
    price: 0,
    units: '€',
  });

  const [refreshing, setRefreshing] = React.useState(false);
  const refreshData = () => {
    getAllPrices(zone).then((dataR: any) => {
      const arr: any[] = [];
      Object.keys(dataR).forEach(key => arr.push(dataR[key]));
      setData(arr);
    });
    getMinPrices(zone).then((dataR: any) => {
      setPriceDown(dataR);
    });
    getMaxPrices(zone).then((dataR: any) => {
      setPriceTop(dataR);
    });
    getAvgPrices(zone).then((dataR: any) => {
      setPriceAvg(dataR);
    });
    getNowPrices(zone).then((dataR: any) => {
      setPriceNow(dataR);
    });
    getcheapestsPrices(zone, 24).then((dataR: any) => {
      setPriceCheap(dataR);
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      refreshData();
    }, 2000);
  }, []);

  const [zone, setZone] = useState('PCB');
  const StyledView = styled(View);
  const StyledText = styled(Text);
  const StyledScrollView = styled(ScrollView);

  useEffect(() => {
    getAllPrices(zone).then((dataR: any) => {
      const arr: any[] = [];
      Object.keys(dataR).forEach(key => arr.push(dataR[key]));
      setData(arr);
    });
    getMinPrices(zone).then((dataR: any) => {
      setPriceDown(dataR);
    });
    getMaxPrices(zone).then((dataR: any) => {
      setPriceTop(dataR);
    });
    getAvgPrices(zone).then((dataR: any) => {
      setPriceAvg(dataR);
    });
    getNowPrices(zone).then((dataR: any) => {
      dataR.hour = formateoHora(dataR.hour);
      setPriceNow(dataR);
    });
    getcheapestsPrices(zone, 24).then((dataR: any) => {
      setPriceCheap(dataR);
    });
  }, []);

  return (
    <SafeAreaView>
      <StyledScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* header */}
        <StyledView
          className={
            'flex-row justify-between items-center px-4 py-2 bg-blue-500'
          }>
          <StyledText className={`text-white text-lg font-bold`}>
            Precio de la luz
          </StyledText>
          <StyledText
            className={` text-lg font-bold p-2 px-8 rounded-lg ${
              zone === 'PCB' ? 'bg-sky-100 text-black' : 'text-white'
            }`}
            onPress={() => {
              setZone('PCB');
              refreshData();
            }}>
            PCB
          </StyledText>
          <StyledText
            className={`text-white text-lg font-bold p-2 px-8 rounded-lg ${
              zone === 'CYM' ? 'bg-sky-100 text-black' : 'text-white'
            }`}
            onPress={() => {
              setZone('CYM');
              refreshData();
            }}>
            CYM
          </StyledText>
        </StyledView>

        {/* Body */}
        <StyledView className="px-1">
          <StyledView className="flex-1 items-center justify-center">
            <StyledText className="text-slate-100 text-xl font-bold mt-2 p-2 px-10 bg-black rounded-t-lg">
              {formateoFecha(data[0].date)}
            </StyledText>
            <StyledText className="text-slate-100 text-lg font-bold mb-2 p-2 px-10 bg-black rounded-xl">
              {formateoHoraConMinutos(priceNow.hour)} -
              {` ${priceNow.price} ${priceNow.units}`}
            </StyledText>
          </StyledView>
          <StyledView className="flex flex-col">
            <StyledText className="flex-auto text-center text-slate-100 text-xl font-bold p-2 px-10 bg-sky-500/100 rounded-t-lg">
              <Icon name="functions" size={30} />
              {` ${priceAvg.price} ${priceAvg.units}`}
            </StyledText>

            <StyledText className="flex-auto flex items-center text-slate-100 text-lg font-bold text-center p-2 px-10 bg-pink-800/100 ">
              {formateoHora(priceTop.hour)} -
              {` ${priceTop.price} ${priceTop.units}`}
            </StyledText>

            <StyledText className="flex-auto text-slate-100 text-lg font-bold text-center p-2 px-10 bg-green-500/100 rounded-b-lg">
              {formateoHora(priceDown.hour)} -
              {` ${priceDown.price} ${priceDown.units}`}
            </StyledText>
          </StyledView>

          <StyledText
            className={`flex-auto mt-1 rounded-t-lg ${
              parseInt(soloHora(data[0].hour)) <
              parseInt(soloHora(priceNow.hour))
                ? 'bg-slate-500'
                : data[0].price > priceDown.price &&
                  data[0].price < priceTop.price
                ? 'bg-sky-500/100'
                : data[0].price > priceTop.price ||
                  data[0].price === priceTop.price
                ? 'bg-pink-800'
                : 'bg-green-500/100'
            }`}></StyledText>
          {data &&
            data.map((el, i) => (
              <StyledText
                key={i}
                className={`flex-auto ${
                  parseInt(soloHora(el.hour)) <
                  parseInt(soloHora(priceNow.hour))
                    ? 'text-slate-600'
                    : 'text-slate-100'
                } text-lg font-bold text-center p-2 my-0 px-10 ${
                  parseInt(soloHora(el.hour)) <
                  parseInt(soloHora(priceNow.hour))
                    ? 'bg-slate-500'
                    : el.price > priceDown.price && el.price < priceTop.price
                    ? 'bg-sky-500/100'
                    : el.price > priceTop.price || el.price === priceTop.price
                    ? 'bg-pink-800'
                    : el.price > priceDown.price || el.price === priceDown.price
                    ? 'bg-green-800'
                    : 'bg-sky-800'
                }`}>
                {formateoHora(el.hour)} - {`${el.price} ${el.units}`}
              </StyledText>
            ))}
          <StyledText
            className={`flex-auto mb-1 rounded-b-lg ${
              data[data.length - 1].price > priceDown.price &&
              data[data.length - 1].price < priceTop.price
                ? 'bg-sky-500/100'
                : data[data.length - 1].price > priceTop.price ||
                  data[data.length - 1].price === priceTop.price
                ? 'bg-pink-800'
                : 'bg-green-500/100'
            }`}></StyledText>

          <StyledText
            className={`text-lg font-bold text-center text-black rounded-t-lg mt-2 ${
              priceCheap[0].price > priceDown.price &&
              priceCheap[0].price < priceTop.price
                ? 'bg-sky-500/100'
                : priceCheap[0].price > priceTop.price ||
                  priceCheap[0].price === priceTop.price
                ? 'bg-pink-800'
                : 'bg-green-500/100'
            }`}>
            Por orden de más barato a menos:
          </StyledText>
          {priceCheap &&
            priceCheap.map((el, i) => (
              <StyledText
                key={i}
                className={`flex-auto text-slate-100 text-lg font-bold text-center p-2 my-0 px-10 ${
                  el.price > priceDown.price && el.price < priceTop.price
                    ? 'bg-sky-500/100'
                    : el.price > priceTop.price || el.price === priceTop.price
                    ? 'bg-pink-800'
                    : 'bg-green-500/100'
                }`}>
                {formateoHora(el.hour)} - {`${el.price} ${el.units}`}
              </StyledText>
            ))}
          <StyledText
            className={`flex-auto mb-1 rounded-b-lg ${
              priceCheap[priceCheap.length - 1].price > priceDown.price &&
              priceCheap[priceCheap.length - 1].price < priceTop.price
                ? 'bg-sky-500/100'
                : priceCheap[priceCheap.length - 1].price > priceTop.price ||
                  priceCheap[priceCheap.length - 1].price === priceTop.price
                ? 'bg-pink-800'
                : 'bg-green-500/100'
            }`}></StyledText>

          <StyledView
            className={
              'flex-row justify-between items-center px-4 py-2 bg-blue-500 b-10 rounded-lg mb-1 '
            }>
            <StyledText className={`text-white 	`}>
              Los datos proporcionados son propiedad de{' '}
              <Text
                style={{color: 'blue'}}
                onPress={() => Linking.openURL('https://www.ree.es/es')}>
                Red eléctrica de España
              </Text>{' '}
              . No me hago responsable de la inexactitud de los mismos tras
              obtenerlos de la fuente o debido a su posterior tratamiento.
            </StyledText>
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </SafeAreaView>
  );
};

export default App;
