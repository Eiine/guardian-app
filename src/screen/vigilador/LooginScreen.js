import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';


const LoginScreen = ({navigation,setIsLoggedIn }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* ScrollView para que se pueda mover si el teclado tapa inputs */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Caja de login */}
        <View style={styles.loginBox}>
          <Text style={styles.loginTitle}>Login</Text>

          <Image
            source={require('../../../assets/Logo.png')}
            style={styles.logo}
          />

          {/* Input Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="email" size={24} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                placeholderTextColor="#aaa"
              />
            </View>
          </View>

          {/* Input Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="lock" size={24} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry
                placeholderTextColor="#aaa"
              />
            </View>
          </View>

          {/* Remember Me */}
          <View style={styles.rememberMeContainer}>
            <Switch
              trackColor={{ false: '#767577', true: '#6a5acd' }}
              thumbColor="#f4f3f4"
            />
            <Text style={styles.rememberMeText}>Remember me</Text>
          </View>

          {/* Botón Sign In */}
          <TouchableOpacity style={styles.signInButton} onPress={() => {setIsLoggedIn(true)}}>
            <Text style={styles.signInButtonText}>Iniciar sesion</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 25,
    width: '100%',
    height:"100%",
    alignItems: 'center',
    justifyContent:"center"

  },
  loginTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 5,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 5,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  rememberMeText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
  },
  signInButton: {
    backgroundColor: '#6a5acd',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#6a5acd',
    fontSize: 14,
    marginBottom: 15,
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  signUpText: {
    color: '#555',
    fontSize: 14,
  },
  signUpLink: {
    color: '#6a5acd',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#bbb',
    fontSize: 12,
  },
  vLogo: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginHorizontal: 3,
  },
});

export default LoginScreen;
