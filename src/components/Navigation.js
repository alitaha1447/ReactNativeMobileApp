import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, TouchableHighlight, Pressable } from 'react-native';
import { useState } from 'react';
import Products from './Products';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'
import Modal from 'react-native-modal';

export default function Navigation() {
  const navigation = useNavigation();

  const [isModal, setIsModal] = useState(false)
  const [pressedButton, setPressedButton] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchIconClicked, setSearchIconClicked] = useState(false);


  const toggleModal = () => {
    setIsModal(!isModal)
  }


  const handlePress = (button) => {
    setPressedButton(button === pressedButton ? null : button);
  };


  const handleTextInput = (text) => {
    setSearchTerm(text);
    // Alert.alert(searchTerm)
  }
  const handleSearch = () => {
    setSearchIconClicked(!searchIconClicked);
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.textTodo}>TODOS-</Text> */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder='What are you looking for?'
          placeholderTextColor='black'
          value={searchTerm}
          onChangeText={handleTextInput}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Icon name="search" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={{ flexDirection: 'row', gap: 1, alignItems: 'center' }} onPress={toggleModal}>
          <Icon name="filter" size={24} color="black" style={styles.icon} />
          <Text>Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }} onPress={toggleModal}>
          <Icon name="arrow-up" size={24} color="black" style={styles.icon} />
          <Icon name="arrow-down" size={24} color="black" style={styles.icon} />
          <Text>Price: lowest to high</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }} onPress={toggleModal}>
          <Icon name="bars" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <Products searchTerm={searchTerm} searchIconClicked={searchIconClicked}></Products>

      <Modal
        onBackdropPress={() => { setIsModal(false) }}
        onBackButtonPress={() => { setIsModal(false) }}
        isVisible={isModal}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        animationIn='bounceInUp'
        animationOut='bounceOutDown'
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.center}>
            <View style={styles.barIcon}></View>
            <Text style={styles.text}>Sort by</Text>
          </View>
          <View style={styles.textContent}>
            <Pressable
              style={[styles.button, pressedButton === 'Popular' && styles.buttonPressed]}
              onPress={() => handlePress('Popular')}
            >
              <Text style={styles.commonTextStyle}>Popular</Text>
            </Pressable>
            <Pressable
              style={[styles.button, pressedButton === 'Newest' && styles.buttonPressed]}
              onPress={() => handlePress('Newest')}
            >
              <Text style={styles.commonTextStyle}>Newest</Text>
            </Pressable>
            <Pressable
              style={[styles.button, pressedButton === 'Customer' && styles.buttonPressed]}
              onPress={() => handlePress('Customer')}
            >
              <Text style={styles.commonTextStyle}>Customer review</Text>
            </Pressable>
            <Pressable
              style={[styles.button, pressedButton === 'lowest' && styles.buttonPressed]}
              onPress={() => handlePress('lowest')}
            >
              <Text style={styles.commonTextStyle}>Price: lowest to high</Text>
            </Pressable>
            <Pressable
              style={[styles.button, pressedButton === 'highest' && styles.buttonPressed]}
              onPress={() => handlePress('highest')}
            >
              <Text style={styles.commonTextStyle}>Price: highest to low</Text>
            </Pressable>
          </View>
        </View>

      </Modal>
    </SafeAreaView >
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    paddingHorizontal: 15,
  },
  textTodo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    backgroundColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 50,
    paddingHorizontal: 10,
    // color: 'red'
  },
  textInput: {
    flex: 1,
    height: 46,
  },
  iconContainer: {
    marginTop: 15,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContent: {
    backgroundColor: '#bbb',
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 400,

  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: 'black',
    borderRadius: 3
  },

  text: {
    color: 'black',
    fontSize: 24,
    marginTop: 15,
    fontWeight: 'bold'
  },
  btn: {
    paddingVertical: 10,
  },
  commonTextStyle: {
    fontSize: 24,
    padding: 8,
  },
  buttonPressed: {
    backgroundColor: 'green',
    paddingVertical: 10,
  }
});
