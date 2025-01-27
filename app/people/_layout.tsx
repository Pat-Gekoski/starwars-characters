import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { COLORS } from '@/constants/colors'

const Layout = () => {
	return (
		<Stack
			screenOptions={{
				headerShadowVisible: false,
				headerStyle: {
					backgroundColor: COLORS.background,
				},
				headerTintColor: COLORS.text,
				headerTitleStyle: {
					fontWeight: 'bold',
				},
				contentStyle: {
					backgroundColor: COLORS.background,
				},
			}}
		>
			<Stack.Screen name='index' options={{ title: 'All Characters' }} />
			<Stack.Screen name='[id]' options={{ title: 'Character Details' }} />
		</Stack>
	)
}

export default Layout
