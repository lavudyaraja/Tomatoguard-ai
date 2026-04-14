export interface DiseaseStaticData {
    symptoms: string[];
    causes: string[];
    treatments: string[];
    prevention: string[];
    description: string;
}

export const DISEASE_STATIC_DATA: Record<string, DiseaseStaticData> = {
    "Bacterial_spot": {
        symptoms: ["Small, water-soaked spots on leaves", "Spots turn brown and circular", "Yellowing of surrounding tissue", "Fruit may develop small, crusty spots"],
        causes: ["Xanthomonas bacteria", "High humidity and warm temperatures", "Spread by splashing rain or overhead irrigation"],
        treatments: ["Remove and destroy infected plant parts", "Apply copper-based fungicides", "Improve air circulation around plants"],
        prevention: ["Use certified disease-free seeds", "Rotate crops every 2-3 years", "Avoid overhead watering"],
        description: "A common bacterial disease that affects both leaves and fruit, potentially reducing yield and quality."
    },
    "Early_blight": {
        symptoms: ["Target-like concentric rings on older leaves", "Yellowing around lesions", "Premature leaf drop", "Sunken spots on stems"],
        causes: ["Alternaria solani fungus", "Periods of wet weather followed by dry spells", "Spores overwintering in soil debris"],
        treatments: ["Remove affected lower leaves", "Apply fungicides containing chlorothalonil or mancozeb", "Mulch around base of plants"],
        prevention: ["Practice crop rotation", "Ensure proper plant spacing", "Keep foliage dry"],
        description: "Characterized by its distinctive concentric rings, this fungal disease can cause significant defoliation."
    },
    "Late_blight": {
        symptoms: ["Large, dark-colored water-soaked patches", "White fuzzy growth on leaf undersides (humid conditions)", "Dark, firm fruit rot", "Rapid plant collapse"],
        causes: ["Phytophthora infestans oomycete", "Cool, wet weather with high humidity", "Infected potato tubers or tomato transplants"],
        treatments: ["Destroy all infected plants immediately (do not compost)", "Apply preventative fungicides if disease is reported nearby", "Monitor weather conditions closely"],
        prevention: ["Plant resistant varieties", "Avoid planting near potatoes", "Practice strict sanitation"],
        description: "A highly destructive disease that can kill entire fields within days under favorable conditions."
    },
    "Leaf_Mold": {
        symptoms: ["Pale green or yellow spots on upper leaf surfaces", "Olive-green velvet-like fungal growth on undersides", "Leaves curl and wither", "Found mostly on older leaves first"],
        causes: ["Passalora fulva fungus", "High humidity (above 85%)", "Poor air circulation (often in greenhouses)"],
        treatments: ["Increase ventilation", "Reduce humidity levels", "Apply appropriate fungicides"],
        prevention: ["Use resistant cultivars", "Prune to improve airflow", "Maintain lower humidity"],
        description: "Primarily a greenhouse problem, leaf mold affects leaves and can severely reduce fruit production."
    },
    "Septoria_leaf_spot": {
        symptoms: ["Small, circular spots with dark borders and gray centers", "Tiny black specks (fruiting bodies) in centers", "Leaves turn yellow and fall off", "Usually starts from bottom up"],
        causes: ["Septoria lycopersici fungus", "Wet, humid weather", "Spores spread by water splashing"],
        treatments: ["Remove infected leaves", "Apply fungicides regularly", "Clean up garden debris at end of season"],
        prevention: ["Stake and prune for better airflow", "Vertical gardening", "Mulching to prevent soil splash"],
        description: "One of the most destructive foliage diseases; it doesn't affect fruit directly but weakens the plant."
    },
    "Spider_mites_Two-spotted_spider_mite": {
        symptoms: ["Tiny yellow or white speckling on leaves", "Fine webbing on undersides of leaves", "Leaves turn brown or bronze and dry up", "Overall stunted growth"],
        causes: ["Tetranychus urticae mites", "Hot, dry conditions", "Dusty environments"],
        treatments: ["Spray plants with strong water stream to dislodge mites", "Apply insecticidal soap or neem oil", "Release predatory mites"],
        prevention: ["Maintain adequate moisture", "Keep area free of weeds", "Avoid excessive nitrogen fertilization"],
        description: "Tiny pests that suck plant juices, causing characteristic stippling and eventual leaf death."
    },
    "Target_Spot": {
        symptoms: ["Small, brown circular spots", "Spots expand with light and dark brown rings", "Lesions on both upper and lower leaf surfaces", "Pitting on fruit"],
        causes: ["Corynespora cassiicola fungus", "High humidity and moderate temperatures", "Long periods of leaf wetness"],
        treatments: ["Improve airflow", "Apply protective fungicides", "Remove heavily infected plants"],
        prevention: ["Avoid overhead irrigation", "Increase plant spacing", "Maintain field sanitation"],
        description: "Distinctive target-like lesions that can affect all above-ground parts of the tomato plant."
    },
    "Tomato_Yellow_Leaf_Curl_Virus": {
        symptoms: ["Leaves turn yellow and curl upward", "New leaves are significantly smaller", "Stunted growth of the whole plant", "Failure to set fruit"],
        causes: ["Begomovirus transmitted by Whiteflies", "High whitefly populations", "Infected seedlings"],
        treatments: ["No cure for viral infections; remove infected plants", "Control whitefly populations", "Use reflective mulches"],
        prevention: ["Plant resistant varieties", "Use insect-proof netting", "Eliminate host weeds"],
        description: "A devastating viral disease spread by whiteflies that can lead to 100% crop loss."
    },
    "Tomato_mosaic_virus": {
        symptoms: ["Mottled light and dark green patterns on leaves", "Leaves may be distorted or fern-like", "Internal browning of fruit", "Stunted growth"],
        causes: ["Tobamovirus", "Spread by human contact (hands, tools)", "Contaminated seeds"],
        treatments: ["No cure; remove and burn infected plants", "Sanitize tools with bleach or alcohol", "Wash hands with soap and milk"],
        prevention: ["Do not smoke near plants (tobacco carries virus)", "Use disease-free seeds", "Control weeds"],
        description: "A highly contagious virus that can survive for years on surfaces and in the soil."
    },
    "powdery_mildew": {
        symptoms: ["White, talcum-like powder on leaf surfaces", "Yellow patches may develop underneath", "Leaves can wither and die", "White growth may cover stems"],
        causes: ["Oidium neolycopersici fungus", "High humidity at night, low humidity at day", "Moderate temperatures and low light"],
        treatments: ["Apply sulfur or potassium bicarbonate based fungicides", "Neem oil application", "Remove infected leaves"],
        prevention: ["Provide full sun", "Improve air circulation", "Avoid crowding plants"],
        description: "Easy to identify by the white powdery growth; it reduces photosynthesis and weakens the plant."
    },
    "healthy": {
        symptoms: ["Foliage is dark green and vibrant", "No visible lesions or discoloration", "Strong stem structure", "Regular fruit development"],
        causes: ["Optimal growing conditions", "Good soil nutrition", "Integrated pest management"],
        treatments: ["Continue regular maintenance", "Monitor for early signs of stress", "Maintain balanced watering"],
        prevention: ["Consistent care is key", "Ensure proper sunlight and air", "Soil testing and fertilization"],
        description: "The plant shows no signs of pathological infection or significant nutrient deficiency."
    }
};
