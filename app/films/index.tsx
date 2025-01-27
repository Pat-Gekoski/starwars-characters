import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '@/constants/colors'
import { Film } from '@/types/interfaces'
import FilmItem from '@/components/FilmItem'
import ListEmptyComponent from '@/components/ListEmptyComponent'

const Page = () => {
	const [films, setFilms] = useState<Array<Film>>([])
	const [refreshing, setRefreshing] = useState(false)
	const [loading, setLoading] = useState(false)

	const fetchFilms = async () => {
		setLoading(true)
		try {
			const response = await fetch('https://swapi.dev/api/films/')
			const data = await response.json()
			setFilms(data.results)
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
			setRefreshing(false)
		}
	}

	useEffect(() => {
		fetchFilms()
	}, [])

	const onRefresh = () => {
		setRefreshing(true)
		fetchFilms()
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={films}
				renderItem={({ item }) => <FilmItem item={item} />}
				keyExtractor={(item) => item.title}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.text} />}
				ListEmptyComponent={<ListEmptyComponent loading={loading} message='No films found' />}
			/>
		</View>
	)
}

export default Page

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.containerBackground,
	},
})
