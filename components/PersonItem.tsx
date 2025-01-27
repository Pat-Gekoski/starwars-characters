import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { COLORS } from '@/constants/colors'
import { Person } from '@/app/people'

const PersonItem: React.FC<{ item: Person }> = ({ item }) => {
	const id = item.url.split('/').filter(Boolean).pop()

	console.log('item', item)

	return (
		<Link href={`/people/${id}`} asChild>
			<TouchableOpacity>
				<View style={styles.peopleItem}>
					<Text style={styles.name}>{item.name}</Text>
					<Text style={styles.details}>Gender: {item.gender}</Text>
					<Text style={styles.details}>Birth year: {item.birth_year}</Text>
				</View>
			</TouchableOpacity>
		</Link>
	)
}

export default PersonItem

const styles = StyleSheet.create({
	peopleItem: {
		backgroundColor: COLORS.background,
		padding: 16,
		marginVertical: 8,
		marginHorizontal: 16,
		borderRadius: 8,
	},
	name: {
		fontSize: 18,
		fontWeight: 'bold',
		color: COLORS.text,
		marginBottom: 8,
	},
	details: {
		fontSize: 14,
		color: '#FFF',
	},
})
