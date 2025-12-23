import { useLayoutEffect } from "react";
import {
	View,
	StyleSheet,
	Text,
	Image,
	ScrollView,
	Button,
} from "react-native";
import { MEALS } from "../data/dummy-data";
import MealItemDetails from "../components/MealItemDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";

export default function MealDetailsScreen({ route, navigation }) {
	const mealId = route.params.mealId;
	const meal = MEALS.find((meal) => meal.id === mealId);

	function headerButtonPressHandler() {
		console.log("pressed");
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<IconButton
						onPress={headerButtonPressHandler}
						icon="star"
						color="white"
					/>
				);
			},
		});
	}, [navigation, headerButtonPressHandler]);

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
