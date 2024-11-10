
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from '../src/navigation/AuthNavigator';

export default function Index() {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}