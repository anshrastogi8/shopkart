import axios from 'axios';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { BASE_URL } from './utils/ApiConfig';
import { commonHeader } from './utils/HeadersConfig';
import { FlatList } from 'react-native-gesture-handler';
import { useCart } from './contexts/CartContext';
import { getToken } from './utils/AuthStorage';

export default function Checkout({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [flat, setFlat] = useState('');
  const [area, setArea] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const [addressId, setAddressdId] = useState();
  const [address, setAddress] = useState([]);
  const [useNewAddress, setUseNewAddress] = useState(true);
  const [addressOption, setAddressOption] = useState();
  const [errors, setErrors] = useState({});
  const [isExisting,setIsExisting] = useState(true)

  const { cart, dispatch } = useCart();

  function handleValidation() {
    let error = {};
    if(useNewAddress){
    const nameRegex = /^[a-zA-Z-' ]+$/;

    if (!firstName || firstName.trim() === '') {
      4;
      error.firstName = 'First name is required';
    } else if (!nameRegex.test(firstName)) {
      error.firstName = 'Invalid name format';
    }

    if (!lastName || lastName.trim() === '') {
      error.lastName = 'Last name is required';
    } else if (!nameRegex.test(lastName)) {
      error.lastName = 'Invalid name format';
    }

    if (!email || email.trim() === '') {
      error.email = 'Email is required';
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      error.email = 'Invalid email format';
    }

    if (!phone || phone.trim() === '') {
      error.phone = 'Phone number is required';
    } else if (!/^\d{6}$/.test(pincode)) {
      error.phone = 'Phone number should be 10 digit';
    }

    if (!flat || flat.trim() === '') {
      error.flat = 'Flat name is required';
    }
    if (!area || area.trim() === '') {
      error.area = 'Area name is required';
    }
    if (!landmark || landmark.trim() === '') {
      error.landmark = 'Landmark name is required';
    }

    if (!city || city.trim() === '') {
      error.city = 'City name is required';
    } else if (!nameRegex.test(city)) {
      error.city = 'Invalid city format';
    }

    if (!state || state.trim() === '') {
      error.state = 'State name is required';
    } else if (!nameRegex.test(state)) {
      error.state = 'Invalid state format';
    }

    if (!pincode || pincode.trim() === '') {
      error.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(pincode)) {
      error.pincode = 'Pincode should be 6 digit';
    }
  }
    setErrors(error);

    if (Object.keys(error).length === 0) {
      handleProceed();
    }
  }

  const handleProceed = () => {
    const addressData = useNewAddress ? 
       { firstName,
        lastName,
        email,
        phone,
        flat,
        area,
        landmark,
        pincode,
        city,
        state,}
      : {};

      const addressParams ={
        addressId:addressId,
        address: addressData,
        addressPresent : useNewAddress
      }

    navigation.navigate('Payment',  addressParams      
  );
  };
  const radioButtons = useMemo(
    () => [
      {
        id: '1',
        label: 'Existing Address',
        value: 'existing',
        disabled: isExisting
      },
      {
        id: '2',
        label: 'Add New Address',
        value: 'new',
      },
    ],
    [isExisting],
  );

  const getExistingAddress = async () => {
    try {
      const token = await getToken();
      const header = commonHeader(token);
      const result = await axios.get(BASE_URL + '/address/user', header);

      if (result.status === 200) {
        setAddress(result.data);
        if (result.data.length > 0) {
          setUseNewAddress(false);
          setAddressdId(result.data[0].id);
          setAddressOption('1');
          setIsExisting(false)
        } else {
          setIsExisting(true)
          setUseNewAddress(true);
          setAddressOption('2');
        }
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getExistingAddress();
  }, []);

  const handleAddressOption = id => {
    setAddressOption(id);
    if (id === '1') {
      setUseNewAddress(false);
    } else if (id === '2') {
      setUseNewAddress(true);
    }
  };

  const renderHeader = () => {
    return (
      <View style={{ margin: 5 }}>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={handleAddressOption}
          selectedId={addressOption}
          layout="row"
        />

        {useNewAddress && (
          <View style={{ margin: 10 }}>
            <Text style={{ fontWeight: 'bold', padding: 2 }}>
              First Name <Text style={styles.mandatory}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your first name"
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />
            {errors.firstName && (
              <Text style={styles.error}>{errors.firstName}</Text>
            )}

            <Text style={{ fontWeight: 'bold', padding: 2 }}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your last name"
              value={lastName}
              onChangeText={text => setLastName(text)}
            />
            {errors.lastName && (
              <Text style={styles.error}>{errors.lastName}</Text>
            )}

            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={{ fontWeight: 'bold', padding: 2 }}>
                  E-mail Address <Text style={styles.mandatory}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  keyboardType="email-address"
                  onChangeText={text => setEmail(text)}
                />
                {errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold', padding: 2 }}>
                  Phone Number
                  <Text style={styles.mandatory}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Phone number"
                  value={phone}
                  keyboardType="phone-pad"
                  onChangeText={text => setPhone(text)}
                />
                {errors.phone && (
                  <Text style={styles.error}>{errors.phone}</Text>
                )}
              </View>
            </View>

            <Text style={{ fontWeight: 'bold', padding: 2 }}>
              Flat, House no. <Text style={styles.mandatory}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Flat / House no."
              value={flat}
              onChangeText={text => setFlat(text)}
            />
            {errors.flat && <Text style={styles.error}>{errors.flat}</Text>}

            <Text style={{ fontWeight: 'bold', padding: 2 }}>
              Area, Street, Sector <Text style={styles.mandatory}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Area / Street / Sector"
              value={area}
              onChangeText={text => setArea(text)}
            />
            {errors.area && <Text style={styles.error}>{errors.area}</Text>}

            <Text style={{ fontWeight: 'bold', padding: 2 }}>
              Landmark <Text style={styles.mandatory}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Nearby landmark"
              value={landmark}
              onChangeText={text => setLandmark(text)}
            />
            {errors.landmark && (
              <Text style={styles.error}>{errors.landmark}</Text>
            )}

            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={{ fontWeight: 'bold', padding: 2 }}>
                  Town/City <Text style={styles.mandatory}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="City"
                  value={city}
                  onChangeText={text => setCity(text)}
                />
                {errors.city && <Text style={styles.error}>{errors.city}</Text>}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold', padding: 2 }}>
                  Pincode <Text style={styles.mandatory}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Pincode"
                  value={pincode}
                  keyboardType="numeric"
                  onChangeText={text => setPincode(text)}
                />
                {errors.pincode && (
                  <Text style={styles.error}>{errors.pincode}</Text>
                )}
              </View>
            </View>

            <Text style={{ fontWeight: 'bold', padding: 2 }}>
              State <Text style={styles.mandatory}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, { marginBottom: 0 }]}
              placeholder="State"
              value={state}
              onChangeText={text => setState(text)}
            />
            {errors.city && (
              <Text style={[styles.error, { marginTop: 2 }]}>
                {errors.city}
              </Text>
            )}
          </View>
        )}
      </View>
    );
  };

  const renderAddress = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          styles.addressComp,
          addressId === item.id
            ? {
                backgroundColor: '#E6F7FF',
                borderColor: '#007bff',
                borderWidth: 1,
              }
            : { backgroundColor: 'white', borderColor: '#ccc', borderWidth: 1 },
        ]}
        onPress={() => {
          setAddressdId(item.id);
        }}
      >
        <Text>
          {item.firstName} {item.lastName}
        </Text>

        {/**
                <Text style={styles.existingInfo}>Name: </Text>
                <Text style={styles.existingInfo}>Email: </Text>
                <Text style={styles.existingInfo}>Number: </Text>
                <Text style={styles.existingInfo}>Address: </Text>
                              <Text>
                {data.phone}
              </Text>
                            <Text>
          
                {data.email}
              </Text>
                */}

        <Text>
          {item.flat}, {item.area}, {item.landmark}
        </Text>
        <Text>
          {item.city}, {item.state} - {item.pincode} - {item.country}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <FlatList
        data={addressOption === '1' ? address : []}
        keyExtractor={item => item.id.toString()}
        renderItem={renderAddress}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={() => (
          <Pressable style={styles.button} onPress={handleValidation}>
            <Text style={styles.buttonText}>Proceed to Payment</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#111827',
    padding: 14,
    borderRadius: 6,
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  existingInfo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressComp: {
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flex: 1,
  },
  error: {
    color: 'red',
    marginTop: -10,
    marginBottom: 4,
  },
  mandatory: {
    color: 'red',
  },
});
