import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { People } from '@/types/interfaces'
import { COLORS } from '@/constants/colors'

const Page = () => {
	const { id } = useLocalSearchParams()
	const [person, setPerson] = useState<People | null>(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchFilm = async () => {
			setLoading(true)
			try {
				const response = await fetch(`https://swapi.dev/api/people/${id}/`)
				const data = await response.json()
				setPerson(data)
			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false)
			}
		}

		fetchFilm()
	}, [id])

	if (loading) {
		return (
			<View>
				<Text style={{ color: '#FFF' }}>Loading...</Text>
			</View>
		)
	}

	if (!person) {
		return (
			<View>
				<Text style={{ color: '#FFF' }}>Character not found</Text>
			</View>
		)
	}

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.name}>{person.name}</Text>
			<Text style={styles.detail}>Gender: {person.gender}</Text>
			<Text style={styles.detail}>Eye Color: {person.eye_color}</Text>
			<Text style={styles.detail}>Hair Color: {person.hair_color}</Text>
			<Text style={styles.detail}>Height: {person.height}</Text>
			<Text style={styles.detail}>Mass: {person.mass}</Text>
			<Text style={styles.detail}>Skin Color: {person.skin_color}</Text>
		</ScrollView>
	)
}

export default Page

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.containerBackground,
		padding: 16,
	},
	name: {
		color: COLORS.text,
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 16,
	},
	detail: {
		fontSize: 16,
		color: COLORS.text,
		marginBottom: 8,
	},
})
