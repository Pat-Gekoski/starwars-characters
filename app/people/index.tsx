import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, RefreshControl, TextInput, Button, ActivityIndicator } from 'react-native'
import ListEmptyComponent from '@/components/ListEmptyComponent'
import { COLORS } from '@/constants/colors'
import PersonItem from '@/components/PersonItem'

export interface Person {
	name: string
	birth_year: string
	gender: string
	url: string
}

interface ApiResponse {
	results: Person[]
	next: string | null
	result?: Person[]
}

export default function PeopleScreen() {
	const [people, setPeople] = useState<Person[]>([])
	const [refreshing, setRefreshing] = useState(false)
	const [loading, setLoading] = useState(true)
	const [searchQuery, setSearchQuery] = useState('')
	const [nextPage, setNextPage] = useState<string | null>(null)
	const [loadingMore, setLoadingMore] = useState(false)

	const fetchPeople = async (query: string = '', url: string | null = null) => {
		setLoading(true)
		try {
			let apiUrl = url || `https://swapi.tech/api/people`
			if (query) {
				apiUrl = `https://swapi.tech/api/people/?name=${query}`
			}
			const response = await fetch(apiUrl)
			const data: ApiResponse = await response.json()

			// Apparently the API returns a different structure for search results
			if (query && data.result) {
				// Transform single result to match Person interface structure
				const transformedResults = data.result.map((item: any) => ({
					name: item.properties.name,
					birth_year: item.properties.birth_year,
					gender: item.properties.gender,
					url: item.properties.url,
				}))
				setPeople(transformedResults)
			} else {
				setPeople((prevPeople) => (url ? [...prevPeople, ...data.results] : data.results))
			}
			setNextPage(data.next)
		} catch (error) {
			console.error('Error fetching people:', error)
		} finally {
			setRefreshing(false)
			setLoading(false)
			setLoadingMore(false)
		}
	}

	useEffect(() => {
		fetchPeople()
	}, [])

	const onRefresh = () => {
		setRefreshing(true)
		fetchPeople(searchQuery)
	}

	const handleSearch = () => {
		fetchPeople(searchQuery)
	}

	const handleLoadMore = () => {
		if (nextPage && !loadingMore) {
			setLoadingMore(true)
			fetchPeople(searchQuery, nextPage)
		}
	}

	const renderFooter = () => {
		if (!loadingMore) return null
		return (
			<View style={styles.footerLoader}>
				<ActivityIndicator size='small' color='#FFE81F' />
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<View style={styles.searchContainer}>
				<TextInput
					style={styles.searchBar}
					placeholder='Search characters...'
					placeholderTextColor={COLORS.inactive}
					value={searchQuery}
					onChangeText={setSearchQuery}
				/>
				<Button title='Search' onPress={handleSearch} color={COLORS.text} />
			</View>
			<FlatList
				data={people}
				renderItem={({ item }) => <PersonItem item={item} />}
				keyExtractor={(item) => item.url}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.text} />}
				ListEmptyComponent={
					<ListEmptyComponent loading={loading} message={searchQuery ? 'No matching characters found' : 'No characters found'} />
				}
				onEndReached={handleLoadMore}
				onEndReachedThreshold={0.1}
				ListFooterComponent={renderFooter}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.containerBackground,
	},
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
	},
	searchBar: {
		flex: 1,
		backgroundColor: COLORS.itemBackground,
		color: COLORS.text,
		padding: 10,
		marginRight: 10,
		borderRadius: 5,
		fontSize: 16,
	},
	footerLoader: {
		alignItems: 'center',
		paddingVertical: 20,
	},
})
