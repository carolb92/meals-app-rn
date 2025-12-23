import {
	View,
	Text,
	Image,
	Pressable,
	StyleSheet,
	Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MealItemDetails from "../MealItemDetails";

export default function MealItem({
	title,
	imageUrl,
	duration,
	complexity,
	affordability,
	id,
}) {
	const navigation = useNavigation();
	function selectMealItemHandler() {
		navigation.navigate("MealDetail", {
			mealId: id,
		});
	}
	return (
		<View style={styles.mealCard}>
			<Pressable
				style={({ pressed }) => (pressed ? styles.pressed : null)}
				onPress={selectMealItemHandler}
			>
				<View>
					<Image source={{ uri: imageUrl }} style={styles.image} alt={title} />
					<Text style={styles.title}>{title}</Text>
				</View>
				<MealItemDetails
					duration={duration}
					complexity={complexity}
					affordability={affordability}
				/>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	mealCard: {
		margin: 16,
		borderRadius: 8,
		overflow: Platform.OS === "android" ? "hidden" : "visible",
		backgroundColor: "white",
		elevation: 4,
		shadowColor: "black",
		shadowOpacity: 0.25,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
	},
	pressed: {
		opacity: 0.75,
	},
	image: {
		height: 200,
		width: "100%",
		borderTopRightRadius: 8,
		borderTopLeftRadius: 8,
	},
	title: {
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 18,
		margin: 8,
	},
});
