import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import IconButton from '../components/IconButton';
import Dashboard from '../screens/Dashboard';
import Profile from '../screens/Profile';
import AppointmentDatePicker from '../screens/AppointmentDatePicker';
import AppointmentCreated from '../screens/AppointmentCreated';
import alert from '../utils/alert';
import { signOut } from '../lib/actions/user.actions';
import { GlobalContext } from '../context/GlobalProvider';
import { Alert } from 'react-native';

export type AppStackParams = {
    Dashboard: undefined;
    AppointmentDatePicker: {
        providerId: string;
    };
    AppointmentCreated: {
        date: number;
        provider?: {
            username: string;
        };
    };
    Profile: undefined;
};

const AppStack = createStackNavigator<AppStackParams>();



  
function AuthRoutes() {
    const { setUser, setIsLogged } = useContext(GlobalContext);
    
    const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);
  };
  
    return (
        <AppStack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#312e38' },
                headerStyle: { backgroundColor: '#312e38', elevation: 0 },
                headerTitleAlign: 'center',
                headerTitleStyle: { fontFamily: 'RobotoSlab-Medium' },
                headerTintColor: '#f4ede8',
            }}>
                <AppStack.Screen name='Dashboard' component={Dashboard} />
                <AppStack.Screen name='AppointmentDatePicker' component={AppointmentDatePicker} />
                <AppStack.Screen name='AppointmentCreated' component={AppointmentCreated} />
                <AppStack.Screen 
                    name='Profile'
                    component={Profile}
                    options={({ navigation }) => ({
                        title: 'Meu Perfil',
                        headerShown: true,
                        headerLeftContainerStyle: {
                            borderWidth: 1,
                            borderColor: 'transparent',
                            borderRadius: 16,
                        },
                        headerRightContainerStyle: {
                            borderWidth: 1,
                            borderColor: 'transparent',
                            borderRadius: 16,
                        },
                        headerLeft: () => (
                            <IconButton
                                name='arrow-left'
                                size={28}
                                style={{
                                    borderWidth: 1,
                                    flex: 1,
                                    paddingHorizontal: 24,
                                }}
                                onPress={navigation.goBack}
                            />
                        ),
                        headerRight: () => (
                            <IconButton
                              name="power"
                              size={28}
                              style={{
                                borderWidth: 1,
                                flex: 1,
                                paddingHorizontal: 24,
                              }}
                              onPress={() => {
                                Alert.alert(
                                  'Confirmação',
                                  'Tem certeza que deseja sair?',
                                  [
                                    {
                                      text: 'Cancelar',
                                      style: 'cancel',
                                    },
                                    {
                                      text: 'Confirmar',
                                      style: 'destructive',
                                      onPress: () => {
                                        logout();
                                      },
                                    },
                                  ],
                                  { cancelable: true }
                                );
                              }}
                            />
                          ),                          
                    })}
                />
            </AppStack.Navigator>
    );
}

export default AuthRoutes;