import React from 'react'
import { COLORS } from '@/constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function RootLayout() {
	return (
		<>
			<StatusBar style='light' />
			<Tabs
				screenOptions={{
					headerShadowVisible: false,
					headerStyle: {
						backgroundColor: COLORS.background,
					},
					headerTintColor: COLORS.text,
					headerTitleStyle: {
						fontWeight: 'bold',
					},
					tabBarStyle: {
						backgroundColor: COLORS.background,
						borderTopColor: COLORS.text,
						borderTopWidth: 1,
					},
					tabBarActiveTintColor: COLORS.text,
					tabBarInactiveTintColor: COLORS.inactive,
				}}
			>
				<Tabs.Screen name='index' options={{ href: null }} />
				<Tabs.Screen
					name='films'
					options={{
						title: 'All Films',
						tabBarLabel: 'Films',
						headerShown: false,
						tabBarIcon: ({ color, size }) => <Ionicons name='film-outline' size={size} color={color} />,
					}}
				/>
				<Tabs.Screen
					name='people'
					options={{
						title: 'All Characters',
						tabBarLabel: 'Characters',
						headerShown: false,
						tabBarIcon: ({ color, size }) => <Ionicons name='people-outline' size={size} color={color} />,
					}}
				/>
				<Tabs.Screen
					name='favorites'
					options={{
						title: 'My Favorites',
						tabBarLabel: 'Favorites',
						tabBarIcon: ({ color, size }) => <Ionicons name='star-outline' size={size} color={color} />,
					}}
				/>
			</Tabs>
		</>
	)
}
