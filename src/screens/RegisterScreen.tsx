import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { authService } from '../services';

const RegisterScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('오류', '아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);
    try {
      const registerData: any = {
        username: username.trim(),
        password: password.trim(),
      };

      // 선택적 필드 추가
      if (gender.trim()) {
        registerData.gender = gender.trim();
      }
      if (birthYear.trim()) {
        const year = parseInt(birthYear.trim(), 10);
        if (!isNaN(year) && year > 1900 && year <= new Date().getFullYear()) {
          registerData.birth_year = year;
        }
      }

      await authService.register(registerData);

      Alert.alert('회원가입 성공', '회원가입이 완료되었습니다. 로그인해주세요.', [
        {
          text: '확인',
          onPress: () => {
            navigation.goBack(); // 로그인 화면으로 돌아가기
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert('회원가입 실패', error.message || '회원가입에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const goToLogin = () => {
    navigation.goBack(); // 로그인 화면으로 돌아가기
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* 회원가입 텍스트 */}
        <Text style={styles.title}>Register</Text>

        {/* 입력 필드들 */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="ID"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#999"
            autoCapitalize="none"
          />
          
          <TextInput
            style={styles.input}
            placeholder="PW"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="PW 확인"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="성별 (선택사항)"
            value={gender}
            onChangeText={setGender}
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="출생연도 (선택사항)"
            value={birthYear}
            onChangeText={setBirthYear}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </View>

        {/* 회원가입 버튼 */}
        <TouchableOpacity 
          style={[styles.registerButton, isLoading && styles.registerButtonDisabled]} 
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.registerButtonText}>Register</Text>
          )}
        </TouchableOpacity>

        {/* 로그인 링크 */}
        <TouchableOpacity onPress={goToLogin}>
          <Text style={styles.loginLink}>이미 계정이 있으신가요? 로그인</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  registerButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonDisabled: {
    backgroundColor: '#ccc',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    textAlign: 'center',
    color: '#FF6B35',
    fontSize: 14,
  },
});

export default RegisterScreen; 