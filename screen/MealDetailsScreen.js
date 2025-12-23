import { useLayoutEffect, useContext } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealItemDetails from "../components/MealItemDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
import { FavoritesContext } from "../store/context/favorites-context";

export default function MealDetailsScreen({ route, navigation }) {
	const favoriteMealsContext = useContext(FavoritesContext);

	const mealId = route.params.mealId;
	const meal = MEALS.find((meal) => meal.id === mealId);

	const mealIsFavorite = favoriteMealsContext.ids.includes(mealId);

	function changeFavoriteStatusHandler() {
		if (mealIsFavorite) {
			favoriteMealsContext.removeFavorite(mealId);
		} else {
			favoriteMealsContext.addFavorite(mealId);
		}
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<IconButton
						onPress={changeFavoriteStatusHandler}
						icon={mealIsFavorite ? "star" : "star-outline"}
						color="white"
					/>
				);
			},
		});
	}, [navigation, changeFavoriteStatusHandler]);

	return (
		<ScrollView style={styles.rootContainer}>
			<Image style={styles.image} source={{ uri: meal.imageUrl }} />
			<Text style={styles.title}>{meal.title}</Text>
			<MealItemDetails
				complexity={meal.complexity}
				affordability={meal.affordability}
				duration={meal.duration}
				textStyle={styles.detailText}
			/>
			<View style={styles.listOuterContainer}>
				<View style={styles.listContainer}>
					<Subtitle>Ingredients</Subtitle>
					<List data={meal.ingredients} />
					<Subtitle>Steps</Subtitle>
					<List data={meal.steps} />
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	rootContainer: {
		marginBottom: 32,
	},
	image: {
		width: "100%",
		height: 350,
	},
	title: {
		fontWeight: "bold",
		fontSize: 24,
		margin: 8,
		textAlign: "center",
		color: "white",
	},
	detailText: {
		color: "white",
	},
	listOuterContainer: {
		alignItems: "center",
	},
	listContainer: {
		width: "80%",
	},
});
